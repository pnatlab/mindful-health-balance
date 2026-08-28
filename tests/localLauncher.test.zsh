#!/bin/zsh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LAUNCHER="$ROOT_DIR/Start Mindful Health Balance.command"
SHARED_LAUNCHER="$ROOT_DIR/tools/mhb_local_launcher.sh"

zsh -n "$LAUNCHER"
zsh -n "$SHARED_LAUNCHER"
grep -Fq 'exec "$SCRIPT_DIR/tools/mhb_local_launcher.sh" "$SCRIPT_DIR"' "$LAUNCHER"
grep -Fq 'HOST="127.0.0.1"' "$SHARED_LAUNCHER"
grep -Fq 'PORTS=(4173 4174 4175 4176)' "$SHARED_LAUNCHER"
grep -Fq 'nohup "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST"' "$SHARED_LAUNCHER"
grep -Fq 'MHB_LAUNCHER_SKIP_OPEN' "$SHARED_LAUNCHER"
grep -Fq 'Vision: optional (manual MHB is ready)' "$SHARED_LAUNCHER"
if grep -Fq '0.0.0.0' "$LAUNCHER" "$SHARED_LAUNCHER"; then
  print "Launcher must not bind to 0.0.0.0" >&2
  exit 1
fi

print "Local launcher static tests passed."
