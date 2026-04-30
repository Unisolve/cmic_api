import express from 'express';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readdir, readFile } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const MOCK_MODE = process.env.DASHBOARD_MODE === 'mock';
const REPO_ROOT = resolve(__dirname, '..');
const MOCKS_DIR = join(REPO_ROOT, 'mock');

app.use(express.static(join(__dirname, 'public')));

// --- Test discovery ---
app.get('/api/tests', async (req, res) => {
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
app.get('/api/run/:testId', (req, res) => {
  const { testId } = req.params;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type, data) =>
    res.write(`data: ${JSON.stringify({ type, data })}\n\n`);

  send('status', 'starting');

  let proc;

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
  const mode = MOCK_MODE ? 'MOCK' : 'REAL';
  console.log(`\n  CMiC Test Dashboard [${mode} MODE]`);
  console.log(`  Open: http://localhost:${PORT}\n`);
});
