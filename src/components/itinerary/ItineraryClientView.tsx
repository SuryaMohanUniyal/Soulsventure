"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Compass,
  IndianRupee,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Utensils,
  Hotel,
  Sparkles,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Plane,
  Eye,
} from "lucide-react";
import { Itinerary } from "@/types";

interface ItineraryClientViewProps {
  itinerary: Itinerary;
}

export default function ItineraryClientView({ itinerary }: ItineraryClientViewProps) {
  // Manage which day accordions are open (default: Day 1 and 2 open)
  const [openDays, setOpenDays] = useState<number[]>([1, 2]);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);
  const [brochureSuccess, setBrochureSuccess] = useState(false);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => {
    setOpenDays(itinerary.days.map((d) => d.dayNumber));
  };

  const collapseAll = () => {
    setOpenDays([]);
  };

  const handleSimulateDownload = () => {
    setDownloadingBrochure(true);
    setTimeout(() => {
      setDownloadingBrochure(false);
      setBrochureSuccess(true);
    }, 1200);
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] min-h-[540px] w-full flex items-end overflow-hidden text-white">
        <Image
          src={itinerary.heroImage}
          alt={itinerary.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-16 w-full space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/destinations/${itinerary.destinationSlug}`}
              className="px-3 py-1 bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#DFCDAE] hover:text-white border border-white/20 transition-colors"
            >
              {itinerary.destinationName}
            </Link>
            <span className="px-3 py-1 bg-[#C5A880] text-white text-[10px] uppercase tracking-widest font-semibold">
              {itinerary.durationDays} Days / {itinerary.durationNights} Nights
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest">
              {itinerary.travelStyle}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white leading-tight max-w-4xl">
            {itinerary.title}
          </h1>

          <p className="text-white/80 font-light text-base sm:text-lg max-w-3xl leading-relaxed">
            {itinerary.tagline}
          </p>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <div className="relative z-20 -mt-8 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-white border border-[#1A1A1A]/10 shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1 border-r border-[#1A1A1A]/5 pr-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Duration
            </span>
            <p className="font-serif text-base font-medium text-[#1A1A1A]">
              {itinerary.durationDays} Days / {itinerary.durationNights} Nights
            </p>
          </div>

          <div className="space-y-1 border-r border-[#1A1A1A]/5 pr-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Pacing
            </span>
            <p className="font-serif text-base font-medium text-[#1A1A1A]">
              {itinerary.pace}
            </p>
          </div>

          <div className="space-y-1 border-r border-[#1A1A1A]/5 pr-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Ideal Season
            </span>
            <p className="font-serif text-base font-medium text-[#1A1A1A]">
              {itinerary.idealSeason}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5" /> Investment
            </span>
            <p className="font-serif text-base font-medium text-[#1A1A1A]">
              From ₹{itinerary.priceFromINR.toLocaleString("en-IN")}{" "}
              <span className="text-xs font-sans text-[#1A1A1A]/60 font-light">pp sharing</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Route Visualization & Day Accordions */}
        <div className="lg:col-span-8 space-y-12">
          {/* Overview Essay */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> The Journey Concept
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
              An unscripted passage through the extraordinary.
            </h2>
            <p className="text-sm sm:text-base text-[#1A1A1A]/80 font-light leading-relaxed">
              {itinerary.overview}
            </p>
          </div>

          {/* Interactive Route Map Visualization */}
          <div className="bg-[#F5F2EB] border border-[#1A1A1A]/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5" /> Route Vector Visualization
              </span>
              <span className="text-xs text-[#1A1A1A]/60 font-light">
                {itinerary.routeStops.length} Coordinated Stops
              </span>
            </div>

            {/* Visual SVG Timeline Path */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#C5A880]/40">
              {itinerary.routeStops.map((stop, sIdx) => (
                <div key={sIdx} className="relative group">
                  {/* Glowing Node Dot */}
                  <span className="absolute -left-6 sm:-left-8 top-1 w-3.5 h-3.5 rounded-full bg-[#1A1A1A] border-2 border-[#C5A880] shadow-sm" />
                  <div className="bg-white p-4 border border-[#1A1A1A]/10 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="font-serif text-base font-medium text-[#1A1A1A]">
                        {stop.name}
                      </h4>
                      <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-semibold">
                        {stop.days}
                      </span>
                    </div>
                    <p className="text-xs text-[#1A1A1A]/70 font-light">
                      {stop.highlights}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day-by-Day Accordion Header */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                  Detailed Itinerary
                </span>
                <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                  Day-by-Day Choreography
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-medium text-[#1A1A1A]/70">
                <button
                  onClick={expandAll}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <span>/</span>
                <button
                  onClick={collapseAll}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Accordion Items */}
            <div className="space-y-4">
              {itinerary.days.map((day) => {
                const isOpen = openDays.includes(day.dayNumber);
                return (
                  <div
                    key={day.dayNumber}
                    className="border border-[#1A1A1A]/10 bg-white shadow-xs overflow-hidden transition-all duration-300"
                  >
                    {/* Accordion Trigger Header */}
                    <button
                      onClick={() => toggleDay(day.dayNumber)}
                      className="w-full text-left p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-[#F5F2EB]/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <span className="font-serif text-xl sm:text-2xl font-light text-[#C5A880] flex-shrink-0">
                          {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
                        </span>
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 block">
                            {day.location}
                          </span>
                          <h4 className="font-serif text-base sm:text-lg font-medium text-[#1A1A1A]">
                            {day.dayTitle}
                          </h4>
                        </div>
                      </div>

                      <div className="p-1.5 rounded-full border border-[#1A1A1A]/10 text-[#1A1A1A]/60 flex-shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Accordion Collapsible Body */}
                    {isOpen && (
                      <div className="p-6 pt-2 border-t border-[#1A1A1A]/5 space-y-6 animate-in fade-in duration-300">
                        {/* Day Image */}
                        <div className="relative h-64 sm:h-72 w-full overflow-hidden border border-[#1A1A1A]/10">
                          <Image
                            src={day.image}
                            alt={day.dayTitle}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Narrative Paragraph */}
                        <p className="text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
                          {day.narrative}
                        </p>

                        {/* Privileged Highlights Card */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                          {/* Bespoke Access */}
                          <div className="p-4 bg-[#F5F2EB] space-y-1.5 border-l-2 border-[#C5A880]">
                            <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Privileged Access
                            </span>
                            <p className="text-xs text-[#1A1A1A]/85 font-light leading-snug">
                              {day.bespokeAccess}
                            </p>
                          </div>

                          {/* Included Dining */}
                          <div className="p-4 bg-[#F5F2EB] space-y-1.5 border-l-2 border-[#1A1A1A]/20">
                            <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold flex items-center gap-1">
                              <Utensils className="w-3 h-3 text-[#C5A880]" /> Included Dining
                            </span>
                            <p className="text-xs text-[#1A1A1A]/85 font-light leading-snug">
                              {day.includedDining}
                            </p>
                          </div>

                          {/* Luxury Stay */}
                          <div className="p-4 bg-[#F5F2EB] space-y-1.5 border-l-2 border-[#1A1A1A]/20">
                            <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold flex items-center gap-1">
                              <Hotel className="w-3 h-3 text-[#C5A880]" /> Luxury Stay
                            </span>
                            <p className="text-xs text-[#1A1A1A]/85 font-medium leading-snug">
                              {day.stay.name}
                            </p>
                            <span className="text-[11px] text-[#1A1A1A]/60 block font-light">
                              {day.stay.roomType}
                            </span>
                          </div>
                        </div>

                        {/* Optional Add-ons if present */}
                        {day.optionalAddOns && day.optionalAddOns.length > 0 && (
                          <div className="p-3 bg-white border border-[#C5A880]/30 flex items-center gap-2 text-xs text-[#1A1A1A]/80 font-light">
                            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                              Optional Bespoke Enhancement:
                            </span>
                            <span>{day.optionalAddOns.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specialist Curator Review Box */}
          <div className="bg-[#F5F2EB] border border-[#1A1A1A]/10 p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
              Curator’s Perspective
            </span>
            <h3 className="font-serif text-xl font-light text-[#1A1A1A]">
              Notes from {itinerary.curatorNotes.specialistName} ({itinerary.curatorNotes.specialistRole})
            </h3>
            <blockquote className="p-4 bg-white border-l-2 border-[#C5A880] italic text-sm text-[#1A1A1A]/80 font-serif leading-relaxed">
              &ldquo;{itinerary.curatorNotes.notes}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Right Sticky Summary Sidebar */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-white border border-[#1A1A1A]/10 shadow-xl p-8 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 block mb-1">
                Estimated Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-light text-[#1A1A1A]">
                  ₹{itinerary.priceFromINR.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[#1A1A1A]/60 font-light">/ person sharing</span>
              </div>
              <span className="text-[11px] text-[#1A1A1A]/60 block mt-1 font-light">
                Tailored based on travel dates & party size.
              </span>
            </div>

            {/* Inclusions summary list */}
            <div className="space-y-2.5 pt-4 border-t border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/80 font-light">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
                Curated Inclusions
              </span>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>All private internal aircraft charters & transfers</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>Luxury estate & boutique lodge accommodations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>Dedicated private naturalist & art historian guides</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>VIP fast-track airport assistance & 24/7 concierge desk</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#1A1A1A]/10 space-y-3">
              <Link
                href={`/enquire?itinerary=${itinerary.slug}`}
                className="w-full block text-center py-4 bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Customise This Itinerary
              </Link>

              <button
                onClick={() => setIsBrochureOpen(true)}
                className="w-full py-3.5 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Brochure (PDF)</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-[#1A1A1A]/50 font-light flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                100% Bespoke • No Obligation Consultation
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Simulated Luxury PDF Brochure Modal */}
      {isBrochureOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-[#FDFBF7] border border-[#1A1A1A]/10 p-8 shadow-2xl relative text-[#1A1A1A] animate-in zoom-in-95">
            <button
              onClick={() => {
                setIsBrochureOpen(false);
                setBrochureSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                Soulsventure Private Monograph
              </span>
              <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                {itinerary.title}
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-light max-w-sm mx-auto">
                Includes full day-by-day routing coordinates, lodge architectural layouts, and private flight specifications.
              </p>

              {brochureSuccess ? (
                <div className="p-6 bg-[#F5F2EB] border border-[#C5A880]/30 space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#C5A880] mx-auto" />
                  <h4 className="font-serif text-lg font-medium">Brochure Generated</h4>
                  <p className="text-xs text-[#1A1A1A]/70 font-light">
                    Your luxury PDF monograph <span className="font-medium text-[#1A1A1A]">SOULSVENTURE-{itinerary.slug.toUpperCase()}.pdf</span> has been compiled and saved.
                  </p>
                  <button
                    onClick={() => {
                      setIsBrochureOpen(false);
                      setBrochureSuccess(false);
                    }}
                    className="px-6 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider font-semibold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-y-4">
                  <div className="p-4 bg-white border border-[#1A1A1A]/10 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]/50">Format:</span>
                      <span className="font-medium">Curated Vector PDF (12 Pages)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]/50">Resolution:</span>
                      <span className="font-medium">300 DPI Print-Ready Artwork</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]/50">Includes:</span>
                      <span className="font-medium">Flight Vectors, Wine Cellar Notes</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulateDownload}
                    disabled={downloadingBrochure}
                    className="w-full py-3.5 bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloadingBrochure ? "Compiling Monograph..." : "Download PDF Monograph"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
