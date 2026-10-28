"use client";

import React from "react";
import {
  Users,
  Calendar,
  Layers,
  Compass,
  Building2,
  BarChart3,
  Shield,
  Sparkles,
  Heart,
  Plane,
  Palette,
  Camera,
  KeyRound,
  Lock,
} from "lucide-react";

import { TeamRole, RolePermissions } from "@/lib/crmStore";

export type AdminTab =
  | "crm"
  | "calendar"
  | "pipeline"
  | "live"
  | "vendors"
  | "analytics"
  | "radar"
  | "flight-weather"
  | "moodboards"
  | "scrapbooks"
  | "permissions";

export function isTabLockedForRole(tab: AdminTab, perms?: RolePermissions): boolean {
  if (!perms) return false;
  switch (tab) {
    case "radar":
      return !perms.canAccessRadar;
    case "vendors":
      return !perms.canAccessVendorLedger;
    case "analytics":
      return !perms.canViewFinancialMargins;
    case "permissions":
      return !perms.canManageTeam;
    case "live":
      return !perms.canIssueVouchers;
    case "pipeline":
      return !perms.canEditMilestones;
    case "crm":
    case "calendar":
      return !perms.canViewAllLeads;
    default:
      return false;
  }
}

interface AdminSidebarProps {
  currentTab: AdminTab;
  setCurrentTab: (tab: AdminTab) => void;
  newLeadsCount: number;
  activeTravelersCount: number;
  activeRole?: TeamRole;
  rolePermissions?: RolePermissions;
  onLockedClick?: (tabLabel: string) => void;
}

export default function AdminSidebar({
  currentTab,
  setCurrentTab,
  newLeadsCount,
  activeTravelersCount,
  activeRole = "Founder (Unrestricted)",
  rolePermissions,
  onLockedClick,
}: AdminSidebarProps) {
  const operationsItems = [
    {
      id: "crm" as AdminTab,
      label: "Enquiries & Bookings",
      icon: Users,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : undefined,
      badgeColor: "bg-[#C5A059] text-[#111111]",
    },
    {
      id: "calendar" as AdminTab,
      label: "Luxury Calendar & Dates",
      icon: Calendar,
      badge: "Intel",
      badgeColor: "bg-[#2A2A2A] text-[#C5A059]",
    },
    {
      id: "pipeline" as AdminTab,
      label: "Trip Stage Pipeline",
      icon: Layers,
    },
    {
      id: "live" as AdminTab,
      label: "Live On-Ground Concierge",
      icon: Compass,
      badge: `${activeTravelersCount} Active`,
      badgeColor: "bg-emerald-950 text-emerald-400 border border-emerald-700/50",
    },
  ];

  const intelligenceItems = [
    {
      id: "radar" as AdminTab,
      label: "VIP Anniversary Radar",
      icon: Heart,
      badge: "4 Due",
      badgeColor: "bg-rose-950 text-rose-300 border border-rose-800/40",
    },
    {
      id: "flight-weather" as AdminTab,
      label: "Flight & Alpine Weather",
      icon: Plane,
      badge: "Live",
      badgeColor: "bg-blue-950 text-blue-300 border border-blue-800/40",
    },
    {
      id: "moodboards" as AdminTab,
      label: "Client Moodboard Vault",
      icon: Palette,
    },
    {
      id: "scrapbooks" as AdminTab,
      label: "Keepsakes & Reviews",
      icon: Camera,
      badge: "5.0 ★",
      badgeColor: "bg-[#C5A059]/20 text-[#C5A059]",
    },
  ];

  const enterpriseItems = [
    {
      id: "vendors" as AdminTab,
      label: "Partner & Vendor Tie-Ups",
      icon: Building2,
    },
    {
      id: "analytics" as AdminTab,
      label: "Revenue & Analytics",
      icon: BarChart3,
    },
    {
      id: "permissions" as AdminTab,
      label: "Team Permission Matrix",
      icon: KeyRound,
      badge: "RBAC",
      badgeColor: "bg-purple-950 text-purple-300 border border-purple-800/40",
    },
  ];

  const renderNavButton = (item: {
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }) => {
    const Icon = item.icon;
    const isActive = currentTab === item.id;
    const isLocked = isTabLockedForRole(item.id, rolePermissions);

    const handleClick = () => {
      if (isLocked) {
        if (onLockedClick) {
          onLockedClick(item.label);
        }
        return;
      }
      setCurrentTab(item.id);
    };

    if (isLocked) {
      return (
        <button
          key={item.id}
          type="button"
          onClick={handleClick}
          title={`Access Restricted: '${item.label}' is locked for ${activeRole} by the Founder in the Permissions Matrix.`}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium opacity-40 cursor-not-allowed bg-transparent text-[#777777] hover:bg-transparent transition-all select-none group border border-transparent"
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-3.5 h-3.5 text-amber-500/80 flex-shrink-0" />
            <span className="truncate line-through decoration-amber-500/60">{item.label}</span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/50 flex items-center gap-1 flex-shrink-0">
            <Lock className="w-2.5 h-2.5" />
            <span>Locked</span>
          </span>
        </button>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
          isActive
            ? "bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 shadow-sm"
            : "text-[#A1A1AA] hover:text-[#FDFBF7] hover:bg-[#1C1C1C]"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C5A059]" : "text-[#71717A]"}`} />
          <span className="truncate">{item.label}</span>
        </div>
        {item.badge && (
          <span
            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-64 bg-[#141414] border-r border-[#262626] flex flex-col justify-between p-4 flex-shrink-0 min-h-[calc(100vh-61px)] overflow-y-auto">
      {/* Top Nav Items */}
      <div className="space-y-6">
        {/* Core Operations */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#71717A] px-3 font-semibold block mb-2">
            Core Operations
          </span>
          <nav className="space-y-1">
            {operationsItems.map(renderNavButton)}
          </nav>
        </div>

        {/* Intelligence & VIP Tools */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#71717A] px-3 font-semibold block mb-2">
            VIP Intelligence & Assets
          </span>
          <nav className="space-y-1">
            {intelligenceItems.map(renderNavButton)}
          </nav>
        </div>

        {/* Enterprise & Governance */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#71717A] px-3 font-semibold block mb-2">
            Finance & Governance
          </span>
          <nav className="space-y-1">
            {enterpriseItems.map(renderNavButton)}
          </nav>
        </div>

        {/* Founders Direct Box */}
        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#262626] space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founders Direct Line</span>
          </div>
          <p className="text-[11px] text-[#A1A1AA] font-light leading-relaxed">
            Suraj Uniyal: <a href="tel:+918126357353" className="text-[#FDFBF7] hover:underline font-mono">+91 8126357353</a>
            <br />
            Harsh Sood: <a href="tel:+919319843524" className="text-[#FDFBF7] hover:underline font-mono">+91 9319843524</a>
          </p>
        </div>
      </div>

      {/* Bottom Session Security */}
      <div className="pt-4 border-t border-[#242424] space-y-1 mt-4">
        <div className="flex items-center gap-1.5 text-[11px] text-[#71717A]">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL Encrypted CRM</span>
        </div>
        <p className="text-[10px] text-[#52525B]">
          SoulsVenture Concierge OS v3.0
          <br />
          Rajpur Road, Dehradun, Uttarakhand
        </p>
      </div>
    </aside>
  );
}
