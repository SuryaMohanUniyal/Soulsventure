"use client";

import React from "react";
import {
  Compass,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Plane,
  Hotel,
  Calendar,
} from "lucide-react";
import { ACTIVE_TRAVELERS } from "@/lib/crmStore";

export default function AdminActiveTravelers() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-5 bg-[#181818] border border-[#2A2A2A] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="font-serif text-2xl font-light text-[#FDFBF7]">
              Live On-Ground Concierge Tracker
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#A1A1AA]">
            Real-Time Operations & High-Altitude Flight Advisory Board
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
          <ShieldCheck className="w-4 h-4" />
          <span>{ACTIVE_TRAVELERS.length} Parties Active • 24/7 Concierge Ready</span>
        </div>
      </div>

      {/* Active Traveler Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ACTIVE_TRAVELERS.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-[#181818] border border-[#2B2B2B] rounded-xl text-[#71717A] text-xs space-y-2">
            <Compass className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
            <p className="font-serif text-sm text-[#FDFBF7]">No Travelers Currently In-Transit</p>
            <p className="max-w-md mx-auto text-[#71717A]">
              When confirmed bookings depart or a lead&apos;s status is set to &ldquo;On-Ground Active&rdquo;, real-time guest tracking, high-altitude passes, and luxury concierge alerts will appear here.
            </p>
          </div>
        ) : (
          ACTIVE_TRAVELERS.map((traveler) => (
          <div
            key={traveler.id}
            className="p-6 bg-[#181818] border border-[#2B2B2B] hover:border-[#C5A059]/60 rounded-xl space-y-5 transition-all shadow-xl relative overflow-hidden"
          >
            {/* Top Status & Reference */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                  {traveler.status}
                </span>
                <span className="text-xs text-[#71717A]">• {traveler.leadReference}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider bg-[#222222] text-[#C5A059] px-2.5 py-1 rounded font-mono font-semibold">
                Day {traveler.currentDay} of {traveler.totalDays}
              </span>
            </div>

            {/* Guest Name & Itinerary */}
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#FDFBF7]">
                {traveler.guestName}
              </h3>
              <p className="text-xs text-[#C5A059] font-serif mt-1">
                {traveler.itineraryTitle}
              </p>
            </div>

            {/* Current Coordinates Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#1F1F1F] p-4 rounded-lg border border-[#2A2A2A]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#71717A] flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3 text-[#C5A059]" /> Current Base
                </span>
                <span className="text-[#FDFBF7] font-medium block">
                  {traveler.currentLocation}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#71717A] flex items-center gap-1 font-semibold">
                  <Hotel className="w-3 h-3 text-[#C5A059]" /> Luxury Lodge
                </span>
                <span className="text-[#FDFBF7] font-medium block">
                  {traveler.currentStay}
                </span>
              </div>
            </div>

            {/* Next Milestone */}
            <div className="p-3 bg-gradient-to-r from-[#202020] to-[#1A1A1A] rounded-lg border border-[#2E2E2E] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1">
                <Plane className="w-3 h-3" /> Upcoming Transit Milestone
              </span>
              <p className="text-xs text-[#FDFBF7] font-light">
                {traveler.nextMilestone}
              </p>
            </div>

            {/* Footer with Curator & Check-in Time */}
            <div className="pt-3 border-t border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#71717A]">
              <span>
                Curator Lead: <strong className="text-[#FDFBF7]">{traveler.assignedCurator}</strong>
              </span>
              <span className="text-[11px] font-mono text-[#A1A1AA]">
                {traveler.lastCheckIn}
              </span>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
}
