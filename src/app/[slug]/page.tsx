import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrototypePageView } from "@/components/PrototypePageView";
import { getPageBySlug, pages } from "@/lib/prototype";

export function generateStaticParams() {
  return pages.filter((page) => page.slug).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function StaticPrototypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <PrototypePageView page={page} />;
}
