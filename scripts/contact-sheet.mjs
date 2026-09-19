import sharp from "sharp";
import { readFileSync } from "node:fs";
import path from "node:path";

const src = readFileSync("src/data/photos.generated.ts", "utf8");
const photos = JSON.parse(src.slice(src.indexOf("= [") + 2, src.lastIndexOf("]") + 1));

const COLS = 6, W = 210, H = 150, PAD = 4;
const rows = Math.ceil(photos.length / COLS);

const tiles = await Promise.all(
  photos.map(async (p, i) => ({
    input: await sharp(path.join("public", p.src.replace(/^\//, "")))
      .resize(W, H, { fit: "cover" })
      .jpeg({ quality: 70 })
      .toBuffer(),
    left: (i % COLS) * (W + PAD),
    top: Math.floor(i / COLS) * (H + PAD),
  })),
);

await sharp({
  create: {
    width: COLS * (W + PAD),
    height: rows * (H + PAD),
    channels: 3,
    background: "#111",
  },
})
  .composite(tiles)
  .jpeg({ quality: 78 })
  .toFile(process.argv[2] ?? "contact-sheet.jpg");

photos.forEach((p, i) => {
  if (i % COLS === 0) process.stdout.write(`\nrow ${Math.floor(i / COLS) + 1}: `);
  process.stdout.write(`${i % COLS + 1}.${p.id}  `);
});
console.log();
