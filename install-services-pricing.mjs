import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = fs.existsSync(path.join(root, "taxcheck-site")) ? path.join(root, "taxcheck-site") : root;
const F = { generic: path.join(site, "render", "generic.mjs"), content: path.join(site, "content", "content.json") };
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

patch(F.generic, "import { href, APP_URL, pageHero, ctaBand } from '../lib/layout.mjs';", "import { href, APP_URL, pageHero, sectionHead, ctaBand } from '../lib/layout.mjs';", "generic.mjs import");
patch(F.generic, "  return pageHero({ kicker: p.kicker, title: esc(p.title), sub: p.sub, ctas }) + sections + note + cta;", "  // Fixed-price services table (only on pages whose dictionary carries `prices`).\n  const prices = p.prices ? `\n<section class=\"gsec\">\n  <div class=\"wrap\">\n    ${sectionHead(p.priceKicker, p.priceTitle, p.priceSub)}\n    <div class=\"tbl-wrap rv\" data-rv><table class=\"tbl\"><thead><tr>${p.priceCols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${p.prices.map((r) => `<tr><td>${esc(r.h)}</td><td>${esc(r.e)}</td><td class=\"num\" style=\"text-align:start\"><b>${esc(r.amt)}</b></td></tr>`).join('')}</tbody></table></div>\n    <p class=\"note rv\" data-rv>${esc(p.priceNote)}</p>\n    <a class=\"btn btn-gold rv\" data-rv style=\"margin-top:16px\" href=\"${href(lang, 'contact')}\">${esc(p.priceCta)} ${icons.arrow(16)}</a>\n  </div>\n</section>` : '';\n\n  return pageHero({ kicker: p.kicker, title: esc(p.title), sub: p.sub, ctas }) + prices + sections + note + cta;", "generic.mjs price table");

