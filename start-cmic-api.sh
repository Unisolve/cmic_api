#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo ""
echo "  CMiC Test Dashboard (CMiC API mode)"
echo "  -----------------------------------"
echo ""

if ! command -v node &>/dev/null; then
  echo "  ERROR: Node.js not found. Please install Node.js and try again."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "  Installing dependencies..."
  npm install
  echo ""
fi

if [ ! -f "bash/config" ]; then
  echo "  WARNING: bash/config not found."
  echo "  Copy bash/config.template to bash/config and set credentials before running tests."
  echo ""
fi

# Kill any existing instance on port 3000
echo "  Checking for existing instance on port 3000..."
powershell -NoProfile -Command "
  Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id \$_.OwningProcess -Force -ErrorAction SilentlyContinue }
" 2>/dev/null || true
sleep 1

echo "  Starting dashboard in CMIC-API mode..."
echo "  Open your browser to: http://localhost:3000"
echo ""
echo "  Press Ctrl+C to stop."
echo ""

DASHBOARD_MODE=cmic-api node dashboard/server.js
