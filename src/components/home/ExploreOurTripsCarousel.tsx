"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, ArrowRight, Sparkles } from "lucide-react";

interface TripCard {
  id: string;
  country: string;
  title: string;
  nights: string;
  image: string;
  link: string;
}

const FEATURED_TRIPS: TripCard[] = [
  {
    id: "trip-rajasthan",
    country: "RAJASTHAN",
    title: "THE ROYAL MAHARAJAH CIRCUIT",
    nights: "10 NIGHTS",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    link: "/itineraries/royal-maharajah-palaces-rajasthan",
  },
  {
    id: "trip-ladakh",
    country: "LADAKH",
    title: "HIMALAYAN SOLITUDE & GLAMPING",
    nights: "9 NIGHTS",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    link: "/itineraries/himalayan-solitude-ladakh-glamping",
  },
  {
    id: "trip-central-india",
    country: "CENTRAL INDIA",
    title: "THE ROYAL BENGAL TIGER TRAIL",
    nights: "8 NIGHTS",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
    link: "/itineraries/royal-bengal-tiger-safari-central-india",
  },
  {
    id: "trip-kerala",
    country: "KERALA",
    title: "MALABAR SERENADE & ROYAL HOUSEBOATS",
    nights: "7 NIGHTS",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    link: "/itineraries/malabar-serenade-kerala-houseboat",
  },
  {
    id: "trip-kashmir",
    country: "KASHMIR",
    title: "THE CROWN OF KASHMIR & GULMARG",
    nights: "8 NIGHTS",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    link: "/itineraries/crown-of-kashmir-gulmarg-shikara",
  },
  {
    id: "trip-andaman",
    country: "ANDAMAN ISLANDS",
    title: "ISLAND ESCAPE & EMERALD LAGOONS",
    nights: "6 NIGHTS",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
    link: "/destinations/andaman-islands",
  },
];

export default function ExploreOurTripsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-r from-[#1c1c1c] via-[#242424] to-[#1c1c1c] text-white overflow-hidden">
      {/* Subtle Topographic Contour Line Watermark Background on Left */}
      <div className="absolute top-0 left-0 bottom-0 w-96 pointer-events-none opacity-10 select-none">
        <svg
          viewBox="0 0 400 600"
          className="w-full h-full stroke-white fill-none stroke-[1.5]"
        >
          <path d="M -50,100 C 100,120 180,80 220,180 C 260,280 180,360 250,450 C 300,520 220,620 -50,650" />
          <path d="M -50,150 C 120,170 200,130 250,220 C 290,320 220,400 280,490 C 330,560 250,650 -50,680" />
          <path d="M -50,200 C 140,220 220,180 280,260 C 320,360 250,440 310,530 C 350,590 280,680 -50,710" />
          <path d="M -50,250 C 160,270 240,230 300,310 C 340,400 280,480 340,560 C 370,610 300,700 -50,730" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title Column */}
          <div className="lg:col-span-4 space-y-4 pr-4 relative z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Handcrafted Expeditions
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-white uppercase leading-none">
              Explore Our Trips
            </h2>
            <p className="font-serif italic text-white/80 text-lg sm:text-xl font-light leading-relaxed">
              Remarkable journeys across India to inspire the soul.
            </p>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed pt-2">
              Privileged access, private aircraft routings, and unlisted palace compounds tailored to your family&apos;s pacing.
            </p>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-3 pt-6">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Horizontal Scroll Track */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 pl-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {FEATURED_TRIPS.map((trip) => (
                <Link
                  key={trip.id}
                  href={trip.link}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer block"
                >
                  <div className="relative h-[380px] sm:h-[420px] w-full overflow-hidden bg-[#111] border border-white/10 shadow-lg">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Dark gradient for typography legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                    {/* Top Content: Nights Pill */}
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 border border-white/20">
                        {trip.nights}
                      </span>
                    </div>

                    {/* Bottom Content: Country + Title */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-2">
                      <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#C5A880] uppercase block">
                        {trip.country}
                      </span>
                      <h3 className="font-sans text-lg sm:text-xl font-bold tracking-[0.08em] text-white uppercase leading-snug group-hover:text-[#DFCDAE] transition-colors">
                        {trip.title}
                      </h3>
                      <div className="pt-2 flex items-center gap-1.5 text-xs text-white/60 group-hover:text-white transition-colors">
                        <span>View Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
