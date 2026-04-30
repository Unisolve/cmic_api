#!/bin/bash
# name:        01-load.spec.mock.sh
# description: CMIC login/logout test
# process:     A mockup of the output of bin/01-load.spec.ts
#              $ DEBUG=true npx playwright test bin/01-load.spec.ts --headed

echo "2026-04-24T02:10:51.501Z CMIC [SETUP] Starting global setup"
echo "2026-04-24T02:10:51.503Z CMIC [SETUP] Loading credentials from local config"
echo "2026-04-24T02:10:51.716Z CMIC [SETUP] Navigating to login page"

sleep 2

echo "2026-04-24T02:10:56.724Z CMIC [SETUP] Sign In page loaded successfully"
echo "2026-04-24T02:10:56.724Z CMIC [SETUP] Attempting login with username: simon.taylor"

sleep 3

echo "2026-04-24T02:10:56.724Z CMIC [SETUP] Sign In page loaded successfully"
echo "2026-04-24T02:11:10.802Z CMIC [SETUP] Successfully logged in and verified console page title"
echo "2026-04-24T02:11:10.802Z CMIC [SETUP] Storing authentication state"
echo "2026-04-24T02:11:10.887Z CMIC [SETUP] Global setup complete"
echo ""
echo "Running 1 test using 1 worker"
echo ""

sleep 2

echo "2026-04-24T02:11:12.169Z CMIC [UI] Looking for UIConsole page"
echo "2026-04-24T02:11:23.449Z CMIC [UI] Successfully clicked Logout"
echo "2026-04-24T02:11:25.301Z CMIC [UI] Successfully logged out"
echo "  ok 1 [cmic] › bin\01-load.spec.ts:12:5 › CMIC login/logout test (13.5s)"
echo ""
echo "  1 passed (34.1s)"
echo ""
echo "To open last HTML report run:"
echo ""
echo "  npx playwright show-report"

exit 0
