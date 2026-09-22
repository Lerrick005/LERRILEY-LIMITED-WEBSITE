import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

/**
 * MDX content loader.
 *
 * Reads a folder of .mdx files, parses YAML frontmatter with gray-matter,
 * validates it against the provided Zod schema, and returns typed entries
 * sorted by date (newest first).
 *
 * Behaviour:
 *   - In production, entries with status "draft" are excluded entirely.
 *   - In development, drafts are included but flagged so pages can show a
 *     "draft" badge. This lets us preview content before publishing.
 *   - Invalid frontmatter fails the build with the filename and Zod issue.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type LoadedEntry<T> = {
  frontmatter: T;
  /** Raw MDX body, without frontmatter. */
  body: string;
  /** Absolute source path, for diagnostics. */
  sourcePath: string;
  /** True when status === "draft". */
  isDraft: boolean;
};

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(dir, f));
}

export function loadCollection<S extends z.ZodTypeAny>(
  folder: "insights" | "news" | "careers",
  schema: S,
): LoadedEntry<z.infer<S>>[] {
  const dir = path.join(CONTENT_ROOT, folder);
  const files = listMdxFiles(dir);

  const isProduction = process.env.NODE_ENV === "production";

  const entries: LoadedEntry<z.infer<S>>[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const parsed = matter(raw);

    const result = schema.safeParse(parsed.data);
    if (!result.success) {
      const rel = path.relative(process.cwd(), file);
      const issues = result.error.issues
        .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("\n");
      throw new Error(`Invalid frontmatter in ${rel}:\n${issues}`);
    }

    const frontmatter = result.data as z.infer<S>;
    const isDraft =
      typeof (frontmatter as { status?: unknown }).status === "string" &&
      (frontmatter as { status: string }).status === "draft";

    if (isProduction && isDraft) continue;

    entries.push({
      frontmatter,
      body: parsed.content,
      sourcePath: file,
      isDraft,
    });
  }

  // Newest first, by publishedAt when present, otherwise by postedAt.
  entries.sort((a, b) => {
    const dateA =
      (a.frontmatter as { publishedAt?: string }).publishedAt ??
      (a.frontmatter as { postedAt?: string }).postedAt ??
      "";
    const dateB =
      (b.frontmatter as { publishedAt?: string }).publishedAt ??
      (b.frontmatter as { postedAt?: string }).postedAt ??
      "";
    return dateB.localeCompare(dateA);
  });

  return entries;
}

export function loadEntry<S extends z.ZodTypeAny>(
  folder: "insights" | "news" | "careers",
  slug: string,
  schema: S,
): LoadedEntry<z.infer<S>> | null {
  const entries = loadCollection(folder, schema);
  return (
    entries.find((e) => (e.frontmatter as { slug: string }).slug === slug) ??
    null
  );
}
