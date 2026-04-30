# CMIC_API

Bash test scripts for the CMiC REST API plus a small web dashboard for browsing and running them.

## Repo layout

```
bash/                          # GET-endpoint test scripts (one per endpoint)
  config.template              # Copy to bash/config and set credentials
  config                       # Local credentials (gitignored)
  endpoints.json               # Manifest read by the dashboard
  asset_management/            # Scripts grouped by CMiC module
  core_system/
  financials/
  project_controls/
  project_management/
dashboard/                     # Express + SSE web dashboard (server + frontend)
mock/                          # Scripted mocks (used by mock-mode dashboard)
CMIC_GET_ENDPOINTS.md          # Reference list of all GET endpoints
DASHBOARD_HANDOVER.md          # Notes on porting the dashboard to other repos
```

## Running scripts directly

Each script in `bash/<module>/` sources `bash/config` for credentials and base URL, then runs a single `curl` against the documented endpoint. The CMiC tenant URLs typically only resolve from inside the client Citrix environment — outside it you'll see a DNS failure, which is expected.

```
bash bash/financials/get_apcheque.sh
```

## Dashboard

Three modes:

| Mode | Launch | What it does |
|---|---|---|
| **CMiC API** | `./start-cmic-api.sh` (or `start-cmic-api.bat`) | Lists all 280 GET-endpoint scripts in a Module → Sub-module → endpoint tree. Click one, hit Run, see the response. |
| **Mock** | `./start-mock.sh` | Lists `*.sh` / `*.bat` in `mock/`. Useful for offline demos. |
| **Real** | `npm start` | Shells out to Playwright. Only relevant if Playwright is configured. |

Open http://localhost:3000 once a launcher is running.

### CMiC API mode features

- Tree sidebar grouped by Module / Sub-module, with endpoint counts.
- Search box filters by description, slug, or REST path.
- Selected endpoint and collapsed groups are remembered across reloads.
- Successful JSON responses are pretty-printed in the output panel.
- A banner appears if `bash/config` is missing or has placeholder credentials.
- DNS failures get a one-line hint about the Citrix tunnel.
