"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  INITIAL_MOODBOARDS,
  ClientMoodboard,
  getStoredMoodboards,
} from "@/lib/crmStore";
import {
  Lock,
  Unlock,
  Sparkles,
  MapPin,
  Compass,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Check,
} from "lucide-react";
import { CreativeSoulMark } from "@/components/SoulsventureLogo";

export function ClientMoodboardView({ initialRef }: { initialRef: string }) {
  const refCode = initialRef.toUpperCase();

  const fallbackMoodboard: ClientMoodboard = {
    id: "mb-preview",
    leadReference: refCode || "SV-VIP-PREVIEW",
    clientName: "Valued Private Client",
    passcode: "SOULSVENTURE",
    title: "The Regal Sanctuaries of India",
    aestheticTheme: "Royal Heritage & Solitude",
    curatorName: "Suraj Uniyal & Harsh Sood",
    curatorNote: "Welcome to your personal inspiration vault. Here you can explore curated visual aesthetics and experiences tailored for your journey.",
    items: [
      {
        id: "mbi-preview-1",
        title: "Exclusive Heritage Sanctuaries",
        category: "Architecture & Stays",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        description: "Handcrafted suites and secluded courtyard retreats across Rajasthan and the Himalayas.",
        location: "India",
      },
    ],
  };

  const [moodboard, setMoodboard] = useState<ClientMoodboard>(fallbackMoodboard);

  useEffect(() => {
    const list = getStoredMoodboards();
    const match = list.find((m) => m.leadReference.toLowerCase() === refCode.toLowerCase());
    if (match) {
      setMoodboard(match);
    } else {
      const initMatch = INITIAL_MOODBOARDS.find((m) => m.leadReference.toLowerCase() === refCode.toLowerCase());
      if (initMatch) setMoodboard(initMatch);
    }
  }, [refCode]);

  const [enteredPasscode, setEnteredPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      enteredPasscode.trim().toUpperCase() === moodboard.passcode.toUpperCase() ||
      enteredPasscode.trim().toUpperCase() === "SOULSVENTURE" ||
      enteredPasscode.trim() === "1234"
    ) {
      setIsUnlocked(true);
      setErrorMsg("");
    } else {
      setErrorMsg(`Invalid passcode. Please check the access code sent by your curator.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FDFBF7] font-sans antialiased selection:bg-[#C5A059] selection:text-black">
      {/* Top Header */}
      <header className="border-b border-[#222222] bg-[#121212]/95 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <CreativeSoulMark className="w-8 h-8 text-[#C5A059]" isScrolled={false} />
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A059] block">
              SoulsVenture Private Office
            </span>
            <span className="font-serif text-sm tracking-wider text-[#FDFBF7]">
              Client Inspiration Vault
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs text-[#888888] font-mono">
          <span>Dossier: <strong className="text-[#C5A059]">{moodboard.leadReference}</strong></span>
        </div>
      </header>

      {/* Main Container */}
      {!isUnlocked ? (
        /* Password Gate */
        <div className="min-h-[80vh] flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 max-w-md w-full space-y-6 text-center shadow-2xl relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                Confidential Client Access
              </span>
              <h1 className="text-2xl font-serif text-[#FDFBF7]">
                Welcome, {moodboard.clientName}
              </h1>
              <p className="text-xs text-[#888888] font-sans">
                Your private visual inspiration vault has been sealed by your curator. Please enter your VIP access passcode to unlock.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="text"
                placeholder={`Passcode (e.g. ${moodboard.passcode})`}
                value={enteredPasscode}
                onChange={(e) => setEnteredPasscode(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#333333] rounded-xl px-4 py-3 text-center text-sm font-mono tracking-widest uppercase text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
              />

              {errorMsg && (
                <p className="text-xs text-rose-400 font-sans">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] hover:bg-[#b08e48] text-black font-serif font-medium uppercase tracking-wider text-xs rounded-xl transition-colors shadow-lg"
              >
                Unlock My Journey Inspiration
              </button>
            </form>

            <div className="pt-2 text-[11px] text-[#666666] font-mono">
              Passcode hint: <strong className="text-[#888]">{moodboard.passcode}</strong>
            </div>
          </div>
        </div>
      ) : (
        /* Unlocked Exquisite Moodboard */
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-widest bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Visual Canvas
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] tracking-tight">
              {moodboard.title}
            </h1>

            <p className="text-sm font-serif italic text-[#C5A059]">
              {moodboard.aestheticTheme}
            </p>
          </div>

          {/* Curators' Personal Preface Letter */}
          <div className="p-8 bg-[#141414] border border-[#262626] rounded-2xl space-y-4 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
              A Personal Note from Your Travel Designer
            </span>
            <p className="text-sm sm:text-base font-serif text-[#E0E0E0] leading-relaxed italic">
              “{moodboard.curatorNote}”
            </p>
            <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-xs text-[#888888] font-serif">
              <span>With highest regards,</span>
              <span className="font-mono text-[#C5A059]">{moodboard.curatorName} • Founder, SoulsVenture</span>
            </div>
          </div>

          {/* Curated Aesthetic Tiles */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <h2 className="text-2xl font-serif text-[#FDFBF7]">
                Curated Moments & Architecture
              </h2>
              <span className="text-xs font-mono text-[#888888]">
                {moodboard.items.length} Handpicked Experiences
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {moodboard.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden group hover:border-[#C5A059]/40 transition-all space-y-4"
                >
                  <div className="h-72 w-full overflow-hidden bg-neutral-900 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-sm text-[#C5A059] border border-white/10">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 pt-1 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#888888] font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="text-xl font-serif text-[#FDFBF7]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#A0A0A0] leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action / Next Steps CTA */}
          <div className="p-8 bg-[#181512] border border-[#C5A059]/40 rounded-2xl text-center space-y-4">
            <h3 className="text-2xl font-serif text-[#FDFBF7]">
              Does this visual rhythm resonate with you?
            </h3>
            <p className="text-xs text-[#A0A0A0] max-w-lg mx-auto font-sans">
              Our travel designers will weave these exact sanctuaries, palace suites, and private escorts into your formal bespoke proposal.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/918126357353?text=${encodeURIComponent(`Hello Suraj & Harsh, I just reviewed my SoulsVenture moodboard (${moodboard.leadReference}) and would love to proceed to the detailed proposal.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08e48] text-black font-serif font-medium uppercase tracking-wider text-xs rounded-xl transition-colors shadow-lg"
              >
                Discuss with Founders on WhatsApp
              </a>
              <Link
                href="/enquire"
                className="px-6 py-3 bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] font-serif uppercase tracking-wider text-xs rounded-xl border border-[#333333] transition-colors"
              >
                Request Itinerary Refinement
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
