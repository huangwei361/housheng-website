@echo off
chcp 65001 >nul
echo ============================================
echo   厚生网站清理 - 彻底删除模式
echo   !!! 此操作不可恢复 !!!
echo ============================================
echo.
echo 双击后 5 秒内关闭窗口可取消

REM 给 5 秒反悔机会
choice /t 5 /c YN /d Y /m "确认清理？5 秒后将自动执行"
if errorlevel 2 goto :cancel

cd /d "%~dp0"

set cnt=0

echo.
echo [1/4] 删除旧页面和临时脚本...
for %%f in (
  shop.html
  courses.html
  therapy.html
  checkup.html
  schedule.html
  _render_biz.py
  _render_long.py
  _render_full.py
  _render_full2.py
  _render_one.py
  _render_two.py
  _crop.py
  _crop_one.py
  _crop_two.py
  _cleanup.bat
) do (
  if exist "%%f" (
    del /f /q "%%f" >nul 2>&1
    set /a cnt+=1
    echo   del %%f
  )
)

echo.
echo [2/4] 删除 Edge 临时目录...
for %%d in (
  "_edge_profile"
  "_edge_p5"
  "_edge_p6"
  "_edge_profile2"
  "_edge_profile3"
  "_edge_profile4"
) do (
  if exist %%d rd /s /q %%d >nul 2>&1 && echo   rd %%d
)

echo.
echo [3/4] 删除 website_preview 目录...
if exist "..\website_preview" rd /s /q "..\website_preview" >nul 2>&1 && echo   rd ..\website_preview
if exist "..\website_preview" goto :n3
echo   目录已删除
:n3

echo.
echo [4/4] 删除 shop 目录...
if exist "..\shop" rd /s /q "..\shop" >nul 2>&1 && echo   rd ..\shop
if exist "..\shop" goto :n4
echo   目录已删除
:n4

echo.
echo ============================================
echo   清理完成，共处理 %cnt% 个文件
echo ============================================

REM 自删除
del /f /q "%~f0" >nul 2>&1
exit

:cancel
echo.
echo 已取消清理
pause
exit
