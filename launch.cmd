@echo off
cd api
start cmd /k "npm install && npm run dev"
cd ..\ui
start cmd /k "npm install && npm run dev"
cd ..
