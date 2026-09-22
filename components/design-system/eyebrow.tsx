import styles from "./eyebrow.module.css";

/**
 * Eyebrow.
 *
 * The small mono uppercase label that appears above section headings.
 * Gold by default. One component replaces the identical rule that was
 * previously duplicated in every page module.
 */

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const combined = className ? `${styles.eyebrow} ${className}` : styles.eyebrow;
  return <p className={combined}>{children}</p>;
}
