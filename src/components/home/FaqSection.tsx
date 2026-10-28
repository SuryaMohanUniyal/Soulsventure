"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { FAQS } from "@/data/mockData";

export default function FaqSection() {
  // Allow independent toggling across columns
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const midPoint = Math.ceil(FAQS.length / 2);
  const leftFaqs = FAQS.slice(0, midPoint);
  const rightFaqs = FAQS.slice(midPoint);

  const renderFaqCard = (faq: (typeof FAQS)[0], idx: number) => {
    const isOpen = openIndices.includes(idx);
    return (
      <div
        key={idx}
        className="bg-white border border-[#1A1A1A]/10 transition-all duration-300 shadow-xs hover:border-[#C5A880]/50"
      >
        <button
          onClick={() => toggle(idx)}
          className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 hover:bg-[#F5F2EB]/40 transition-colors cursor-pointer"
          aria-expanded={isOpen}
        >
          <div className="space-y-1.5 pr-2">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
              {faq.category}
            </span>
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#1A1A1A] leading-snug">
              {faq.question}
            </h3>
          </div>
          <div className="p-1.5 rounded-full border border-[#1A1A1A]/10 text-[#1A1A1A]/60 flex-shrink-0 group-hover:border-[#C5A880]">
            {isOpen ? <ChevronUp className="w-4 h-4 text-[#C5A880]" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isOpen && (
          <div className="px-6 sm:px-7 pb-6 pt-1 text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed border-t border-[#1A1A1A]/5 animate-in fade-in duration-200">
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FDFBF7] text-[#1A1A1A] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Frequently Asked Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
            Curating Bespoke Luxury with Complete Clarity.
          </h2>
          <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light">
            Everything you need to know about our private client methodology, dietary curations, visa concierges, and private aviation logistics.
          </p>
        </div>

        {/* Two Equal Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1 (First Half) */}
          <div className="space-y-5">
            {leftFaqs.map((faq, index) => renderFaqCard(faq, index))}
          </div>

          {/* Column 2 (Second Half) */}
          <div className="space-y-5">
            {rightFaqs.map((faq, index) => renderFaqCard(faq, midPoint + index))}
          </div>
        </div>

        {/* Bottom Concierge Assistance Prompt */}
        <div className="mt-16 text-center bg-[#F5F2EB] border border-[#1A1A1A]/10 p-8 sm:p-10 max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
            <MessageCircle className="w-4 h-4 text-[#C5A880]" /> Still Have An Inquiry?
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
            Speak Directly With Our Senior Curators
          </h3>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light max-w-lg mx-auto">
            Our private client desk in Dehradun, Uttarakhand (+91 8126357353 / +91 9319843524) is available for confidential consultations regarding private aviation charters, complex multi-state palace itineraries, and customized royal dietary arrangements.
          </p>
          <div className="pt-2">
            <Link
              href="/enquire"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md"
            >
              <span>Schedule a Private Conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* JSON-LD Structured Data Schema for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
