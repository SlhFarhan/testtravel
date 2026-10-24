import type { MetadataRoute } from "next";
import { fleet } from "@/lib/fleet";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const basePages: Array<{
    url: string;
    priority: number;
    changeFrequency: NonNullable<
      MetadataRoute.Sitemap[number]["changeFrequency"]
    >;
  }> = [
    { url: `${site.url}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${site.url}/armada`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${site.url}/rute`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${site.url}/tentang`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${site.url}/faq`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${site.url}/kontak`, priority: 0.7, changeFrequency: "yearly" },
  ];

  const staticPages: MetadataRoute.Sitemap = basePages.map((page) => ({
    ...page,
    lastModified,
  }));

  const fleetPages: MetadataRoute.Sitemap = fleet.map((item) => ({
    url: `${site.url}/armada/${item.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const routePages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${site.url}/rute/${route.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticPages, ...fleetPages, ...routePages];
}
