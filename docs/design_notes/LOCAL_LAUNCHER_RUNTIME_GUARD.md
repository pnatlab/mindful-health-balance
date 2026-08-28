# MHB 2.5B - One-Click Local Launcher & Runtime Guard

## Purpose

The generated `dist/Mindful Health Balance.app` is the recommended macOS entry for local-full-capability MHB. `Start Mindful Health Balance.command` remains the fallback and debugging entry. Both call `tools/mhb_local_launcher.sh`, which starts or reuses a loopback static server and opens the HTTP origin needed by same-origin image preparation and the optional local Vision provider.

## Why `file://` Is Insufficient

Manual MHB remains useful from a file URL, but image preparation uses a same-origin popup and browser-based Vision depends on a local HTTP origin. A file URL therefore cannot promise those optional capabilities. The app detects `window.location.protocol === "file:"` and replaces the Vision entry with a calm explanation naming the launcher. It makes no provider request and makes no popup attempt in this mode.

## Launcher Design

The shared launcher receives the repository directory from a thin entry wrapper, checks `python3`, and serves that directory with:

```sh
python3 -m http.server <port> --bind 127.0.0.1 --directory <repo>
```

It backgrounds the server with output in the system temporary directory, then opens `http://127.0.0.1:<port>/index.html`. It binds only `127.0.0.1`, has no user-provided shell input, and does not start or require Ollama.

## Port and Reuse Policy

Ports are considered in order: `4173`, `4174`, `4175`, `4176`. For each port, the launcher first requests `/index.html` and reuses it only when the response identifies Mindful Health Balance. A listening non-MHB process is never killed; the launcher tries the next bounded fallback port instead. This avoids duplicate MHB servers in normal sequential launches.

The detached local server may stay alive after the browser closes. To stop one intentionally, identify its exact PID first, for example with `lsof -nP -iTCP:4173 -sTCP:LISTEN`, and terminate only that PID. No broad process-kill command is part of the launcher.

## Vision Optionality

The launcher makes a short local check of `127.0.0.1:11434` only to report whether Ollama appears available. A missing or stopped Ollama service never prevents MHB from opening; manual Meal Composer and all non-Vision features remain available.

## Manual Fallback

When Finder launching is not suitable, the equivalent manual path is:

```sh
cd /path/to/mindful-health-balance
python3 -m http.server 4173 --bind 127.0.0.1
open http://127.0.0.1:4173/index.html
```

## QA and Limits

The launcher is syntax-checked and tested for fresh start, existing-server reuse, Python failure, and a safe fallback when its canonical port is occupied. Browser QA verifies that the HTTP runtime does not show the guard, while the `file://` runtime does. MHB 2.6E adds a generated lightweight `.app` wrapper with a custom icon; it delegates to the same auditable shell contract and does not change app authority or runtime behavior. See [NATIVE_MACOS_APP_LAUNCHER.md](NATIVE_MACOS_APP_LAUNCHER.md).
