/**
 * Exports all published posts from the Keystone PostgreSQL database to
 * markdown files in frontend/content/posts/.
 *
 * Run from the backend/ directory:
 *   node scripts/export-posts.mjs
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
  "posts",
);

const prisma = new PrismaClient();

// ── Document JSON → Markdown (same as experience export) ──────────────────────

function inlineToMd(children) {
  return (children ?? [])
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

function blockToMd(node) {
  switch (node.type) {
    case "paragraph":
      return inlineToMd(node.children);
    case "heading":
      return "#".repeat(node.level ?? 1) + " " + inlineToMd(node.children);
    case "blockquote":
      return (node.children ?? [])
        .map((child) => "> " + blockToMd(child))
        .join("\n");
    case "code":
      return "```\n" + inlineToMd(node.children) + "\n```";
    case "divider":
      return "---";
    case "unordered-list":
      return (node.children ?? []).map((item) => blockToMd(item)).join("\n");
    case "ordered-list":
      return (node.children ?? []).map((item) => blockToMd(item)).join("\n");
    case "list-item":
      return (node.children ?? []).map((child) => blockToMd(child)).join("\n");
    case "list-item-content":
      return "- " + inlineToMd(node.children);
    case "layout":
      return (node.children ?? []).map((area) => blockToMd(area)).join("\n\n");
    case "layout-area":
      return documentToMd(node.children ?? []);
    default:
      if (node.children) return documentToMd(node.children);
      if (node.text !== undefined) return node.text;
      return "";
  }
}

function documentToMd(nodes) {
  return (nodes ?? [])
    .map((node) => blockToMd(node))
    .filter((s) => s.trim() !== "")
    .join("\n\n");
}

function yamlStr(value) {
  if (value == null) return '""';
  const str = String(value);
  if (/[:#\[\]{}&*!|>'",%@`]/.test(str) || str.includes("\n")) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  return str;
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
    } else {
      lines.push(`${key}: ${yamlStr(value)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const posts = await prisma.post.findMany({
    include: { tags: true },
    orderBy: { publishDate: "asc" },
  });

  console.log(`Found ${posts.length} posts. Exporting…`);

  for (const post of posts) {
    const tags = post.tags.map((t) => ({
      name: t.name || undefined,
      nameNL: t.nameNL || undefined,
    }));

    const frontmatter = buildFrontmatter({
      id: post.id,
      slug: post.slug || post.id,
      title: post.title,
      status: post.status,
      publishDate: post.publishDate
        ? post.publishDate.toISOString().split("T")[0]
        : undefined,
      ...(tags.length > 0 ? { tags } : {}),
    });

    const content = documentToMd(
      Array.isArray(post.content) ? post.content : [],
    );
    const file = `${frontmatter}\n\n${content}\n`;
    const filename = `${post.slug || post.id}.md`;
    await fs.writeFile(path.join(OUTPUT_DIR, filename), file, "utf8");
    console.log(`  ✓ ${filename} (${post.status}) — tags: ${post.tags.map((t) => t.name).join(", ")}`);
  }

  console.log(`\nDone. Files written to frontend/content/posts/`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
