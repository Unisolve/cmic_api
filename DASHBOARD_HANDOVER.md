# Test Dashboard — Handover Notes

This document describes the lightweight web dashboard developed in `cmic_unit`
for browsing and running Playwright tests (or scripted mocks of those tests).
It is intended for Claude Code, working in a *different* repository, to set up
the same dashboard there.

The dashboard is deliberately small: an Express static server, a single-page
vanilla-JS frontend, and a Server-Sent-Events stream that pipes test stdout/stderr
to the browser in real time. Three modes are supported:

- **Mock mode** (`DASHBOARD_MODE=mock`) — discovers `*.sh` / `*.bat` scripts in a
  `mock/` directory and runs them. Useful for demos, dev-loop work, or anywhere
  the real test runner is too heavy. **This is the mode to bring up first.**
- **CMiC API mode** (`DASHBOARD_MODE=cmic-api`) — reads `bash/endpoints.json` and
  presents the GET-endpoint scripts under `bash/<module>/*.sh` in a Module →
  Sub-module → endpoint tree, with search, JSON pretty-printing, and a config
  banner that calls out missing credentials.
- **Real mode** (default, or `DASHBOARD_MODE=real`) — shells out to
  `npx playwright test --list` for discovery and `npx playwright test <id>.spec.ts`
  to run. Only relevant if the destination repo also uses Playwright.

---

## Files to copy (mock-mode minimum)

Copy these files **as-is**, preserving the directory structure, before making
any changes:

```
dashboard/
  server.js                       # Express + SSE backend
  public/
    index.html                    # Layout / DOM
    app.js                        # Frontend state, SSE client, rendering
    styles.css                    # Dark theme, IBM Plex fonts (loaded from Google Fonts)

mock/
  01-load.spec.mock.sh            # Example mock #1 (passes)
  02-e-pc-jc-j-ep.spec.mock.sh    # Example mock #2 (fails on timeout)
  03-e-pc-jc-r-jlr.spec.mock.sh   # Example mock #3 (fails after retry)

start-mock.sh                     # Bash launcher (Git Bash / WSL / Linux / macOS)
start-mock.bat                    # Windows cmd launcher

package.json                      # Needs "type": "module" + express dep
```

If the destination repo already has its own `package.json`, **do not overwrite
it** — instead merge in:

- `"type": "module"` at the top level (the server uses ESM imports).
- `"express": "^4.18.2"` under `dependencies`.
- Optionally the `scripts` block: `start`, `mock`, `mock:win`.

If you also want **real mode** (Playwright) copy these as well:

```
start-real.sh
start-real.bat
```

Real mode requires the destination repo to already have Playwright configured
(`playwright.config.ts`, a `bin/` or similar test directory, and
`@playwright/test` installed). You also need `npx` on `PATH`.

---

## How it fits together

### Backend — `dashboard/server.js`

- ESM module, Node ≥ 18, listens on `PORT` (default `3000`).
- Reads `DASHBOARD_MODE` from env once at startup. There is no runtime toggle.
- `REPO_ROOT` is computed as `dirname(server.js)/..` — i.e. the dashboard
  assumes it lives one level below the repo root. **If you relocate it, fix
  this path.**
- `MOCKS_DIR` is `<REPO_ROOT>/mock`. Rename if your destination repo uses a
  different folder for mocks.

Two endpoints:

| Endpoint              | Purpose                                                                      |
|-----------------------|------------------------------------------------------------------------------|
| `GET /api/tests`      | Lists tests. In mock mode it scans `mock/` for `*.sh` / `*.bat`. In real mode it parses `npx playwright test --list` output. |
| `GET /api/run/:testId`| Runs the test, streams stdout/stderr back via Server-Sent Events. Sends `status`, `stdout`, `stderr`, and `exit` events. |

Mock-mode discovery extracts a human-readable description from a comment line
of the form `# description: <text>` at the top of each script. If absent, it
falls back to a Title Cased version of the filename.

Mock-mode test execution uses `bash <id>.sh` from `MOCKS_DIR`. On bare
Windows (no Git Bash / WSL) this will fail — the `.bat` files in `mock/` are
listed for discovery but not currently executed by the server. If you need
pure-Windows mock execution, branch on extension in
`server.js:88` (`if (MOCK_MODE)` block) and `spawn('cmd', ['/c', ...])` for
`.bat`.

### Frontend — `dashboard/public/`

- `index.html` — three-region layout (header, sidebar, panel).
- `app.js` — vanilla JS, no framework, no build step. Holds:
  - `tests[]` — list fetched from `/api/tests`.
  - `activeTest` — currently selected test.
  - `currentSSE` — open `EventSource` (closed on test switch / re-run).
- `styles.css` — dark theme, IBM Plex Sans + Mono via Google Fonts. CSS
  custom properties at `:root` (`--accent`, `--bg`, etc.) — restyle there.

The mode badge in the top right reads `Mock Mode` or `Live` based on the
`mode` field in the `/api/tests` response.

### Launchers — `start-mock.{sh,bat}` and `start-real.{sh,bat}`

All four scripts do the same four things:

1. `cd` to the script's own directory.
2. Verify `node` is on `PATH`.
3. `npm install` if `node_modules` is missing.
4. Kill anything already listening on port 3000 (PowerShell on Windows /
   PowerShell-via-Git-Bash on the `.sh` versions — yes, the `.sh` scripts
   shell out to PowerShell, so they assume Windows + Git Bash). On Linux/macOS
   replace that block with `lsof -ti:3000 | xargs -r kill -9` or similar.
5. Start the server with the right `DASHBOARD_MODE` env var.

---

## Bring-up checklist

1. Copy the files listed above into the destination repo at the same paths.
2. Merge or create `package.json` with `"type": "module"` and `express`.
3. Run `npm install` (or just `./start-mock.sh` — it does this on first run).
4. `./start-mock.sh` (or `start-mock.bat`).
5. Open `http://localhost:3000`. The sidebar should show the three example
   mocks; clicking one and pressing **Run Test** should stream output.
6. Once mock mode is verified, decide whether the destination repo needs real
   mode and copy `start-real.*` if so.

---

## Things you'll likely want to customise in the new repo

- **Branding** — `index.html` hardcodes "CMiC" / "Test Dashboard". Adjust the
  `.header-label`, `.header-title`, and document `<title>`.
- **Accent colour** — `--accent` in `styles.css` (currently amber `#f59e0b`).
- **Mocks directory name** — `MOCKS_DIR` in `server.js` if `mock/` is not the
  convention in the destination repo.
- **Real-mode test discovery regex** — `server.js:55` matches Playwright's
  `[project] › file:line:col › description` list output. If the destination
  uses a different runner (Vitest, Jest, Mocha, etc.), this is the place to
  adapt — and you'd likely replace the spawn calls in `/api/run` too.
- **Port** — defaults to 3000 via `process.env.PORT`. The launcher kill-step
  is hardcoded to 3000; update both if you change it.
- **Windows-only assumptions in launchers** — see the launcher section above.

---

## What is *not* needed

These exist in `cmic_unit` but are unrelated to the dashboard and should
**not** be copied:

- `bin/`, `lib/`, `config/`, `data/`, `media/`, `playwright/` — Playwright
  test sources and fixtures specific to CMiC.
- `playwright.config.ts`, `global-setup.spec.ts` — only relevant if you also
  want real mode against the same Playwright suite.
- `cmic-auth-state.json`, `cmic-shared-state.json`, `local.config.json` —
  CMiC-specific state.
- `restructure-cmic_unit.sh`, `update.sh`, `verify.sh`, `tmp.txt`, `resume`
  — local maintenance scripts.
