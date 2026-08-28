#!/bin/zsh
set -u
unsetopt BG_NICE

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="${1:-$(cd "$SCRIPT_DIR/.." && pwd)}"
HOST="127.0.0.1"
PORTS=(4173 4174 4175 4176)
LOG_FILE="${TMPDIR:-/tmp}/mhb-local-server.log"

show_failure() {
  local message="$1"
  print -u2 "$message"
  if [[ "${MHB_LAUNCHER_UI:-terminal}" == "app" ]] && command -v osascript >/dev/null 2>&1; then
    osascript - "$message" <<'APPLESCRIPT' >/dev/null 2>&1 || true
on run argv
  display alert "Mindful Health Balance" message (item 1 of argv) as critical buttons {"OK"} default button "OK"
end run
APPLESCRIPT
  fi
}

find_python3() {
  local candidate
  if [[ -n "${MHB_PYTHON_BIN+x}" ]]; then
    [[ -x "$MHB_PYTHON_BIN" ]] && print -r -- "$MHB_PYTHON_BIN"
    return
  fi
  candidate="$(command -v python3 2>/dev/null || true)"
  if [[ -n "$candidate" ]]; then
    print -r -- "$candidate"
    return 0
  fi
  for candidate in /opt/homebrew/bin/python3 /usr/local/bin/python3; do
    if [[ -x "$candidate" ]]; then
      print -r -- "$candidate"
      return 0
    fi
  done
  return 1
}

is_mhb_server() {
  local port="$1"
  local page
  page="$(curl --silent --show-error --fail --max-time 1 "http://${HOST}:${port}/index.html" 2>/dev/null || true)"
  [[ "$page" == *"Mindful Health Balance"* ]]
}

is_port_in_use() {
  lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1
}

print "MHB Local Launcher"

if [[ ! -f "$REPO_DIR/index.html" ]]; then
  show_failure "MHB could not find its local application files. Rebuild the app from the repository and try again."
  exit 1
fi

PYTHON_BIN="$(find_python3 || true)"
if [[ -z "$PYTHON_BIN" ]]; then
  show_failure "MHB Local Launcher needs Python 3 to start the local server."
  exit 1
fi

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
  show_failure "MHB could not find a free local port (tried: ${PORTS[*]})."
  exit 1
fi

URL="http://${HOST}:${PORT}/index.html"
if (( ! REUSED_SERVER )); then
  nohup "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST" --directory "$REPO_DIR" </dev/null >"$LOG_FILE" 2>&1 &
  SERVER_PID=$!
  for attempt in {1..30}; do
    if is_mhb_server "$PORT"; then
      break
    fi
    sleep 0.1
  done
  if ! is_mhb_server "$PORT"; then
    show_failure "MHB local server did not become ready. See: $LOG_FILE"
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
