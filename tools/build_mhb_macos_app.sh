#!/bin/zsh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_ICON="$ROOT_DIR/assets/macos/mhb-app-icon-source.png"
PLIST_SOURCE="$ROOT_DIR/tools/macos/Info.plist"
APP_LAUNCHER_SOURCE="$ROOT_DIR/tools/macos/mhb_app_launcher.c"
SHARED_LAUNCHER="$ROOT_DIR/tools/mhb_local_launcher.sh"
ICNS_FALLBACK="$ROOT_DIR/tools/macos/build_icns.py"
PNG_ALPHA_TOOL="$ROOT_DIR/tools/macos/add_png_alpha.py"
APP_DIR="$ROOT_DIR/dist/Mindful Health Balance.app"
CONTENTS_DIR="$APP_DIR/Contents"
ICONSET_DIR="$(mktemp -d "${TMPDIR:-/tmp}/mhb-iconset.XXXXXX")/MHB.iconset"

cleanup() {
  rm -rf "$(dirname "$ICONSET_DIR")"
}
trap cleanup EXIT

for required in "$SOURCE_ICON" "$PLIST_SOURCE" "$APP_LAUNCHER_SOURCE" "$SHARED_LAUNCHER" "$ICNS_FALLBACK" "$PNG_ALPHA_TOOL"; do
  if [[ ! -f "$required" ]]; then
    print -u2 "Missing required build source: $required"
    exit 1
  fi
done

for command_name in sips iconutil plutil python3 clang codesign; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    print -u2 "Building the MHB macOS app requires: $command_name"
    exit 1
  fi
done

width="$(sips -g pixelWidth "$SOURCE_ICON" 2>/dev/null | awk '/pixelWidth/ {print $2}')"
height="$(sips -g pixelHeight "$SOURCE_ICON" 2>/dev/null | awk '/pixelHeight/ {print $2}')"
if [[ -z "$width" || "$width" != "$height" ]]; then
  print -u2 "The MHB source icon must be square."
  exit 1
fi

rm -rf "$APP_DIR"
mkdir -p "$ICONSET_DIR" "$CONTENTS_DIR/MacOS" "$CONTENTS_DIR/Resources"

MASTER_ICON="$(dirname "$ICONSET_DIR")/MHB-1024.png"
sips -z 1024 1024 "$SOURCE_ICON" --out "$MASTER_ICON" >/dev/null

for spec in \
  "16 icon_16x16.png" \
  "32 icon_16x16@2x.png" \
  "32 icon_32x32.png" \
  "64 icon_32x32@2x.png" \
  "128 icon_128x128.png" \
  "256 icon_128x128@2x.png" \
  "256 icon_256x256.png" \
  "512 icon_256x256@2x.png" \
  "512 icon_512x512.png" \
  "1024 icon_512x512@2x.png"; do
  size="${spec%% *}"
  filename="${spec#* }"
  sips -z "$size" "$size" "$MASTER_ICON" --out "$ICONSET_DIR/$filename" >/dev/null
done

python3 "$PNG_ALPHA_TOOL" "$ICONSET_DIR"/*.png

if ! iconutil -c icns "$ICONSET_DIR" -o "$CONTENTS_DIR/Resources/MHB.icns" >/dev/null 2>&1; then
  python3 "$ICNS_FALLBACK" "$ICONSET_DIR" "$CONTENTS_DIR/Resources/MHB.icns"
fi
cp "$PLIST_SOURCE" "$CONTENTS_DIR/Info.plist"
clang -Os -Wall -Wextra "$APP_LAUNCHER_SOURCE" -o "$CONTENTS_DIR/MacOS/Mindful Health Balance"
chmod 755 "$CONTENTS_DIR/MacOS/Mindful Health Balance"
plutil -lint "$CONTENTS_DIR/Info.plist" >/dev/null
codesign --force --deep --sign - "$APP_DIR"

print "Built: $APP_DIR"
