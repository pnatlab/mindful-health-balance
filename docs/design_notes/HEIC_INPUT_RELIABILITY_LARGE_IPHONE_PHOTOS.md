# MHB 2.4I - HEIC Input Reliability and Large iPhone Photo Handling

## Status

**Reliable with constraints.** This bounded patch improves local HEIC input diagnosis and responsiveness in the experimental Vision helper. The public runtime remains **MHB 2.3 - Gentle Meal Composition**.

It changes only the path before the existing optional Vision provider:

```text
Large iPhone HEIC -> local decode -> local 1600 px JPEG -> unchanged local provider
```

No prompt, model, observation contract, Food Reference mapping, named-dish behavior, sodium routing, workbook, `Daily_Log`, Reflection, or Meal record schema changed.

## Corpus and Privacy

The authorized local personal corpus contained nine HEIC images. It remains ignored and outside Git. The audit used normalization only first: no image was sent to Ollama during that stage. This note intentionally de-identifies samples and does not contain filenames, image bytes, base64, raw model output, or food observations.

Images, decoded frames, JPEG derivatives, object URLs, and diagnostics are transient. They are not persisted to localStorage, IndexedDB, Meal records, `Daily_Log`, workbooks, Reflection, or Git. The provider remains loopback-only when a later observation request is made.

## Normalization-Only Audit

All nine images normalized successfully in two sequential browser passes.

| Source group | Count | Source dimensions | Compressed source range | Output | Warm conversion range |
| --- | ---: | --- | --- | --- | --- |
| Standard iPhone | 5 | `3024 x 4032` | 1,206,296-2,080,025 bytes | `1200 x 1600` JPEG | 378-468 ms |
| Large iPhone | 4 | `4284 x 5712` | 2,030,929-2,640,946 bytes | `1200 x 1600` JPEG | 744-902 ms |

The first conversion in each pass loaded the decoder and took about 2.5 seconds. Normalized JPEGs were 335,930-535,111 bytes. There were no decode, allocation, canvas, JPEG encode, orientation, or timeout failures in this corpus. The UI did not remain stuck in the preparing state during repeated use.

The corpus shows that a normal 24.47-megapixel iPhone photo can reach the fixed 1600 px target. It does not prove unlimited browser-memory support, and it cannot identify which previous field-selected file failed because that failure was not reproducible in the controlled corpus.

## Root-Cause Assessment

No single failure root cause was reproduced. The audit rules out a simple policy that rejects `4284 x 5712` sources: all four such samples converted twice.

The remaining technical risk is the decoder's full-frame memory pattern. The vendored `@keeratita/heic-converter@0.3.0` decoder creates a full decoded image before MHB resizes it. One `4284 x 5712` RGBA frame is roughly 93 MiB before canvas/bitmap overhead. A constrained browser, unusual HEIC subtype, corrupt image, or allocation failure can therefore still fail before the 1600 px resize. The implementation now distinguishes these stages internally instead of collapsing them into one generic conversion failure.

## Reliability Patch

`js/mealVisionImageNormalizer.js` remains the only image-format owner.

- It classifies `decoder_failed`, `allocation_failed`, `bitmap_decode_failed`, `canvas_failed`, `jpeg_encode_failed`, and `unknown_image_error` in transient diagnostics.
- It retains the existing local decoder and `1600 px` / JPEG `0.90` output policy.
- It closes the decoded `ImageBitmap` after resize.
- It does not impose an arbitrary source-size or source-pixel ceiling; this corpus provides no evidence for one below 24.47 megapixels.

`js/mealCompositionUI.js` renders the localized preparing state, then yields one animation frame before expensive normalization begins. The draft remains untouched during this work. This is a small main-thread responsiveness safeguard, not a worker or a new image-processing system.

## Failure and User Boundary

If normalization fails, MHB retains the meal draft and offers the existing calm image-preparation fallback. It does not claim the file format is unsupported when the actual condition is a conversion failure. Manual Meal Composer use remains available.

The provider receives a normalized JPEG Blob only. It has no HEIC logic. Normalization does not apply observations, save a meal, set `named_dish_id`, select evidence, or invoke sodium routing.

## Browser End-to-End Check

The controlled normalization audit is complete. The planned live end-to-end check of one or two large HEIC images could not be completed in this session because the local browser-control connection became unavailable after the user authorized the loopback-only transmission. No fallback transport was used and no image was sent after that connection failure.

The required next local QA action is narrow: select one or two authorized `4284 x 5712` HEIC files in Meal Composer, verify local normalization reaches `VisionMealObservation` review through `http://127.0.0.1:11434`, and do not apply the review. This is transport/review confirmation only; vision accuracy is out of scope.

## Verification

The following automated checks passed:

- `node tests/mealVisionImageNormalizer.test.js`
- `node tests/localVisionProvider.test.mjs`
- `node tests/mealVisionReview.test.js`
- `node tests/mealCompositionRuntime.test.js`
- `node tests/mealCompositionUI.test.js`

The normalizer tests cover large-HEIC mock success, classification of converter/allocation failures, fixed size policy, source preservation, explicit bitmap cleanup, passthrough paths, and absence of persistence APIs.

## Decision and Follow-Up

Decision: **reliable_with_constraints**.

The current local path supports the measured nine-image corpus, including large normal iPhone photos, without a user-side conversion step. Keep the 1600 px / JPEG 0.90 target. Do not add a source-size rejection threshold or a Web Worker yet. The smallest next action is the deferred live large-HEIC-to-review QA once browser control is available; investigate decoder replacement or worker isolation only if a reproducible allocation/decode failure appears in field use.
