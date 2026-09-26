import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site-config";
import { guides } from "@/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/quote`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly", priority: 0.7 },
    ...guides.map((guide) => ({
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: guide.datePublished,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
