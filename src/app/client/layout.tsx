"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Phone,
  MessageCircle,
  LogOut,
  User,
  Compass,
  FileText,
} from "lucide-react";
import {
  ClientAccount,
  getClientAuthSession,
  clearClientAuthSession,
} from "@/lib/crmStore";

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, setClient] = useState<ClientAccount | null>(null);

  useEffect(() => {
    // Apply strict luxury dark theme background
    if (typeof document !== "undefined") {
      document.documentElement.style.backgroundColor = "#111111";
      document.body.style.backgroundColor = "#111111";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
    }

    const session = getClientAuthSession();
    if (session) {
      setClient(session);
    }
  }, []);

  const handleLogout = () => {
    clearClientAuthSession();
    window.location.href = "/client/login";
  };

  const conciergeWhatsApp = `https://wa.me/919820144521?text=${encodeURIComponent(
    `Hello Suraj & Harsh, this is ${client?.name || "a SoulsVenture client"}. I am accessing my Private Client Portal and have a concierge inquiry.`
  )}`;

  return (
    <div className="min-h-dvh bg-[#111111] text-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/30 selection:text-[#FDFBF7]">
      {/* Luxury Client Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#161616]/95 backdrop-blur-md border-b border-[#262626] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <Link href="/client/portal" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C5A059] to-[#997A3A] flex items-center justify-center text-black font-serif font-bold text-base shadow-sm shadow-[#C5A059]/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wider font-semibold text-[#FDFBF7] group-hover:text-[#C5A059] transition-colors">
              SOULSVENTURE
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059]">
              Private Member Portal
            </span>
          </div>
        </Link>

        {/* Right Action Channels */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Direct 24/7 Concierge Hotline */}
          <a
            href={conciergeWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 text-xs font-semibold transition-all shadow"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>24/7 VIP Concierge Desk</span>
          </a>

          {/* User Profile / Status */}
          {client ? (
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-serif font-medium text-[#FDFBF7] block">
                  {client.name}
                </span>
                <span className="text-[10px] text-[#C5A059] font-mono block">
                  VIP Member • {client.activeTripRef}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Log Out of Member Portal"
                className="p-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#A1A1AA] hover:text-red-400 border border-[#333333] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/client/login"
              className="px-4 py-1.5 rounded-lg bg-[#C5A059] text-black text-xs font-semibold hover:bg-[#D4AF37] transition-colors"
            >
              Member Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Luxury Client Footer */}
      <footer className="border-t border-[#242424] bg-[#141414] py-6 px-4 sm:px-8 text-center text-xs text-[#71717A] space-y-1">
        <p className="font-serif text-[#C5A059]">
          SoulsVenture Bespoke Journeys • Private Client Portal
        </p>
        <p className="text-[11px]">
          Confidential White-Glove Hospitality Suite. All rights reserved © 2026–2027.
        </p>
      </footer>
    </div>
  );
}
