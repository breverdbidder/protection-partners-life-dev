// Mariam's Protection Insurance Partners dev preview, forked from the MIT-licensed
// melisamikko/life-insurance-agency-template. The template's sample rates, reviews,
// carrier names and life-insurance claims were removed: they were unverified placeholders.

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com";

export const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const CANOPY_URL = "https://app.usecanopy.com/c/protection-partners";

export const siteConfig = {
  name: "Protection Insurance Partners",
  legalName: "Protection Insurance Partners",
  tagline: "Smarter protection for your home, car and business",
  description:
    "Protection Insurance Partners helps families and business owners review their home, auto and business coverage. Development preview.",
  products: [
    {
      slug: "home",
      name: "Home Insurance",
      shortName: "Home",
      description: "A fresh look at your home coverage, so you know what is protected and where the gaps are.",
      bullets: ["Review your current policy", "Spot coverage gaps", "Understand your deductibles"],
    },
    {
      slug: "auto",
      name: "Auto Insurance",
      shortName: "Auto",
      description: "Compare coverage for your next mile with a review of what you carry today.",
      bullets: ["Check liability limits", "Review drivers and vehicles", "Look at bundling options"],
    },
    {
      slug: "business",
      name: "Business Insurance",
      shortName: "Business",
      description: "Review protection for what you build, from your space to your equipment and liability.",
      bullets: ["Review general liability", "Check property coverage", "Plan for growth"],
    },
  ],
} as const;

export type Product = (typeof siteConfig.products)[number];
