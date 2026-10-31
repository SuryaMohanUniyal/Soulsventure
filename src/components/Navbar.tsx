"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  User,
  Building2,
} from "lucide-react";
import SearchModal from "./SearchModal";
import { DESTINATIONS } from "@/data/mockData";
import SoulsventureLogo from "@/components/SoulsventureLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
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
    setMenuDrawerOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const indianRegions: ("Rajasthan" | "Himalayas" | "Central India" | "South India" | "Islands")[] = [
    "Rajasthan",
    "Himalayas",
    "Central India",
    "South India",
    "Islands",
  ];

  // Completely hide public website header on Admin OS portal, private client portals and vendor portals
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/moodboard") ||
    pathname?.startsWith("/scrapbook") ||
    pathname?.startsWith("/client") ||
    pathname?.startsWith("/vendor")
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
          <Link href="/" aria-label="Soulsventure Home" className="flex-shrink-0">
            <SoulsventureLogo isScrolled={isScrolled} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-7 lg:text-[11px] xl:text-xs uppercase tracking-[0.13em] xl:tracking-[0.16em] font-medium whitespace-nowrap">
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
                <span className="whitespace-nowrap">Destinations</span> <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {/* Mega Menu Dropdown */}
              {activeDropdown === "destinations" && (
                <div className="absolute top-full -left-16 w-[700px] xl:w-[760px] max-w-[calc(100vw-2rem)] bg-[#FDFBF7] text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-2xl p-6 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 whitespace-normal">
                  <div className="col-span-7 space-y-4">
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
                                    className="hover:text-[#C5A880] transition-colors block py-1 text-xs leading-snug whitespace-normal break-words"
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
                  <div className="col-span-5 bg-[#F5F2EB] p-5 flex flex-col justify-between border border-[#1A1A1A]/5 rounded-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-1.5">
                        Curator Spotlight
                      </span>
                      <h4 className="font-serif text-base text-[#1A1A1A] leading-snug whitespace-normal break-words font-medium">
                        Lake Pichola & Jawai Leopards
                      </h4>
                      <p className="text-[11px] text-[#1A1A1A]/75 font-light mt-2.5 line-clamp-3 whitespace-normal leading-relaxed">
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
                <span className="whitespace-nowrap">Trip Types</span> <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {activeDropdown === "styles" && (
                <div className="absolute top-full -left-10 w-80 bg-[#FDFBF7] text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-2xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 whitespace-normal">
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
                      <span className="text-[11px] text-[#1A1A1A]/60 font-sans font-light block whitespace-normal leading-snug">
                        {style.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`py-2 whitespace-nowrap transition-colors ${
                isScrolled ? "text-[#1A1A1A] hover:text-[#C5A880]" : "text-white hover:text-[#DFCDAE]"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/journal"
              className={`py-2 whitespace-nowrap transition-colors ${
                isScrolled ? "text-[#1A1A1A] hover:text-[#C5A880]" : "text-white hover:text-[#DFCDAE]"
              }`}
            >
              Journal
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0 whitespace-nowrap">
            {/* Search Popover Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center gap-2 text-xs uppercase tracking-wider px-3.5 py-2 rounded-full border transition-all cursor-pointer ${
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
              className="px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-[11px] xl:text-xs uppercase tracking-[0.15em] xl:tracking-[0.18em] font-semibold whitespace-nowrap transition-all duration-300 bg-[#C5A880] hover:bg-[#9E7E50] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Enquire Now
            </Link>

            {/* Corner Hamburger Menu Button (Opens Member Portal Drawer & Full Navigation) */}
            <button
              onClick={() => setMenuDrawerOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all cursor-pointer ${
                isScrolled
                  ? "border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#F5F2EB]"
                  : "border-white/30 text-white hover:border-white hover:bg-white/10"
              }`}
              title="Open Member Portal & Menu"
              aria-label="Open Member Portal and Menu"
            >
              <Menu className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.16em] font-medium hidden xl:inline">
                Menu
              </span>
            </button>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              href="/enquire"
              className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-[#C5A880] hover:bg-[#9E7E50] text-white shadow-sm transition-colors whitespace-nowrap"
            >
              Enquire
            </Link>

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
              onClick={() => setMenuDrawerOpen(true)}
              className={`p-2 rounded-full ${
                isScrolled ? "text-[#1A1A1A] hover:bg-[#F5F2EB]" : "text-white hover:bg-white/10"
              }`}
              aria-label="Open menu and member portal"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Luxury Drawer (Desktop & Mobile) */}
      {menuDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Dark Backdrop */}
          <div
            onClick={() => setMenuDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md sm:max-w-lg bg-[#FDFBF7] text-[#1A1A1A] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 z-10 border-l border-[#1A1A1A]/10">
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#1A1A1A]/10 bg-white/60 backdrop-blur-sm">
              <Link href="/" onClick={() => setMenuDrawerOpen(false)} aria-label="Soulsventure Home">
                <SoulsventureLogo isScrolled={true} size="sm" />
              </Link>
              <button
                onClick={() => setMenuDrawerOpen(false)}
                className="p-2 rounded-full border border-[#1A1A1A]/15 hover:border-[#1A1A1A] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 scrollbar-thin">
              {/* 1. Main Navigation Menu (First) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                    Menu & Experiences
                  </span>
                  <span className="text-[10px] font-mono text-[#888888] uppercase">
                    SoulsVenture
                  </span>
                </div>

                <nav className="space-y-1 text-sm font-serif">
                  <Link
                    href="/destinations"
                    onClick={() => setMenuDrawerOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F2EB] text-[#1A1A1A] hover:text-[#C5A880] transition-colors group"
                  >
                    <span className="font-medium text-base">Destinations</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/itineraries"
                    onClick={() => setMenuDrawerOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F2EB] text-[#1A1A1A] hover:text-[#C5A880] transition-colors group"
                  >
                    <span className="font-medium text-base">Curated Itineraries & Trip Types</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setMenuDrawerOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F2EB] text-[#1A1A1A] hover:text-[#C5A880] transition-colors group"
                  >
                    <span className="font-medium text-base">About SoulsVenture</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/journal"
                    onClick={() => setMenuDrawerOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F2EB] text-[#1A1A1A] hover:text-[#C5A880] transition-colors group"
                  >
                    <span className="font-medium text-base">The Journal & Dispatches</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </nav>

                {/* Popular Destinations Mini-Grid */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-mono block mb-2">
                    Popular Destinations
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-serif">
                    {DESTINATIONS.slice(0, 6).map((d) => (
                      <Link
                        key={d.id}
                        href={`/destinations/${d.slug}`}
                        onClick={() => setMenuDrawerOpen(false)}
                        className="p-2 bg-[#F5F2EB] hover:bg-[#EAE5D9] transition-colors rounded-lg flex items-center justify-between text-[#1A1A1A]"
                      >
                        <span className="truncate">{d.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#C5A880] flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Portal Access Section (Second: Client Login First, Vendor Login Second) */}
              <div className="pt-4 border-t border-[#1A1A1A]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                    Portal Access
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live 24/7
                  </span>
                </div>

                {/* First: Client Login */}
                <div className="p-4 bg-gradient-to-br from-[#181818] via-[#1E1E1E] to-[#141414] rounded-2xl border border-[#333333] text-[#FDFBF7] space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#C5A880]/20 text-[#DFCDAE] flex items-center justify-center border border-[#C5A880]/30">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-medium text-white">
                          Client Login
                        </h4>
                        <span className="text-[10px] text-[#A1A1AA] block">
                          Private Member Suite
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#C5A880]/15 text-[#DFCDAE] border border-[#C5A880]/30">
                      Guest
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                    View your confirmed day-by-day itinerary, hotel vouchers, and driver details.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href="/client/login"
                      onClick={() => setMenuDrawerOpen(false)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md text-center cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Client Sign In</span>
                    </Link>

                    <Link
                      href="/client/register"
                      onClick={() => setMenuDrawerOpen(false)}
                      className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-wider font-semibold transition-all text-center cursor-pointer"
                    >
                      <span>Register</span>
                    </Link>
                  </div>
                </div>

                {/* Second: Vendor Login */}
                <div className="p-4 bg-gradient-to-br from-[#181818] via-[#1E1E1E] to-[#141414] rounded-2xl border border-[#333333] text-[#FDFBF7] space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#C5A880]/20 text-[#DFCDAE] flex items-center justify-center border border-[#C5A880]/30">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-medium text-white">
                          Vendor Login
                        </h4>
                        <span className="text-[10px] text-[#A1A1AA] block">
                          B2B Partner Network
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                      Partners
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                    Partner portal for assigned hotels, private chauffeurs, tour guides, and activity operators.
                  </p>

                  <div className="pt-1">
                    <Link
                      href="/vendor/login"
                      onClick={() => setMenuDrawerOpen(false)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#C5A880]/40 text-[#DFCDAE] hover:text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md text-center cursor-pointer"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Vendor Sign In</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Footer */}
            <div className="p-5 sm:p-6 border-t border-[#1A1A1A]/10 bg-white/60 space-y-3">
              <Link
                href="/enquire"
                onClick={() => setMenuDrawerOpen(false)}
                className="w-full block text-center py-3.5 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-full shadow-md"
              >
                Enquire Now & Begin Planning
              </Link>
              <div className="flex justify-between items-center text-[11px] text-[#1A1A1A]/60 pt-1">
                <span>Dehradun, Uttarakhand</span>
                <span>concierge@soulsventure.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Popover / Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
