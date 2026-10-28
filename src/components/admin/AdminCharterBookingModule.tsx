"use client";

import React, { useState } from "react";
import {
  Plane,
  Compass,
  Clock,
  ShieldCheck,
  Send,
  Plus,
  CheckCircle2,
  Users,
  Navigation,
  AlertTriangle,
  FileText,
  DollarSign,
  Mountain,
  Sparkles,
} from "lucide-react";
import {
  CharterEstimate,
  INITIAL_CHARTER_SECTORS,
  getStoredLeads,
  CRMLead,
} from "@/lib/crmStore";

export default function AdminCharterBookingModule() {
  const [sectors, setSectors] = useState<CharterEstimate[]>(INITIAL_CHARTER_SECTORS);
  const [selectedSector, setSelectedSector] = useState<CharterEstimate>(sectors[0]);
  const [leads, setLeads] = useState<CRMLead[]>(() => getStoredLeads());
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || "");
  const [customPax, setCustomPax] = useState<number>(sectors[0].paxCapacity);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  const currentLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  // WhatsApp Send Charter Quote
  const handleSendWhatsAppQuote = () => {
    if (!currentLead) return;
    const cleanPhone = currentLead.phone.replace(/[^0-9]/g, "");
    const msg = `*SOULSVENTURE PRIVATE AVIATION & HELI OPS*
_Confidential Aircraft Charter Quotation_

Dear *${currentLead.clientName}*,

As per your request for private air routing, here is your verified charter brief:

✈️ *Aircraft:* ${selectedSector.aircraftType}
📍 *Sector:* ${selectedSector.sector}
⏱️ *Flight Duration:* ${selectedSector.flightTimeMins} Minutes (Cruising: ${selectedSector.cruisingAltitudeFt.toLocaleString()} ft)
👥 *Passenger Allocation:* ${customPax} Guests
🛡️ *DGCA Clearance:* ${selectedSector.dgcaStatus}
🏔️ *Corridor Protocol:* ${selectedSector.mountainPassRisk}

💰 *Estimated Charter Investment:*
₹${selectedSector.totalEstimateINR.toLocaleString()} INR / $${selectedSector.rateUSD.toLocaleString()} USD
_(Includes direct tarmac car transfer, priority slot handling & all passenger taxes)_

✨ *Review Full Flight Brief & Passenger Manifest:*
https://soulsventure.com/client/trip/${currentLead.referenceCode.toLowerCase()}

Warm regards,
*Suraj Uniyal & Harsh Sood*
Private Aviation & VIP Operations Desk | SoulsVenture`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleAddCharterToLead = () => {
    setActionSuccessMsg(
      `Charter leg (${selectedSector.aircraftType} • ${selectedSector.sector}) successfully added to ${currentLead?.clientName}'s bespoke quote!`
    );
    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Plane className="w-3 h-3" />
              Private Aviation & Heli Routing Suite
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Turboprops • Twin-Engine Choppers • Super Midsize Jets
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Private Jet & Chopper Charter Booking
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Calculate instant flight times, cruising altitudes, DGCA landing permissions, and charter investment for remote alpine and palace sectors.
          </p>
        </div>

        {/* Global Action */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSendWhatsAppQuote}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold text-xs rounded-lg shadow cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send Charter Quote (WhatsApp)</span>
          </button>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Client Context Strip */}
      <div className="p-4 bg-[#181818] rounded-xl border border-[#282828] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1">
            Quote Prepared For VIP Client
          </label>
          <select
            value={currentLead?.id || ""}
            onChange={(e) => setSelectedLeadId(e.target.value)}
            className="bg-[#202020] text-[#FDFBF7] px-3 py-1.5 rounded-lg border border-[#333333] text-xs font-medium focus:outline-none focus:border-[#C5A059] cursor-pointer"
          >
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.clientName} ({l.referenceCode}) — {l.destinationSummary}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#888888]">Passenger Party Size:</span>
          <div className="flex items-center gap-2">
            {[2, 4, 6, 8].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCustomPax(num)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer border ${
                  customPax === num
                    ? "bg-[#C5A059] text-black font-bold border-[#C5A059]"
                    : "bg-[#202020] text-[#888888] border-[#333333] hover:text-[#FDFBF7]"
                }`}
              >
                {num} Pax
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sec) => {
          const isSelected = selectedSector.id === sec.id;
          return (
            <div
              key={sec.id}
              onClick={() => {
                setSelectedSector(sec);
                setCustomPax(sec.paxCapacity);
              }}
              className={`p-5 rounded-2xl border text-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? "bg-[#1E1E1E] border-[#C5A059] shadow-xl shadow-[#C5A059]/10"
                  : "bg-[#161616] border-[#262626] hover:bg-[#1A1A1A]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#242424] text-[#C5A059] border border-[#333333]">
                    <Plane className="w-3 h-3" />
                    {sec.aircraftType}
                  </span>
                  <span className="font-mono text-[11px] text-[#A1A1AA]">
                    {sec.flightTimeMins} Mins
                  </span>
                </div>

                <h3 className="font-serif text-base text-[#FDFBF7] font-medium leading-snug">
                  {sec.sector}
                </h3>

                <p className="text-[11px] text-[#71717A] mt-1 line-clamp-1">
                  {sec.fromCity} ➔ {sec.toCity}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#262626]">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#888888]">Cruising Altitude:</span>
                  <span className="font-mono text-[#FDFBF7]">
                    {sec.cruisingAltitudeFt.toLocaleString()} ft
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#888888]">Clearance Status:</span>
                  <span
                    className={`font-semibold ${
                      sec.dgcaStatus.includes("Pre-Approved")
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {sec.dgcaStatus}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-[#222222]">
                  <span className="text-xs text-[#71717A]">Estimated Investment:</span>
                  <div className="text-right">
                    <span className="font-serif text-base font-bold text-[#C5A059] block">
                      ₹{sec.totalEstimateINR.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#888888] font-mono">
                      ~${sec.rateUSD.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Sector Deep-Dive & Action Card */}
      {selectedSector && (
        <div className="p-6 bg-[#161616] rounded-2xl border border-[#2A2A2A] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                Verified Aviation Specs & Flight Envelope
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] mt-0.5">
                {selectedSector.aircraftType} • {selectedSector.sector}
              </h3>
            </div>

            <button
              onClick={handleAddCharterToLead}
              className="flex items-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#303030] text-[#FDFBF7] text-xs font-semibold rounded-lg border border-[#3A3A3A] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Attach Charter Leg to Itinerary</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-2">
              <span className="text-[10px] uppercase text-[#71717A] block font-semibold">
                Fleet Engineering & Avionics
              </span>
              <p className="text-[#D4D4D8] leading-relaxed">
                {selectedSector.recommendedFleet}
              </p>
            </div>

            <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-2">
              <span className="text-[10px] uppercase text-[#71717A] block font-semibold">
                Mountain Flight Protocol
              </span>
              <p className="text-[#D4D4D8] leading-relaxed">
                {selectedSector.mountainPassRisk}
              </p>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DGCA Part 135 Commercial Operator</span>
              </div>
            </div>

            <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-2">
              <span className="text-[10px] uppercase text-[#71717A] block font-semibold">
                Ground Concierge & FBO Handling
              </span>
              <p className="text-[#D4D4D8] leading-relaxed">
                Direct tarmac vehicle escort to aircraft stairs. Luggage pre-cleared by SoulsVenture ground station manager.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
