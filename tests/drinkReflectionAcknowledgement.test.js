const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const acknowledgement = require("../js/drinkReflectionAcknowledgement.js");

let state = acknowledgement.createState();
assert.deepEqual(state, { isOpen: false, message: "", triggerCount: 0 });

state = acknowledgement.openForSuccessfulAdd(state, { succeeded: false, reflectionText: "Coffee is okay." });
assert.equal(state.isOpen, false, "a failed add never opens acknowledgement");

state = acknowledgement.openForSuccessfulAdd(state, { succeeded: true, reflectionText: "   " });
assert.equal(state.isOpen, false, "an empty reflection never opens acknowledgement");

state = acknowledgement.openForSuccessfulAdd(state, { succeeded: true, reflectionText: "Coffee is okay, but do not let it replace water." });
assert.deepEqual(state, {
  isOpen: true,
  message: "Coffee is okay, but do not let it replace water.",
  triggerCount: 1
}, "a successful add carries the current reflection text into one acknowledgement state");

state = acknowledgement.dismiss(state);
assert.deepEqual(state, { isOpen: false, message: "", triggerCount: 1 }, "dismissal is presentation-only");
state = acknowledgement.openForSuccessfulAdd(state, { succeeded: true, reflectionText: "Let the next drink be simpler." });
assert.equal(state.triggerCount, 2, "each later successful add creates one fresh acknowledgement, not a stack");
assert.equal(state.isOpen, true);

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const modalBlock = html.match(/<section class="drink-reflection-modal"[\s\S]*?<\/section>/)?.[0] || "";

assert.match(html, /src="js\/drinkReflectionAcknowledgement\.js"/, "the acknowledgement state helper is local");
assert.match(modalBlock, /role="dialog"/);
assert.match(modalBlock, /aria-modal="true"/);
assert.match(modalBlock, /aria-labelledby="drinkReflectionModalTitle"/);
assert.match(modalBlock, /id="acknowledgeDrinkReflection"/);
assert.doesNotMatch(modalBlock, /https?:\/\//, "the modal adds no remote asset");
assert.doesNotMatch(html, /drink-insight-card/, "the duplicate full inline insight has been removed");
assert.doesNotMatch(script, /drinkInsightTitle/, "the unused inline insight copy is not retained as a second presentation path");
assert.match(script, /appState\.drinkProfiles = [\s\S]*?syncUIAndPersistDraft\(\);\s*openDrinkReflectionAcknowledgement/, "drink data saves before the acknowledgement opens");
assert.match(script, /getDrinksFeedback\(\)/, "the modal reuses the existing deterministic reflection output");
assert.match(script, /event\.key === "Escape"/);
assert.match(script, /drinkAcknowledgementTitle: "บันทึกเครื่องดื่มนี้แล้ว"/);
assert.match(script, /drinkAcknowledgementTitle: "Drink recorded"/);
assert.match(script, /drinkAcknowledgementTitle: "这杯饮品已记录"/);

console.log("Drink reflection acknowledgement tests passed.");
