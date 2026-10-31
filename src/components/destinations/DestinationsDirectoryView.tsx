"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Compass, Grid, Map, Sparkles, Search } from "lucide-react";
import { DESTINATIONS } from "@/data/mockData";
import InteractiveDestinationMap from "@/components/destinations/InteractiveDestinationMap";

const CONTINENTS = ["All", "Rajasthan", "Himalayas", "Central India", "South India", "Islands"];

export default function DestinationsDirectoryView() {
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesContinent = selectedContinent === "All" || d.continent === selectedContinent;
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesQuery;
  });

  return (
    <div className="pt-28 pb-32 bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Worldwide Luxury Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight">
            Destinations curated with obsessive craft.
          </h1>
          <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light">
            We do not cover the whole globe uniformly; we focus exclusively where we hold direct, privileged access with estate owners, private pilots, and master guides. Tailored for discerning travelers from India and across the globe.
          </p>
        </div>

        {/* Filter and View Mode Toolbar */}
        <div className="bg-[#F5F2EB] p-4 border border-[#1A1A1A]/10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          {/* Continent Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {CONTINENTS.map((cont) => (
              <button
                key={cont}
                onClick={() => setSelectedContinent(cont)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedContinent === cont
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white/80"
                }`}
              >
                {cont}
              </button>
            ))}
          </div>

          {/* Right: Search + View Switcher */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search region, country..."
                className="w-full bg-white text-xs px-9 py-2 border border-[#1A1A1A]/10 text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Grid vs Map Toggle */}
            <div className="flex items-center border border-[#1A1A1A]/10 bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid" ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 transition-colors ${
                  viewMode === "map" ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                }`}
                title="Interactive Map View"
                aria-label="Interactive Map View"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display: Map View vs Grid View */}
        {viewMode === "map" ? (
          <div className="mb-16">
            <InteractiveDestinationMap />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <article
                key={dest.id}
                className="group flex flex-col bg-white border border-[#1A1A1A]/10 overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                {/* Image Banner */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-[#1A1A1A]">
                  <Image
                    src={dest.heroImage}
                    alt={`${dest.name} luxury travel experience - ${dest.tag}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Continent Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-white border border-white/20">
                      {dest.continent}
                    </span>
                  </div>

                  {/* Bottom Heading */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#DFCDAE] block font-medium mb-1">
                      {dest.tag}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-white group-hover:text-[#DFCDAE] transition-colors">
                      {dest.name}
                    </h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed line-clamp-3">
                    {dest.shortOverview}
                  </p>

                  {/* Climate & Quick Facts widget */}
                  <div className="space-y-2 pt-2 border-t border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/80 font-light">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span className="font-medium text-[#1A1A1A]">Best Season:</span>
                      <span className="text-[#1A1A1A]/70">{dest.climaticOverview.bestTimeToVisit.split("(")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span className="font-medium text-[#1A1A1A]">Ideal Duration:</span>
                      <span className="text-[#1A1A1A]/70">{dest.climaticOverview.idealDuration}</span>
                    </div>
                  </div>

                  {/* Curator Quote Snippet */}
                  <div className="p-3 bg-[#F5F2EB] text-[11px] text-[#1A1A1A]/80 italic border-l-2 border-[#C5A880] line-clamp-2">
                    &ldquo;{dest.curator.quote}&rdquo;
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                    <span className="text-xs text-[#1A1A1A]/60 font-light">
                      {dest.whereToStay.length} Lodges & Hideaways
                    </span>
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors"
                    >
                      <span>Explore {dest.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
