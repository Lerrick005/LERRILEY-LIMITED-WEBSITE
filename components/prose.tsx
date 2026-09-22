import styles from "./prose.module.css";

/**
 * Prose wrapper.
 *
 * Wraps MDX-rendered content and styles the elements inside it (headings,
 * paragraphs, lists, code, blockquotes, tables). Applied by any page that
 * renders MDX body content.
 */

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const combined = className ? `${styles.prose} ${className}` : styles.prose;
  return <div className={combined}>{children}</div>;
}
