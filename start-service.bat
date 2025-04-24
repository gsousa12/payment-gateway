@echo off
set BASE_DIR=%~dp0
set GIT_BASH="C:\Program Files\Git\git-bash.exe"

start "API Gateway" /D "%BASE_DIR%api.gateway" %GIT_BASH% -c "echo -ne '\033]0;API Gateway\007' && pnpm run dev"
start "Integration Service" /D "%BASE_DIR%integration.service" %GIT_BASH% -c "echo -ne '\033]0;Integration Service\007' && pnpm run dev"
start "Notification Service" /D "%BASE_DIR%notification.service" %GIT_BASH% -c "echo -ne '\033]0;Notification Service\007' && pnpm run dev"
start "PSP Mock" /D "%BASE_DIR%psp.mock" %GIT_BASH% -c "echo -ne '\033]0;PSP Mock\007' && pnpm run dev"

pause