const D = {"ar": {"firmD": "\u0639\u0645\u0644\u0627\u0621 \u0628\u0644\u0627 \u062d\u062f \u0639\u0644\u0649 \u0644\u0648\u062d\u0629 \u0648\u0627\u062d\u062f\u0629 \u2014 \u0648\u062e\u0635\u0645 25% \u0639\u0644\u0649 \u0643\u0644 \u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645.", "firmFrom": "\u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645 \u0648\u0627\u062d\u062f\u0629 \u0645\u0634\u0645\u0648\u0644\u0629 \u0643\u0644 \u0633\u0646\u0629", "firmTo": "\u062e\u0635\u0645 25% \u0639\u0644\u0649 \u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645", "rowFrom": "\u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645 \u0645\u0634\u0645\u0648\u0644\u0629", "rowTo": "\u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645", "rowVal": "\u062e\u0635\u0645 25%", "priceKicker": "\u0623\u0633\u0639\u0627\u0631 \u0645\u0639\u0644\u0646\u0629", "priceTitle": "\u0623\u0631\u0628\u0639 \u062e\u062f\u0645\u0627\u062a \u0628\u0633\u0639\u0631 \u062b\u0627\u0628\u062a", "priceSub": "\u0648\u0645\u0627 \u0639\u062f\u0627\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u2014 \u0643\u0644 \u062d\u0627\u0644\u0629 \u062a\u064f\u0633\u0639\u0651\u0631 \u0628\u0639\u062f \u0645\u0643\u0627\u0644\u0645\u0629 \u0642\u0635\u064a\u0631\u0629.", "priceCols": ["\u0627\u0644\u062e\u062f\u0645\u0629", "\u0627\u0644\u062c\u0647\u062f", "\u0627\u0644\u0633\u0639\u0631"], "prices": [{"h": "\u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645", "e": "\u0646\u0635\u0641 \u064a\u0648\u0645 \u2013 \u064a\u0648\u0645", "amt": "2,500 \u062f\u0631\u0647\u0645"}, {"h": "\u0641\u062d\u0635 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0627\u0645\u062a\u062b\u0627\u0644", "e": "\u064a\u0648\u0645", "amt": "3,500 \u062f\u0631\u0647\u0645"}, {"h": "\u062c\u0627\u0647\u0632\u064a\u0629 \u0627\u0644\u0641\u0648\u062a\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629", "e": "2\u20133 \u0623\u064a\u0627\u0645", "amt": "7,500 \u062f\u0631\u0647\u0645"}, {"h": "\u062a\u0646\u0638\u064a\u0641 \u0648\u062a\u0633\u0648\u064a\u0629 \u0623\u0648 \u0625\u0642\u0631\u0627\u0631 \u0645\u062a\u0623\u062e\u0631", "e": "2\u20134 \u0623\u064a\u0627\u0645", "amt": "\u0645\u0646 5,000 \u062f\u0631\u0647\u0645"}], "priceNote": "\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062f\u0631\u0647\u0645 \u0644\u0643\u0644 \u062e\u062f\u0645\u0629. \u0627\u0644\u062c\u0647\u062f \u062a\u0642\u062f\u064a\u0631\u064a \u0648\u064a\u064f\u062b\u0628\u0651\u062a \u0641\u064a \u0639\u0631\u0636 \u0645\u0643\u062a\u0648\u0628 \u0642\u0628\u0644 \u0627\u0644\u0628\u062f\u0621\u060c \u0648\u062a\u062e\u0636\u0639 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0644\u0644\u062a\u0648\u0627\u0641\u0631.", "priceCta": "\u0627\u0637\u0644\u0628 \u0639\u0631\u0636\u0627\u064b"}, "en": {"firmD": "Unlimited clients on one board \u2014 plus 25% off every Pre-Filing Review.", "firmFrom": "One Pre-Filing Review included each year", "firmTo": "25% off every Pre-Filing Review", "rowFrom": "Pre-Filing Review included", "rowTo": "Pre-Filing Review", "rowVal": "25% off", "priceKicker": "Published prices", "priceTitle": "Four services, priced up front", "priceSub": "Everything else is on request \u2014 each case is quoted after a short call.", "priceCols": ["Service", "Effort", "Price"], "prices": [{"h": "Pre-Filing Review", "e": "Half a day \u2013 a day", "amt": "AED 2,500"}, {"h": "Compliance health check", "e": "A day", "amt": "AED 3,500"}, {"h": "e-Invoicing readiness", "e": "2\u20133 days", "amt": "AED 7,500"}, {"h": "Cleanup, reconciliation or a late return", "e": "2\u20134 days", "amt": "From AED 5,000"}], "priceNote": "Prices are per service. The effort is an estimate, fixed in a written quote before work starts, and all services are subject to availability.", "priceCta": "Request a quote"}};
const raw = fs.readFileSync(F.content, "utf8");
const c = JSON.parse(raw);
let edits = 0;
for (const lang of ["ar", "en"]) {
  const d = D[lang];
  const firm = c[lang].pricing.plans.find((pl) => pl.id === "firm");
  if (!firm) { console.error("STOP: firm plan not found in " + lang); process.exit(1); }
  if (firm.d !== d.firmD) { firm.d = d.firmD; edits++; }
  const i = firm.f.indexOf(d.firmFrom);
  if (i >= 0) { firm.f[i] = d.firmTo; edits++; }
  else if (!firm.f.includes(d.firmTo)) { console.error("STOP: firm feature line not found in " + lang); process.exit(1); }
  const row = c[lang].pricing.compRows.find((r) => r.l === d.rowFrom || r.l === d.rowTo);
  if (!row) { console.error("STOP: comparison row not found in " + lang); process.exit(1); }
  if (row.l !== d.rowTo) { row.l = d.rowTo; edits++; }
  if (row.v[3] !== d.rowVal) { row.v[3] = d.rowVal; edits++; }
  const sp = c[lang].pages.services;
  if (!sp) { console.error("STOP: services page not found in " + lang); process.exit(1); }
  for (const key of ["priceKicker", "priceTitle", "priceSub", "priceNote", "priceCta"]) {
    if (sp[key] !== d[key]) { sp[key] = d[key]; edits++; }
  }
  if (JSON.stringify(sp.priceCols) !== JSON.stringify(d.priceCols)) { sp.priceCols = d.priceCols; edits++; }
  if (JSON.stringify(sp.prices) !== JSON.stringify(d.prices)) { sp.prices = d.prices; edits++; }
}
if (edits) {
  let out = JSON.stringify(c, null, 1) + (raw.replace(/\r/g, "").endsWith("\n") ? "\n" : "");
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  fs.writeFileSync(F.content, out, "utf8");
  changed.push(F.content); console.log("PATCHED content.json (" + edits + " fields)");
} else console.log("OK      content.json (already)");

console.log("\nDONE - " + (changed.length ? "files changed: " + [...new Set(changed)].map((f) => path.relative(root, f)).join(", ") : "nothing to change"));
