"use client";

import React from "react";
import {
  Layers,
  ArrowRight,
  User,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { CRMLead, LeadStatus } from "@/lib/crmStore";

interface AdminPipelineKanbanProps {
  leads: CRMLead[];
  onOpenDossier: (lead: CRMLead) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
}

export default function AdminPipelineKanban({
  leads,
  onOpenDossier,
  onUpdateStatus,
}: AdminPipelineKanbanProps) {
  const stages: { status: LeadStatus; label: string; desc: string; accent: string }[] = [
    {
      status: "New Lead",
      label: "1. Inquiry Received",
      desc: "Fresh web inquiry / direct referral",
      accent: "border-[#C5A059] text-[#C5A059]",
    },
    {
      status: "Discovery Call",
      label: "2. Discovery Call",
      desc: "Aspirations & dates aligned",
      accent: "border-sky-500 text-sky-400",
    },
    {
      status: "Proposal Sent",
      label: "3. Proposal Sent",
      desc: "Custom moodboard & quote shared",
      accent: "border-amber-500 text-amber-400",
    },
    {
      status: "Deposit Confirmed",
      label: "4. Deposit Secured",
      desc: "Palace & flight charters locked",
      accent: "border-emerald-500 text-emerald-400",
    },
    {
      status: "On-Ground Active",
      label: "5. On-Ground Concierge",
      desc: "Currently traversing India",
      accent: "border-purple-500 text-purple-400",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-5 bg-[#181818] border border-[#2A2A2A] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div>
          <h2 className="font-serif text-2xl font-light text-[#FDFBF7]">
            Trip Stage Pipeline & Guest Lifecycle
          </h2>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#A1A1AA]">
            End-to-End High-Net-Worth Touchpoint Workflow
          </span>
        </div>
        <span className="text-xs text-[#C5A059] bg-[#222222] px-3 py-1.5 rounded-lg border border-[#333333] font-mono">
          Total Inquiries in Pipeline: {leads.length}
        </span>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage.status);
          const stageTotalINR = stageLeads.reduce((acc, l) => acc + (l.estimatedValueINR || 0), 0);

          return (
            <div
              key={stage.status}
              className="bg-[#161616] border border-[#262626] rounded-xl flex flex-col h-full min-w-[240px]"
            >
              {/* Column Header */}
              <div className={`p-3.5 border-b border-[#242424] border-t-2 ${stage.accent}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-medium text-[#FDFBF7]">
                    {stage.label}
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#202020] text-[#FDFBF7] font-semibold">
                    {stageLeads.length}
                  </span>
                </div>
                <p className="text-[10px] text-[#71717A] mt-0.5">{stage.desc}</p>
                <div className="text-[11px] font-mono text-[#C5A059] font-medium mt-1">
                  ₹{(stageTotalINR / 100000).toFixed(1)} Lakhs
                </div>
              </div>

              {/* Cards Body */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
                {stageLeads.length === 0 ? (
                  <div className="p-6 text-center text-[#52525B] text-xs italic border border-dashed border-[#262626] rounded-lg">
                    No inquiries at this stage
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 bg-[#1F1F1F] hover:bg-[#242424] border border-[#2E2E2E] hover:border-[#C5A059]/60 rounded-xl space-y-2.5 transition-all shadow-md group"
                    >
                      {/* Top Ref & VIP */}
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-[#71717A]">{lead.referenceCode}</span>
                        {lead.isVIP && (
                          <span className="px-1.5 py-0.2 rounded text-[8px] bg-[#C5A059] text-[#111111] font-bold">
                            VIP
                          </span>
                        )}
                      </div>

                      {/* Guest Name & Destination */}
                      <div>
                        <h4
                          onClick={() => onOpenDossier(lead)}
                          className="font-serif text-base font-medium text-[#FDFBF7] hover:text-[#C5A059] cursor-pointer transition-colors"
                        >
                          {lead.clientName}
                        </h4>
                        <span className="text-[11px] text-[#A1A1AA] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#C5A059] flex-shrink-0" />
                          <span className="truncate">{lead.destinationSummary}</span>
                        </span>
                      </div>

                      {/* Budget */}
                      <div className="text-xs font-serif text-[#C5A059] font-medium bg-[#171717] px-2 py-1 rounded border border-[#2A2A2A]">
                        {lead.budgetTier}
                      </div>

                      {/* Footer Info & Stage Advance */}
                      <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-[11px]">
                        <span className="text-[#71717A] text-[10px]">
                          {lead.assignedCurator.split(" ")[0]}
                        </span>

                        <button
                          onClick={() => onOpenDossier(lead)}
                          className="text-[#C5A059] hover:underline text-[11px] cursor-pointer"
                        >
                          Dossier →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
