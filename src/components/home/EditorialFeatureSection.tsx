import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, MapPin, Compass } from "lucide-react";

export default function EditorialFeatureSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FDFBF7] text-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Subheading */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-[1px] bg-[#C5A880]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Editorial Dispatch • Volume IX
          </span>
        </div>

        {/* Asymmetric 2-Column Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Magazine Essay */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/50 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> Lake Pichola & The Granite Hills of Jawai, Rajasthan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-[1.15]">
                Where ancient royalty meets untamed silence.
              </h2>
            </div>

            {/* Drop Cap Paragraph */}
            <p className="drop-cap text-sm sm:text-base text-[#1A1A1A]/80 font-light leading-relaxed">
              ravelers often ask us what distinguishes true luxury from mere spectacle in India. The answer does not live in crowded tourist circuits or gold leaf lobbies; it lives at dawn on the calm, mirror waters of Lake Pichola. There, as morning mist curls around 18th-century cusped marble arches and temple bells chime across the water, the chaotic modern world completely recedes.
            </p>

            <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
              From our partner palace sanctuaries in Udaipur to the billion-year-old granite boulder caves of Jawai—where wild leopards live in spiritual harmony alongside red-turbaned Rabari pastoralists—we curate private days governed entirely by curiosity and privilege. Board a private royal barge at dusk, or embark on a bespoke 4WD tracking safari with master naturalists who have lived alongside these apex predators for decades.
            </p>

            {/* Pull Quote Box */}
            <blockquote className="my-6 p-6 bg-[#F5F2EB] border-l-2 border-[#C5A880] space-y-2">
              <p className="font-serif italic text-base sm:text-lg text-[#1A1A1A] leading-snug">
                &ldquo;You do not visit Rajasthan simply to see history. You visit to become part of a living royal tapestry where every stone holds a memory.&rdquo;
              </p>
              <cite className="text-[11px] uppercase tracking-wider text-[#C5A880] not-italic block font-sans font-semibold">
                — Harsh Sood, Co-Founder & Head of Curation
              </cite>
            </blockquote>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Link
                href="/itineraries/royal-maharajah-palaces-rajasthan"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md"
              >
                <span>View The Royal Maharajah Circuit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/journal/poetry-of-the-palace-udaipur"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#1A1A1A] hover:text-[#C5A880] transition-colors py-2"
              >
                <span>Read The Full Journal Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Photo Essay Spread */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Main Large Image */}
              <div className="col-span-12 relative h-96 sm:h-[480px] overflow-hidden border border-[#1A1A1A]/10 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85"
                  alt="Lake Pichola, Udaipur, Rajasthan"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#DFCDAE] block">
                    Lake Pichola, Udaipur
                  </span>
                  <span className="font-serif text-sm">Private wooden barge arrival at the Taj Lake Palace</span>
                </div>
              </div>

              {/* Inset Secondary Image (Floating Card) */}
              <div className="hidden sm:block absolute -bottom-10 -left-10 w-64 h-52 border-4 border-white shadow-2xl overflow-hidden bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
                  alt="Wild leopard on granite rocks in Jawai"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] uppercase tracking-wider font-medium">
                  Jawai Leopard Sanctuary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
