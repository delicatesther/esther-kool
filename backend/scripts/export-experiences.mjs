/**
 * Exports all published experiences from the Keystone PostgreSQL database to
 * markdown files in frontend/content/experiences/.
 *
 * Run from the backend/ directory:
 *   node scripts/export-experiences.mjs
 *
 * Requires DATABASE_URL to be set (reads backend/.env automatically).
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const OUTPUT_DIR = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "content",
  "experiences",
);

const prisma = new PrismaClient();

// ── Slug generation ────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Keystone document JSON → Markdown ─────────────────────────────────────────

function inlineToMd(children) {
  return children
    .map((node) => {
      if (node.type === "link") {
        return `[${inlineToMd(node.children)}](${node.href})`;
      }
      let text = node.text ?? "";
      if (node.bold) text = `**${text}**`;
      if (node.italic) text = `*${text}*`;
      if (node.code) text = `\`${text}\``;
      if (node.strikethrough) text = `~~${text}~~`;
      return text;
    })
    .join("");
}

function blockToMd(node, listDepth = 0) {
  const indent = "  ".repeat(listDepth);
  switch (node.type) {
    case "paragraph":
      return inlineToMd(node.children);
    case "heading":
      return "#".repeat(node.level ?? 1) + " " + inlineToMd(node.children);
    case "blockquote":
      return (node.children ?? [])
        .map((child) => "> " + blockToMd(child, listDepth))
        .join("\n");
    case "code":
      return "```\n" + inlineToMd(node.children) + "\n```";
    case "divider":
      return "---";
    case "unordered-list":
      return (node.children ?? [])
        .map((item) => blockToMd(item, listDepth))
        .join("\n");
    case "ordered-list":
      return (node.children ?? [])
        .map((item, i) => blockToMd(item, listDepth, i + 1))
        .join("\n");
    case "list-item":
      return (node.children ?? [])
        .map((child) => blockToMd(child, listDepth))
        .join("\n");
    case "list-item-content":
      return indent + "- " + inlineToMd(node.children);
    case "layout":
      return (node.children ?? [])
        .map((area) => blockToMd(area, listDepth))
        .join("\n\n");
    case "layout-area":
      return documentToMd(node.children ?? []);
    default:
      if (node.children) return documentToMd(node.children);
      if (node.text !== undefined) return node.text;
      return "";
  }
}

function documentToMd(nodes) {
  return nodes
    .map((node) => blockToMd(node))
    .filter((s) => s.trim() !== "")
    .join("\n\n");
}

// ── YAML front-matter helpers ──────────────────────────────────────────────────

function yamlStr(value) {
  if (value == null) return '""';
  const str = String(value);
  if (/[:#\[\]{}&*!|>'",%@`]/.test(str) || str.includes("\n")) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  return str;
}

function yamlObject(obj, indent) {
  const lines = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (typeof v === "boolean") {
      lines.push(`${indent}${k}: ${v}`);
    } else if (typeof v === "object" && !Array.isArray(v)) {
      lines.push(`${indent}${k}:`);
      lines.push(...yamlObject(v, indent + "  "));
    } else {
      lines.push(`${indent}${k}: ${yamlStr(v)}`);
    }
  }
  return lines;
}

function buildFrontmatter(fields) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${key}:`);
      for (const item of value) {
        if (typeof item === "object") {
          const entries = Object.entries(item).filter(([, v]) => v != null && v !== "");
          if (entries.length > 0) {
            lines.push(`  - ${entries[0][0]}: ${yamlStr(entries[0][1])}`);
            for (const [k, v] of entries.slice(1)) {
              lines.push(`    ${k}: ${yamlStr(v)}`);
            }
          }
        } else {
          lines.push(`  - ${yamlStr(item)}`);
        }
      }
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "object") {
      lines.push(`${key}:`);
      lines.push(...yamlObject(value, "  "));
    } else {
      lines.push(`${key}: ${yamlStr(value)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const experiences = await prisma.experience.findMany({
    include: {
      tags: true,
      organisation: true,
    },
    orderBy: { from: "asc" },
  });

  console.log(`Found ${experiences.length} experiences. Exporting…`);

  const slugsSeen = new Set();

  for (const exp of experiences) {
    // Generate a unique slug from the Dutch title, falling back to English
    const baseSlug = slugify(exp.titleNL || exp.title || exp.id);
    let slug = baseSlug;
    let counter = 1;
    while (slugsSeen.has(slug)) {
      slug = `${baseSlug}-${counter++}`;
    }
    slugsSeen.add(slug);

    const fromDate = exp.from
      ? exp.from.toISOString().split("T")[0]
      : undefined;
    const toDate = exp.to ? exp.to.toISOString().split("T")[0] : undefined;

    const tags = exp.tags.map((t) => ({
      name: t.name || undefined,
      nameNL: t.nameNL || undefined,
    }));

    const orgNL = exp.organisation
      ? { name: exp.organisation.name || undefined, nameNL: exp.organisation.nameNL || undefined, logo: exp.organisation.logo || undefined }
      : null;

    // ── Dutch ──
    const nlFrontmatter = buildFrontmatter({
      slug,
      locale: "nl",
      title: exp.titleNL || exp.title,
      summary: exp.summaryNL || exp.summary || undefined,
      from: fromDate,
      to: toDate || undefined,
      ongoing: exp.ongoing,
      status: exp.status,
      ...(orgNL ? { organisation: orgNL } : {}),
      ...(tags.length > 0 ? { tags } : {}),
    });

    const nlContent = documentToMd(
      Array.isArray(exp.contentNL) ? exp.contentNL : [],
    );
    const nlFile = `${nlFrontmatter}\n\n${nlContent}\n`;
    await fs.writeFile(path.join(OUTPUT_DIR, `${slug}.nl.md`), nlFile, "utf8");

    // ── English ──
    const enFrontmatter = buildFrontmatter({
      slug,
      locale: "en",
      title: exp.title || exp.titleNL,
      summary: exp.summary || exp.summaryNL || undefined,
      from: fromDate,
      to: toDate || undefined,
      ongoing: exp.ongoing,
      status: exp.status,
      ...(orgNL ? { organisation: orgNL } : {}),
      ...(tags.length > 0 ? { tags } : {}),
    });

    const enContent = documentToMd(
      Array.isArray(exp.content) ? exp.content : [],
    );
    const enFile = `${enFrontmatter}\n\n${enContent}\n`;
    await fs.writeFile(path.join(OUTPUT_DIR, `${slug}.en.md`), enFile, "utf8");

    console.log(`  ✓ ${slug} (${exp.status})`);
  }

  console.log(`\nDone. Files written to frontend/content/experiences/`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
