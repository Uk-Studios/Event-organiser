@echo off
title Run Full Project

echo Starting Frontend...
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo Starting Backend...
start cmd /k "cd /d %~dp0backend && npm run server"

echo Both services started.
