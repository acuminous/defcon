@echo off
setlocal
node_modules\.bin\bower install --allow-root
node_modules\.bin\gulp build
endlocal
