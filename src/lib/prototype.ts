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

const prototypeRoot = path.join(
  process.cwd(),
  "stitch_official_assembly_community_portal",
  "stitch_official_assembly_community_portal",
);

export function getPageBySlug(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getGithubPagesBasePath() {
  return process.env.NEXT_PUBLIC_GITHUB_PAGES === "true"
    ? "/Official-Assembly-Website-V1"
    : "";
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

export function rewritePrototypeHtml(
  html: string,
  options: { activeSlug: string; basePath?: string },
) {
  const basePath = options.basePath ?? "";
  let imageIndex = 0;

  return html
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
  const basePath = getGithubPagesBasePath();
  const { bodyClass, html } = getPrototypeBody(page);

  return {
    bodyClass,
    html: rewritePrototypeHtml(html, {
      activeSlug: page.slug,
      basePath,
    }),
  };
}
