"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { AdminTab, isTabLockedForRole } from "@/components/admin/AdminSidebar";
import { Lock } from "lucide-react";
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
  const [currentTab, setCurrentTab] = useState<AdminTab>("crm");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFounder, setActiveFounder] = useState<"Suraj Uniyal" | "Harsh Sood">("Suraj Uniyal");
  const [activeRole, setActiveRole] = useState<TeamRole>("Founder (Unrestricted)");
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [rolePermissions, setRolePermissions] = useState<Record<TeamRole, RolePermissions>>(() => getStoredRolePermissions());
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [proposalLead, setProposalLead] = useState<CRMLead | null>(null);

  // Load from localStorage safely on mount with cloud sync
  useEffect(() => {
    setMounted(true);
    // 1. Instant local render (0ms)
    const stored = getStoredLeads();
    setLeads(stored);

    // 2. Immediate cloud database fetch & merge
    syncLeadsWithCloud()
      .then((synced) => {
        setLeads([...synced]);
      })
      .catch((e) => console.warn("Initial cloud sync deferred:", e));

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
    };
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

  const refreshLeads = async () => {
    // Sync with cloud on manual refresh click
    try {
      const synced = await syncLeadsWithCloud();
      setLeads([...synced]);
      if (selectedLead) {
        const refreshedSelected = synced.find((l) => l.id === selectedLead.id) || null;
        setSelectedLead(refreshedSelected);
      }
    } catch {
      const stored = getStoredLeads();
      setLeads([...stored]);
    }
  };

  const handleDeleteLead = (leadId: string) => {
    const updated = deleteLead(leadId);
    setLeads([...updated]);
    if (selectedLead && (selectedLead.id === leadId || selectedLead.referenceCode === leadId)) {
      setSelectedLead(null);
    }
  };

  const handleClearAllLeads = () => {
    if (confirm("Are you sure you want to clear all enquiries? This will clear local cache and update cloud storage.")) {
      const updated = clearAllLeads();
      setLeads([...updated]);
      setSelectedLead(null);
    }
  };

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads([...updated]);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleUpdateNotes = (leadId: string, notes: string) => {
    const updated = updateLeadNotes(leadId, notes);
    setLeads([...updated]);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, internalNotes: notes });
    }
  };

  const handleUpdateCurator = (
    leadId: string,
    curator: "Suraj Uniyal" | "Harsh Sood"
  ) => {
    const updated = updateLeadCurator(leadId, curator);
    setLeads([...updated]);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, assignedCurator: curator });
    }
  };

  const handleToggleMilestone = (
    leadId: string,
    milestoneKey: keyof CRMLead["milestones"]
  ) => {
    const updated = updateLeadMilestone(leadId, milestoneKey);
    setLeads([...updated]);
    if (selectedLead && selectedLead.id === leadId) {
      const refreshed = updated.find((l) => l.id === leadId) || null;
      setSelectedLead(refreshed);
    }
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
  const filteredLeads = leads.filter((l) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.clientName.toLowerCase().includes(q) ||
      l.referenceCode.toLowerCase().includes(q) ||
      l.destinationSummary.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q)
    );
  });

  const totalPipelineValueINR = leads.reduce((acc, curr) => acc + curr.estimatedValueINR, 0);
  const newLeadsCount = leads.filter((l) => l.status === "New Lead").length;
  const activeTravelersCount = leads.filter((l) => l.status === "On-Ground Active").length + ACTIVE_TRAVELERS.length;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin" />
          <span className="text-xs font-serif tracking-[0.2em] uppercase text-[#C5A059]">
            Loading SoulsVenture Concierge OS...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col font-sans text-[#FDFBF7]">
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
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Left Navigation Sidebar */}
        <AdminSidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          newLeadsCount={newLeadsCount}
          activeTravelersCount={activeTravelersCount}
          activeRole={activeRole}
          rolePermissions={rolePermissions[activeRole] || ROLE_PERMISSIONS[activeRole]}
          onLockedClick={(tabLabel) => {
            setLockedToast(`Access Denied: '${tabLabel}' is locked for '${activeRole}' by the Founder in the Permissions Matrix.`);
            setTimeout(() => setLockedToast(null), 4500);
          }}
        />

        {/* Tab Content Display */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#111111]">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Locked Tab Gate */}
            {isTabLockedForRole(currentTab, rolePermissions[activeRole] || ROLE_PERMISSIONS[activeRole]) ? (
              <div className="bg-[#181818] border border-amber-500/40 rounded-2xl p-8 max-w-lg mx-auto text-center space-y-4 my-16 shadow-2xl animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-amber-950/60 border border-amber-500/50 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block">
                    Section Access Restricted
                  </span>
                  <h3 className="font-serif text-2xl text-[#FDFBF7]">
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
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#1C1414] border border-amber-500/60 text-amber-200 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="text-xs font-medium pr-2">{lockedToast}</div>
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
