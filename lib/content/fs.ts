import fs from "node:fs/promises";
import path from "node:path";

export const CONTENT_ROOT = path.join(process.cwd(), "content");

export async function readFile(filePath: string) {
	return fs.readFile(filePath, "utf8");
}

export async function readDir(dir: string) {
	return fs.readdir(path.join(CONTENT_ROOT, dir));
}
