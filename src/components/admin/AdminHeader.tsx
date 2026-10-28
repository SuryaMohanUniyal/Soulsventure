"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  ChevronDown,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { CreativeSoulMark } from "@/components/SoulsventureLogo";
import { TeamRole } from "@/lib/crmStore";

interface AdminHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFounder: "Suraj Uniyal" | "Harsh Sood";
  setActiveFounder: (f: "Suraj Uniyal" | "Harsh Sood") => void;
  activeRole?: TeamRole;
  setActiveRole?: (r: TeamRole) => void;
  onRefresh: () => void;
  onLogout?: () => void;
  totalLeadsCount: number;
  totalPipelineValueINR: number;
  activeTravelersCount: number;
}

export default function AdminHeader({
  searchQuery,
  setSearchQuery,
  activeFounder,
  setActiveFounder,
  activeRole = "Founder (Unrestricted)",
  setActiveRole,
  onRefresh,
  onLogout,
  totalLeadsCount,
  totalPipelineValueINR,
  activeTravelersCount,
}: AdminHeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFounderDropdown, setShowFounderDropdown] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const notifications = [
    {
      id: "n1",
      title: "Singhania Family Check-in Confirmed",
      desc: "Checked in at The Kyagar Lodge, Nubra Valley. Oxygen scrubbers active.",
      time: "18:30 IST",
      type: "success",
    },
    {
      id: "n2",
      title: "New Online Inquiry Received",
      desc: "Tanya Oberoi submitted inquiry for Kashmir Gulmarg Heli-Skiing.",
      time: "18:40 IST",
      type: "lead",
    },
    {
      id: "n3",
      title: "Deposit RTGS Verified",
      desc: "₹92,50,000 50% deposit received from Siddharth Mehta (Mihir Garh Buyout).",
      time: "18:10 IST",
      type: "deposit",
    },
    {
      id: "n4",
      title: "Seasonal Mountain Advisory",
      desc: "Khardung La pass experiencing evening flurries. Land Cruisers briefed.",
      time: "17:15 IST",
      type: "alert",
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#161616]/95 backdrop-blur-md border-b border-[#262626] px-6 sm:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <CreativeSoulMark className="w-8 h-8 text-[#C5A059]" isScrolled={false} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif tracking-[0.24em] text-base text-[#FDFBF7] font-light">
                  SOULSVENTURE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] tracking-widest uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-semibold">
                  CONCIERGE OS
                </span>
              </div>
              <span className="text-[9px] tracking-[0.22em] text-[#A1A1AA] uppercase">
                Private Hospitality CRM • Dehradun HQ
              </span>
            </div>
          </Link>
        </div>

        {/* Center Search & Live IST Time */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guests, reference ID, phone, destination..."
              className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] placeholder-[#71717A] rounded-md pl-10 pr-4 py-2 border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#A1A1AA] font-mono bg-[#1C1C1C] px-3 py-1.5 rounded border border-[#2A2A2A] whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{currentTime || "19:30:00"} IST</span>
          </div>
        </div>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-[#1F1F1F] rounded-md border border-[#2E2E2E] text-[11px]">
            <span className="text-[#A1A1AA]">
              Pipeline:{" "}
              <strong className="text-[#C5A059] font-medium">
                ₹{(totalPipelineValueINR / 10000000).toFixed(2)} Cr
              </strong>
            </span>
            <span className="text-[#3F3F46]">|</span>
            <span className="text-[#A1A1AA]">
              Active Leads: <strong className="text-[#FDFBF7]">{totalLeadsCount}</strong>
            </span>
            <span className="text-[#3F3F46]">|</span>
            <span className="text-[#A1A1AA] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              On-Ground: <strong className="text-emerald-400">{activeTravelersCount} Pax</strong>
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            title="Refresh CRM Leads & Calendar"
            className="p-2 text-[#A1A1AA] hover:text-[#C5A059] hover:bg-[#222222] rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#A1A1AA] hover:text-[#C5A059] hover:bg-[#222222] rounded-md transition-colors relative cursor-pointer"
              title="Concierge Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C5A059] ring-2 ring-[#161616]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg shadow-2xl p-4 space-y-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#2A2A2A]">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A059]">
                    Operations Log & Alerts
                  </span>
                  <span className="text-[10px] text-[#A1A1AA]">Real-time Feed</span>
                </div>
                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 bg-[#222222]/80 hover:bg-[#262626] rounded border border-[#2A2A2A] transition-colors text-xs"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-medium text-[#FDFBF7] flex items-center gap-1.5">
                          {n.type === "success" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                          {n.type === "alert" && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                          {n.type === "deposit" && <Sparkles className="w-3 h-3 text-[#C5A059]" />}
                          {n.type === "lead" && <ShieldCheck className="w-3 h-3 text-sky-400" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#71717A]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] font-light leading-relaxed">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Founder Profile Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowFounderDropdown(!showFounderDropdown)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#202020] hover:bg-[#262626] border border-[#2F2F2F] rounded-md text-xs cursor-pointer transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[10px] text-[#C5A059] font-medium">
                {activeFounder === "Suraj Uniyal" ? "SU" : "HS"}
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-medium text-[#FDFBF7] block text-[11px] leading-tight">
                  {activeFounder}
                </span>
                <span className="text-[9px] text-[#C5A059] block uppercase tracking-wider leading-none">
                  {activeRole.replace(" (Unrestricted)", "")}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-[#A1A1AA]" />
            </button>

            {showFounderDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg shadow-2xl p-2 space-y-1 z-50">
                <span className="text-[10px] uppercase tracking-wider text-[#71717A] px-2.5 py-1 block">
                  Switch Active Curator Profile
                </span>
                <button
                  onClick={() => {
                    setActiveFounder("Suraj Uniyal");
                    setShowFounderDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded text-xs flex items-center justify-between cursor-pointer ${
                    activeFounder === "Suraj Uniyal"
                      ? "bg-[#C5A059]/15 text-[#C5A059]"
                      : "text-[#FDFBF7] hover:bg-[#222222]"
                  }`}
                >
                  <div>
                    <span className="font-medium block">Suraj Uniyal</span>
                    <span className="text-[10px] text-[#A1A1AA]">Founder & Dir. of Operations</span>
                  </div>
                  {activeFounder === "Suraj Uniyal" && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setActiveFounder("Harsh Sood");
                    setShowFounderDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded text-xs flex items-center justify-between cursor-pointer ${
                    activeFounder === "Harsh Sood"
                      ? "bg-[#C5A059]/15 text-[#C5A059]"
                      : "text-[#FDFBF7] hover:bg-[#222222]"
                  }`}
                >
                  <div>
                    <span className="font-medium block">Harsh Sood</span>
                    <span className="text-[10px] text-[#A1A1AA]">Founder & Dir. of Curation</span>
                  </div>
                  {activeFounder === "Harsh Sood" && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* View Public Website Link */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#FDFBF7] bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#A1A1AA]" />
          </Link>

          {/* Secure Lock / Sign Out */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-colors cursor-pointer"
              title="Lock Console & Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Lock System</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
