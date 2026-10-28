"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  KeyRound,
  ShieldCheck,
  User,
  Phone,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  UserPlus,
  LogIn,
} from "lucide-react";
import { CreativeSoulMark } from "@/components/SoulsventureLogo";
import {
  TeamRole,
  TeamMember,
  AdminAuthSession,
  verifyAdminLogin,
  registerNewTeamMember,
  saveAdminAuthSession,
  syncTeamWithCloud,
  MASTER_FOUNDER_PASSCODE,
} from "@/lib/crmStore";

interface AdminAuthGateProps {
  onLoginSuccess: (session: AdminAuthSession) => void;
}

export default function AdminAuthGate({ onLoginSuccess }: AdminAuthGateProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Login form state
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState<TeamRole>("Senior Curator");
  const [regPassword, setRegPassword] = useState("");
  const [regAuthKey, setRegAuthKey] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    if (!loginEmailOrPhone.trim() || !loginPassword.trim()) {
      setErrorMessage("Please enter both Login ID and Password.");
      setIsSubmitting(false);
      return;
    }

    let verifiedUser = verifyAdminLogin(loginEmailOrPhone, loginPassword);
    if (!verifiedUser) {
      // Async fallback: sync team from cloud in case account was added on another device
      try {
        await syncTeamWithCloud();
        verifiedUser = verifyAdminLogin(loginEmailOrPhone, loginPassword);
      } catch (err) {
        console.warn("Cloud fallback check failed:", err);
      }
    }

    if (!verifiedUser) {
      setErrorMessage(
        "Invalid Login ID or Password. Only authorized founders and staff members added in Concierge OS may access this console."
      );
      setIsSubmitting(false);
      return;
    }

    const session: AdminAuthSession = {
      token: `sv-auth-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user: verifiedUser,
      loginTime: new Date().toISOString(),
    };

    saveAdminAuthSession(session);
    setSuccessMessage(`Welcome back, ${verifiedUser.name}. Launching Concierge OS...`);
    setTimeout(() => {
      onLoginSuccess(session);
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword.trim()) {
      setErrorMessage("Please complete all registration fields.");
      return;
    }

    if (!regAuthKey.trim()) {
      setErrorMessage(
        "Founder Authorization Passcode is required to register new staff. Contact Suraj Uniyal or Harsh Sood."
      );
      return;
    }

    const result = registerNewTeamMember(
      {
        name: regName,
        email: regEmail,
        phone: regPhone,
        role: regRole,
        password: regPassword,
      },
      regAuthKey
    );

    if (!result.success || !result.member) {
      setErrorMessage(result.error || "Failed to register staff account.");
      return;
    }

    const session: AdminAuthSession = {
      token: `sv-auth-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user: result.member,
      loginTime: new Date().toISOString(),
    };

    saveAdminAuthSession(session);
    setSuccessMessage(`Account authorized for ${result.member.name}. Loading dashboard...`);
    setTimeout(() => {
      onLoginSuccess(session);
    }, 600);
  };

  return (
    <div className="min-h-dvh bg-[#0D0D0D] flex flex-col justify-between text-[#FDFBF7] font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Top Navigation Bar */}
      <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#222222]">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <CreativeSoulMark className="w-6 h-6 sm:w-7 sm:h-7 text-[#C5A059]" isScrolled={false} />
          <span className="font-serif tracking-[0.24em] text-xs sm:text-sm text-[#FDFBF7] font-light">
            SOULSVENTURE
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-[#A1A1AA] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Website</span>
        </Link>
      </div>

      {/* Main Login Container */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 my-2 sm:my-4">
        <div className="w-full max-w-md bg-[#161616] border border-[#2B2B2B] rounded-2xl shadow-2xl p-5 sm:p-8 space-y-4 sm:space-y-5 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#C5A059]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HORIZONTAL LOGO AT THE VERY TOP */}
          <div className="flex items-center justify-center gap-3 py-1 pb-3 sm:pb-4 border-b border-[#262626]">
            <CreativeSoulMark className="w-9 h-9 sm:w-10 sm:h-10 text-[#C5A059] flex-shrink-0" isScrolled={false} />
            <div className="flex flex-col text-left">
              <span className="font-serif tracking-[0.22em] sm:tracking-[0.26em] text-lg sm:text-xl font-light text-[#FDFBF7] leading-tight">
                SOULSVENTURE
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.28em] uppercase text-[#C5A059] font-semibold mt-0.5">
                CONCIERGE OS • ADMIN LOGIN
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#1F1F1F] rounded-lg border border-[#2E2E2E]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "login"
                  ? "bg-[#C5A059] text-[#111111] font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-[#FDFBF7]"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "register"
                  ? "bg-[#C5A059] text-[#111111] font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-[#FDFBF7]"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Staff</span>
            </button>
          </div>

          {/* Error / Success Alerts */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/50 rounded-lg text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-lg text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
              <div className="flex-1 leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* 2. SIGN IN SCREEN: ID -> PASSWORD -> LOG IN BUTTON */}
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 sm:space-y-4">
              {/* FIELD 1: LOGIN ID */}
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1.5">
                  Login ID (Official Email or Phone)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]" />
                  <input
                    type="text"
                    required
                    value={loginEmailOrPhone}
                    onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                    placeholder="curator@soulsventure.com or 98XXXXXXXX"
                    className="w-full bg-[#1F1F1F] text-base sm:text-xs text-[#FDFBF7] pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>
              </div>

              {/* FIELD 2: PASSWORD */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                    Password / Access PIN
                  </label>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password or security PIN"
                    className="w-full bg-[#1F1F1F] text-base sm:text-xs text-[#FDFBF7] pl-10 pr-10 py-2.5 sm:py-3 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#FDFBF7] cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* FIELD 3: LOG IN BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-lg shadow-lg hover:shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* TAB 2: REGISTER NEW STAFF */
            <form onSubmit={handleRegisterSubmit} className="space-y-3 sm:space-y-3.5">
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Ananya Deshmukh"
                    className="w-full bg-[#1F1F1F] text-base sm:text-xs text-[#FDFBF7] pl-9 pr-3 py-2.5 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                    Login ID (Email) *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@soulsventure.com"
                    className="w-full bg-[#1F1F1F] text-base sm:text-xs text-[#FDFBF7] px-3 py-2.5 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full bg-[#1F1F1F] text-base sm:text-xs text-[#FDFBF7] px-3 py-2.5 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                  Operational Role
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as TeamRole)}
                  className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] px-3 py-2.5 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] cursor-pointer"
                >
                  <option value="Senior Curator">Senior Curator (Itinerary Design & Proposals)</option>
                  <option value="On-Ground Concierge">On-Ground Concierge (Field Ops & Stays)</option>
                  <option value="Finance & Accounts">Finance & Accounts (B2B Rates & Payouts)</option>
                  <option value="Junior Assistant">Junior Assistant (Restricted / Read-Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters or PIN"
                  className="w-full bg-[#1F1F1F] text-base sm:text-xs text-[#FDFBF7] px-3 py-2.5 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] font-mono"
                />
              </div>

              <div className="p-3 bg-[#191919] border border-[#2C2C2C] rounded-lg space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#C5A059]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Founder Authorization Passcode *
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={regAuthKey}
                  onChange={(e) => setRegAuthKey(e.target.value)}
                  placeholder="Enter Founder Authorization Passcode"
                  className="w-full bg-[#131313] text-base sm:text-xs text-[#FDFBF7] px-3 py-1.5 rounded border border-[#3A3A3A] focus:outline-none focus:border-[#C5A059] font-mono"
                />
                <span className="text-[10px] text-[#71717A] block leading-tight">
                  Security authorization required from Suraj Uniyal or Harsh Sood.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#111111] text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                <span>Authorize & Register</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Security Notice Footer */}
          <div className="pt-2 text-center text-[10px] text-[#71717A] space-y-1">
            <p className="flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
              <span>Soulsventure Luxury Travel Concierge OS v3.8</span>
            </p>
            <p>Confidential Internal System • Authorized Personnel Only</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-center py-3 text-[10px] text-[#555555]">
        © {new Date().getFullYear()} Soulsventure Bespoke Journeys Pvt. Ltd. Confidential Internal System.
      </div>
    </div>
  );
}
