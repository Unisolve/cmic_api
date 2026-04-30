import express from 'express';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readdir, readFile, access } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const MODE = process.env.DASHBOARD_MODE || 'real';
const MOCK_MODE = MODE === 'mock';
const CMIC_API_MODE = MODE === 'cmic-api';
const REPO_ROOT = resolve(__dirname, '..');
const MOCKS_DIR = join(REPO_ROOT, 'mock');
const BASH_DIR = join(REPO_ROOT, 'bash');
const ENDPOINTS_JSON = join(BASH_DIR, 'endpoints.json');
const CONFIG_FILE = join(BASH_DIR, 'config');

app.use(express.static(join(__dirname, 'public')));

// --- Mode advertised to the client ---
app.get('/api/mode', (req, res) => {
  res.json({ mode: MODE });
});

// --- Config status (cmic-api mode) ---
app.get('/api/config-status', async (req, res) => {
  try {
    const text = await readFile(CONFIG_FILE, 'utf8');
    const hasUser = /^CMIC_USERNAME="[^"]+"/m.test(text) && !/CMIC_USERNAME="your_username"/.test(text);
    const hasPass = /^CMIC_PASSWORD="[^"]+"/m.test(text) && !/CMIC_PASSWORD="your_password"/.test(text);
    const baseUrl = (text.match(/^CMIC_BASE_URL="([^"]+)"/m) || [])[1] || '';
    res.json({ ok: hasUser && hasPass, baseUrl, hasUser, hasPass });
  } catch {
    res.json({ ok: false, baseUrl: '', hasUser: false, hasPass: false, missing: true });
  }
});

// --- Test discovery ---
app.get('/api/tests', async (req, res) => {
  if (CMIC_API_MODE) {
    try {
      const raw = await readFile(ENDPOINTS_JSON, 'utf8');
      const entries = JSON.parse(raw);
      const tests = entries.map(e => ({
        id: `${e.module_dir}/${e.slug}`,
        slug: e.slug,
        file: e.file,
        module: e.module,
        moduleDir: e.module_dir,
        submodule: e.submodule,
        path: e.path,
        description: e.title,
        project: 'cmic-api',
      }));
      return res.json({ mode: 'cmic-api', tests });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (MOCK_MODE) {
    try {
      const files = await readdir(MOCKS_DIR);
      const tests = await Promise.all(
        files
          .filter(f => f.endsWith('.sh') || f.endsWith('.bat'))
          .map(async f => {
            const id = f.replace(/\.(sh|bat)$/, '');
            const fallback = id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\.Mock\b/g, '.mock');
            let description = fallback;
            try {
              const contents = await readFile(join(MOCKS_DIR, f), 'utf8');
              const match = contents.match(/^#\s*description:\s*(.+)$/m);
              if (match) description = match[1].trim();
            } catch {}
            return { id, file: f, project: 'cmic', description };
          })
      );
      return res.json({ mode: 'mock', tests });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Real mode: run playwright --list and parse output
  const proc = spawn('npx', ['playwright', 'test', '--list'], {
    cwd: REPO_ROOT,
    shell: true,
  });

  let output = '';
  proc.stdout.on('data', d => (output += d.toString()));
  proc.stderr.on('data', d => (output += d.toString()));

  proc.on('close', () => {
    const tests = [];
    const re = /\[(.+?)\]\s+›\s+(\S+):(\d+):\d+\s+›\s+(.+)/;
    for (const line of output.split('\n')) {
      const m = line.match(re);
      if (m) {
        tests.push({
          id: m[2].replace(/\.spec\.ts$/, ''),
          file: m[2],
          line: parseInt(m[3]),
          project: m[1],
          description: m[4].trim(),
        });
      }
    }
    res.json({ mode: 'real', tests });
  });
});

// --- Run a test (SSE streaming) ---
// In cmic-api mode, the testId is "<module_dir>/<slug>".
app.get('/api/run/:testId(*)', (req, res) => {
  const { testId } = req.params;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type, data) =>
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  send('status', 'starting');

  let proc;

  if (CMIC_API_MODE) {
    const [moduleDir, slug] = testId.split('/');
    if (!moduleDir || !slug) {
      send('stderr', `Invalid test id: ${testId}`);
      send('exit', { code: 1 });
      return res.end();
    }
    const cwd = join(BASH_DIR, moduleDir);
    // Resolve actual filename: prefer slug.sh, fall back to manifest entry.
    const candidate = join(cwd, `${slug}.sh`);
    const runFile = (async () => {
      try {
        await access(candidate);
        return `${slug}.sh`;
      } catch {
        // Look up the file from the manifest (handles get_emeqprate.sh aliasing).
        const raw = await readFile(ENDPOINTS_JSON, 'utf8');
        const entries = JSON.parse(raw);
        const entry = entries.find(e => e.module_dir === moduleDir && e.slug === slug);
        if (!entry) throw new Error(`Unknown endpoint: ${testId}`);
        return entry.file.replace(`${moduleDir}/`, '');
      }
    })();

    runFile.then(name => {
      proc = spawn('bash', [`./${name}`], { cwd });
      attachProc();
    }).catch(err => {
      send('stderr', err.message);
      send('exit', { code: 1 });
      res.end();
    });

    function attachProc() {
      proc.stdout.on('data', d => send('stdout', d.toString()));
      proc.stderr.on('data', d => send('stderr', d.toString()));
      proc.on('close', code => {
        send('exit', { code });
        res.end();
      });
    }

    req.on('close', () => {
      if (proc && !proc.killed) proc.kill();
    });
    return;
  }

  if (MOCK_MODE) {
    proc = spawn('bash', [`./${testId}.sh`], { cwd: MOCKS_DIR });
  } else {
    proc = spawn(
      'npx',
      ['playwright', 'test', `${testId}.spec.ts`, '--reporter=list'],
      { cwd: REPO_ROOT, shell: true, env: { ...process.env, DEBUG: 'true' } }
    );
  }

  proc.stdout.on('data', d => send('stdout', d.toString()));
  proc.stderr.on('data', d => send('stderr', d.toString()));

  proc.on('close', code => {
    send('exit', { code });
    res.end();
  });

  req.on('close', () => {
    if (proc && !proc.killed) proc.kill();
  });
});

app.listen(PORT, () => {
  const label = CMIC_API_MODE ? 'CMIC-API' : (MOCK_MODE ? 'MOCK' : 'REAL');
  console.log(`\n  CMiC Test Dashboard [${label} MODE]`);
  console.log(`  Open: http://localhost:${PORT}\n`);
});
