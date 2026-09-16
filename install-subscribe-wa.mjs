import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = fs.existsSync(path.join(root, "taxcheck-site")) ? path.join(root, "taxcheck-site") : root;
const F = { pages: path.join(site, "render", "pages.mjs"), content: path.join(site, "content", "content.json") };
for (const [k, p] of Object.entries(F)) if (!fs.existsSync(p)) { console.error("STOP: missing " + k + " at " + p); process.exit(1); }

const changed = [];
function patch(file, from, to, label) {
  let s = fs.readFileSync(file, "utf8");
  if (s.includes("\r\n")) { from = from.replace(/\n/g, "\r\n"); to = to.replace(/\n/g, "\r\n"); }
  if (s.includes(to)) { console.log("OK      " + label + " (already)"); return; }
  const n = s.split(from).length - 1;
  if (n !== 1) { console.error("STOP: " + label + " - expected 1 match, found " + n); process.exit(1); }
  fs.writeFileSync(file, s.replace(from, to), "utf8");
  changed.push(file); console.log("PATCHED " + label);
}

patch(F.pages, "import { href, APP_URL, ZIINA, pageHero, sectionHead, ctaBand, sampleNote } from '../lib/layout.mjs';", "import { href, APP_URL, ZIINA, PHONE_E164, pageHero, sectionHead, ctaBand, sampleNote } from '../lib/layout.mjs';", "pages.mjs import");
patch(F.pages, "  <a class=\"btn btn-gold btn-lg\" href=\"${APP_URL}\">${esc(p.cta)} ${esc(pl.name)} ${icons.arrow(16)}</a>${pl.foot ? `<span class=\"ziina\">${esc(pl.foot)}</span>` : ''}", "  ${pl.wa\n    ? `<a class=\"btn btn-gold btn-lg\" href=\"https://wa.me/${PHONE_E164}?text=${encodeURIComponent(pl.wa)}\" rel=\"noopener\" target=\"_blank\">${icons.wa(16)} ${esc(p.ctaWa)} ${esc(pl.name)}</a>`\n    : `<a class=\"btn btn-gold btn-lg\" href=\"${APP_URL}\">${esc(p.cta)} ${esc(pl.name)} ${icons.arrow(16)}</a>`}${pl.foot ? `<span class=\"ziina\">${esc(pl.foot)}</span>` : ''}", "pages.mjs plan CTA");
patch(F.pages, "    <div class=\"plans\">${p.plans.map(plan).join('')}</div>", "    <div class=\"plans\">${p.plans.map(plan).join('')}</div>\n    ${p.howToPay ? `<p class=\"note rv\" data-rv style=\"text-align:center;margin-top:20px\">${esc(p.howToPay)}</p>` : ''}", "pages.mjs how-to-pay note");

const PRICING = {"en": {"ctaWa": "Subscribe to", "howToPay": "Subscribing goes through WhatsApp: we confirm your company details, send a secure payment link, then activate your account.", "wa": {"basic": "Hello, I would like to subscribe to the Basic plan (AED 750 per year).", "pro": "Hello, I would like to subscribe to the Professional plan (AED 1,500 per year).", "firm": "Hello, I would like to subscribe to the Firm plan (AED 3,000 per year)."}}, "ar": {"ctaWa": "\u0627\u0634\u062a\u0631\u0643 \u0628\u0640", "howToPay": "\u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628: \u0646\u062a\u062d\u0642\u0642 \u0645\u0646 \u0628\u064a\u0627\u0646\u0627\u062a \u0634\u0631\u0643\u062a\u0643\u060c \u0648\u0646\u0631\u0633\u0644 \u0644\u0643 \u0631\u0627\u0628\u0637 \u062f\u0641\u0639 \u0622\u0645\u0646\u060c \u062b\u0645 \u0646\u0641\u0639\u0651\u0644 \u062d\u0633\u0627\u0628\u0643.", "wa": {"basic": "\u0645\u0631\u062d\u0628\u0627\u064b\u060c \u0623\u0631\u064a\u062f \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0641\u064a \u062e\u0637\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 (750 \u062f\u0631\u0647\u0645 \u0633\u0646\u0648\u064a\u0627\u064b).", "pro": "\u0645\u0631\u062d\u0628\u0627\u064b\u060c \u0623\u0631\u064a\u062f \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0641\u064a \u062e\u0637\u0629 \u0627\u0644\u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 (1,500 \u062f\u0631\u0647\u0645 \u0633\u0646\u0648\u064a\u0627\u064b).", "firm": "\u0645\u0631\u062d\u0628\u0627\u064b\u060c \u0623\u0631\u064a\u062f \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0641\u064a \u062e\u0637\u0629 \u0627\u0644\u0645\u0643\u0627\u062a\u0628 (3,000 \u062f\u0631\u0647\u0645 \u0633\u0646\u0648\u064a\u0627\u064b)."}}};
const raw = fs.readFileSync(F.content, "utf8");
const c = JSON.parse(raw);
let edits = 0;
for (const lang of ["en", "ar"]) {
  const p = c[lang].pricing;
  if (!p) { console.error("STOP: content." + lang + ".pricing not found"); process.exit(1); }
  if (p.ctaWa !== PRICING[lang].ctaWa) { p.ctaWa = PRICING[lang].ctaWa; edits++; }
  if (p.howToPay !== PRICING[lang].howToPay) { p.howToPay = PRICING[lang].howToPay; edits++; }
  for (const pl of p.plans) {
    const t = PRICING[lang].wa[pl.id];
    if (t && pl.wa !== t) { pl.wa = t; edits++; }
  }
  const paid = p.plans.filter((pl) => pl.wa).length;
  if (paid !== 3) { console.error("STOP: expected 3 paid plans with a WhatsApp message, got " + paid); process.exit(1); }
}
if (edits) {
  let out = JSON.stringify(c, null, 1) + (raw.replace(/\r/g, "").endsWith("\n") ? "\n" : "");
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  fs.writeFileSync(F.content, out, "utf8");
  changed.push(F.content); console.log("PATCHED content.json (" + edits + " fields)");
} else console.log("OK      content.json (already)");

console.log("\nDONE - " + (changed.length ? "files changed: " + [...new Set(changed)].map((f) => path.relative(root, f)).join(", ") : "nothing to change"));
