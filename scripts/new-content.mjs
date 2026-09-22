#!/usr/bin/env node
/**
 * Scaffold a new content entry.
 *
 * Usage:
 *   npm run new:insight "How to evaluate a data pipeline"
 *   npm run new:news "Lerriley launches new site"
 *   npm run new:career "Senior Backend Engineer"
 *   npm run new:culture "Working at Lerriley"
 */

import fs from "node:fs";
import path from "node:path";

const [kind, ...rest] = process.argv.slice(2);
const title = rest.join(" ").trim();

if (!kind || !title) {
  console.error(
    'Usage: node scripts/new-content.mjs <insight|news|career|culture> "Title"',
  );
  process.exit(1);
}

const folders = {
  insight: "insights",
  news: "news",
  career: "careers",
  culture: "careers",
};

const folder = folders[kind];
if (!folder) {
  console.error(`Unknown kind: ${kind}`);
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const today = new Date().toISOString().slice(0, 10);
const filename = `${today}-${slug}.mdx`;
const filepath = path.join(process.cwd(), "content", folder, filename);

if (fs.existsSync(filepath)) {
  console.error(`File already exists: ${filepath}`);
  process.exit(1);
}

const templates = {
  insight: `---
title: "${title}"
slug: "${slug}"
description: "Replace with a one-sentence description, 40-220 characters."
searchIntent: informational
primaryTopic: "Replace with the primary topic"
secondaryTopics: []
audience: "Replace with the intended audience"
cta: "start-project"
author: "Lerriley Limited"
publishedAt: "${today}"
reviewBy: "Lerriley Limited"
status: draft
---

Write the article body here in MDX.

## First section

Content...
`,

  news: `---
title: "${title}"
slug: "${slug}"
summary: "Replace with a one-sentence summary, 40-260 characters."
category: company
publishedAt: "${today}"
author: "Lerriley Limited"
status: draft
---

Write the announcement body here in MDX.
`,

  career: `---
title: "${title}"
slug: "${slug}"
summary: "Replace with a one-sentence summary of the role, 40-260 characters."
kind: role
role: "${title}"
location: "Nairobi, Kenya"
employmentType: full-time
department: "Engineering"
open: true
postedAt: "${today}"
status: draft
---

Write the role description here in MDX.
`,

  culture: `---
title: "${title}"
slug: "${slug}"
summary: "Replace with a one-sentence summary, 40-260 characters."
kind: culture
postedAt: "${today}"
status: draft
---

Write the culture page content here in MDX.
`,
};

fs.writeFileSync(filepath, templates[kind], "utf8");
console.log(`Created: ${path.relative(process.cwd(), filepath)}`);
