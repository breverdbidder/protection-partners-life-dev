// Scans all prerendered HTML in .next/server/app and fails if any page's
// text-to-HTML ratio drops below MIN_RATIO. Semrush flags pages at or under
// 10%, so this guards every prerendered route. Run after `next build`.
// (Dynamic ƒ routes aren't prerendered — measure those with `npm start` + curl.)
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const MIN_RATIO = 0.11;
const APP_ROOT = join(process.cwd(), ".next", "server", "app");

// Build artifacts that aren't public pages an SEO auditor would ever crawl.
const EXCLUDED_ROUTES = new Set(["/_global-error", "/_not-found"]);

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "api" && dir === APP_ROOT ? [] : htmlFiles(path);
    }
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

let files;
try {
  files = htmlFiles(APP_ROOT);
} catch {
  console.error("check-text-ratio: .next/server/app not found — run `next build` first.");
  process.exit(1);
}
files = files.filter((file) => {
  const route = "/" + relative(APP_ROOT, file).replace(/\.html$/, "");
  return !EXCLUDED_ROUTES.has(route);
});

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"');

function textToHtmlRatio(html) {
  const withoutScripts = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const text = decode(withoutScripts.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return text.length / html.length;
}

// SEO audits only score indexable pages, so noindexed routes (privacy, terms)
// don't need the ratio floor.
const isNoindex = (html) => /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);

const failures = [];
let skipped = 0;
let worst = { ratio: Infinity, route: "" };
for (const file of files) {
  const html = readFileSync(file, "utf-8");
  if (isNoindex(html)) {
    skipped++;
    continue;
  }
  const ratio = textToHtmlRatio(html);
  const route = "/" + relative(APP_ROOT, file).replace(/\.html$/, "");
  if (ratio < worst.ratio) worst = { ratio, route };
  if (ratio < MIN_RATIO) failures.push({ route, ratio });
}

if (failures.length > 0) {
  console.error(`${failures.length} page(s) have a text-to-HTML ratio below ${MIN_RATIO * 100}%:\n`);
  for (const { route, ratio } of failures.sort((a, b) => a.ratio - b.ratio)) {
    console.error(`  ${(ratio * 100).toFixed(1)}%  ${route}`);
  }
  process.exit(1);
}
console.log(
  `check-text-ratio: all ${files.length - skipped} indexable prerendered pages are above ${MIN_RATIO * 100}% ` +
    `(lowest: ${(worst.ratio * 100).toFixed(1)}% at ${worst.route}; ${skipped} noindexed page(s) skipped).`,
);
