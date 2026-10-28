import React from "react";
import { Metadata } from "next";
import ItinerariesCatalogView from "@/components/itinerary/ItinerariesCatalogView";
import { ITINERARIES } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Curated Luxury Itineraries & Private Expeditions",
  description:
    "Explore handcrafted bespoke luxury itineraries across Japan, Norway, Namibia, Chile, and Italy. Complete day-by-day programs with private aviation and secluded retreats.",
  alternates: {
    canonical: "https://soulsventure.com/itineraries",
  },
  openGraph: {
    title: "Curated Luxury Itineraries & Private Expeditions | Soulsventure",
    description:
      "Handcrafted journeys curated for high-net-worth travelers. Private jets, secluded ryokans, and 24/7 dedicated concierge.",
    url: "https://soulsventure.com/itineraries",
    siteName: "Soulsventure",
    type: "website",
  },
};

export default function ItinerariesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ITINERARIES.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.title,
      description: it.tagline,
      url: `https://soulsventure.com/itineraries/${it.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ItinerariesCatalogView />
    </>
  );
}
