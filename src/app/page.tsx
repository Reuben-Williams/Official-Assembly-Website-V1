import type { Metadata } from "next";
import { PrototypePageView } from "@/components/PrototypePageView";
import { getPageBySlug } from "@/lib/prototype";

const page = getPageBySlug("");

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  if (!page) {
    return null;
  }

  return <PrototypePageView page={page} />;
}
