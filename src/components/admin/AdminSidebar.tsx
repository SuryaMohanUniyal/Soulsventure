"use client";

import React, { useState, useEffect } from "react";
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
  X,
  ChevronDown,
  Receipt,
  FileText,
  ExternalLink,
} from "lucide-react";

import { TeamRole, RolePermissions } from "@/lib/crmStore";

export type AdminTab =
  | "crm"
  | "calendar"
  | "pipeline"
  | "live"
  | "itinerary-builder"
  | "invoicing"
  | "charters"
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
    case "invoicing":
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
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  currentTab,
  setCurrentTab,
  newLeadsCount,
  activeTravelersCount,
  activeRole = "Founder (Unrestricted)",
  rolePermissions,
  onLockedClick,
  isMobileOpen = false,
  onCloseMobile,
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
      id: "itinerary-builder" as AdminTab,
      label: "AI Itinerary & Magazine PDF",
      icon: Sparkles,
      badge: "AI Studio",
      badgeColor: "bg-[#C5A059] text-black font-bold",
    },
    {
      id: "charters" as AdminTab,
      label: "Private Aviation & Choppers",
      icon: Plane,
      badge: "Charters",
      badgeColor: "bg-blue-950 text-blue-300 border border-blue-800/40",
    },
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
      icon: Compass,
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
      id: "invoicing" as AdminTab,
      label: "Multi-Currency GST Invoicing",
      icon: Receipt,
      badge: "5% GST",
      badgeColor: "bg-emerald-950 text-emerald-300 border border-emerald-800/40",
    },
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

  const categories = [
    {
      id: "operations",
      label: "Core Operations",
      items: operationsItems,
    },
    {
      id: "intelligence",
      label: "VIP Intelligence & Assets",
      items: intelligenceItems,
    },
    {
      id: "enterprise",
      label: "Finance & Governance",
      items: enterpriseItems,
    },
  ];

  const isTabInCat = (catId: string, tab: AdminTab) => {
    if (catId === "operations") return ["crm", "calendar", "pipeline", "live"].includes(tab);
    if (catId === "intelligence") return ["itinerary-builder", "charters", "radar", "flight-weather", "moodboards", "scrapbooks"].includes(tab);
    if (catId === "enterprise") return ["invoicing", "vendors", "analytics", "permissions"].includes(tab);
    return false;
  };

  // State to track which categories are open
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => ({
    operations: ["crm", "calendar", "pipeline", "live"].includes(currentTab),
    intelligence: ["itinerary-builder", "charters", "radar", "flight-weather", "moodboards", "scrapbooks"].includes(currentTab),
    enterprise: ["invoicing", "vendors", "analytics", "permissions"].includes(currentTab),
  }));

  // Auto-expand the category when currentTab changes
  useEffect(() => {
    categories.forEach((cat) => {
      if (isTabInCat(cat.id, currentTab)) {
        setOpenCategories((prev) => ({ ...prev, [cat.id]: true }));
      }
    });
  }, [currentTab]);

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

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

    return (
      <button
        key={item.id}
        onClick={() => {
          if (isLocked) {
            if (onLockedClick) onLockedClick(item.label);
            return;
          }
          setCurrentTab(item.id);
          if (onCloseMobile) onCloseMobile();
        }}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
          isActive
            ? "bg-[#C5A059] text-[#111111] font-semibold shadow-md shadow-[#C5A059]/10"
            : isLocked
            ? "text-[#555555] hover:bg-[#1A1A1A] cursor-not-allowed opacity-75"
            : "text-[#A1A1AA] hover:text-[#FDFBF7] hover:bg-[#1A1A1A]"
        }`}
        title={isLocked ? `Locked for role '${activeRole}'. Contact Suraj or Harsh to unlock.` : undefined}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon
            className={`w-4 h-4 flex-shrink-0 ${
              isActive ? "text-[#111111]" : isLocked ? "text-[#555555]" : "text-[#71717A] group-hover:text-[#FDFBF7]"
            }`}
          />
          <span className="truncate">{item.label}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isLocked && (
            <Lock className="w-3 h-3 text-[#71717A] group-hover:text-amber-400" />
          )}
          {item.badge && (
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                isActive
                  ? "bg-[#111111] text-[#C5A059]"
                  : item.badgeColor || "bg-[#242424] text-[#A1A1AA]"
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>
      </button>
    );
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Top Nav Items with Collapsible / Accordion Categories */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const isOpen = !!openCategories[cat.id];
          const hasActiveTab = cat.items.some((item) => item.id === currentTab);

          return (
            <div key={cat.id} className="rounded-xl overflow-hidden transition-all">
              {/* Main Category Header (Click to Expand / Scroll Down) */}
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer group ${
                  hasActiveTab
                    ? "bg-[#1E1E1E] border border-[#2E2E2E] text-[#FDFBF7]"
                    : "hover:bg-[#1A1A1A] text-[#8E8E93] hover:text-[#FDFBF7] border border-transparent"
                }`}
                title={`Click to ${isOpen ? "collapse" : "expand"} ${cat.label}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                      hasActiveTab ? "bg-[#C5A059] shadow-sm shadow-[#C5A059]" : "bg-[#333333] group-hover:bg-[#555555]"
                    }`}
                  />
                  <span className="text-[10px] uppercase tracking-[0.22em] font-semibold truncate">
                    {cat.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#222222] text-[#71717A] group-hover:text-[#A1A1AA]">
                    {cat.items.length}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180 text-[#C5A059]" : "rotate-0 text-[#71717A]"
                    }`}
                  />
                </div>
              </button>

              {/* Sub-categories (Smooth Animated Slide Down) */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? "max-h-[500px] opacity-100 pt-1.5 pb-1"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <nav className="space-y-1 pl-2.5 border-l border-[#262626] ml-3.5">
                  {cat.items.map(renderNavButton)}
                </nav>
              </div>
            </div>
          );
        })}

        {/* Client Portal Link Button */}
        <div className="pt-2">
          <a
            href="/client/portal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-[#1F1F1F] to-[#171717] hover:bg-[#252525] border border-[#C5A059]/40 rounded-xl text-xs font-semibold text-[#FDFBF7] transition-all group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>White-Label Client Portal</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Founders Direct Box */}
        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#262626] space-y-1.5 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founders Direct Line</span>
          </div>
          <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
            Suraj Uniyal & Harsh Sood • 24/7 VIP escalation desk.
          </p>
        </div>
      </div>

      {/* Agency Identity Footer */}
      <div className="pt-4 border-t border-[#262626]">
        <div className="flex items-center justify-between text-[11px] text-[#71717A]">
          <span>SoulsVenture Ops</span>
          <span className="font-mono text-[#C5A059]">v2.6.4 VIP</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-[#141414] border-r border-[#262626] p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto scrollbar-thin">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#141414] border-r border-[#262626] p-4 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <span className="font-serif text-sm tracking-wider uppercase text-[#FDFBF7]">
                  Navigation Menu
                </span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-[#A1A1AA] hover:text-[#FDFBF7] rounded-lg hover:bg-[#222222]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
