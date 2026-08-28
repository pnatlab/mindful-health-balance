const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const assetPath = path.join(root, "assets/brand/mhb-header-mark.png");

assert.equal((html.match(/class="app-brand-mark"/g) || []).length, 1, "the header renders one brand mark");
assert.match(html, /<img class="app-brand-mark" src="assets\/brand\/mhb-header-mark\.png" alt="" aria-hidden="true">/);
assert.match(html, /<h1 data-i18n="appShortTitle">Mindful Health Balance<\/h1>/, "the title remains the semantic heading");
assert.ok(!/app-brand-mark" src="https?:\/\//.test(html), "the brand mark has no remote URL");
assert.ok(fs.statSync(assetPath).size > 0, "the local brand asset exists");
assert.match(css, /\.app-brand-mark\s*\{[\s\S]*?width:\s*44px;[\s\S]*?height:\s*44px;/);
assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.app-brand-mark\s*\{[\s\S]*?width:\s*34px;[\s\S]*?height:\s*34px;/);

console.log("Header brand mark tests passed.");
