import type { PrototypePage } from "@/lib/prototype";
import { getRenderedPrototypePage } from "@/lib/prototype";

export function PrototypePageView({ page }: { page: PrototypePage }) {
  const rendered = getRenderedPrototypePage(page);

  return (
    <div
      className={rendered.bodyClass}
      dangerouslySetInnerHTML={{ __html: rendered.html }}
    />
  );
}
