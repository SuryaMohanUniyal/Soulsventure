"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Mail,
  Phone,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { registerClientAccount } from "@/lib/crmStore";

export default function ClientRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const res = registerClientAccount({
      name,
      email,
      phone,
      password,
    });

    if (res.success && res.client) {
      window.location.href = "/client/portal";
    } else {
      setIsSubmitting(false);
      setErrorMsg(res.error || "Failed to register account. Please check your details.");
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
            Private Member Onboarding
          </h1>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Create your confidential account to securely track your bespoke itineraries, confirmed hotel vouchers, and direct line to our founding curators.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs">
            {errorMsg}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mr. Vikramaditya Singhania"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
              Primary Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@privateoffice.com"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
              Direct Telephone / WhatsApp
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98XXXXXXXX"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
              Create Portal Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? "Creating Membership..." : "Complete Registration"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Existing Member Link */}
        <div className="text-center pt-2">
          <span className="text-xs text-[#71717A]">
            Already have a private membership?{" "}
            <Link
              href="/client/login"
              className="text-[#C5A059] hover:underline font-semibold"
            >
              Sign In Here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
