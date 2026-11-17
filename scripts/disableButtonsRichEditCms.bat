@echo off
echo Checking if dist/admin/index.html exists...
if not exist .\dist\admin\index.html (
  echo File not found: .\dist\admin\index.html
  exit /b 1
)

echo Appending styles to .\dist\admin\index.html...
(
echo ^<style^>
echo   .tina-prose ^> span ^> span:has(h1),
echo   .tina-prose ^> span ^> span:has(h3),
echo   .tina-prose ^> span ^> span:has(h4),
echo   .tina-prose ^> span ^> span:has(h5),
echo   .tina-prose ^> span ^> span:has(h6) {
echo     display: none;
echo   }
echo 
echo   span:has([data-test="imageButton"]),
echo   [data-test="boldButton"],
echo   [data-test="italicButton"] {
echo     display: none;
echo   }
echo ^</style^>
) >> .\dist\admin\index.html

echo Styles appended successfully.