import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Prose } from "@/components/prose";
import { loadCollection, loadEntry } from "@/lib/content/loader";
import { InsightFrontmatterSchema } from "@/lib/content/schemas";

import styles from "./page.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  const entries = loadCollection("insights", InsightFrontmatterSchema);
  return entries.map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = loadEntry("insights", slug, InsightFrontmatterSchema);

  if (!entry) {
    return { title: "Not found" };
  }

  const fm = entry.frontmatter;

  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical: `/insights/${fm.slug}`,
    },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      publishedTime: fm.publishedAt,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = loadEntry("insights", slug, InsightFrontmatterSchema);

  if (!entry) {
    notFound();
  }

  const fm = entry.frontmatter;

  return (
    <main id="main" className={styles.page}>
      <div className={styles.breadcrumbsWrap}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: fm.title },
          ]}
        />
      </div>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <time dateTime={fm.publishedAt} className={styles.date}>
              {fm.publishedAt}
            </time>
            {entry.isDraft ? (
              <span className={styles.draftBadge}>Draft</span>
            ) : null}
          </div>
          <h1 className={styles.title}>{fm.title}</h1>
          <p className={styles.description}>{fm.description}</p>
        </header>

        <Prose className={styles.body}>
          <MDXRemote source={entry.body} />
        </Prose>

        <footer className={styles.footer}>
          <Link href="/insights" className={styles.back}>
            Back to Insights
          </Link>
        </footer>
      </article>
    </main>
  );
}
