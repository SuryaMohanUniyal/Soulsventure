"use client";

import React, { useState } from "react";
import {
  FlightWeatherStatus,
  INITIAL_FLIGHT_WEATHER,
} from "@/lib/crmStore";
import {
  Plane,
  CloudSnow,
  Wind,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Phone,
  Send,
  Navigation,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export function AdminFlightWeatherOps() {
  const [flights, setFlights] = useState<FlightWeatherStatus[]>(INITIAL_FLIGHT_WEATHER);
  const [filter, setFilter] = useState<string>("all");
  const [alertSuccessMsg, setAlertSuccessMsg] = useState("");

  const filteredFlights = flights.filter((f) => {
    if (filter === "all") return true;
    if (filter === "action") return f.protocolStatus === "Action Required";
    if (filter === "delays") return f.status === "Delayed 2h" || f.status === "Weather Alert";
    return true;
  });

  const handleSendChauffeurAdvisory = (flight: FlightWeatherStatus) => {
    const msg = encodeURIComponent(
      `[SOULSVENTURE VIP FLIGHT & WEATHER OPS]\n\n` +
      `Advisory for Guest: *${flight.clientImpacted}* (Ref: ${flight.leadReference})\n` +
      `Flight: *${flight.flightNumber}* (${flight.route})\n` +
      `Status: *${flight.status}*\n` +
      `Weather: ${flight.weatherCondition}\n` +
      `Mountain Corridor: ${flight.passStatus}\n\n` +
      `*MANDATORY CONTINGENCY ACTION:*\n${flight.alternativeRouting}\n\n` +
      `Concierge in charge: ${flight.assignedConcierge}\n` +
      `Founder Hot-Line: +91 8126357353 (Suraj Uniyal)`
    );
    window.open(`https://wa.me/919820144521?text=${msg}`, "_blank");
    setAlertSuccessMsg(`Advisory broadcasted to chauffeur convoy & local station manager.`);
    setTimeout(() => setAlertSuccessMsg(""), 4000);
  };

  const handleResolveAlert = (id: string) => {
    setFlights((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, protocolStatus: "Escorted Alternate Active" as const, status: "Airborne" as const } : f
      )
    );
    setAlertSuccessMsg("Contingency execution logged: Alternate escort now active.");
    setTimeout(() => setAlertSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Plane className="w-3 h-3" />
              Real-Time Aviation & Mountain Radar
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Live Air Traffic & Himalayan Weather Intercept
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Automated Flight & Weather Monitoring
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Proactively mitigate alpine delays, runway crosswinds, and high-altitude pass closures before clients even step off the tarmac.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAlertSuccessMsg("Syncing with DGCA & IMD Mountain Meteorological radar...");
              setTimeout(() => setAlertSuccessMsg("Weather radar synced: Khardung La & Gulmarg live telemetry refreshed."), 1200);
            }}
            className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] hover:bg-[#242424] text-[#FDFBF7] text-xs font-serif rounded-lg border border-[#333333] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C5A059]" />
            Refresh Telemetry
          </button>
        </div>
      </div>

      {alertSuccessMsg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{alertSuccessMsg}</span>
        </div>
      )}

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Tracked VIP Flights Today
          </p>
          <div className="text-3xl font-serif text-[#FDFBF7] mt-1.5 font-medium">
            {flights.length} Aircraft
          </div>
          <p className="text-[11px] text-[#C5A059] mt-1">
            Commercial & Private Turboprops
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Active Mountain Advisories
          </p>
          <div className="text-3xl font-serif text-amber-400 mt-1.5 font-medium">
            {flights.filter((f) => f.status === "Weather Alert" || f.protocolStatus === "Action Required").length} Corridors
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Khardung La, Rohtang & Pir Panjal
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Alternate Reroutes Active
          </p>
          <div className="text-3xl font-serif text-purple-400 mt-1.5 font-medium">
            {flights.filter((f) => f.protocolStatus === "Escorted Alternate Active").length} Active
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Chauffeur contingency protocol
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Guest Disruption Rate
          </p>
          <div className="text-3xl font-serif text-emerald-400 mt-1.5 font-medium">
            0.0%
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            All disruptions caught pre-arrival
          </p>
        </div>
      </div>

      {/* Filter Selector */}
      <div className="flex items-center gap-2 bg-[#181818] p-3 rounded-xl border border-[#262626]">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-colors ${
            filter === "all" ? "bg-[#C5A059] text-black font-medium" : "text-[#888888] hover:text-[#FDFBF7]"
          }`}
        >
          All Monitored Legs ({flights.length})
        </button>
        <button
          onClick={() => setFilter("action")}
          className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-colors ${
            filter === "action" ? "bg-rose-500 text-white font-medium" : "text-[#888888] hover:text-[#FDFBF7]"
          }`}
        >
          Action Required
        </button>
        <button
          onClick={() => setFilter("delays")}
          className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-colors ${
            filter === "delays" ? "bg-amber-400 text-black font-medium" : "text-[#888888] hover:text-[#FDFBF7]"
          }`}
        >
          Weather & Flurry Alerts
        </button>
      </div>

      {/* Flights & Weather Feed Cards */}
      <div className="space-y-4">
        {filteredFlights.length === 0 ? (
          <div className="py-16 text-center bg-[#181818] border border-[#262626] rounded-xl text-[#71717A] text-xs space-y-2">
            <Plane className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
            <p className="font-serif text-sm text-[#FDFBF7]">No Flights or Mountain Passes Currently Monitored</p>
            <p className="text-[#71717A] max-w-md mx-auto">
              Flight itineraries and mountain weather corridors (Khardung La, Rohtang, Pir Panjal) will automatically display when guest bookings are activated.
            </p>
          </div>
        ) : (
          filteredFlights.map((item) => {
          const isAction = item.protocolStatus === "Action Required";
          const isDelayed = item.status === "Delayed 2h" || item.status === "Weather Alert";

          return (
            <div
              key={item.id}
              className={`bg-[#181818] border rounded-xl p-6 space-y-4 shadow-xl relative transition-all ${
                isAction
                  ? "border-rose-500/50 bg-[#1A1414]"
                  : isDelayed
                  ? "border-amber-500/40"
                  : "border-[#262626]"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2A2A] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#222222] border border-[#3A3A3A] flex items-center justify-center text-[#C5A059]">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-[#FDFBF7] text-lg font-medium">
                        {item.carrier} • {item.flightNumber}
                      </span>
                      <span className="text-xs font-mono text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30">
                        {item.route}
                      </span>
                    </div>
                    <div className="text-xs text-[#888888] mt-0.5 flex items-center gap-2 font-mono">
                      <span>Scheduled: {item.scheduledDeparture}</span>
                      <span>• Impacted VIP: <strong className="text-[#FDFBF7]">{item.clientImpacted}</strong> ({item.leadReference})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${
                      item.status === "Airborne"
                        ? "bg-emerald-950/70 text-emerald-300 border border-emerald-700/50"
                        : item.status === "Delayed 2h"
                        ? "bg-amber-950/70 text-amber-300 border border-amber-700/50"
                        : "bg-rose-950/70 text-rose-300 border border-rose-700/50"
                    }`}
                  >
                    {item.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-serif ${
                      item.protocolStatus === "Action Required"
                        ? "bg-rose-600 text-white font-medium animate-pulse"
                        : item.protocolStatus === "Escorted Alternate Active"
                        ? "bg-purple-900 text-purple-200"
                        : "bg-emerald-950 text-emerald-400"
                    }`}
                  >
                    {item.protocolStatus}
                  </span>
                </div>
              </div>

              {/* Weather & Pass Conditions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Weather Station Box */}
                <div className="p-4 bg-[#121212] rounded-xl border border-[#222222] space-y-2">
                  <div className="flex items-center justify-between text-[#C5A059] font-mono">
                    <span className="flex items-center gap-1.5">
                      <CloudSnow className="w-4 h-4" /> Live Meteorological Telemetry
                    </span>
                    <span className="text-[#888]">{item.tempAndWind}</span>
                  </div>
                  <p className="text-xs text-[#E0E0E0]">{item.weatherCondition}</p>
                  {item.delayReason && (
                    <div className="p-2 bg-amber-950/30 rounded border border-amber-900/40 text-amber-300 text-[11px]">
                      Delay Factor: {item.delayReason}
                    </div>
                  )}
                </div>

                {/* Mountain Corridor Box */}
                <div className="p-4 bg-[#121212] rounded-xl border border-[#222222] space-y-2">
                  <div className="flex items-center justify-between text-[#C5A059] font-mono">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-4 h-4" /> Mountain Pass & Convoy Status
                    </span>
                    <span className="text-[#888]">Escort: {item.assignedConcierge}</span>
                  </div>
                  <p className="text-xs text-[#E0E0E0]">{item.passStatus}</p>
                </div>
              </div>

              {/* Automated Proactive Routing Suggestion (The Luxury Touch) */}
              <div className="p-4 bg-[#1F1810] border border-[#C5A059]/40 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-serif text-[#C5A059]">
                  <Navigation className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider text-[11px] font-mono">
                    SoulsVenture Proactive Contingency Directive
                  </span>
                </div>
                <p className="text-xs text-[#FDFBF7] font-sans leading-relaxed">
                  {item.alternativeRouting}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#888888] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Assigned Field Lead: {item.assignedConcierge}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.protocolStatus === "Action Required" && (
                    <button
                      onClick={() => handleResolveAlert(item.id)}
                      className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#b08e48] text-black font-serif font-medium rounded-lg text-xs transition-colors"
                    >
                      Authorize Contingency Reroute
                    </button>
                  )}

                  <button
                    onClick={() => handleSendChauffeurAdvisory(item)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 rounded-lg text-xs font-serif border border-emerald-600/40 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Dispatch WhatsApp Chauffeur Directive
                  </button>
                </div>
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}
