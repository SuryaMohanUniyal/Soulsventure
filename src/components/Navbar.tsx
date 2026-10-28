"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, X, ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import SearchModal from "./SearchModal";
import { DESTINATIONS } from "@/data/mockData";
import SoulsventureLogo from "@/components/SoulsventureLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detect scroll position for dynamic glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const indianRegions: ("Rajasthan" | "Himalayas" | "Central India" | "South India" | "Islands")[] = [
    "Rajasthan",
    "Himalayas",
    "Central India",
    "South India",
    "Islands",
  ];

  // Completely hide public website header on Admin OS portal and private client portals
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/moodboard") ||
    pathname?.startsWith("/scrapbook") ||
    pathname?.startsWith("/client")
  ) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FDFBF7]/90 backdrop-blur-md py-3.5 border-b border-[#1A1A1A]/10 shadow-sm"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo with Custom Soul Mascot */}
          <Link href="/" aria-label="Soulsventure Home">
            <SoulsventureLogo isScrolled={isScrolled} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.18em] font-medium">
            {/* Destinations Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("destinations")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/destinations"
                className={`flex items-center gap-1 py-2 transition-colors ${
                  isScrolled ? "text-[#1A1A1A] hover:text-[#C5A880]" : "text-white hover:text-[#DFCDAE]"
                }`}
              >
                Destinations <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {/* Mega Menu Dropdown */}
              {activeDropdown === "destinations" && (
                <div className="absolute top-full -left-20 w-[680px] bg-[#FDFBF7] text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                        Explore by Indian Region
                      </span>
                      <Link
                        href="/destinations"
                        className="text-[11px] text-[#1A1A1A]/60 hover:text-[#1A1A1A] flex items-center gap-1 font-normal"
                      >
                        All Regions <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {indianRegions.map((cont) => {
                        const matching = DESTINATIONS.filter((d) => d.continent === cont);
                        return (
                          <div key={cont} className="space-y-1.5">
                            <span className="text-xs font-semibold tracking-wider text-[#1A1A1A] block">
                              {cont}
                            </span>
                            <ul className="space-y-1 text-xs text-[#1A1A1A]/70 font-normal">
                              {matching.map((dest) => (
                                <li key={dest.id}>
                                  <Link
                                    href={`/destinations/${dest.slug}`}
                                    className="hover:text-[#C5A880] transition-colors block py-0.5"
                                  >
                                    {dest.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Featured Spotlight in Mega Menu */}
                  <div className="col-span-1 bg-[#F5F2EB] p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-medium block mb-1">
                        Curator Spotlight
                      </span>
                      <h4 className="font-serif text-base text-[#1A1A1A] leading-snug">
                        Lake Pichola & Jawai Leopards
                      </h4>
                      <p className="text-[11px] text-[#1A1A1A]/70 font-light mt-2 line-clamp-3">
                        Private royal barge transfers, living palace suites, and granite wilderness safaris in Rajasthan.
                      </p>
                    </div>
                    <Link
                      href="/destinations/rajasthan"
                      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] hover:text-[#C5A880] mt-4"
                    >
                      Discover Rajasthan <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Trip Types Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("styles")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/itineraries"
                className={`flex items-center gap-1 py-2 transition-colors ${
                  isScrolled ? "text-[#1A1A1A] hover:text-[#C5A880]" : "text-white hover:text-[#DFCDAE]"
                }`}
              >
                Trip Types <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {activeDropdown === "styles" && (
                <div className="absolute top-full -left-10 w-72 bg-[#FDFBF7] text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-2xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block px-2 pb-1 border-b border-[#1A1A1A]/10">
                    Bespoke Styles
                  </span>
                  {[
                    { label: "Off-the-Grid Expeditions", desc: "Untouched wilderness & fly-ins" },
                    { label: "Honeymoons & Romance", desc: "Private islands & cliffside villas" },
                    { label: "Private Safari & Wildlife", desc: "Exclusive game reserves" },
                    { label: "Sanctuary & Wellness", desc: "Zen monasteries & alpine baths" },
                    { label: "Family & Multi-Gen", desc: "Seamless private compounds" },
                  ].map((style) => (
                    <Link
                      key={style.label}
                      href={`/itineraries?style=${encodeURIComponent(style.label)}`}
                      className="block p-2 hover:bg-[#F5F2EB] transition-colors rounded-none group"
                    >
                      <span className="text-xs font-serif font-medium text-[#1A1A1A] group-hover:text-[#C5A880] block">
                        {style.label}
                      </span>
                      <span className="text-[11px] text-[#1A1A1A]/50 font-sans font-light">
                        {style.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`py-2 transition-colors ${
                isScrolled ? "text-[#1A1A1A] hover:text-[#C5A880]" : "text-white hover:text-[#DFCDAE]"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/journal"
              className={`py-2 transition-colors ${
                isScrolled ? "text-[#1A1A1A] hover:text-[#C5A880]" : "text-white hover:text-[#DFCDAE]"
              }`}
            >
              Journal
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Popover Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center gap-2 text-xs uppercase tracking-wider px-3 py-2 rounded-full border transition-all ${
                isScrolled
                  ? "border-[#1A1A1A]/15 text-[#1A1A1A]/80 hover:border-[#1A1A1A] hover:text-[#1A1A1A] bg-white/50"
                  : "border-white/25 text-white/90 hover:border-white hover:text-white bg-black/20"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>

            {/* Primary Enquire CTA */}
            <Link
              href="/enquire"
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 bg-[#C5A880] hover:bg-[#9E7E50] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full ${
                isScrolled ? "text-[#1A1A1A] hover:bg-[#F5F2EB]" : "text-white hover:bg-white/10"
              }`}
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-full ${
                isScrolled ? "text-[#1A1A1A] hover:bg-[#F5F2EB]" : "text-white hover:bg-white/10"
              }`}
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FDFBF7] text-[#1A1A1A] flex flex-col justify-between p-6 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} aria-label="Soulsventure Home">
              <SoulsventureLogo isScrolled={true} size="sm" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[#1A1A1A]/20 hover:border-[#1A1A1A]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 py-8 overflow-y-auto space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Destinations
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm font-serif">
                {DESTINATIONS.map((d) => (
                  <Link
                    key={d.id}
                    href={`/destinations/${d.slug}`}
                    className="p-2 bg-[#F5F2EB] hover:bg-[#EAE5D9] transition-colors"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Explore More
              </span>
              <ul className="space-y-3 text-lg font-serif">
                <li>
                  <Link href="/itineraries" className="hover:text-[#C5A880] transition-colors block">
                    Curated Itineraries
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#C5A880] transition-colors block">
                    About Soulsventure & Specialists
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="hover:text-[#C5A880] transition-colors block">
                    The Journal & Dispatches
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A]/10 pt-4 space-y-3">
            <Link
              href="/enquire"
              className="w-full block text-center py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] transition-colors"
            >
              Start Bespoke Planning
            </Link>
            <div className="flex justify-between items-center text-[11px] text-[#1A1A1A]/60 pt-2">
              <span>Dehradun, Uttarakhand</span>
              <span>+91 8126357353</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Popover / Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
