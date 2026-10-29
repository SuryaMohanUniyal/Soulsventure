"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileText,
  UserCheck,
  Save,
  Clock,
  Send,
  Printer,
  ChevronDown,
  Mic,
  Volume2,
  ExternalLink,
  Car,
  Hotel,
  Utensils,
  Heart,
  Building2,
  Compass,
  Share2,
  Check,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import {
  CRMLead,
  LeadStatus,
  simulateVoiceCallTranscription,
  ClientNuanceProfile,
  VoiceCallTranscript,
  getStoredLeads,
  saveLeads,
  PartnerTieUp,
  VendorRole,
  VendorBookingAssignment,
  getStoredPartners,
  updateLeadVendorAssignment,
} from "@/lib/crmStore";

interface AdminClientDossierDrawerProps {
  lead: CRMLead | null;
  onClose: () => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onUpdateNotes: (leadId: string, notes: string) => void;
  onUpdateCurator: (leadId: string, curator: "Suraj Uniyal" | "Harsh Sood") => void;
  onToggleMilestone?: (leadId: string, milestoneKey: keyof CRMLead["milestones"]) => void;
  onGenerateProposal: (lead: CRMLead) => void;
}

export default function AdminClientDossierDrawer({
  lead,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onUpdateCurator,
  onToggleMilestone,
  onGenerateProposal,
}: AdminClientDossierDrawerProps) {
  const [notes, setNotes] = useState(lead?.internalNotes || "");
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceCallAlert, setVoiceCallAlert] = useState("");
  const [localNuances, setLocalNuances] = useState<ClientNuanceProfile>(
    lead?.clientNuances || {
      dietaryRestrictions: ["Pure Vegetarian Preferred", "Organic Farm-to-Table"],
      roomPreferences: ["Highest Floor Palace Lake Suite"],
      beveragePreferences: ["Dom Pérignon Champagne & Darjeeling First Flush"],
      vehiclePreference: "Land Rover Defender 110 4WD Luxury Spec",
      milestoneEvents: [{ title: "Silver 25th Wedding Anniversary", date: "2026-11-14", relation: "Self & Spouse" }],
      voiceCalls: [],
      specialProtocol: "Titular royal greetings requested upon arrival.",
    }
  );

  // Vendor Dispatch Matrix State
  const [allPartners, setAllPartners] = useState<PartnerTieUp[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [hotelPartnerId, setHotelPartnerId] = useState<string>(
    lead?.vendorAssignments?.hotel?.partnerId || ""
  );
  const [hotelStatus, setHotelStatus] = useState<string>(
    lead?.vendorAssignments?.hotel?.status || "Pending Confirmation"
  );
  const [hotelNotes, setHotelNotes] = useState<string>(
    lead?.vendorAssignments?.hotel?.notes || ""
  );

  const [driverPartnerId, setDriverPartnerId] = useState<string>(
    lead?.vendorAssignments?.driver?.partnerId || ""
  );
  const [driverStatus, setDriverStatus] = useState<string>(
    lead?.vendorAssignments?.driver?.status || "Pending Dispatch"
  );
  const [driverNotes, setDriverNotes] = useState<string>(
    lead?.vendorAssignments?.driver?.notes || ""
  );

  const [guidePartnerId, setGuidePartnerId] = useState<string>(
    lead?.vendorAssignments?.guide?.partnerId || ""
  );
  const [guideStatus, setGuideStatus] = useState<string>(
    lead?.vendorAssignments?.guide?.status || "Pending Assignment"
  );
  const [guideNotes, setGuideNotes] = useState<string>(
    lead?.vendorAssignments?.guide?.notes || ""
  );

  const [dispatchSavedToast, setDispatchSavedToast] = useState("");

  useEffect(() => {
    const partners = getStoredPartners();
    setAllPartners(partners);

    if (lead?.vendorAssignments) {
      if (lead.vendorAssignments.hotel) {
        setHotelPartnerId(lead.vendorAssignments.hotel.partnerId || "");
        setHotelStatus(lead.vendorAssignments.hotel.status || "Pending Confirmation");
        setHotelNotes(lead.vendorAssignments.hotel.notes || "");
      }
      if (lead.vendorAssignments.driver) {
        setDriverPartnerId(lead.vendorAssignments.driver.partnerId || "");
        setDriverStatus(lead.vendorAssignments.driver.status || "Pending Dispatch");
        setDriverNotes(lead.vendorAssignments.driver.notes || "");
      }
      if (lead.vendorAssignments.guide) {
        setGuidePartnerId(lead.vendorAssignments.guide.partnerId || "");
        setGuideStatus(lead.vendorAssignments.guide.status || "Pending Assignment");
        setGuideNotes(lead.vendorAssignments.guide.notes || "");
      }
    }
  }, [lead]);

  const handleSaveNotes = () => {
    if (!lead) return;
    onUpdateNotes(lead.id, notes);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2000);
  };

  // Dispatch individual or all vendor roles
  const handleSaveVendorAssignments = () => {
    if (!lead) return;
    const selectedHotel = allPartners.find((p) => p.id === hotelPartnerId);
    const selectedDriver = allPartners.find((p) => p.id === driverPartnerId);
    const selectedGuide = allPartners.find((p) => p.id === guidePartnerId);

    if (selectedHotel) {
      updateLeadVendorAssignment(lead.id, "hotel", {
        partnerId: selectedHotel.id,
        partnerName: selectedHotel.name,
        role: "hotel",
        status: hotelStatus,
        notes: hotelNotes,
        assignedAt: new Date().toISOString(),
      });
    }

    if (selectedDriver) {
      updateLeadVendorAssignment(lead.id, "driver", {
        partnerId: selectedDriver.id,
        partnerName: selectedDriver.name,
        role: "driver",
        status: driverStatus,
        notes: driverNotes,
        assignedAt: new Date().toISOString(),
      });
    }

    if (selectedGuide) {
      updateLeadVendorAssignment(lead.id, "guide", {
        partnerId: selectedGuide.id,
        partnerName: selectedGuide.name,
        role: "guide",
        status: guideStatus,
        notes: guideNotes,
        assignedAt: new Date().toISOString(),
      });
    }

    setDispatchSavedToast("Vendor allocations saved! Live sync updated for Vendor Portals.");
    setTimeout(() => setDispatchSavedToast(""), 4000);
  };

  // Simulate AI Voice Call & Transcription Sync
  const handleSimulateVoiceCall = () => {
    if (!lead) return;
    const currentLead = lead;
    setIsTranscribing(true);
    setTimeout(() => {
      const transcript = simulateVoiceCallTranscription(currentLead.clientName);
      const updatedNuances: ClientNuanceProfile = {
        dietaryRestrictions: transcript.extractedNuances.dietary || localNuances.dietaryRestrictions,
        roomPreferences: transcript.extractedNuances.roomViews || localNuances.roomPreferences,
        beveragePreferences: transcript.extractedNuances.champagneOrBeverage || localNuances.beveragePreferences,
        vehiclePreference: transcript.extractedNuances.vehicle || localNuances.vehiclePreference,
        milestoneEvents: transcript.extractedNuances.milestone
          ? [{ title: transcript.extractedNuances.milestone, date: "2026-11-14", relation: "Self & Spouse" }]
          : localNuances.milestoneEvents,
        voiceCalls: [transcript, ...(localNuances.voiceCalls || [])],
        specialProtocol: "Exclusive ground floor allocation & chilled champagne confirmed by AI transcript.",
      };

      setLocalNuances(updatedNuances);

      // Save to CRM store
      const allLeads = getStoredLeads();
      const updated = allLeads.map((l) =>
        l.id === currentLead.id
          ? {
              ...l,
              clientNuances: updatedNuances,
              assignedVehicle: updatedNuances.vehiclePreference,
              internalNotes: `${l.internalNotes}\n[AI Call Sync]: Stated pure veg dining, lake view suite, and 25th anniversary on Nov 14th.`,
            }
          : l
      );
      saveLeads(updated);

      setIsTranscribing(false);
      setVoiceCallAlert(
        `AI Call transcribed! Nuance Vault updated for ${currentLead.clientName} (Vegetarian, Lake Suite, Dom Pérignon & Defender 4x4).`
      );
      setTimeout(() => setVoiceCallAlert(""), 5000);
    }, 1200);
  };

  // Filter partners by role and region
  const availableRegions = Array.from(new Set(allPartners.map((p) => p.region))).filter(Boolean);

  const hotelOptions = allPartners.filter(
    (p) => (p.role === "hotel" || p.category === "Hotels & Stays") &&
           (regionFilter === "all" || p.region.toLowerCase().includes(regionFilter.toLowerCase()))
  );
  const driverOptions = allPartners.filter(
    (p) => (p.role === "driver" || p.category === "Vehicles & Transport") &&
           (regionFilter === "all" || p.region.toLowerCase().includes(regionFilter.toLowerCase()))
  );
  const guideOptions = allPartners.filter(
    (p) => (p.role === "guide" || p.category === "Tour Guides & Escorts") &&
           (regionFilter === "all" || p.region.toLowerCase().includes(regionFilter.toLowerCase()))
  );

  if (!lead) return null;

  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const whatsappGreeting = `Greetings ${lead.firstName},

This is ${lead.assignedCurator} from Soulsventure Bespoke Journeys. 

Regarding your confidential inquiry (${lead.referenceCode}) for ${lead.destinationSummary}: we have choreographed a tailored route outline with dedicated luxury chauffeur fleet and verified palace/camp allocations matching your ${lead.budgetTier} tier.

👑 You can access your private client portal & day-by-day itinerary here:
https://soulsventure.com/client/trip/${lead.referenceCode.toLowerCase()}

Would you be available for a brief 15-minute discovery consultation at your preferred time (${lead.preferredTimeOfDay})?

Warm regards,
${lead.assignedCurator}
Founder | Soulsventure Bespoke Journeys
concierge@soulsventure.com • Dehradun, Uttarakhand`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappGreeting)}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#141414] border-l border-[#2B2B2B] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-[#242424] bg-[#191919] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                Client Dossier & Itinerary Brief
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#242424] text-[#A1A1AA] border border-[#333333]">
                {lead.referenceCode}
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] flex items-center gap-2">
              <span>{lead.clientName}</span>
              {lead.isVIP && (
                <span className="px-2 py-0.5 rounded text-[9px] bg-[#C5A059] text-black font-bold uppercase tracking-wider">
                  VIP
                </span>
              )}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#A1A1AA] hover:text-[#FDFBF7] hover:bg-[#252525] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1 text-xs">
          {voiceCallAlert && (
            <div className="p-3 bg-emerald-950/70 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 flex-shrink-0 text-[#C5A059]" />
              <span>{voiceCallAlert}</span>
            </div>
          )}

          {dispatchSavedToast && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>{dispatchSavedToast}</span>
            </div>
          )}

          {/* Quick Action Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 font-semibold transition-colors cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send WhatsApp Brief</span>
            </a>

            <button
              onClick={() => onGenerateProposal(lead)}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] text-[#FDFBF7] font-semibold transition-colors cursor-pointer text-center"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" />
              <span>Magazine Brochure</span>
            </button>

            <a
              href={`/client/trip/${lead.referenceCode.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] text-[#FDFBF7] font-semibold transition-colors cursor-pointer text-center"
            >
              <ExternalLink className="w-4 h-4 text-[#C5A059]" />
              <span>Client Portal Link</span>
            </a>
          </div>

          {/* VIP Nuance Vault & AI Voice Note Sync */}
          <div className="p-4 bg-gradient-to-br from-[#1C1C1C] to-[#171717] rounded-xl border border-[#C5A059]/30 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <h4 className="text-[11px] uppercase tracking-wider text-[#C5A059] font-semibold">
                  VIP Nuance Vault & Voice Note Sync
                </h4>
              </div>

              <button
                type="button"
                onClick={handleSimulateVoiceCall}
                disabled={isTranscribing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black rounded-lg text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isTranscribing ? "Transcribing Call..." : "Simulate Call & AI Sync"}</span>
              </button>
            </div>

            <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
              AI listens to WhatsApp calls / voice notes and automatically extracts dietary restrictions, room views, champagne, and anniversary dates directly into client profile.
            </p>

            {/* Extracted Nuances Badges */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2">
                <Utensils className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase block">Dietary Nuance:</span>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {localNuances.dietaryRestrictions.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#222222] text-[#FDFBF7] border border-[#333333]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Hotel className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase block">Room View & Suite:</span>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {localNuances.roomPreferences.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#222222] text-[#FDFBF7] border border-[#333333]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Car className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase block">Assigned Luxury Fleet:</span>
                  <span className="text-xs text-[#FDFBF7] font-medium block mt-0.5">
                    {localNuances.vehiclePreference}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase block">Anniversary & Milestones:</span>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {localNuances.milestoneEvents.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-rose-950/60 text-rose-300 border border-rose-800/40">
                        {m.title} ({m.date})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VENDOR DISPATCH & ALLOCATION MATRIX */}
          <div className="p-4 bg-gradient-to-br from-[#1C1C1C] to-[#151515] rounded-xl border border-[#3A3A3A] space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A2A2A] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h4 className="text-xs uppercase font-serif tracking-wider text-[#C5A059] font-semibold">
                    Vendor Dispatch & Allocation Matrix
                  </h4>
                </div>
                <p className="text-[10px] text-[#888888] mt-0.5">
                  Route this booking to specific hotel partners, chauffeurs, and tour guides. Live 2-way sync with Vendor Portal.
                </p>
              </div>

              {/* Region Filter Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-[#71717A]">Region:</span>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="bg-[#111111] border border-[#333333] rounded px-2 py-1 text-[11px] text-[#FDFBF7] font-mono focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="all">All Operating Regions</option>
                  <option value="Rajasthan">Rajasthan (Jaipur / Udaipur)</option>
                  <option value="Ladakh">Ladakh (Leh / Nubra)</option>
                  <option value="Uttarakhand">Uttarakhand / Himalayas</option>
                  {availableRegions.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 1. Hotel Partner Allocation */}
            <div className="p-3 rounded-lg bg-[#111111] border border-[#2B2B2B] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-semibold text-xs text-[#FDFBF7]">1. Hotel / Resort Partner</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${
                  hotelStatus === "Accepted" || hotelStatus === "Room Suite Reserved" || hotelStatus === "VIP Welcome Ready"
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40"
                    : "bg-amber-950/80 text-amber-300 border border-amber-800/40"
                }`}>
                  {hotelStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-[#71717A] uppercase font-mono block mb-0.5">Assigned Partner Property</label>
                  <select
                    value={hotelPartnerId}
                    onChange={(e) => setHotelPartnerId(e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] rounded p-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="">-- Select Contracted Hotel --</option>
                    {hotelOptions.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] text-[#71717A] uppercase font-mono block mb-0.5">Hotel Confirmation Status</label>
                  <select
                    value={hotelStatus}
                    onChange={(e) => setHotelStatus(e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] rounded p-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Pending Confirmation">Pending Confirmation</option>
                    <option value="Accepted">Accepted by GM / Reservations</option>
                    <option value="Room Suite Reserved">Room Suite Reserved</option>
                    <option value="VIP Welcome Ready">VIP Welcome Ready (Flowers & Champagne)</option>
                    <option value="Checked-In">Guest Checked-In</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Hotel notes (e.g. Kohinoor Suite, late checkout, pure vegetarian meals)"
                  value={hotelNotes}
                  onChange={(e) => setHotelNotes(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2B2B2B] rounded p-1.5 text-[11px] text-[#D4D4D8] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {hotelPartnerId && (
                <div className="pt-1 flex items-center justify-between text-[10px]">
                  {(() => {
                    const partner = allPartners.find((p) => p.id === hotelPartnerId);
                    if (!partner) return null;
                    const loginPhone = partner.loginPhone || partner.phone.replace(/\D/g, "");
                    const text = encodeURIComponent(
                      `Namaste ${partner.name},\n\nSoulsVenture Booking Dispatch:\nGuest: ${lead.clientName} (${lead.referenceCode})\nDuration: ${lead.duration}\nDiet: Pure Vegetarian\nStatus: ${hotelStatus}\nNotes: ${hotelNotes || "VIP protocol"}\n\nReview & manage in your Vendor Portal: https://soulsventure.com/vendor/login\nLogin ID: ${loginPhone} | PIN: ${partner.password || "1234"}`
                    );
                    return (
                      <>
                        <span className="text-[#888888] font-mono">
                          Partner: <strong className="text-[#FDFBF7]">{partner.name}</strong> ({partner.phone})
                        </span>
                        <a
                          href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, "")}?text=${text}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 text-[10px] font-mono"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Dispatch via WhatsApp</span>
                        </a>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* 2. Driver / Fleet Allocation */}
            <div className="p-3 rounded-lg bg-[#111111] border border-[#2B2B2B] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-sky-400" />
                  <span className="font-semibold text-xs text-[#FDFBF7]">2. Chauffeur & Luxury Fleet</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${
                  driverStatus === "Accepted" || driverStatus === "Vehicle Prepped & Fueled" || driverStatus === "At Airport Pickup Gate"
                    ? "bg-sky-950/80 text-sky-300 border border-sky-800/40"
                    : "bg-amber-950/80 text-amber-300 border border-amber-800/40"
                }`}>
                  {driverStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-[#71717A] uppercase font-mono block mb-0.5">Assigned Chauffeur / Fleet</label>
                  <select
                    value={driverPartnerId}
                    onChange={(e) => setDriverPartnerId(e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] rounded p-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-sky-400"
                  >
                    <option value="">-- Select Chauffeur / Fleet --</option>
                    {driverOptions.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} - {d.serviceOrAssets} ({d.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] text-[#71717A] uppercase font-mono block mb-0.5">Dispatch Status</label>
                  <select
                    value={driverStatus}
                    onChange={(e) => setDriverStatus(e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] rounded p-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-sky-400"
                  >
                    <option value="Pending Dispatch">Pending Dispatch</option>
                    <option value="Accepted">Accepted by Chauffeur</option>
                    <option value="Vehicle Prepped & Fueled">Vehicle Prepped & Cleaned</option>
                    <option value="At Airport Pickup Gate">At Airport Pickup Gate</option>
                    <option value="Transfer Completed">Transfer Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Driver notes (e.g. Flight 6E-205 arrival 13:45, child car seat required)"
                  value={driverNotes}
                  onChange={(e) => setDriverNotes(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2B2B2B] rounded p-1.5 text-[11px] text-[#D4D4D8] focus:outline-none focus:border-sky-400"
                />
              </div>

              {driverPartnerId && (
                <div className="pt-1 flex items-center justify-between text-[10px]">
                  {(() => {
                    const partner = allPartners.find((p) => p.id === driverPartnerId);
                    if (!partner) return null;
                    const loginPhone = partner.loginPhone || partner.phone.replace(/\D/g, "");
                    const text = encodeURIComponent(
                      `Namaste ${partner.name},\n\nSoulsVenture Driver Dispatch Order:\nGuest: ${lead.clientName} (${lead.referenceCode})\nVehicle: ${lead.assignedVehicle || "Luxury SUV"}\nStatus: ${driverStatus}\nInstructions: ${driverNotes || "Airport pickup with name placard"}\n\nManage in Vendor Portal: https://soulsventure.com/vendor/login\nLogin ID: ${loginPhone} | PIN: ${partner.password || "1234"}`
                    );
                    return (
                      <>
                        <span className="text-[#888888] font-mono">
                          Driver: <strong className="text-[#FDFBF7]">{partner.name}</strong> ({partner.phone})
                        </span>
                        <a
                          href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, "")}?text=${text}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800/40 text-[10px] font-mono"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Dispatch via WhatsApp</span>
                        </a>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* 3. Tour Guide Allocation */}
            <div className="p-3 rounded-lg bg-[#111111] border border-[#2B2B2B] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-xs text-[#FDFBF7]">3. Licensed Tour Guide / Historian</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${
                  guideStatus === "Accepted" || guideStatus === "Tour Briefing Complete" || guideStatus === "On-Ground With Guests"
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40"
                    : "bg-amber-950/80 text-amber-300 border border-amber-800/40"
                }`}>
                  {guideStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-[#71717A] uppercase font-mono block mb-0.5">Assigned Tour Guide</label>
                  <select
                    value={guidePartnerId}
                    onChange={(e) => setGuidePartnerId(e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] rounded p-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-emerald-400"
                  >
                    <option value="">-- Select Licensed Guide --</option>
                    {guideOptions.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.serviceOrAssets})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] text-[#71717A] uppercase font-mono block mb-0.5">Guide Schedule Status</label>
                  <select
                    value={guideStatus}
                    onChange={(e) => setGuideStatus(e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] rounded p-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Pending Assignment">Pending Assignment</option>
                    <option value="Accepted">Accepted by Guide</option>
                    <option value="Tour Briefing Complete">Tour Briefing Complete</option>
                    <option value="On-Ground With Guests">On-Ground With Guests</option>
                    <option value="Excursion Completed">Excursion Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Guide itinerary notes (e.g. City Palace after-hours private access, English commentary)"
                  value={guideNotes}
                  onChange={(e) => setGuideNotes(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2B2B2B] rounded p-1.5 text-[11px] text-[#D4D4D8] focus:outline-none focus:border-emerald-400"
                />
              </div>

              {guidePartnerId && (
                <div className="pt-1 flex items-center justify-between text-[10px]">
                  {(() => {
                    const partner = allPartners.find((p) => p.id === guidePartnerId);
                    if (!partner) return null;
                    const loginPhone = partner.loginPhone || partner.phone.replace(/\D/g, "");
                    const text = encodeURIComponent(
                      `Namaste ${partner.name},\n\nSoulsVenture Tour Guide Assignment:\nGuest: ${lead.clientName} (${lead.referenceCode})\nSites: ${lead.destinationSummary}\nStatus: ${guideStatus}\nNotes: ${guideNotes || "Private bespoke walkthrough"}\n\nAccess Schedule in Vendor Portal: https://soulsventure.com/vendor/login\nLogin ID: ${loginPhone} | PIN: ${partner.password || "1234"}`
                    );
                    return (
                      <>
                        <span className="text-[#888888] font-mono">
                          Guide: <strong className="text-[#FDFBF7]">{partner.name}</strong> ({partner.phone})
                        </span>
                        <a
                          href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, "")}?text=${text}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 text-[10px] font-mono"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Dispatch via WhatsApp</span>
                        </a>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Save Allocations Button */}
            <div className="flex items-center justify-end pt-2 border-t border-[#2A2A2A]">
              <button
                type="button"
                onClick={handleSaveVendorAssignments}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C5A059] to-[#b08e48] hover:from-[#d8b368] hover:to-[#be9b52] text-black font-serif font-semibold text-xs rounded-lg transition-all shadow-md cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Vendor Allocations & Sync Portals</span>
              </button>
            </div>
          </div>

          {/* Status & Curator Controls */}
          <div className="p-3.5 sm:p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
                Trip Pipeline Stage
              </label>
              <div className="relative">
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                  className="w-full bg-[#242424] text-[#FDFBF7] px-3 py-2 rounded-md border border-[#333333] text-xs font-medium focus:outline-none focus:border-[#C5A059] appearance-none pr-8 cursor-pointer"
                >
                  <option value="New Lead">New Lead</option>
                  <option value="Discovery Call">Discovery Call</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Deposit Confirmed">Deposit Confirmed</option>
                  <option value="On-Ground Active">On-Ground Active</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
                Lead Concierge Director
              </label>
              <div className="relative">
                <select
                  value={lead.assignedCurator}
                  onChange={(e) =>
                    onUpdateCurator(lead.id, e.target.value as "Suraj Uniyal" | "Harsh Sood")
                  }
                  className="w-full bg-[#242424] text-[#C5A059] px-3 py-2 rounded-md border border-[#333333] text-xs font-medium focus:outline-none focus:border-[#C5A059] appearance-none pr-8 cursor-pointer"
                >
                  <option value="Suraj Uniyal">Suraj Uniyal (Founder & Dir. of Operations)</option>
                  <option value="Harsh Sood">Harsh Sood (Founder & Dir. of Curation)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Contact & Traveler Information */}
          <div className="p-3.5 sm:p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-3">
            <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Direct Contact Channels
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Phone className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Telephone</span>
                  <a href={`tel:${lead.phone}`} className="hover:text-[#C5A059]">
                    {lead.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Mail className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Email Address</span>
                  <a href={`mailto:${lead.email}`} className="hover:text-[#C5A059]">
                    {lead.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Clock className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Preferred Consultation</span>
                  <span>{lead.preferredTimeOfDay} ({lead.consultationMethod.toUpperCase()})</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Users className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Party Structure</span>
                  <span>{lead.companions} {lead.familyAges ? `(${lead.familyAges})` : ""}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Specifications */}
          <div className="p-3.5 sm:p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-3">
            <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Handcrafted Journey Parameters
            </h4>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <span className="text-[10px] text-[#71717A] block">Destination</span>
                <span className="font-serif text-sm font-medium text-[#FDFBF7]">
                  {lead.destinationSummary}
                </span>
              </div>
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <span className="text-[10px] text-[#71717A] block">Duration</span>
                <span className="font-serif text-sm font-medium text-[#FDFBF7]">{lead.duration}</span>
              </div>
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <span className="text-[10px] text-[#71717A] block">Budget Tier</span>
                <span className="font-serif text-sm font-medium text-[#C5A059]">
                  {lead.budgetTier}
                </span>
              </div>
            </div>
          </div>

          {/* 5-Step Touchpoint Milestones */}
          <div className="p-3.5 sm:p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold">
                Bespoke Touchpoint Milestones
              </h4>
              <span className="text-[10px] text-[#71717A]">Click to toggle completion</span>
            </div>
            <div className="space-y-2">
              {[
                { key: "inquiryLogged" as const, label: "Step 1: Initial Inquiry Logged & Registered", done: lead.milestones.inquiryLogged },
                { key: "discoveryCallCompleted" as const, label: "Step 2: 1-on-1 Discovery Call Completed", done: lead.milestones.discoveryCallCompleted },
                { key: "proposalSent" as const, label: "Step 3: Bespoke Moodboard & Itinerary Delivered", done: lead.milestones.proposalSent },
                { key: "depositReceived" as const, label: "Step 4: Luxury Advance Deposit Secured (RTGS)", done: lead.milestones.depositReceived },
                { key: "conciergeActive" as const, label: "Step 5: On-Ground 24/7 Concierge Tracking Active", done: lead.milestones.conciergeActive },
              ].map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onToggleMilestone && onToggleMilestone(lead.id, m.key)}
                  className="w-full flex items-center gap-2.5 text-xs text-[#FDFBF7] p-2 rounded-lg hover:bg-[#242424] transition-colors text-left cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 transition-transform group-hover:scale-110 ${
                      m.done
                        ? "bg-emerald-500 text-black font-bold shadow-sm"
                        : "bg-[#2A2A2A] text-[#71717A] border border-[#3A3A3A]"
                    }`}
                  >
                    {m.done ? "✓" : idx + 1}
                  </div>
                  <span className={m.done ? "text-[#FDFBF7] font-medium" : "text-[#71717A] group-hover:text-[#A1A1AA]"}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Confidential Internal Notes */}
          <div className="p-3.5 sm:p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold">
                Internal Confidential Notes (Private to Founders)
              </h4>
              {isSavedAlert && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add confidential notes on dietary nuances, palace GM instructions, or chauffeur fleet details..."
              className="w-full bg-[#171717] text-xs text-[#FDFBF7] p-3 rounded-lg border border-[#2A2A2A] focus:outline-none focus:border-[#C5A059] leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-[#111111] font-semibold text-xs cursor-pointer shadow-md transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Private Note</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#242424] bg-[#191919] flex justify-between items-center text-xs">
          <span className="text-[#71717A]">
            Lead ID: <strong className="font-mono text-[#FDFBF7]">{lead.referenceCode}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#2C2C2C] text-[#FDFBF7] cursor-pointer transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
