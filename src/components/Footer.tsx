"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles, Phone, MapPin } from "lucide-react";
import { DESTINATIONS } from "@/data/mockData";
import SoulsventureLogo from "@/components/SoulsventureLogo";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Completely hide public website footer on Admin OS portal and private client portals
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/moodboard") ||
    pathname?.startsWith("/scrapbook")
  ) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 800);
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FDFBF7] pt-20 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Newsletter Editorial Banner */}
        <div className="bg-[#242424] border border-white/10 p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> The Soulsventure Dispatch
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                Curated travel essays, secret hideaway reveals, and private flight dispatches.
              </h3>
              <p className="text-white/60 text-xs sm:text-sm font-light max-w-xl">
                Delivered twice monthly to discerning travelers. No generic packages—only profound destinations and privileged curator insights from India and beyond.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 bg-white/5 border border-[#C5A880]/40 text-[#DFCDAE] text-sm animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                  <span>Welcome to The Soulsventure Dispatch. Check your inbox for our latest private monograph.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] tracking-wide"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Joining..." : "Subscribe"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] text-white/40 block">
                    By subscribing you agree to our privacy charter. Unsubscribe anytime.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Philosophy */}
          <div className="col-span-2 space-y-4">
            <Link href="/" aria-label="Soulsventure Home" className="inline-block">
              <SoulsventureLogo variant="horizontal" isScrolled={false} size="md" />
            </Link>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              India&apos;s premier bespoke luxury travel studio. We operate in the quiet realm where exceptional architecture, untouched wilderness, and rare human access intersect.
            </p>
            <div className="space-y-1.5 text-xs text-white/70 pt-2 font-light">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> Dehradun, Uttarakhand, India
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" /> Contact: +91 8126357353
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" /> Contact: +91 9319843524
              </p>
            </div>
          </div>

          {/* Destinations Directory */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
              Flagship Regions
            </span>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              {DESTINATIONS.map((d) => (
                <li key={d.id}>
                  <Link href={`/destinations/${d.slug}`} className="hover:text-white transition-colors">
                    {d.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/destinations" className="text-[#C5A880] hover:underline pt-1 block">
                  Browse All 40+ Destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Styles */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
              Trip Architectures
            </span>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li>
                <Link href="/itineraries?style=Off-the-Grid" className="hover:text-white transition-colors">
                  Off-the-Grid Expeditions
                </Link>
              </li>
              <li>
                <Link href="/itineraries?style=Safari" className="hover:text-white transition-colors">
                  Private Conservation Safari
                </Link>
              </li>
              <li>
                <Link href="/itineraries?style=Romance" className="hover:text-white transition-colors">
                  Honeymoon Hideaways
                </Link>
              </li>
              <li>
                <Link href="/itineraries?style=Sanctuary" className="hover:text-white transition-colors">
                  Sanctuary & Alpine Wellness
                </Link>
              </li>
              <li>
                <Link href="/itineraries?style=Family" className="hover:text-white transition-colors">
                  Multi-Generational Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* House of Soulsventure */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
              The House
            </span>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story & Indian Roots
                </Link>
              </li>
              <li>
                <Link href="/about#specialists" className="hover:text-white transition-colors">
                  Meet the Curators
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Editorial Journal
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-white transition-colors text-[#DFCDAE]">
                  Bespoke Trip Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-light">
          <p>© {new Date().getFullYear()} Soulsventure Bespoke Journeys Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-white/70 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white/70 cursor-pointer">Terms of Curation</span>
            <span className="hover:text-white/70 cursor-pointer">Sustainability Metrics</span>
            <span className="hover:text-white/70 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
