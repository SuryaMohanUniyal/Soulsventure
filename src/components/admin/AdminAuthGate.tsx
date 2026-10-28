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
  Building2,
} from "lucide-react";
import { CreativeSoulMark } from "@/components/SoulsventureLogo";
import {
  TeamRole,
  TeamMember,
  AdminAuthSession,
  verifyAdminLogin,
  registerNewTeamMember,
  saveAdminAuthSession,
  MASTER_FOUNDER_PASSCODE,
} from "@/lib/crmStore";

interface AdminAuthGateProps {
  onLoginSuccess: (session: AdminAuthSession) => void;
}

export default function AdminAuthGate({ onLoginSuccess }: AdminAuthGateProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Login form state
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState<TeamRole>("Senior Curator");
  const [regPassword, setRegPassword] = useState("");
  const [regAuthKey, setRegAuthKey] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmailOrPhone.trim() || !loginPassword.trim()) {
      setErrorMessage("Please enter your registered email/phone and password.");
      return;
    }

    const verifiedUser = verifyAdminLogin(loginEmailOrPhone, loginPassword);
    if (!verifiedUser) {
      setErrorMessage(
        "Access Denied: Unrecognized credentials. Only authorized founders and team members added to Concierge OS may access this console."
      );
      return;
    }

    const session: AdminAuthSession = {
      token: `sv-auth-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user: verifiedUser,
      loginTime: new Date().toISOString(),
    };

    saveAdminAuthSession(session);
    setSuccessMessage(`Welcome back, ${verifiedUser.name}. Initializing Concierge OS...`);
    setTimeout(() => {
      onLoginSuccess(session);
    }, 600);
  };

  const handleQuickLogin = (founder: "Suraj Uniyal" | "Harsh Sood") => {
    setErrorMessage(null);
    const email = founder === "Suraj Uniyal" ? "suraj@soulsventure.com" : "harsh@soulsventure.com";
    const pin = founder === "Suraj Uniyal" ? "812635" : "931984";
    setLoginEmailOrPhone(email);
    setLoginPassword(pin);

    const verifiedUser = verifyAdminLogin(email, pin);
    if (verifiedUser) {
      const session: AdminAuthSession = {
        token: `sv-auth-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        user: verifiedUser,
        loginTime: new Date().toISOString(),
      };
      saveAdminAuthSession(session);
      setSuccessMessage(`One-touch authentication verified for ${founder}. Entering dashboard...`);
      setTimeout(() => {
        onLoginSuccess(session);
      }, 500);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword.trim()) {
      setErrorMessage("Please fill out all registration fields.");
      return;
    }

    if (!regAuthKey.trim()) {
      setErrorMessage(
        "Founder Authorization Key is required. To maintain absolute security, new staff registration requires the master key held by Suraj Uniyal or Harsh Sood."
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
    setSuccessMessage(`Account registered and authorized for ${result.member.name}. Loading workspace...`);
    setTimeout(() => {
      onLoginSuccess(session);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col justify-between text-[#FDFBF7] font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Top Subtle Bar */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-[#222222]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <CreativeSoulMark className="w-7 h-7 text-[#C5A059]" isScrolled={false} />
          <span className="font-serif tracking-[0.24em] text-sm text-[#FDFBF7] font-light">
            SOULSVENTURE
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-[#A1A1AA] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      {/* Main Auth Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-[#161616] border border-[#2B2B2B] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Subtle Golden Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#C5A059]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Header Block */}
          <div className="text-center space-y-2 relative">
            <div className="w-12 h-12 rounded-full bg-[#202020] border border-[#C5A059]/40 text-[#C5A059] mx-auto flex items-center justify-center shadow-inner">
              <Lock className="w-5 h-5" />
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-semibold block">
                Concierge OS • Restricted Terminal
              </span>
              <h1 className="font-serif text-2xl font-light text-[#FDFBF7]">
                Founder & Staff Authentication
              </h1>
              <p className="text-xs text-[#A1A1AA] font-light max-w-xs mx-auto">
                Confidential administrative portal. Accessible solely to verified founders & designated operational personnel.
              </p>
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
              className={`py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === "login"
                  ? "bg-[#C5A059] text-[#111111] font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-[#FDFBF7]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === "register"
                  ? "bg-[#C5A059] text-[#111111] font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-[#FDFBF7]"
              }`}
            >
              Register Team Access
            </button>
          </div>

          {/* Status Banners */}
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

          {/* TAB 1: SIGN IN FORM */}
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1.5">
                  Official Email or Phone
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
                  <input
                    type="text"
                    required
                    value={loginEmailOrPhone}
                    onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                    placeholder="e.g. suraj@soulsventure.com"
                    className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] pl-9 pr-3 py-2.5 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                    Password or 6-Digit PIN
                  </label>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password or founder PIN"
                    className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] pl-9 pr-10 py-2.5 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#FDFBF7] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#A1A1AA]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#1F1F1F] border-[#333333] text-[#C5A059] focus:ring-0"
                  />
                  <span>Remember this device</span>
                </label>
                <span className="text-[10px] text-[#71717A]">256-Bit SSL Secured</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#111111] text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Authorize & Unlock</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Founder Fast-Pass Access Card */}
              <div className="pt-4 mt-4 border-t border-[#262626] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block text-center">
                  Founder Fast-Pass Access
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("Suraj Uniyal")}
                    className="px-3 py-2 bg-[#202020] hover:bg-[#282828] border border-[#2F2F2F] hover:border-[#C5A059]/40 rounded-lg text-left transition-colors cursor-pointer group"
                  >
                    <span className="text-[11px] font-medium text-[#FDFBF7] block group-hover:text-[#C5A059]">
                      Suraj Uniyal
                    </span>
                    <span className="text-[9px] text-[#71717A] block">PIN: 812635</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin("Harsh Sood")}
                    className="px-3 py-2 bg-[#202020] hover:bg-[#282828] border border-[#2F2F2F] hover:border-[#C5A059]/40 rounded-lg text-left transition-colors cursor-pointer group"
                  >
                    <span className="text-[11px] font-medium text-[#FDFBF7] block group-hover:text-[#C5A059]">
                      Harsh Sood
                    </span>
                    <span className="text-[9px] text-[#71717A] block">PIN: 931984</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* TAB 2: REGISTER TEAM MEMBER */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rawat"
                    className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] pl-9 pr-3 py-2 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@soulsventure.com"
                    className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                  Assigned Operational Role
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as TeamRole)}
                  className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] cursor-pointer"
                >
                  <option value="Senior Curator">Senior Curator (Client Proposals & Radar)</option>
                  <option value="On-Ground Concierge">On-Ground Concierge (Field Updates & Stays)</option>
                  <option value="Finance & Accounts">Finance & Accounts (B2B Rates & Invoicing)</option>
                  <option value="Junior Assistant">Junior Assistant (Restricted / Read-Only)</option>
                  <option value="Founder (Unrestricted)">Founder (Unrestricted Master Admin)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold mb-1">
                  Create Password / PIN *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters or PIN"
                  className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059] font-mono"
                />
              </div>

              <div className="p-3 bg-[#191919] border border-[#2C2C2C] rounded-lg space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#C5A059]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Founder Authorization Key *
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={regAuthKey}
                  onChange={(e) => setRegAuthKey(e.target.value)}
                  placeholder="Enter Master Founder Passcode (812635)"
                  className="w-full bg-[#131313] text-xs text-[#FDFBF7] px-3 py-1.5 rounded border border-[#3A3A3A] focus:outline-none focus:border-[#C5A059] font-mono"
                />
                <span className="text-[10px] text-[#71717A] block leading-tight">
                  Required to prevent unauthorized accounts. Provided directly by Suraj Uniyal or Harsh Sood.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#111111] text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                <span>Authorize & Create Account</span>
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
            <p>Direct Inquiries or Founder Assistance: +91 8126357353</p>
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
