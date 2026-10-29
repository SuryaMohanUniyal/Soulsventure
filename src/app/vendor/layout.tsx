"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Phone,
  MessageCircle,
  LogOut,
  Hotel,
  Car,
  Compass,
  Plane,
  Sparkles,
} from "lucide-react";
import {
  PartnerTieUp,
  getVendorAuthSession,
  clearVendorAuthSession,
} from "@/lib/crmStore";

export default function VendorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [partner, setPartner] = useState<PartnerTieUp | null>(null);

  useEffect(() => {
    // Apply strict dark luxury background
    if (typeof document !== "undefined") {
      document.documentElement.style.backgroundColor = "#111111";
      document.body.style.backgroundColor = "#111111";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
    }

    const session = getVendorAuthSession();
    if (session) {
      setPartner(session);
    }
  }, []);

  const handleLogout = () => {
    clearVendorAuthSession();
    window.location.href = "/vendor/login";
  };

  const opsHotline = `https://wa.me/919820144521?text=${encodeURIComponent(
    `Hello Suraj & Harsh (SoulsVenture Ops). This is ${partner?.name || "a verified B2B vendor"}. I am reaching out regarding an active booking allocation.`
  )}`;

  return (
    <div className="min-h-dvh bg-[#111111] text-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/30 selection:text-[#FDFBF7]">
      {/* Luxury B2B Vendor Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#161616]/95 backdrop-blur-md border-b border-[#262626] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Vendor Role */}
        <Link href="/vendor/portal" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C5A059] to-[#997A3A] flex items-center justify-center text-black font-serif font-bold text-base shadow-sm shadow-[#C5A059]/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm tracking-wider text-[#FDFBF7] font-semibold">
                SoulsVenture
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                B2B Partner Portal
              </span>
            </div>
            <span className="text-[10px] text-[#888888] font-mono">
              Bespoke Concierge & Dispatch OS
            </span>
          </div>
        </Link>

        {/* Right Action Strip */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          {partner ? (
            <div className="flex items-center gap-3">
              {/* Role Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333333]">
                {partner.role === "hotel" && <Hotel className="w-3.5 h-3.5 text-[#C5A059]" />}
                {partner.role === "driver" && <Car className="w-3.5 h-3.5 text-sky-400" />}
                {partner.role === "guide" && <Compass className="w-3.5 h-3.5 text-emerald-400" />}
                {partner.role === "activity" && <Plane className="w-3.5 h-3.5 text-purple-400" />}
                <span className="font-serif text-[#FDFBF7] font-medium text-xs">
                  {partner.name}
                </span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-black/50 text-[#C5A059]">
                  {partner.role}
                </span>
              </div>

              {/* 24/7 Operations Hotline */}
              <a
                href={opsHotline}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/40 text-emerald-300 font-mono text-[11px] transition-colors"
                title="Direct Concierge Hotline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>24/7 Ops Hotline</span>
              </a>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#333333] transition-colors cursor-pointer text-xs"
                title="Log Out of Vendor Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a
                href="/admin"
                className="text-xs text-[#888888] hover:text-[#C5A059] transition-colors font-mono"
              >
                Admin OS
              </a>
              <span className="text-[#333]">•</span>
              <Link
                href="/vendor/login"
                className="px-3.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs font-serif transition-colors"
              >
                Partner Login
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#222222] bg-[#141414] py-6 px-4 text-center text-xs text-[#666666]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-2 text-[#888888]">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>SoulsVenture Private Concierge Partner Network • Encrypted B2B Channel</span>
          </div>
          <div className="flex items-center gap-4 text-[#777]">
            <a href="tel:+919820144521" className="hover:text-[#C5A059] transition-colors">
              Concierge Ops: +91 98201 44521
            </a>
            <Link href="/" className="hover:text-[#C5A059] transition-colors">
              Main Agency Website
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
