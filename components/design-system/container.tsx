import styles from "./container.module.css";

/**
 * Container.
 *
 * The max-width wrapper around page content. Wide by default; the
 * reading variant is narrower for pages where the content is prose.
 */

export function Container({
  children,
  width = "wide",
  className,
}: {
  children: React.ReactNode;
  width?: "wide" | "reading";
  className?: string;
}) {
  const combined = [
    styles.container,
    width === "reading" ? styles.reading : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={combined}>{children}</div>;
}
