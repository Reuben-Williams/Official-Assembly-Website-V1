import { describe, expect, it, vi } from "vitest";
import {
  getPageBySlug,
  pages,
  rewritePrototypeHtml,
} from "../src/lib/prototype";

describe("prototype route manifest", () => {
  it("keeps a static route for every prototype screen", () => {
    expect(pages.map((page) => page.slug)).toEqual([
      "",
      "about",
      "news",
      "community",
      "newsletter",
      "social",
      "services",
      "contact",
      "voting",
      "priorities",
    ]);
  });

  it("maps slugs to their source prototype folders", () => {
    expect(getPageBySlug("contact")?.sourceFolder).toBe("contact_office_locations");
    expect(getPageBySlug("missing")).toBeUndefined();
  });
});

describe("prototype html rewrite", () => {
  it("removes generated remote placeholder images and replaces placeholder branding", () => {
    const html = `
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">News</a>
      <img src="https://lh3.googleusercontent.com/aida-public/example" alt="Placeholder">
      <div style="background-image: url('https://lh3.googleusercontent.com/aida-public/background')"></div>
      <h1>Assemblywoman Official</h1>
    `;

    const result = rewritePrototypeHtml(html, {
      activeSlug: "",
      basePath: "/Official-Assembly-Website-V1",
    });

    expect(result).not.toContain("lh3.googleusercontent.com");
    expect(result).toContain("/Official-Assembly-Website-V1/official-images/");
    expect(result).toContain("Assemblywoman Carmen Morales");
    expect(result).toContain('href="/Official-Assembly-Website-V1/about"');
  });
});

describe("supabase client guard", () => {
  it("returns null until public Supabase env vars are configured", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");

    const { getSupabaseBrowserClient } = await import("../src/lib/supabase");

    expect(getSupabaseBrowserClient()).toBeNull();
  });
});
