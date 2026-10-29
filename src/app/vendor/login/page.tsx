"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Building2,
  Hotel,
  Car,
  Compass,
  Plane,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  verifyVendorLogin,
  getVendorAuthSession,
  getStoredPartners,
} from "@/lib/crmStore";

export default function VendorLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect straight to portal
    const existing = getVendorAuthSession();
    if (existing) {
      window.location.href = "/vendor/portal";
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const partner = verifyVendorLogin(phone, pin);
    if (partner) {
      window.location.href = "/vendor/portal";
    } else {
      setLoading(false);
      setErrorMsg(
        "Invalid Phone Number or PIN. Please enter your registered partner phone number and admin-set 4-digit PIN (default demo PIN: 1234)."
      );
    }
  };

  const handleQuickLogin = (demoPhone: string, demoPin: string) => {
    setPhone(demoPhone);
    setPin(demoPin);
    setErrorMsg("");
    setLoading(true);
    const partner = verifyVendorLogin(demoPhone, demoPin);
    if (partner) {
      window.location.href = "/vendor/portal";
    } else {
      setLoading(false);
      setErrorMsg("Demo login could not be authenticated. Please retry.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-12 px-3 sm:px-4 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-xs font-mono uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          B2B Partner & Vendor Network
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#FDFBF7]">
          Vendor Partner Login
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md mx-auto">
          Access your assigned luxury bookings, guest arrival dates, room allocations, chauffeur dispatches, and tour guide itineraries.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="p-4 sm:p-8 bg-[#181818] border border-[#2B2B2B] rounded-2xl shadow-2xl space-y-5 sm:space-y-6 relative">
        <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-0.5 rounded-full bg-[#C5A059] text-black font-mono font-bold text-[10px] uppercase tracking-wider shadow-sm">
          Encrypted Session
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#C5A059] mb-1.5 font-medium">
              Registered Phone Number (Login ID)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="tel"
                required
                placeholder="e.g. 9820111222 or +91 98201 11222"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#121212] border border-[#333333] rounded-xl pl-10 pr-4 py-3 text-sm text-[#FDFBF7] font-mono placeholder-[#555] focus:outline-none focus:border-[#C5A059] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-medium">
                Admin-Set 4-Digit PIN / Password
              </label>
              <span className="text-[10px] font-mono text-[#71717A]">
                Default demo PIN: <strong>1234</strong>
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="password"
                required
                placeholder="Enter 4-digit PIN (e.g. 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-[#121212] border border-[#333333] rounded-xl pl-10 pr-4 py-3 text-sm text-[#FDFBF7] font-mono tracking-widest placeholder-[#555] focus:outline-none focus:border-[#C5A059] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#b08e48] hover:from-[#d8b368] hover:to-[#be9b52] text-black font-serif font-bold text-sm transition-all shadow-lg shadow-[#C5A059]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Authenticating Partner..." : "Access Partner Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#71717A]">
          Lost your partner PIN? Contact SoulsVenture Operations at{" "}
          <a href="tel:+919820144521" className="text-[#C5A059] hover:underline font-mono">
            +91 98201 44521
          </a>
        </div>
      </div>

      {/* Quick 1-Click Role-Based Demo Logins */}
      <div className="p-4 sm:p-5 bg-[#141414] border border-[#262626] rounded-2xl space-y-3 sm:space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            1-Click Demo Partner Access (Instant Role Test)
          </span>
          <span className="text-[10px] text-[#71717A] font-mono">Click to test each role</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {/* Hotel Partner Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin("9820111222", "1234")}
            className="p-3 rounded-xl bg-[#1B1B1B] hover:bg-[#24221A] border border-[#333333] hover:border-[#C5A059] text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif text-[#FDFBF7] group-hover:text-[#C5A059]">
                <Hotel className="w-4 h-4 text-[#C5A059]" />
                <span className="font-medium">The Oberoi Udaivilas</span>
              </div>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#C5A059]/20 text-[#C5A059]">
                Hotel Role
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#777] mt-1">
              Phone: 9820111222 • PIN: 1234
            </div>
            <div className="text-[10px] text-[#A1A1AA] mt-0.5">
              Suite reservations, guest arrival dates & dietary requests.
            </div>
          </button>

          {/* Driver / Fleet Partner Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin("9829011222", "1234")}
            className="p-3 rounded-xl bg-[#1B1B1B] hover:bg-[#16222b] border border-[#333333] hover:border-sky-400 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif text-[#FDFBF7] group-hover:text-sky-400">
                <Car className="w-4 h-4 text-sky-400" />
                <span className="font-medium">Vikram Singh Chauffeur</span>
              </div>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-800">
                Driver Role
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#777] mt-1">
              Phone: 9829011222 • PIN: 1234
            </div>
            <div className="text-[10px] text-[#A1A1AA] mt-0.5">
              Pickup times, route itineraries & luxury 4x4 fleet dispatch.
            </div>
          </button>

          {/* Tour Guide Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin("9829033444", "1234")}
            className="p-3 rounded-xl bg-[#1B1B1B] hover:bg-[#14261c] border border-[#333333] hover:border-emerald-400 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif text-[#FDFBF7] group-hover:text-emerald-400">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">Dr. Rajesh Mathur</span>
              </div>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Guide Role
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#777] mt-1">
              Phone: 9829033444 • PIN: 1234
            </div>
            <div className="text-[10px] text-[#A1A1AA] mt-0.5">
              Tour schedules, guest names & monument site walkthroughs.
            </div>
          </button>

          {/* Wilderness Camp Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin("9820444555", "1234")}
            className="p-3 rounded-xl bg-[#1B1B1B] hover:bg-[#252016] border border-[#333333] hover:border-[#C5A059] text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif text-[#FDFBF7] group-hover:text-[#C5A059]">
                <Hotel className="w-4 h-4 text-[#C5A059]" />
                <span className="font-medium">SUJÁN JAWAI Camp</span>
              </div>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#C5A059]/20 text-[#C5A059]">
                Camp / Hotel
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#777] mt-1">
              Phone: 9820444555 • PIN: 1234
            </div>
            <div className="text-[10px] text-[#A1A1AA] mt-0.5">
              Royal luxury tents, leopard tracker safaris & private dining.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
