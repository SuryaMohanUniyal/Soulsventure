"use client";

import React, { useState, useEffect } from "react";
import {
  PartnerTieUp,
  PartnerTieUpCategory,
  VendorRole,
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
  KeyRound,
  ExternalLink,
  Lock,
  Copy,
} from "lucide-react";

export function AdminVendorLedger() {
  const [partners, setPartners] = useState<PartnerTieUp[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Form state for adding partner
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<PartnerTieUpCategory>("Hotels & Stays");
  const [newRole, setNewRole] = useState<VendorRole>("hotel");
  const [newService, setNewService] = useState("");
  const [newRegion, setNewRegion] = useState("Rajasthan");
  const [newContactPerson, setNewContactPerson] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("1234");
  const [newEmail, setNewEmail] = useState("");
  const [newCommission, setNewCommission] = useState("15%");
  const [newTariff, setNewTariff] = useState("");
  const [newPaymentTerms, setNewPaymentTerms] = useState("Direct / Post-trip billing");
  const [newNotes, setNewNotes] = useState("");

  useEffect(() => {
    setMounted(true);
    setPartners(getStoredPartners());
  }, []);

  const handleCategorySelect = (cat: PartnerTieUpCategory) => {
    setNewCategory(cat);
    if (cat === "Hotels & Stays") setNewRole("hotel");
    else if (cat === "Vehicles & Transport") setNewRole("driver");
    else if (cat === "Tour Guides & Escorts") setNewRole("guide");
    else setNewRole("activity");
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newContactPerson.trim() || !newPhone.trim()) return;

    const cleanLoginPhone = newPhone.replace(/\D/g, "") || newPhone.trim();

    const created = addPartnerTieUp({
      name: newName.trim(),
      role: newRole,
      category: newCategory,
      serviceOrAssets: newService.trim() || "Full Hospitality / Fleet Allocation",
      region: newRegion.trim() || "Pan-India",
      contactPerson: newContactPerson.trim(),
      phone: newPhone.trim(),
      loginPhone: cleanLoginPhone,
      password: newPassword.trim() || "1234",
      email: newEmail.trim() || undefined,
      commissionOrMargin: newCommission.trim() || "15%",
      negotiatedTariff: newTariff.trim() || "Negotiated B2B Contract Rate",
      status: "Active Tie-Up",
      paymentTerms: newPaymentTerms.trim() || "Direct billing",
      notes: newNotes.trim() || undefined,
    });

    setPartners((prev) => [created, ...prev]);
    setSuccessToast(`Partner tie-up registered: "${created.name}" [Role: ${created.role.toUpperCase()}] with Login PIN: ${created.password || "1234"}.`);
    setShowAddModal(false);

    // Reset form
    setNewName("");
    setNewService("");
    setNewContactPerson("");
    setNewPhone("");
    setNewPassword("1234");
    setNewRole("hotel");
    setNewCategory("Hotels & Stays");
    setNewEmail("");
    setNewTariff("");
    setNewNotes("");

    setTimeout(() => setSuccessToast(""), 5000);
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
      p.phone.includes(searchTerm) ||
      (p.loginPhone && p.loginPhone.includes(searchTerm));

    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    const matchesRole =
      roleFilter === "all" || p.role === roleFilter;

    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesRole && matchesStatus;
  });

  const hotelCount = partners.filter((p) => p.role === "hotel" || p.category === "Hotels & Stays").length;
  const driverCount = partners.filter((p) => p.role === "driver" || p.category === "Vehicles & Transport").length;
  const guideCount = partners.filter((p) => p.role === "guide" || p.category === "Tour Guides & Escorts").length;
  const activityCount = partners.filter((p) => p.role === "activity" || p.category === "Activities & Excursions").length;

  const exportCSV = () => {
    const headers = "Role,Category,Partner Name,Service/Assets,Region,Contact Person,Phone,Login Phone,PIN,Commission,Contract Tariff,Status,Payment Terms\n";
    const rows = filteredPartners
      .map(
        (p) =>
          `"${p.role}","${p.category}","${p.name}","${p.serviceOrAssets}","${p.region}","${p.contactPerson}","${p.phone}","${p.loginPhone}","${p.password || "1234"}","${p.commissionOrMargin}","${p.negotiatedTariff}","${p.status}","${p.paymentTerms}"`
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
              Verified B2B Tie-Up Directory & Dispatch Roles
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Hotels • Drivers • Tour Guides
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Vendor Management & Role Engine
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Register contracted palace hotels, chauffeur fleets, and licensed tour guides with individual login PINs and direct WhatsApp dispatches.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/vendor/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#1F1F1F] hover:bg-[#282828] text-[#C5A059] border border-[#C5A059]/30 rounded-xl text-xs font-mono transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Vendor Portal (/vendor)</span>
          </a>

          <button
            onClick={exportCSV}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#1A1A1A] hover:bg-[#252525] text-[#D4D4D8] border border-[#333333] rounded-xl text-xs font-mono transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#b08e48] hover:from-[#d8b368] hover:to-[#be9b52] text-black font-serif font-semibold text-xs rounded-xl transition-all shadow-lg shadow-[#C5A059]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Partner</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2.5 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Quick Role & Category Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => { setRoleFilter("hotel"); setCategoryFilter("all"); }}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            roleFilter === "hotel"
              ? "bg-[#25221B] border-[#C5A059] shadow-md shadow-[#C5A059]/10"
              : "bg-[#181818] border-[#2A2A2A] hover:border-[#3D3D3D]"
          }`}
        >
          <div className="flex items-center justify-between text-[#888888] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Hotels & Stays</span>
            <Hotel className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7]">{hotelCount}</div>
          <div className="text-[11px] text-[#A1A1AA] mt-1 font-mono">Role: hotel (Palaces & Camps)</div>
        </button>

        <button
          onClick={() => { setRoleFilter("driver"); setCategoryFilter("all"); }}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            roleFilter === "driver"
              ? "bg-[#15232d] border-sky-500 shadow-md shadow-sky-500/10"
              : "bg-[#181818] border-[#2A2A2A] hover:border-[#3D3D3D]"
          }`}
        >
          <div className="flex items-center justify-between text-[#888888] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Chauffeurs & Fleet</span>
            <Car className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7]">{driverCount}</div>
          <div className="text-[11px] text-[#A1A1AA] mt-1 font-mono">Role: driver (Innova & 4x4)</div>
        </button>

        <button
          onClick={() => { setRoleFilter("guide"); setCategoryFilter("all"); }}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            roleFilter === "guide"
              ? "bg-[#13271c] border-emerald-500 shadow-md shadow-emerald-500/10"
              : "bg-[#181818] border-[#2A2A2A] hover:border-[#3D3D3D]"
          }`}
        >
          <div className="flex items-center justify-between text-[#888888] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Tour Guides</span>
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7]">{guideCount}</div>
          <div className="text-[11px] text-[#A1A1AA] mt-1 font-mono">Role: guide (ASI & Naturalists)</div>
        </button>

        <button
          onClick={() => { setRoleFilter("activity"); setCategoryFilter("all"); }}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            roleFilter === "activity"
              ? "bg-[#25172e] border-purple-500 shadow-md shadow-purple-500/10"
              : "bg-[#181818] border-[#2A2A2A] hover:border-[#3D3D3D]"
          }`}
        >
          <div className="flex items-center justify-between text-[#888888] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Safaris & Excursions</span>
            <Compass className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-serif text-[#FDFBF7]">{activityCount}</div>
          <div className="text-[11px] text-[#A1A1AA] mt-1 font-mono">Role: activity (Safaris & Camps)</div>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#181818] rounded-xl border border-[#2A2A2A] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
          <input
            type="text"
            placeholder="Search by hotel, driver name, region, phone, or login ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121212] border border-[#2E2E2E] rounded-lg pl-9 pr-3 py-2 text-xs text-[#FDFBF7] placeholder-[#71717A] focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5 bg-[#121212] border border-[#2E2E2E] rounded-lg px-2.5 py-1.5 text-xs text-[#888888]">
            <Filter className="w-3.5 h-3.5 text-[#C5A059]" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-[#FDFBF7] text-xs focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#1A1A1A]">All Roles</option>
              <option value="hotel" className="bg-[#1A1A1A]">Role: Hotel Partner</option>
              <option value="driver" className="bg-[#1A1A1A]">Role: Chauffeur / Driver</option>
              <option value="guide" className="bg-[#1A1A1A]">Role: Tour Guide</option>
              <option value="activity" className="bg-[#1A1A1A]">Role: Activity Operator</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#121212] border border-[#2E2E2E] rounded-lg px-2.5 py-1.5 text-xs text-[#888888]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-[#FDFBF7] text-xs focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#1A1A1A]">All Statuses</option>
              <option value="Active Tie-Up" className="bg-[#1A1A1A]">Active Tie-Up</option>
              <option value="Under Review" className="bg-[#1A1A1A]">Under Review</option>
              <option value="Seasonal Hold" className="bg-[#1A1A1A]">Seasonal Hold</option>
            </select>
          </div>

          {(searchTerm || categoryFilter !== "all" || roleFilter !== "all" || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
              className="px-2.5 py-1.5 text-xs text-[#888] hover:text-[#FDFBF7] underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Partners Table */}
      <div className="bg-[#181818] rounded-xl border border-[#2A2A2A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#141414] text-[#888888] font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Role Tag</th>
                <th className="py-3 px-4">Partner Name & Asset</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4">Contact & WhatsApp</th>
                <th className="py-3 px-4">Vendor Portal Credentials</th>
                <th className="py-3 px-4 text-right">Tariff / Daily Rate</th>
                <th className="py-3 px-4 text-center">Margin</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center mx-auto text-[#71717A]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <p className="font-serif text-base text-[#FDFBF7]">
                        {partners.length === 0
                          ? "No Partner Tie-Ups Registered Yet"
                          : "No partners found matching your search."}
                      </p>
                      <p className="text-xs text-[#71717A]">
                        {partners.length === 0
                          ? "Register hotels, luxury chauffeurs, and tour guides with login credentials for the Vendor Portal."
                          : "Try resetting your search query or role filter."}
                      </p>
                      {partners.length === 0 && (
                        <button
                          type="button"
                          onClick={() => setShowAddModal(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#b08e48] text-black text-xs font-serif font-medium rounded-lg transition-colors shadow-md cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Register First Partner
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => {
                  const loginPhone = partner.loginPhone || partner.phone.replace(/\D/g, "");
                  const pin = partner.password || "1234";
                  const shareWhatsAppText = encodeURIComponent(
                    `Namaste ${partner.name},\n\nYour SoulsVenture B2B Partner Portal credentials:\n🔗 Portal: https://soulsventure.com/vendor/login\n📱 Login ID (Phone): ${loginPhone}\n🔑 PIN: ${pin}\nRole: ${partner.role.toUpperCase()}\n\nPlease log in to review assigned luxury guests, arrival schedules, and update dispatch status.`
                  );

                  return (
                    <tr
                      key={partner.id}
                      className="hover:bg-[#1E1E1E] transition-colors group"
                    >
                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border ${
                            partner.role === "hotel"
                              ? "bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/40"
                              : partner.role === "driver"
                              ? "bg-sky-950/70 text-sky-400 border-sky-800/50"
                              : partner.role === "guide"
                              ? "bg-emerald-950/70 text-emerald-400 border-emerald-800/50"
                              : "bg-purple-950/70 text-purple-300 border-purple-800/50"
                          }`}
                        >
                          {partner.role === "hotel" && <Hotel className="w-3 h-3" />}
                          {partner.role === "driver" && <Car className="w-3 h-3" />}
                          {partner.role === "guide" && <Compass className="w-3 h-3" />}
                          {partner.role === "activity" && <Plane className="w-3 h-3" />}
                          <span className="uppercase font-semibold tracking-wider">
                            {partner.role}
                          </span>
                        </span>
                        <div className="text-[9px] text-[#71717A] font-mono mt-0.5">
                          {partner.category}
                        </div>
                      </td>

                      {/* Partner Name & Asset */}
                      <td className="py-3.5 px-4">
                        <div className="font-serif text-[#FDFBF7] text-sm group-hover:text-[#C5A059] transition-colors font-medium">
                          {partner.name}
                        </div>
                        <div className="text-[11px] text-[#A1A1AA] max-w-[220px] truncate mt-0.5" title={partner.serviceOrAssets}>
                          {partner.serviceOrAssets}
                        </div>
                        {partner.notes && (
                          <div className="text-[10px] text-[#71717A] truncate max-w-[220px] mt-0.5">
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

                      {/* Contact Person & Direct Calling */}
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

                      {/* Vendor Portal Credentials */}
                      <td className="py-3.5 px-4">
                        <div className="p-2 rounded-lg bg-[#141414] border border-[#2B2B2B] space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-[#71717A]">ID:</span>
                            <span className="text-[#FDFBF7] font-semibold">{loginPhone}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-[#71717A]">PIN:</span>
                            <span className="text-[#C5A059] font-bold tracking-widest">{pin}</span>
                          </div>
                          <a
                            href={`https://wa.me/${loginPhone}?text=${shareWhatsAppText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 w-full py-1 mt-1 rounded bg-[#1F1F1F] hover:bg-emerald-950 hover:text-emerald-300 text-[#C5A059] border border-[#333333] text-[9px] font-mono transition-colors"
                            title="Share login PIN over WhatsApp"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Share PIN via WhatsApp</span>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Partner Tie-Up Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Role-Based Vendor Engine
                </span>
                <h3 className="text-xl font-serif text-[#FDFBF7] mt-0.5">
                  Register Partner & Vendor Tie-Up
                </h3>
                <p className="text-xs text-[#888888]">
                  Assign role (`hotel`, `driver`, `guide`), phone login ID, and admin-set PIN for their dedicated portal.
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
              {/* Category & Role Selector */}
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#C5A059] mb-1.5 font-semibold">
                  1. Partner Role & Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Hotels & Stays" as PartnerTieUpCategory, role: "hotel" as VendorRole, icon: Hotel, title: "Hotel Partner", desc: "Palace hotels, resorts & wilderness camps" },
                    { label: "Vehicles & Transport" as PartnerTieUpCategory, role: "driver" as VendorRole, icon: Car, title: "Driver / Transport", desc: "Luxury chauffeur fleet & 4x4 SUVs" },
                    { label: "Tour Guides & Escorts" as PartnerTieUpCategory, role: "guide" as VendorRole, icon: Compass, title: "Tour Guide", desc: "Licensed ASI guides & wildlife naturalists" },
                    { label: "Activities & Excursions" as PartnerTieUpCategory, role: "activity" as VendorRole, icon: Compass, title: "Activity / Excursion", desc: "Private boat safaris, camel treks & wilderness activities" },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = newCategory === cat.label && newRole === cat.role;
                    return (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => {
                          handleCategorySelect(cat.label);
                          setNewRole(cat.role);
                        }}
                        className={`p-2.5 text-left border rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#25221B] border-[#C5A059] text-[#FDFBF7] ring-1 ring-[#C5A059]"
                            : "bg-[#121212] border-[#2E2E2E] text-[#888888] hover:border-[#444]"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-medium text-xs">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#C5A059]" : ""}`} />
                          <span className={isSelected ? "text-[#FDFBF7]" : ""}>{cat.title}</span>
                        </div>
                        <p className="text-[10px] text-[#C5A059]/80 font-mono mt-0.5">Role tag: `{cat.role}`</p>
                        <p className="text-[10px] opacity-70 mt-0.5">{cat.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Partner Name */}
              <div>
                <label className="block text-[#888888] mb-1 font-medium">
                  2. Partner / Business / Individual Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    newRole === "hotel"
                      ? "e.g. The Oberoi Udaivilas or Taj Lake Palace"
                      : newRole === "driver"
                      ? "e.g. Vikram Singh Chauffeur / Royal Rajputana Fleet"
                      : "e.g. Dr. Rajesh Mathur (ASI Senior Historian)"
                  }
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Service / Fleet Allocation */}
              <div>
                <label className="block text-[#888888] mb-1 font-medium">
                  3. Properties / Fleet Allocation / Specializations *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    newRole === "hotel"
                      ? "e.g. Kohinoor Lake View Suites & Premier Pool Sanctuary"
                      : newRole === "driver"
                      ? "e.g. Innova Crysta ZX + Land Rover Defender 4WD"
                      : "e.g. Fluent English/French, City Palace & Udaipur Heritage Specialist"
                  }
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Region & Operating Territory */}
              <div>
                <label className="block text-[#888888] mb-1 font-medium">4. Operating Region / City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajasthan (Jaipur, Udaipur, Jodhpur) or Ladakh (Leh & Nubra)"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Contact Person & Phone (Used as Login ID) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888888] mb-1 font-medium">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GM Sharma or Lead Chauffeur"
                    value={newContactPerson}
                    onChange={(e) => setNewContactPerson(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-[#888888] mb-1 font-medium">
                    Phone / Login ID * <span className="text-[#C5A059] font-mono text-[10px]">(Vendor Login Phone)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9820111222"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg p-2.5 text-[#FDFBF7] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Admin-Set PIN / Password */}
              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#2B2B2B] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    Admin-Set Vendor PIN / Temporary Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setNewPassword(String(Math.floor(1000 + Math.random() * 9000)))}
                    className="text-[10px] font-mono text-[#C5A059] hover:underline"
                  >
                    Generate Random 4-Digit PIN
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1234"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg p-2.5 text-[#FDFBF7] font-mono tracking-widest text-sm focus:outline-none focus:border-[#C5A059]"
                />
                <p className="text-[10px] text-[#71717A] leading-relaxed">
                  Vendor logs into <strong>/vendor/login</strong> using their phone number and this PIN. Role (`{newRole}`) is automatically detected to load their custom dashboard.
                </p>
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
                    placeholder="e.g. ₹4,500/day driver & fuel or ₹18,000/night"
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
                  <span>Save & Activate Vendor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
