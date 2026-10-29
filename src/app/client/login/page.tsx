"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Lock,
  ArrowRight,
  ShieldCheck,
  User,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import {
  verifyClientLogin,
  saveClientAuthSession,
  INITIAL_CLIENT_ACCOUNTS,
} from "@/lib/crmStore";

export default function ClientLoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const client = verifyClientLogin(emailOrPhone, password);
    if (client) {
      saveClientAuthSession(client);
      window.location.href = "/client/portal";
    } else {
      setIsSubmitting(false);
      setErrorMsg("Account not found or password incorrect. Please verify your details or use 1-Click Demo Access below.");
    }
  };

  const handleDemoLogin = (clientIndex: number) => {
    const demoClient = INITIAL_CLIENT_ACCOUNTS[clientIndex];
    if (demoClient) {
      saveClientAuthSession(demoClient);
      window.location.href = "/client/portal";
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-10 px-4">
      <div className="w-full max-w-md bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Crest */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#997A3A] text-black font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-md shadow-[#C5A059]/20">
            S
          </div>
          <h1 className="font-serif text-2xl text-[#FDFBF7] tracking-wide">
            Private Member Sign In
          </h1>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Welcome to the SoulsVenture Private Client Portal. Enter your credentials to access your verified itineraries, vouchers, and direct concierge desk.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs space-y-2">
            <p>{errorMsg}</p>
            <div className="pt-1 border-t border-red-900/40 flex justify-between items-center">
              <span>New traveler?</span>
              <Link
                href="/client/register"
                className="text-[#C5A059] hover:underline font-semibold"
              >
                Register Here in 10s →
              </Link>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
              Email Address or Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="e.g. rajesh.sharma@luxuryinvest.in or +91 98XXXXXXXX"
                className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? "Verifying Credentials..." : "Enter Private Portal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Instant Demo Credentials */}
        <div className="pt-4 border-t border-[#262626] space-y-2.5">
          <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block text-center">
            One-Click Verified Demo Access
          </span>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleDemoLogin(0)}
              className="w-full p-2.5 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333333] text-left transition-colors text-xs flex items-center justify-between cursor-pointer group"
            >
              <div>
                <span className="font-serif text-[#FDFBF7] group-hover:text-[#C5A059] block">
                  Mr. Rajesh Sharma
                </span>
                <span className="text-[10px] text-[#71717A]">
                  Rajasthan & Ladakh Royal Grand Tour (Ref: SV-2026-VIP)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#C5A059] px-2 py-0.5 rounded bg-black/40">
                1-Click Demo
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin(1)}
              className="w-full p-2.5 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333333] text-left transition-colors text-xs flex items-center justify-between cursor-pointer group"
            >
              <div>
                <span className="font-serif text-[#FDFBF7] group-hover:text-[#C5A059] block">
                  Mrs. Ananya Kapoor
                </span>
                <span className="text-[10px] text-[#71717A]">
                  Kashmir Powder Heli-Skiing Odyssey (Ref: SV-2026-KSH)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#C5A059] px-2 py-0.5 rounded bg-black/40">
                1-Click Demo
              </span>
            </button>

            {INITIAL_CLIENT_ACCOUNTS[2] && (
              <button
                type="button"
                onClick={() => handleDemoLogin(2)}
                className="w-full p-2.5 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333333] text-left transition-colors text-xs flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <span className="font-serif text-[#FDFBF7] group-hover:text-[#C5A059] block">
                    Suraj Uniyal (Founder VIP Member)
                  </span>
                  <span className="text-[10px] text-[#71717A]">
                    Royal Expeditions Master Account (Ref: SV-2026-VIP)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#C5A059] px-2 py-0.5 rounded bg-black/40">
                  1-Click Demo
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center pt-2">
          <span className="text-xs text-[#71717A]">
            Don't have a private member account yet?{" "}
            <Link
              href="/client/register"
              className="text-[#C5A059] hover:underline font-semibold"
            >
              Request Access / Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
