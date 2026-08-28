#!/bin/zsh
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/tools/mhb_local_launcher.sh" "$SCRIPT_DIR"
