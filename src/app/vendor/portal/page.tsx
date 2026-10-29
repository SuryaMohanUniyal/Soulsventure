"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Hotel,
  Car,
  Compass,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Phone,
  MessageCircle,
  Sparkles,
  Calendar,
  Utensils,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import {
  PartnerTieUp,
  CRMLead,
  getVendorAuthSession,
  getStoredLeads,
  updateVendorBookingStatus,
  getStoredPartners,
} from "@/lib/crmStore";

export default function VendorPortalPage() {
  const router = useRouter();
  const [partner, setPartner] = useState<PartnerTieUp | null>(null);
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncToast, setSyncToast] = useState("");

  // Local state for vendor edits on lead cards
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    const session = getVendorAuthSession();
    if (!session) {
      router.push("/vendor/login");
      return;
    }
    setPartner(session);
    loadLeads(session);
  }, [router]);

  const loadLeads = (currentPartner: PartnerTieUp) => {
    setLoading(true);
    const allLeads = getStoredLeads();
    setLeads(allLeads);

    // Initialize drafts
    const initialStatuses: Record<string, string> = {};
    const initialNotes: Record<string, string> = {};

    allLeads.forEach((lead) => {
      const assignment = lead.vendorAssignments?.[currentPartner.role as "hotel" | "driver" | "guide"];
      if (assignment) {
        initialStatuses[lead.id] = assignment.status;
        initialNotes[lead.id] = assignment.notes || "";
      } else {
        initialStatuses[lead.id] =
          currentPartner.role === "hotel"
            ? "Pending Confirmation"
            : currentPartner.role === "driver"
            ? "Pending Dispatch"
            : "Pending Assignment";
        initialNotes[lead.id] = "";
      }
    });

    setStatusDrafts(initialStatuses);
    setNotesDrafts(initialNotes);
    setLoading(false);
  };

  const handleUpdateStatus = (leadId: string, newStatus: string) => {
    if (!partner) return;

    setStatusDrafts((prev) => ({ ...prev, [leadId]: newStatus }));
    const currentNotes = notesDrafts[leadId] || "";

    const updated = updateVendorBookingStatus(
      leadId,
      partner.role as "hotel" | "driver" | "guide",
      newStatus,
      currentNotes
    );
    setLeads(updated);

    setSyncToast(
      `Status updated to "${newStatus}"! Instantly synced to SoulsVenture Admin CRM.`
    );
    setTimeout(() => setSyncToast(""), 4500);
  };

  const handleSaveNotes = (leadId: string) => {
    if (!partner) return;

    const currentStatus = statusDrafts[leadId] || "Accepted";
    const currentNotes = notesDrafts[leadId] || "";

    const updated = updateVendorBookingStatus(
      leadId,
      partner.role as "hotel" | "driver" | "guide",
      currentStatus,
      currentNotes
    );
    setLeads(updated);

    setSyncToast(`Notes saved and synced to Admin Operations.`);
    setTimeout(() => setSyncToast(""), 3500);
  };

  if (loading || !partner) {
    return (
      <div className="py-24 text-center space-y-3 font-mono text-xs text-[#71717A]">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#C5A059]" />
        <p>Loading your partner dashboard...</p>
      </div>
    );
  }

  // Filter bookings relevant to this partner:
  // 1) Leads assigned specifically to this partner ID
  // 2) Or leads where destinations match the partner's region
  const partnerRole = partner.role as "hotel" | "driver" | "guide" | "activity";

  const assignedLeads = leads.filter((lead) => {
    const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
    return assignment && (assignment.partnerId === partner.id || assignment.partnerName === partner.name);
  });

  // Prospective / regional leads for this role
  const prospectiveLeads = leads.filter((lead) => {
    const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
    const notDirectlyAssigned = !assignment || assignment.partnerId !== partner.id;
    const regionMatches =
      partner.region.toLowerCase().includes("pan-india") ||
      lead.destinations.some((d) => partner.region.toLowerCase().includes(d.toLowerCase())) ||
      partner.region.toLowerCase().includes(lead.destinationSummary.toLowerCase());
    return notDirectlyAssigned && (regionMatches || assignedLeads.length < 2);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1C1C1C] via-[#161616] to-[#121212] border border-[#2D2D2D] relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                {partner.role === "hotel" && <Hotel className="w-3.5 h-3.5" />}
                {partner.role === "driver" && <Car className="w-3.5 h-3.5 text-sky-400" />}
                {partner.role === "guide" && <Compass className="w-3.5 h-3.5 text-emerald-400" />}
                {partner.role === "activity" && <Plane className="w-3.5 h-3.5 text-purple-400" />}
                <span>
                  {partner.role === "hotel"
                    ? "Hotel & Resort Partner"
                    : partner.role === "driver"
                    ? "Chauffeur & Luxury Fleet Dispatch"
                    : partner.role === "guide"
                    ? "Licensed Tour Guide Schedule"
                    : "Activity & Excursion Operator"}
                </span>
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">
                Operating Region: {partner.region}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
              Welcome, {partner.contactPerson} ({partner.name})
            </h1>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-2xl">
              {partner.serviceOrAssets} • Phone ID: <span className="font-mono text-[#C5A059]">{partner.loginPhone || partner.phone}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => loadLeads(partner)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-[#D4D4D8] border border-[#333333] text-xs font-mono transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Refresh Allocations</span>
            </button>

            <a
              href={`https://wa.me/919820144521?text=${encodeURIComponent(
                `Namaste Suraj & Harsh. This is ${partner.name}. Reaching out regarding our active SoulsVenture allocation.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 font-serif font-medium text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge Ops</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sync Toast Notification */}
      {syncToast && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2.5 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Role-Specific Metrics Grid */}
      {partner.role === "hotel" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Guests</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{assignedLeads.length || 2}</div>
            <span className="text-[10px] text-[#C5A059] font-mono mt-0.5 block">Active Room Allocations</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Suite Tier</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Kohinoor & Royal Palace</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">High Floor Lake Sanctuary</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Dietary Alerts</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">100%</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Pure Veg & Farm-to-Table</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Contract Settlement</span>
            <div className="text-sm font-serif text-[#C5A059] mt-2 font-mono">{partner.negotiatedTariff}</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">{partner.paymentTerms}</span>
          </div>
        </div>
      )}

      {partner.role === "driver" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Routes</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{assignedLeads.length || 2}</div>
            <span className="text-[10px] text-sky-400 font-mono mt-0.5 block">Airport & Intercity Dispatches</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Fleet Assigned</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Defender 4WD & Crysta ZX</div>
            <span className="text-[10px] text-sky-400 font-mono mt-0.5 block">Spotless Luxury Spec</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Pickup Protocol</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Arrival Gate Placard</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Cold Towels & Water Ready</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Chauffeur Tariff</span>
            <div className="text-sm font-serif text-[#C5A059] mt-2 font-mono">{partner.negotiatedTariff}</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">{partner.paymentTerms}</span>
          </div>
        </div>
      )}

      {partner.role === "guide" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Tours</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{assignedLeads.length || 2}</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">VIP Private Excursions</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Monuments & Sites</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Palaces & Heritage Walks</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">After-Hours Private Access</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Language Fluency</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2">English & French</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">ASI Senior Historian</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Guide Tariff</span>
            <div className="text-sm font-serif text-[#C5A059] mt-2 font-mono">{partner.negotiatedTariff}</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">{partner.paymentTerms}</span>
          </div>
        </div>
      )}

      {/* Main Bookings & Dispatches Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
              {partner.role === "hotel"
                ? "Guest Room Allocations & Stays"
                : partner.role === "driver"
                ? "Chauffeur Pickups & Route Dispatches"
                : partner.role === "guide"
                ? "Tour Excursions & Heritage Walks"
                : "Assigned Activity Bookings"}
            </h2>
            <p className="text-xs text-[#888888] mt-0.5">
              Review guest names, travel dates, special dietary requests, and update your live operational status.
            </p>
          </div>
          <span className="text-xs font-mono text-[#C5A059]">
            {leads.length} Total Curated Bookings
          </span>
        </div>

        {/* Booking Cards Loop */}
        <div className="grid grid-cols-1 gap-5">
          {leads.map((lead) => {
            const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
            const currentStatus =
              statusDrafts[lead.id] ||
              assignment?.status ||
              (partner.role === "hotel"
                ? "Pending Confirmation"
                : partner.role === "driver"
                ? "Pending Dispatch"
                : "Pending Assignment");
            const currentNotes = notesDrafts[lead.id] ?? (assignment?.notes || "");

            const isDirectlyAssigned = assignment?.partnerId === partner.id;

            return (
              <div
                key={lead.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isDirectlyAssigned
                    ? "bg-[#181818] border-[#C5A059]/40 shadow-xl"
                    : "bg-[#151515] border-[#292929]"
                }`}
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#262626] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#222222] text-[#A1A1AA] border border-[#333333]">
                        {lead.referenceCode}
                      </span>
                      {lead.isVIP && (
                        <span className="px-2 py-0.5 rounded text-[9px] bg-[#C5A059] text-black font-bold uppercase tracking-wider">
                          VIP GUEST
                        </span>
                      )}
                      {isDirectlyAssigned && (
                        <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                          ✓ Assigned to You
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                      {lead.clientName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#888888]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                        {lead.destinationSummary}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                        {lead.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                        {lead.companions} {lead.familyAges ? `(${lead.familyAges})` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown Pill */}
                  <div className="flex flex-col items-start sm:items-end gap-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#71717A]">
                      Your Live Status:
                    </span>
                    <select
                      value={currentStatus}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                      className={`text-xs font-mono font-semibold rounded-lg px-3 py-1.5 border appearance-none cursor-pointer focus:outline-none transition-colors ${
                        currentStatus === "Accepted" ||
                        currentStatus === "Room Suite Reserved" ||
                        currentStatus === "VIP Welcome Ready" ||
                        currentStatus === "Vehicle Prepped & Fueled" ||
                        currentStatus === "At Airport Pickup Gate" ||
                        currentStatus === "Tour Briefing Complete" ||
                        currentStatus === "On-Ground With Guests"
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                          : currentStatus.includes("Completed")
                          ? "bg-purple-950/80 text-purple-300 border-purple-800"
                          : "bg-amber-950/80 text-amber-300 border-amber-800"
                      }`}
                    >
                      {partner.role === "hotel" && (
                        <>
                          <option value="Pending Confirmation" className="bg-[#1A1A1A]">Pending Confirmation</option>
                          <option value="Accepted" className="bg-[#1A1A1A]">Accepted by Reservations</option>
                          <option value="Room Suite Reserved" className="bg-[#1A1A1A]">Room Suite Reserved</option>
                          <option value="VIP Welcome Ready" className="bg-[#1A1A1A]">VIP Welcome Ready (Flowers & Champagne)</option>
                          <option value="Checked-In" className="bg-[#1A1A1A]">Guest Checked-In</option>
                        </>
                      )}
                      {partner.role === "driver" && (
                        <>
                          <option value="Pending Dispatch" className="bg-[#1A1A1A]">Pending Dispatch</option>
                          <option value="Accepted" className="bg-[#1A1A1A]">Accepted by Chauffeur</option>
                          <option value="Vehicle Prepped & Fueled" className="bg-[#1A1A1A]">Vehicle Prepped & Fueled</option>
                          <option value="At Airport Pickup Gate" className="bg-[#1A1A1A]">At Airport Pickup Gate</option>
                          <option value="Transfer Completed" className="bg-[#1A1A1A]">Transfer Completed</option>
                        </>
                      )}
                      {partner.role === "guide" && (
                        <>
                          <option value="Pending Assignment" className="bg-[#1A1A1A]">Pending Assignment</option>
                          <option value="Accepted" className="bg-[#1A1A1A]">Accepted by Tour Guide</option>
                          <option value="Tour Briefing Complete" className="bg-[#1A1A1A]">Tour Briefing Complete</option>
                          <option value="On-Ground With Guests" className="bg-[#1A1A1A]">On-Ground With Guests</option>
                          <option value="Excursion Completed" className="bg-[#1A1A1A]">Excursion Completed</option>
                        </>
                      )}
                      {partner.role === "activity" && (
                        <>
                          <option value="Pending Slot" className="bg-[#1A1A1A]">Pending Slot</option>
                          <option value="Accepted" className="bg-[#1A1A1A]">Accepted & Scheduled</option>
                          <option value="Excursion Completed" className="bg-[#1A1A1A]">Completed</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Card Details Body (Role-Specific) */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Column 1: Specific Requirements */}
                  <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block">
                      {partner.role === "hotel"
                        ? "Room & Suite Preference"
                        : partner.role === "driver"
                        ? "Vehicle & Pickup Specs"
                        : "Excursion Highlights"}
                    </span>
                    <p className="text-[#FDFBF7] font-medium leading-relaxed">
                      {partner.role === "hotel"
                        ? lead.clientNuances?.roomPreferences?.join(", ") || "Highest Floor Palace Lake Suite"
                        : partner.role === "driver"
                        ? lead.assignedVehicle || "Land Rover Defender 110 4WD Spec"
                        : "Private City Palace walk & Lake Pichola sunset royal cruise"}
                    </p>
                    <span className="text-[10px] text-[#71717A] block">
                      Budget Tier: {lead.budgetTier}
                    </span>
                  </div>

                  {/* Column 2: Dietary & Nuances */}
                  <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block">
                      Dietary & Hospitality Nuances
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(lead.clientNuances?.dietaryRestrictions || ["Pure Vegetarian Preferred"]).map((d, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-[#1E1E1E] text-emerald-300 border border-emerald-900/40">
                          {d}
                        </span>
                      ))}
                    </div>
                    {lead.clientNuances?.beveragePreferences && (
                      <p className="text-[10px] text-[#A1A1AA] mt-1">
                        Beverage: {lead.clientNuances.beveragePreferences.join(", ")}
                      </p>
                    )}
                  </div>

                  {/* Column 3: Curator Direct Contact */}
                  <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block">
                      SoulsVenture Lead Curator
                    </span>
                    <p className="text-[#FDFBF7] font-medium">
                      {lead.assignedCurator}
                    </p>
                    <span className="text-[10px] text-[#888888] block">
                      Director of Bespoke Concierge
                    </span>
                    <a
                      href={`https://wa.me/919820144521?text=${encodeURIComponent(
                        `Namaste ${lead.assignedCurator}. This is ${partner.name}. Re: Guest ${lead.clientName} (${lead.referenceCode}). Current status: ${currentStatus}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:underline pt-0.5"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Message Curator on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Card Footer: Partner Notes & Save */}
                <div className="pt-3 border-t border-[#262626] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={
                        partner.role === "hotel"
                          ? "Add internal hotel note (e.g. Room 204 allocated with lake view, fruit basket set)"
                          : partner.role === "driver"
                          ? "Add driver note (e.g. Defender cleaned, holding placard at Gate 2)"
                          : "Add guide note (e.g. Private heritage walk route confirmed for 10:00 AM)"
                      }
                      value={currentNotes}
                      onChange={(e) =>
                        setNotesDrafts((prev) => ({ ...prev, [lead.id]: e.target.value }))
                      }
                      className="w-full bg-[#121212] border border-[#333333] rounded-lg px-3 py-2 text-xs text-[#FDFBF7] placeholder-[#666] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveNotes(lead.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-[#FDFBF7] border border-[#333333] rounded-lg font-serif text-xs transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Save Notes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(lead.id, currentStatus)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#C5A059] to-[#b08e48] hover:from-[#d8b368] hover:to-[#be9b52] text-black font-semibold rounded-lg font-serif text-xs transition-all shadow-md cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Sync Live Status</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
