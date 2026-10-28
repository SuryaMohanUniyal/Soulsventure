"use client";

import React, { useState, useEffect } from "react";
import {
  PartnerTieUp,
  PartnerTieUpCategory,
  getStoredPartners,
  addPartnerTieUp,
  deletePartnerTieUp,
  updatePartnerTieUp,
} from "@/lib/crmStore";
import {
  Building2,
  Car,
  Compass,
  Plane,
  Plus,
  Search,
  Filter,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Trash2,
  X,
  Hotel,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

export function AdminVendorLedger() {
  const [partners, setPartners] = useState<PartnerTieUp[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Form state for adding partner
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<PartnerTieUpCategory>("Hotels & Stays");
  const [newService, setNewService] = useState("");
  const [newRegion, setNewRegion] = useState("Rajasthan");
  const [newContactPerson, setNewContactPerson] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCommission, setNewCommission] = useState("15%");
  const [newTariff, setNewTariff] = useState("");
  const [newPaymentTerms, setNewPaymentTerms] = useState("Direct / Post-trip billing");
  const [newNotes, setNewNotes] = useState("");

  useEffect(() => {
    setMounted(true);
    setPartners(getStoredPartners());
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newContactPerson.trim() || !newPhone.trim()) return;

    const created = addPartnerTieUp({
      name: newName.trim(),
      category: newCategory,
      serviceOrAssets: newService.trim() || "Full Hospitality / Fleet Allocation",
      region: newRegion.trim() || "Pan-India",
      contactPerson: newContactPerson.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim() || undefined,
      commissionOrMargin: newCommission.trim() || "15%",
      negotiatedTariff: newTariff.trim() || "Negotiated B2B Contract Rate",
      status: "Active Tie-Up",
      paymentTerms: newPaymentTerms.trim() || "Direct billing",
      notes: newNotes.trim() || undefined,
    });

    setPartners((prev) => [created, ...prev]);
    setSuccessToast(`Partner tie-up registered: "${created.name}" added to your verified network.`);
    setShowAddModal(false);

    // Reset form
    setNewName("");
    setNewService("");
    setNewContactPerson("");
    setNewPhone("");
    setNewEmail("");
    setNewTariff("");
    setNewNotes("");

    setTimeout(() => setSuccessToast(""), 4500);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from your active partner tie-ups?`)) {
      const updated = deletePartnerTieUp(id);
      setPartners(updated);
      setSuccessToast(`Partner "${name}" removed.`);
      setTimeout(() => setSuccessToast(""), 3500);
    }
  };

  const handleStatusChange = (id: string, newStatus: PartnerTieUp["status"]) => {
    const updated = updatePartnerTieUp(id, { status: newStatus });
    setPartners(updated);
    setSuccessToast(`Partner status updated to "${newStatus}".`);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  const filteredPartners = partners.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.serviceOrAssets.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);

    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const hotelCount = partners.filter((p) => p.category === "Hotels & Stays").length;
  const vehicleCount = partners.filter((p) => p.category === "Vehicles & Transport").length;
  const guideCount = partners.filter((p) => p.category === "Tour Guides & Escorts").length;
  const activityCount = partners.filter((p) => p.category === "Activities & Aviation").length;

  const exportCSV = () => {
    const headers = "Category,Partner Name,Service/Assets,Region,Contact Person,Phone,Email,Commission,Contract Tariff,Status,Payment Terms\n";
    const rows = filteredPartners
      .map(
        (p) =>
          `"${p.category}","${p.name}","${p.serviceOrAssets}","${p.region}","${p.contactPerson}","${p.phone}","${p.email || ""}","${p.commissionOrMargin}","${p.negotiatedTariff}","${p.status}","${p.paymentTerms}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `soulsventure-partner-tieups-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!mounted) {
    return (
      <div className="p-8 text-center text-[#71717A] text-xs font-mono">
        Loading partner directory...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Building2 className="w-3.5 h-3.5" />
              Verified B2B Tie-Up Directory
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Hotels • Chauffeur Fleets • Tour Guides
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Partner & Vendor Tie-Ups
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Manage your contracted palace hotels, luxury chauffeur fleets, and professional tour guides with direct WhatsApp contacts and rate agreements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08e48] text-black text-xs font-serif font-semibold tracking-wider uppercase rounded-lg transition-colors shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Tie-Up
          </button>

          <button
            onClick={exportCSV}
            disabled={partners.length === 0}
            className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#FDFBF7] text-xs font-serif tracking-wider uppercase rounded-lg border border-[#333333] transition-colors disabled:opacity-40"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C5A059]" />
            Export CSV
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* KPI Category Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => setCategoryFilter(categoryFilter === "Hotels & Stays" ? "all" : "Hotels & Stays")}
          className={`bg-[#181818] border rounded-xl p-4 cursor-pointer transition-all ${
            categoryFilter === "Hotels & Stays"
              ? "border-[#C5A059] ring-1 ring-[#C5A059]"
              : "border-[#262626] hover:border-[#383838]"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#888888]">
            <span>Hotels & Stays</span>
            <Hotel className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7] mt-2 font-medium">
            {hotelCount}
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">Palaces, Havelis & Camps</p>
        </div>

        <div
          onClick={() => setCategoryFilter(categoryFilter === "Vehicles & Transport" ? "all" : "Vehicles & Transport")}
          className={`bg-[#181818] border rounded-xl p-4 cursor-pointer transition-all ${
            categoryFilter === "Vehicles & Transport"
              ? "border-[#C5A059] ring-1 ring-[#C5A059]"
              : "border-[#262626] hover:border-[#383838]"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#888888]">
            <span>Vehicles & Fleets</span>
            <Car className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7] mt-2 font-medium">
            {vehicleCount}
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">Chauffeur SUVs & Sedans</p>
        </div>

        <div
          onClick={() => setCategoryFilter(categoryFilter === "Tour Guides & Escorts" ? "all" : "Tour Guides & Escorts")}
          className={`bg-[#181818] border rounded-xl p-4 cursor-pointer transition-all ${
            categoryFilter === "Tour Guides & Escorts"
              ? "border-[#C5A059] ring-1 ring-[#C5A059]"
              : "border-[#262626] hover:border-[#383838]"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#888888]">
            <span>Tour Guides</span>
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7] mt-2 font-medium">
            {guideCount}
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">Licensed Guides & Trackers</p>
        </div>

        <div
          onClick={() => setCategoryFilter(categoryFilter === "Activities & Aviation" ? "all" : "Activities & Aviation")}
          className={`bg-[#181818] border rounded-xl p-4 cursor-pointer transition-all ${
            categoryFilter === "Activities & Aviation"
              ? "border-[#C5A059] ring-1 ring-[#C5A059]"
              : "border-[#262626] hover:border-[#383838]"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#888888]">
            <span>Aviation & Charters</span>
            <Plane className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7] mt-2 font-medium">
            {activityCount}
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">Helicopters, Turboprops & Boats</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#181818] p-3 rounded-xl border border-[#262626]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search hotel, vehicle, guide name, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111111] border border-[#333333] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-[#888888] font-mono whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Category:
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#111111] border border-[#333333] rounded-lg px-2.5 py-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="all">All Categories ({partners.length})</option>
            <option value="Hotels & Stays">Hotels & Stays ({hotelCount})</option>
            <option value="Vehicles & Transport">Vehicles & Transport ({vehicleCount})</option>
            <option value="Tour Guides & Escorts">Tour Guides ({guideCount})</option>
            <option value="Activities & Aviation">Aviation & Charters ({activityCount})</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111111] border border-[#333333] rounded-lg px-2.5 py-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="all">All Status</option>
            <option value="Active Tie-Up">Active Tie-Up</option>
            <option value="Under Review">Under Review</option>
            <option value="Seasonal Hold">Seasonal Hold</option>
          </select>
        </div>
      </div>

      {/* Partners Master Table */}
      <div className="bg-[#181818] border border-[#262626] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#262626] bg-[#141414] text-[#888888] font-serif uppercase tracking-wider">
                <th className="py-3.5 px-4 font-normal">Category</th>
                <th className="py-3.5 px-4 font-normal">Partner / Tie-Up Name</th>
                <th className="py-3.5 px-4 font-normal">Service / Fleet / Specialty</th>
                <th className="py-3.5 px-4 font-normal">Operating Region</th>
                <th className="py-3.5 px-4 font-normal">Contact Person & Line</th>
                <th className="py-3.5 px-4 font-normal text-right">Contract Tariff</th>
                <th className="py-3.5 px-4 font-normal text-center">Commission / Margin</th>
                <th className="py-3.5 px-4 font-normal text-center">Status</th>
                <th className="py-3.5 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222]">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#888888]">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="flex items-center justify-center gap-2 text-[#C5A059]/40">
                        <Hotel className="w-6 h-6" />
                        <Car className="w-6 h-6" />
                        <Compass className="w-6 h-6" />
                      </div>
                      <p className="font-serif text-base text-[#FDFBF7]">
                        {partners.length === 0
                          ? "No Partner Tie-Ups Registered Yet"
                          : "No partners found matching your search."}
                      </p>
                      <p className="text-xs text-[#71717A]">
                        {partners.length === 0
                          ? "Easily record your contracted hotels, chauffeur car owners, and tour guides with direct WhatsApp contacts and rate agreements."
                          : "Try resetting your search query or category filter."}
                      </p>
                      {partners.length === 0 && (
                        <button
                          type="button"
                          onClick={() => setShowAddModal(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#b08e48] text-black text-xs font-serif font-medium rounded-lg transition-colors shadow-md cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Your First Partner Tie-Up
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr
                    key={partner.id}
                    className="hover:bg-[#1E1E1E] transition-colors group"
                  >
                    {/* Category Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border ${
                          partner.category === "Hotels & Stays"
                            ? "bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30"
                            : partner.category === "Vehicles & Transport"
                            ? "bg-sky-950/60 text-sky-400 border-sky-800/40"
                            : partner.category === "Tour Guides & Escorts"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40"
                            : "bg-purple-950/60 text-purple-300 border-purple-800/40"
                        }`}
                      >
                        {partner.category === "Hotels & Stays" && <Hotel className="w-3 h-3" />}
                        {partner.category === "Vehicles & Transport" && <Car className="w-3 h-3" />}
                        {partner.category === "Tour Guides & Escorts" && <Compass className="w-3 h-3" />}
                        {partner.category === "Activities & Aviation" && <Plane className="w-3 h-3" />}
                        <span>{partner.category}</span>
                      </span>
                    </td>

                    {/* Partner Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-serif text-[#FDFBF7] text-sm group-hover:text-[#C5A059] transition-colors font-medium">
                        {partner.name}
                      </div>
                      <div className="text-[10px] text-[#888888] font-mono flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                        Verified Tie-Up
                      </div>
                    </td>

                    {/* Service / Fleet */}
                    <td className="py-3.5 px-4">
                      <div className="text-[#E0E0E0] max-w-[220px] font-sans truncate" title={partner.serviceOrAssets}>
                        {partner.serviceOrAssets}
                      </div>
                      {partner.notes && (
                        <div className="text-[10px] text-[#71717A] truncate max-w-[220px]">
                          Note: {partner.notes}
                        </div>
                      )}
                    </td>

                    {/* Operating Region */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[#C5A059] font-mono text-[11px]">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{partner.region}</span>
                      </div>
                    </td>

                    {/* Contact Person & One-Click Contact */}
                    <td className="py-3.5 px-4">
                      <div className="text-[#FDFBF7] font-medium text-xs">
                        {partner.contactPerson}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Greetings from Soulsventure Bespoke Journeys. Inquiring regarding booking availability and allocations.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/40 text-[10px] font-mono"
                          title="Direct WhatsApp Message"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${partner.phone}`}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#222222] hover:bg-[#333333] text-[#A1A1AA] text-[10px] font-mono"
                          title="Call Line"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{partner.phone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Contract Tariff */}
                    <td className="py-3.5 px-4 text-right font-mono text-[#FDFBF7]">
                      {partner.negotiatedTariff}
                    </td>

                    {/* Commission / Margin */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] font-mono font-medium border border-[#C5A059]/20">
                        {partner.commissionOrMargin}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={partner.status}
                        onChange={(e) => handleStatusChange(partner.id, e.target.value as PartnerTieUp["status"])}
                        className={`text-[10px] font-mono uppercase tracking-wider rounded-md px-2 py-1 border appearance-none cursor-pointer focus:outline-none transition-colors ${
                          partner.status === "Active Tie-Up"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40"
                            : partner.status === "Under Review"
                            ? "bg-amber-950/60 text-amber-300 border-amber-800/40"
                            : "bg-rose-950/60 text-rose-300 border-rose-800/40"
                        }`}
                      >
                        <option value="Active Tie-Up" className="bg-[#1A1A1A]">Active Tie-Up</option>
                        <option value="Under Review" className="bg-[#1A1A1A]">Under Review</option>
                        <option value="Seasonal Hold" className="bg-[#1A1A1A]">Seasonal Hold</option>
                      </select>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(partner.id, partner.name)}
                        className="p-1.5 text-[#71717A] hover:text-rose-400 hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                        title="Delete partner"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Partner Tie-Up Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  New Tie-Up Onboarding
                </span>
                <h3 className="text-xl font-serif text-[#FDFBF7] mt-0.5">
                  Register Partner Tie-Up
                </h3>
                <p className="text-xs text-[#888888]">
                  Add verified hotels, luxury vehicle chauffeurs, or tour guides to your operational network.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#888888] hover:text-[#FDFBF7] p-1 font-mono text-sm cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              {/* Category Selector */}
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#C5A059] mb-1.5 font-semibold">
                  Partner Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Hotels & Stays" as PartnerTieUpCategory, icon: Hotel, desc: "Palaces, Havelis & Resorts" },
                    { label: "Vehicles & Transport" as PartnerTieUpCategory, icon: Car, desc: "SUVs, Innova & Chauffeurs" },
                    { label: "Tour Guides & Escorts" as PartnerTieUpCategory, icon: Compass, desc: "Licensed Guides & Trackers" },
                    { label: "Activities & Aviation" as PartnerTieUpCategory, icon: Plane, desc: "Helicopters, Houseboats & Jets" },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = newCategory === cat.label;
                    return (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => setNewCategory(cat.label)}
                        className={`p-2.5 text-left border rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#25221B] border-[#C5A059] text-[#FDFBF7] ring-1 ring-[#C5A059]"
                            : "bg-[#121212] border-[#2E2E2E] text-[#888888] hover:border-[#444]"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-medium text-xs">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#C5A059]" : ""}`} />
                          <span className={isSelected ? "text-[#FDFBF7]" : ""}>{cat.label}</span>
                        </div>
                        <p className="text-[10px] opacity-70 mt-0.5">{cat.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Partner Name */}
              <div>
                <label className="block text-[#888888] mb-1">
                  Partner / Business / Individual Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    newCategory === "Hotels & Stays"
                      ? "e.g. Taj Lake Palace or Boutique Heritage Haveli"
                      : newCategory === "Vehicles & Transport"
                      ? "e.g. Royal Rajputana Luxury Fleet / Driver Lead Ramesh"
                      : "e.g. Rajesh Sharma (Senior Wildlife Naturalist)"
                  }
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Service / Fleet Allocation */}
              <div>
                <label className="block text-[#888888] mb-1">
                  Properties / Fleet Allocation / Specialties *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    newCategory === "Hotels & Stays"
                      ? "e.g. Palace Grand Royal Suites & Lake View Rooms"
                      : newCategory === "Vehicles & Transport"
                      ? "e.g. 2x Innova Crysta + 1x Mercedes E-Class"
                      : "e.g. Fluent English/French, ASI Licensed, Tiger Tracking Expert"
                  }
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Region & Operating Territory */}
              <div>
                <label className="block text-[#888888] mb-1">Operating Region / City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajasthan (Jaipur, Jodhpur, Udaipur) or Ladakh (Leh & Nubra)"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888888] mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manvendra Singh (GM / Lead)"
                    value={newContactPerson}
                    onChange={(e) => setNewContactPerson(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[#888888] mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 12345"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Email & Commission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888888] mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="reservations@hotel.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[#888888] mb-1">Commission / Margin Rate</label>
                  <input
                    type="text"
                    placeholder="e.g. 15% or Net B2B Rate"
                    value={newCommission}
                    onChange={(e) => setNewCommission(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Tariff & Payment Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888888] mb-1">Contract Tariff / Daily Rate</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹4,500/day with driver or ₹18,000/night"
                    value={newTariff}
                    onChange={(e) => setNewTariff(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[#888888] mb-1">Payment Settlement Terms</label>
                  <input
                    type="text"
                    placeholder="e.g. 15-day credit / Advance 50%"
                    value={newPaymentTerms}
                    onChange={(e) => setNewPaymentTerms(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-[#888888] mb-1">Special Contract Terms / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Complimentary airport transfer included for Soulsventure VIP clients..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#222222] text-[#888] hover:text-white rounded-lg text-xs font-serif cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] hover:bg-[#b08e48] text-black font-semibold rounded-lg text-xs font-serif shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Partner Tie-Up</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}