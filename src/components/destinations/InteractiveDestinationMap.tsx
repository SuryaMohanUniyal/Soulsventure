"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Thermometer, Sparkles } from "lucide-react";
import { DESTINATIONS } from "@/data/mockData";
import { Destination } from "@/types";

export default function InteractiveDestinationMap() {
  const [activePin, setActivePin] = useState<Destination | null>(DESTINATIONS[0]);

  return (
    <div className="relative w-full bg-[#1A1A1A] text-white p-6 sm:p-10 border border-white/10 shadow-2xl overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Global Interactive Cartography
          </span>
          <h3 className="font-serif text-2xl font-light text-white">
            Curated Sanctuaries Across the Continents
          </h3>
        </div>
        <div className="text-xs text-white/60 tracking-wider">
          Click any coordinate pin to reveal climatic facts & curated lodges
        </div>
      </div>

      {/* Interactive Map Visual Area */}
      <div className="relative z-10 my-8 w-full h-[360px] sm:h-[480px] bg-[#222222] border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Stylized World Vector Outline Map SVG */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-contain opacity-35 select-none"
          fill="#3D3D3D"
        >
          {/* Simplified Continental land masses */}
          {/* North America */}
          <path d="M 120,80 Q 220,70 280,120 Q 260,180 200,220 Q 150,210 120,150 Z" />
          {/* Central & South America */}
          <path d="M 230,230 Q 300,240 330,310 Q 300,430 250,450 Q 230,370 220,280 Z" />
          {/* Europe */}
          <path d="M 450,90 Q 550,80 570,140 Q 520,180 470,170 Q 440,140 450,90 Z" />
          {/* Africa */}
          <path d="M 460,190 Q 570,180 580,280 Q 540,400 480,380 Q 450,280 460,190 Z" />
          {/* Asia */}
          <path d="M 580,90 Q 820,70 850,180 Q 760,280 660,250 Q 590,200 580,90 Z" />
          {/* Australia */}
          <path d="M 760,330 Q 860,320 870,400 Q 800,430 750,380 Z" />
        </svg>

        {/* Dynamic Glowing Pins for Destinations */}
        {DESTINATIONS.map((dest) => {
          const isSelected = activePin?.id === dest.id;
          return (
            <div
              key={dest.id}
              style={{
                left: `${dest.coordinates.x}%`,
                top: `${dest.coordinates.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActivePin(dest)}
                className="relative group flex items-center justify-center cursor-pointer p-2 focus:outline-none"
                aria-label={`Select ${dest.name}`}
              >
                {/* Radar pulse animation */}
                <span
                  className={`absolute w-7 h-7 rounded-full transition-all duration-300 ${
                    isSelected
                      ? "bg-[#C5A880]/40 animate-ping"
                      : "bg-white/10 group-hover:bg-[#C5A880]/30"
                  }`}
                />
                {/* Pin Center Core */}
                <span
                  className={`relative block w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? "bg-[#C5A880] border-white scale-125 shadow-[0_0_15px_#C5A880]"
                      : "bg-[#FDFBF7] border-[#1A1A1A] group-hover:scale-110"
                  }`}
                />
                {/* Pin Text Label */}
                <span
                  className={`absolute top-full mt-1.5 whitespace-nowrap text-[10px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded transition-all duration-200 ${
                    isSelected
                      ? "bg-[#C5A880] text-[#1A1A1A] opacity-100"
                      : "bg-black/70 text-white/80 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {dest.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating Active Destination Detail Card */}
      {activePin && (
        <div className="relative z-10 bg-[#252525] border border-white/15 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-in fade-in duration-300">
          <div className="md:col-span-3 relative h-36 w-full overflow-hidden border border-white/10">
            <Image
              src={activePin.heroImage}
              alt={activePin.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                {activePin.continent} • {activePin.region}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-[10px] uppercase tracking-widest text-white/70">
                {activePin.tag}
              </span>
            </div>
            <h4 className="font-serif text-2xl font-light text-white">
              {activePin.name}
            </h4>
            <p className="text-xs text-white/70 font-light line-clamp-2">
              {activePin.shortOverview}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-1 font-light">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" /> {activePin.climaticOverview.bestTimeToVisit}
              </span>
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-[#C5A880]" /> {activePin.climaticOverview.averageTemp}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col justify-center items-start md:items-end">
            <Link
              href={`/destinations/${activePin.slug}`}
              className="w-full md:w-auto px-5 py-3 bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore {activePin.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-white/40 mt-2 block text-center md:text-right">
              {activePin.whereToStay.length} Handpicked Sanctuaries
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
