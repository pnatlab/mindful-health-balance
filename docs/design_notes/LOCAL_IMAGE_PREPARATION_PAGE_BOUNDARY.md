# MHB 2.5A - Local Image Preparation Page & Boundary Lock

## Purpose

`image-prep.html` is a small, same-repository preparation room for one meal photo. It makes phone-sized image input compatible before optional local Vision sees it. It is not a meal editor, a Vision provider, or a record.

## Ownership

```
Image Preparation Page -> image compatibility
Vision provider -> observation
Meal Composer -> unsaved meal draft
Human -> review, acceptance, and meal save
Evidence layer -> sodium and provenance facts
```

The page knows no Meal Type, Food Reference, `named_dish_id`, sodium, Reflection, Meal record, workbook, or Ollama detail.

## Input and Output

The page accepts JPEG, PNG, WebP, HEIC, and HEIF through the canonical `mealVisionImageNormalizer.js`. It always prepares a transient JPEG with the locked policy: maximum dimension `1600 px`, quality `0.90`. The normalizer remains the only owner of HEIC decoding and orientation/resize work.

The prepared envelope contains only an opaque image Blob plus format, dimensions, a transient identifier, and timestamp. It deliberately contains no meal or evidence fields. It is never written to localStorage, IndexedDB, Daily_Log, a Meal Instance, workbook, or Git.

## Navigation and Handoff

Meal Composer opens `image-prep.html` in a same-origin popup. The composer stays open, so its in-memory draft cannot be lost to a same-tab page replacement. After an explicit `Use this image with this meal` action, the child sends the prepared JPEG Blob through a tokenized `postMessage`.

The parent accepts a message only when its origin, source window, message type, opaque token, and envelope shape all match. It rejects image formats other than JPEG at the handoff boundary. Cancel closes the preparation page and changes no meal state. Reloading either page may discard a prepared image; that is intentional in this bounded prototype.

The handoff begins the existing Vision availability/observation flow, but it does not itself send an image to Ollama, create a Vision observation, or accept a review. Preparation confirmation is not Vision-review acceptance.

## Privacy and Failure Behavior

Preparation is local-only and makes no provider, cloud, telemetry, or third-party conversion request. HEIC decoder constraints remain documented in the 2.4 reliability note. A failed decode or JPEG encode leaves no handoff artifact and presents calm retry copy; the Meal Composer draft remains untouched.

## Access and Presentation

The page uses a semantic file input, keyboard-accessible actions, visible focus, `aria-live` status, bounded preview alt text, and theme-aware styles that hold at narrow widths. It intentionally has no crop, filter, camera, gallery, batch, model, prompt, or food-analysis controls.

## QA Evidence

Local browser QA prepared one authorized HEIC entirely in the browser: the `3024 x 4032` source (`1.98 MB`) became an upright transient `1200 x 1600` JPEG (`474 KB`) for preview. The existing local provider then accepted a normalized HEIC-derived image at loopback and produced a review card before any Meal Item, named-dish confirmation, save, or sodium output changed.

The in-app browser used for automation does not expose popup tabs reliably, so its concrete child-to-parent handoff was covered by deterministic bridge tests rather than an automated popup interaction. The production handoff code itself is same-origin, tokenized, source-window checked, and validated before it can enter the existing Vision path. Dark-mode and `390 px` layout checks were readable with no horizontal overflow.

## Future Extraction

The preparation modules are app-agnostic where practical: `imagePrepBridge.js` owns message validation and `imagePrepUI.js` owns the page interaction. They remain in MHB for setup simplicity, continuous local UX, and near-term field use. Another app could later extract the modules in a dedicated integration patch without importing Meal Composer or Vision provider logic.
