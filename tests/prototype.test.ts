import { describe, expect, it } from "vitest";
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
  it("removes platform and draft-only wording from rendered pages", () => {
    const draftWord = ["de", "mo"].join("");
    const repositoryHost = ["Git", "Hub"].join("");
    const hostingProvider = ["Ver", "cel"].join("");
    const databaseProvider = ["Supa", "base"].join("");
    const html = `
      <p>Official digital office ${draftWord}</p>
      <p>Future ${hostingProvider} and ${databaseProvider} setup</p>
      <p>${repositoryHost} Pages preview</p>
    `;

    const result = rewritePrototypeHtml(html, {
      activeSlug: "",
      basePath: "",
    });

    expect(result).not.toMatch(new RegExp(`\\b${draftWord}\\b`, "i"));
    expect(result).not.toMatch(new RegExp(`${repositoryHost}|${hostingProvider}|${databaseProvider}`, "i"));
  });

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

  it("rewrites image fit classes so prototype images are not cropped", () => {
    const html = `
      <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform">
      <div class="bg-cover bg-center w-full h-48"></div>
    `;

    const result = rewritePrototypeHtml(html, {
      activeSlug: "",
      basePath: "",
    });

    expect(result).not.toContain("object-cover");
    expect(result).not.toContain("bg-cover");
    expect(result).not.toContain("group-hover:scale-105");
    expect(result).toContain("object-contain");
    expect(result).toContain("bg-contain bg-no-repeat");
  });

  it("normalizes every page to the homepage navigation with the brand icon", () => {
    const html = `
      <!-- TopNavBar -->
      <header class="bg-surface fixed top-0 w-full z-50 border-b border-outline-variant">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          <a class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary-container" href="#">Assemblywoman Official</a>
          <nav class="hidden md:flex items-center gap-gutter">
            <a href="#">Home</a>
            <a aria-current="page" href="#">About</a>
          </nav>
        </div>
      </header>
      <main>About page content</main>
    `;

    const result = rewritePrototypeHtml(html, {
      activeSlug: "about",
      basePath: "/Official-Assembly-Website-V1",
    });

    expect(result).toContain("<!-- TopNavBar -->");
    expect(result).toContain("account_balance");
    expect(result).toContain("<span>Assemblywoman Carmen Morales</span>");
    expect(result).toContain(
      '<a class="font-headline-sm text-headline-sm text-primary-container dark:text-primary-fixed flex items-center gap-2" href="/Official-Assembly-Website-V1/">',
    );
    expect(result).toContain('href="/Official-Assembly-Website-V1/about"');
    expect(result).toContain('aria-current="page"');
    expect(result).toContain("items-center gap-6");
    expect(result).not.toContain("gap-gutter");
    expect(result).not.toContain("font-display-lg-mobile");
  });
});
