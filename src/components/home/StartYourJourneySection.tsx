"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface SpotlightCard {
  title: string;
  badge?: string;
  subtitle?: string;
  image: string;
  link: string;
  isCustomTypography?: boolean;
}

const SPOTLIGHT_DATA: Record<string, SpotlightCard[]> = {
  "IN THE SPOTLIGHT": [
    {
      title: "JAWAI & THE LEOPARDS",
      badge: "UNTAMED WILD",
      subtitle: "Private 4x4 safaris traversing billion-year-old granite boulders alongside Rabari pastoralists.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      link: "/destinations/rajasthan",
      isCustomTypography: true,
    },
    {
      title: "HIGH-ALTITUDE LADAKH",
      subtitle: "Heated imperial glamping suites at 11,500 ft, private monastery blessings & dark sky stargazing.",
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      link: "/destinations/ladakh",
      isCustomTypography: false,
    },
    {
      title: "ROYAL FLOATING PALACES",
      subtitle: "Private royal barge arrivals, cusped marble arches, and candlelit dinners on Lake Pichola.",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      link: "/itineraries/royal-maharajah-palaces-rajasthan",
      isCustomTypography: false,
    },
  ],
  "BY TRAVELLER": [
    {
      title: "ROYAL HONEYMOONS & ROMANCE",
      badge: "FOR TWO",
      subtitle: "Private island palaces, secluded candlelit desert dunes, and sunset shikaras on Nigeen Lake.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      link: "/itineraries?style=Romance",
    },
    {
      title: "MULTI-GEN FAMILY HERITAGE",
      badge: "TOGETHER",
      subtitle: "Private palace buyouts, conservation tiger tracking, and customized pure veg & Jain culinary care.",
      image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
      link: "/itineraries?style=Family",
    },
    {
      title: "MINDFUL SOLITUDE & RETREATS",
      badge: "SOLITUDE",
      subtitle: "Himalayan meditation sanctuaries, private yoga ashrams, and authentic lineage Ayurveda in Kerala.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      link: "/itineraries?style=Sanctuary",
    },
  ],
  "MOST POPULAR": [
    {
      title: "THE ROYAL MAHARAJAH CIRCUIT",
      subtitle: "Udaipur, Jodhpur, Jaipur & Jawai — private royal quarters, vintage car transfers, and desert suites.",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      link: "/itineraries/royal-maharajah-palaces-rajasthan",
    },
    {
      title: "THE BENGAL TIGER SAFARI",
      subtitle: "Full-day VIP core zone tracking permits in Ranthambore & Bandhavgarh with master naturalists.",
      image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
      link: "/itineraries/royal-bengal-tiger-safari-central-india",
    },
    {
      title: "MALABAR ROYAL HOUSEBOAT",
      subtitle: "Private chartered teak Kettuvallam gliding through secluded coconut lagoons with personal chefs.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      link: "/itineraries/malabar-serenade-kerala-houseboat",
    },
  ],
  "BY MONTH": [
    {
      title: "OCTOBER – MARCH",
      badge: "ROYAL WINTER SEASON",
      subtitle: "Rajasthan royal palace festivals, Thar desert luxury camps, and Central India tiger tracking.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      link: "/destinations/rajasthan",
    },
    {
      title: "APRIL – JUNE",
      badge: "HIMALAYAN MEADOWS",
      subtitle: "Gulmarg alpine wildflowers, peaceful Nigeen Lake cedar houseboats, and cedar retreats in Pahalgam.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      link: "/destinations/kashmir-gulmarg",
    },
    {
      title: "JULY – SEPTEMBER",
      badge: "LADAKH & MONSOON WELLNESS",
      subtitle: "Rain-shadow sunny skies in Ladakh, Pangong Lake glamping, and restorative monsoon Ayurveda in Kerala.",
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      link: "/destinations/ladakh",
    },
  ],
};

const TABS = ["BY TRAVELLER", "MOST POPULAR", "BY MONTH", "IN THE SPOTLIGHT"];

export default function StartYourJourneySection() {
  const [activeTab, setActiveTab] = useState("IN THE SPOTLIGHT");

  const cards = SPOTLIGHT_DATA[activeTab] || SPOTLIGHT_DATA["IN THE SPOTLIGHT"];

  return (
    <section className="py-20 sm:py-28 bg-white text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EB] text-[#C5A880] text-[10px] uppercase tracking-[0.25em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> India Bespoke Collections
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.06em] text-[#1A1A1A] uppercase mb-4 sm:mb-6">
            Start Your Journey
          </h2>
          <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Explore unscripted journeys across India’s most revered royal palaces, high-altitude Himalayan plateaus, and pristine tiger reserves.
          </p>

          {/* Interactive Navigation Filter Tabs */}
          <div className="flex items-center justify-center gap-8 sm:gap-14 overflow-x-auto pb-4 border-b border-[#1A1A1A]/10 text-xs sm:text-sm uppercase tracking-[0.22em] font-medium mt-8 sm:mt-12">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#1A1A1A] font-semibold"
                      : "text-[#1A1A1A]/45 hover:text-[#1A1A1A]"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880] transition-all" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Large Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.link}
              className="group flex flex-col bg-[#FDFBF7] border border-[#1A1A1A]/10 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Card Imagery with Subtle Zoom */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#1A1A1A]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Top Badge */}
                {card.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#DFCDAE] font-semibold border border-white/20">
                      {card.badge}
                    </span>
                  </div>
                )}

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide leading-tight group-hover:text-[#DFCDAE] transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Text Narrative Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#FDFBF7]">
                <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-light leading-relaxed line-clamp-3">
                  {card.subtitle}
                </p>

                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                    <span>Explore Route</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-[#C5A880] tracking-wider uppercase font-semibold">
                    Tailor-Made
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
