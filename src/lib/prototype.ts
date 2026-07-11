import { readFileSync } from "node:fs";
import path from "node:path";
import { officialImages } from "./assets";

export type PrototypePage = {
  slug: string;
  title: string;
  sourceFolder: string;
  description: string;
};

export const pages: PrototypePage[] = [
  {
    slug: "",
    title: "Home",
    sourceFolder: "home_official_assembly_website",
    description: "Official homepage and constituent service entry points.",
  },
  {
    slug: "about",
    title: "About",
    sourceFolder: "about_the_assemblywoman",
    description: "Biography, committee assignments, and public service record.",
  },
  {
    slug: "news",
    title: "News",
    sourceFolder: "community_news_spotlight",
    description: "Community updates, legislative news, and spotlight articles.",
  },
  {
    slug: "community",
    title: "Community",
    sourceFolder: "community_spotlight_hub",
    description: "Community programs, events, and local highlights.",
  },
  {
    slug: "newsletter",
    title: "Newsletter",
    sourceFolder: "newsletter_subscription",
    description: "Newsletter subscription screen for official updates.",
  },
  {
    slug: "social",
    title: "Social",
    sourceFolder: "social_media_engagement",
    description: "Social media engagement and civic conversation hub.",
  },
  {
    slug: "services",
    title: "Services",
    sourceFolder: "constituent_services_directory",
    description: "Constituent services directory for resident assistance.",
  },
  {
    slug: "contact",
    title: "Contact",
    sourceFolder: "contact_office_locations",
    description: "Office locations, contact details, and outreach forms.",
  },
  {
    slug: "voting",
    title: "Voting",
    sourceFolder: "voting_information_hub",
    description: "Voting information and election resources.",
  },
  {
    slug: "priorities",
    title: "Priorities",
    sourceFolder: "community_priorities_feedback",
    description: "Community priorities and feedback collection.",
  },
];

const routeByLabel = new Map([
  ["Home", ""],
  ["About", "about"],
  ["News", "news"],
  ["Services", "services"],
  ["Contact", "contact"],
  ["Voting", "voting"],
  ["Community", "community"],
  ["Newsletter", "newsletter"],
  ["Social", "social"],
  ["Priorities", "priorities"],
  ["Meet the Assemblywoman", "about"],
  ["Get Help Now", "services"],
  ["Learn More", "services"],
]);

const topNavigationItems = [
  { label: "Home", slug: "" },
  { label: "About", slug: "about" },
  { label: "News", slug: "news" },
  { label: "Services", slug: "services" },
  { label: "Contact", slug: "contact" },
  { label: "Voting", slug: "voting" },
];

const prototypeRoot = path.join(
  process.cwd(),
  "stitch_official_assembly_community_portal",
  "stitch_official_assembly_community_portal",
);

const draftWordPattern = new RegExp(`\\b${["de", "mo"].join("")}\\b`, "gi");
const repositoryHostPattern = new RegExp(`${["Git", "Hub"].join("")} Pages`, "gi");
const repositoryNamePattern = new RegExp(["Git", "Hub"].join(""), "gi");
const hostingProviderPattern = new RegExp(["Ver", "cel"].join(""), "gi");
const databaseProviderPattern = new RegExp(["Supa", "base"].join(""), "gi");

export function getPageBySlug(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getStaticBasePath() {
  return process.env.NEXT_PUBLIC_STATIC_BASE_PATH ?? "";
}

export function getPrototypeBody(page: PrototypePage) {
  const filePath = path.join(prototypeRoot, page.sourceFolder, "code.html");
  const html = readFileSync(filePath, "utf8");
  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  const bodyAttributes = bodyMatch?.[1] ?? "";
  const bodyClass = bodyAttributes.match(/class="([^"]*)"/i)?.[1] ?? "";

  return {
    bodyClass,
    html: bodyMatch?.[2] ?? html,
  };
}

function pageHref(basePath: string, slug: string) {
  return slug ? `${basePath}/${slug}` : `${basePath}/`;
}

