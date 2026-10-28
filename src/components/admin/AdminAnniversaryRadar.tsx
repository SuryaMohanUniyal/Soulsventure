"use client";

import React, { useState } from "react";
import {
  LifeEventAlert,
  INITIAL_LIFE_EVENTS,
} from "@/lib/crmStore";
import {
  Calendar,
  Sparkles,
  Gift,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Heart,
  Send,
  Plus,
  Compass,
  FileText,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function AdminAnniversaryRadar() {
  const [events, setEvents] = useState<LifeEventAlert[]>(INITIAL_LIFE_EVENTS);
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<LifeEventAlert | null>(null);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  const filteredEvents = events.filter((e) => {
    if (filterType === "all") return true;
    if (filterType === "urgent") return e.daysRemaining <= 20;
    return e.eventType === filterType;
  });

  const handleUpdateStatus = (id: string, newStatus: LifeEventAlert["status"]) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    setSuccessToast(`Milestone updated: Marked as '${newStatus}'`);
    setShowPitchModal(false);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleSendWhatsAppPitch = (event: LifeEventAlert) => {
    const cleanPhone = event.phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Dear ${event.clientName},\n\n` +
      `Warmest personal greetings from Suraj Uniyal & Harsh Sood at SoulsVenture Concierge.\n\n` +
      `Our calendar reminded us that your *${event.eventType}* is approaching on *${new Date(event.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}*.\n\n` +
      `To celebrate this special milestone, we would be delighted to orchestrate a private, secluded celebration for you—such as a candlelit royal palace buyout in ${event.suggestedDestination}.\n\n` +
      `We have reserved a confidential idea outline for your review whenever you wish.\n\n` +
      `With warm regards,\nSuraj Uniyal & Harsh Sood\nFounders, SoulsVenture Private Office\nDirect: +91 8126357353`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Sparkles className="w-3 h-3" />
              Automated High-Touch Intelligence
            </span>
            <span className="text-xs text-[#888888] font-mono">
              30-Day Predictive Touchpoint Engine
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            VIP Client Life-Event & Anniversary Radar
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Proactively curate anniversary getaways, milestone birthdays, and bespoke gift hampers before clients even begin planning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#C5A059] hover:bg-[#b08e48] text-black text-xs font-serif font-medium tracking-wider uppercase rounded-lg transition-colors shadow-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            + Record Life Event
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Upcoming Milestones (60 Days)
          </p>
          <div className="text-3xl font-serif text-[#FDFBF7] mt-1.5 font-medium">
            {events.length} Active
          </div>
          <p className="text-[11px] text-[#C5A059] mt-1">
            100% past VIP repeat potential
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Urgent Attention (&lt;20 Days)
          </p>
          <div className="text-3xl font-serif text-amber-400 mt-1.5 font-medium">
            {events.filter((e) => e.daysRemaining <= 20).length} Clients
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Gift dispatch & phone touchpoint due
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Gift Hampers Dispatched
          </p>
          <div className="text-3xl font-serif text-emerald-400 mt-1.5 font-medium">
            {events.filter((e) => e.status === "Gift Dispatched" || e.status === "Completed").length}
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Silver attar & Kashmiri saffron
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Target Retargeting Yield
          </p>
          <div className="text-3xl font-serif text-[#C5A059] mt-1.5 font-medium">
            ₹1.85 Cr
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Est. private celebratory buyouts
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#181818] p-3 rounded-xl border border-[#262626]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-colors ${
              filterType === "all"
                ? "bg-[#C5A059] text-black font-medium"
                : "text-[#888888] hover:text-[#FDFBF7] bg-[#111111]"
            }`}
          >
            All Milestones ({events.length})
          </button>
          <button
            onClick={() => setFilterType("urgent")}
            className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-colors ${
              filterType === "urgent"
                ? "bg-amber-400 text-black font-medium"
                : "text-[#888888] hover:text-[#FDFBF7] bg-[#111111]"
            }`}
          >
            Priority (&lt;20 Days)
          </button>
          <button
            onClick={() => setFilterType("Wedding Anniversary")}
            className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-colors ${
              filterType === "Wedding Anniversary"
                ? "bg-[#C5A059] text-black font-medium"
                : "text-[#888888] hover:text-[#FDFBF7] bg-[#111111]"
            }`}
          >
            Wedding Anniversaries
          </button>
          <button
            onClick={() => setFilterType("50th Milestone Birthday")}
            className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-colors ${
              filterType === "50th Milestone Birthday"
                ? "bg-[#C5A059] text-black font-medium"
                : "text-[#888888] hover:text-[#FDFBF7] bg-[#111111]"
            }`}
          >
            Milestone Birthdays
          </button>
        </div>

        <span className="text-xs text-[#888888] font-mono">
          Radar Active • Next scan in 12h
        </span>
      </div>

      {/* Radar Cards Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-[#181818] border border-[#262626] rounded-xl text-[#71717A] text-xs space-y-2">
            <Heart className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
            <p className="font-serif text-sm text-[#FDFBF7]">No Upcoming Client Milestones Recorded</p>
            <p className="text-[#71717A] max-w-md mx-auto">
              Track wedding anniversaries, milestone birthdays, and private estate anniversaries to deploy luxury gifts and anticipatory re-booking proposals.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => {
          const isUrgent = event.daysRemaining <= 20;

          return (
            <div
              key={event.id}
              className={`bg-[#181818] border rounded-xl p-5 space-y-4 relative transition-all group hover:border-[#C5A059]/50 ${
                isUrgent ? "border-amber-500/40" : "border-[#2A2A2A]"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        isUrgent
                          ? "bg-amber-950/80 text-amber-300 border border-amber-500/40 animate-pulse"
                          : "bg-[#222222] text-[#C5A059] border border-[#333333]"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {event.daysRemaining} Days Away ({event.eventDate})
                    </span>

                    <span className="text-[11px] text-[#777777] font-mono">
                      Ref: {event.leadReference}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif text-[#FDFBF7] mt-1.5 font-medium group-hover:text-[#C5A059] transition-colors">
                    {event.clientName}
                  </h3>
                  <div className="text-xs text-[#A0A0A0] flex items-center gap-1.5 mt-0.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>{event.eventType}</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                    event.status === "Gift Dispatched"
                      ? "bg-emerald-950/70 text-emerald-300 border border-emerald-700/50"
                      : event.status === "Proposal Underway"
                      ? "bg-purple-950/70 text-purple-300 border border-purple-700/50"
                      : "bg-amber-950/70 text-amber-300 border border-amber-700/50"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              {/* Recommended Action Box */}
              <div className="p-3.5 bg-[#121212] rounded-lg border border-[#262626] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#888888]">
                  <span className="flex items-center gap-1 text-[#C5A059]">
                    <Sparkles className="w-3 h-3" /> Concierge Action Protocol:
                  </span>
                  <span>Lead: {event.assignedCurator}</span>
                </div>
                <p className="text-xs text-[#D8D8D8] font-sans leading-relaxed">
                  {event.recommendedAction}
                </p>
                <div className="text-[11px] text-[#888888] pt-1 border-t border-[#1F1F1F] flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#C5A059]" />
                  <span>Target Destination: <strong className="text-[#FDFBF7]">{event.suggestedDestination}</strong></span>
                </div>
              </div>

              {/* Private Notes */}
              <p className="text-[11px] text-[#777777] italic font-serif">
                “{event.notes}”
              </p>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#222222] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleSendWhatsAppPitch(event)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 rounded-lg text-xs font-serif border border-emerald-600/40 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  WhatsApp Founder Pitch
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowPitchModal(true);
                    }}
                    className="px-3 py-1.5 bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] rounded-lg text-xs font-serif border border-[#333333] transition-colors"
                  >
                    Manage Touchpoint
                  </button>
                </div>
              </div>
            </div>
          );
        }))}
      </div>

      {/* Touchpoint Management Modal */}
      {showPitchModal && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Milestone Protocol
                </span>
                <h3 className="text-lg font-serif text-[#FDFBF7] mt-0.5">
                  {selectedEvent.clientName}
                </h3>
                <p className="text-xs text-[#888888]">{selectedEvent.eventType} • {selectedEvent.eventDate}</p>
              </div>
              <button
                onClick={() => setShowPitchModal(false)}
                className="text-[#888888] hover:text-[#FDFBF7] p-1 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-[#888888] block">Update Milestone Workflow Status:</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Pending Pitch", "Gift Dispatched", "Proposal Underway", "Completed"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedEvent.id, st)}
                    className={`px-3 py-2 rounded-lg text-xs font-serif transition-colors text-left border ${
                      selectedEvent.status === st
                        ? "bg-[#C5A059] text-black font-medium border-[#C5A059]"
                        : "bg-[#141414] text-[#A0A0A0] hover:text-white border-[#2A2A2A]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#262626] flex justify-end">
              <button
                onClick={() => setShowPitchModal(false)}
                className="px-4 py-1.5 bg-[#222222] text-[#888] hover:text-white rounded-lg text-xs font-serif"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Client Vault Enrichment
                </span>
                <h3 className="text-lg font-serif text-[#FDFBF7] mt-0.5">
                  Record New Client Life Event
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#888888] hover:text-[#FDFBF7] p-1 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const clientName = (form.elements.namedItem("clientName") as HTMLInputElement).value;
                const eventType = (form.elements.namedItem("eventType") as HTMLSelectElement).value as LifeEventAlert["eventType"];
                const eventDate = (form.elements.namedItem("eventDate") as HTMLInputElement).value;
                const destination = (form.elements.namedItem("destination") as HTMLInputElement).value;
                const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

                const newAlert: LifeEventAlert = {
                  id: `radar-${Date.now()}`,
                  clientName,
                  leadReference: `SV-${Math.floor(1000 + Math.random() * 9000)}-IND`,
                  phone: phone || "+91 98200 00000",
                  eventType,
                  eventDate,
                  daysRemaining: Math.max(1, Math.ceil((new Date(eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
                  recommendedAction: `Send bespoke hand-crafted luxury gift hamper and pitch exclusive celebratory stay in ${destination}.`,
                  suggestedDestination: destination,
                  assignedCurator: "Suraj Uniyal",
                  status: "Pending Pitch",
                  notes: "Captured directly by concierge team.",
                };

                setEvents([newAlert, ...events]);
                setShowAddModal(false);
                setSuccessToast("New client milestone successfully pinned to radar!");
                setTimeout(() => setSuccessToast(""), 4000);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-[#888888] block mb-1">VIP Client / Couple Name *</label>
                <input
                  name="clientName"
                  required
                  placeholder="e.g., Mr. & Mrs. Aditya Godrej"
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#888888] block mb-1">Event Type *</label>
                  <select
                    name="eventType"
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Wedding Anniversary">Wedding Anniversary</option>
                    <option value="50th Milestone Birthday">50th Milestone Birthday</option>
                    <option value="Honeymoon Return">Honeymoon Return</option>
                    <option value="Private Estate Anniversary">Private Estate Anniversary</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#888888] block mb-1">Target Milestone Date *</label>
                  <input
                    name="eventDate"
                    type="date"
                    required
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#888888] block mb-1">Target Luxury Destination</label>
                  <input
                    name="destination"
                    defaultValue="Udaipur & Lake Pichola"
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-[#888888] block mb-1">WhatsApp / Phone</label>
                  <input
                    name="phone"
                    placeholder="+91 98201 12345"
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-transparent text-[#888] hover:text-white rounded-lg text-xs font-serif"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C5A059] text-black font-serif font-medium rounded-lg text-xs uppercase tracking-wider"
                >
                  Pin to Radar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
