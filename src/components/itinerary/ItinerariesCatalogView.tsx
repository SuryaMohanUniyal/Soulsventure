"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Calendar, Compass, Clock, MapPin, Sparkles, Filter, RefreshCcw, Plane } from "lucide-react";
import { ITINERARIES, DESTINATIONS } from "@/data/mockData";

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchesTravelStyle(itStyle: string, filterStyle: string): boolean {
  if (!filterStyle || filterStyle === "all") return true;

  const it = normalize(itStyle);
  const target = normalize(filterStyle);

  // Direct substring matching
  if (it.includes(target) || target.includes(it)) return true;

  // Semantic category equivalences
  if (target.includes("grid") && it.includes("grid")) return true;
  if (target.includes("safari") && (it.includes("safari") || it.includes("wildlife") || it.includes("tiger"))) return true;
  if ((target.includes("romance") || target.includes("honeymoon")) && (it.includes("romance") || it.includes("honeymoon"))) return true;
  if ((target.includes("sanctuary") || target.includes("wellness")) && (it.includes("sanctuary") || it.includes("wellness"))) return true;
  if ((target.includes("family") || target.includes("gen")) && (it.includes("family") || it.includes("gen"))) return true;

  return false;
}

function ItinerariesCatalogInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedDest, setSelectedDest] = useState<string>("all");
  const [selectedPace, setSelectedPace] = useState<string>("all");

  // Keep state perfectly synchronized with URL query params across client navigation
  useEffect(() => {
    const s = searchParams.get("style");
    const d = searchParams.get("dest");
    const p = searchParams.get("pace");

    setSelectedStyle(s || "all");
    setSelectedDest(d || "all");
    setSelectedPace(p || "all");
  }, [searchParams]);

  // Update URL and state simultaneously
  const updateFilter = (type: "style" | "dest" | "pace", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "style") {
      setSelectedStyle(value);
      if (value === "all") params.delete("style");
      else params.set("style", value);
    } else if (type === "dest") {
      setSelectedDest(value);
      if (value === "all") params.delete("dest");
      else params.set("dest", value);
    } else if (type === "pace") {
      setSelectedPace(value);
      if (value === "all") params.delete("pace");
      else params.set("pace", value);
    }

    const qs = params.toString();
    router.replace(`/itineraries${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const resetAllFilters = () => {
    setSelectedStyle("all");
    setSelectedDest("all");
    setSelectedPace("all");
    router.replace("/itineraries", { scroll: false });
  };

  const filteredItineraries = ITINERARIES.filter((it) => {
    const matchStyle = matchesTravelStyle(it.travelStyle, selectedStyle);
    const matchDest = selectedDest === "all" || it.destinationSlug === selectedDest;
    const matchPace =
      selectedPace === "all" ||
      it.pace.toLowerCase() === selectedPace.toLowerCase();
    return matchStyle && matchDest && matchPace;
  });

  return (
    <div className="pt-28 pb-32 bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Flagship Private Journeys
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight">
            Curated bespoke itineraries.
          </h1>
          <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light">
            Every itinerary is a blueprint: completely customizable, private-guided, and choreographed around your family’s unique passions. Designed for high-net-worth travelers seeking private aircraft, living palace sanctuaries, and VIP conservation access across India.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#F5F2EB] p-6 border border-[#1A1A1A]/10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center mb-12">
          {/* Style Filter */}
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
              Travel Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => updateFilter("style", e.target.value)}
              className="w-full bg-white text-xs px-3 py-2 border border-[#1A1A1A]/10 text-[#1A1A1A] focus:outline-none cursor-pointer"
            >
              <option value="all">All Travel Styles</option>
              <option value="Off-the-Grid Expeditions">Off-the-Grid Expeditions</option>
              <option value="Honeymoons & Romance">Honeymoons & Romance</option>
              <option value="Private Safari & Wildlife">Private Safari & Wildlife</option>
              <option value="Sanctuary & Wellness">Sanctuary & Wellness</option>
              <option value="Family & Multi-Gen">Family & Multi-Gen</option>
            </select>
          </div>

          {/* Destination Filter */}
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
              Destination
            </label>
            <select
              value={selectedDest}
              onChange={(e) => updateFilter("dest", e.target.value)}
              className="w-full bg-white text-xs px-3 py-2 border border-[#1A1A1A]/10 text-[#1A1A1A] focus:outline-none cursor-pointer"
            >
              <option value="all">All Destinations</option>
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pace Filter */}
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
              Pacing
            </label>
            <select
              value={selectedPace}
              onChange={(e) => updateFilter("pace", e.target.value)}
              className="w-full bg-white text-xs px-3 py-2 border border-[#1A1A1A]/10 text-[#1A1A1A] focus:outline-none cursor-pointer"
            >
              <option value="all">All Paces</option>
              <option value="Leisurely">Leisurely & Decelerated</option>
              <option value="Moderate">Moderate Balance</option>
              <option value="Active Exploration">Active Exploration</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex sm:justify-end items-end pt-3 sm:pt-0">
            <button
              onClick={resetAllFilters}
              className="text-xs uppercase tracking-wider text-[#1A1A1A]/60 hover:text-[#1A1A1A] underline underline-offset-4 cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pb-6 text-xs text-[#1A1A1A]/60 border-b border-[#1A1A1A]/10 mb-8">
          <span>
            Showing <strong className="text-[#1A1A1A] font-medium">{filteredItineraries.length}</strong> handcrafted itineraries
            {selectedStyle !== "all" && (
              <span className="text-[#C5A880] ml-1">in &ldquo;{selectedStyle}&rdquo;</span>
            )}
            {selectedDest !== "all" && (
              <span className="text-[#C5A880] ml-1">({selectedDest})</span>
            )}
          </span>
          <span className="text-[#C5A880] font-medium">100% Tailored to Order</span>
        </div>

        {/* Itinerary Cards Grid */}
        {filteredItineraries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItineraries.map((itinerary) => (
              <article
                key={itinerary.id}
                className="group flex flex-col bg-white border border-[#1A1A1A]/10 overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden bg-[#1A1A1A]">
                  <Image
                    src={itinerary.heroImage}
                    alt={`${itinerary.title} - luxury ${itinerary.travelStyle} tour`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-white">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20">
                      {itinerary.travelStyle}
                    </span>
                    <span className="px-3 py-1 bg-[#C5A880] text-white font-semibold">
                      {itinerary.durationDays} Days / {itinerary.durationNights} Nights
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#DFCDAE] flex items-center gap-1 font-medium mb-1">
                      <MapPin className="w-3 h-3" /> {itinerary.destinationName}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-light leading-snug group-hover:text-[#DFCDAE] transition-colors">
                      {itinerary.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed line-clamp-3">
                    {itinerary.tagline}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/80 font-light">
                    <div className="flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span className="font-medium text-[#1A1A1A]">Pace:</span>
                      <span>{itinerary.pace}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span className="font-medium text-[#1A1A1A]">Season:</span>
                      <span>{itinerary.idealSeason}</span>
                    </div>
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
                        Estimated Investment
                      </span>
                      <span className="font-serif text-lg font-medium text-[#1A1A1A]">
                        From ₹{itinerary.priceFromINR.toLocaleString("en-IN")}{" "}
                        <span className="text-xs font-sans text-[#1A1A1A]/60 font-light">/ person</span>
                      </span>
                    </div>

                    <Link
                      href={`/itineraries/${itinerary.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors"
                    >
                      <span>Deep Dive</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#1A1A1A]/10 p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <Compass className="w-8 h-8 text-[#C5A880] mx-auto animate-pulse" />
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
              No Itineraries Matching This Selection
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
              Every Soulsventure journey is completely bespoke. If your chosen combination is not listed above, our Senior Curators will handcraft a private routing specifically tailored to your family&apos;s pacing.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                View All Itineraries
              </button>
              <Link
                href="/enquire"
                className="px-6 py-2.5 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Design Custom Route
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItinerariesCatalogView() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-sm font-light">Loading itineraries...</div>}>
      <ItinerariesCatalogInner />
    </Suspense>
  );
}
