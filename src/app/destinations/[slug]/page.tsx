import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Thermometer,
  Plane,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Compass,
  Star,
  Quote,
  ShieldCheck,
  Utensils,
  FileCheck2,
  ExternalLink,
} from "lucide-react";
import { DESTINATIONS, ITINERARIES } from "@/data/mockData";

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({
    slug: d.slug,
  }));
}

interface DestinationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DestinationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    return {
      title: "Destination Not Found | Soulsventure Luxury Travel",
    };
  }

  return {
    title: `Bespoke ${destination.name} Luxury Tours & Private Holidays`,
    description: `Curated luxury travel to ${destination.name}. ${destination.shortOverview} Handcrafted for discerning Indian travelers with private aviation, vegetarian gastronomy & 24/7 concierge.`,
    alternates: {
      canonical: `https://soulsventure.com/destinations/${destination.slug}`,
    },
    openGraph: {
      title: `Bespoke ${destination.name} Luxury Travel | Soulsventure`,
      description: destination.shortOverview,
      url: `https://soulsventure.com/destinations/${destination.slug}`,
      siteName: "Soulsventure",
      images: [
        {
          url: destination.heroImage,
          width: 1200,
          height: 630,
          alt: `${destination.name} luxury private journey`,
        },
      ],
      type: "website",
    },
  };
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  // Find curated itineraries for this destination
  const matchingItineraries = ITINERARIES.filter(
    (it) => it.destinationSlug === destination.slug
  );

  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.shortOverview,
    image: destination.heroImage,
    touristType: ["Luxury Travelers", "Private Expeditions", "Honeymooners", "Multi-Gen Families"],
    provider: {
      "@type": "TravelAgency",
      name: "Soulsventure",
      url: "https://soulsventure.com",
    },
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }}
      />

      {/* Cinematic Full-Bleed Hero Banner */}
      <section className="relative h-[75vh] min-h-[580px] w-full flex items-end overflow-hidden text-white">
        <Image
          src={destination.heroImage}
          alt={`${destination.name} luxury private tour - panoramic view`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-16 w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-[#DFCDAE]">
            <MapPin className="w-3 h-3 text-[#C5A880]" />
            <span>{destination.continent} • {destination.region}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
            {destination.name}
          </h1>

          <p className="text-white/80 font-light text-base sm:text-xl max-w-3xl leading-relaxed">
            {destination.shortOverview}
          </p>
        </div>
      </section>

      {/* Climatic Overview Bar */}
      <div className="relative z-20 -mt-8 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-white border border-[#1A1A1A]/10 shadow-xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1 border-r border-[#1A1A1A]/5 pr-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Best Time to Visit
            </span>
            <p className="font-serif text-sm sm:text-base font-medium text-[#1A1A1A]">
              {destination.climaticOverview.bestTimeToVisit}
            </p>
          </div>

          <div className="space-y-1 border-r border-[#1A1A1A]/5 pr-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Ideal Duration
            </span>
            <p className="font-serif text-sm sm:text-base font-medium text-[#1A1A1A]">
              {destination.climaticOverview.idealDuration}
            </p>
          </div>

          <div className="space-y-1 border-r border-[#1A1A1A]/5 pr-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5" /> Average Temperature
            </span>
            <p className="font-serif text-sm sm:text-base font-medium text-[#1A1A1A]">
              {destination.climaticOverview.averageTemp}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5" /> Gateway Hub
            </span>
            <p className="font-serif text-sm sm:text-base font-medium text-[#1A1A1A]">
              {destination.climaticOverview.gatewayAirport}
            </p>
          </div>
        </div>
      </div>

      {/* Indian Traveler Concierge & Special Privileges Banner */}
      <section className="pt-16 pb-6 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-[#F5F2EB] border border-[#C5A880]/30 p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Soulsventure India Private Desk Privileges
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                Tailored for Discerning Indian Travelers to {destination.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-light leading-relaxed">
                From expedited Schengen/visa appointment assistance in New Delhi & Mumbai to custom gourmet vegetarian, vegan, and Jain culinary choreography with private Michelin-caliber chefs on location.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-3 bg-white p-3.5 border border-[#1A1A1A]/10">
                <Utensils className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <span className="text-xs text-[#1A1A1A] font-medium">Bespoke Jain & Pure Veg Dining</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 border border-[#1A1A1A]/10">
                <FileCheck2 className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <span className="text-xs text-[#1A1A1A] font-medium">VIP Tarmac Visa & Fast-Track Desk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative & Curator Overview Spread */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Narrative Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> The Destination In Depth
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] leading-tight">
                {destination.tag}
              </h2>
            </div>

            {destination.narrativeOverview.map((paragraph, pIdx) => (
              <p
                key={pIdx}
                className={`${
                  pIdx === 0 ? "drop-cap" : ""
                } text-sm sm:text-base text-[#1A1A1A]/80 font-light leading-relaxed`}
              >
                {paragraph}
              </p>
            ))}

            {/* Photo Gallery Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {destination.gallery.slice(0, 2).map((img, gIdx) => (
                <div key={gIdx} className="relative h-48 sm:h-64 overflow-hidden border border-[#1A1A1A]/10">
                  <Image
                    src={img}
                    alt={`${destination.name} luxury retreat - visual perspective ${gIdx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Curator Card & Direct Consultation Prompt */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F5F2EB] border border-[#1A1A1A]/10 p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C5A880] flex-shrink-0">
                  <Image
                    src={destination.curator.avatar}
                    alt={destination.curator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                    Lead Region Specialist
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
                    {destination.curator.name}
                  </h3>
                  <span className="text-xs text-[#1A1A1A]/60 block font-light">
                    {destination.curator.role}
                  </span>
                </div>
              </div>

              <blockquote className="p-4 bg-white border-l-2 border-[#C5A880] space-y-1">
                <p className="font-serif italic text-sm text-[#1A1A1A] leading-relaxed">
                  &ldquo;{destination.curator.quote}&rdquo;
                </p>
              </blockquote>

              <p className="text-xs text-[#1A1A1A]/70 font-light leading-relaxed">
                Connect directly with {destination.curator.name} to design an itinerary shaped entirely around your family’s rhythm and passions.
              </p>

              <Link
                href={`/enquire?destination=${destination.slug}`}
                className="w-full block text-center py-3.5 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md"
              >
                Plan {destination.name} With {destination.curator.name.split(" ")[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Itineraries for this destination */}
      {matchingItineraries.length > 0 && (
        <section className="py-20 bg-[#F5F2EB] border-y border-[#1A1A1A]/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="max-w-2xl space-y-3 mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                Signature Routes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
                Curated itineraries for {destination.name}.
              </h2>
              <p className="text-[#1A1A1A]/70 text-sm font-light">
                Each journey can be experienced exactly as mapped or customized down to every private guide and dinner reservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {matchingItineraries.map((itinerary) => (
                <div
                  key={itinerary.id}
                  className="bg-white border border-[#1A1A1A]/10 overflow-hidden flex flex-col group hover:shadow-xl transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={itinerary.heroImage}
                      alt={`${itinerary.title} - curated journey`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest">
                      {itinerary.durationDays} Days / {itinerary.durationNights} Nights
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                        {itinerary.travelStyle}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors">
                        {itinerary.title}
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/70 font-light mt-2 line-clamp-2">
                        {itinerary.tagline}
                      </p>
                    </div>

                    {/* Route Vector Coordinated Stops Preview */}
                    <div className="p-3 bg-[#F5F2EB]/80 border border-[#1A1A1A]/5 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Plane className="w-3 h-3" /> Route Vector
                        </span>
                        <span>{itinerary.routeStops.length} Coordinated Stops</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#1A1A1A]/85 font-medium overflow-x-auto whitespace-nowrap">
                        {itinerary.routeStops.map((stop, sIdx) => (
                          <span key={sIdx} className="inline-flex items-center gap-1.5">
                            <span className="text-[#1A1A1A] font-serif">{stop.name}</span>
                            {sIdx < itinerary.routeStops.length - 1 && (
                              <span className="text-[#C5A880] text-[10px]">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 block">
                          From
                        </span>
                        <span className="font-serif text-base font-medium">
                          From ₹{itinerary.priceFromINR.toLocaleString("en-IN")} pp
                        </span>
                      </div>
                      <Link
                        href={`/itineraries/${itinerary.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] hover:text-[#C5A880]"
                      >
                        <span>Deep Dive Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* "Where to Stay" Sanctuary Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl space-y-3 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            Architectural Sanctuaries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
            Where to stay in {destination.name}.
          </h2>
          <p className="text-[#1A1A1A]/70 text-sm font-light">
            We partner with private estates, low-impact eco-lodges, and historic palaces that prioritize soul over size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destination.whereToStay.map((lodge) => (
            <div
              key={lodge.id}
              className="bg-white border border-[#1A1A1A]/10 overflow-hidden flex flex-col group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src={lodge.image}
                  alt={`${lodge.name} - luxury accommodation in ${lodge.location}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest">
                  {lodge.type}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#C5A880] text-white text-[10px] uppercase tracking-widest font-semibold">
                  {lodge.pricePerNight}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A880]" /> {lodge.location}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A]">
                    {lodge.name}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/75 font-light leading-relaxed">
                    {lodge.description}
                  </p>
                </div>

                {/* Amenity Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {lodge.amenities.map((amenity, aIdx) => (
                    <span
                      key={aIdx}
                      className="px-2.5 py-1 bg-[#F5F2EB] text-[10px] uppercase tracking-wider text-[#1A1A1A]/80 font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-[#FDFBF7] border-l-2 border-[#C5A880] text-xs italic text-[#1A1A1A]/80 font-serif">
                  &ldquo;{lodge.highlightQuote}&rdquo;
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insider Guide / Travel Designer Notes */}
      <section className="py-20 bg-[#F5F2EB] border-t border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
              Curator Intelligence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
              Insider notes from our field specialists.
            </h2>
            <p className="text-[#1A1A1A]/70 text-sm font-light">
              Privileged access, secret viewpoints, and culinary discoveries you won&apos;t find in guidebooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.insiderTips.map((tip, tIdx) => (
              <div
                key={tIdx}
                className="bg-white p-6 border border-[#1A1A1A]/10 space-y-3 shadow-sm"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                  {tip.category}
                </span>
                <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#1A1A1A]/75 font-light leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Consultation CTA */}
          <div className="mt-16 text-center bg-white border border-[#1A1A1A]/10 p-10 max-w-3xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
              Ready to create your bespoke {destination.name} journey?
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light max-w-xl mx-auto">
              Our specialists will map your route, coordinate private aviation, and unlock exclusive estate privileges.
            </p>
            <div className="pt-2">
              <Link
                href={`/enquire?dest=${destination.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-lg"
              >
                <span>Enquire About {destination.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
