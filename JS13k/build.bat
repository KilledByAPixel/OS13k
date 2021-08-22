rem SIMPLE BUILD SCRIPT FOR JS13k by FRANK FORCE
rem minfies and combines index.html and index.js and zips the result

set name=OS13k

rem install closure and advzip globally if necessary
rem npm install -g google-closure-compiler
rem npm install -g terser
rem npm install -g advzip-bin
rem npm install -g roadroller

rem remove old files
del index.zip
del index.min.html
rmdir /s /q build

call google-closure-compiler --js  index.js --externs externs.js --js_output_file build\index.js --compilation_level ADVANCED --language_out ECMASCRIPT_2019 --warning_level VERBOSE --jscomp_off *
if %ERRORLEVEL% NEQ 0 (
    pause
    exit /b %errorlevel%
)

rem get rid of strict mode by adding a 0 at the top
copy build\index.js build\indexStrict.js
del build\index.js
echo 0 > build\index.js
type build\indexStrict.js >> build\index.js

rem more minification with terser
call terser -o build\index.js --compress --mangle -- build\index.js
if %ERRORLEVEL% NEQ 0 (
    pause
    exit /b %errorlevel%
)

rem roadroaller compresses the code better then zip
call roadroller build\index.js -o build\index.js
if %ERRORLEVEL% NEQ 0 (
    pause
    exit /b %errorlevel%
)

rem make the html
echo ^<body^>^<script^> >> build\index.html
type build\index.js >> build\index.html
echo ^</script^> >> build\index.html

rem zip the result
cd build
call advzip -a -4 -i 99 index.zip index.html
if %ERRORLEVEL% NEQ 0 (
    pause
    exit /b %errorlevel%
)

rem copy zip and remove build folder
copy index.zip ..\%name%.zip
copy index.html ..\index.min.html
cd ..
rmdir /s /q build

rem pause to see result