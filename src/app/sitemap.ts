import { MetadataRoute } from "next";
import { DESTINATIONS, ITINERARIES, JOURNAL_ARTICLES } from "@/data/mockData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://soulsventure.com";
  const now = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/itineraries`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/enquire`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Destination pages
  const destinationPages: MetadataRoute.Sitemap = DESTINATIONS.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Itinerary deep dives
  const itineraryPages: MetadataRoute.Sitemap = ITINERARIES.map((it) => ({
    url: `${baseUrl}/itineraries/${it.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Journal dispatches
  const journalPages: MetadataRoute.Sitemap = JOURNAL_ARTICLES.map((art) => ({
    url: `${baseUrl}/journal/${art.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...destinationPages, ...itineraryPages, ...journalPages];
}
