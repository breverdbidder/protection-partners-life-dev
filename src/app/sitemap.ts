import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/quote`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
