import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ITINERARIES } from "@/data/mockData";
import ItineraryClientView from "@/components/itinerary/ItineraryClientView";

export function generateStaticParams() {
  return ITINERARIES.map((it) => ({
    slug: it.slug,
  }));
}

interface ItineraryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = ITINERARIES.find((it) => it.slug === slug);

  if (!itinerary) {
    return {
      title: "Itinerary Not Found | Soulsventure Luxury Travel",
    };
  }

  return {
    title: `${itinerary.title} (${itinerary.durationDays} Days)`,
    description: `${itinerary.tagline} Handcrafted bespoke luxury journey in ${itinerary.destinationName} starting from ₹${itinerary.priceFromINR.toLocaleString("en-IN")} pp. Private aviation, secluded retreats & 24/7 concierge.`,
    alternates: {
      canonical: `https://soulsventure.com/itineraries/${itinerary.slug}`,
    },
    openGraph: {
      title: `${itinerary.title} | Soulsventure Bespoke Journeys`,
      description: itinerary.tagline,
      url: `https://soulsventure.com/itineraries/${itinerary.slug}`,
      siteName: "Soulsventure",
      images: [
        {
          url: itinerary.heroImage,
          width: 1200,
          height: 630,
          alt: itinerary.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function ItineraryDetailPage({ params }: ItineraryPageProps) {
  const { slug } = await params;
  const itinerary = ITINERARIES.find((it) => it.slug === slug);

  if (!itinerary) {
    notFound();
  }

  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: itinerary.title,
    description: itinerary.tagline,
    image: itinerary.heroImage,
    touristType: ["Luxury Travelers", itinerary.travelStyle],
    offers: {
      "@type": "Offer",
      price: itinerary.priceFromINR,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: itinerary.days.length,
      itemListElement: itinerary.days.map((day) => ({
        "@type": "ListItem",
        position: day.dayNumber,
        name: day.dayTitle,
        description: day.narrative,
      })),
    },
    provider: {
      "@type": "TravelAgency",
      name: "Soulsventure",
      url: "https://soulsventure.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <ItineraryClientView itinerary={itinerary} />
    </>
  );
}
