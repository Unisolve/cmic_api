@echo off
echo.
echo  CMiC Test Dashboard
echo  -------------------
echo.

cd /d "%~dp0"

where node >nul 2>&1
if %errorlevel% neq 0 (
  echo  ERROR: Node.js not found. Please install Node.js and try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo  Installing dependencies...
  npm install
  echo.
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
  echo  Stopping existing instance on port 3000...
  taskkill /PID %%a /F >nul 2>&1
)

echo  Starting dashboard in MOCK mode...
echo  Open your browser to: http://localhost:3000
echo.
echo  Press Ctrl+C to stop.
echo.

set DASHBOARD_MODE=mock
node dashboard/server.js

pause
