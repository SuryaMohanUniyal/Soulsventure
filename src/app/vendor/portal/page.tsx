"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Coffee,
  Wine,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Eye,
  Info,
  CalendarDays,
  ListFilter,
  BadgeAlert,
  ArrowRight,
} from "lucide-react";
import {
  PartnerTieUp,
  CRMLead,
  getVendorAuthSession,
  clearVendorAuthSession,
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

  // View state: calendar vs dossiers
  const [viewMode, setViewMode] = useState<"calendar" | "dossiers">("calendar");
  const [selectedMonth, setSelectedMonth] = useState<"2026-11" | "2026-12">("2026-11");
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-14");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMenuLeadId, setExpandedMenuLeadId] = useState<string | null>("lead-sharma-2026");

  // Local state for vendor edits on lead cards
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    const session = getVendorAuthSession();
    if (!session) {
      window.location.href = "/vendor/login";
      return;
    }
    setPartner(session);
    loadLeads(session);
  }, []);

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

  // Filter leads by search query and role relevance
  const filteredLeads = useMemo(() => {
    if (!partner) return [];
    return leads.filter((lead) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.clientName.toLowerCase().includes(q) ||
        lead.referenceCode.toLowerCase().includes(q) ||
        lead.destinationSummary.toLowerCase().includes(q) ||
        (lead.arrivalDetails?.flightOrTrain || "").toLowerCase().includes(q)
      );
    });
  }, [leads, partner, searchQuery]);

  // Calendar grid computation for November or December 2026
  const calendarDays = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(year, month, 0).getDate();

    const days: Array<{ dayNumber: number; dateStr: string; isCurrentMonth: boolean }> = [];

    // Padding for previous month
    const prevMonthTotal = new Date(year, month - 1, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = prevMonthTotal - i;
      const prevMonth = month - 1 === 0 ? 12 : month - 1;
      const prevYear = month - 1 === 0 ? year - 1 : year;
      days.push({
        dayNumber: day,
        dateStr: `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({ dayNumber: d, dateStr, isCurrentMonth: true });
    }

    // Padding for next month
    const remaining = (7 - (days.length % 7)) % 7;
    const nextMonth = month + 1 === 13 ? 1 : month + 1;
    const nextYear = month + 1 === 13 ? year + 1 : year;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        dayNumber: i,
        dateStr: `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [selectedMonth]);

  // Map of date string -> operational events for this partner
  const dateEventsMap = useMemo(() => {
    const map: Record<string, Array<{ lead: CRMLead; type: "arrival" | "stay" | "departure" | "tour"; label: string; time?: string }>> = {};

    filteredLeads.forEach((lead) => {
      const arrDate = lead.arrivalDetails?.arrivalDate;
      const depDate = lead.arrivalDetails?.checkOutDate;

      // Arrival day
      if (arrDate) {
        if (!map[arrDate]) map[arrDate] = [];
        map[arrDate].push({
          lead,
          type: "arrival",
          label: `Arrival: ${lead.clientName.split(" ")[0]} ${lead.clientName.split(" ")[1] || ""}`,
          time: lead.arrivalDetails?.arrivalTime,
        });
      }

      // Departure day
      if (depDate) {
        if (!map[depDate]) map[depDate] = [];
        map[depDate].push({
          lead,
          type: "departure",
          label: `Check-out: ${lead.clientName.split(" ")[0]}`,
          time: lead.arrivalDetails?.checkOutTime,
        });
      }

      // Gourmet menu days (active stays)
      lead.gourmetMenuPlan?.forEach((menuDay) => {
        if (menuDay.date && menuDay.date !== arrDate && menuDay.date !== depDate) {
          if (!map[menuDay.date]) map[menuDay.date] = [];
          map[menuDay.date].push({
            lead,
            type: "stay",
            label: `Board: ${menuDay.dayTitle.substring(0, 22)}...`,
            time: "Dinner Menu",
          });
        }
      });
    });

    return map;
  }, [filteredLeads]);

  // Bookings active on selectedDate
  const selectedDateBookings = useMemo(() => {
    if (!selectedDate) return [];
    return filteredLeads.filter((lead) => {
      const arr = lead.arrivalDetails?.arrivalDate;
      const dep = lead.arrivalDetails?.checkOutDate;
      const inMenu = lead.gourmetMenuPlan?.some((m) => m.date === selectedDate);
      return arr === selectedDate || dep === selectedDate || inMenu;
    });
  }, [filteredLeads, selectedDate]);

  if (loading || !partner) {
    return (
      <div className="py-24 text-center space-y-3 font-mono text-xs text-[#71717A]">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#C5A059]" />
        <p>Loading your partner dashboard...</p>
      </div>
    );
  }

  const partnerRole = partner.role as "hotel" | "driver" | "guide" | "activity";
  const assignedLeads = leads.filter((lead) => {
    const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
    return assignment && (assignment.partnerId === partner.id || assignment.partnerName === partner.name);
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

            <button
              onClick={() => {
                clearVendorAuthSession();
                window.location.href = "/vendor/login";
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/50 text-xs font-mono transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
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
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{assignedLeads.length || 3}</div>
            <span className="text-[10px] text-[#C5A059] font-mono mt-0.5 block">Active Room Allocations</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Suite Tier</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Kohinoor & Royal Palace</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">High Floor Lake Sanctuary</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Dietary Alerts</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">100% Pure Veg & Jain</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Chef's Menu Cards Active</span>
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
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{assignedLeads.length || 4}</div>
            <span className="text-[10px] text-sky-400 font-mono mt-0.5 block">Airport & Intercity Dispatches</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Fleet Assigned</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Defender 110 & Maybach</div>
            <span className="text-[10px] text-sky-400 font-mono mt-0.5 block">VIP Chauffeur Livery</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Arrival Tarmac Gates</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Gate 2 & VIP Terminal</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Name Placard & Cold Towels</span>
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
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{assignedLeads.length || 3}</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Exclusive Monument Access</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Monuments & Sites</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">City Palace & Royal Vaults</div>
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

      {/* Main Operations Control: Mode Switcher, Month Toggle & Search */}
      <div className="p-5 rounded-2xl bg-[#161616] border border-[#262626] space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#101010] border border-[#2A2A2A] rounded-xl">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                viewMode === "calendar"
                  ? "bg-[#C5A059] text-black font-semibold shadow-md"
                  : "text-[#A1A1AA] hover:text-[#FDFBF7] hover:bg-[#1C1C1C]"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Interactive Calendar View</span>
            </button>
            <button
              onClick={() => setViewMode("dossiers")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                viewMode === "dossiers"
                  ? "bg-[#C5A059] text-black font-semibold shadow-md"
                  : "text-[#A1A1AA] hover:text-[#FDFBF7] hover:bg-[#1C1C1C]"
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span>Master Booking Dossiers ({filteredLeads.length})</span>
            </button>
          </div>

          {/* Month Switcher & Search */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-[#101010] border border-[#2A2A2A] rounded-xl p-1 text-xs font-mono">
              <button
                onClick={() => {
                  setSelectedMonth("2026-11");
                  setSelectedDate("2026-11-14");
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedMonth === "2026-11"
                    ? "bg-[#252525] text-[#C5A059] font-bold border border-[#C5A059]/40"
                    : "text-[#71717A] hover:text-[#D4D4D8]"
                }`}
              >
                November 2026
              </button>
              <button
                onClick={() => {
                  setSelectedMonth("2026-12");
                  setSelectedDate("2026-12-02");
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedMonth === "2026-12"
                    ? "bg-[#252525] text-[#C5A059] font-bold border border-[#C5A059]/40"
                    : "text-[#71717A] hover:text-[#D4D4D8]"
                }`}
              >
                December 2026
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="text"
                placeholder="Filter bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#101010] border border-[#2A2A2A] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#FDFBF7] font-mono placeholder-[#555] focus:outline-none focus:border-[#C5A059] w-36 sm:w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: INTERACTIVE CALENDAR GRID WITH FULL GOURMET MENU & ARRIVAL TIMINGS */}
      {/* ========================================================================= */}
      {viewMode === "calendar" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-2xl bg-[#161616] border border-[#262626] shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#C5A059]" />
                  <span>
                    Operations Calendar & Date-Wise Booking Schedule (
                    {selectedMonth === "2026-11" ? "November 2026" : "December 2026"})
                  </span>
                </h2>
                <p className="text-xs text-[#888888] mt-0.5">
                  Click on any marked date to inspect full guest arrival times, flight details, room vouchers, chauffeur dispatches, and day-by-day gourmet dining menus.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-[#C5A059]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                  Arrival
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Full Board Menu
                </span>
                <span className="flex items-center gap-1.5 text-sky-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Chauffeur
                </span>
                <span className="flex items-center gap-1.5 text-rose-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Check-out
                </span>
              </div>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-xs font-mono font-bold text-[#71717A] uppercase tracking-wider py-1 border-b border-[#222]">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* 7-Column Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((cd, index) => {
                const events = dateEventsMap[cd.dateStr] || [];
                const isSelected = selectedDate === cd.dateStr;
                const hasEvents = events.length > 0;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => cd.isCurrentMonth && setSelectedDate(cd.dateStr)}
                    disabled={!cd.isCurrentMonth}
                    className={`min-h-[85px] sm:min-h-[105px] p-2 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                      !cd.isCurrentMonth
                        ? "bg-[#111111]/40 border-transparent text-[#444] cursor-not-allowed opacity-30"
                        : isSelected
                        ? "bg-[#222019] border-[#C5A059] shadow-lg shadow-[#C5A059]/10 ring-2 ring-[#C5A059]/40"
                        : hasEvents
                        ? "bg-[#1A1A1A] hover:bg-[#202020] border-[#333333] hover:border-[#C5A059]/60"
                        : "bg-[#131313] hover:bg-[#181818] border-[#222222] text-[#666]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isSelected
                            ? "text-[#C5A059]"
                            : hasEvents
                            ? "text-[#FDFBF7]"
                            : "text-[#71717A]"
                        }`}
                      >
                        {cd.dayNumber}
                      </span>
                      {hasEvents && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                      )}
                    </div>

                    {/* Event Badges in Cell */}
                    <div className="space-y-1 w-full my-1">
                      {events.slice(0, 2).map((ev, i) => (
                        <div
                          key={i}
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded truncate border leading-tight ${
                            ev.type === "arrival"
                              ? "bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/40 font-semibold"
                              : ev.type === "departure"
                              ? "bg-rose-950/60 text-rose-300 border-rose-800"
                              : ev.type === "tour"
                              ? "bg-purple-950/60 text-purple-300 border-purple-800"
                              : "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                          }`}
                        >
                          {ev.label}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <span className="text-[8px] font-mono text-[#A1A1AA] block">
                          +{events.length - 2} more operations
                        </span>
                      )}
                    </div>

                    <div className="text-[9px] font-mono text-[#555] truncate">
                      {hasEvents ? `${events.length} schedule(s)` : ""}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Operations & Gastronomy Briefing */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#181818] border border-[#2D2D2D] shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#282828] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 text-xs font-mono uppercase font-semibold">
                    Date Operational Briefing
                  </span>
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    {selectedDateBookings.length} Active Booking(s) on this date
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7] mt-1">
                  Schedule for:{" "}
                  <span className="text-[#C5A059]">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#71717A]">
                  Active Selected Day: {selectedDate}
                </span>
              </div>
            </div>

            {selectedDateBookings.length === 0 ? (
              <div className="py-12 text-center space-y-2 border border-dashed border-[#2A2A2A] rounded-xl">
                <Calendar className="w-8 h-8 mx-auto text-[#555]" />
                <p className="font-serif text-sm text-[#888]">
                  No VIP arrivals or scheduled dispatches on this particular date.
                </p>
                <p className="text-xs text-[#555] font-mono">
                  Select another highlighted day on the calendar (e.g. Nov 14, 15, 18 or Dec 02, 10).
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedDateBookings.map((lead) => {
                  const arr = lead.arrivalDetails;
                  const isArrivalDay = arr?.arrivalDate === selectedDate;
                  const isDepartureDay = arr?.checkOutDate === selectedDate;
                  const menuDay = lead.gourmetMenuPlan?.find((m) => m.date === selectedDate);
                  const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
                  const currentStatus =
                    statusDrafts[lead.id] ||
                    assignment?.status ||
                    (partner.role === "hotel"
                      ? "Room Suite Reserved"
                      : partner.role === "driver"
                      ? "Vehicle Prepped & Fueled"
                      : "Accepted by Tour Guide");
                  const currentNotes = notesDrafts[lead.id] ?? (assignment?.notes || "");

                  return (
                    <div
                      key={lead.id}
                      className="p-5 sm:p-6 rounded-2xl bg-[#131313] border border-[#2B2B2B] hover:border-[#C5A059]/50 transition-all space-y-5 shadow-lg"
                    >
                      {/* Booking Dossier Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#242424] pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#1F1F1F] text-[#C5A059] border border-[#333]">
                              {lead.referenceCode}
                            </span>
                            {lead.isVIP && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#C5A059] text-black font-bold uppercase font-mono">
                                ★ TIER-1 VIP GUEST
                              </span>
                            )}
                            {isArrivalDay && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 font-mono font-bold uppercase animate-pulse">
                                🛬 ARRIVAL DAY
                              </span>
                            )}
                            {isDepartureDay && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-mono font-bold uppercase">
                                🛫 CHECKOUT DAY
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                            {lead.clientName}
                          </h4>
                          <p className="text-xs text-[#888888] flex items-center gap-2">
                            <span>{lead.companions} {lead.familyAges ? `(${lead.familyAges})` : ""}</span>
                            <span>•</span>
                            <span>Curator: <strong className="text-[#D4D4D8]">{lead.assignedCurator}</strong></span>
                            <span>•</span>
                            <span className="text-[#C5A059] font-mono">{lead.budgetTier}</span>
                          </p>
                        </div>

                        {/* Status Updater */}
                        <div className="flex flex-col items-start sm:items-end gap-1.5">
                          <span className="text-[10px] font-mono uppercase text-[#71717A]">
                            Your Live Operational Status:
                          </span>
                          <select
                            value={currentStatus}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                            className="text-xs font-mono font-semibold rounded-lg px-3 py-1.5 bg-[#1F1F1F] text-[#C5A059] border border-[#C5A059]/50 focus:outline-none cursor-pointer"
                          >
                            {partner.role === "hotel" && (
                              <>
                                <option value="Pending Confirmation">Pending Confirmation</option>
                                <option value="Accepted">Accepted by Reservations</option>
                                <option value="Room Suite Reserved">Room Suite Reserved</option>
                                <option value="VIP Welcome Ready">VIP Welcome Ready (Flowers & Champagne)</option>
                                <option value="Checked-In">Guest Checked-In</option>
                                <option value="Checked-Out">Guest Checked-Out</option>
                              </>
                            )}
                            {partner.role === "driver" && (
                              <>
                                <option value="Pending Dispatch">Pending Dispatch</option>
                                <option value="Accepted">Accepted by Chauffeur</option>
                                <option value="Vehicle Prepped & Fueled">Vehicle Prepped & Fueled</option>
                                <option value="At Airport Pickup Gate">At Airport Pickup Gate</option>
                                <option value="Transfer Completed">Transfer Completed</option>
                              </>
                            )}
                            {partner.role === "guide" && (
                              <>
                                <option value="Pending Assignment">Pending Assignment</option>
                                <option value="Accepted">Accepted by Tour Guide</option>
                                <option value="Tour Briefing Complete">Tour Briefing Complete</option>
                                <option value="On-Ground With Guests">On-Ground With Guests</option>
                                <option value="Excursion Completed">Excursion Completed</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>

                      {/* 1. Arrival & Departure Timings Timeline */}
                      {arr && (
                        <div className="p-4 rounded-xl bg-[#171717] border border-[#262626] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              Exact Inbound Flight, Chauffeur & Check-In Timings
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                              Confirmed Flight & Transfer Slot
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Inbound Flight / Mode</span>
                              <p className="font-serif text-[#FDFBF7] font-medium">{arr.flightOrTrain || "Private Luxury Transfer"}</p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Arrival Time</span>
                              <p className="font-mono text-[#C5A059] font-bold">{arr.arrivalTime}</p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Chauffeur Reporting Window</span>
                              <p className="font-mono text-sky-400 font-medium">{arr.pickupReportingTime}</p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Suite Check-In / Check-Out</span>
                              <p className="font-mono text-emerald-300">In: {arr.checkInTime} • Out: {arr.checkOutTime}</p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#A1A1AA] gap-2">
                            <span>
                              <strong>Arrival Gate / Jetty:</strong> {arr.terminalGate}
                            </span>
                            <span>
                              <strong>VIP Protocol:</strong> {arr.transferProtocol}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 2. Full Gourmet Menu of the Selected Day */}
                      <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2A2A2A] space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                            <Utensils className="w-3.5 h-3.5" />
                            Full Gourmet Gastronomy Plan for this Date ({selectedDate})
                          </span>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                            100% Pure Veg / Jain & Allergen Verified
                          </span>
                        </div>

                        {menuDay ? (
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                            {/* Breakfast */}
                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Coffee className="w-3 h-3" />
                                Breakfast / Welcome
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">
                                {menuDay.breakfast}
                              </p>
                            </div>

                            {/* Lunch */}
                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Utensils className="w-3 h-3" />
                                Royal Lunch
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">
                                {menuDay.lunch}
                              </p>
                            </div>

                            {/* High Tea */}
                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Coffee className="w-3 h-3" />
                                Royal Sunset High-Tea
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">
                                {menuDay.highTea || "Kashmiri Kahwa & Pistachio Baklava at Sunset"}
                              </p>
                            </div>

                            {/* Dinner */}
                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Wine className="w-3 h-3" />
                                Evening Dinner & Banquet
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">
                                {menuDay.dinner}
                              </p>
                              {menuDay.winePairing && (
                                <p className="text-[10px] text-amber-300 font-mono mt-1 pt-1 border-t border-[#222]">
                                  Pairing: {menuDay.winePairing}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-[#111111] text-xs text-[#888] font-serif">
                            Full bespoke menu active for this trip. Check the complete itinerary below or refer to the lead curator.
                          </div>
                        )}

                        {/* Dietary Directives Pill Banner */}
                        <div className="p-2.5 rounded-lg bg-[#121212] border border-[#222] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
                              Dietary Directives:
                            </span>
                            <span className="text-emerald-300 font-mono text-[11px]">
                              {menuDay?.dietaryNotes || lead.clientNuances?.dietaryRestrictions.join(" • ")}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#888] font-mono">
                            Beverages: {lead.clientNuances?.beveragePreferences.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* 3. Role-Specific Specs & Direct Notes */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1">
                          <span className="text-[10px] font-mono uppercase text-[#C5A059] block">
                            Assigned Suite / Asset
                          </span>
                          <p className="text-[#FDFBF7] font-medium">
                            {lead.clientNuances?.roomPreferences?.join(", ") || "Kohinoor Lake View Suite #204"}
                          </p>
                          <span className="text-[10px] text-[#71717A] block">
                            High Floor • Lake Sanctuary • Private Pool
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1">
                          <span className="text-[10px] font-mono uppercase text-[#C5A059] block">
                            Assigned Fleet & Chauffeur
                          </span>
                          <p className="text-[#FDFBF7] font-medium">
                            {lead.assignedVehicle || "Land Rover Defender 110 4WD"}
                          </p>
                          <span className="text-[10px] text-[#71717A] block">
                            Lead Chauffeur: {lead.assignedChauffeur || "Vikram Singh (Fleet Lead)"}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1">
                          <span className="text-[10px] font-mono uppercase text-[#C5A059] block">
                            Curator Direct Contact
                          </span>
                          <p className="text-[#FDFBF7] font-medium">
                            {lead.assignedCurator} (SoulsVenture)
                          </p>
                          <a
                            href={`https://wa.me/919820144521?text=${encodeURIComponent(
                              `Namaste ${lead.assignedCurator}. This is ${partner.name}. Checking in regarding guest ${lead.clientName} (${lead.referenceCode}) scheduled for ${selectedDate}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:underline pt-0.5"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Curator Direct</span>
                          </a>
                        </div>
                      </div>

                      {/* Card Footer: Partner Notes & Sync */}
                      <div className="pt-3 border-t border-[#242424] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Add partner note (e.g. Suite 204 lake facing set, garland arrival ready)..."
                            value={currentNotes}
                            onChange={(e) =>
                              setNotesDrafts((prev) => ({ ...prev, [lead.id]: e.target.value }))
                            }
                            className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-xs text-[#FDFBF7] placeholder-[#666] focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveNotes(lead.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-[#FDFBF7] border border-[#333333] rounded-lg font-serif text-xs transition-colors cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Save Note</span>
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
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: MASTER BOOKING DOSSIERS (DETAILED FEED VIEW WITH EXPANDABLE MENU)  */}
      {/* ========================================================================= */}
      {viewMode === "dossiers" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                Master Booking Dossiers & Full Itinerary Allocations
              </h2>
              <p className="text-xs text-[#888888] mt-0.5">
                Review assigned VIP guests, scheduled travel dates, exact airport arrival times, and day-by-day fine dining gourmet menus.
              </p>
            </div>
            <span className="text-xs font-mono text-[#C5A059]">
              {filteredLeads.length} Curated Bookings Available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredLeads.map((lead) => {
              const arr = lead.arrivalDetails;
              const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
              const currentStatus =
                statusDrafts[lead.id] ||
                assignment?.status ||
                (partner.role === "hotel"
                  ? "Room Suite Reserved"
                  : partner.role === "driver"
                  ? "Vehicle Prepped & Fueled"
                  : "Accepted by Tour Guide");
              const currentNotes = notesDrafts[lead.id] ?? (assignment?.notes || "");
              const isDirectlyAssigned = assignment?.partnerId === partner.id;
              const isMenuExpanded = expandedMenuLeadId === lead.id;

              return (
                <div
                  key={lead.id}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                    isDirectlyAssigned
                      ? "bg-[#181818] border-[#C5A059]/50 shadow-2xl"
                      : "bg-[#141414] border-[#292929]"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#262626] pb-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#222222] text-[#A1A1AA] border border-[#333333]">
                          {lead.referenceCode}
                        </span>
                        {lead.isVIP && (
                          <span className="px-2.5 py-0.5 rounded text-[10px] bg-[#C5A059] text-black font-bold uppercase tracking-wider font-mono">
                            ★ TIER-1 VIP GUEST
                          </span>
                        )}
                        {isDirectlyAssigned && (
                          <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-medium">
                            ✓ Assigned to Your Account
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
                        {lead.clientName}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#888888]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                          {lead.destinationSummary}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-[#D4D4D8]">
                          <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                          {lead.travelWindow}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                          {lead.companions}
                        </span>
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex flex-col items-start sm:items-end gap-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#71717A]">
                        Live Status:
                      </span>
                      <select
                        value={currentStatus}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className="text-xs font-mono font-semibold rounded-lg px-3 py-1.5 bg-[#1F1F1F] text-[#C5A059] border border-[#C5A059]/40 focus:outline-none cursor-pointer"
                      >
                        {partner.role === "hotel" && (
                          <>
                            <option value="Pending Confirmation">Pending Confirmation</option>
                            <option value="Accepted">Accepted by Reservations</option>
                            <option value="Room Suite Reserved">Room Suite Reserved</option>
                            <option value="VIP Welcome Ready">VIP Welcome Ready</option>
                            <option value="Checked-In">Checked-In</option>
                            <option value="Checked-Out">Checked-Out</option>
                          </>
                        )}
                        {partner.role === "driver" && (
                          <>
                            <option value="Pending Dispatch">Pending Dispatch</option>
                            <option value="Accepted">Accepted by Chauffeur</option>
                            <option value="Vehicle Prepped & Fueled">Vehicle Prepped & Fueled</option>
                            <option value="At Airport Pickup Gate">At Airport Pickup Gate</option>
                            <option value="Transfer Completed">Transfer Completed</option>
                          </>
                        )}
                        {partner.role === "guide" && (
                          <>
                            <option value="Pending Assignment">Pending Assignment</option>
                            <option value="Accepted">Accepted by Tour Guide</option>
                            <option value="Tour Briefing Complete">Tour Briefing Complete</option>
                            <option value="On-Ground With Guests">On-Ground With Guests</option>
                            <option value="Excursion Completed">Excursion Completed</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Arrival & Logistics Ribbon */}
                  {arr && (
                    <div className="my-4 p-4 rounded-xl bg-[#111111] border border-[#262626] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Arrival Date & Chauffeur Transfer Schedule
                        </span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]">
                          {arr.arrivalDate} ({arr.arrivalTime})
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Arrival Flight / Train</span>
                          <span className="font-serif text-[#FDFBF7]">{arr.flightOrTrain || "Private VIP Transfer"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Terminal Gate & Exit</span>
                          <span className="font-mono text-[#D4D4D8]">{arr.terminalGate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Chauffeur Stationing</span>
                          <span className="font-mono text-sky-400">{arr.pickupReportingTime}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Check-In / Out Windows</span>
                          <span className="font-mono text-emerald-400">In: {arr.checkInTime} • Out: {arr.checkOutTime}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expandable Day-by-Day Gourmet Dining Plan */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMenuLeadId(isMenuExpanded ? null : lead.id)
                      }
                      className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#202020] border border-[#333333] flex items-center justify-between text-xs font-mono text-[#C5A059] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#C5A059]" />
                        <span className="font-semibold">
                          {isMenuExpanded
                            ? "Hide Day-by-Day Gourmet Dining & Wine Pairing Plan"
                            : `View Complete Day-by-Day Gourmet Dining Plan (${lead.gourmetMenuPlan?.length || 0} Days Included)`}
                        </span>
                      </div>
                      {isMenuExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#C5A059]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#C5A059]" />
                      )}
                    </button>

                    {isMenuExpanded && lead.gourmetMenuPlan && (
                      <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                        {lead.gourmetMenuPlan.map((m) => (
                          <div
                            key={m.dayNumber}
                            className="p-4 rounded-xl bg-[#121212] border border-[#242424] space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between border-b border-[#222] pb-2">
                              <span className="font-serif text-[#C5A059] font-bold text-sm">
                                Day {m.dayNumber}: {m.dayTitle}
                              </span>
                              <span className="font-mono text-[10px] text-[#888]">
                                Date: {m.date}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  🌅 Breakfast
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.breakfast}</p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  ☀️ Royal Lunch
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.lunch}</p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  ☕ Sunset High-Tea
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">
                                  {m.highTea || "Royal Kashmiri Kahwa & artisanal sweet treats"}
                                </p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  🌙 Evening Banquet
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.dinner}</p>
                                {m.winePairing && (
                                  <span className="text-[10px] text-amber-300 font-mono block mt-1">
                                    🍷 {m.winePairing}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-900/50">
                              <strong>Dietary & Allergy Directive:</strong> {m.dietaryNotes}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Operational Notes & WhatsApp Save */}
                  <div className="pt-4 mt-4 border-t border-[#262626] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Internal partner notes (e.g. Suite #204 prepared, lake welcome set)..."
                        value={currentNotes}
                        onChange={(e) =>
                          setNotesDrafts((prev) => ({ ...prev, [lead.id]: e.target.value }))
                        }
                        className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-xs text-[#FDFBF7] placeholder-[#666] focus:outline-none focus:border-[#C5A059]"
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

                      <a
                        href={`https://wa.me/919820144521?text=${encodeURIComponent(
                          `Namaste ${lead.assignedCurator}. This is ${partner.name}. Re: Guest ${lead.clientName} (${lead.referenceCode}). Current status: ${currentStatus}. Notes: ${currentNotes}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 font-serif text-xs transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
