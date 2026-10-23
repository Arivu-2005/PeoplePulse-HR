@echo off
echo ====================================================
echo Starting PeoplePulse HR (Backend + Frontend)
echo ====================================================

start "PeoplePulse Backend (Port 5000)" cmd /k "cd /d %~dp0server && node src/server.js"
start "PeoplePulse Frontend (Port 5173)" cmd /k "cd /d %~dp0client && npm run dev"

echo Services started in dedicated terminal windows!
echo Open your browser at: http://127.0.0.1:5173/login
