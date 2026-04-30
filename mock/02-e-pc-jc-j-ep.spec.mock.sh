#!/bin/bash
# name:        02-e-pc-jc-j-ep.spec.mock.sh
# description: Enterprise tab: Create a new project
# process:     A mockup of the output of bin/02-e-pc-jc-j-ep.spec.ts
#              $ PROJECT_ID=2107606 CUSTOMER_ID="021076" DEBUG=true npx playwright test 02-e-pc-jc-j-ep.spec.ts --headed

echo "2026-04-24T02:19:10.876Z CMIC [SETUP] Starting global setup"
echo "2026-04-24T02:19:10.877Z CMIC [SETUP] Loading credentials from local config"
echo "2026-04-24T02:19:11.028Z CMIC [SETUP] Navigating to login page"

sleep 2

echo "2026-04-24T02:19:15.793Z CMIC [SETUP] Sign In page loaded successfully"
echo "2026-04-24T02:19:15.793Z CMIC [SETUP] Attempting login with username: simon.taylor"

sleep 4

echo "2026-04-24T02:19:29.568Z CMIC [SETUP] Successfully logged in and verified console page title"
echo "2026-04-24T02:19:29.568Z CMIC [SETUP] Storing authentication state"
echo "2026-04-24T02:19:29.653Z CMIC [SETUP] Global setup complete"
echo ""
echo "Running 1 test using 1 worker"
echo ""
echo "2026-04-24T02:19:30.273Z CMIC [UI] Starting Enterprise tab navigation test"
echo "2026-04-24T02:19:30.274Z CMIC [UI] Using standard browser mode - creating new browser"
echo "2026-04-24T02:19:30.473Z CMIC [UI] Looking for UIConsole page"
echo "2026-04-24T02:19:36.920Z CMIC [UI] Looking for div with id="C1""
echo "2026-04-24T02:19:39.515Z CMIC [UI] Looking for div[role="presentation"] within C1"
echo "2026-04-24T02:19:39.524Z CMIC [UI] Looking for "Enterprise" tab"
echo "2026-04-24T02:19:39.530Z CMIC [UI] Clicking the Enterprise tab"

sleep 6

echo "  x  1 [cmic] › bin\02-e-pc-jc-j-ep.spec.ts:41:5 › Enterprise tab: Create a new project (1.0m)"
echo ""
echo ""
echo "  1) [cmic] › bin\02-e-pc-jc-j-ep.spec.ts:41:5 › Enterprise tab: Create a new project ──────────────"
echo ""
echo "    Test timeout of 60000ms exceeded."
echo ""
echo "    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────"
echo "    test-results\02-e-pc-jc-j-ep-Enterprise-tab-Create-a-new-project-cmic\test-failed-1.png"
echo "    ────────────────────────────────────────────────────────────────────────────────────────────────"
echo ""
echo "  1 failed"
echo "    [cmic] › bin\02-e-pc-jc-j-ep.spec.ts:41:5 › Enterprise tab: Create a new project ───────────────"
echo ""
echo "To open last HTML report run:"
echo ""
echo "  npx playwright show-report"

exit 1
