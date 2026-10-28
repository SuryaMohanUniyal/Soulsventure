"use client";

import React, { useState } from "react";
import { CRMLead } from "@/lib/crmStore";
import {
  Printer,
  Share2,
  Send,
  Check,
  Calendar,
  Compass,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Plus,
  Trash2,
  X,
  FileText,
  Hotel,
} from "lucide-react";

interface AdminProposalModalProps {
  lead: CRMLead;
  isOpen: boolean;
  onClose: () => void;
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  accommodation: string;
  highlights: string[];
  meals: string;
}

export function AdminProposalModal({
  lead,
  isOpen,
  onClose,
}: AdminProposalModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [days, setDays] = useState<ItineraryDay[]>([
    {
      dayNumber: 1,
      title: "Royal Arrival & Private Heritage Welcome",
      location: lead.destinations[0] || "Rajasthan",
      accommodation: "The Oberoi Udaivilas / Taj Palace Suite",
      highlights: [
        "Private airport tarmac greeter and champagne convoy transfer",
        "Traditional Aarti, Tikka, and ceremonial royal garland arrival",
        "Sunset private boat cruise with private flutist on the water",
      ],
      meals: "Welcome High Tea & Royal Dining Experience included",
    },
    {
      dayNumber: 2,
      title: "Exclusive Private Monasteries & Royal Courtyards",
      location: lead.destinations[0] || "Rajasthan",
      accommodation: "The Oberoi Udaivilas / Taj Palace Suite",
      highlights: [
        "Private after-hours access before gates open to public",
        "Guided heritage walk led by an eminent royal historian",
        "Candlelight dinner under courtyard archways with curated vintage wines",
      ],
      meals: "Artisanal Breakfast, Curated Lunch & Private Chef's Dinner",
    },
    {
      dayNumber: 3,
      title: "Wilderness Transition & High-Altitude / Safari Escort",
      location: "Private Enclave",
      accommodation: "SUJÁN Luxury Camp / TUTC Grand Tent",
      highlights: [
        "Private chartered turboprop or luxury Mercedes G-Wagon convoy",
        "Afternoon private game safari tracking apex predators with lead naturalist",
        "Fireside stargazing session with high-powered telescope and astronomer",
      ],
      meals: "All-inclusive organic bush dining and premium refreshments",
    },
  ]);

  const [newDayTitle, setNewDayTitle] = useState("");
  const [showAddDay, setShowAddDay] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const fakeUrl = `${window.location.origin}/proposal/${lead.referenceCode.toLowerCase()}`;
    navigator.clipboard.writeText(fakeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Dear ${lead.firstName},\n\nIt is our absolute privilege to present your bespoke SoulsVenture luxury proposal for ${lead.destinationSummary}.\n\n` +
      `Proposal Reference: *${lead.referenceCode}*\n` +
      `Dates: *${lead.travelWindow}*\n` +
      `Estimated Investment: *₹${lead.estimatedValueINR.toLocaleString("en-IN")}*\n\n` +
      `Your bespoke digital dossier and day-by-day itinerary is ready for your private review.\n\n` +
      `Warm regards,\nSuraj Uniyal & Harsh Sood\nFounders, SoulsVenture Concierge\nDirect: +91 8126357353`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  const handleAddDay = () => {
    if (!newDayTitle.trim()) return;
    const nextDayNum = days.length + 1;
    setDays((prev) => [
      ...prev,
      {
        dayNumber: nextDayNum,
        title: newDayTitle.trim(),
        location: lead.destinations[0] || "Custom Location",
        accommodation: "Curated Luxury Suite",
        highlights: [
          "Curated private VIP experience designed exclusively for your party",
          "Dedicated chauffeur and English-speaking concierge attached",
        ],
        meals: "Full Board Gourmet Inclusions",
      },
    ]);
    setNewDayTitle("");
    setShowAddDay(false);
  };

  const handleDeleteDay = (dayNum: number) => {
    setDays((prev) =>
      prev
        .filter((d) => d.dayNumber !== dayNum)
        .map((d, idx) => ({ ...d, dayNumber: idx + 1 }))
    );
  };

  const gstAmount = Math.round(lead.estimatedValueINR * 0.05);
  const totalWithGst = lead.estimatedValueINR + gstAmount;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#141414] border border-[#2E2E2E] rounded-2xl w-full max-w-4xl my-auto max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-20 bg-[#181818]/95 backdrop-blur-sm border-b border-[#2A2A2A] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                Bespoke Proposal Generator
              </span>
              <h2 className="text-base font-serif text-[#FDFBF7]">
                Proposal Brief: {lead.referenceCode} • {lead.clientName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#202020] hover:bg-[#282828] text-[#FDFBF7] rounded-lg text-xs font-serif border border-[#333333] transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Copy Web Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 rounded-lg text-xs font-serif border border-emerald-600/40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A059] hover:bg-[#b59247] text-black font-serif font-medium rounded-lg text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#888888] hover:text-[#FDFBF7] rounded-lg hover:bg-[#222222] transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-8 bg-[#111111] text-[#FDFBF7]">
          {/* Document Header with SoulsVenture Branding */}
          <div className="border-b border-[#2A2A2A] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-[#C5A059]" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                  SoulsVenture Concierge
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#FDFBF7] tracking-tight">
                Private Journey Proposal
              </h1>
              <p className="text-sm font-serif italic text-[#A0A0A0] mt-1">
                Handcrafted exclusively for {lead.clientName} & Party
              </p>
            </div>

            <div className="text-left md:text-right font-mono text-xs space-y-1 text-[#888888]">
              <div>
                <span className="text-[#666]">Dossier ID: </span>
                <span className="text-[#C5A059] font-medium">{lead.referenceCode}</span>
              </div>
              <div>
                <span className="text-[#666]">Issue Date: </span>
                <span className="text-[#E0E0E0]">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <div>
                <span className="text-[#666]">Lead Curator: </span>
                <span className="text-[#E0E0E0]">{lead.assignedCurator} (Founder)</span>
              </div>
              <div>
                <span className="text-[#666]">Direct Desk: </span>
                <span className="text-[#C5A059]">+91 8126357353</span>
              </div>
            </div>
          </div>

          {/* Key Parameters Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#181818] rounded-xl border border-[#262626]">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#888888] block">
                Destination Circuit
              </span>
              <span className="text-sm font-serif text-[#FDFBF7] font-medium mt-0.5 block">
                {lead.destinationSummary}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#888888] block">
                Travel Window
              </span>
              <span className="text-sm font-serif text-[#FDFBF7] font-medium mt-0.5 block">
                {lead.travelWindow}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#888888] block">
                Traveling Party
              </span>
              <span className="text-sm font-serif text-[#FDFBF7] font-medium mt-0.5 block">
                {lead.companions}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#888888] block">
                Experience Tier
              </span>
              <span className="text-sm font-serif text-[#C5A059] font-medium mt-0.5 block">
                Ultra-Luxury Private Bespoke
              </span>
            </div>
          </div>

          {/* Curators' Personal Preface */}
          <div className="p-6 bg-[#161616] rounded-xl border-l-2 border-[#C5A059] space-y-3">
            <h3 className="font-serif text-[#C5A059] text-base tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              A Personal Note from the Founders
            </h3>
            <p className="text-xs text-[#D0D0D0] leading-relaxed font-serif">
              “Dear {lead.firstName}, India is not a destination to simply visit; it is an intimate theatre of extraordinary moments best witnessed far beyond the crowds. In designing this itinerary, we have secured private palace chambers, arranged behind-closed-doors spiritual blessings, and assigned your party dedicated luxury escorts throughout. Every detail has been tailored around your personal pace and preferences.”
            </p>
            <div className="text-xs text-[#888888] font-serif pt-1 flex items-center justify-between">
              <span>— Suraj Uniyal & Harsh Sood, Founders</span>
              <span className="font-mono text-[11px] text-[#666]">SoulsVenture Private Office, New Delhi</span>
            </div>
          </div>

          {/* Day-by-Day Modular Itinerary Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <h3 className="text-xl font-serif text-[#FDFBF7]">
                  Curated Day-by-Day Progression
                </h3>
                <p className="text-xs text-[#888888]">
                  Modular sequence designed for seamless comfort and private immersion
                </p>
              </div>

              <button
                onClick={() => setShowAddDay(!showAddDay)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#202020] hover:bg-[#282828] text-[#C5A059] rounded-lg text-xs font-serif border border-[#3A3A3A] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Journey Day
              </button>
            </div>

            {showAddDay && (
              <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#C5A059]/40 space-y-3">
                <div className="text-xs font-serif text-[#FDFBF7]">
                  Add a New Day to Itinerary
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Day Title (e.g., Private Heli-Safari & Pangong Lakeside Champagne)..."
                    value={newDayTitle}
                    onChange={(e) => setNewDayTitle(e.target.value)}
                    className="flex-1 bg-[#111] border border-[#333] rounded-lg px-3 py-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    onClick={handleAddDay}
                    className="px-4 py-1.5 bg-[#C5A059] text-black text-xs font-serif rounded-lg hover:bg-[#b59247]"
                  >
                    Insert Day
                  </button>
                  <button
                    onClick={() => setShowAddDay(false)}
                    className="px-3 py-1.5 bg-[#222] text-[#888] text-xs font-serif rounded-lg hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {days.map((d) => (
                <div
                  key={d.dayNumber}
                  className="bg-[#181818] border border-[#262626] rounded-xl p-5 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 font-serif flex items-center justify-center text-sm font-semibold">
                        0{d.dayNumber}
                      </span>
                      <div>
                        <h4 className="font-serif text-[#FDFBF7] text-base font-medium">
                          {d.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-[#888888] mt-0.5 font-mono">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C5A059]" />
                            {d.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Hotel className="w-3 h-3 text-[#C5A059]" />
                            {d.accommodation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteDay(d.dayNumber)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-[#666] hover:text-rose-400 transition-opacity"
                      title="Remove Day"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 pl-11">
                    {d.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="text-xs text-[#C0C0C0] font-sans flex items-start gap-2"
                      >
                        <span className="text-[#C5A059] text-sm leading-none">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pl-11 pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] text-[#777777] font-mono">
                    <span>Dining Plan: {d.meals}</span>
                    <span className="text-[#C5A059]">Private Chauffeur Attached</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commercials, Invoicing & GST Schedule */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-[#FDFBF7] border-b border-[#2A2A2A] pb-3">
              Investment Breakdown & Payment Schedule
            </h3>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#A0A0A0]">
                  <span>Curated Bespoke Journey Value (Net Excl. GST):</span>
                  <span className="font-mono text-[#FDFBF7]">
                    ₹{lead.estimatedValueINR.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#A0A0A0]">
                  <span>Statutory Tourism GST (5% with ITC compliant invoicing):</span>
                  <span className="font-mono text-[#FDFBF7]">
                    ₹{gstAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-serif pt-3 border-t border-[#2A2A2A] text-[#FDFBF7]">
                  <span className="font-bold">Total Comprehensive Investment:</span>
                  <span className="font-mono text-lg text-[#C5A059] font-bold">
                    ₹{totalWithGst.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Milestone Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#262626] text-xs">
                <div className="p-3 bg-[#131313] rounded-lg border border-[#222222]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                    Milestone 1: Deposit to Secure (50%)
                  </span>
                  <span className="font-mono text-emerald-400 font-semibold block mt-0.5">
                    ₹{Math.round(totalWithGst * 0.5).toLocaleString("en-IN")}
                  </span>
                  <p className="text-[11px] text-[#777] mt-1">
                    Secures non-refundable palace suites, charter holds, and priority expedition permits.
                  </p>
                </div>

                <div className="p-3 bg-[#131313] rounded-lg border border-[#222222]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                    Milestone 2: Final Balance (50%)
                  </span>
                  <span className="font-mono text-[#FDFBF7] font-semibold block mt-0.5">
                    ₹{Math.round(totalWithGst * 0.5).toLocaleString("en-IN")}
                  </span>
                  <p className="text-[11px] text-[#777] mt-1">
                    Due 30 days prior to departure along with issuance of final luxury travel vouchers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="border-t border-[#2A2A2A] pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#888888] gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>SoulsVenture Bespoke Private Office • New Delhi • Rishikesh</span>
            </div>
            <div className="font-mono text-[11px]">
              Confidential Client Document • {lead.referenceCode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
