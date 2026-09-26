// Scans prerendered HTML in .next/server/app and fails if any <title>
// exceeds MAX_TITLE_LENGTH (search engines truncate around 70 chars).
// Run after `next build`.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const MAX_TITLE_LENGTH = 70;
const ROOT = join(process.cwd(), ".next", "server", "app");

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

let files;
try {
  files = htmlFiles(ROOT);
} catch {
  console.error("check-titles: .next/server/app not found — run `next build` first.");
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"');

const failures = [];
for (const file of files) {
  const match = readFileSync(file, "utf-8").match(/<title>(.*?)<\/title>/s);
  if (!match) continue;
  const title = decode(match[1]).trim();
  if (title.length > MAX_TITLE_LENGTH) {
    failures.push({ route: "/" + relative(ROOT, file).replace(/\.html$/, "").replace(/(^|\/)index$/, ""), title });
  }
}

if (failures.length > 0) {
  console.error(`${failures.length} page(s) have a <title> longer than ${MAX_TITLE_LENGTH} characters:\n`);
  for (const { route, title } of failures) {
    console.error(`  ${title.length} chars  ${route}\n            ${title}`);
  }
  process.exit(1);
}
console.log(`check-titles: all ${files.length} prerendered pages have titles ≤ ${MAX_TITLE_LENGTH} chars.`);
