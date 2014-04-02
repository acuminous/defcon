@echo off
setlocal

:check_bower
where bower > nul 2>&1
if not errorlevel 1 goto check_gulp
echo Could not find bower
exit /b 1

:check_gulp
where gulp > nul 2>&1
if not errorlevel 1 goto install
echo Could not find gulp
exit /b 1

:install
bower install
gulp build
endlocal