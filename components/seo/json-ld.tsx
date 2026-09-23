/**
 * JSON-LD wrapper.
 *
 * Renders a script element with the correct type and a serialized
 * JSON-LD payload. The serializer escapes the `</script>` sequence so
 * the payload cannot break out of the script tag.
 *
 * Every schema component in this folder uses this wrapper. The wrapper
 * itself adds no content of its own.
 */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
