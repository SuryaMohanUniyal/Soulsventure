"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { AdminTab } from "@/components/admin/AdminSidebar";
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
import {
  CRMLead,
  LeadStatus,
  TeamRole,
  getStoredLeads,
  updateLeadStatus,
  updateLeadNotes,
  updateLeadCurator,
  updateLeadMilestone,
  saveLeads,
  ACTIVE_TRAVELERS,
} from "@/lib/crmStore";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState<AdminTab>("crm");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFounder, setActiveFounder] = useState<"Suraj Uniyal" | "Harsh Sood">("Suraj Uniyal");
  const [activeRole, setActiveRole] = useState<TeamRole>("Founder (Unrestricted)");
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [proposalLead, setProposalLead] = useState<CRMLead | null>(null);

  // Load from localStorage safely on mount with real-time multi-tab sync
  useEffect(() => {
    setMounted(true);
    const stored = getStoredLeads();
    setLeads(stored);

    const handleSync = () => {
      const refreshed = getStoredLeads();
      setLeads([...refreshed]);
    };

    window.addEventListener("storage", handleSync);
    const interval = setInterval(handleSync, 2500);

    return () => {
      window.removeEventListener("storage", handleSync);
      clearInterval(interval);
    };
  }, []);

  const refreshLeads = () => {
    const stored = getStoredLeads();
    setLeads([...stored]);
    if (selectedLead) {
      const refreshedSelected = stored.find((l) => l.id === selectedLead.id) || null;
      setSelectedLead(refreshedSelected);
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
        />

        {/* Tab Content Display */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#111111]">
          <div className="max-w-7xl mx-auto space-y-6">
            {currentTab === "crm" && (
              <AdminCRMTable
                leads={filteredLeads}
                onOpenDossier={(lead) => setSelectedLead(lead)}
                onUpdateStatus={handleUpdateStatus}
                onAddManualLead={handleAddManualLead}
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
              />
            )}
          </div>
        </main>
      </div>

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
