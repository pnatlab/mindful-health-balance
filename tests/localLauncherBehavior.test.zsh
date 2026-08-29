#!/bin/zsh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LAUNCHER="$ROOT_DIR/tools/mhb_local_launcher.sh"
TEST_DIR="$(mktemp -d "${TMPDIR:-/tmp}/mhb-launcher-test.XXXXXX")"
BIN_DIR="$TEST_DIR/bin"
STATE_FILE="$TEST_DIR/server-ready"
PYTHON_CALLS_FILE="$TEST_DIR/python-calls"

cleanup() {
  rm -rf "$TEST_DIR"
}
trap cleanup EXIT
mkdir -p "$BIN_DIR"

cat >"$BIN_DIR/curl" <<'STUB'
#!/bin/zsh
url="${@: -1}"
if [[ "$url" == *":4173/index.html" && -f "$MHB_TEST_STATE_FILE" ]]; then
  print '<title>Mindful Health Balance</title>'
  exit 0
fi
exit 1
STUB

cat >"$BIN_DIR/lsof" <<'STUB'
#!/bin/zsh
[[ "${MHB_TEST_PORT_4173_OCCUPIED:-0}" == "1" && "$*" == *'-iTCP:4173'* ]]
STUB

cat >"$BIN_DIR/python3" <<'STUB'
#!/bin/zsh
touch "$MHB_TEST_STATE_FILE"
print "started" >>"$MHB_TEST_PYTHON_CALLS_FILE"
STUB
chmod 755 "$BIN_DIR"/*

output="$(PATH="$BIN_DIR:/usr/bin:/bin" MHB_TEST_STATE_FILE="$STATE_FILE" MHB_TEST_PYTHON_CALLS_FILE="$PYTHON_CALLS_FILE" MHB_LAUNCHER_SKIP_OPEN=1 "$LAUNCHER" "$ROOT_DIR")"
[[ "$output" == *'URL: http://127.0.0.1:4173/index.html'* ]]
[[ -f "$STATE_FILE" ]]
[[ "$(wc -l <"$PYTHON_CALLS_FILE" | tr -d ' ')" == "1" ]]

reused_output="$(PATH="$BIN_DIR:/usr/bin:/bin" MHB_TEST_STATE_FILE="$STATE_FILE" MHB_TEST_PYTHON_CALLS_FILE="$PYTHON_CALLS_FILE" MHB_LAUNCHER_SKIP_OPEN=1 "$LAUNCHER" "$ROOT_DIR")"
[[ "$reused_output" == *'Local server: reused'* ]]
[[ "$(wc -l <"$PYTHON_CALLS_FILE" | tr -d ' ')" == "1" ]]

rm -f "$STATE_FILE" "$PYTHON_CALLS_FILE"
collision_output="$(PATH="$BIN_DIR:/usr/bin:/bin" MHB_TEST_STATE_FILE="$STATE_FILE" MHB_TEST_PYTHON_CALLS_FILE="$PYTHON_CALLS_FILE" MHB_TEST_PORT_4173_OCCUPIED=1 MHB_LAUNCHER_SKIP_OPEN=1 "$LAUNCHER" "$ROOT_DIR" 2>&1 || true)"
[[ "$collision_output" == *'canonical local port 4173'* ]]
[[ "$collision_output" == *'will not switch to another port automatically'* ]]
[[ ! -f "$STATE_FILE" ]]
[[ ! -f "$PYTHON_CALLS_FILE" ]]

missing_output="$(MHB_PYTHON_BIN="$TEST_DIR/missing-python" MHB_LAUNCHER_SKIP_OPEN=1 "$LAUNCHER" "$ROOT_DIR" 2>&1 || true)"
[[ "$missing_output" == *'needs Python 3'* ]]

if grep -Eq '(^|[^[:alpha:]])(kill|pkill|killall)([^[:alpha:]]|$)' "$LAUNCHER"; then
  print "Launcher must not kill a port owner." >&2
  exit 1
fi

print "Local launcher behavior tests passed."
