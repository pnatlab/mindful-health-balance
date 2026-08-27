#!/bin/zsh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LAUNCHER="$ROOT_DIR/Start Mindful Health Balance.command"

zsh -n "$LAUNCHER"
grep -Fq 'HOST="127.0.0.1"' "$LAUNCHER"
grep -Fq 'PORTS=(4173 4174 4175 4176)' "$LAUNCHER"
grep -Fq 'nohup "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST"' "$LAUNCHER"
grep -Fq 'MHB_LAUNCHER_SKIP_OPEN' "$LAUNCHER"
if grep -Fq '0.0.0.0' "$LAUNCHER"; then
  print "Launcher must not bind to 0.0.0.0" >&2
  exit 1
fi

print "Local launcher static tests passed."
