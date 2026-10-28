"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileText,
  UserCheck,
  Save,
  Clock,
  Send,
  Printer,
  ChevronDown,
} from "lucide-react";
import { CRMLead, LeadStatus } from "@/lib/crmStore";

interface AdminClientDossierDrawerProps {
  lead: CRMLead | null;
  onClose: () => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onUpdateNotes: (leadId: string, notes: string) => void;
  onUpdateCurator: (leadId: string, curator: "Suraj Uniyal" | "Harsh Sood" | "Kabir Malhotra") => void;
  onGenerateProposal: (lead: CRMLead) => void;
}

export default function AdminClientDossierDrawer({
  lead,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onUpdateCurator,
  onGenerateProposal,
}: AdminClientDossierDrawerProps) {
  if (!lead) return null;

  const [notes, setNotes] = useState(lead.internalNotes || "");
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const handleSaveNotes = () => {
    onUpdateNotes(lead.id, notes);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2000);
  };

  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const whatsappGreeting = `Greetings ${lead.firstName},

This is ${lead.assignedCurator} from Soulsventure Bespoke Journeys (Dehradun). 

Regarding your confidential inquiry (${lead.referenceCode}) for ${lead.destinationSummary}: we have choreographed a tailored route outline with private aviation and verified palace/camp allocations matching your ${lead.budgetTier} tier.

Would you be available for a brief 15-minute discovery consultation at your preferred time (${lead.preferredTimeOfDay})?

Warm regards,
${lead.assignedCurator}
Founder | Soulsventure Bespoke Journeys
+91 8126357353 / +91 9319843524
Dehradun, Uttarakhand`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappGreeting)}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#141414] border-l border-[#2B2B2B] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#242424] bg-[#191919] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                Client Dossier & Itinerary Brief
              </span>
              <span className="font-mono text-xs text-[#71717A]">• {lead.referenceCode}</span>
              {lead.isVIP && (
                <span className="px-2 py-0.5 rounded text-[8px] bg-[#C5A059] text-[#111111] font-bold uppercase tracking-wider">
                  VVIP Account
                </span>
              )}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#FDFBF7]">
              {lead.clientName}
            </h2>
            <p className="text-xs text-[#A1A1AA] font-light">
              Registered on {new Date(lead.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#A1A1AA] hover:text-[#FDFBF7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Quick Action Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 font-semibold transition-colors cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send WhatsApp Brief</span>
            </a>

            <button
              onClick={() => onGenerateProposal(lead)}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] text-[#FDFBF7] font-semibold transition-colors cursor-pointer text-center"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" />
              <span>Generate PDF Proposal</span>
            </button>

            <a
              href={`tel:${lead.phone}`}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] text-[#FDFBF7] font-semibold transition-colors cursor-pointer text-center"
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>Direct Call</span>
            </a>
          </div>

          {/* Status & Curator Controls */}
          <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
                Trip Pipeline Stage
              </label>
              <div className="relative">
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                  className="w-full bg-[#242424] text-[#FDFBF7] px-3 py-2 rounded-md border border-[#333333] text-xs font-medium focus:outline-none focus:border-[#C5A059] appearance-none pr-8 cursor-pointer"
                >
                  <option value="New Lead">New Lead</option>
                  <option value="Discovery Call">Discovery Call</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Deposit Confirmed">Deposit Confirmed</option>
                  <option value="On-Ground Active">On-Ground Active</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
                Lead Concierge Director
              </label>
              <div className="relative">
                <select
                  value={lead.assignedCurator}
                  onChange={(e) =>
                    onUpdateCurator(lead.id, e.target.value as "Suraj Uniyal" | "Harsh Sood")
                  }
                  className="w-full bg-[#242424] text-[#C5A059] px-3 py-2 rounded-md border border-[#333333] text-xs font-medium focus:outline-none focus:border-[#C5A059] appearance-none pr-8 cursor-pointer"
                >
                  <option value="Suraj Uniyal">Suraj Uniyal (Founder & Dir. of Operations)</option>
                  <option value="Harsh Sood">Harsh Sood (Founder & Dir. of Curation)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Contact & Traveler Information */}
          <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-3">
            <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Direct Contact Channels
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Phone className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Telephone</span>
                  <a href={`tel:${lead.phone}`} className="hover:text-[#C5A059]">
                    {lead.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Mail className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Email Address</span>
                  <a href={`mailto:${lead.email}`} className="hover:text-[#C5A059]">
                    {lead.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Clock className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Preferred Consultation</span>
                  <span>{lead.preferredTimeOfDay} ({lead.consultationMethod.toUpperCase()})</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[#FDFBF7]">
                <Users className="w-4 h-4 text-[#71717A]" />
                <div>
                  <span className="text-[#71717A] text-[10px] block">Party Structure</span>
                  <span>{lead.companions} {lead.familyAges ? `(${lead.familyAges})` : ""}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Specifications */}
          <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-3">
            <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Handcrafted Journey Parameters
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <span className="text-[10px] text-[#71717A] block">Destination</span>
                <span className="font-serif text-sm font-medium text-[#FDFBF7]">
                  {lead.destinationSummary}
                </span>
              </div>
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <span className="text-[10px] text-[#71717A] block">Duration</span>
                <span className="font-serif text-sm font-medium text-[#FDFBF7]">{lead.duration}</span>
              </div>
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <span className="text-[10px] text-[#71717A] block">Budget Tier</span>
                <span className="font-serif text-sm font-medium text-[#C5A059]">
                  {lead.budgetTier}
                </span>
              </div>
            </div>

            {/* Special Interests */}
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-wider block mb-1.5">
                Special Interests & Curation Focus:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {lead.specialInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] bg-[#222222] text-[#FDFBF7] border border-[#333333]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            {lead.specialRequests && (
              <div className="pt-2 border-t border-[#262626]">
                <span className="text-[10px] text-[#71717A] uppercase tracking-wider block mb-1">
                  Traveler Special Requests / Notes:
                </span>
                <p className="text-xs text-[#FDFBF7] font-light italic bg-[#171717] p-3 rounded-lg border border-[#262626]">
                  "{lead.specialRequests}"
                </p>
              </div>
            )}
          </div>

          {/* 5-Step Luxury Milestones Progress */}
          <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-3">
            <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold">
              Bespoke Touchpoint Milestones
            </h4>
            <div className="space-y-2">
              {[
                { label: "Step 1: Initial Inquiry Logged & Registered", done: lead.milestones.inquiryLogged },
                { label: "Step 2: 1-on-1 Discovery Call Completed", done: lead.milestones.discoveryCallCompleted },
                { label: "Step 3: Bespoke Moodboard & Itinerary Delivered", done: lead.milestones.proposalSent },
                { label: "Step 4: Luxury Advance Deposit Secured (RTGS)", done: lead.milestones.depositReceived },
                { label: "Step 5: On-Ground 24/7 Concierge Tracking Active", done: lead.milestones.conciergeActive },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-[#FDFBF7]"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      m.done
                        ? "bg-emerald-500 text-black font-bold"
                        : "bg-[#2A2A2A] text-[#71717A]"
                    }`}
                  >
                    {m.done ? "✓" : idx + 1}
                  </div>
                  <span className={m.done ? "text-[#FDFBF7] font-medium" : "text-[#71717A]"}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Confidential Notes */}
          <div className="p-4 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold">
                Internal Confidential Notes (Private to Founders)
              </h4>
              {isSavedAlert && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add confidential notes on dietary nuances, palace GM instructions, or flight charter details..."
              className="w-full bg-[#171717] text-xs text-[#FDFBF7] p-3 rounded-lg border border-[#2A2A2A] focus:outline-none focus:border-[#C5A059] leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-[#111111] font-semibold text-xs cursor-pointer shadow-md transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Private Note</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#242424] bg-[#191919] flex justify-between items-center text-xs">
          <span className="text-[#71717A]">
            Lead ID: <strong className="font-mono text-[#FDFBF7]">{lead.referenceCode}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#2C2C2C] text-[#FDFBF7] cursor-pointer transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
