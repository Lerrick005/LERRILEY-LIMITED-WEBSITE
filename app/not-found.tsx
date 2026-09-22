import Link from "next/link";

import { LostRoute } from "@/components/visuals/lost-route";

import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.visual}>
          <LostRoute />
        </div>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.title}>This route does not exist.</h1>
        <p className={styles.lead}>
          The page you requested is not here. It may have moved, or the link
          may be wrong. The rest of the site is intact.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.buttonPrimary}>
            Return home
          </Link>
          <Link href="/solutions" className={styles.buttonSecondary}>
            Explore capabilities
          </Link>
          <Link href="/work" className={styles.buttonText}>
            View our work
          </Link>
        </div>
      </div>
    </main>
  );
}
