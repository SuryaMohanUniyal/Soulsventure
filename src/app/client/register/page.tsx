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
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { registerClientAccount } from "@/lib/crmStore";

export default function ClientRegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter your contact telephone number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!pin.trim() || pin.trim().length < 4) {
      setErrorMsg("Please create a 4-digit Security PIN (e.g. 1234).");
      return;
    }

    setIsSubmitting(true);

    const res = registerClientAccount({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: pin.trim(),
    });

    if (res.success && res.client) {
      // Direct redirect into member portal
      window.location.href = "/client/portal";
    } else {
      setIsSubmitting(false);
      setErrorMsg(res.error || "Unable to complete registration. Please review your details and try again.");
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
            Private Member Registration
          </h1>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Register your name, contact phone number, email, and a personal 4-digit Security PIN to access your bespoke itineraries and palace vouchers.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs flex items-center gap-2">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step-by-Step Badge */}
        <div className="p-3 bg-[#1C1C1C] border border-[#C5A059]/30 rounded-xl flex items-center gap-2.5 text-xs text-[#C5A059]">
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          <span>Step 1: Register Account ➔ Step 2: Instant Portal Access with PIN</span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mr. Rajesh Sharma"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          {/* Contact / Phone Number */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Contact Number / WhatsApp</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98201 11222"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sharma@example.com"
              className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555]"
            />
          </div>

          {/* Create Secret PIN */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Create 4-Digit Security PIN</span>
              </label>
              <span className="text-[10px] text-[#A1A1AA] font-mono">4 Digits (e.g. 1234)</span>
            </div>

            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="•••••• (Enter 4-digit PIN)"
                className="w-full bg-[#1F1F1F] text-[#FDFBF7] px-3.5 py-2.5 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059] placeholder-[#555555] pr-10 tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#FDFBF7]"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#71717A] mt-1">
              *Please record this PIN. You will use your phone number and PIN to sign in anytime.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{isSubmitting ? "Creating Account..." : "Register & Activate Member Portal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Existing Member Login Link */}
        <div className="text-center pt-2 border-t border-[#262626]">
          <span className="text-xs text-[#71717A]">
            Already have an active account?{" "}
            <Link
              href="/client/login"
              className="text-[#C5A059] hover:underline font-semibold"
            >
              Sign In with PIN →
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
