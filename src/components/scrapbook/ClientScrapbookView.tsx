"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  INITIAL_SCRAPBOOKS,
  PostTripScrapbook,
  getStoredScrapbooks,
} from "@/lib/crmStore";
import {
  Sparkles,
  Camera,
  Star,
  CheckCircle2,
  Send,
  Heart,
  Share2,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";
import { CreativeSoulMark } from "@/components/SoulsventureLogo";

export function ClientScrapbookView({ initialRef }: { initialRef: string }) {
  const refCode = initialRef.toUpperCase();

  const fallbackScrapbook: PostTripScrapbook = {
    id: "sb-preview",
    leadReference: refCode || "SV-VIP-PREVIEW",
    clientName: "Valued Private Client",
    itineraryTitle: "Bespoke Journey Across India",
    travelDates: "Season 2026-27",
    curatorFarewell: "Hosting you across India was an honour for our entire team. We hope these captured moments remain etched in your memories forever.",
    memories: [
      {
        id: "sbm-preview-1",
        caption: "Sunset Solitude in Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        date: "October 2026",
        location: "Rajasthan",
        curatorMemory: "The golden hour reflection across the lakes was unforgettable.",
      },
    ],
  };

  const [scrapbook, setScrapbook] = useState<PostTripScrapbook>(fallbackScrapbook);

  useEffect(() => {
    const list = getStoredScrapbooks();
    const match = list.find((s) => s.leadReference.toLowerCase() === refCode.toLowerCase());
    if (match) {
      setScrapbook(match);
    } else {
      const initMatch = INITIAL_SCRAPBOOKS.find((s) => s.leadReference.toLowerCase() === refCode.toLowerCase());
      if (initMatch) setScrapbook(initMatch);
    }
  }, [refCode]);

  const [overallRating, setOverallRating] = useState(5);
  const [hotelRating, setHotelRating] = useState(5);
  const [conciergeRating, setConciergeRating] = useState(5);
  const [testimonial, setTestimonial] = useState(
    scrapbook.feedback?.testimonialQuote || ""
  );
  const [isSubmitted, setIsSubmitted] = useState(!!scrapbook.feedback);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
              Post-Journey Digital Keepsake
            </span>
          </div>
        </Link>

        <span className="text-xs text-[#888888] font-mono">
          Journey Dossier: <strong className="text-[#C5A059]">{scrapbook.leadReference}</strong>
        </span>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-widest bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
            <Camera className="w-3.5 h-3.5" />
            Welcome Home Keepsake
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] tracking-tight">
            Memories of {scrapbook.clientName}
          </h1>

          <p className="text-sm font-serif italic text-[#C5A059]">
            {scrapbook.itineraryTitle} • {scrapbook.travelDates}
          </p>
        </div>

        {/* Curator Farewell Message */}
        <div className="p-8 bg-[#141414] border border-[#262626] rounded-2xl space-y-4 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
            A Note from the Founders
          </span>
          <p className="text-sm sm:text-base font-serif text-[#E0E0E0] leading-relaxed italic">
            “{scrapbook.curatorFarewell}”
          </p>
          <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-xs text-[#888888] font-serif">
            <span>SoulsVenture Concierge & On-Ground Naturalists</span>
            <span className="font-mono text-[#C5A059]">Suraj Uniyal & Harsh Sood</span>
          </div>
        </div>

        {/* Captured Memories Gallery */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <h2 className="text-2xl font-serif text-[#FDFBF7]">
              Moments from Your Private Expedition
            </h2>
            <span className="text-xs font-mono text-[#888888]">
              Complimentary Keepsake Photos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scrapbook.memories.map((mem) => (
              <div
                key={mem.id}
                className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden group space-y-4 shadow-xl"
              >
                <div className="h-64 w-full overflow-hidden bg-neutral-900 relative">
                  <img
                    src={mem.imageUrl}
                    alt={mem.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded text-[10px] font-mono bg-black/80 backdrop-blur-sm text-[#FDFBF7] border border-white/10 flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    <span>{mem.date}</span>
                    <span>•</span>
                    <span className="text-[#C5A059]">{mem.location}</span>
                  </div>
                </div>

                <div className="p-6 pt-1 space-y-2">
                  <h3 className="text-xl font-serif text-[#FDFBF7]">
                    {mem.caption}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed font-serif italic">
                    “{mem.curatorMemory}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frictionless Review & Feedback Collector */}
        <div className="bg-[#141414] border border-[#C5A059]/40 rounded-2xl p-8 space-y-6 shadow-2xl">
          <div className="border-b border-[#262626] pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
              Guest Feedback & Legacy Reflections
            </span>
            <h3 className="text-2xl font-serif text-[#FDFBF7] mt-1">
              How was your SoulsVenture experience?
            </h3>
            <p className="text-xs text-[#888888] mt-1">
              Your confidential reflections help us continuously refine India's most extraordinary bespoke journeys.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif text-[#FDFBF7]">
                Thank you for your gracious reflections!
              </h4>
              <p className="text-xs text-[#C0C0C0] max-w-md mx-auto">
                Suraj Uniyal & Harsh Sood personally read every review. If you have a spare moment, would you mind sharing your words on our Google Business profile?
              </p>

              <div className="pt-2">
                <a
                  href="https://g.page/r/soulsventure-reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#b08e48] text-black font-serif text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-lg"
                >
                  <Star className="w-4 h-4 fill-black text-black" />
                  Post to Google Reviews (1 Click)
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              {/* Star Rating Grids */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] space-y-2">
                  <label className="text-xs font-serif text-[#FDFBF7] block">
                    Overall Journey Experience
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setOverallRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= overallRating
                              ? "fill-[#C5A059] text-[#C5A059]"
                              : "text-[#444444]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] space-y-2">
                  <label className="text-xs font-serif text-[#FDFBF7] block">
                    Palace Hotels & Stays
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setHotelRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= hotelRating
                              ? "fill-[#C5A059] text-[#C5A059]"
                              : "text-[#444444]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] space-y-2">
                  <label className="text-xs font-serif text-[#FDFBF7] block">
                    Private Concierge Attention
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setConciergeRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= conciergeRating
                              ? "fill-[#C5A059] text-[#C5A059]"
                              : "text-[#444444]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-serif text-[#FDFBF7] block">
                  Your Personal Reflections / Testimonial:
                </label>
                <textarea
                  rows={4}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Share your favorite memory, the naturalist's guidance, or the atmosphere of your palace suite..."
                  className="w-full bg-[#111111] border border-[#333333] rounded-xl p-4 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08e48] text-black font-serif font-medium uppercase tracking-wider text-xs rounded-xl transition-colors shadow-lg"
                >
                  Submit Reflections to Founders
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
