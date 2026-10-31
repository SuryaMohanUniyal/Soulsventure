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
        "Invalid Phone Number or PIN. Please enter your registered partner phone number and 4-digit partner PIN."
      );
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
            <label className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-medium block mb-1.5">
              Admin-Set 4-Digit PIN / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="password"
                required
                placeholder="Enter your 4-digit partner PIN"
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
          <a href="tel:+918126357353" className="text-[#C5A059] hover:underline font-mono">
            +91 81263 57353
          </a>
        </div>
      </div>
    </div>
  );
}
