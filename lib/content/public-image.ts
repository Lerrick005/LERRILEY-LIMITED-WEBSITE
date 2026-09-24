import fs from "node:fs";
import path from "node:path";

/**
 * Public image check.
 *
 * Returns true when a file exists in public/ at the given path. Used by
 * the PageImage component to decide whether to render a photograph or
 * return null.
 *
 * The check runs at build time on the server, so it does not cost
 * anything in the browser and does not require the image to be present
 * during development.
 */

export function publicImageExists(src: string): boolean {
  if (!src.startsWith("/")) return false;

  const filePath = path.join(process.cwd(), "public", src.slice(1));

  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}
