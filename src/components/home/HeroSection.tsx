"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, ArrowDown, MapPin, Compass, Clock, Sparkles } from "lucide-react";
import { DESTINATIONS } from "@/data/mockData";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=85",
    title: "Experience Royal Living in India's Grand Palaces.",
    subtitle: "Stay in historic lake palaces in Udaipur, enjoy private boat rides, and spot wild leopards on safari.",
    location: "Lake Pichola & Jawai, Rajasthan",
    slug: "rajasthan",
  },
  {
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2400&q=85",
    title: "Breathtaking Mountain Journeys in Ladakh.",
    subtitle: "Visit peaceful monasteries, stay in warm luxury tents, and admire the clear blue waters of Pangong Lake.",
    location: "Thiksey & Nubra Valley, Ladakh",
    slug: "ladakh",
  },
  {
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2400&q=85",
    title: "Private Tiger Safaris in Central India.",
    subtitle: "Track wild Bengal tigers with expert guides and relax in beautiful forest safari lodges.",
    location: "Ranthambore & Bandhavgarh, Central India",
    slug: "central-india-safaris",
  },
  {
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=85",
    title: "Calm Backwaters and Houseboats in Kerala.",
    subtitle: "Cruise along peaceful green canals on a private houseboat with your own personal chef.",
    location: "Alleppey & Kumarakom, Kerala",
    slug: "kerala-backwaters",
  },
  {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2400&q=85",
    title: "Snowy Mountains and Peaceful Lakes in Kashmir.",
    subtitle: "Stay on classic wooden houseboats in Srinagar and explore the snowy pine valleys of Gulmarg.",
    location: "Nigeen Lake & Gulmarg, Kashmir",
    slug: "kashmir-gulmarg",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);

  // Quick Discovery Bar state
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  // Auto-advance hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleDiscoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDestination) params.set("dest", selectedDestination);
    if (selectedStyle) params.set("style", selectedStyle);
    if (selectedDuration) params.set("dur", selectedDuration);
    router.push(`/itineraries?${params.toString()}`);
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between text-white pb-6 overflow-hidden">
      {/* Background Slides with Ken Burns transition */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.location}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
                index === activeSlide ? "scale-105" : "scale-100"
              }`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/35 to-black/40" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.slug}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group flex items-center justify-end gap-3 text-right"
          >
            <span
              className={`text-[10px] uppercase tracking-widest transition-all ${
                activeSlide === i
                  ? "opacity-100 font-semibold text-[#DFCDAE] translate-x-0"
                  : "opacity-0 -translate-x-2 group-hover:opacity-60"
              }`}
            >
              {slide.location.split(",")[0]}
            </span>
            <span
              className={`block transition-all duration-300 rounded-full ${
                activeSlide === i
                  ? "w-8 h-1 bg-[#C5A880]"
                  : "w-2 h-1 bg-white/40 group-hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Spacer to push content down below fixed nav */}
      <div className="pt-24 sm:pt-28" />

      {/* Main Center Editorial Typography */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-4 sm:space-y-5 my-auto py-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-black/25 backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#DFCDAE]">
          <Sparkles className="w-3 h-3 text-[#C5A880]" />
          <span>Curators of Bespoke Luxury</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] drop-shadow-sm max-w-4xl mx-auto">
          <span className="block text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-[#DFCDAE] font-semibold mb-3">
            Bespoke Luxury Travel in India
          </span>
          {currentSlide.title}
        </h1>

        <p className="text-white/80 font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans tracking-wide leading-relaxed">
          {currentSlide.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1">
          <Link
            href="/enquire"
            className="px-7 py-3 bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start Planning With A Curator
          </Link>
          <Link
            href={`/destinations/${currentSlide.slug}`}
            className="px-5 py-3 border border-white/30 hover:border-white text-white text-xs uppercase tracking-[0.2em] transition-all backdrop-blur-sm bg-black/20 hover:bg-black/40 flex items-center gap-2"
          >
            <span>Explore {currentSlide.location.split(",")[0]}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick-Trip Discovery Bar (Bottom Dock) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full pt-4 pb-4">
        <form
          onSubmit={handleDiscoverySubmit}
          className="bg-[#FDFBF7] text-[#1A1A1A] p-3 sm:p-4 shadow-2xl border border-white/20 grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
        >
          {/* Destination Selector */}
          <div className="p-2 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10">
            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Destination
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-serif text-[#1A1A1A] focus:outline-none cursor-pointer"
            >
              <option value="">All Destinations</option>
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.slug}>
                  {d.name} ({d.continent})
                </option>
              ))}
            </select>
          </div>

          {/* Travel Style Selector */}
          <div className="p-2 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10">
            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1 flex items-center gap-1">
              <Compass className="w-3 h-3" /> Travel Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-transparent text-sm font-serif text-[#1A1A1A] focus:outline-none cursor-pointer"
            >
              <option value="">All Travel Styles</option>
              <option value="Off-the-Grid">Off-the-Grid Expeditions</option>
              <option value="Safari">Private Safari & Wildlife</option>
              <option value="Romance">Honeymoons & Romance</option>
              <option value="Sanctuary">Sanctuary & Alpine Wellness</option>
              <option value="Family">Family & Multi-Gen</option>
            </select>
          </div>

          {/* Duration Selector */}
          <div className="p-2 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10">
            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Ideal Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-transparent text-sm font-serif text-[#1A1A1A] focus:outline-none cursor-pointer"
            >
              <option value="">Any Duration</option>
              <option value="7-10">7 to 10 Days</option>
              <option value="10-14">10 to 14 Days</option>
              <option value="14+">14+ Days (Grand Tour)</option>
            </select>
          </div>

          {/* Submit Action Button */}
          <div className="p-1">
            <button
              type="submit"
              className="w-full py-3 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Find Journeys</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Subtle slide info tag */}
        <div className="flex items-center justify-between mt-3 text-[11px] text-white/60 tracking-wider">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#DFCDAE]" /> {currentSlide.location}
          </span>
          <span className="hidden sm:inline">0{activeSlide + 1} / 0{HERO_SLIDES.length}</span>
        </div>
      </div>
    </section>
  );
}
