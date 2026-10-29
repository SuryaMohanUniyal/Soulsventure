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
  Calendar,
  Hotel,
  Plane,
  Car,
  Utensils,
  FileText,
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
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-xs uppercase tracking-[0.18em] font-medium">
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
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
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
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 bg-[#C5A880] hover:bg-[#9E7E50] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
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
              {/* Private Member Portal Hero Box */}
              <div className="p-5 bg-gradient-to-br from-[#181818] via-[#1E1E1E] to-[#141414] rounded-2xl border border-[#333333] text-[#FDFBF7] space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#C5A880]/20 text-[#DFCDAE] border border-[#C5A880]/40">
                    <Sparkles className="w-3 h-3 text-[#C5A880]" />
                    Private Member Suite
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24/7 Concierge
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
                    Client Portal Access
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                    Apne confirmed itineraries, luxury palace vouchers, assigned vehicle aur direct concierge ko access karne ke liye Sign In ya Register karein:
                  </p>
                </div>

                {/* Action Buttons: Log In & Register */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <Link
                    href="/client/login"
                    onClick={() => setMenuDrawerOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md text-center cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Log In</span>
                  </Link>

                  <Link
                    href="/client/register"
                    onClick={() => setMenuDrawerOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-wider font-semibold transition-all text-center cursor-pointer"
                  >
                    <span>Register</span>
                  </Link>
                </div>

                {/* What Unlocks in Your Portal */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
                    Portal Me Login Karne Se Kya Milega:
                  </span>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5 text-[#D4D4D8]">
                      <Calendar className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium block">Bespoke Day-by-Day Itineraries</strong>
                        <span className="text-[11px] text-[#A1A1AA]">
                          Pura day-wise sightseeing schedule, private escort guides & mountain briefings.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-[#D4D4D8]">
                      <Hotel className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium block">5-Star Palace Vouchers & Confirmations</strong>
                        <span className="text-[11px] text-[#A1A1AA]">
                          The Oberoi Udaivilas, Taj Lake Palace & SUJÁN Jawai ke official vouchers bina WhatsApp PDF jhanjhat ke.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-[#D4D4D8]">
                      <Plane className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium block">Private Charter & Flight Passes</strong>
                        <span className="text-[11px] text-[#A1A1AA]">
                          Tarmac clearances, Pilatus PC-12 passes & mountain chopper flight documents.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-[#D4D4D8]">
                      <Car className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium block">Dedicated Fleet & Royal Chauffeur</strong>
                        <span className="text-[11px] text-[#A1A1AA]">
                          Assigned Mercedes-Maybach / Land Rover Defender 4WD details aur chauffeur line.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-[#D4D4D8]">
                      <Utensils className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium block">Pre-Curated Menus & Dietary Nuances</strong>
                        <span className="text-[11px] text-[#A1A1AA]">
                          Pure Veg, Jain & bespoke food preferences jo direct executive chefs ko brief hoti hain.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-[#D4D4D8]">
                      <FileText className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium block">Digital Document Vault & Tax Invoices</strong>
                        <span className="text-[11px] text-[#A1A1AA]">
                          Official 5% tourism GST pro-forma invoices & military inner-line permits ek encrypted vault me.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destinations Explorer Links */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  Explore Destinations
                </span>
                <div className="grid grid-cols-2 gap-2 text-sm font-serif">
                  {DESTINATIONS.map((d) => (
                    <Link
                      key={d.id}
                      href={`/destinations/${d.slug}`}
                      onClick={() => setMenuDrawerOpen(false)}
                      className="p-2.5 bg-[#F5F2EB] hover:bg-[#EAE5D9] transition-colors rounded-lg flex items-center justify-between text-xs font-serif text-[#1A1A1A]"
                    >
                      <span>{d.name}</span>
                      <ArrowRight className="w-3 h-3 text-[#C5A880]" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="space-y-2 pt-2 border-t border-[#1A1A1A]/10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  Quick Navigation
                </span>
                <ul className="space-y-2 text-sm font-serif">
                  <li>
                    <Link
                      href="/itineraries"
                      onClick={() => setMenuDrawerOpen(false)}
                      className="hover:text-[#C5A880] transition-colors block py-1"
                    >
                      Curated Itineraries & Trip Types
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      onClick={() => setMenuDrawerOpen(false)}
                      className="hover:text-[#C5A880] transition-colors block py-1"
                    >
                      About Soulsventure & Specialists
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/journal"
                      onClick={() => setMenuDrawerOpen(false)}
                      className="hover:text-[#C5A880] transition-colors block py-1"
                    >
                      The Journal & Dispatches
                    </Link>
                  </li>
                </ul>
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
