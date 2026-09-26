// Every business-specific value lives here — rebranding the site is an edit to
// this file only. All values below are PLACEHOLDERS for the scaffold.
//
// IMPORTANT (compliance): reviewStats, testimonials, carriers, and sample rates
// are illustrative placeholders. Replace them with real, verifiable data before
// launch. Ratings are intentionally kept OUT of JSON-LD structured data until
// they are real (see src/lib/schema.ts).

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com";

export const siteConfig = {
  name: "Evergreen Life",
  legalName: "Evergreen Life Insurance Agency, LLC", // placeholder
  tagline: "Life insurance made simple, honest, and affordable",
  description:
    "Evergreen Life is an independent life insurance agency helping families compare final expense, term, and whole life policies from top-rated carriers.",
  phone: {
    display: "(800) 555-0134", // placeholder
    tel: "+18005550134",
  },
  email: "hello@example.com", // placeholder
  hours: "Mon–Fri, 8AM–6PM ET",
  npn: "0000000", // placeholder National Producer Number
  address: {
    locality: "Austin",
    region: "TX",
    country: "US",
  },

  // Placeholder review stats — shown in UI with placeholder names only.
  reviewStats: [
    { source: "Trustpilot", rating: "4.9/5", detail: "1,200+ reviews" },
    { source: "Google", rating: "4.9/5", detail: "300+ reviews" },
    { source: "BBB", rating: "A+", detail: "Accredited Business" },
  ],

  // Placeholder carrier names (text-only, no trademarks/logos in the scaffold).
  carriers: [
    "Summit Mutual",
    "Harborline Life",
    "Blue Cedar Assurance",
    "Meridian Life Group",
    "Foundry National",
    "Coastal Guaranty Life",
    "Prairie Mutual",
    "Beacon Standard",
  ],

  products: [
    {
      slug: "final-expense",
      name: "Final Expense Insurance",
      shortName: "Final Expense",
      description:
        "Smaller whole life policies ($2,000–$50,000) designed to cover funeral costs and end-of-life expenses. No medical exam, ages 45–85.",
      bullets: [
        "No medical exam — health questions only",
        "Coverage from $2,000 to $50,000",
        "Rates locked for life, coverage never expires",
      ],
    },
    {
      slug: "term-life",
      name: "Term Life Insurance",
      shortName: "Term Life",
      description:
        "Affordable coverage for 10–30 years — the most cost-effective way to protect your family's income, mortgage, and future.",
      bullets: [
        "Coverage from $100,000 to $2 million+",
        "Level premiums for 10, 15, 20, or 30 years",
        "The lowest cost per dollar of coverage",
      ],
    },
    {
      slug: "whole-life",
      name: "Whole Life Insurance",
      shortName: "Whole Life",
      description:
        "Permanent coverage that lasts your entire life, with fixed premiums and guaranteed cash value growth.",
      bullets: [
        "Coverage that never expires",
        "Premiums never increase",
        "Builds tax-deferred cash value",
      ],
    },
  ],
} as const;

export type Product = (typeof siteConfig.products)[number];
