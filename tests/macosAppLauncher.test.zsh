#!/bin/zsh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_SCRIPT="$ROOT_DIR/tools/build_mhb_macos_app.sh"
APP_DIR="$ROOT_DIR/dist/Mindful Health Balance.app"
PLIST="$APP_DIR/Contents/Info.plist"
EXECUTABLE="$APP_DIR/Contents/MacOS/Mindful Health Balance"
ICON="$APP_DIR/Contents/Resources/MHB.icns"

zsh -n "$BUILD_SCRIPT"
clang -fsyntax-only -Wall -Wextra "$ROOT_DIR/tools/macos/mhb_app_launcher.c"
python3 -c 'import ast, pathlib, sys; ast.parse(pathlib.Path(sys.argv[1]).read_text())' "$ROOT_DIR/tools/macos/build_icns.py"
python3 -c 'import ast, pathlib, sys; ast.parse(pathlib.Path(sys.argv[1]).read_text())' "$ROOT_DIR/tools/macos/add_png_alpha.py"
"$BUILD_SCRIPT" >/dev/null

[[ -d "$APP_DIR" ]]
[[ -f "$PLIST" ]]
[[ -x "$EXECUTABLE" ]]
[[ -s "$ICON" ]]
plutil -lint "$PLIST" >/dev/null
codesign --verify --deep --strict "$APP_DIR"
[[ "$(plutil -extract CFBundleIdentifier raw -o - "$PLIST")" == "com.pnatlab.mindfulhealthbalance" ]]
[[ "$(plutil -extract CFBundleExecutable raw -o - "$PLIST")" == "Mindful Health Balance" ]]
[[ "$(plutil -extract CFBundleIconFile raw -o - "$PLIST")" == "MHB" ]]
strings "$EXECUTABLE" | grep -Fq 'tools/mhb_local_launcher.sh'
strings "$EXECUTABLE" | grep -Fq 'MHB_LAUNCHER_UI'
if grep -R -Fq '0.0.0.0' "$ROOT_DIR/tools/macos" "$BUILD_SCRIPT"; then
  print "macOS app launcher must not bind to 0.0.0.0" >&2
  exit 1
fi

print "macOS app launcher bundle tests passed."
