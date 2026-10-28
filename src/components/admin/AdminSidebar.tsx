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
    if (catId === "intelligence") return ["radar", "flight-weather", "moodboards", "scrapbooks"].includes(tab);
    if (catId === "enterprise") return ["vendors", "analytics", "permissions"].includes(tab);
    return false;
  };

  // State to track which categories are open
  // Opens the category that holds the currently active tab by default
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => ({
    operations: ["crm", "calendar", "pipeline", "live"].includes(currentTab),
    intelligence: ["radar", "flight-weather", "moodboards", "scrapbooks"].includes(currentTab),
    enterprise: ["vendors", "analytics", "permissions"].includes(currentTab),
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

    const handleClick = () => {
      if (isLocked) {
        if (onLockedClick) {
          onLockedClick(item.label);
        }
        return;
      }
      setCurrentTab(item.id);
      if (onCloseMobile) {
        onCloseMobile();
      }
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
                    ? "max-h-96 opacity-100 pt-1.5 pb-1"
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

        {/* Founders Direct Box */}
        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#262626] space-y-1.5 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founders Direct Line</span>
          </div>
          <p className="text-[11px] text-[#A1A1AA] font-light leading-relaxed">
            Suraj Uniyal & Harsh Sood
            <br />
            HQ Private Desk: <span className="text-[#FDFBF7] font-mono">+91 98XXXXXXXX</span>
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
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-[#141414] border-r border-[#262626] flex-col justify-between p-4 flex-shrink-0 min-h-[calc(100vh-61px)] overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile Slide-Over Drawer with Animated Backdrop */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#141414] border-r border-[#2A2A2A] shadow-2xl z-50 flex flex-col justify-between p-4 overflow-y-auto animate-in slide-in-from-left duration-250">
            <div>
              {/* Drawer Top Header with Close Button */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#242424]">
                <div className="flex items-center gap-2">
                  <span className="font-serif tracking-[0.2em] text-xs text-[#FDFBF7] uppercase font-light">
                    Concierge Menu
                  </span>
                  <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-mono">
                    {activeRole.replace(" (Unrestricted)", "")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  aria-label="Close navigation menu"
                  className="p-1.5 text-[#A1A1AA] hover:text-[#FDFBF7] hover:bg-[#222222] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navContent}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
