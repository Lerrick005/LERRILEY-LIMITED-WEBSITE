import Image from "next/image";

import { publicImageExists } from "@/lib/content/public-image";

import styles from "./page-image.module.css";

/**
 * PageImage.
 *
 * Renders a photograph from public/ when the file exists. When the file
 * is not there, returns null so the page renders without an empty frame
 * or a broken image icon.
 *
 * The existence check runs at build time on the server, so the component
 * adds no client JavaScript and no runtime cost.
 *
 * Usage:
 *   <PageImage
 *     src="/technology-infrastructure.webp"
 *     alt="A server rack in a data centre"
 *     width={1600}
 *     height={1200}
 *     priority
 *   />
 *
 * Every image in the project uses the same treatment: rounded corners,
 * a hairline border, and a defined aspect ratio. The container in which
 * PageImage sits controls the final size.
 */

export function PageImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  if (!publicImageExists(src)) return null;

  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 960px) 40vw, 100vw"
        className={styles.image}
      />
    </div>
  );
}
