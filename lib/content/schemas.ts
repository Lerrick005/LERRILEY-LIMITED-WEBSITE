import { z } from "zod";

/**
 * Frontmatter schemas for the three growing content types.
 *
 * Fixed content (company facts, process, industries) lives in typed
 * TypeScript files under content/. Growing content (articles, announcements,
 * roles) lives in MDX files under content/<type>/, one file per entry.
 *
 * Every MDX file must validate against its schema or the build fails with
 * a clear message naming the file and the offending field.
 */

const slugPattern = /^[a-z][a-z0-9-]*$/;
const slugMessage =
  "slug must be lowercase, start with a letter, and contain only letters, digits and hyphens";

const statusSchema = z.enum(["draft", "published"]);

/* ---------------------------------------------------------------------- */
/* Insights                                                               */
/* ---------------------------------------------------------------------- */

export const InsightFrontmatterSchema = z.object({
  title: z.string().min(4).max(120),
  slug: z.string().regex(slugPattern, slugMessage),
  description: z.string().min(40).max(220),

  searchIntent: z.enum(["informational", "problem", "commercial", "local"]),
  primaryTopic: z.string().min(2).max(60),
  secondaryTopics: z.array(z.string().min(2).max(60)).default([]),
  audience: z.string().min(4).max(120),

  relatedSolution: z.string().regex(slugPattern, slugMessage).optional(),
  relatedCaseStudy: z.string().regex(slugPattern, slugMessage).optional(),
  cta: z.string().min(2).max(60),

  author: z.string().min(2).max(80),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD"),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD")
    .optional(),
  reviewBy: z.string().min(2).max(80),

  image: z.string().min(2).optional(),
  imageAlt: z.string().min(4).max(180).optional(),

  status: statusSchema,
});

export type InsightFrontmatter = z.infer<typeof InsightFrontmatterSchema>;

/* ---------------------------------------------------------------------- */
/* News                                                                   */
/* ---------------------------------------------------------------------- */

export const NewsFrontmatterSchema = z.object({
  title: z.string().min(4).max(140),
  slug: z.string().regex(slugPattern, slugMessage),
  summary: z.string().min(40).max(260),

  category: z.enum(["company", "product", "engineering", "partnership"]),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD"),

  author: z.string().min(2).max(80),

  image: z.string().min(2).optional(),
  imageAlt: z.string().min(4).max(180).optional(),

  status: statusSchema,
});

export type NewsFrontmatter = z.infer<typeof NewsFrontmatterSchema>;

/* ---------------------------------------------------------------------- */
/* Careers                                                                */
/* ---------------------------------------------------------------------- */

export const CareerFrontmatterSchema = z.object({
  title: z.string().min(4).max(120),
  slug: z.string().regex(slugPattern, slugMessage),
  summary: z.string().min(40).max(260),

  /**
   * Either a specific role opening, or a permanent culture page.
   * Culture pages always appear. Role pages appear under "Open roles"
   * when open is true.
   */
  kind: z.enum(["role", "culture"]),

  /* Role-specific fields. Required when kind === "role". */
  role: z.string().min(2).max(120).optional(),
  location: z.string().min(2).max(80).optional(),
  employmentType: z
    .enum(["full-time", "part-time", "contract", "internship"])
    .optional(),
  department: z.string().min(2).max(80).optional(),

  /** Only relevant for kind === "role". */
  open: z.boolean().default(true),

  postedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD"),

  status: statusSchema,
});

export type CareerFrontmatter = z.infer<typeof CareerFrontmatterSchema>;
