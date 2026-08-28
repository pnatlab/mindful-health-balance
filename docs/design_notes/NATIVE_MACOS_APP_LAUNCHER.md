# MHB 2.6E - Native macOS App Icon Launcher

## Purpose

`Mindful Health Balance.app` gives local macOS use a normal Finder entry point. Double-clicking the generated app starts or reuses the same loopback runtime as the existing `.command` fallback and opens MHB in the browser. It does not turn MHB into a native health application or change any application authority.

## One Launcher Contract

`tools/mhb_local_launcher.sh` is the single runtime implementation. Both entry points delegate to it:

- primary local entry: `dist/Mindful Health Balance.app`
- fallback and debugging entry: `Start Mindful Health Balance.command`

The shared contract keeps Python 3 detection, `127.0.0.1` binding, ordered ports `4173` through `4176`, verified MHB-server reuse, safe unrelated-listener fallback, optional Ollama detection, server logging, and browser opening. Neither wrapper contains an independent copy of this policy.

## Bundle Architecture

`tools/build_mhb_macos_app.sh` creates a standard lightweight app bundle with `Info.plist`, an accessory launcher executable, and `MHB.icns`. `LSUIElement` keeps this short-lived launcher from behaving like a persistent Dock application. The executable resolves the repository relative to `dist/` and calls the shared launcher with app-style failure alerts. The local server remains detached and writes to `${TMPDIR:-/tmp}/mhb-local-server.log`.

The bundle identifier is `com.pnatlab.mindfulhealthbalance`. The bundle metadata retains the current public product version `2.3`; 2.6E is a launcher refinement, not a stable product-version change.

## Icon Source and Build

`assets/macos/mhb-app-icon-source.png` is an exact copy of the user-approved 1254-by-1254 source artwork. The build performs deterministic square resizing only and creates standard iconset source sizes from 16 through 1024 pixels. It does not redraw, crop, stretch, relabel, or send the artwork anywhere.

The builder tries macOS `iconutil` first. On the tested macOS 26 environment, `iconutil` rejected an otherwise valid iconset, so a Python-standard-library fallback writes the modern PNG-backed ICNS tiers. This fallback adds no package or runtime dependency. Intermediate iconsets stay in the system temporary directory and are removed after the build.

## Build and Generated Artifact

Run:

```sh
./tools/build_mhb_macos_app.sh
```

Then open:

```text
dist/Mindful Health Balance.app
```

The source icon, launcher scripts, metadata, tests, and documentation are tracked. `dist/` is already ignored, so the generated `.app`, temporary iconset, logs, and runtime files are not intended for Git. Keeping the bundle generated avoids binary bundle churn while preserving a reproducible, reviewable source path.

## Local-Only and Optional Vision Boundary

The shared launcher binds only `127.0.0.1`; it never uses `0.0.0.0`, sudo, cloud services, telemetry, user shell input, or process-kill commands. An unrelated listener is left untouched. Ollama is checked only on `127.0.0.1:11434` and never blocks manual MHB use.

## Unsigned Local App

The generated bundle is a personal local app with an ad-hoc macOS seal. Apple Silicon's linker already signs Mach-O output ad hoc; sealing the complete bundle binds its local `Info.plist` and icon so LaunchServices can open it. There is no Team ID, Developer ID, notarization, or Apple distribution identity. A bundle built locally opened without a Gatekeeper dialog in the tested environment. If a copied or downloaded build is blocked, use Finder's contextual **Open** action and confirm that one app; do not disable Gatekeeper system-wide.

## Troubleshooting and Fallback

If the app cannot locate the repository, rebuild it in this repository and keep it under `dist/`. If Python 3 is unavailable or startup fails, the app shows a concise alert and the log remains available in the system temporary directory. `Start Mindful Health Balance.command` remains the transparent fallback for diagnosis. The manual `python3 -m http.server` path remains documented as a final fallback.

The generated app is repository-relative in this slice. Moving it independently to `/Applications` or `~/Applications` is not supported yet because the server must still locate the MHB source directory.

## QA

Deterministic checks validate bundle structure, plist fields, executable permissions, ICNS presence, shared-core delegation, loopback binding, port order, collision fallback, Python failure copy, Ollama optionality, and absence of process killing or external runtime dependencies. Live macOS QA confirmed local page loading, repeated-launch server reuse, no console error, custom icon artwork at Finder-scale tiers, and unchanged browser runtime behavior.
