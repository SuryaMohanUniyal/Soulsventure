"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { AdminTab, isTabLockedForRole } from "@/components/admin/AdminSidebar";
import {
  Lock,
  Users,
  Calendar,
  Layers,
  Compass,
  Building2,
  KeyRound,
  Heart,
  Sparkles,
  BarChart3,
  Plane,
  Receipt,
} from "lucide-react";
import AdminItineraryBuilder from "@/components/admin/AdminItineraryBuilder";
import AdminGSTInvoicingSuite from "@/components/admin/AdminGSTInvoicingSuite";
import AdminCharterBookingModule from "@/components/admin/AdminCharterBookingModule";
import AdminCRMTable from "@/components/admin/AdminCRMTable";
import AdminCalendarView from "@/components/admin/AdminCalendarView";
import AdminPipelineKanban from "@/components/admin/AdminPipelineKanban";
import AdminActiveTravelers from "@/components/admin/AdminActiveTravelers";
import { AdminVendorLedger } from "@/components/admin/AdminVendorLedger";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminAnniversaryRadar } from "@/components/admin/AdminAnniversaryRadar";
import { AdminPermissionsMatrix } from "@/components/admin/AdminPermissionsMatrix";
import { AdminFlightWeatherOps } from "@/components/admin/AdminFlightWeatherOps";
import { AdminMoodboardVault } from "@/components/admin/AdminMoodboardVault";
import { AdminScrapbookManager } from "@/components/admin/AdminScrapbookManager";
import AdminClientDossierDrawer from "@/components/admin/AdminClientDossierDrawer";
import { AdminProposalModal } from "@/components/admin/AdminProposalModal";
import AdminAuthGate from "@/components/admin/AdminAuthGate";
import {
  CRMLead,
  LeadStatus,
  TeamRole,
  RolePermissions,
  ROLE_PERMISSIONS,
  getStoredRolePermissions,
  AdminAuthSession,
  getAdminAuthSession,
  clearAdminAuthSession,
  getStoredLeads,
  syncLeadsWithCloud,
  syncTeamWithCloud,
  updateLeadStatus,
  updateLeadNotes,
  updateLeadCurator,
  updateLeadMilestone,
  deleteLead,
  clearAllLeads,
  saveLeads,
  pushCloudLeads,
  ACTIVE_TRAVELERS,
} from "@/lib/crmStore";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [authSession, setAuthSession] = useState<AdminAuthSession | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<AdminTab>("crm");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFounder, setActiveFounder] = useState<"Suraj Uniyal" | "Harsh Sood">("Suraj Uniyal");
  const [activeRole, setActiveRole] = useState<TeamRole>("Founder (Unrestricted)");
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [rolePermissions, setRolePermissions] = useState<Record<TeamRole, RolePermissions>>(() => getStoredRolePermissions());
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [proposalLead, setProposalLead] = useState<CRMLead | null>(null);

  // Load from localStorage safely on mount with authentication & cloud sync
  useEffect(() => {
    setMounted(true);

    // Apply strict dark background to html & body while in /admin to eliminate white borders on mobile swipe
    if (typeof document !== "undefined") {
      const origHtmlBg = document.documentElement.style.backgroundColor;
      const origBodyBg = document.body.style.backgroundColor;
      document.documentElement.style.backgroundColor = "#111111";
      document.body.style.backgroundColor = "#111111";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";

      // 1. Verify persistent authentication session
      const existing = getAdminAuthSession();
      if (existing && existing.user) {
        setAuthSession(existing);
        if (existing.user.name === "Harsh Sood") {
          setActiveFounder("Harsh Sood");
        } else {
          setActiveFounder("Suraj Uniyal");
        }
        if (existing.user.role) {
          setActiveRole(existing.user.role);
        }
      }
      setIsCheckingAuth(false);

      // 2. Instant local render (0ms)
      const stored = getStoredLeads();
      setLeads(stored);

      // 2. Immediate cloud database fetch & merge
      syncLeadsWithCloud()
        .then((synced) => {
          setLeads([...synced]);
        })
        .catch((e) => console.warn("Initial cloud sync deferred:", e));
      syncTeamWithCloud().catch(() => {});

      // 3. Multi-tab local sync listener
      const handleSync = () => {
        const refreshed = getStoredLeads();
        setLeads([...refreshed]);
        setRolePermissions(getStoredRolePermissions());
      };
      window.addEventListener("storage", handleSync);

      // 4. Polling cloud database every 10 seconds for real-time mobile submissions
      const cloudInterval = setInterval(() => {
        if (typeof document !== "undefined" && document.visibilityState === "visible") {
          syncLeadsWithCloud()
            .then((synced) => {
              setLeads([...synced]);
            })
            .catch(() => {});
        }
      }, 10000);

      return () => {
        window.removeEventListener("storage", handleSync);
        clearInterval(cloudInterval);
        document.documentElement.style.backgroundColor = origHtmlBg;
        document.body.style.backgroundColor = origBodyBg;
      };
    }
  }, []);

  const handleLoginSuccess = (session: AdminAuthSession) => {
    setAuthSession(session);
    if (session.user.name === "Harsh Sood") {
      setActiveFounder("Harsh Sood");
    } else {
      setActiveFounder("Suraj Uniyal");
    }
    if (session.user.role) {
      setActiveRole(session.user.role);
    }
  };

  const handleLogout = () => {
    clearAdminAuthSession();
    setAuthSession(null);
  };

  const refreshLeads = () => {
    syncLeadsWithCloud()
      .then((synced) => {
        setLeads([...synced]);
      })
      .catch(() => {
        setLeads([...getStoredLeads()]);
      });
  };

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
    pushCloudLeads(updated).catch(console.error);

    // Update selected lead if drawer is open
    if (selectedLead && selectedLead.id === leadId) {
      const refreshed = updated.find((l) => l.id === leadId) || null;
      setSelectedLead(refreshed);
    }
  };

  const handleUpdateNotes = (leadId: string, newNotes: string) => {
    const updated = updateLeadNotes(leadId, newNotes);
    setLeads(updated);
    pushCloudLeads(updated).catch(console.error);
    if (selectedLead && selectedLead.id === leadId) {
      const refreshed = updated.find((l) => l.id === leadId) || null;
      setSelectedLead(refreshed);
    }
  };

  const handleUpdateCurator = (leadId: string, newCurator: "Suraj Uniyal" | "Harsh Sood") => {
    const updated = updateLeadCurator(leadId, newCurator);
    setLeads(updated);
    pushCloudLeads(updated).catch(console.error);
    if (selectedLead && selectedLead.id === leadId) {
      const refreshed = updated.find((l) => l.id === leadId) || null;
      setSelectedLead(refreshed);
    }
  };

  const handleToggleMilestone = (leadId: string, milestoneKey: keyof CRMLead["milestones"]) => {
    const updated = updateLeadMilestone(leadId, milestoneKey);
    setLeads(updated);
    pushCloudLeads(updated).catch(console.error);
    if (selectedLead && selectedLead.id === leadId) {
      const refreshed = updated.find((l) => l.id === leadId) || null;
      setSelectedLead(refreshed);
    }
  };

  const handleDeleteLead = (leadId: string) => {
    const updated = deleteLead(leadId);
    setLeads(updated);
    if (selectedLead && (selectedLead.id === leadId || selectedLead.referenceCode === leadId)) {
      setSelectedLead(null);
    }
  };

  const handleClearAllLeads = () => {
    const updated = clearAllLeads();
    setLeads(updated);
    setSelectedLead(null);
  };

  const handleAddManualLead = (newLeadData: Partial<CRMLead>) => {
    const now = new Date();
    const dateKey = now.toISOString().split("T")[0];
    const newLead: CRMLead = {
      id: `lead-${Date.now()}`,
      referenceCode: `SV-${Math.floor(1000 + Math.random() * 9000)}-IND`,
      createdAt: now.toISOString(),
      dateKey,
      clientName: newLeadData.clientName || "Valued Private Client",
      firstName: newLeadData.clientName?.split(" ")[0] || "Valued",
      lastName: newLeadData.clientName?.split(" ").slice(1).join(" ") || "Client",
      email: newLeadData.email || "concierge@soulsventure.com",
      phone: newLeadData.phone || "+91 98201 00000",
      destinations: newLeadData.destinations || ["Rajasthan"],
      destinationSummary: newLeadData.destinationSummary || "Royal Rajasthan Circuit",
      travelWindow: newLeadData.travelWindow || "Winter 2026",
      departureDate: newLeadData.departureDate || dateKey,
      duration: newLeadData.duration || "8 Days",
      companions: newLeadData.companions || "2 Guests",
      budgetTier: newLeadData.budgetTier || "₹10,00,000 - ₹20,00,000",
      estimatedValueINR: newLeadData.estimatedValueINR || 1500000,
      specialInterests: newLeadData.specialInterests || ["Palace Stays", "Private Heritage"],
      specialRequests: newLeadData.specialRequests || "Recorded offline via phone concierge.",
      consultationMethod: "phone",
      preferredTimeOfDay: "Morning",
      status: "New Lead",
      assignedCurator: activeFounder,
      internalNotes: "Manually booked client via founder direct line.",
      isVIP: true,
      milestones: {
        inquiryLogged: true,
        discoveryCallCompleted: false,
        proposalSent: false,
        depositReceived: false,
        vouchersIssued: false,
        conciergeActive: false,
      },
    };

    const updated = [newLead, ...leads];
    saveLeads(updated);
    setLeads(updated);
    pushCloudLeads(updated).catch(console.error);
  };

  const handleGenerateProposal = (lead: CRMLead) => {
    setProposalLead(lead);
  };

  // Filter leads by global search query
  const filteredLeads = (leads || []).filter((l) => {
    if (!l) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (l.clientName || "").toLowerCase().includes(q) ||
      (l.referenceCode || "").toLowerCase().includes(q) ||
      (l.destinationSummary || "").toLowerCase().includes(q) ||
      (l.email || "").toLowerCase().includes(q) ||
      (l.phone || "").toLowerCase().includes(q)
    );
  });

  const totalPipelineValueINR = (leads || []).reduce((acc, curr) => acc + (curr?.estimatedValueINR || 0), 0);
  const newLeadsCount = (leads || []).filter((l) => l?.status === "New Lead").length;
  const activeTravelersCount = (leads || []).filter((l) => l?.status === "On-Ground Active").length + (ACTIVE_TRAVELERS || []).length;

  const quickTabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "crm", label: "Leads", icon: Users },
    { id: "itinerary-builder", label: "AI Studio", icon: Sparkles },
    { id: "invoicing", label: "GST Bills", icon: Receipt },
    { id: "pipeline", label: "Pipeline", icon: Layers },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "live", label: "On-Ground", icon: Compass },
    { id: "radar", label: "Radar", icon: Heart },
    { id: "vendors", label: "Vendors", icon: Building2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "permissions", label: "Matrix", icon: KeyRound },
  ];

  if (!mounted || isCheckingAuth) {
    return (
      <div className="min-h-dvh w-full max-w-full overflow-hidden bg-[#111111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin" />
          <span className="text-xs font-serif tracking-[0.2em] uppercase text-[#C5A059]">
            Loading SoulsVenture Concierge OS...
          </span>
        </div>
      </div>
    );
  }

  // If not authenticated or locked, present the secure Login Gate!
  if (!authSession) {
    return <AdminAuthGate onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-dvh w-full max-w-full overflow-x-hidden bg-[#111111] flex flex-col font-sans text-[#FDFBF7]">
      {/* Sticky Top Bar */}
      <AdminHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFounder={activeFounder}
        setActiveFounder={setActiveFounder}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onRefresh={refreshLeads}
        onLogout={handleLogout}
        totalLeadsCount={leads.length}
        totalPipelineValueINR={totalPipelineValueINR}
        activeTravelersCount={activeTravelersCount}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Horizontal Quick-Tab Strip for One-Tap Navigation */}
      <div className="md:hidden bg-[#161616] border-b border-[#262626] px-2.5 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0 w-full max-w-full">
        {quickTabs.map((tab) => {
          const isSelected = currentTab === tab.id;
          const isLocked = isTabLockedForRole(
            tab.id,
            rolePermissions?.[activeRole] || ROLE_PERMISSIONS[activeRole] || ROLE_PERMISSIONS["Founder (Unrestricted)"]
          );
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (isLocked) {
                  setLockedToast(`Access Restricted: '${tab.label}' is locked for '${activeRole}' in the Permissions Matrix.`);
                  setTimeout(() => setLockedToast(null), 4500);
                  return;
                }
                setCurrentTab(tab.id);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-[#C5A059] text-[#111111] font-semibold shadow-sm"
                  : isLocked
                  ? "bg-[#181818] text-[#555555] opacity-50 cursor-not-allowed border border-transparent"
                  : "bg-[#202020] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#2E2E2E]"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.id === "crm" && newLeadsCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden w-full max-w-full">
        {/* Navigation Sidebar (Desktop persistent + Mobile slide-over drawer) */}
        <AdminSidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          newLeadsCount={newLeadsCount}
          activeTravelersCount={activeTravelersCount}
          activeRole={activeRole}
          rolePermissions={rolePermissions?.[activeRole] || ROLE_PERMISSIONS[activeRole] || ROLE_PERMISSIONS["Founder (Unrestricted)"]}
          onLockedClick={(tabLabel) => {
            setLockedToast(`Access Denied: '${tabLabel}' is locked for '${activeRole}' by the Founder in the Permissions Matrix.`);
            setTimeout(() => setLockedToast(null), 4500);
          }}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Tab Content Display */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-full p-2.5 sm:p-6 lg:p-8 bg-[#111111] min-w-0">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 w-full max-w-full min-w-0">
            {/* Locked Tab Gate */}
            {isTabLockedForRole(currentTab, rolePermissions?.[activeRole] || ROLE_PERMISSIONS[activeRole] || ROLE_PERMISSIONS["Founder (Unrestricted)"]) ? (
              <div className="bg-[#181818] border border-amber-500/40 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-center space-y-4 my-10 sm:my-16 shadow-2xl animate-in fade-in">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-950/60 border border-amber-500/50 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block">
                    Section Access Restricted
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                    Locked by Founder in Permissions Matrix
                  </h3>
                  <p className="text-xs text-[#A1A1AA] font-light max-w-md mx-auto pt-1 leading-relaxed">
                    Access to this module has been locked for credentials associated with{" "}
                    <span className="text-[#C5A059] font-medium font-mono">{activeRole}</span>.
                    This section cannot be viewed or clicked until a Founder unlocks it in the Master Permissions Matrix.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentTab("permissions")}
                    className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-serif font-medium uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
                  >
                    Open Permissions Matrix to Unlock
                  </button>
                </div>
              </div>
            ) : (
              <>
                {currentTab === "crm" && (
                  <AdminCRMTable
                    leads={filteredLeads}
                    onOpenDossier={(lead) => setSelectedLead(lead)}
                    onUpdateStatus={handleUpdateStatus}
                    onAddManualLead={handleAddManualLead}
                    onDeleteLead={handleDeleteLead}
                    onClearAllLeads={handleClearAllLeads}
                    activeRole={activeRole}
                  />
                )}

                {currentTab === "calendar" && (
                  <AdminCalendarView
                    leads={leads}
                    onOpenDossier={(lead) => setSelectedLead(lead)}
                  />
                )}

                {currentTab === "pipeline" && (
                  <AdminPipelineKanban
                    leads={leads}
                    onOpenDossier={(lead) => setSelectedLead(lead)}
                    onUpdateStatus={handleUpdateStatus}
                  />
                )}

                {currentTab === "live" && <AdminActiveTravelers leads={leads} />}

                {currentTab === "radar" && <AdminAnniversaryRadar />}

                {currentTab === "flight-weather" && <AdminFlightWeatherOps />}

                {currentTab === "moodboards" && <AdminMoodboardVault />}

                {currentTab === "scrapbooks" && <AdminScrapbookManager />}

                {currentTab === "vendors" && <AdminVendorLedger />}

                {currentTab === "analytics" && <AdminAnalytics leads={leads} />}
                {currentTab === "itinerary-builder" && (
                  <AdminItineraryBuilder
                    initialLead={proposalLead || selectedLead || leads[0]}
                    onSelectLead={(l) => setSelectedLead(l)}
                  />
                )}

                {currentTab === "invoicing" && <AdminGSTInvoicingSuite />}


                {currentTab === "permissions" && (
                  <AdminPermissionsMatrix
                    activeRole={activeRole}
                    setActiveRole={setActiveRole}
                    onPermissionsChange={(newPerms) => setRolePermissions({ ...newPerms })}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Floating Access Denied Toast */}
      {lockedToast && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 p-3 sm:p-4 bg-[#1C1414] border border-amber-500/60 text-amber-200 rounded-xl shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div className="text-xs font-medium">{lockedToast}</div>
          </div>
          <button
            onClick={() => setLockedToast(null)}
            className="text-amber-400/70 hover:text-white text-xs p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Slide-over Client Dossier Drawer */}
      <AdminClientDossierDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        onUpdateCurator={handleUpdateCurator}
        onToggleMilestone={handleToggleMilestone}
        onGenerateProposal={handleGenerateProposal}
      />

      {/* Luxury Printable Proposal & Itinerary Builder Modal */}
      {proposalLead && (
        <AdminProposalModal
          lead={proposalLead}
          isOpen={!!proposalLead}
          onClose={() => setProposalLead(null)}
        />
      )}
    </div>
  );
}
