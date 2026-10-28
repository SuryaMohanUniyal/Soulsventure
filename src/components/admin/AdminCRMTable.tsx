"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  MessageCircle,
  Eye,
  Sparkles,
  User,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronDown,
  X,
  Trash2,
} from "lucide-react";
import { CRMLead, LeadStatus, TeamRole, ROLE_PERMISSIONS } from "@/lib/crmStore";
import { Lock as LockIcon } from "lucide-react";

interface AdminCRMTableProps {
  leads: CRMLead[];
  onOpenDossier: (lead: CRMLead) => void;
  onUpdateStatus: (leadId: string, newStatus: LeadStatus) => void;
  onAddManualLead: (newLead: Partial<CRMLead>) => void;
  onDeleteLead?: (leadId: string) => void;
  onClearAllLeads?: () => void;
  activeRole?: TeamRole;
}

export default function AdminCRMTable({
  leads,
  onOpenDossier,
  onUpdateStatus,
  onAddManualLead,
  onDeleteLead,
  onClearAllLeads,
  activeRole = "Founder (Unrestricted)",
}: AdminCRMTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [destinationFilter, setDestinationFilter] = useState<string>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.destinationSummary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesDestination =
      destinationFilter === "All" ||
      lead.destinations.some((d) => d.toLowerCase().includes(destinationFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesDestination;
  });

  // Export CSV handler
  const exportToCSV = () => {
    if (!ROLE_PERMISSIONS[activeRole].canExportData) {
      alert(`Exporting master client data is restricted for '${activeRole}' credentials to prevent data leaks.`);
      return;
    }

    const headers = ["Reference", "Client Name", "Phone", "Email", "Destination", "Budget Tier", "Status", "Curator"];
    const rows = filteredLeads.map((l) => [
      l.referenceCode,
      `"${l.clientName}"`,
      `"${l.phone}"`,
      l.email,
      `"${l.destinationSummary}"`,
      `"${l.budgetTier}"`,
      l.status,
      l.assignedCurator,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Soulsventure_CRM_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Form state for manual lead addition
  const [newGuestName, setNewGuestName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDestination, setNewDestination] = useState("Rajasthan");
  const [newBudget, setNewBudget] = useState("₹6,00,000 - ₹12,00,000 pp");
  const [newCompanions, setNewCompanions] = useState("Couple");
  const [newCurator, setNewCurator] = useState<"Suraj Uniyal" | "Harsh Sood">("Suraj Uniyal");
  const [newNotes, setNewNotes] = useState("");

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName || !newPhone) return;

    onAddManualLead({
      clientName: newGuestName,
      firstName: newGuestName.split(" ")[0],
      lastName: newGuestName.split(" ").slice(1).join(" ") || "Guest",
      phone: newPhone,
      email: newEmail || "client.confidential@soulsventure.com",
      destinations: [newDestination],
      destinationSummary: newDestination,
      budgetTier: newBudget,
      companions: newCompanions,
      assignedCurator: newCurator,
      internalNotes: newNotes || "Direct telephone/referral inquiry recorded at Dehradun HQ.",
      travelWindow: "Within the next 3 months",
      duration: "7 to 10 Days",
      specialInterests: ["Bespoke Concierge"],
      specialRequests: "Recorded via offline concierge intake.",
      consultationMethod: "phone",
      preferredTimeOfDay: "Flexible",
    });

    setIsAddModalOpen(false);
    setNewGuestName("");
    setNewPhone("");
    setNewEmail("");
    setNewNotes("");
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden animate-in fade-in duration-300">
      {/* Top Controls & Filter Bar */}
      <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 sm:p-5 space-y-4 shadow-lg w-full max-w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-light text-[#FDFBF7]">
              Master Enquiry & Booking CRM
            </h2>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#A1A1AA]">
              {filteredLeads.length} of {leads.length} Bespoke Inquiries Shown
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-[#111111] text-xs font-semibold shadow-md transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Record Offline Lead</span>
            </button>

            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] text-xs font-medium border border-[#333333] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A1A1AA]" />
              <span>Export CSV</span>
            </button>

            {leads.length > 0 && onClearAllLeads && (
              <button
                onClick={onClearAllLeads}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium border border-red-800/40 transition-colors cursor-pointer"
                title="Clear all enquiries from CRM & Cloud"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-[#262626]">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guest, ref, phone..."
              className="w-full bg-[#1F1F1F] text-xs text-[#FDFBF7] placeholder-[#71717A] rounded-md pl-9 pr-3 py-2 border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-[#1F1F1F] px-3 py-1.5 rounded-md border border-[#2E2E2E]">
            <Filter className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-transparent text-xs text-[#FDFBF7] focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#1A1A1A]">All Statuses</option>
              <option value="New Lead" className="bg-[#1A1A1A]">New Lead</option>
              <option value="Discovery Call" className="bg-[#1A1A1A]">Discovery Call</option>
              <option value="Proposal Sent" className="bg-[#1A1A1A]">Proposal Sent</option>
              <option value="Deposit Confirmed" className="bg-[#1A1A1A]">Deposit Confirmed</option>
              <option value="On-Ground Active" className="bg-[#1A1A1A]">On-Ground Active</option>
              <option value="Completed" className="bg-[#1A1A1A]">Completed</option>
            </select>
          </div>

          {/* Destination Filter */}
          <div className="flex items-center gap-2 bg-[#1F1F1F] px-3 py-1.5 rounded-md border border-[#2E2E2E]">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="w-full bg-transparent text-xs text-[#FDFBF7] focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#1A1A1A]">All Destinations</option>
              <option value="Rajasthan" className="bg-[#1A1A1A]">Rajasthan</option>
              <option value="Ladakh" className="bg-[#1A1A1A]">Ladakh</option>
              <option value="Central India" className="bg-[#1A1A1A]">Central India (Tiger)</option>
              <option value="Kerala" className="bg-[#1A1A1A]">Kerala Backwaters</option>
              <option value="Kashmir" className="bg-[#1A1A1A]">Kashmir & Gulmarg</option>
              <option value="Andaman" className="bg-[#1A1A1A]">Andaman Islands</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center">
            {(searchTerm || statusFilter !== "All" || destinationFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setDestinationFilter("All");
                }}
                className="text-xs text-[#C5A059] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 1. MOBILE RESPONSIVE CARDS (block md:hidden) */}
      <div className="block md:hidden space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-8 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
            <p className="font-serif text-base text-[#FDFBF7]">No Inquiries Found</p>
            <p className="text-xs text-[#71717A]">
              Inquiries submitted via the website or direct phone will appear here in real-time.
            </p>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] text-black text-xs font-serif font-medium rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              Record Lead
            </button>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 space-y-3 shadow-lg"
            >
              {/* Header: Avatar, Name, Reference, Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] font-serif flex items-center justify-center font-medium text-xs flex-shrink-0">
                    {lead.firstName?.[0] || "G"}
                    {lead.lastName?.[0] || "C"}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif text-sm font-medium text-[#FDFBF7]">
                        {lead.clientName}
                      </span>
                      {lead.isVIP && (
                        <span className="px-1.5 py-0.2 rounded text-[8px] bg-[#C5A059] text-[#111111] font-bold uppercase tracking-wider">
                          VIP
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-[#71717A] block">
                      {lead.referenceCode} • {lead.assignedCurator}
                    </span>
                  </div>
                </div>

                {/* Status Dropdown */}
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                  className={`text-[10px] font-semibold uppercase tracking-wider rounded-md px-2 py-1 border appearance-none cursor-pointer focus:outline-none transition-colors ${
                    lead.status === "Deposit Confirmed"
                      ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/50"
                      : lead.status === "Proposal Sent"
                      ? "bg-amber-950/80 text-amber-400 border-amber-800/50"
                      : lead.status === "On-Ground Active"
                      ? "bg-purple-950/80 text-purple-300 border-purple-800/50"
                      : lead.status === "Discovery Call"
                      ? "bg-sky-950/80 text-sky-400 border-sky-800/50"
                      : "bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30"
                  }`}
                >
                  <option value="New Lead" className="bg-[#1A1A1A] text-[#FDFBF7]">New Lead</option>
                  <option value="Discovery Call" className="bg-[#1A1A1A] text-[#FDFBF7]">Discovery Call</option>
                  <option value="Proposal Sent" className="bg-[#1A1A1A] text-[#FDFBF7]">Proposal Sent</option>
                  <option value="Deposit Confirmed" className="bg-[#1A1A1A] text-[#FDFBF7]">Deposit Confirmed</option>
                  <option value="On-Ground Active" className="bg-[#1A1A1A] text-[#FDFBF7]">On-Ground Active</option>
                  <option value="Completed" className="bg-[#1A1A1A] text-[#FDFBF7]">Completed</option>
                </select>
              </div>

              {/* Destination, Duration & Budget Details */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2.5 px-3 bg-[#141414] rounded-lg border border-[#242424]">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#71717A] block font-medium">
                    Destination & Route
                  </span>
                  <span className="text-[#FDFBF7] font-medium block truncate">
                    {lead.destinationSummary}
                  </span>
                  <span className="text-[10px] text-[#A1A1AA]">
                    {lead.duration} • {lead.companions}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#71717A] block font-medium">
                    Budget & Window
                  </span>
                  {ROLE_PERMISSIONS[activeRole].canViewFinancialMargins ? (
                    <span className="text-[#C5A059] font-serif font-medium block truncate">
                      {lead.budgetTier}
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] text-amber-400/80 flex items-center gap-1">
                      <LockIcon className="w-2.5 h-2.5" />
                      ₹*** (Masked)
                    </span>
                  )}
                  <span className="text-[10px] text-[#A1A1AA] block truncate">
                    {lead.travelWindow}
                  </span>
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Greetings ${lead.firstName}, this is ${lead.assignedCurator} from Soulsventure Bespoke Journeys (Dehradun). Following your inquiry for ${lead.destinationSummary}, we have prepared a tailored concept for your review.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/50 text-[11px] font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Phone Call */}
                  <a
                    href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#333333] text-[11px] font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Open Dossier */}
                  <button
                    type="button"
                    onClick={() => onOpenDossier(lead)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-serif font-medium shadow-sm transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Dossier</span>
                  </button>

                  {/* Delete */}
                  {onDeleteLead && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove enquiry ${lead.referenceCode} for ${lead.clientName}?`)) {
                          onDeleteLead(lead.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-[#222222] text-[#71717A] hover:text-red-400 border border-[#333333] transition-colors cursor-pointer"
                      title="Delete Enquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2. DESKTOP CRM MASTER TABLE (hidden md:block) */}
      <div className="hidden md:block bg-[#181818] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-2xl w-full max-w-full">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#141414] border-b border-[#2A2A2A] text-[10px] uppercase tracking-wider text-[#71717A] font-medium">
                <th className="py-3.5 px-4">Client & Ref</th>
                <th className="py-3.5 px-4">Destination & Route</th>
                <th className="py-3.5 px-4">Travel Window</th>
                <th className="py-3.5 px-4">Budget Tier (₹)</th>
                <th className="py-3.5 px-4">Curator</th>
                <th className="py-3.5 px-4">Status & Stage</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#71717A]">
                    <div className="max-w-md mx-auto space-y-3">
                      <Sparkles className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
                      <p className="font-serif text-base text-[#FDFBF7]">No Client Inquiries Received Yet</p>
                      <p className="text-xs text-[#71717A]">
                        Inquiries submitted via the website (/enquire) or direct phone concierge will automatically appear here in real-time.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#b08e48] text-black text-xs font-serif font-medium rounded-lg transition-colors shadow-md cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Record Direct Lead
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#1E1E1E] transition-colors group"
                    >
                      {/* Client Name & Reference */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] font-serif flex items-center justify-center font-medium text-sm flex-shrink-0">
                            {lead.firstName?.[0] || "G"}
                            {lead.lastName?.[0] || "C"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-sm font-medium text-[#FDFBF7] group-hover:text-[#C5A059] transition-colors">
                                {lead.clientName}
                              </span>
                              {lead.isVIP && (
                                <span className="px-1.5 py-0.2 rounded text-[8px] bg-[#C5A059] text-[#111111] font-bold uppercase tracking-wider">
                                  VIP
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-mono text-[#71717A] block">
                              {lead.referenceCode} • {lead.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Destination & Route */}
                      <td className="py-4 px-4">
                        <span className="font-medium text-[#FDFBF7] block">
                          {lead.destinationSummary}
                        </span>
                        <span className="text-[11px] text-[#A1A1AA] font-light">
                          {lead.duration} • {lead.companions}
                        </span>
                      </td>

                      {/* Travel Window */}
                      <td className="py-4 px-4 text-[#A1A1AA] font-light">
                        <span>{lead.travelWindow}</span>
                      </td>

                      {/* Budget Tier */}
                      <td className="py-4 px-4">
                        {ROLE_PERMISSIONS[activeRole].canViewFinancialMargins ? (
                          <span className="font-serif text-xs font-medium text-[#C5A059]">
                            {lead.budgetTier}
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-amber-400/80 flex items-center gap-1">
                            <LockIcon className="w-3 h-3 text-amber-400" />
                            ₹*** (Masked)
                          </span>
                        )}
                      </td>

                      {/* Assigned Curator */}
                      <td className="py-4 px-4">
                        <span className="text-xs text-[#FDFBF7] font-medium block">
                          {lead.assignedCurator}
                        </span>
                        <span className="text-[10px] text-[#71717A]">Founders Desk</span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4">
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                            className={`text-[11px] font-semibold uppercase tracking-wider rounded-md px-2.5 py-1.5 border appearance-none pr-7 cursor-pointer focus:outline-none transition-colors ${
                              lead.status === "Deposit Confirmed"
                                ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/50"
                                : lead.status === "Proposal Sent"
                                ? "bg-amber-950/80 text-amber-400 border-amber-800/50"
                                : lead.status === "On-Ground Active"
                                ? "bg-purple-950/80 text-purple-300 border-purple-800/50"
                                : lead.status === "Discovery Call"
                                ? "bg-sky-950/80 text-sky-400 border-sky-800/50"
                                : "bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30"
                            }`}
                          >
                            <option value="New Lead" className="bg-[#1A1A1A] text-[#FDFBF7]">New Lead</option>
                            <option value="Discovery Call" className="bg-[#1A1A1A] text-[#FDFBF7]">Discovery Call</option>
                            <option value="Proposal Sent" className="bg-[#1A1A1A] text-[#FDFBF7]">Proposal Sent</option>
                            <option value="Deposit Confirmed" className="bg-[#1A1A1A] text-[#FDFBF7]">Deposit Confirmed</option>
                            <option value="On-Ground Active" className="bg-[#1A1A1A] text-[#FDFBF7]">On-Ground Active</option>
                            <option value="Completed" className="bg-[#1A1A1A] text-[#FDFBF7]">Completed</option>
                          </select>
                          <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-70" />
                        </div>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Dossier Button */}
                          <button
                            onClick={() => onOpenDossier(lead)}
                            className="p-1.5 rounded bg-[#242424] hover:bg-[#C5A059] text-[#A1A1AA] hover:text-[#111111] transition-colors cursor-pointer"
                            title="Open Full Client Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* WhatsApp One-Tap */}
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Greetings ${lead.firstName}, this is ${lead.assignedCurator} from Soulsventure Bespoke Journeys (Dehradun). Following your inquiry for ${lead.destinationSummary}, we have prepared a tailored concept for your review.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-[#242424] hover:bg-emerald-600 text-[#A1A1AA] hover:text-white transition-colors"
                            title="Chat via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Phone Direct */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded bg-[#242424] hover:bg-[#333333] text-[#A1A1AA] hover:text-[#FDFBF7] transition-colors"
                            title="Call Guest Directly"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Delete Lead Button */}
                          {onDeleteLead && (
                            <button
                              onClick={() => {
                                if (confirm(`Remove enquiry ${lead.referenceCode} for ${lead.clientName}?`)) {
                                  onDeleteLead(lead.id);
                                }
                              }}
                              className="p-1.5 rounded bg-[#242424] hover:bg-red-900/70 text-[#71717A] hover:text-red-300 transition-colors cursor-pointer"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Offline / Phone Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-[#181818] border border-[#2E2E2E] rounded-2xl shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold">
                  Concierge Intake Desk
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#FDFBF7]">Record Direct / Offline Lead</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-[#A1A1AA] hover:text-[#FDFBF7] rounded-lg bg-[#222222] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-3 sm:space-y-4 text-xs">
              <div>
                <label className="block text-[#A1A1AA] mb-1 font-medium">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  placeholder="e.g. Yashvardhan Singhania"
                  className="w-full bg-[#202020] text-base sm:text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-medium">Telephone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full bg-[#202020] text-base sm:text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="guest@domain.com"
                    className="w-full bg-[#202020] text-base sm:text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-medium">Target Destination</label>
                  <select
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full bg-[#202020] text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Rajasthan">Rajasthan (Palaces & Jawai)</option>
                    <option value="Ladakh & The Himalayas">Ladakh & The Himalayas</option>
                    <option value="Central India & Ranthambore">Central India (Tiger Safari)</option>
                    <option value="Kerala Backwaters">Kerala Backwaters</option>
                    <option value="Kashmir & Gulmarg">Kashmir & Gulmarg</option>
                    <option value="Andaman Islands">Andaman Islands</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-medium">Budget Tier</label>
                  <select
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full bg-[#202020] text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="₹3,50,000 - ₹6,00,000 pp">₹3,50,000 - ₹6,00,000 pp</option>
                    <option value="₹6,00,000 - ₹12,00,000 pp">₹6,00,000 - ₹12,00,000 pp</option>
                    <option value="₹12,00,000 - ₹25,00,000 pp">₹12,00,000 - ₹25,00,000 pp</option>
                    <option value="₹25,00,000+ pp (Ultra-Luxe)">₹25,00,000+ pp (Ultra-Luxe)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-medium">Companions</label>
                  <input
                    type="text"
                    value={newCompanions}
                    onChange={(e) => setNewCompanions(e.target.value)}
                    placeholder="e.g. Couple / Family"
                    className="w-full bg-[#202020] text-base sm:text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-medium">Assign Curator</label>
                  <select
                    value={newCurator}
                    onChange={(e) => setNewCurator(e.target.value as "Suraj Uniyal" | "Harsh Sood")}
                    className="w-full bg-[#202020] text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Suraj Uniyal">Suraj Uniyal (Founder)</option>
                    <option value="Harsh Sood">Harsh Sood (Founder)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A1A1AA] mb-1 font-medium">Initial Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Inquired about private fort buyout for 20th anniversary..."
                  className="w-full bg-[#202020] text-base sm:text-xs text-[#FDFBF7] px-3 py-2 rounded border border-[#2E2E2E] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#262626]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-[#111111] font-semibold cursor-pointer shadow-md"
                >
                  Save Lead into CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
