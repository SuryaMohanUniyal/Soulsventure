"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Compass, ShieldCheck, Sparkles, MapPin, Plane } from "lucide-react";
import { ITINERARIES } from "@/data/mockData";

const STYLES = [
  { id: "all", label: "All Journeys" },
  { id: "off-the-grid", label: "Off-the-Grid" },
  { id: "safari", label: "Safari & Wildlife" },
  { id: "sanctuary", label: "Sanctuary & Wellness" },
  { id: "romance", label: "Romance & Honeymoons" },
];

export default function CuratedJourneysSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = ITINERARIES.filter((it) => {
    if (activeTab === "all") return true;
    if (activeTab === "off-the-grid") return it.travelStyle.includes("Off-the-Grid");
    if (activeTab === "safari") return it.travelStyle.includes("Safari");
    if (activeTab === "sanctuary") return it.travelStyle.includes("Sanctuary");
    if (activeTab === "romance") return it.travelStyle.includes("Romance");
    return true;
  });

  return (
    <section className="py-24 sm:py-32 bg-[#FDFBF7] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#1A1A1A]/10">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Flagship Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              Curated journeys, unrepeatable moments.
            </h2>
            <p className="text-[#1A1A1A]/65 text-sm sm:text-base font-light">
              Each itinerary represents hundreds of hours of on-the-ground relationship building, private aviation mapping, and architectural selection.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {STYLES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "bg-[#F5F2EB] text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#EAE5D9]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Itinerary Grid Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {filtered.map((itinerary, index) => (
            <article
              key={itinerary.id}
              className="group flex flex-col bg-white border border-[#1A1A1A]/10 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Card Imagery with Ken Burns & Badge Overlay */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-[#1A1A1A]">
                <Image
                  src={itinerary.heroImage}
                  alt={itinerary.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-white">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20">
                    {itinerary.travelStyle.split("&")[0]}
                  </span>
                  <span className="px-3 py-1 bg-[#C5A880] text-white font-semibold">
                    {itinerary.durationDays} Days / {itinerary.durationNights} Nights
                  </span>
                </div>

                {/* Bottom Card Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#DFCDAE] flex items-center gap-1 font-medium mb-1">
                    <MapPin className="w-3 h-3" /> {itinerary.destinationName}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light leading-snug group-hover:text-[#DFCDAE] transition-colors">
                    {itinerary.title}
                  </h3>
                </div>
              </div>

              {/* Card Narrative Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed line-clamp-3">
                  {itinerary.tagline}
                </p>

                {/* Key Highlights list bullets */}
                <div className="space-y-1.5 pt-2 border-t border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/80 font-light">
                  {itinerary.keyHighlights.slice(0, 2).map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <span className="text-[#C5A880] mt-0.5">•</span>
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
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

                {/* Pricing & Deep Dive CTA */}
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
                    <span>View Journey</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Global Catalog Footer Link */}
        <div className="mt-16 text-center">
          <Link
            href="/itineraries"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
          >
            <span>Explore All Bespoke Itineraries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
