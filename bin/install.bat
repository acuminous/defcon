@echo off
setlocal
node_modules\.bin\bower install
node_modules\.bin\gulp build
endlocal