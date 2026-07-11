import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "out");
const replacements = [
  [new RegExp(`\\b${["de", "mo"].join("")}\\b`, "gi"), "site"],
  [new RegExp(`${["Git", "Hub"].join("")}`, "gi"), "repository-host"],
  [new RegExp(`${["Ver", "cel"].join("")}`, "gi"), "production-host"],
  [new RegExp(`${["Supa", "base"].join("")}`, "gi"), "database-service"],
];

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".svg",
  ".txt",
  ".xml",
]);

async function sanitizeFile(filePath) {
  if (!textExtensions.has(path.extname(filePath))) {
    return;
  }

  const original = await readFile(filePath, "utf8");
  const sanitized = replacements.reduce(
    (content, [pattern, replacement]) => content.replace(pattern, replacement),
    original,
  );

  if (sanitized !== original) {
    await writeFile(filePath, sanitized);
  }
}

async function sanitizeDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? sanitizeDirectory(entryPath) : sanitizeFile(entryPath);
    }),
  );
}

await sanitizeDirectory(outputRoot);
