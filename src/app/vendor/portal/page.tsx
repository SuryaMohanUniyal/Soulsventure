"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Hotel,
  Tent,
  Flame,
  Target,
  Sunrise,
  Sunset,
  Moon,
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
  Navigation,
  Lock,
  Fuel,
  Map,
  ShieldAlert,
} from "lucide-react";
import {
  PartnerTieUp,
  CRMLead,
  getVendorAuthSession,
  clearVendorAuthSession,
  getStoredLeads,
  updateVendorBookingStatus,
  getStoredPartners,
  INITIAL_LEADS,
  DailyRouteSchedule,
  DailyGuideSchedule,
  DailyCampAdventureSchedule,
} from "@/lib/crmStore";

// Helper function: Driver-specific meal schedule (TIMINGS & VENUES ONLY - NO DISHES/RECIPES)
function getDriverMealSchedule(lead: CRMLead, dayNumber: number, date?: string) {
  const guideDay = lead.guideSchedule?.find((g) => g.dayNumber === dayNumber);
  const isFirstDay = dayNumber === 1;
  const totalDays = lead.routeSchedule?.length || 6;
  const isFinalDay = dayNumber === totalDays;

  const lunchVenue = guideDay?.diningBriefing?.lunchVenue || "1559 AD Heritage Restaurant / Fatehsagar Lake View";
  const highTeaVenue = guideDay?.diningBriefing?.highTeaVenue || "The Oberoi Udaivilas Lakeside Domes";
  const dinnerVenue = guideDay?.diningBriefing?.dinnerVenue || "Jagmandir Island Palace / Main Dining Hall";

  return {
    breakfast: {
      title: "Breakfast / Morning Service",
      time: isFirstDay ? "14:00 IST (Tarmac Arrival Welcome)" : "08:00 – 09:30 IST",
      venue: isFirstDay ? "Airport VIP Lounge / Hotel Welcome Veranda" : "Hotel Lakeside Breakfast Terrace",
      driverDuty: isFirstDay
        ? "Flight touchdown standby at 13:15 IST • Placard ready at Gate 2"
        : "Vehicle wiped & AC cooled at hotel lobby by 09:15 IST for morning departure",
    },
    lunch: {
      title: "Royal Lunch Excursion",
      time: "13:00 – 14:30 IST",
      venue: lunchVenue,
      driverDuty: "Drop guests at venue by 12:45 IST (15 mins prior) • Standby for pickup at 14:30 IST",
    },
    highTea: {
      title: "Sunset High-Tea & Sundowner",
      time: "17:00 – 18:00 IST",
      venue: highTeaVenue,
      driverDuty: "Arrive at high-tea venue by 16:45 IST • Standby at 18:00 IST for evening transfer",
    },
    dinner: {
      title: isFinalDay ? "Farewell Royal Dinner" : "Evening Banquet & Royal Dinner",
      time: "20:00 – 22:30 IST",
      venue: dinnerVenue,
      driverDuty: "Drop guests at dining venue / dock at 19:45 IST • Standby for return transfer at 22:30 IST",
    },
  };
}

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
  const [activeRouteDayNumber, setActiveRouteDayNumber] = useState<Record<string, number>>({
    "lead-sharma-2026": 1,
    "lead-vance-2026": 1,
    "lead-rohan-2026": 1,
    "lead-singhania-2026": 1,
  });
  const [activeGuideDayNumber, setActiveGuideDayNumber] = useState<Record<string, number>>({
    "lead-sharma-2026": 2,
    "lead-vance-2026": 1,
    "lead-rohan-2026": 2,
    "lead-singhania-2026": 2,
  });
  const [activeCampDayNumber, setActiveCampDayNumber] = useState<Record<string, number>>({
    "lead-vance-2026": 1,
    "lead-sharma-2026": 3,
  });

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
    let allLeads = getStoredLeads();
    if (!allLeads || allLeads.length === 0) {
      allLeads = INITIAL_LEADS;
    }
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
            ? "Room Suite Reserved"
            : currentPartner.role === "driver"
            ? "Vehicle Prepped & Fueled"
            : "Accepted by Tour Guide";
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

  const partnerRole = partner?.role as "hotel" | "driver" | "guide" | "activity";
  const isCampPartner =
    partnerRole === "activity" ||
    (partner?.name || "").toLowerCase().includes("camp") ||
    (partner?.name || "").toLowerCase().includes("jawai") ||
    (partner?.name || "").toLowerCase().includes("suján") ||
    (partner?.serviceOrAssets || "").toLowerCase().includes("safari") ||
    (partner?.serviceOrAssets || "").toLowerCase().includes("tented");

  // Filter leads strictly to those assigned to this specific vendor partner
  const assignedLeads = useMemo(() => {
    if (!partner) return [];
    const sourceLeads = leads.length > 0 ? leads : INITIAL_LEADS;
    return sourceLeads.filter((lead) => {
      // 1. Direct assignment match in vendorAssignments
      const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
      if (assignment) {
        if (assignment.partnerId && assignment.partnerId === partner.id) return true;
        if (assignment.partnerName && partner.name && (
          assignment.partnerName.toLowerCase().includes(partner.name.toLowerCase()) ||
          partner.name.toLowerCase().includes(assignment.partnerName.toLowerCase())
        )) return true;
      }

      // 2. Chauffeur direct match
      if (partnerRole === "driver") {
        if (lead.assignedChauffeur && partner.name && (
          lead.assignedChauffeur.toLowerCase().includes(partner.name.toLowerCase()) ||
          partner.name.toLowerCase().includes(lead.assignedChauffeur.toLowerCase())
        )) return true;
        if (partner.id === "vendor-driver-01" && (lead.routeSchedule?.length || 0) > 0) return true;
      }

      // 3. Hotel / Wilderness camp direct match
      if (partnerRole === "hotel") {
        if (isCampPartner) {
          if (lead.campSchedule && lead.campSchedule.length > 0) return true;
          if (lead.destinationSummary?.toLowerCase().includes("jawai") || lead.destinations?.some(d => d.toLowerCase().includes("jawai"))) return true;
        } else {
          // Palace Hotel (e.g. Udaivilas)
          const matchHotel = lead.guideSchedule?.some(g => g.stayHotel?.hotelName && partner.name && (
            g.stayHotel.hotelName.toLowerCase().includes(partner.name.toLowerCase()) ||
            partner.name.toLowerCase().includes(g.stayHotel.hotelName.toLowerCase())
          ));
          if (matchHotel) return true;
          if (lead.arrivalDetails?.dropoffLocation && partner.name && (
            lead.arrivalDetails.dropoffLocation.toLowerCase().includes(partner.name.toLowerCase()) ||
            partner.name.toLowerCase().includes(lead.arrivalDetails.dropoffLocation.toLowerCase())
          )) return true;
        }
      }

      // 4. Tour Guide direct match
      if (partnerRole === "guide") {
        if (lead.guideSchedule && lead.guideSchedule.length > 0 && (partner.id === "vendor-guide-01" || partner.name.toLowerCase().includes("mathur"))) {
          return true;
        }
      }

      return false;
    });
  }, [leads, partner, partnerRole, isCampPartner]);

  // Filter assigned leads by search query
  const filteredLeads = useMemo(() => {
    return assignedLeads.filter((lead) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.clientName.toLowerCase().includes(q) ||
        lead.referenceCode.toLowerCase().includes(q) ||
        lead.destinationSummary.toLowerCase().includes(q) ||
        (lead.arrivalDetails?.flightOrTrain || "").toLowerCase().includes(q) ||
        (lead.arrivalDetails?.pickupLocation || "").toLowerCase().includes(q)
      );
    });
  }, [assignedLeads, searchQuery]);

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
    const map: Record<string, Array<{ lead: CRMLead; type: "arrival" | "stay" | "departure" | "tour" | "route" | "safari"; label: string; time?: string }>> = {};

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
          label: `Final Drop: ${lead.clientName.split(" ")[0]}`,
          time: lead.arrivalDetails?.finalDropoffTime || lead.arrivalDetails?.checkOutTime,
        });
      }

      // Camp & Safari days (for SUJÁN JAWAI & Wilderness Adventure Partners)
      lead.campSchedule?.forEach((c) => {
        if (c.date) {
          if (!map[c.date]) map[c.date] = [];
          if (!map[c.date].some((m) => m.type === "safari" && m.lead.id === lead.id)) {
            map[c.date].push({
              lead,
              type: "safari",
              label: `Safari: ${c.dayTitle.substring(0, 22)}...`,
              time: c.adventureAndSafaris[0]?.timeSlot?.split("–")[0]?.trim() || "06:00 IST",
            });
          }
        }
      });

      // Tour Guide schedule days
      lead.guideSchedule?.forEach((g) => {
        if (g.date) {
          if (!map[g.date]) map[g.date] = [];
          if (!map[g.date].some((m) => m.type === "tour" && m.lead.id === lead.id)) {
            map[g.date].push({
              lead,
              type: "tour",
              label: `Tour: ${g.dayTitle.substring(0, 22)}...`,
              time: g.tourStartTime,
            });
          }
        }
      });

      // Route schedule days
      lead.routeSchedule?.forEach((r) => {
        if (r.date && r.date !== arrDate && r.date !== depDate) {
          if (!map[r.date]) map[r.date] = [];
          map[r.date].push({
            lead,
            type: "route",
            label: `Route: ${r.dayTitle.substring(0, 24)}...`,
            time: r.reportingTime,
          });
        }
      });

      // Gourmet menu days (active stays)
      lead.gourmetMenuPlan?.forEach((menuDay) => {
        if (menuDay.date && menuDay.date !== arrDate && menuDay.date !== depDate && !map[menuDay.date]?.some(m => m.lead.id === lead.id)) {
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
      const inRoute = lead.routeSchedule?.some((r) => r.date === selectedDate);
      const inGuide = lead.guideSchedule?.some((g) => g.date === selectedDate);
      const inCamp = lead.campSchedule?.some((c) => c.date === selectedDate);
      const inMenu = lead.gourmetMenuPlan?.some((m) => m.date === selectedDate);
      return arr === selectedDate || dep === selectedDate || inRoute || inGuide || inCamp || inMenu;
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

// Partner role & assignedLeads pre-calculated above

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-[#1C1C1C] via-[#161616] to-[#121212] border border-[#2D2D2D] relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
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

            <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FDFBF7]">
              Welcome, {partner.contactPerson} ({partner.name})
            </h1>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-2xl">
              {partner.serviceOrAssets} • Phone ID: <span className="font-mono text-[#C5A059]">{partner.loginPhone || partner.phone}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-stretch sm:items-center gap-2 sm:gap-2.5">
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
                `Namaste Suraj & Harsh. This is ${partner.name}. Reaching out regarding our active SoulsVenture route and booking allocation.`
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
      {partner.role === "driver" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Routes</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{filteredLeads.length} Bookings</div>
            <span className="text-[10px] text-sky-400 font-mono mt-0.5 block">Airport & Intercity Dispatches</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Fleet Assigned</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Defender 110 & Maybach</div>
            <span className="text-[10px] text-sky-400 font-mono mt-0.5 block">RJ 27 EA 0001 (VIP Tag)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">First Reporting Time</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">13:15 IST (Nov 14)</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Gate 2 • Placard Ready</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Chauffeur Tariff</span>
            <div className="text-sm font-serif text-[#C5A059] mt-2 font-mono">{partner.negotiatedTariff}</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">{partner.paymentTerms}</span>
          </div>
        </div>
      )}

      {partner.role === "hotel" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Guests</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">
              {isCampPartner ? `${filteredLeads.length} Wilderness Safaris` : `${filteredLeads.length} Stays`}
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
              {isCampPartner ? "Active Camp & Safari Stays" : "Active Room Allocations"}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">
              {isCampPartner ? "Accommodation Tier" : "Suite Tier"}
            </span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">
              {isCampPartner ? "Royal Tented Pavilions" : "Kohinoor & Royal Palace"}
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
              {isCampPartner ? "Escarpment View & Private Plunge Pool" : "High Floor Lake Sanctuary"}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">
              {isCampPartner ? "Safaris & Activities" : "Dietary Alerts"}
            </span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">
              {isCampPartner ? "Dawn Leopard Safaris & Archery" : "100% Pure Veg & Jain"}
            </div>
            <span className="text-[10px] text-amber-300 font-mono mt-0.5 block">
              {isCampPartner ? "Naturalist Salim & 4x4 Fleet" : "Chef's Menu Cards Active"}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">
              {isCampPartner ? "Camp Contract Rate" : "Contract Settlement"}
            </span>
            <div className="text-sm font-serif text-[#C5A059] mt-2 font-mono">{partner.negotiatedTariff}</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">{partner.paymentTerms}</span>
          </div>
        </div>
      )}

      {partner.role === "guide" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Tours</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{filteredLeads.length} Excursions</div>
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
      <div className="p-3.5 sm:p-5 rounded-2xl bg-[#161616] border border-[#262626] space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* View Mode Toggle Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex items-center gap-1.5 p-1 bg-[#101010] border border-[#2A2A2A] rounded-xl w-full md:w-auto">
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
              <span>
                {partner.role === "driver"
                  ? `Chauffeur Route Dispatches (${filteredLeads.length})`
                  : `Master Booking Dossiers (${filteredLeads.length})`}
              </span>
            </button>
          </div>

          {/* Month Switcher & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <div className="flex items-center justify-center bg-[#101010] border border-[#2A2A2A] rounded-xl p-1 text-xs font-mono w-full sm:w-auto">
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
                className="bg-[#101010] border border-[#2A2A2A] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#FDFBF7] font-mono placeholder-[#555] focus:outline-none focus:border-[#C5A059] w-full sm:w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: INTERACTIVE CALENDAR GRID WITH FULL ROUTE & EXCURSIONS SCHEDULE   */}
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
                  Click on any marked date to inspect full guest arrival times, daily route directions (kha se kha jana h), sightseeing stops (khakha visit karwana h), and fine dining menus.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-[#C5A059]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                  Arrival
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Camp Safari & Adventure
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Tour Walkthrough
                </span>
                <span className="flex items-center gap-1.5 text-sky-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Route & Chauffeur
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Full Board Menu
                </span>
                <span className="flex items-center gap-1.5 text-rose-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Final Drop
                </span>
              </div>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="sm:hidden flex items-center justify-between text-[10px] font-mono text-[#A1A1AA] pt-1">
              <span>↔ Swipe horizontally for 7-day view</span>
              <span>Tap date for details</span>
            </div>

            {/* Responsive Calendar Scroller */}
            <div className="overflow-x-auto scrollbar-thin pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
              <div className="min-w-[580px] sm:min-w-0">
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
                            ev.type === "safari"
                              ? "bg-emerald-950/90 text-emerald-300 border-emerald-700 font-semibold"
                              : ev.type === "tour"
                              ? "bg-amber-950/80 text-amber-300 border-amber-800 font-semibold"
                              : ev.type === "arrival"
                              ? "bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/40 font-semibold"
                              : ev.type === "departure"
                              ? "bg-rose-950/60 text-rose-300 border-rose-800"
                              : ev.type === "route"
                              ? "bg-sky-950/60 text-sky-300 border-sky-800"
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
            </div>
          </div>

          {/* Selected Date Operations Briefing */}
          <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#181818] border border-[#2D2D2D] shadow-2xl space-y-5 sm:space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#282828] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 text-xs font-mono uppercase font-semibold">
                    Date Operational Manifest
                  </span>
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    {selectedDateBookings.length} Active Booking(s) on this date
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FDFBF7] mt-1">
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
                  Selected: {selectedDate}
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
                  Select another highlighted day on the calendar (e.g. Nov 14, 15, 16, 18, 19).
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedDateBookings.map((lead) => {
                  const arr = lead.arrivalDetails;
                  const isArrivalDay = arr?.arrivalDate === selectedDate;
                  const isDepartureDay = arr?.checkOutDate === selectedDate;
                  const activeDriverDayNum = activeRouteDayNumber[lead.id] || (lead.routeSchedule?.find((r) => r.date === selectedDate)?.dayNumber || 1);
                  const currentDriverRouteDay = lead.routeSchedule?.find((r) => r.dayNumber === activeDriverDayNum) || lead.routeSchedule?.[0];
                  const driverMealSchedule = getDriverMealSchedule(lead, activeDriverDayNum, currentDriverRouteDay?.date);
                  const routeDay = lead.routeSchedule?.find((r) => r.date === selectedDate);
                  const guideDay = lead.guideSchedule?.find((g) => g.date === selectedDate);
                  const campDay = lead.campSchedule?.find((c) => c.date === selectedDate);
                  const menuDay = lead.gourmetMenuPlan?.find((m) => m.date === selectedDate);
                  const activeGuideDayNum = activeGuideDayNumber[lead.id] || (guideDay?.dayNumber || 1);
                  const currentGuideDay = lead.guideSchedule?.find((g) => g.dayNumber === activeGuideDayNum) || guideDay || lead.guideSchedule?.[0];
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
                      className="p-4 sm:p-6 rounded-2xl bg-[#131313] border border-[#2B2B2B] hover:border-[#C5A059]/50 transition-all space-y-4 sm:space-y-5 shadow-lg"
                    >
                      {/* Booking Dossier Header with Privacy Notice */}
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
                                🛫 FINAL DEPARTURE DROP
                              </span>
                            )}
                            {campDay && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold uppercase flex items-center gap-1">
                                <Tent className="w-3 h-3 text-emerald-400" />
                                WILDERNESS SAFARI DAY
                              </span>
                            )}
                          </div>

                          <h4 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                            {lead.clientName}
                          </h4>

                          <p className="text-xs text-[#888888] flex flex-wrap items-center gap-2">
                            <span>{lead.companions} {lead.familyAges ? `(${lead.familyAges})` : ""}</span>
                            <span>•</span>
                            <span>Booking: <strong className="text-[#D4D4D8]">{arr?.totalDays || lead.duration}</strong></span>
                            <span>•</span>
                            <span>Curator: <strong className="text-[#C5A059]">{lead.assignedCurator}</strong></span>
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
                              isCampPartner ? (
                                <>
                                  <option value="Tent Suite Prepped & Inspected">Tent Suite Prepped & Inspected</option>
                                  <option value="Safari Jeep Ready & Trackers Briefed">Safari Jeep Ready & Trackers Briefed</option>
                                  <option value="Guests In Camp / Checked-In">Guests In Camp / Checked-In</option>
                                  <option value="On Leopard Safari Drive">On Leopard Safari Drive</option>
                                  <option value="Bush Dinner In Progress">Bush Dinner In Progress</option>
                                  <option value="Check-Out / Departure Handover">Check-Out / Departure Handover</option>
                                </>
                              ) : (
                                <>
                                  <option value="Pending Confirmation">Pending Confirmation</option>
                                  <option value="Accepted">Accepted by Reservations</option>
                                  <option value="Room Suite Reserved">Room Suite Reserved</option>
                                  <option value="VIP Welcome Ready">VIP Welcome Ready</option>
                                  <option value="Checked-In">Guest Checked-In</option>
                                  <option value="Checked-Out">Guest Checked-Out</option>
                                </>
                              )
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

                      {/* VIP Privacy Notice (Client Contact strictly withheld) */}
                      <div className="p-3 rounded-xl bg-[#171717] border border-[#2B2B2B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-950/70 border border-amber-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                              🔒 Protected VIP Guest Identity
                            </span>
                            <span className="text-[10px] text-[#A1A1AA]">
                              Direct client phone and email are confidential under SoulsVenture VIP Protocol. All dispatch adjustments must be coordinated via Lead Curator ({lead.assignedCurator}).
                            </span>
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/919820144521?text=${encodeURIComponent(
                            `Namaste ${lead.assignedCurator}. This is ${partner.name}. Re: Guest ${lead.clientName} (${lead.referenceCode}). Schedule on ${selectedDate}:`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-300 font-mono text-[11px] flex items-center gap-1.5 whitespace-nowrap self-end sm:self-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Curator</span>
                        </a>
                      </div>

                      {/* ========================================================= */}
                      {/* IF VENDOR IS A TOUR GUIDE: DEDICATED TOUR GUIDE MANIFEST */}
                      {/* ========================================================= */}
                      {partner.role === "guide" ? (
                        <div className="space-y-4">
                          {/* 1. Guide Excursion Logistics Ribbon (Hotel & Driver Details at top) */}
                          <div className="p-4 rounded-xl bg-[#161616] border border-amber-900/50 space-y-3">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#252525] pb-2">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5 text-amber-400" />
                                Tour Guide Operations, Hotel & Chauffeur Coordination ({currentGuideDay?.date || selectedDate})
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-700/60 font-semibold">
                                  ASI Permit: #{currentGuideDay?.asiPermitNumber || "ASI-ROYAL-MWR-782"}
                                </span>
                                <span className="text-[10px] font-mono text-[#D4D4D8] bg-[#222] px-2 py-0.5 rounded border border-[#333]">
                                  {arr?.totalDays || lead.duration}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Guide Duty Hours</span>
                                <span className="font-mono text-amber-300 font-bold text-sm block">
                                  {currentGuideDay?.reportingTime || "09:15 IST"}
                                </span>
                                <span className="text-[9px] text-[#888] font-mono block">Tour: {currentGuideDay?.tourStartTime || "09:30"} – {currentGuideDay?.tourEndTime || "18:30 IST"}</span>
                              </div>

                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Stay Hotel & Suite</span>
                                <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                                  {currentGuideDay?.stayHotel.hotelName || "The Oberoi Udaivilas"}
                                </span>
                                <span className="text-[9px] text-emerald-400 font-mono block">{currentGuideDay?.stayHotel.roomType || "Kohinoor Suite #204"}</span>
                              </div>

                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Hotel Front Desk</span>
                                <span className="font-mono text-[#C5A059] font-medium block leading-tight">
                                  {currentGuideDay?.stayHotel.frontDeskPhone || "+91 294 243 3300"}
                                </span>
                                <span className="text-[9px] text-[#888] font-mono block">Chief Concierge Desk</span>
                              </div>

                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Assigned Chauffeur & Fleet</span>
                                <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                                  {currentGuideDay?.transportCoordination.chauffeurName || "Vikram Singh (Fleet Lead)"}
                                </span>
                                <span className="text-[9px] text-sky-400 font-mono block">
                                  {currentGuideDay?.transportCoordination.vehicleModel} ({currentGuideDay?.transportCoordination.licensePlate || "RJ 27 EA 0001"})
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* 2. Complete Multi-Day Itinerary Selector (All Days Pre-Decided for Tour Guide) */}
                          {lead.guideSchedule && lead.guideSchedule.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-amber-900/60 space-y-4">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                                <div>
                                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                                    <Compass className="w-4 h-4 text-amber-400" />
                                    Complete {lead.guideSchedule.length}-Day Heritage Excursions & Sightseeing Plan ({arr?.totalDays || lead.duration})
                                  </span>
                                  <span className="text-[10px] text-[#888] font-mono block mt-0.5">
                                    Select any day to inspect monument entry slots, ASI permits, hotel coordination, and chauffeur dispatch:
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded border border-amber-800">
                                  Day {activeGuideDayNum} Active
                                </span>
                              </div>

                              {/* Multi-Day Selector Pills so Tour Guide can inspect any/all days */}
                              <div className="flex flex-wrap items-center gap-1.5">
                                {lead.guideSchedule.map((g) => (
                                  <button
                                    key={g.dayNumber}
                                    type="button"
                                    onClick={() =>
                                      setActiveGuideDayNumber((prev) => ({ ...prev, [lead.id]: g.dayNumber }))
                                    }
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                      activeGuideDayNum === g.dayNumber
                                        ? "bg-amber-950 text-amber-200 border border-amber-600 font-bold shadow-sm"
                                        : "bg-[#141414] text-[#888] hover:text-[#D4D4D8] border border-[#2B2B2B]"
                                    }`}
                                  >
                                    Day {g.dayNumber} ({g.date.slice(5)})
                                  </button>
                                ))}
                              </div>

                              {/* Active Guide Day Monument Walkthrough Card */}
                              {currentGuideDay && (
                                <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] space-y-3.5 text-xs">
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-2.5">
                                    <div>
                                      <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                        Day {currentGuideDay.dayNumber} Theme: {currentGuideDay.tourTheme}
                                      </span>
                                      <h5 className="font-serif text-lg text-[#FDFBF7] font-semibold mt-0.5">
                                        {currentGuideDay.dayTitle} ({currentGuideDay.date})
                                      </h5>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-700/60 font-semibold">
                                        Duty: {currentGuideDay.reportingTime} – {currentGuideDay.tourEndTime}
                                      </span>
                                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                        Permit #{currentGuideDay.asiPermitNumber || "ASI-ROYAL-MWR-782"}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Monument Visits */}
                                  <div className="space-y-2.5">
                                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                      🏛️ Monuments & Sites to Visit (Detailed Walkthrough & Entry Slots):
                                    </span>
                                    <div className="grid grid-cols-1 gap-2.5">
                                      {currentGuideDay.monumentVisits.map((visit, i) => (
                                        <div
                                          key={i}
                                          className="p-3.5 rounded-xl bg-[#171717] border border-[#262626] space-y-1.5"
                                        >
                                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
                                            <div className="flex items-center gap-2">
                                              <span className="w-5 h-5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-800 flex items-center justify-center text-[10px] font-mono font-bold">
                                                {i + 1}
                                              </span>
                                              <span className="font-serif text-sm text-[#FDFBF7] font-semibold">
                                                {visit.siteName}
                                              </span>
                                              <span className="text-[10px] font-mono text-[#888]">
                                                ({visit.duration})
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F1F1F] text-[#C5A059] border border-[#333]">
                                                Slot: {visit.entrySlot}
                                              </span>
                                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-200 border border-amber-800/80">
                                                {visit.accessType}
                                              </span>
                                            </div>
                                          </div>
                                          <p className="text-[#A1A1AA] text-xs pl-7 leading-relaxed">
                                            <strong className="text-amber-200/90 font-mono text-[11px]">Walkthrough Highlights: </strong>
                                            {visit.highlights}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Historian Storytelling Directives */}
                                  {currentGuideDay.specialGuideNotes && (
                                    <div className="p-3 rounded-lg bg-[#141414] border border-amber-900/30 text-xs text-[#D4D4D8] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-amber-300 font-semibold block">
                                        📜 Senior Historian Briefing & Storytelling Directives:
                                      </span>
                                      <p className="leading-relaxed text-[#A1A1AA] italic">
                                        "{currentGuideDay.specialGuideNotes}"
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* 3. Hotel Stay, Location & Front Desk Coordination Card */}
                              {currentGuideDay?.stayHotel && (
                                <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-emerald-900/50 space-y-3 text-xs">
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#252525] pb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                                      <Hotel className="w-3.5 h-3.5 text-emerald-400" />
                                      Guest Hotel Stay, Location & Front Desk Coordination (Day {activeGuideDayNum})
                                    </span>
                                    <span className="text-[10px] font-mono text-[#888]">
                                      Check-in: {currentGuideDay.stayHotel.checkInTime} • Check-out: {currentGuideDay.stayHotel.checkOutTime}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#71717A] block">Hotel Property & Location:</span>
                                      <p className="font-serif text-[#FDFBF7] font-semibold text-sm">{currentGuideDay.stayHotel.hotelName}</p>
                                      <p className="text-[11px] text-[#A1A1AA] flex items-start gap-1 mt-0.5">
                                        <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                                        <span>{currentGuideDay.stayHotel.hotelAddress || "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola Waterfront, Udaipur, Rajasthan 313001"}</span>
                                      </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#71717A] block">Guest Room & Meeting Point:</span>
                                      <p className="font-serif text-[#FDFBF7] font-semibold text-sm">{currentGuideDay.stayHotel.roomType}</p>
                                      <span className="text-[11px] text-[#C5A059] block mt-0.5 font-medium">
                                        Lobby Rendezvous: {currentGuideDay.meetingPoint}
                                      </span>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-2">
                                      <span className="text-[10px] font-mono uppercase text-[#71717A] block">Hotel Front Desk / Concierge Phone:</span>
                                      <p className="font-mono text-emerald-400 font-bold text-xs">
                                        {currentGuideDay.stayHotel.frontDeskPhone || currentGuideDay.stayHotel.conciergeContact || "+91 294 243 3300"}
                                      </p>
                                      <div className="flex items-center gap-2 pt-0.5">
                                        <a
                                          href={`tel:${(currentGuideDay.stayHotel.frontDeskPhone || "+91 294 243 3300").replace(/\s+/g, "")}`}
                                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#222] hover:bg-[#2A2A2A] text-xs font-mono text-[#D4D4D8] border border-[#333]"
                                        >
                                          <Phone className="w-3 h-3 text-emerald-400" />
                                          <span>Call Front Desk</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* 4. Assigned Chauffeur & Fleet Coordination Card (With Direct Contact) */}
                              {currentGuideDay?.transportCoordination && (
                                <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-sky-950 space-y-3 text-xs">
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                                      <Navigation className="w-3.5 h-3.5 text-sky-400" />
                                      Assigned Chauffeur & Fleet Coordination (Day {activeGuideDayNum})
                                    </span>
                                    <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                                      Duty Chauffeur Assigned
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#71717A] block">Chauffeur Details:</span>
                                      <p className="font-serif text-[#FDFBF7] font-semibold text-sm">
                                        {currentGuideDay.transportCoordination.chauffeurName || "Vikram Singh (Royal Chauffeur Fleet)"}
                                      </p>
                                      <p className="font-mono text-xs text-[#C5A059]">
                                        Direct: {currentGuideDay.transportCoordination.chauffeurPhone || "+91 98290 11222"}
                                      </p>
                                      <div className="flex items-center gap-2 pt-1.5">
                                        <a
                                          href={`tel:${(currentGuideDay.transportCoordination.chauffeurPhone || "+91 98290 11222").replace(/\s+/g, "")}`}
                                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#222] hover:bg-[#2A2A2A] text-[11px] font-mono text-[#D4D4D8] border border-[#333]"
                                        >
                                          <Phone className="w-3 h-3 text-sky-400" />
                                          <span>Call Driver</span>
                                        </a>
                                        <a
                                          href={`https://wa.me/${(currentGuideDay.transportCoordination.chauffeurPhone || "+91 98290 11222").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                            `Namaste ${currentGuideDay.transportCoordination.chauffeurName || "Vikram Singh"}. This is ${partner.name} (Tour Guide) re: Guest ${lead.clientName}. Day ${activeGuideDayNum} tour coordination:`
                                          )}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-[11px] font-mono text-emerald-300 border border-emerald-800"
                                        >
                                          <MessageCircle className="w-3 h-3" />
                                          <span>WhatsApp</span>
                                        </a>
                                      </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#71717A] block">Vehicle Model & License Plate:</span>
                                      <p className="font-serif text-[#FDFBF7] font-semibold text-sm">
                                        {currentGuideDay.transportCoordination.vehicleModel || "Land Rover Defender 110 4WD"}
                                      </p>
                                      <span className="text-[10px] font-mono text-sky-300 block">
                                        Plate: {currentGuideDay.transportCoordination.licensePlate || "RJ 27 EA 0001"}
                                      </span>
                                      <span className="text-[10px] text-[#888] font-mono block">
                                        Stationed at Hotel Lobby 15 mins before tour
                                      </span>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#71717A] block">Transit Route & Drop Point:</span>
                                      <p className="text-[11px] text-[#D4D4D8] leading-relaxed">
                                        {currentGuideDay.transportCoordination.routeDescription}
                                      </p>
                                      <span className="text-[10px] font-mono text-emerald-400 block pt-1 border-t border-[#222]">
                                        Drop-off: {currentGuideDay.transportCoordination.dropoffPoint}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* 5. Full Day Gastronomy & Food Menu Briefing */}
                              {currentGuideDay?.diningBriefing && (
                                <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2B2B2B] space-y-3">
                                  <div className="flex items-center justify-between border-b border-[#242424] pb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                      <Utensils className="w-3.5 h-3.5" />
                                      Full Day Gastronomy & Food Menu Briefing (Day {activeGuideDayNum})
                                    </span>
                                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                      Chef Special Briefed
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                        <Coffee className="w-3 h-3" /> Breakfast / Morning
                                      </span>
                                      <p className="text-[#FDFBF7] text-xs leading-relaxed">{currentGuideDay.diningBriefing.breakfast}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                        <Utensils className="w-3 h-3" /> Royal Lunch Venue
                                      </span>
                                      <span className="text-[10px] font-mono text-sky-300 block">{currentGuideDay.diningBriefing.lunchVenue}</span>
                                      <p className="text-[#FDFBF7] text-xs leading-relaxed">{currentGuideDay.diningBriefing.lunchMenu}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                        <Coffee className="w-3 h-3" /> Sunset High-Tea
                                      </span>
                                      <span className="text-[10px] font-mono text-amber-300 block">{currentGuideDay.diningBriefing.highTeaVenue}</span>
                                      <p className="text-[#FDFBF7] text-xs leading-relaxed">{currentGuideDay.diningBriefing.highTeaMenu}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                        <Wine className="w-3 h-3" /> Evening Banquet
                                      </span>
                                      <span className="text-[10px] font-mono text-rose-300 block">{currentGuideDay.diningBriefing.dinnerVenue}</span>
                                      <p className="text-[#FDFBF7] text-xs leading-relaxed">{currentGuideDay.diningBriefing.dinnerMenu}</p>
                                    </div>
                                  </div>

                                  <div className="p-2.5 rounded-lg bg-[#121212] border border-amber-900/40 text-xs text-amber-300 font-mono">
                                    <strong>Strict Dietary & Allergy Directives:</strong> {currentGuideDay.diningBriefing.dietaryRestrictions}
                                  </div>
                                </div>
                              )}

                              {/* 6. All-Days Tour Master Roadmap (So Tour Guide sees all 5/6 days at a glance) */}
                              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
                                <span className="text-[10px] font-mono uppercase text-[#A1A1AA] font-semibold block">
                                  📋 Full {lead.guideSchedule.length}-Day Tour Itinerary Roadmap (All Days At a Glance):
                                </span>
                                <div className="space-y-1.5">
                                  {lead.guideSchedule.map((g) => (
                                    <div
                                      key={g.dayNumber}
                                      onClick={() => setActiveGuideDayNumber((prev) => ({ ...prev, [lead.id]: g.dayNumber }))}
                                      className={`p-2 rounded-lg border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 cursor-pointer transition-all ${
                                        activeGuideDayNum === g.dayNumber
                                          ? "bg-[#1E1E1E] border-amber-600/70 text-[#FDFBF7]"
                                          : "bg-[#101010] border-[#222] text-[#888] hover:border-[#333] hover:text-[#CCC]"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-amber-300 font-bold">
                                          Day {g.dayNumber}
                                        </span>
                                        <span className="font-mono text-[10px] text-[#A1A1AA]">{g.date}</span>
                                        <span className="font-serif font-medium text-xs text-[#E4E4E7] truncate max-w-[240px] sm:max-w-[340px]">
                                          {g.dayTitle}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 text-[10px] font-mono">
                                        <span className="text-amber-300">Duty: {g.reportingTime} – {g.tourEndTime}</span>
                                        <span>•</span>
                                        <span className="text-emerald-400">{g.stayHotel.hotelName}</span>
                                        <span>•</span>
                                        <span className="text-sky-300">{g.transportCoordination.chauffeurName.split(" ")[0]} ({g.transportCoordination.licensePlate})</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : isCampPartner ? (
                        <div className="space-y-4">
                          {/* 1. Camp Logistics Ribbon */}
                          <div className="p-4 rounded-xl bg-[#161616] border border-emerald-900/50 space-y-2.5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#252525] pb-2">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
                                <Tent className="w-3.5 h-3.5 text-emerald-400" />
                                Wilderness Camp & Safari Operational Manifest ({selectedDate})
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-700/60 font-semibold">
                                  Tent: {campDay?.tentAccommodation.tentNumber || "Royal Tented Pavilion #03"}
                                </span>
                                <span className="text-[10px] font-mono text-[#D4D4D8] bg-[#222] px-2 py-0.5 rounded border border-[#333]">
                                  {arr?.totalDays || lead.duration}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Game Drive Window</span>
                                <span className="font-mono text-emerald-300 font-bold text-sm block">
                                  {campDay?.adventureAndSafaris[0]?.timeSlot || "06:00 – 09:00 IST"}
                                </span>
                                <span className="text-[9px] text-[#888] font-mono block">Dawn & Sunset Drives</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Assigned Naturalist</span>
                                <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                                  {campDay?.adventureAndSafaris[0]?.leadTracker || "Senior Naturalist Salim"}
                                </span>
                                <span className="text-[9px] text-emerald-400/80 font-mono block">Senior Big Cat Specialist</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Dedicated Private Butler</span>
                                <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                                  {campDay?.tentAccommodation.butlerAssigned || "Butler Kalu Singh (24/7)"}
                                </span>
                                <span className="text-[9px] text-amber-300 font-mono block">Personal Pavilion Care</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Safari 4x4 Fleet</span>
                                <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                                  {campDay?.adventureAndSafaris[0]?.vehicleFleet || "Custom 4x4 Open Safari Jeep #02"}
                                </span>
                                <span className="text-[9px] text-sky-400 font-mono block">Hydraulic Camera Arms</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. Luxury Tents & Accommodation Setup ("Kya kya tents etc dena hai") */}
                          {campDay?.tentAccommodation && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2B2B2B] space-y-3">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                                  <Tent className="w-3.5 h-3.5 text-emerald-400" />
                                  Luxury Tents & Pavilion Setup (Kya kya tents & bedding dena hai)
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                                  {campDay.tentAccommodation.checkInStatus}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    Tent Suite & Location
                                  </span>
                                  <p className="font-serif text-[#FDFBF7] font-semibold text-sm">{campDay.tentAccommodation.tentNumber}</p>
                                  <p className="text-[11px] text-[#A1A1AA]">{campDay.tentAccommodation.tentType}</p>
                                  <span className="text-[9px] text-emerald-400 font-mono block mt-1">{campDay.tentAccommodation.viewOrientation}</span>
                                </div>

                                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    Bedding & Turn-down
                                  </span>
                                  <p className="text-[#D4D4D8] leading-relaxed text-xs">{campDay.tentAccommodation.bedConfiguration}</p>
                                  <span className="text-[9px] text-[#888] font-mono block mt-1">Evening hot water bottle protocol</span>
                                </div>

                                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    Climate & Personal Service
                                  </span>
                                  <p className="text-[#D4D4D8] text-xs">{campDay.tentAccommodation.climateControl}</p>
                                  <p className="text-[#C5A059] font-mono text-[11px] mt-1">{campDay.tentAccommodation.butlerAssigned}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. Adventure, Safaris & Field Excursions ("Kya kya adventure dena hai") */}
                          <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2B2B2B] space-y-3.5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                              <div>
                                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">
                                  Day {campDay?.dayNumber || 1} Theme: {campDay?.campTheme || "Leopard Tracking & Koppie Wilderness"}
                                </span>
                                <h5 className="font-serif text-lg text-[#FDFBF7] font-semibold">
                                  {campDay?.dayTitle || "Wilderness Safaris & Outdoor Excursions"}
                                </h5>
                              </div>
                              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                                {campDay?.adventureAndSafaris.length || 0} Safaris / Field Drives
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              <span className="text-[10px] font-mono uppercase text-[#71717A] block">
                                Scheduled Safari Drives & Field Activities:
                              </span>
                              <div className="grid grid-cols-1 gap-2.5">
                                {(campDay?.adventureAndSafaris || []).map((adv, i) => (
                                  <div
                                    key={i}
                                    className="p-3.5 rounded-xl bg-[#121212] border border-[#262626] space-y-1.5 text-xs"
                                  >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
                                      <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center justify-center text-[10px] font-mono font-bold">
                                          {i + 1}
                                        </span>
                                        <span className="font-serif text-sm text-[#FDFBF7] font-semibold">
                                          {adv.activityName}
                                        </span>
                                        <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80">
                                          {adv.terrainAndIntensity}
                                        </span>
                                      </div>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F1F1F] text-[#C5A059] border border-[#333]">
                                        Slot: {adv.timeSlot}
                                      </span>
                                    </div>
                                    <p className="text-[#A1A1AA] leading-relaxed text-xs pl-7">
                                      {adv.activityDescription}
                                    </p>
                                    <div className="pl-7 pt-1 flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#888]">
                                      <span>Tracker: <strong className="text-[#D4D4D8]">{adv.leadTracker}</strong></span>
                                      <span>•</span>
                                      <span>Fleet: <strong className="text-sky-300">{adv.vehicleFleet}</strong></span>
                                      <span>•</span>
                                      <span>Gear: <strong className="text-amber-300/90">{adv.equipmentProvided}</strong></span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 4. Camp Games & Leisure ("Kya kya games dena hai") */}
                          {campDay?.campGamesAndLeisure && campDay.campGamesAndLeisure.length > 0 && (
                            <div className="p-4 rounded-xl bg-[#161616] border border-[#282828] space-y-2.5 text-xs">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5 border-b border-[#222] pb-2">
                                <Target className="w-3.5 h-3.5 text-amber-400" />
                                Camp Games, Archery & Leisure (Kya kya games & activities dena hai)
                              </span>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {campDay.campGamesAndLeisure.map((game, i) => (
                                  <div key={i} className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-serif text-[#FDFBF7] font-semibold text-xs">{game.gameName}</span>
                                      <span className="text-[10px] font-mono text-[#C5A059]">{game.timing}</span>
                                    </div>
                                    <p className="text-[11px] text-[#A1A1AA] leading-snug">{game.description}</p>
                                    <span className="text-[9px] font-mono text-emerald-400 block pt-0.5">Venue: {game.venue}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 5. Bush Dining & Menus ("Kya menu hai food ka") */}
                          {campDay?.bushDiningAndMenu && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2B2B2B] space-y-3 text-xs">
                              <div className="flex items-center justify-between border-b border-[#242424] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                                  Bush Gastronomy & Wilderness Camp Menus (Kya menu hai food ka)
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                  Farm-to-Table Prepared
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
                                <div className="p-2.5 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    ☕ Dawn Pre-Safari
                                  </span>
                                  <p className="text-[#D4D4D8] text-[11px] leading-relaxed">{campDay.bushDiningAndMenu.dawnRefreshment}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    🍳 Bush Breakfast
                                  </span>
                                  <p className="text-[#D4D4D8] text-[11px] leading-relaxed">{campDay.bushDiningAndMenu.breakfast}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    🌅 Escarpment Sundowner
                                  </span>
                                  <p className="text-[#D4D4D8] text-[11px] leading-relaxed">{campDay.bushDiningAndMenu.sundownerHighTea}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    🌙 Campfire Bush Dinner
                                  </span>
                                  <p className="text-[#D4D4D8] text-[11px] leading-relaxed">{campDay.bushDiningAndMenu.bushDinner}</p>
                                </div>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#121212] border border-amber-900/40 text-xs text-amber-300 font-mono">
                                <strong>Strict Dietary & Allergy Directives:</strong> {campDay.bushDiningAndMenu.dietaryDirectives}
                              </div>
                            </div>
                          )}

                          {/* 6. Expedition Equipment & Senior Naturalist Directives */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {campDay?.fieldGearChecklist && (
                              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] space-y-1.5">
                                <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                  🎒 Field Gear & Expedition Checklist Provided:
                                </span>
                                <ul className="space-y-1 text-[#A1A1AA] text-[11px]">
                                  {campDay.fieldGearChecklist.map((item, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {campDay?.seniorNaturalistNotes && (
                              <div className="p-3.5 rounded-xl bg-[#161616] border border-amber-900/30 text-xs text-[#A1A1AA] italic space-y-1">
                                <strong className="text-amber-300 font-mono uppercase not-italic text-[10px] block mb-0.5">
                                  Senior Naturalist Briefing:
                                </strong>
                                "{campDay.seniorNaturalistNotes}"
                              </div>
                            )}
                          </div>
                        </div>
                      ) : partner.role === "hotel" ? (
                        <div className="space-y-4">
                          {/* 1. Hotel Stay & Room Reservation Logistics */}
                          {arr && (
                            <div className="p-4 rounded-xl bg-[#161616] border border-[#292929] space-y-3">
                              <div className="flex items-center justify-between border-b border-[#222] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Hotel className="w-3.5 h-3.5" />
                                  Hotel Stay, Suite Allocation & Check-In / Out Logistics ({selectedDate})
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                  {arr.totalDays || lead.duration}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-In</span>
                                  <p className="font-mono text-[#C5A059] font-bold text-sm">
                                    {arr.arrivalDate} • {arr.checkInTime || "14:00 IST"}
                                  </p>
                                  <span className="text-[9px] text-[#888] font-mono">
                                    {isArrivalDay ? "Guest Arrives Today" : "In-House Stay"}
                                  </span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-Out</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">
                                    {arr.checkOutDate || "Nov 19, 2026"} • {arr.checkOutTime || "12:00 IST"}
                                  </p>
                                  <span className="text-[9px] text-rose-400/90 font-mono">
                                    {isDepartureDay ? "Departure Handover Today" : "Confirmed Reservation"}
                                  </span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Reserved Suite & Wing</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">
                                    {lead.clientNuances?.roomPreferences?.[0] || "Kohinoor Lake View Suite #204"}
                                  </p>
                                  <span className="text-[9px] text-emerald-400 font-mono">Palace Lake View Wing</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Stay Duration</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">
                                    {arr.totalDays || lead.duration}
                                  </p>
                                  <span className="text-[9px] text-sky-400 font-mono">Full Board Gastronomy</span>
                                </div>
                              </div>

                              {/* Arrival Welcome Protocol */}
                              <div className="pt-2.5 border-t border-[#222] space-y-1 text-xs">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                                  VIP Arrival Welcome Protocol at Hotel Porch / Jetty:
                                </span>
                                <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                                  {arr.transferProtocol || lead.clientNuances?.specialProtocol || "Private Shikara boat across Lake Pichola with rose petal shower and traditional nagada drums at Badi Pal Jetty. In-suite registration upon arrival with luggage delivered directly to suite."}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* 2. VIP Room Preferences & Guest Housekeeping Nuances */}
                          {lead.clientNuances && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2A2A2A] space-y-3.5">
                              <div className="flex items-center justify-between border-b border-[#242424] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Hotel className="w-3.5 h-3.5 text-[#C5A059]" />
                                  VIP Room Nuances & Housekeeping Preferences
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                  5-Star Hospitality Directives
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                {lead.clientNuances.roomPreferences && (
                                  <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1.5">
                                    <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block">
                                      Suite Preferences & Setup:
                                    </span>
                                    <ul className="space-y-1 text-[#A1A1AA] text-[11px]">
                                      {lead.clientNuances.roomPreferences.map((pref, i) => (
                                        <li key={i} className="flex items-start gap-1.5">
                                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                          <span>{pref}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="space-y-3">
                                  {lead.clientNuances.beveragePreferences && (
                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                        In-Suite Beverage & Mini-Bar Setup:
                                      </span>
                                      <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                                        {lead.clientNuances.beveragePreferences.join(" • ")}
                                      </p>
                                    </div>
                                  )}

                                  {lead.clientNuances.milestoneEvents && lead.clientNuances.milestoneEvents.length > 0 && (
                                    <div className="p-3 rounded-lg bg-[#111111] border border-amber-900/40 space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-amber-300 font-semibold block flex items-center gap-1">
                                        <Sparkles className="w-3 h-3 text-amber-400" />
                                        VIP Milestone Celebration:
                                      </span>
                                      <p className="text-[#FDFBF7] text-xs font-serif font-medium">
                                        {lead.clientNuances.milestoneEvents[0].title} ({lead.clientNuances.milestoneEvents[0].relation})
                                      </p>
                                      <span className="text-[10px] text-[#888] font-mono block">
                                        Date: {lead.clientNuances.milestoneEvents[0].date} — Complimentary celebration cake / champagne to be arranged.
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. Full Gourmet Gastronomy Plan of the Selected Day */}
                          {menuDay && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2A2A2A] space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Utensils className="w-3.5 h-3.5" />
                                  Gourmet Gastronomy Plan for this Date ({selectedDate})
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                  Dietary Directives Verified
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Coffee className="w-3 h-3" /> Breakfast / Morning
                                  </span>
                                  <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.breakfast}</p>
                                </div>

                                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Utensils className="w-3 h-3" /> Royal Lunch
                                  </span>
                                  <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.lunch}</p>
                                </div>

                                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Coffee className="w-3 h-3" /> Sunset High-Tea
                                  </span>
                                  <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.highTea || "Royal Tea Service"}</p>
                                </div>

                                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Wine className="w-3 h-3" /> Evening Banquet
                                  </span>
                                  <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.dinner}</p>
                                  {menuDay.winePairing && (
                                    <p className="text-[10px] text-amber-300 font-mono mt-1 pt-1 border-t border-[#222]">
                                      Pairing: {menuDay.winePairing}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#121212] border border-amber-900/40 text-xs text-amber-300 font-mono">
                                <strong>Strict Dietary Directives:</strong> {menuDay.dietaryNotes || lead.clientNuances?.dietaryRestrictions?.join(" • ") || "Pure Vegetarian"}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* 1. Driver Core Logistics Box: Arrival Time, Start/End, Pickup & Drop Points */}
                          {arr && (
                            <div className="p-4 rounded-xl bg-[#161616] border border-[#292929] space-y-3">
                              <div className="flex items-center justify-between border-b border-[#222] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  Booking Duration, Arrival Time & Pickup/Drop Coordinates
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                  {arr.totalDays || lead.duration}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Guest Arrival Time</span>
                                  <p className="font-mono text-[#C5A059] font-bold text-sm">{arr.arrivalTime || "13:45 IST"}</p>
                                  <span className="text-[9px] text-[#888] font-mono">Chauffeur Ready: {arr.pickupReportingTime || "13:15 IST (30m prior)"}</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Pickup Location (Day 1)</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.pickupLocation}</p>
                                  <span className="text-[9px] text-sky-400 font-mono">Gate 2 • Placard Ready</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Drop-off Destination (Day 1)</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.dropoffLocation}</p>
                                  <span className="text-[9px] text-emerald-400 font-mono">Check-in at {arr.checkInTime}</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Final Trip Drop-off</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.finalDropoffTime || "Airport Gate 1"}</p>
                                  <span className="text-[9px] text-rose-400 font-mono">End of Booking</span>
                                </div>
                              </div>

                              {arr.transferVehicle && (
                                <div className="pt-2 border-t border-[#222] flex flex-wrap items-center justify-between text-[11px] text-[#A1A1AA] gap-2">
                                  <span>
                                    <strong>Assigned Fleet:</strong> {arr.transferVehicle} {arr.licensePlate ? `(${arr.licensePlate})` : ""}
                                  </span>
                                  <span>
                                    <strong>Chauffeur Protocol:</strong> {arr.chauffeurUniform || "White Formal Livery with Gloves"}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 2. Complete Multi-Day Route Itinerary (All Days Pre-Decided for Driver) */}
                          {lead.routeSchedule && lead.routeSchedule.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-sky-950/80 space-y-4">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                                <div>
                                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                                    <Navigation className="w-4 h-4 text-sky-400" />
                                    Complete {lead.routeSchedule.length}-Day Route & Sightseeing Itinerary ({arr?.totalDays || lead.duration})
                                  </span>
                                  <span className="text-[10px] text-[#888] font-mono block mt-0.5">
                                    Pre-decided transit routes, duty timings, and sightseeing stops across all {lead.routeSchedule.length} days:
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2.5 py-1 rounded border border-sky-800">
                                  Active Day Duty: {currentDriverRouteDay?.reportingTime} – {currentDriverRouteDay?.releaseTime}
                                </span>
                              </div>

                              {/* Multi-Day Selector Pills so Driver can inspect any/all days */}
                              <div className="flex flex-wrap items-center gap-1.5">
                                {lead.routeSchedule.map((r) => (
                                  <button
                                    key={r.dayNumber}
                                    type="button"
                                    onClick={() =>
                                      setActiveRouteDayNumber((prev) => ({ ...prev, [lead.id]: r.dayNumber }))
                                    }
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                      activeDriverDayNum === r.dayNumber
                                        ? "bg-sky-950 text-sky-200 border border-sky-600 font-bold shadow-sm"
                                        : "bg-[#141414] text-[#888] hover:text-[#D4D4D8] border border-[#2B2B2B]"
                                    }`}
                                  >
                                    Day {r.dayNumber} ({r.date.slice(5)})
                                  </button>
                                ))}
                              </div>

                              {/* Active Day Route Card */}
                              {currentDriverRouteDay && (
                                <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] space-y-3.5 text-xs">
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-2.5">
                                    <div>
                                      <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                        Day {currentDriverRouteDay.dayNumber} Transit Schedule ({currentDriverRouteDay.date})
                                      </span>
                                      <h5 className="font-serif text-base text-[#FDFBF7] font-semibold mt-0.5">
                                        {currentDriverRouteDay.dayTitle}
                                      </h5>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-medium">
                                        Reporting (Kitne bje jana hai): <strong>{currentDriverRouteDay.reportingTime}</strong>
                                      </span>
                                      <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800 font-medium">
                                        Release (Kitne bje aana hai): <strong>{currentDriverRouteDay.releaseTime}</strong>
                                      </span>
                                    </div>
                                  </div>

                                  {/* Transit Route (Kha se kha jana hai) */}
                                  <div className="p-3 rounded-xl bg-[#161616] border border-[#242424] space-y-1.5">
                                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                      Transit Route (Kha se kha jana hai):
                                    </span>
                                    <p className="text-sm font-serif text-[#FDFBF7] leading-relaxed">
                                      {currentDriverRouteDay.routeOverview}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#888] pt-1">
                                      <span>Distance: <strong className="text-[#D4D4D8]">{currentDriverRouteDay.distanceKm} km</strong></span>
                                      <span>•</span>
                                      <span>Travel Time: <strong className="text-[#D4D4D8]">{currentDriverRouteDay.travelDuration}</strong></span>
                                      <span>•</span>
                                      <span>Pickup Point: <strong className="text-sky-300">{currentDriverRouteDay.startLocation}</strong></span>
                                      <span>➔</span>
                                      <span>Drop Destination: <strong className="text-emerald-300">{currentDriverRouteDay.endLocation}</strong></span>
                                    </div>
                                  </div>

                                  {/* Sightseeing Stops (Khakha visit karwana hai) */}
                                  <div className="space-y-1.5">
                                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                      Sightseeing & Monument Excursions to Visit (Khakha visit karwana hai):
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {currentDriverRouteDay.sightseeingVisits.map((visit, i) => (
                                        <div
                                          key={i}
                                          className="p-2.5 rounded-lg bg-[#161616] border border-[#242424] flex items-start gap-2 text-xs"
                                        >
                                          <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                                          <span className="text-[#D4D4D8] font-medium">{visit}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Chauffeur Directives */}
                                  {currentDriverRouteDay.chauffeurDirectives && (
                                    <div className="p-3 rounded-lg bg-[#161616] border border-[#242424] text-xs space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                        Chauffeur VIP Directives:
                                      </span>
                                      <p className="text-[#A1A1AA] leading-relaxed">
                                        {currentDriverRouteDay.chauffeurDirectives}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* All-Days Master Timeline Roadmap (So driver sees all 5/6 days at a glance) */}
                              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
                                <span className="text-[10px] font-mono uppercase text-[#A1A1AA] font-semibold block">
                                  📋 Full {lead.routeSchedule.length}-Day Tour Roadmap (All Days Pre-Decided At a Glance):
                                </span>
                                <div className="space-y-1.5">
                                  {lead.routeSchedule.map((day) => (
                                    <div
                                      key={day.dayNumber}
                                      onClick={() => setActiveRouteDayNumber((prev) => ({ ...prev, [lead.id]: day.dayNumber }))}
                                      className={`p-2 rounded-lg border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 cursor-pointer transition-all ${
                                        activeDriverDayNum === day.dayNumber
                                          ? "bg-[#1E1E1E] border-sky-600/70 text-[#FDFBF7]"
                                          : "bg-[#101010] border-[#222] text-[#888] hover:border-[#333] hover:text-[#CCC]"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-sky-300 font-bold">
                                          Day {day.dayNumber}
                                        </span>
                                        <span className="font-mono text-[10px] text-[#A1A1AA]">{day.date}</span>
                                        <span className="font-serif font-medium text-xs text-[#E4E4E7] truncate max-w-[240px] sm:max-w-[340px]">
                                          {day.dayTitle}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 text-[10px] font-mono">
                                        <span className="text-emerald-400">Jana: {day.reportingTime.split(" ")[0]} IST</span>
                                        <span>•</span>
                                        <span className="text-sky-300">Aana: {day.releaseTime.split(" ")[0]} IST</span>
                                        <span>•</span>
                                        <span className="text-[#71717A]">{day.distanceKm} km</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. Driver Meal Schedule & Transit Timings (TIMINGS ONLY - NO DISHES/RECIPES) */}
                          <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-amber-900/40 space-y-3.5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#262626] pb-2">
                              <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-[#C5A059]" />
                                  Guest Meal Schedule & Chauffeur Transit Drop/Pickup Timings ({currentDriverRouteDay?.date || selectedDate})
                                </span>
                                <span className="text-[10px] text-[#A1A1AA] font-mono block mt-0.5">
                                  Meal timings for chauffeur: drop guests 15 mins prior and standby for pickup.
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                                Day {activeDriverDayNum} Dining Duty
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                              {/* Breakfast */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Coffee className="w-3 h-3 text-[#C5A059]" /> Breakfast / Morning
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.breakfast.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.breakfast.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.breakfast.driverDuty}
                                </div>
                              </div>

                              {/* Royal Lunch */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Utensils className="w-3 h-3 text-[#C5A059]" /> Royal Lunch
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.lunch.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.lunch.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.lunch.driverDuty}
                                </div>
                              </div>

                              {/* Sunset High-Tea */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Coffee className="w-3 h-3 text-[#C5A059]" /> Sunset High-Tea
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.highTea.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.highTea.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.highTea.driverDuty}
                                </div>
                              </div>

                              {/* Evening Royal Dinner */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Wine className="w-3 h-3 text-[#C5A059]" /> Evening Dinner
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.dinner.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.dinner.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.dinner.driverDuty}
                                </div>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#121212] border border-amber-900/40 text-xs text-amber-300 font-mono flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span><strong>Chauffeur Dining Protocol:</strong> Drop guests at dining venue 15 minutes before scheduled reservation. Maintain AC cabin pre-cooled to 21°C. Standby at entrance/dock for return transit.</span>
                            </div>
                          </div>

                      
                        </div>
                      )}

                      {/* Card Footer: Partner Notes & Sync */}
                      <div className="pt-3 border-t border-[#242424] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 text-xs">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={
                            partner.role === "hotel"
                              ? isCampPartner
                                ? "Add camp note (e.g. Tent #03 inspected, naturalist briefed, high-tea ready)..."
                                : "Add hotel note (e.g. Suite #204 inspected, champagne chilled, welcome jetty ready)..."
                              : partner.role === "guide"
                              ? "Add tour guide note (e.g. ASI permits collected, lobby meeting at 09:15 IST)..."
                              : "Add chauffeur note (e.g. Defender prepped with cold towels, reporting at 13:15 IST)..."
                          }
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
      {/* VIEW 2: MASTER BOOKING DOSSIERS (LIST VIEW WITH FULL ROUTE & EXCURSIONS) */}
      {/* ========================================================================= */}
      {viewMode === "dossiers" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                {partner.role === "driver"
                  ? "Chauffeur Route Dispatches, Pickup/Drop & Excursions"
                  : partner.role === "guide"
                  ? "Tour Guide Excursions, Monument Permits & Itinerary Allocations"
                  : isCampPartner
                  ? "Wilderness Camp Bookings, Tents, Safaris & Adventure Manifests"
                  : "Master Booking Dossiers & Itinerary Allocations"}
              </h2>
              <p className="text-xs text-[#888888] mt-0.5">
                {isCampPartner
                  ? "Review assigned VIP guests, luxury tented pavilions, dawn leopard safaris, camp games, and farm-to-table bush menus."
                  : "Review assigned VIP guests, scheduled travel dates, exact airport arrival times, and day-by-day fine dining gourmet menus."}
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
              const isDirectlyAssigned =
                assignment?.partnerId === partner.id ||
                (isCampPartner &&
                  (lead.destinationSummary.toLowerCase().includes("jawai") ||
                    lead.destinations.some((d) => d.toLowerCase().includes("jawai"))));
              const isMenuExpanded = expandedMenuLeadId === lead.id;
              const activeDayNum = activeRouteDayNumber[lead.id] || 1;
              const currentRouteDay = lead.routeSchedule?.find((r) => r.dayNumber === activeDayNum) || lead.routeSchedule?.[0];
              const activeGuideDayNum = activeGuideDayNumber[lead.id] || (lead.guideSchedule?.[0]?.dayNumber || 1);
              const currentGuideDay = lead.guideSchedule?.find((g) => g.dayNumber === activeGuideDayNum) || lead.guideSchedule?.[0];
              const activeCampDayNum = activeCampDayNumber[lead.id] || (lead.campSchedule?.[0]?.dayNumber || 1);
              const currentCampDay = lead.campSchedule?.find((c) => c.dayNumber === activeCampDayNum) || lead.campSchedule?.[0];

              return (
                <div
                  key={lead.id}
                  className={`p-4 sm:p-6 lg:p-7 rounded-2xl border transition-all ${
                    isDirectlyAssigned
                      ? "bg-[#181818] border-[#C5A059]/50 shadow-2xl"
                      : "bg-[#141414] border-[#292929]"
                  }`}
                >
                  {/* Card Header with Privacy Notice */}
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
                            {partner.role === "guide"
                              ? "✓ Assigned to Your Tour Guide Roster"
                              : partner.role === "driver"
                              ? "✓ Assigned to Your Fleet"
                              : "✓ Assigned to Your Hotel Property"}
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
                          isCampPartner ? (
                            <>
                              <option value="Tent Suite Prepped & Inspected">Tent Suite Prepped & Inspected</option>
                              <option value="Safari Jeep Ready & Trackers Briefed">Safari Jeep Ready & Trackers Briefed</option>
                              <option value="Guests In Camp / Checked-In">Guests In Camp / Checked-In</option>
                              <option value="On Leopard Safari Drive">On Leopard Safari Drive</option>
                              <option value="Bush Dinner In Progress">Bush Dinner In Progress</option>
                              <option value="Check-Out / Departure Handover">Check-Out / Departure Handover</option>
                            </>
                          ) : (
                            <>
                              <option value="Pending Confirmation">Pending Confirmation</option>
                              <option value="Accepted">Accepted by Reservations</option>
                              <option value="Room Suite Reserved">Room Suite Reserved</option>
                              <option value="VIP Welcome Ready">VIP Welcome Ready</option>
                              <option value="Checked-In">Checked-In</option>
                              <option value="Checked-Out">Checked-Out</option>
                            </>
                          )
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

                  {/* VIP Privacy Notice (Client Phone/Email Withheld) */}
                  <div className="my-3 p-3 rounded-xl bg-[#141414] border border-[#242424] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-[11px] text-[#A1A1AA]">
                        <strong className="text-amber-300">Confidential VIP Guest:</strong> Direct contact withheld for client security. Route coordination managed 24/7 by SoulsVenture Curator ({lead.assignedCurator}).
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/919820144521?text=${encodeURIComponent(
                        `Namaste ${lead.assignedCurator}. This is ${partner.name}. Checking regarding VIP booking ${lead.clientName} (${lead.referenceCode}). Current status: ${currentStatus}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-mono text-[11px] whitespace-nowrap self-end sm:self-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contact Curator</span>
                    </a>
                  </div>

                  {/* ========================================================= */}
                  {/* TOUR GUIDE DOSSIER: KEY LOGISTICS & EXCURSION WALKTHROUGH */}
                  {/* ========================================================= */}
                  {partner.role === "guide" ? (
                    <div className="space-y-4 my-3">
                      {/* 1. Guide Key Logistics Ribbon (Hotel & Driver Details at top) */}
                      <div className="p-4 rounded-xl bg-[#161616] border border-amber-900/50 space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#252525] pb-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-amber-400" />
                            Tour Guide Excursion & Historical Walkthrough Manifest ({arr?.totalDays || lead.duration})
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-700/60 font-semibold">
                              ASI Permit: #{currentGuideDay?.asiPermitNumber || lead.guideSchedule?.[0]?.asiPermitNumber || "ASI-ROYAL-MWR-782"}
                            </span>
                            <span className="text-[10px] font-mono text-[#D4D4D8] bg-[#222] px-2 py-0.5 rounded border border-[#333]">
                              {lead.guideSchedule?.length || 1} Days Planned
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Guide Duty Hours</span>
                            <span className="font-mono text-amber-300 font-bold text-sm block">
                              {currentGuideDay?.reportingTime || "09:15 IST"}
                            </span>
                            <span className="text-[9px] text-[#888] font-mono block">Tour: {currentGuideDay?.tourStartTime || "09:30"} – {currentGuideDay?.tourEndTime || "18:30 IST"}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Stay Hotel & Suite</span>
                            <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                              {currentGuideDay?.stayHotel.hotelName || "The Oberoi Udaivilas"}
                            </span>
                            <span className="text-[9px] text-emerald-400 font-mono block">{currentGuideDay?.stayHotel.roomType || "Kohinoor Suite #204"}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Hotel Front Desk</span>
                            <span className="font-mono text-[#C5A059] font-medium block leading-tight">
                              {currentGuideDay?.stayHotel.frontDeskPhone || "+91 294 243 3300"}
                            </span>
                            <span className="text-[9px] text-[#888] font-mono block">Chief Concierge Desk</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Assigned Chauffeur & Fleet</span>
                            <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                              {currentGuideDay?.transportCoordination.chauffeurName || "Vikram Singh (Fleet Lead)"}
                            </span>
                            <span className="text-[9px] text-sky-400 font-mono block">
                              {currentGuideDay?.transportCoordination.vehicleModel} ({currentGuideDay?.transportCoordination.licensePlate || "RJ 27 EA 0001"})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Day-by-Day Guide Excursion Tabs (All Days Pre-Decided for Tour Guide) */}
                      {lead.guideSchedule && lead.guideSchedule.length > 0 && (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-[#2B2B2B] space-y-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                            <div>
                              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5 text-amber-400" />
                                Day-by-Day Heritage Excursions & Monument Walkthrough (What to Visit, Hotels & Menus)
                              </span>
                              <span className="text-[10px] text-[#888] font-mono block mt-0.5">
                                Complete {lead.guideSchedule.length}-day schedule for Tour Guide ({arr?.totalDays || lead.duration}):
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded border border-amber-800">
                              Day {activeGuideDayNum} Active
                            </span>
                          </div>

                          {/* Day Selector Pills */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {lead.guideSchedule.map((g) => (
                              <button
                                key={g.dayNumber}
                                type="button"
                                onClick={() =>
                                  setActiveGuideDayNumber((prev) => ({ ...prev, [lead.id]: g.dayNumber }))
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                  activeGuideDayNum === g.dayNumber
                                    ? "bg-amber-950 text-amber-200 border border-amber-600 font-bold shadow-sm"
                                    : "bg-[#1E1E1E] text-[#888] hover:text-[#D4D4D8] border border-[#333]"
                                }`}
                              >
                                Day {g.dayNumber} ({g.date.slice(5)})
                              </button>
                            ))}
                          </div>

                          {/* Active Guide Day Card */}
                          {currentGuideDay && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#121212] border border-[#242424] space-y-4 text-xs">
                              {/* Day Header */}
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-3">
                                <div>
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                    Day {currentGuideDay.dayNumber}: {currentGuideDay.tourTheme}
                                  </span>
                                  <h5 className="font-serif text-lg text-[#FDFBF7] font-semibold mt-0.5">
                                    {currentGuideDay.dayTitle} ({currentGuideDay.date})
                                  </h5>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
                                    Duty: {currentGuideDay.reportingTime} – {currentGuideDay.tourEndTime}
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                    Permit #{currentGuideDay.asiPermitNumber || "ASI-ROYAL-MWR-782"}
                                  </span>
                                </div>
                              </div>

                              {/* 1. Monuments & Excursions to Visit */}
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                  🏛️ Monuments & Sites to Visit (Walkthrough Highlights & Entry Slots):
                                </span>
                                <div className="grid grid-cols-1 gap-2.5">
                                  {currentGuideDay.monumentVisits.map((visit, i) => (
                                    <div
                                      key={i}
                                      className="p-3.5 rounded-xl bg-[#171717] border border-[#262626] space-y-1.5"
                                    >
                                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                                        <div className="flex items-center gap-2">
                                          <span className="w-5 h-5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-800 flex items-center justify-center text-[10px] font-mono font-bold">
                                            {i + 1}
                                          </span>
                                          <span className="font-serif text-sm text-[#FDFBF7] font-semibold">
                                            {visit.siteName}
                                          </span>
                                          <span className="text-[10px] font-mono text-[#888]">
                                            ({visit.duration})
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F1F1F] text-[#C5A059] border border-[#333]">
                                            Slot: {visit.entrySlot}
                                          </span>
                                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-200 border border-amber-800/80">
                                            {visit.accessType}
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-[#A1A1AA] text-xs pl-7 leading-relaxed">
                                        <strong className="text-amber-200/90 font-mono text-[11px]">Walkthrough Highlights: </strong>
                                        {visit.highlights}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 2. Hotel Stay, Location & Front Desk Coordination */}
                              <div className="p-3.5 sm:p-4 rounded-xl bg-[#161616] border border-emerald-950 space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                                  <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold block flex items-center gap-1.5">
                                    <Hotel className="w-3.5 h-3.5" />
                                    🏨 Guest Hotel Stay, Location & Front Desk Coordination (Day {activeGuideDayNum})
                                  </span>
                                  <span className="text-[10px] font-mono text-[#888]">
                                    Check-in: {currentGuideDay.stayHotel.checkInTime} • Check-out: {currentGuideDay.stayHotel.checkOutTime}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                    <span className="text-[9px] text-[#71717A] uppercase font-mono block">Hotel Name & Location:</span>
                                    <p className="font-serif text-[#FDFBF7] font-semibold">{currentGuideDay.stayHotel.hotelName}</p>
                                    <p className="text-[11px] text-[#A1A1AA] flex items-start gap-1 mt-0.5">
                                      <MapPin className="w-3 h-3 text-[#C5A059] flex-shrink-0 mt-0.5" />
                                      <span>{currentGuideDay.stayHotel.hotelAddress || "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola Waterfront, Udaipur, Rajasthan 313001"}</span>
                                    </p>
                                  </div>
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                    <span className="text-[9px] text-[#71717A] uppercase font-mono block">Suite & Meeting Point:</span>
                                    <p className="font-serif text-[#FDFBF7] font-semibold">{currentGuideDay.stayHotel.roomType}</p>
                                    <span className="text-[11px] text-[#C5A059] block mt-0.5 font-medium leading-snug">
                                      Lobby Rendezvous: {currentGuideDay.meetingPoint}
                                    </span>
                                  </div>
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222] space-y-1.5">
                                    <span className="text-[9px] text-[#71717A] uppercase font-mono block">Front Desk / Concierge Phone:</span>
                                    <p className="font-mono text-emerald-400 font-bold text-xs">
                                      {currentGuideDay.stayHotel.frontDeskPhone || currentGuideDay.stayHotel.conciergeContact || "+91 294 243 3300"}
                                    </p>
                                    <a
                                      href={`tel:${(currentGuideDay.stayHotel.frontDeskPhone || "+91 294 243 3300").replace(/\s+/g, "")}`}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#222] hover:bg-[#2A2A2A] text-xs font-mono text-[#D4D4D8] border border-[#333]"
                                    >
                                      <Phone className="w-3 h-3 text-emerald-400" />
                                      <span>Call Front Desk</span>
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* 3. Full Day Gastronomy & Food Menu */}
                              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] space-y-2">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block flex items-center gap-1.5">
                                  <Utensils className="w-3.5 h-3.5" />
                                  🍽️ Day Gastronomy & Dining Menu Briefing (Day {activeGuideDayNum}):
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Breakfast</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentGuideDay.diningBriefing.breakfast}</p>
                                  </div>
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Royal Lunch</span>
                                    <span className="text-[9px] text-sky-300 font-mono block">{currentGuideDay.diningBriefing.lunchVenue}</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentGuideDay.diningBriefing.lunchMenu}</p>
                                  </div>
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Sunset High-Tea</span>
                                    <span className="text-[9px] text-amber-300 font-mono block">{currentGuideDay.diningBriefing.highTeaVenue}</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentGuideDay.diningBriefing.highTeaMenu}</p>
                                  </div>
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Evening Banquet</span>
                                    <span className="text-[9px] text-rose-300 font-mono block">{currentGuideDay.diningBriefing.dinnerVenue}</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentGuideDay.diningBriefing.dinnerMenu}</p>
                                  </div>
                                </div>
                                <div className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-900/40">
                                  <strong>Strict Dietary Directives:</strong> {currentGuideDay.diningBriefing.dietaryRestrictions}
                                </div>
                              </div>

                              {/* 4. Assigned Chauffeur & Fleet Coordination (With Direct Contact) */}
                              <div className="p-3.5 sm:p-4 rounded-xl bg-[#161616] border border-sky-950 space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                                  <span className="text-[11px] font-mono uppercase text-sky-400 font-semibold block flex items-center gap-1.5">
                                    <Navigation className="w-3.5 h-3.5" />
                                    🚗 Assigned Chauffeur & Fleet Coordination (Day {activeGuideDayNum})
                                  </span>
                                  <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                                    Duty Chauffeur Assigned
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                    <span className="text-[9px] font-mono uppercase text-[#71717A] block">Chauffeur Details:</span>
                                    <p className="font-serif text-[#FDFBF7] font-semibold text-sm">
                                      {currentGuideDay.transportCoordination.chauffeurName || "Vikram Singh (Royal Chauffeur Fleet)"}
                                    </p>
                                    <p className="font-mono text-xs text-[#C5A059]">
                                      Direct: {currentGuideDay.transportCoordination.chauffeurPhone || "+91 98290 11222"}
                                    </p>
                                    <div className="flex items-center gap-2 pt-1.5">
                                      <a
                                        href={`tel:${(currentGuideDay.transportCoordination.chauffeurPhone || "+91 98290 11222").replace(/\s+/g, "")}`}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#222] hover:bg-[#2A2A2A] text-[11px] font-mono text-[#D4D4D8] border border-[#333]"
                                      >
                                        <Phone className="w-3 h-3 text-sky-400" />
                                        <span>Call Driver</span>
                                      </a>
                                      <a
                                        href={`https://wa.me/${(currentGuideDay.transportCoordination.chauffeurPhone || "+91 98290 11222").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                          `Namaste ${currentGuideDay.transportCoordination.chauffeurName || "Vikram Singh"}. This is ${partner.name} (Tour Guide) re: Guest ${lead.clientName}. Day ${activeGuideDayNum} tour coordination:`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-[11px] font-mono text-emerald-300 border border-emerald-800"
                                      >
                                        <MessageCircle className="w-3 h-3" />
                                        <span>WhatsApp</span>
                                      </a>
                                    </div>
                                  </div>

                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                    <span className="text-[9px] font-mono uppercase text-[#71717A] block">Vehicle Model & Plate:</span>
                                    <p className="font-serif text-[#FDFBF7] font-semibold text-sm">
                                      {currentGuideDay.transportCoordination.vehicleModel || "Land Rover Defender 110 4WD"}
                                    </p>
                                    <span className="text-[10px] font-mono text-sky-300 block">
                                      Plate: {currentGuideDay.transportCoordination.licensePlate || "RJ 27 EA 0001"}
                                    </span>
                                    <span className="text-[10px] text-[#888] font-mono block">
                                      Stationed at Hotel Lobby 15 mins before tour
                                    </span>
                                  </div>

                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                    <span className="text-[9px] font-mono uppercase text-[#71717A] block">Transit Route & Drop Point:</span>
                                    <p className="text-[11px] text-[#D4D4D8] leading-relaxed">
                                      {currentGuideDay.transportCoordination.routeDescription}
                                    </p>
                                    <span className="text-[10px] font-mono text-emerald-400 block pt-1 border-t border-[#222]">
                                      Drop-off: {currentGuideDay.transportCoordination.dropoffPoint}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* 5. Special Guide Directives */}
                              {currentGuideDay.specialGuideNotes && (
                                <div className="p-3 rounded-lg bg-[#141414] border border-amber-900/30 text-xs text-[#A1A1AA] italic">
                                  <strong className="text-amber-300 font-mono uppercase not-italic text-[10px] block mb-0.5">
                                    Senior Historian Storytelling Directives:
                                  </strong>
                                  "{currentGuideDay.specialGuideNotes}"
                                </div>
                              )}
                            </div>
                          )}

                          {/* 6. All-Days Tour Master Roadmap */}
                          <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
                            <span className="text-[10px] font-mono uppercase text-[#A1A1AA] font-semibold block">
                              📋 Full {lead.guideSchedule.length}-Day Tour Itinerary Roadmap (All Days At a Glance):
                            </span>
                            <div className="space-y-1.5">
                              {lead.guideSchedule.map((g) => (
                                <div
                                  key={g.dayNumber}
                                  onClick={() => setActiveGuideDayNumber((prev) => ({ ...prev, [lead.id]: g.dayNumber }))}
                                  className={`p-2 rounded-lg border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 cursor-pointer transition-all ${
                                    activeGuideDayNum === g.dayNumber
                                      ? "bg-[#1E1E1E] border-amber-600/70 text-[#FDFBF7]"
                                      : "bg-[#101010] border-[#222] text-[#888] hover:border-[#333] hover:text-[#CCC]"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-amber-300 font-bold">
                                      Day {g.dayNumber}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#A1A1AA]">{g.date}</span>
                                    <span className="font-serif font-medium text-xs text-[#E4E4E7] truncate max-w-[240px] sm:max-w-[340px]">
                                      {g.dayTitle}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] font-mono">
                                    <span className="text-amber-300">Duty: {g.reportingTime} – {g.tourEndTime}</span>
                                    <span>•</span>
                                    <span className="text-emerald-400">{g.stayHotel.hotelName}</span>
                                    <span>•</span>
                                    <span className="text-sky-300">{g.transportCoordination.chauffeurName.split(" ")[0]} ({g.transportCoordination.licensePlate})</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : isCampPartner ? (
                    <div className="space-y-4 my-3">
                      {/* Camp Key Logistics Ribbon */}
                      <div className="p-4 rounded-xl bg-[#161616] border border-emerald-900/50 space-y-2.5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#252525] pb-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
                            <Tent className="w-3.5 h-3.5 text-emerald-400" />
                            Wilderness Camp, Tented Pavilions & Safari Manifest ({arr?.totalDays || lead.duration})
                          </span>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-700/60 font-semibold">
                            Tent Allocation: {currentCampDay?.tentAccommodation.tentNumber || "Royal Tented Pavilion #03"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Game Drive Hours</span>
                            <span className="font-mono text-emerald-300 font-bold text-sm block">
                              {currentCampDay?.adventureAndSafaris[0]?.timeSlot || "06:00 – 09:00 IST"}
                            </span>
                            <span className="text-[9px] text-[#888] font-mono block">Dawn & Sunset Safaris</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Assigned Naturalist</span>
                            <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                              {currentCampDay?.adventureAndSafaris[0]?.leadTracker || "Senior Naturalist Salim"}
                            </span>
                            <span className="text-[9px] text-emerald-400/80 font-mono block">Head Wilderness Tracker</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Dedicated Private Butler</span>
                            <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                              {currentCampDay?.tentAccommodation.butlerAssigned || "Butler Kalu Singh (24/7)"}
                            </span>
                            <span className="text-[9px] text-amber-300 font-mono block">Pavilion Room Service</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Safari 4x4 Fleet</span>
                            <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                              {currentCampDay?.adventureAndSafaris[0]?.vehicleFleet || "Custom 4x4 Open Safari Jeep #02"}
                            </span>
                            <span className="text-[9px] text-sky-400 font-mono block">Hydraulic Camera Mounts</span>
                          </div>
                        </div>
                      </div>

                      {/* Day-by-Day Wilderness & Safari Tabs */}
                      {lead.campSchedule && lead.campSchedule.length > 0 && (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-[#2B2B2B] space-y-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
                              <Tent className="w-3.5 h-3.5 text-emerald-400" />
                              Day-by-Day Wilderness Itinerary (Tents, Safaris, Camp Games & Bush Menus)
                            </span>
                            <span className="text-[10px] font-mono text-[#888]">
                              Select camp day to view details:
                            </span>
                          </div>

                          {/* Day Selector Pills */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {lead.campSchedule.map((c) => (
                              <button
                                key={c.dayNumber}
                                type="button"
                                onClick={() =>
                                  setActiveCampDayNumber((prev) => ({ ...prev, [lead.id]: c.dayNumber }))
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                  activeCampDayNum === c.dayNumber
                                    ? "bg-emerald-950 text-emerald-200 border border-emerald-600 font-bold shadow-sm"
                                    : "bg-[#1E1E1E] text-[#888] hover:text-[#D4D4D8] border border-[#333]"
                                }`}
                              >
                                Day {c.dayNumber} ({c.date.slice(5)})
                              </button>
                            ))}
                          </div>

                          {/* Active Camp Day Card */}
                          {currentCampDay && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#121212] border border-[#242424] space-y-4 text-xs">
                              {/* Day Header */}
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-3">
                                <div>
                                  <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">
                                    Day {currentCampDay.dayNumber}: {currentCampDay.campTheme}
                                  </span>
                                  <h5 className="font-serif text-lg text-[#FDFBF7] font-semibold mt-0.5">
                                    {currentCampDay.dayTitle}
                                  </h5>
                                </div>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                                  {currentCampDay.adventureAndSafaris.length} Adventure Excursions
                                </span>
                              </div>

                              {/* 1. Tents & Pavilion Accommodation ("Kya kya tents etc dena hai") */}
                              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] space-y-2">
                                <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block flex items-center gap-1.5">
                                  <Tent className="w-3.5 h-3.5" />
                                  ⛺ Luxury Tents & Accommodation Setup (Kya kya tents & bedding dena hai):
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] text-[#71717A] uppercase font-mono block">Tent Suite</span>
                                    <p className="font-serif text-[#FDFBF7] font-semibold mt-0.5">{currentCampDay.tentAccommodation.tentNumber}</p>
                                    <span className="text-[9px] text-emerald-400 font-mono">{currentCampDay.tentAccommodation.viewOrientation}</span>
                                  </div>
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] text-[#71717A] uppercase font-mono block">Bedding Setup</span>
                                    <p className="font-serif text-[#D4D4D8] text-[11px] leading-snug mt-0.5">{currentCampDay.tentAccommodation.bedConfiguration}</p>
                                  </div>
                                  <div className="p-2.5 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] text-[#71717A] uppercase font-mono block">Personal Butler & Climate</span>
                                    <p className="font-serif text-[#C5A059] text-[11px] mt-0.5">{currentCampDay.tentAccommodation.butlerAssigned}</p>
                                    <span className="text-[9px] text-[#888] font-mono block">{currentCampDay.tentAccommodation.climateControl}</span>
                                  </div>
                                </div>
                              </div>

                              {/* 2. Adventure & Safaris ("Kya kya adventure dena hai") */}
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">
                                  🐆 Adventure & Safaris to Provide (Kya kya adventure karwana hai):
                                </span>
                                <div className="grid grid-cols-1 gap-2.5">
                                  {currentCampDay.adventureAndSafaris.map((adv, i) => (
                                    <div
                                      key={i}
                                      className="p-3 rounded-xl bg-[#171717] border border-[#262626] space-y-1.5"
                                    >
                                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                                        <div className="flex items-center gap-2">
                                          <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center justify-center text-[10px] font-mono font-bold">
                                            {i + 1}
                                          </span>
                                          <span className="font-serif text-sm text-[#FDFBF7] font-semibold">
                                            {adv.activityName}
                                          </span>
                                          <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80">
                                            {adv.terrainAndIntensity}
                                          </span>
                                        </div>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F1F1F] text-[#C5A059] border border-[#333]">
                                          Slot: {adv.timeSlot}
                                        </span>
                                      </div>
                                      <p className="text-[#A1A1AA] text-xs pl-7 leading-relaxed">
                                        {adv.activityDescription}
                                      </p>
                                      <div className="pl-7 pt-1 flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#888]">
                                        <span>Tracker: <strong className="text-[#D4D4D8]">{adv.leadTracker}</strong></span>
                                        <span>•</span>
                                        <span>Fleet: <strong className="text-sky-300">{adv.vehicleFleet}</strong></span>
                                        <span>•</span>
                                        <span>Gear: <strong className="text-amber-300/90">{adv.equipmentProvided}</strong></span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 3. Camp Games & Leisure ("Kya kya games dena hai") */}
                              {currentCampDay.campGamesAndLeisure && currentCampDay.campGamesAndLeisure.length > 0 && (
                                <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] space-y-2">
                                  <span className="text-[10px] font-mono uppercase text-amber-300 font-semibold block flex items-center gap-1.5">
                                    <Target className="w-3.5 h-3.5" />
                                    🏹 Camp Games, Archery & Leisure (Kya kya games & activities dena hai):
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    {currentCampDay.campGamesAndLeisure.map((game, i) => (
                                      <div key={i} className="p-2.5 rounded-lg bg-[#111111] border border-[#222] space-y-0.5">
                                        <div className="flex items-center justify-between">
                                          <span className="font-serif text-[#FDFBF7] font-semibold text-xs">{game.gameName}</span>
                                          <span className="text-[10px] font-mono text-[#C5A059]">{game.timing}</span>
                                        </div>
                                        <p className="text-[11px] text-[#A1A1AA]">{game.description}</p>
                                        <span className="text-[9px] font-mono text-emerald-400 block pt-0.5">Venue: {game.venue}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* 4. Bush Dining & Menus ("Kya menu hai food ka") */}
                              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] space-y-2">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block flex items-center gap-1.5">
                                  <Flame className="w-3.5 h-3.5" />
                                  🔥 Bush Gastronomy & Dining Menus (Kya menu hai food ka):
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                                  <div className="p-2 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Dawn Pre-Safari</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentCampDay.bushDiningAndMenu.dawnRefreshment}</p>
                                  </div>
                                  <div className="p-2 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Bush Breakfast</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentCampDay.bushDiningAndMenu.breakfast}</p>
                                  </div>
                                  <div className="p-2 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Sunset Sundowner</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentCampDay.bushDiningAndMenu.sundownerHighTea}</p>
                                  </div>
                                  <div className="p-2 rounded-lg bg-[#111111] border border-[#222]">
                                    <span className="text-[9px] font-mono uppercase text-[#C5A059] block">Campfire Dinner</span>
                                    <p className="text-[#D4D4D8] text-[11px] leading-relaxed mt-0.5">{currentCampDay.bushDiningAndMenu.bushDinner}</p>
                                  </div>
                                </div>
                                <div className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-900/40">
                                  <strong>Strict Dietary Directives:</strong> {currentCampDay.bushDiningAndMenu.dietaryDirectives}
                                </div>
                              </div>

                              {/* 5. Field Gear Checklist & Naturalist Notes */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                    🎒 Field Gear & Expedition Checklist:
                                  </span>
                                  <ul className="space-y-0.5 text-[11px] text-[#A1A1AA]">
                                    {currentCampDay.fieldGearChecklist.map((item, i) => (
                                      <li key={i} className="flex items-start gap-1">
                                        <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-3 rounded-lg bg-[#111111] border border-amber-900/30 text-xs text-[#A1A1AA] italic space-y-1">
                                  <strong className="text-amber-300 font-mono uppercase not-italic text-[10px] block mb-0.5">
                                    Senior Naturalist Briefing:
                                  </strong>
                                  "{currentCampDay.seniorNaturalistNotes}"
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : partner.role === "hotel" ? (
                    <div className="space-y-4 my-3">
                      {/* Hotel Key Logistics Ribbon */}
                      {arr && (
                        <div className="p-4 rounded-xl bg-[#111111] border border-[#262626] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold flex items-center gap-1.5">
                              <Hotel className="w-3.5 h-3.5" />
                              Hotel Reservation Logistics: Stay Duration, Check-In / Out & Suite Tier
                            </span>
                            <span className="text-[10px] font-mono text-[#A1A1AA]">
                              {arr.totalDays || lead.duration}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-In</span>
                              <span className="font-mono text-[#C5A059] font-bold text-sm block">{arr.arrivalDate} • {arr.checkInTime || "14:00 IST"}</span>
                              <span className="text-[9px] text-[#888] font-mono block">Welcome Ceremony Ready</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-Out</span>
                              <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{arr.checkOutDate || "Nov 19, 2026"} • {arr.checkOutTime || "12:00 IST"}</span>
                              <span className="text-[9px] text-emerald-400 font-mono block">Departure Handover</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Allocated Luxury Suite</span>
                              <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{lead.clientNuances?.roomPreferences?.[0] || "Kohinoor Lake View Suite #204"}</span>
                              <span className="text-[9px] text-sky-400 font-mono block">Lake Pichola Sanctuary</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Total Stay Duration</span>
                              <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{arr.totalDays || lead.duration}</span>
                              <span className="text-[9px] text-amber-300 font-mono block">Confirmed Reservation</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* VIP Room Preferences & Nuances */}
                      {lead.clientNuances && (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-[#2B2B2B] space-y-3">
                          <div className="flex items-center justify-between border-b border-[#242424] pb-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                              VIP Guest Suite Preferences & Welcome Directives
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400">
                              5-Star Service Standard
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {lead.clientNuances.roomPreferences && (
                              <div className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block">
                                  Suite & Housekeeping Requirements:
                                </span>
                                <ul className="space-y-1 text-[#A1A1AA] text-[11px]">
                                  {lead.clientNuances.roomPreferences.map((pref, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                      <span>{pref}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="space-y-2.5">
                              {lead.clientNuances.beveragePreferences && (
                                <div className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                    In-Suite Beverage & Mini-Bar Setup:
                                  </span>
                                  <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                                    {lead.clientNuances.beveragePreferences.join(" • ")}
                                  </p>
                                </div>
                              )}

                              {lead.clientNuances.milestoneEvents && lead.clientNuances.milestoneEvents.length > 0 && (
                                <div className="p-3 rounded-lg bg-[#111111] border border-amber-900/40 space-y-0.5">
                                  <span className="text-[10px] font-mono uppercase text-amber-300 font-semibold block flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-amber-400" />
                                    VIP Milestone Celebration:
                                  </span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">
                                    {lead.clientNuances.milestoneEvents[0].title} ({lead.clientNuances.milestoneEvents[0].relation})
                                  </p>
                                  <span className="text-[10px] text-[#888] font-mono block">
                                    Date: {lead.clientNuances.milestoneEvents[0].date}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Arrival Welcome Protocol */}
                          <div className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1 text-xs">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block">
                              VIP Arrival Welcome Protocol at Hotel Porch / Jetty:
                            </span>
                            <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                              {arr?.transferProtocol || lead.clientNuances?.specialProtocol || "Private Shikara boat across Lake Pichola with rose petal shower and traditional nagada drums at Badi Pal Jetty. In-suite registration upon arrival with luggage delivered directly to suite."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Driver Key Logistics Ribbon: Duration, Reporting, Pickup & Final Drop */}
                      {arr && (
                    <div className="my-4 p-4 rounded-xl bg-[#111111] border border-[#262626] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Logistics: Booking Duration, Reporting Time & Pickup / Drop Points
                        </span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]">
                          {arr.totalDays || lead.duration}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Guest Arrival Time</span>
                          <span className="font-mono text-[#C5A059] font-bold text-sm">{arr.arrivalTime || "13:45 IST"}</span>
                          <span className="text-[9px] text-[#888] font-mono block">Chauffeur Ready: {arr.pickupReportingTime}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Pickup Point (Day 1)</span>
                          <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{arr.pickupLocation}</span>
                          <span className="text-[9px] text-sky-400 font-mono block">Gate 2 Placard</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Drop-off Destination</span>
                          <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{arr.dropoffLocation}</span>
                          <span className="text-[9px] text-emerald-400 font-mono block">Check-in {arr.checkInTime}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Final Departure Drop</span>
                          <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{arr.finalDropoffTime || "Udaipur Airport Gate 1"}</span>
                          <span className="text-[9px] text-rose-400 font-mono block">Trip End</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Day-by-Day Route & Sightseeing Itinerary ("frist day pr kha se kha jana h khakha visite krwana h") */}
                  {lead.routeSchedule && lead.routeSchedule.length > 0 && (
                    <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-[#2B2B2B] space-y-3.5 my-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-sky-400" />
                          Day-by-Day Route Itinerary & Sightseeing Plan (Where to go & What to visit)
                        </span>
                        <span className="text-[10px] font-mono text-[#888]">
                          Select a day to view exact route & monuments:
                        </span>
                      </div>

                      {/* Day Selector Pills */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {lead.routeSchedule.map((r) => (
                          <button
                            key={r.dayNumber}
                            type="button"
                            onClick={() =>
                              setActiveRouteDayNumber((prev) => ({ ...prev, [lead.id]: r.dayNumber }))
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                              activeDayNum === r.dayNumber
                                ? "bg-sky-950 text-sky-200 border border-sky-600 font-bold shadow-sm"
                                : "bg-[#1E1E1E] text-[#888] hover:text-[#D4D4D8] border border-[#333]"
                            }`}
                          >
                            Day {r.dayNumber} ({r.date.slice(5)})
                          </button>
                        ))}
                      </div>

                      {/* Active Day Route Card */}
                      {currentRouteDay && (
                        <div className="p-4 rounded-xl bg-[#111111] border border-[#262626] space-y-3.5 text-xs">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-2">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                Day {currentRouteDay.dayNumber} Schedule ({currentRouteDay.date})
                              </span>
                              <h5 className="font-serif text-base text-[#FDFBF7] font-semibold mt-0.5">
                                {currentRouteDay.dayTitle}
                              </h5>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800 font-medium">
                                Reporting (Jana hai): <strong>{currentRouteDay.reportingTime}</strong>
                              </span>
                              <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded border border-sky-800 font-medium">
                                Release (Aana hai): <strong>{currentRouteDay.releaseTime}</strong>
                              </span>
                            </div>
                          </div>

                          {/* Where to go from where */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase text-[#71717A] block">
                              Transit Route (From where to where):
                            </span>
                            <p className="font-serif text-[#FDFBF7] text-sm leading-relaxed bg-[#161616] p-2.5 rounded-lg border border-[#222]">
                              {currentRouteDay.routeOverview}
                            </p>
                            <div className="flex items-center gap-3 text-[10px] font-mono text-[#888] pt-0.5">
                              <span>Distance: <strong className="text-[#D4D4D8]">{currentRouteDay.distanceKm} km</strong></span>
                              <span>•</span>
                              <span>Est. Travel Time: <strong className="text-[#D4D4D8]">{currentRouteDay.travelDuration}</strong></span>
                              <span>•</span>
                              <span>Pickup: <strong className="text-sky-300">{currentRouteDay.startLocation}</strong></span>
                              <span>➔</span>
                              <span>Drop: <strong className="text-emerald-300">{currentRouteDay.endLocation}</strong></span>
                            </div>
                          </div>

                          {/* Sightseeing spots to visit */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                              Excursions & Sightseeing to Visit (Khakha visit karwana hai):
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {currentRouteDay.sightseeingVisits.map((visit, i) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-lg bg-[#161616] border border-[#242424] flex items-start gap-2 text-xs"
                                >
                                  <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                                  <span className="text-[#D4D4D8] font-medium">{visit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Chauffeur Directives */}
                          {currentRouteDay.chauffeurDirectives && (
                            <div className="p-2.5 rounded-lg bg-[#141414] border border-[#222] text-xs text-[#A1A1AA] leading-relaxed">
                              <strong className="text-sky-400 font-mono block text-[10px] uppercase mb-0.5">
                                Chauffeur Directives:
                              </strong>
                              {currentRouteDay.chauffeurDirectives}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  
                    </>
                  )}
                  {/* Dining Schedule: Timed Transit Coordinates for Driver vs Gourmet Plan for Others */}
                  {partner.role === "driver" ? (
                    (() => {
                      const dSchedule = getDriverMealSchedule(lead, activeDayNum, currentRouteDay?.date);
                      return (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-amber-900/40 space-y-3.5 my-3">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#262626] pb-2">
                            <div>
                              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-[#C5A059]" />
                                Day {activeDayNum} Guest Dining Timings & Chauffeur Standby ({currentRouteDay?.date || lead.dateKey})
                              </span>
                              <span className="text-[10px] text-[#A1A1AA] font-mono block mt-0.5">
                                Meal schedule for chauffeur: drop guests 15 mins prior and standby for pickup.
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                              Day {activeDayNum} Dining Duty
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Coffee className="w-3 h-3 text-[#C5A059]" /> Breakfast
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.breakfast.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.breakfast.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.breakfast.driverDuty}
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Utensils className="w-3 h-3 text-[#C5A059]" /> Royal Lunch
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.lunch.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.lunch.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.lunch.driverDuty}
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Coffee className="w-3 h-3 text-[#C5A059]" /> Sunset High-Tea
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.highTea.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.highTea.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.highTea.driverDuty}
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Wine className="w-3 h-3 text-[#C5A059]" /> Evening Dinner
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.dinner.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.dinner.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.dinner.driverDuty}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
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
                            ? "Hide Gourmet Dining & Wine Pairing Plan"
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
                  )}

                  {/* Operational Notes & WhatsApp Save */}
                  <div className="pt-4 mt-4 border-t border-[#262626] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder={
                        partner.role === "hotel"
                          ? isCampPartner
                            ? "Internal camp notes (e.g. Tent #03 inspected, plunge pool heated, bush dinner setup)..."
                            : "Internal hotel notes (e.g. Suite #204 inspected, champagne chilled at 14:00 IST)..."
                          : partner.role === "guide"
                          ? "Internal guide notes (e.g. ASI passes validated, heritage briefing prepared)..."
                          : "Internal chauffeur notes (e.g. Defender prepped with cold towels, reporting at 13:15 IST at Gate 2)..."
                      }
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