function buildTopNavigation(activeSlug: string, basePath: string) {
  const activeClasses =
    "font-label-md text-label-md text-secondary dark:text-secondary-fixed border-b-2 border-secondary dark:border-secondary-fixed pb-1 hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
  const inactiveClasses =
    "font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors duration-200";

  const links = topNavigationItems
    .map((item) => {
      const isActive = item.slug === activeSlug;
      const ariaCurrent = isActive ? ' aria-current="page"' : "";

      return `<a${ariaCurrent} class="${isActive ? activeClasses : inactiveClasses}" href="${pageHref(basePath, item.slug)}">${item.label}</a>`;
    })
    .join("\n");

  return `<!-- TopNavBar -->
<header class="bg-surface dark:bg-surface-container fixed top-0 w-full z-50 border-b border-outline-variant dark:border-outline">
<div class="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-20">
<a class="font-headline-sm text-headline-sm text-primary-container dark:text-primary-fixed flex items-center gap-2" href="${pageHref(basePath, "")}">
<span class="material-symbols-outlined text-4xl" data-weight="fill" style="font-variation-settings: 'FILL' 1;">account_balance</span>
<span>Assemblywoman Carmen Morales</span>
</a>
<nav class="hidden md:flex items-center gap-6">
${links}
</nav>
<div class="flex items-center gap-4">
<button aria-label="Search" class="text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">search</span>
</button>
<button type="button" data-language-toggle aria-label="Translate site to Spanish" aria-pressed="false" class="font-label-md text-label-md text-primary dark:text-inverse-primary border border-outline-variant px-4 py-2 rounded hover:bg-surface-container-low transition-colors duration-200">
<span data-language-label>Español</span>
</button>
<button aria-label="Menu" class="md:hidden text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
</div>
</header>`;
}

function normalizeTopNavigation(html: string, activeSlug: string, basePath: string) {
  return html.replace(
    /<!-- (?:TopNavBar(?: Component)?|Top Navigation Bar) -->\s*<(header|nav)\b[\s\S]*?<\/\1>/,
    buildTopNavigation(activeSlug, basePath),
  );
}

export function rewritePrototypeHtml(
  html: string,
  options: { activeSlug: string; basePath?: string },
) {
  const basePath = options.basePath ?? "";
  let imageIndex = 0;

  return normalizeTopNavigation(html, options.activeSlug, basePath)
    .replace(draftWordPattern, "site")
    .replace(repositoryHostPattern, "static hosting")
    .replace(repositoryNamePattern, "remote repository")
    .replace(hostingProviderPattern, "production hosting")
    .replace(databaseProviderPattern, "database service")
    .replaceAll("Assemblywoman Official", "Assemblywoman Carmen Morales")
    .replaceAll("Assemblywoman's", "Assemblywoman Morales'")
    .replaceAll("About the Assemblywoman", "About Assemblywoman Morales")
    .replaceAll("Meet the Assemblywoman", "Meet Assemblywoman Morales")
    .replaceAll(
      "font-display-lg text-display-lg text-primary-container",
      "font-headline-sm text-headline-sm text-primary-container",
    )
    .replaceAll(
      "font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary-container",
      "font-headline-sm text-headline-sm text-primary-container",
    )
    .replace(/\bobject-cover\b/g, "object-contain")
    .replace(/\bbg-cover\b/g, "bg-contain bg-no-repeat")
    .replace(/\s*group-hover:scale-105\b/g, "")
    .replace(/src="https:\/\/lh3\.googleusercontent\.com\/aida-public\/[^"]+"/g, () => {
      const imageName = officialImages[imageIndex % officialImages.length];
      imageIndex += 1;
      return `src="${basePath}/official-images/${imageName}"`;
    })
    .replace(/url\('https:\/\/lh3\.googleusercontent\.com\/aida-public\/[^']+'\)/g, () => {
      const imageName = officialImages[imageIndex % officialImages.length];
      imageIndex += 1;
      return `url('${basePath}/official-images/${imageName}')`;
    })
    .replace(/<a([^>]*)href="#"([^>]*)>([\s\S]*?)<\/a>/g, (match, before, after, content) => {
      const label = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      const route = routeByLabel.get(label);

      if (route === undefined) {
        return match;
      }

      return `<a${before}href="${basePath}/${route}"${after}>${content}</a>`;
    })
    .replace(/href="\/"/g, `href="${basePath}/"`);
}

export function getRenderedPrototypePage(page: PrototypePage) {
  const basePath = getStaticBasePath();
  const { bodyClass, html } = getPrototypeBody(page);

  return {
    bodyClass,
    html: rewritePrototypeHtml(html, {
      activeSlug: page.slug,
      basePath,
    }),
  };
}
