"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  X,
  ArrowRight,
  Plane,
} from "lucide-react";
import { CRMLead, SeasonalIntel, SEASONAL_INTEL } from "@/lib/crmStore";

interface AdminCalendarViewProps {
  leads: CRMLead[];
  onOpenDossier: (lead: CRMLead) => void;
}

export default function AdminCalendarView({ leads, onOpenDossier }: AdminCalendarViewProps) {
  // Current view month (defaulting to October 2026 or current)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-10-25");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Map leads by dateKey (YYYY-MM-DD)
  const leadsByDate: Record<string, CRMLead[]> = {};
  leads.forEach((l) => {
    const key = l.dateKey;
    if (!leadsByDate[key]) leadsByDate[key] = [];
    leadsByDate[key].push(l);
  });

  // Also map departures by departureDate
  const departuresByDate: Record<string, CRMLead[]> = {};
  leads.forEach((l) => {
    if (l.departureDate) {
      if (!departuresByDate[l.departureDate]) departuresByDate[l.departureDate] = [];
      departuresByDate[l.departureDate].push(l);
    }
  });

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setIsDrawerOpen(true);
  };

  const selectedLeads = selectedDate ? leadsByDate[selectedDate] || [] : [];
  const selectedDepartures = selectedDate ? departuresByDate[selectedDate] || [] : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Calendar Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#181818] border border-[#2A2A2A] rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-light text-[#FDFBF7]">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#A1A1AA]">
              Bespoke Inquiries & Departure Schedule
            </span>
          </div>
        </div>

        {/* Legend & Month Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 text-xs text-[#A1A1AA] bg-[#202020] px-3 py-1.5 rounded-lg border border-[#2E2E2E]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              Inquiry
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Departure
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Season Window
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] border border-[#2F2F2F] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentYear(2026);
                setCurrentMonth(9);
              }}
              className="px-3 py-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-xs font-medium text-[#C5A059] border border-[#2F2F2F] transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] border border-[#2F2F2F] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar Grid */}
      <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-2xl">
        {/* Days of Week Row */}
        <div className="grid grid-cols-7 border-b border-[#2A2A2A] bg-[#141414] text-center text-xs uppercase tracking-widest font-medium text-[#71717A] py-3">
          {daysOfWeek.map((d, idx) => (
            <div key={idx} className={idx === 0 || idx === 6 ? "text-[#A1A1AA]" : ""}>
              {d}
            </div>
          ))}
        </div>

        {/* Day Cells Grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-[#242424]">
          {/* Empty cells before 1st of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[110px] sm:min-h-[125px] bg-[#131313]/50 p-2.5 opacity-30" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const monthStr = (currentMonth + 1).toString().padStart(2, "0");
            const dayStr = dayNum.toString().padStart(2, "0");
            const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

            const dayLeads = leadsByDate[dateStr] || [];
            const dayDepartures = departuresByDate[dateStr] || [];
            const isToday = dateStr === "2026-10-25";
            const isSelected = selectedDate === dateStr;

            // Check if special season alert touches this date
            const hasSeasonalAlert =
              (currentMonth === 9 && dayNum >= 24 && dayNum <= 28) ||
              (currentMonth === 10 && dayNum >= 1 && dayNum <= 15);

            return (
              <div
                key={dateStr}
                onClick={() => handleDateClick(dateStr)}
                className={`min-h-[110px] sm:min-h-[125px] p-2 sm:p-2.5 flex flex-col justify-between transition-all cursor-pointer relative group ${
                  isSelected
                    ? "bg-[#C5A059]/10 ring-1 ring-[#C5A059]"
                    : "hover:bg-[#202020]"
                } ${isToday ? "bg-[#1E1E1E]" : "bg-[#181818]"}`}
              >
                {/* Date Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-medium rounded-full w-6 h-6 flex items-center justify-center ${
                      isToday
                        ? "bg-[#C5A059] text-[#111111] font-bold shadow-md shadow-[#C5A059]/20"
                        : isSelected
                        ? "text-[#C5A059] font-bold"
                        : "text-[#A1A1AA] group-hover:text-[#FDFBF7]"
                    }`}
                  >
                    {dayNum}
                  </span>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-1">
                    {dayLeads.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-sm shadow-[#C5A059]/50 animate-pulse" />
                    )}
                    {dayDepartures.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                    )}
                    {hasSeasonalAlert && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    )}
                  </div>
                </div>

                {/* Event Tags inside the cell */}
                <div className="space-y-1 my-1 overflow-hidden">
                  {dayLeads.slice(0, 1).map((lead) => (
                    <div
                      key={lead.id}
                      className="px-1.5 py-0.5 rounded text-[10px] leading-tight bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 truncate font-medium"
                    >
                      {lead.firstName}: {lead.destinations[0]?.split(" ")[0]}
                    </div>
                  ))}

                  {dayDepartures.slice(0, 1).map((dep) => (
                    <div
                      key={dep.id}
                      className="px-1.5 py-0.5 rounded text-[10px] leading-tight bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 truncate flex items-center gap-1"
                    >
                      <Plane className="w-2.5 h-2.5 flex-shrink-0" />
                      <span>{dep.firstName} Dep.</span>
                    </div>
                  ))}

                  {dayLeads.length > 1 && (
                    <span className="text-[9px] text-[#A1A1AA] block pl-1">
                      +{dayLeads.length - 1} more inquiry
                    </span>
                  )}

                  {hasSeasonalAlert && dayLeads.length === 0 && dayDepartures.length === 0 && (
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] bg-purple-950/50 text-purple-300 border border-purple-800/30 truncate">
                      Peak Window
                    </span>
                  )}
                </div>

                {/* Bottom Footer count */}
                <div className="text-[9px] text-[#52525B] flex justify-between items-center pt-1 border-t border-[#222222]">
                  <span>
                    {dayLeads.length > 0 ? `${dayLeads.length} leads` : ""}
                  </span>
                  <span className="text-[#3F3F46] group-hover:text-[#C5A059] transition-colors">
                    View →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date Detail Slide-Over Drawer */}
      {isDrawerOpen && selectedDate && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#161616] border-l border-[#2E2E2E] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#282828] flex items-center justify-between bg-[#191919]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5" /> Date Dossier
                </span>
                <h3 className="font-serif text-2xl font-light text-[#FDFBF7] mt-1">
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#A1A1AA] hover:text-[#FDFBF7] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Seasonal Intelligence Banner */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-950/40 via-[#1C1C1C] to-[#1C1C1C] border border-purple-800/30 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Seasonal Intelligence Indicator
                </span>
                <h4 className="text-sm font-serif text-[#FDFBF7]">
                  Rajasthan Palace Season & Wedding Buyouts Peak
                </h4>
                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                  Taj Lake Palace & SUJÁN JAWAI allocations running low. Check with GM direct lines before confirming custom dates.
                </p>
              </div>

              {/* Inquiries List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#A1A1AA]">
                    Inquiries Registered ({selectedLeads.length})
                  </h4>
                  <span className="text-[11px] text-[#C5A059]">Direct Web Sync</span>
                </div>

                {selectedLeads.length === 0 ? (
                  <div className="p-8 text-center bg-[#1A1A1A] rounded-lg border border-[#262626]">
                    <p className="text-xs text-[#71717A] italic">
                      No online client inquiries recorded on this exact date.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 bg-[#1E1E1E] border border-[#2B2B2B] hover:border-[#C5A059]/60 rounded-xl space-y-3 transition-colors shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif text-[#C5A059] font-medium">
                            {lead.referenceCode}
                          </span>
                          <span
                            className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                              lead.status === "Deposit Confirmed"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                                : lead.status === "Proposal Sent"
                                ? "bg-amber-950 text-amber-400 border border-amber-800/40"
                                : lead.status === "On-Ground Active"
                                ? "bg-purple-950 text-purple-300 border border-purple-800/40"
                                : "bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>

                        <div>
                          <h5 className="font-serif text-lg font-medium text-[#FDFBF7]">
                            {lead.clientName}
                          </h5>
                          <span className="text-xs text-[#A1A1AA] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#C5A059]" />
                            {lead.destinationSummary} • {lead.duration}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#171717] p-2.5 rounded-lg border border-[#262626]">
                          <div>
                            <span className="text-[#71717A] block">Budget Tier:</span>
                            <span className="text-[#FDFBF7] font-medium">{lead.budgetTier}</span>
                          </div>
                          <div>
                            <span className="text-[#71717A] block">Curator:</span>
                            <span className="text-[#C5A059] font-medium">{lead.assignedCurator}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#282828]">
                          <span className="text-[11px] text-[#71717A]">
                            Companions: {lead.companions}
                          </span>
                          <button
                            onClick={() => {
                              setIsDrawerOpen(false);
                              onOpenDossier(lead);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:text-[#DFCDAE] font-semibold cursor-pointer"
                          >
                            <span>Open Client Dossier</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Departures List on this date */}
              {selectedDepartures.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#262626]">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5" /> Luxury Trip Departures ({selectedDepartures.length})
                  </h4>
                  {selectedDepartures.map((dep) => (
                    <div
                      key={dep.id}
                      className="p-3.5 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-serif font-medium text-[#FDFBF7]">
                          {dep.clientName}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase">
                          VIP Tarmac Clearance
                        </span>
                      </div>
                      <p className="text-xs text-[#A1A1AA] font-light">
                        {dep.destinationSummary} • {dep.companions} • Lead Curator: {dep.assignedCurator}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#262626] bg-[#191919] flex justify-between items-center text-xs text-[#71717A]">
              <span>Soulsventure Calendar Intelligence</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#2C2C2C] text-[#FDFBF7] cursor-pointer transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Intelligence Master Reference */}
      <div className="p-6 bg-[#181818] border border-[#2A2A2A] rounded-xl shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-serif text-lg font-light text-[#FDFBF7]">
              Seasonal Travel Windows & Peak Intelligence
            </h3>
          </div>
          <span className="text-xs text-[#A1A1AA]">Curated for High-Net-Worth Advisory</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SEASONAL_INTEL.map((intel) => (
            <div
              key={intel.id}
              className="p-3.5 bg-[#1F1F1F] rounded-lg border border-[#2B2B2B] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A059]">
                  {intel.region}
                </span>
                <span className="text-[10px] font-mono text-[#71717A]">{intel.dates}</span>
              </div>
              <h4 className="text-xs font-serif font-medium text-[#FDFBF7]">
                {intel.title}
              </h4>
              <p className="text-[11px] text-[#A1A1AA] font-light leading-relaxed">
                {intel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
