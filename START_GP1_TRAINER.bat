@echo off
chcp 65001 >nul
title GP1 C-Trainer (THI - Prof. Wamser)
echo Starte GP1 C-Trainer...
python "%~dp0server.py"
pause
