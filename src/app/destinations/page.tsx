import React from "react";
import { Metadata } from "next";
import DestinationsDirectoryView from "@/components/destinations/DestinationsDirectoryView";
import { DESTINATIONS } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Worldwide Luxury Destinations & Private Expeditions",
  description:
    "Explore handpicked luxury destinations curated for discerning travelers from India. Direct private aviation, secluded ryokans, safari conservancies, and Alpine hideaways.",
  alternates: {
    canonical: "https://soulsventure.com/destinations",
  },
  openGraph: {
    title: "Luxury Travel Destinations & Private Expeditions | Soulsventure",
    description:
      "Handpicked worldwide destinations curated with obsessive craft. Private jets, secluded retreats, and 24/7 concierge for Indian travelers.",
    url: "https://soulsventure.com/destinations",
    siteName: "Soulsventure",
    type: "website",
  },
};

export default function DestinationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: DESTINATIONS.map((d, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: d.name,
      description: d.shortOverview,
      url: `https://soulsventure.com/destinations/${d.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationsDirectoryView />
    </>
  );
}
