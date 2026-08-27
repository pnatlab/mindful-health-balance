# MHB 2.4F - HEIC Local Image Normalization Support

## Status

**Implemented as a bounded compatibility refinement inside the experimental MHB 2.4 Vision path.** The public runtime remains **MHB 2.3 - Gentle Meal Composition**.

HEIC/HEIF support is an image-input compatibility layer only. It does not change the authority chain, Meal record schema, sodium logic, named-dish logic, workbook, `Daily_Log`, or Reflection.

```text
HEIC/HEIF File -> local transient normalization -> JPEG Blob
              -> existing local Vision provider -> validated review flow
```

## Native Capability Finding

On the current local browser, the authorized `IMG_0046.HEIC` sample could not decode natively:

- `createImageBitmap`: `InvalidStateError` in 7 ms
- `HTMLImageElement.decode()`: `EncodingError` in 1 ms

This is why a browser-native/canvas-only path is not the canonical solution for MHB. The same original direct File-to-Ollama request had previously returned HTTP 400 `Failed to load image or audio file`.

## Chosen Converter

MHB vendors the browser distribution of `@keeratita/heic-converter@0.3.0` under `js/vendor/heic-converter/`:

- license: MIT; a copy is kept beside the local assets;
- package dependency count: zero production dependencies;
- local assets: `index.mjs` (about 71 KB) and `heic-decoder.wasm` (about 1.20 MB);
- package integrity: `sha512-Njfxx+CHOpLdu+1hkcdrtsVpkVv6Iwq4a17OeKR4jeJ/c+NXROOnv7OMeuO3go2juVJ0Tj3EjQnvO3Tn9KAXdg==`;
- no CDN, telemetry, cloud conversion, Python service, or bridge is used.

`heic-to@1.5.2` was not selected because its LGPL-3.0 license and about 24.36 MB unpacked footprint are materially larger for this bounded static-app use. Older `heic-convert` was also not selected because it has an older browser path and additional dependencies.

The converter is lazy-imported only when a HEIC/HEIF image is selected. Its WASM binary is fetched only from the same local/static origin as the vendored module.

## Normalizer Contract

`js/mealVisionImageNormalizer.js` remains the single owner of input compatibility.

- JPEG, PNG, and WebP pass through unchanged.
- HEIC/HEIF is detected conservatively from MIME type and extension, including the sequence MIME variants.
- HEIC/HEIF is decoded locally, rendered as JPEG, and normalized to a maximum dimension of 1600 px with JPEG quality `0.9`.
- Conversion returns a transient provider-compatible Blob plus source/normalized format, conversion flag, dimensions when available, byte sizes, and conversion latency.
- Unsupported or failed conversion returns a bounded failure object; it never throws into Meal Composer.

The provider remains format-neutral: it receives only a normalized Blob and does not contain HEIC/HEIF detection or conversion behavior.

## Orientation, Size, and Measured Result

The authorized iPhone sample's container reported `4032 x 3024`; the local decoder emitted an upright portrait image before MHB resized it to `1200 x 1600`. The displayed thumbnail was neither rotated nor mirrored.

Measured local normalization for that sample:

| Field | Result |
| --- | --- |
| Source | HEIC, 2,080,025 bytes |
| Output | JPEG, 485,296 bytes |
| Conversion | 2,561 ms |
| Dimensions | 3024 x 4032 -> 1200 x 1600 |

The resize bound matches the successful 2.4B derivative dimensions and reduces the local provider request burden without exposing image-quality controls in the UI. A full HEIC decode still temporarily needs meaningful browser memory; the converter releases its decoder after each conversion and MHB keeps only the selected image/session Blob in memory.

## UX and Failure Behavior

The file picker now truthfully accepts JPEG, PNG, WebP, HEIC, and HEIF. A HEIC/HEIF conversion begins with the localized, honest preparing state before provider availability is checked. If conversion fails, MHB says the image could not be prepared, keeps the Meal Composer draft unchanged, and leaves manual composition available.

Converted images, original Files, previews, base64 request data, raw model output, and review state remain transient. They are not written to localStorage, IndexedDB, Meal records, `Daily_Log`, workbooks, Reflection, or Git. Object URLs are revoked when the Vision session clears, is replaced, or ends.

## Authority Boundaries

HEIC normalization happens before the existing Vision provider and has no meal meaning. It cannot:

- apply observations to the draft;
- create a Meal Instance or save a meal;
- set `named_dish_id`;
- select a Food Reference;
- call sodium evidence routing; or
- add nutrition, medical, or hidden-ingredient claims.

The converted JPEG follows the exact existing flow: provider -> deterministic validation -> transient `VisionMealObservation` -> human review -> optional accepted prefill -> separate named-dish confirmation.

## Browser QA

The authorized original HEIC reached the real Meal Composer flow. It normalized locally, was accepted by local `gemma3:12b` through `http://127.0.0.1:11434`, and displayed a Vision review card. The review appeared before any draft mutation; at that point there were no saved meals, no confirmed named dish, and no Vision sodium text. The transient preview reported `1200 x 1600`.

JPEG/PNG/WebP remain passthrough paths under unit coverage. Unit coverage also verifies HEIC/HEIF MIME and extension detection, mock conversion success/failure, source-format metadata, original-Blob identity, no persistence API in the normalizer, and provider format neutrality.

## Limitations and Follow-up

- Conversion runs on the browser main thread and can make large HEIC images briefly busy; MHB deliberately shows an honest preparing state rather than fake progress.
- This is a single-image first-frame conversion, not a Live Photo or multi-frame media workflow.
- HEIC files that the vendored libheif decoder cannot read fail calmly; MHB does not add a remote fallback.
- Browser memory was observed only conservatively in this slice. A later performance slice may consider worker isolation, but must preserve the same local-only and transient boundaries.

## 2.4I Reliability Addendum

MHB 2.4I audited the authorized nine-file local HEIC corpus using normalization only, then repeated the same sequence after adding reliability diagnostics. Both passes normalized all nine files to upright `1200 x 1600` JPEGs. The corpus included five `3024 x 4032` images and four `4284 x 5712` images; the latter are about 24.47 megapixels. No corpus sample reproduced the earlier field report of ending during preparation.

The output policy remains unchanged: maximum dimension `1600 px`, JPEG quality `0.90`. No source-byte or source-pixel rejection threshold was added because the largest tested normal iPhone files (up to 24.47 megapixels and about 2.52 MiB compressed) converted successfully. The normalizer now provides private, transient failure diagnostics for decoder, allocation, bitmap decode, canvas, JPEG encode, and unknown image failures. The UI still shows only calm non-technical copy.

The vendored decoder still expands a full source frame before MHB can resize it. A `4284 x 5712` RGBA frame alone is roughly 93 MiB, so peak temporary memory may include more than one large browser-side buffer. MHB closes its decoded bitmap after resizing and yields one render frame after showing the preparing state before work begins. This improves visible responsiveness and diagnosis, but it is not a worker-based decode path. Large-phone reliability is therefore recorded as **reliable with constraints**, not as an unlimited-memory guarantee.
