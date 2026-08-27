#!/bin/zsh
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON_BIN="$(command -v python3 2>/dev/null || true)"
HOST="127.0.0.1"
PORTS=(4173 4174 4175 4176)
LOG_FILE="${TMPDIR:-/tmp}/mhb-local-server.log"

print "MHB Local Launcher"

if [[ -z "$PYTHON_BIN" ]]; then
  print "MHB Local Launcher needs Python 3 to start the local server."
  exit 1
fi

is_mhb_server() {
  local port="$1"
  local page
  page="$(curl --silent --show-error --fail --max-time 1 "http://${HOST}:${port}/index.html" 2>/dev/null || true)"
  [[ "$page" == *"Mindful Health Balance"* ]]
}

is_port_in_use() {
  lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1
}

PORT=""
REUSED_SERVER=0
for candidate in "${PORTS[@]}"; do
  if is_mhb_server "$candidate"; then
    PORT="$candidate"
    REUSED_SERVER=1
    break
  fi
  if ! is_port_in_use "$candidate"; then
    PORT="$candidate"
    break
  fi
done

if [[ -z "$PORT" ]]; then
  print "MHB could not find a free local port (tried: ${PORTS[*]})."
  exit 1
fi

URL="http://${HOST}:${PORT}/index.html"
if (( ! REUSED_SERVER )); then
  nohup "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST" --directory "$SCRIPT_DIR" </dev/null >"$LOG_FILE" 2>&1 &
  SERVER_PID=$!
  for attempt in {1..30}; do
    if is_mhb_server "$PORT"; then
      break
    fi
    sleep 0.1
  done
  if ! is_mhb_server "$PORT"; then
    print "MHB local server did not become ready. See: $LOG_FILE"
    exit 1
  fi
  print "Local server: ready (${SERVER_PID})"
else
  print "Local server: reused"
fi

if curl --silent --fail --max-time 1 "http://127.0.0.1:11434/api/tags" >/dev/null 2>&1; then
  print "Vision: optional local Ollama detected"
else
  print "Vision: optional (manual MHB is ready)"
fi
print "URL: $URL"

if [[ "${MHB_LAUNCHER_SKIP_OPEN:-0}" != "1" ]]; then
  open "$URL"
fi
