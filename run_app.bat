@echo off
set PORT=8000
echo ==================================================
echo   EcoGuardian AI - Local Server (Port %PORT%)
echo ==================================================
echo.
echo 1. Opening browser to http://localhost:%PORT%
echo 2. Starting Python HTTP Server...
echo.

start "" "http://localhost:%PORT%"
python -m http.server %PORT%

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Could not start server. Please ensure Python is installed.
    pause
)
