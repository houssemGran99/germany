/**
 * Downloads the lead image of each Wikipedia article listed in
 * `photo-sources.mjs`, records the Commons author + licence, optimises the
 * file with sharp and writes `src/data/photos.generated.ts`.
 *
 * Run with: npm run images
 * Safe to re-run — already-downloaded files are skipped unless --force.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { photoSources } from "./photo-sources.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "destinations");
const DATA_FILE = path.join(ROOT, "src", "data", "photos.generated.ts");
const TODO_FILE = path.join(ROOT, "IMAGE-TODO.md");

const UA = "SchoenesDeutschland/1.0 (static travel site; image attribution pipeline)";
const FORCE = process.argv.includes("--force");
const MAX_WIDTH = 2400;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === 2) throw err;
      await sleep(600 * (attempt + 1));
    }
  }
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Wikipedia returns author/licence fields as HTML snippets. */
function stripHtml(value) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Resolve each article title to its lead image file name. */
async function resolveLeadImages(articles) {
  const result = new Map();
  for (const group of chunk(articles, 20)) {
    const titles = group.map(encodeURIComponent).join("%7C");
    const data = await api(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages&piprop=original&titles=${titles}`,
    );
    const normalised = new Map();
    for (const n of data.query?.normalized ?? []) normalised.set(n.from, n.to);
    for (const r of data.query?.redirects ?? []) normalised.set(r.from, r.to);

    const byTitle = new Map();
    for (const page of Object.values(data.query?.pages ?? {})) {
      if (page.original?.source) byTitle.set(page.title, page.original.source);
    }
    for (const article of group) {
      let title = article;
      // follow normalisation/redirect chains
      for (let i = 0; i < 4 && normalised.has(title); i++)
        title = normalised.get(title);
      const src = byTitle.get(title) ?? byTitle.get(article);
      if (src) result.set(article, src);
    }
    await sleep(250);
  }
  return result;
}

/** Fetch author + licence metadata for a set of Commons file titles. */
async function fetchCredits(fileTitles) {
  const credits = new Map();
  for (const group of chunk(fileTitles, 20)) {
    const titles = group.map((t) => encodeURIComponent(`File:${t}`)).join("%7C");
    const data = await api(
      `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata%7Curl&titles=${titles}`,
    );
    for (const page of Object.values(data.query?.pages ?? {})) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const meta = info.extmetadata ?? {};
      credits.set(page.title.replace(/^File:/, "").replace(/ /g, "_"), {
        author: stripHtml(meta.Artist?.value) || "Unknown author",
        license: stripHtml(meta.LicenseShortName?.value) || "See source page",
        licenseUrl: meta.LicenseUrl?.value ?? info.descriptionurl,
        sourceUrl: info.descriptionurl,
        source: "Wikimedia Commons",
      });
    }
    await sleep(250);
  }
  return credits;
}

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function downloadAndOptimise(id, url) {
  const outPath = path.join(OUT_DIR, `${id}.jpg`);
  if (!FORCE && (await exists(outPath))) {
    const meta = await sharp(outPath).metadata();
    return { outPath, width: meta.width, height: meta.height, reused: true };
  }
  let buf;
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) {
      buf = Buffer.from(await res.arrayBuffer());
      break;
    }
    if (res.status !== 429 && res.status !== 503) {
      throw new Error(`download HTTP ${res.status}`);
    }
    const retryAfter = Number(res.headers.get("retry-after"));
    const wait =
      Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : 2000 * 2 ** attempt;
    console.log(`    rate limited, waiting ${Math.round(wait / 1000)}s…`);
    await sleep(wait);
  }
  if (!buf) throw new Error("download rate limited after 6 attempts");

  const pipeline = sharp(buf, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

  if ((meta.width ?? 0) < 600 || (meta.height ?? 0) < 400) {
    throw new Error(`source too small (${meta.width}x${meta.height})`);
  }

  const out = await sharp(buf, { failOn: "none" })
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });

  await writeFile(outPath, out.data);
  return { outPath, width: out.info.width, height: out.info.height, reused: false };
}

async function makeBlur(file) {
  const buf = await sharp(file).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const articles = [...new Set(photoSources.map((p) => p.article))];
  console.log(`Resolving ${articles.length} Wikipedia articles…`);
  const leadImages = await resolveLeadImages(articles);

  const fileTitles = new Set();
  for (const url of leadImages.values()) {
    const clean = url.split("?")[0];
    fileTitles.add(decodeURIComponent(clean.split("/").pop()));
  }
  console.log(`Fetching credits for ${fileTitles.size} files…`);
  const credits = await fetchCredits([...fileTitles]);

  const photos = [];
  const failures = [];

  for (const { id, article } of photoSources) {
    const url = leadImages.get(article);
    if (!url) {
      failures.push({ id, article, reason: "no lead image on the article" });
      continue;
    }
    const fileName = decodeURIComponent(url.split("?")[0].split("/").pop());

    // Wikipedia lead images are sometimes locator maps or diagrams rather
    // than photographs. SVG is always a diagram, so reject it outright.
    if (/\.svgz?$/i.test(fileName)) {
      failures.push({
        id,
        article,
        reason: `lead image is a diagram, not a photo (${fileName})`,
      });
      continue;
    }

    const credit = credits.get(fileName.replace(/ /g, "_"));
    if (!credit) {
      failures.push({ id, article, reason: `no Commons metadata for ${fileName}` });
      continue;
    }
    try {
      const { outPath, width, height, reused } = await downloadAndOptimise(id, url);
      const blurDataURL = await makeBlur(outPath);
      photos.push({
        id,
        src: `/images/destinations/${id}.jpg`,
        width,
        height,
        blurDataURL,
        credit,
      });
      console.log(`  ${reused ? "·" : "✓"} ${id} (${width}×${height})`);
      if (!reused) await sleep(900);
    } catch (err) {
      failures.push({ id, article, reason: String(err.message ?? err) });
      console.log(`  ✗ ${id}: ${err.message ?? err}`);
    }
  }

  const banner = `// AUTO-GENERATED by scripts/fetch-images.mjs — do not edit by hand.
// Run \`npm run images\` to refresh. Photos come from Wikimedia Commons;
// author and licence are recorded verbatim from the file's Commons page.
`;

  const body = `import type { Photo } from "./types";

export const generatedPhotos: Photo[] = ${JSON.stringify(photos, null, 2)};
`;

  await writeFile(DATA_FILE, banner + "\n" + body, "utf8");
  console.log(`\nWrote ${photos.length} photos to src/data/photos.generated.ts`);

  if (failures.length) {
    const md = [
      "# Image TODOs",
      "",
      "These photo ids could not be fetched automatically. The app renders a",
      "tasteful gradient placeholder for them — nothing is broken — but they",
      "should be replaced with a real photo.",
      "",
      "| Photo id | Article | Reason |",
      "| --- | --- | --- |",
      ...failures.map((f) => `| \`${f.id}\` | ${f.article} | ${f.reason} |`),
      "",
      "Fix by pointing the id at a different article in `scripts/photo-sources.mjs`",
      "and re-running `npm run images`.",
      "",
    ].join("\n");
    await writeFile(TODO_FILE, md, "utf8");
    console.log(`${failures.length} failures written to IMAGE-TODO.md`);
  } else {
    if (await exists(TODO_FILE)) {
      await writeFile(
        TODO_FILE,
        "# Image TODOs\n\nNone — every photo fetched successfully.\n",
        "utf8",
      );
    }
    console.log("No failures.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
