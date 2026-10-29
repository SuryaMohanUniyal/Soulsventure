"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Compass, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Consultation & Discovery",
    tagline: "A friendly conversation about your travel dates, interests, and favourite destinations.",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Every journey starts with a friendly conversation with our travel team. We listen carefully to what you love—whether that is staying in royal palaces, discovering wildlife, or enjoying quiet moments with family.",
    details: [
      "Paired with a specialist who has personally lived in or explored your target region",
      "Analysis of party dynamics: multi-gen preferences, culinary restrictions, and physical rhythms",
      "Confidentiality guaranteed through our private client charter",
    ],
    curatorQuote: "We don't sell ready-made packages. We design a trip that fits your family's personal rhythm and preferences.",
    quoteAuthor: "Harsh Sood, Co-Founder & Head of Curation",
  },
  {
    step: "02",
    title: "Custom Planning & Handpicked Stays",
    tagline: "Every day, luxury stay, private ride, and dining experience planned carefully for you.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Within a few days, we create your custom day-by-day plan. We book the finest palace suites, private lake boats, and exclusive safari permits directly with our trusted partners.",
    details: [
      "Custom digital monograph itinerary with 3D route mapping and private palace suite layouts",
      "Direct coordination with domestic turboprop and helicopter charter operators to eliminate transit fatigue",
      "Unlimited itinerary revisions until the journey matches your vision to the millimeter",
    ],
    curatorQuote: "Our strength is our trusted relationships: palace hosts who welcome you warmly, and expert guides who know every hidden trail.",
    quoteAuthor: "Suraj Uniyal, Co-Founder & Operations Director",
  },
  {
    step: "03",
    title: "24/7 Personal Support Throughout Your Trip",
    tagline: "Enjoy complete peace of mind with private airport pickups and round-the-clock help.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    description:
      "From the moment you land, your private chauffeur and local host are ready to welcome you. Our team takes care of all timings, luggage, and road travel, so you can simply relax and enjoy your holiday.",
    details: [
      "Dedicated WhatsApp & direct concierge desk active 24/7 across India",
      "VIP Fast-Track airport clearances and luxury chauffeured tarmac transfers",
      "Complimentary medical evacuation coverage and full financial bonding",
    ],
    curatorQuote: "Great travel should feel completely effortless. You just enjoy the journey while we handle everything behind the scenes.",
    quoteAuthor: "Suraj Uniyal & Harsh Sood, Founders of Soulsventure",
  },
];

export default function BespokeProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section className="py-24 sm:py-32 bg-[#F5F2EB] text-[#1A1A1A] border-y border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> The Bespoke Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
            How We Plan Your Journey.
          </h2>
          <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light">
            From your first call to your safe return home, we take care of every single detail with complete care and attention.
          </p>
        </div>

        {/* 3-Step Interactive Timeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = idx === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-6 transition-all duration-300 border cursor-pointer ${
                  isCurrent
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg scale-[1.01]"
                    : "bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-serif text-2xl font-light ${
                      isCurrent ? "text-[#DFCDAE]" : "text-[#C5A880]"
                    }`}
                  >
                    {s.step}
                  </span>
                  <Icon
                    className={`w-5 h-5 ${
                      isCurrent ? "text-[#DFCDAE]" : "text-[#1A1A1A]/40"
                    }`}
                  />
                </div>
                <h3 className="font-serif text-lg font-medium mb-1">{s.title}</h3>
                <p
                  className={`text-xs line-clamp-2 font-light ${
                    isCurrent ? "text-white/70" : "text-[#1A1A1A]/60"
                  }`}
                >
                  {s.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card Spread */}
        <div className="bg-white border border-[#1A1A1A]/10 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Phase {current.step} In Depth
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                {current.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
              {current.description}
            </p>

            {/* Bullet Highlights */}
            <div className="space-y-3 pt-2">
              {current.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1A1A1A]/80 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Curator Pull Quote */}
            <blockquote className="p-4 bg-[#F5F2EB] border-l-2 border-[#C5A880] space-y-1 mt-4">
              <p className="font-serif italic text-sm text-[#1A1A1A]">
                &ldquo;{current.curatorQuote}&rdquo;
              </p>
              <cite className="text-[11px] uppercase tracking-wider text-[#1A1A1A]/50 not-italic block font-sans">
                — {current.quoteAuthor}
              </cite>
            </blockquote>

            <div className="pt-2">
              <Link
                href="/enquire"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-sm"
              >
                <span>Initiate Your Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Curator Imagery */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 w-full overflow-hidden border border-[#1A1A1A]/10">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#DFCDAE] block">
                Soulsventure Private Client Desk
              </span>
              <span className="font-serif text-sm">Direct human dialogue. Zero automation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
