#!/bin/bash
# name:        03-e-pc-jc-r-jlr.spec.mock.sh
# description: Enterprise tab: Run a job listing report
# process:     A mockup of the output of bin/03-e-pc-jc-r-jlr.spec.ts

sleep 1
echo "Running 1 test using 1 worker"
echo ""
sleep 2
echo "  [cmic] › 03-e-pc-jc-r-jlr.spec.ts"
sleep 3
echo "    Navigating to Enterprise tab..."
sleep 4
echo "    Opening reports module..."
sleep 3
echo "    ✗  Enterprise tab: Run a job listing report"
echo ""
echo "    Error: Timeout 30000ms exceeded."
echo "    waiting for locator('#report-output').toBeVisible()"
echo ""
echo "    Call log:"
echo "      - expect.toBeVisible with timeout 30000ms"
echo "      - waiting for #report-output"
echo ""
echo "  1 failed"
echo "  Retrying..."
sleep 2
echo "  1 failed (after retry)"
exit 1
