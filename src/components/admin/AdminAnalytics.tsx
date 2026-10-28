"use client";

import React, { useState } from "react";
import { CRMLead } from "@/lib/crmStore";
import {
  TrendingUp,
  Award,
  Compass,
  ArrowUpRight,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface AdminAnalyticsProps {
  leads: CRMLead[];
}

export function AdminAnalytics({ leads }: AdminAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<"quarter" | "month" | "year">("quarter");

  // Calculations
  const totalLeads = leads.length;
  const confirmedLeads = leads.filter(
    (l) => l.status === "Deposit Confirmed" || l.status === "On-Ground Active" || l.status === "Completed"
  );
  const proposalLeads = leads.filter(
    (l) => l.status === "Proposal Sent" || l.status === "Discovery Call"
  );

  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.estimatedValueINR, 0);
  const confirmedValue = confirmedLeads.reduce((acc, curr) => acc + curr.estimatedValueINR, 0);
  const avgBookingValue =
    confirmedLeads.length > 0
      ? confirmedValue / confirmedLeads.length
      : totalLeads > 0
      ? totalPipelineValue / totalLeads
      : 0;
  const conversionRate = totalLeads > 0 ? ((confirmedLeads.length / totalLeads) * 100).toFixed(1) : "0";

  // Destination Distribution
  const destinationMap: Record<string, { count: number; totalINR: number }> = {};
  leads.forEach((l) => {
    l.destinations.forEach((d) => {
      if (!destinationMap[d]) destinationMap[d] = { count: 0, totalINR: 0 };
      destinationMap[d].count += 1;
      destinationMap[d].totalINR += l.estimatedValueINR;
    });
  });

  const destinationsSorted = Object.entries(destinationMap).sort(
    (a, b) => b[1].totalINR - a[1].totalINR
  );

  const topDestination = destinationsSorted[0] ? destinationsSorted[0][0] : "Awaiting Inquiries";

  // Curators Breakdown
  const curatorMap: Record<string, { leads: number; confirmed: number; volumeINR: number }> = {
    "Suraj Uniyal": { leads: 0, confirmed: 0, volumeINR: 0 },
    "Harsh Sood": { leads: 0, confirmed: 0, volumeINR: 0 },
    "Kabir Malhotra": { leads: 0, confirmed: 0, volumeINR: 0 },
  };

  leads.forEach((l) => {
    const curator = l.assignedCurator || "Suraj Uniyal";
    if (!curatorMap[curator]) {
      curatorMap[curator] = { leads: 0, confirmed: 0, volumeINR: 0 };
    }
    curatorMap[curator].leads += 1;
    curatorMap[curator].volumeINR += l.estimatedValueINR;
    if (l.status === "Deposit Confirmed" || l.status === "On-Ground Active" || l.status === "Completed") {
      curatorMap[curator].confirmed += 1;
    }
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <TrendingUp className="w-3 h-3" />
              Executive BI & Yield Intelligence
            </span>
            <span className="text-xs text-[#888888] font-mono">FY 2026-27</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Revenue Analytics & Conversion Metrics
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Real-time pipeline yield, high-net-worth inquiry flow, and destination market demand across India.
          </p>
        </div>

        <div className="flex items-center bg-[#181818] border border-[#2E2E2E] rounded-lg p-1">
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1.5 text-xs font-serif rounded-md transition-colors ${
              timeRange === "month"
                ? "bg-[#C5A059] text-black font-medium"
                : "text-[#888888] hover:text-[#FDFBF7]"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeRange("quarter")}
            className={`px-3 py-1.5 text-xs font-serif rounded-md transition-colors ${
              timeRange === "quarter"
                ? "bg-[#C5A059] text-black font-medium"
                : "text-[#888888] hover:text-[#FDFBF7]"
            }`}
          >
            Q3 Autumn Peak
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-3 py-1.5 text-xs font-serif rounded-md transition-colors ${
              timeRange === "year"
                ? "bg-[#C5A059] text-black font-medium"
                : "text-[#888888] hover:text-[#FDFBF7]"
            }`}
          >
            Annual 2026
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden group hover:border-[#C5A059]/40 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Total Inquiries Handled
          </div>
          <div className="text-3xl font-serif text-[#FDFBF7] mt-2 font-medium flex items-baseline gap-2">
            {totalLeads}
            <span className="text-xs font-sans text-emerald-400 font-normal flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +38% MoM
            </span>
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1.5">
            Active pipeline: ₹{(totalPipelineValue / 10000000).toFixed(2)} Cr
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden group hover:border-[#C5A059]/40 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Confirmed Booking Value
          </div>
          <div className="text-3xl font-serif text-emerald-400 mt-2 font-medium">
            ₹{(confirmedValue / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1.5">
            {confirmedLeads.length} clients confirmed & travelling
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden group hover:border-[#C5A059]/40 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Average Booking Value (ABV)
          </div>
          <div className="text-3xl font-serif text-[#C5A059] mt-2 font-medium">
            ₹{(avgBookingValue / 100000).toFixed(1)}L
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1.5">
            Top tier: High-net-worth families & couples
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden group hover:border-[#C5A059]/40 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Conversion Ratio
          </div>
          <div className="text-3xl font-serif text-[#FDFBF7] mt-2 font-medium flex items-baseline gap-2">
            {conversionRate}%
            <span className="text-xs font-sans text-[#C5A059] font-normal">
              Industry: ~8%
            </span>
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1.5">
            Leader: {topDestination}
          </div>
        </div>
      </div>

      {/* Middle Section: Funnel Visualization & Destination Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Luxury Conversion Funnel (7 cols) */}
        <div className="lg:col-span-7 bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="font-serif text-[#FDFBF7] text-lg">
                The SoulsVenture Conversion Funnel
              </h3>
              <p className="text-xs text-[#888888]">
                Bespoke touchpoints from luxury web inquiry to on-ground concierge
              </p>
            </div>
            <span className="text-xs font-mono text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded-full border border-[#C5A059]/30">
              5-Stage Concierge Process
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Stage 1 */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-serif text-[#FDFBF7] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#222222] border border-[#444] text-[#C5A059] flex items-center justify-center text-[10px] font-mono">1</span>
                  Stage 1: Inquiries Received
                </span>
                <span className="font-mono text-[#FDFBF7]">{totalLeads} leads (100%)</span>
              </div>
              <div className="h-3 w-full bg-[#111111] rounded-full overflow-hidden border border-[#2A2A2A]">
                <div className="h-full bg-gradient-to-r from-amber-600 to-[#C5A059] rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            {/* Stage 2 */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-serif text-[#FDFBF7] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#222222] border border-[#444] text-[#C5A059] flex items-center justify-center text-[10px] font-mono">2</span>
                  Stage 2: Discovery Call Completed
                </span>
                <span className="font-mono text-[#FDFBF7]">
                  {leads.filter((l) => l.milestones.discoveryCallCompleted).length} leads (
                  {Math.round(
                    (leads.filter((l) => l.milestones.discoveryCallCompleted).length / totalLeads) * 100
                  )}%)
                </span>
              </div>
              <div className="h-3 w-full bg-[#111111] rounded-full overflow-hidden border border-[#2A2A2A]">
                <div
                  className="h-full bg-gradient-to-r from-[#C5A059] to-amber-400 rounded-full"
                  style={{
                    width: `${Math.round(
                      (leads.filter((l) => l.milestones.discoveryCallCompleted).length / totalLeads) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Stage 3 */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-serif text-[#FDFBF7] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#222222] border border-[#444] text-[#C5A059] flex items-center justify-center text-[10px] font-mono">3</span>
                  Stage 3: Bespoke Proposal & Moodboard Dispatched
                </span>
                <span className="font-mono text-[#FDFBF7]">
                  {leads.filter((l) => l.milestones.proposalSent).length} leads (
                  {Math.round(
                    (leads.filter((l) => l.milestones.proposalSent).length / totalLeads) * 100
                  )}%)
                </span>
              </div>
              <div className="h-3 w-full bg-[#111111] rounded-full overflow-hidden border border-[#2A2A2A]">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                  style={{
                    width: `${Math.round(
                      (leads.filter((l) => l.milestones.proposalSent).length / totalLeads) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Stage 4 */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-serif text-[#FDFBF7] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#222222] border border-[#444] text-[#C5A059] flex items-center justify-center text-[10px] font-mono">4</span>
                  Stage 4: Advance Deposit Secured
                </span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {leads.filter((l) => l.milestones.depositReceived).length} leads (
                  {Math.round(
                    (leads.filter((l) => l.milestones.depositReceived).length / totalLeads) * 100
                  )}%)
                </span>
              </div>
              <div className="h-3 w-full bg-[#111111] rounded-full overflow-hidden border border-[#2A2A2A]">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${Math.round(
                      (leads.filter((l) => l.milestones.depositReceived).length / totalLeads) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Stage 5 */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-serif text-[#FDFBF7] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#222222] border border-[#444] text-[#C5A059] flex items-center justify-center text-[10px] font-mono">5</span>
                  Stage 5: On-Ground Private Concierge Active
                </span>
                <span className="font-mono text-emerald-300 font-semibold">
                  {leads.filter((l) => l.status === "On-Ground Active").length} traveling now
                </span>
              </div>
              <div className="h-3 w-full bg-[#111111] rounded-full overflow-hidden border border-[#2A2A2A]">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{
                    width: `${Math.round(
                      (leads.filter((l) => l.status === "On-Ground Active").length / totalLeads) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Destination Revenue Share (5 cols) */}
        <div className="lg:col-span-5 bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="font-serif text-[#FDFBF7] text-lg">
                Destination Market Demand
              </h3>
              <p className="text-xs text-[#888888]">
                Revenue share by bespoke circuit
              </p>
            </div>
            <Compass className="w-4 h-4 text-[#C5A059]" />
          </div>

          <div className="space-y-4 pt-1">
            {destinationsSorted.slice(0, 5).map(([dest, data], idx) => {
              const share = ((data.totalINR / totalPipelineValue) * 100).toFixed(0);
              return (
                <div key={dest} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#FDFBF7] font-serif truncate max-w-[200px]">
                      {dest}
                    </span>
                    <span className="text-[#A0A0A0] font-mono text-[11px]">
                      ₹{(data.totalINR / 100000).toFixed(1)}L ({share}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#111111] rounded-full overflow-hidden border border-[#222]">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0
                          ? "bg-[#C5A059]"
                          : idx === 1
                          ? "bg-amber-400"
                          : idx === 2
                          ? "bg-emerald-400"
                          : "bg-[#777777]"
                      }`}
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-xs text-[#888888]">
            <span>Average Group Size:</span>
            <span className="font-mono text-[#FDFBF7]">3.4 Guests</span>
          </div>
        </div>
      </div>

      {/* Curator Performance Table */}
      <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-3">
          <div>
            <h3 className="font-serif text-[#FDFBF7] text-lg">
              Founder & Curator Performance Scoreboard
            </h3>
            <p className="text-xs text-[#888888]">
              High-touch client conversion, assigned portfolios, and secured volume
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-serif">
            <Award className="w-4 h-4" />
            100% Client Satisfaction Index
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {Object.entries(curatorMap).map(([curatorName, data]) => {
            const isFounder = curatorName === "Suraj Uniyal" || curatorName === "Harsh Sood";
            const curatorRate = data.leads > 0 ? ((data.confirmed / data.leads) * 100).toFixed(0) : "0";

            return (
              <div
                key={curatorName}
                className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 space-y-3 hover:border-[#C5A059]/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-[#FDFBF7] text-base">
                      {curatorName}
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059]">
                      {curatorName === "Suraj Uniyal"
                        ? "Founder & Operations Director"
                        : curatorName === "Harsh Sood"
                        ? "Founder & Curation Director"
                        : "Senior Luxury Associate"}
                    </span>
                  </div>
                  {isFounder && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-serif bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                      Founder
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 bg-[#181818] p-3 rounded-lg border border-[#262626] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#888888]">Assigned Portfolio:</span>
                    <span className="font-mono text-[#FDFBF7] font-medium">{data.leads} Leads</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#888888]">Secured Deposits:</span>
                    <span className="font-mono text-emerald-400 font-semibold">{data.confirmed} Clients</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#888888]">Handled Pipeline:</span>
                    <span className="font-mono text-[#C5A059] font-medium">
                      ₹{(data.volumeINR / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-[#222222]">
                    <span className="text-[#888888]">Conversion Rate:</span>
                    <span className="font-mono text-[#FDFBF7] font-bold">{curatorRate}%</span>
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
