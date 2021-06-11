@echo off

if exist node_modules (
echo "Module install. Run script"
npm run start
pause
) ELSE (
echo "Module not install."
npm i
npm run start
pause
)