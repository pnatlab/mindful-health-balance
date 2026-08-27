# MHB 2.5B - One-Click Local Launcher & Runtime Guard

## Purpose

`Start Mindful Health Balance.command` is the recommended macOS entry for local-full-capability MHB. It starts or reuses a loopback static server, then opens the app at an HTTP origin that can support same-origin image-preparation handoff and the optional local Vision provider.

## Why `file://` Is Insufficient

Manual MHB remains useful from a file URL, but image preparation uses a same-origin popup and browser-based Vision depends on a local HTTP origin. A file URL therefore cannot promise those optional capabilities. The app detects `window.location.protocol === "file:"` and replaces the Vision entry with a calm explanation naming the launcher. It makes no provider request and makes no popup attempt in this mode.

## Launcher Design

The executable `.command` derives the repository directory from its own location, checks `python3`, and serves that directory with:

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

The launcher is syntax-checked and tested for fresh start, existing-server reuse, and a safe fallback when its canonical port is occupied. Browser QA verifies that the HTTP runtime does not show the guard, while the `file://` runtime does. The launcher is a small auditable macOS script, not an application bundle. A future Automator, Shortcuts, or `.app` wrapper can call this script without changing app authority or runtime behavior.
