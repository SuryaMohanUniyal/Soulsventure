"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Compass, MapPin, BookOpen, Calendar, IndianRupee } from "lucide-react";
import { DESTINATIONS, ITINERARIES, JOURNAL_ARTICLES } from "@/data/mockData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const searchInputId = useId();

  if (!isOpen) return null;

  const filteredItineraries = ITINERARIES.filter((it) => {
    const matchesQuery =
      it.title.toLowerCase().includes(query.toLowerCase()) ||
      it.destinationName.toLowerCase().includes(query.toLowerCase()) ||
      it.tagline.toLowerCase().includes(query.toLowerCase()) ||
      it.continent.toLowerCase().includes(query.toLowerCase());
    const matchesStyle = selectedStyle === "all" || it.travelStyle.toLowerCase().includes(selectedStyle.toLowerCase());
    return matchesQuery && matchesStyle;
  });

  const filteredDestinations = DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.region.toLowerCase().includes(query.toLowerCase()) ||
    d.continent.toLowerCase().includes(query.toLowerCase()) ||
    d.shortOverview.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = JOURNAL_ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-[#FDFBF7] rounded-none border border-[#1A1A1A]/10 shadow-2xl overflow-hidden text-[#1A1A1A] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-4 px-8 py-6 border-b border-[#1A1A1A]/10 bg-white">
          <label htmlFor={searchInputId} className="cursor-pointer">
            <Search className="w-6 h-6 text-[#C5A880]" />
          </label>
          <input
            id={searchInputId}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search private islands, Sossusvlei, Kyoto teahouses, luxury safaris..."
            className="flex-1 bg-transparent text-xl font-light text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none tracking-wide"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:text-[#C5A880] transition-colors"
              aria-label="Clear query"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-[0.2em] px-3 py-1.5 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Quick Style Filter Pills */}
        <div className="flex items-center gap-2 px-8 py-3 bg-[#F5F2EB]/60 border-b border-[#1A1A1A]/5 overflow-x-auto text-xs tracking-wider uppercase font-medium">
          <span className="text-[#1A1A1A]/50 mr-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Style:
          </span>
          {[
            { id: "all", label: "All Styles" },
            { id: "off-the-grid", label: "Off-the-Grid" },
            { id: "safari", label: "Safari" },
            { id: "romance", label: "Honeymoons" },
            { id: "sanctuary", label: "Wellness" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedStyle(pill.id)}
              className={`px-3 py-1 text-xs tracking-wider transition-colors whitespace-nowrap ${
                selectedStyle === pill.id
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-8 space-y-8 divide-y divide-[#1A1A1A]/5">
          {/* Journeys Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Curated Journeys ({filteredItineraries.length})
              </h3>
              <Link
                href="/itineraries"
                onClick={onClose}
                className="text-xs text-[#1A1A1A]/60 hover:text-[#1A1A1A] flex items-center gap-1 group"
              >
                View all journeys <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {filteredItineraries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItineraries.slice(0, 4).map((it) => (
                  <Link
                    key={it.id}
                    href={`/itineraries/${it.slug}`}
                    onClick={onClose}
                    className="flex gap-4 p-3 bg-white hover:bg-[#F5F2EB] border border-[#1A1A1A]/5 transition-all group"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                      <Image
                        src={it.heroImage}
                        alt={it.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-medium">
                          {it.destinationName} • {it.travelStyle}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors line-clamp-1">
                          {it.title}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {it.durationDays} Days
                        </span>
                        <span className="font-medium text-[#1A1A1A]">
                          From ₹{it.priceFromINR.toLocaleString("en-IN")} pp
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#1A1A1A]/50 italic">No itineraries match your search.</p>
            )}
          </div>

          {/* Destinations Section */}
          <div className="pt-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-4">
              Destinations ({filteredDestinations.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filteredDestinations.slice(0, 4).map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  onClick={onClose}
                  className="group relative h-28 overflow-hidden block"
                >
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
                    <span className="text-[9px] uppercase tracking-widest text-[#DFCDAE]">
                      {dest.continent}
                    </span>
                    <span className="font-serif text-base tracking-wide font-normal">
                      {dest.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Journal Stories Section */}
          <div className="pt-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-4">
              Editorial Dispatches ({filteredArticles.length})
            </h3>
            <div className="space-y-2">
              {filteredArticles.slice(0, 2).map((art) => (
                <Link
                  key={art.id}
                  href={`/journal/${art.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 bg-white hover:bg-[#F5F2EB] border border-[#1A1A1A]/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-sm font-serif group-hover:text-[#C5A880] transition-colors">
                      {art.title}
                    </span>
                  </div>
                  <span className="text-xs text-[#1A1A1A]/50">{art.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-8 py-3 bg-[#F5F2EB] border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs text-[#1A1A1A]/60">
          <span>Need custom inspiration? Talk directly to a senior curator.</span>
          <Link
            href="/enquire"
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C5A880] flex items-center gap-1"
          >
            Start Bespoke Consultation <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
