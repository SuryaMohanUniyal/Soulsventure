"use client";

import React, { useState } from "react";
import {
  VENDOR_PAYOUTS,
  VendorPayout,
} from "@/lib/crmStore";
import {
  Building2,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  PhoneCall,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Building,
} from "lucide-react";

export function AdminVendorLedger() {
  const [vendors, setVendors] = useState<VendorPayout[]>(VENDOR_PAYOUTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedVendor, setSelectedVendor] = useState<VendorPayout | null>(null);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState("");

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.propertyOrService.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vipContact.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || v.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || v.paymentStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalBookingsValue = vendors.reduce(
    (acc, curr) => acc + curr.totalBookingsINR,
    0
  );
  const totalCommissionEarned = vendors.reduce(
    (acc, curr) => acc + curr.commissionEarnedINR,
    0
  );
  const pendingDues = vendors
    .filter((v) => v.paymentStatus !== "Paid in Full")
    .reduce((acc, curr) => acc + (curr.totalBookingsINR - curr.commissionEarnedINR) * 0.4, 0);

  const handleMarkPaid = (id: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, paymentStatus: "Paid in Full" as const, nextDue: "Cleared" } : v
      )
    );
    setPayoutSuccessMsg("Partner payout ledger updated: Marked as 'Paid in Full'.");
    setShowPayoutModal(false);
    setTimeout(() => setPayoutSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Building2 className="w-3 h-3" />
              B2B Partner Ecosystem
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Tier-1 Luxury Palace & Charter Accounts
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Supplier & Partner Payout Ledger
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Manage agency commissions, vendor advance disbursements, and private inventory agreements across India.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const headers = "Vendor,Property,Category,Region,Bookings(INR),Commission(%),Commission(INR),Status,NextDue,Contact\n";
              const rows = vendors
                .map(
                  (v) =>
                    `"${v.vendorName}","${v.propertyOrService}","${v.category}","${v.region}",${v.totalBookingsINR},${v.commissionRate}%,${v.commissionEarnedINR},"${v.paymentStatus}","${v.nextDue}","${v.vipContact}"`
                )
                .join("\n");
              const blob = new Blob([headers + rows], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `soulsventure-vendor-ledger-${new Date().toISOString().split("T")[0]}.csv`;
              a.click();
            }}
            className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#FDFBF7] text-xs font-serif tracking-wider uppercase rounded-lg border border-[#333333] transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C5A059]" />
            Export Ledger CSV
          </button>
        </div>
      </div>

      {payoutSuccessMsg && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{payoutSuccessMsg}</span>
        </div>
      )}

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Total Handled Volume
          </p>
          <div className="text-2xl font-serif text-[#FDFBF7] mt-1.5 font-medium">
            ₹{(totalBookingsValue / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1 flex items-center gap-1">
            <span className="text-[#C5A059]">Across 5 Tier-1 partners</span>
          </div>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Agency Margin Yield
          </p>
          <div className="text-2xl font-serif text-emerald-400 mt-1.5 font-medium">
            ₹{(totalCommissionEarned / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1">
            Avg commission: <span className="text-emerald-400 font-mono">15.6%</span>
          </div>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Upcoming Vendor Dues
          </p>
          <div className="text-2xl font-serif text-amber-300 mt-1.5 font-medium">
            ₹{(pendingDues / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1">
            Advance settlements due in 15 days
          </div>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            VIP Escorts & Perks Attached
          </p>
          <div className="text-2xl font-serif text-[#C5A059] mt-1.5 font-medium">
            100% Guaranteed
          </div>
          <div className="text-[11px] text-[#A0A0A0] mt-1">
            Free upgrades & GM warm welcomes
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#181818] p-3 rounded-xl border border-[#262626]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search hotel, vendor, contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111111] border border-[#333333] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-[#888888] font-mono whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Filter Category:
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#111111] border border-[#333333] rounded-lg px-2.5 py-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="all">All Categories</option>
            <option value="Palace Hotel">Palace Hotels</option>
            <option value="Wilderness Camp">Wilderness Camps</option>
            <option value="Private Aviation">Private Aviation</option>
            <option value="Boat Charter">Boat Charters</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111111] border border-[#333333] rounded-lg px-2.5 py-1.5 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="all">All Payout Status</option>
            <option value="Paid in Full">Paid in Full</option>
            <option value="Advance Paid">Advance Paid</option>
            <option value="Pending Invoice">Pending Invoice</option>
          </select>
        </div>
      </div>

      {/* Ledger Master Table */}
      <div className="bg-[#181818] border border-[#262626] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#262626] bg-[#141414] text-[#888888] font-serif uppercase tracking-wider">
                <th className="py-3.5 px-4 font-normal">Partner / Hospitality Group</th>
                <th className="py-3.5 px-4 font-normal">Properties & Assets</th>
                <th className="py-3.5 px-4 font-normal">Category & Region</th>
                <th className="py-3.5 px-4 font-normal text-right">Booked Value (₹)</th>
                <th className="py-3.5 px-4 font-normal text-center">Comm. %</th>
                <th className="py-3.5 px-4 font-normal text-right">Yield Earned (₹)</th>
                <th className="py-3.5 px-4 font-normal text-center">Payout Status</th>
                <th className="py-3.5 px-4 font-normal">VIP GM Contact</th>
                <th className="py-3.5 px-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222]">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#888888] font-mono">
                    No vendor partners found matching query.
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-[#1E1E1E] transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-serif text-[#FDFBF7] text-sm group-hover:text-[#C5A059] transition-colors">
                        {vendor.vendorName}
                      </div>
                      <div className="text-[11px] text-[#888888] font-mono flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                        Verified Luxury Contract
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[#E0E0E0] max-w-[220px] font-sans">
                        {vendor.propertyOrService}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#222222] text-[#C5A059] border border-[#333333]">
                        {vendor.category}
                      </div>
                      <div className="text-[11px] text-[#888888] mt-1">
                        {vendor.region}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-[#FDFBF7] font-medium">
                      ₹{vendor.totalBookingsINR.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] font-mono font-medium border border-[#C5A059]/20">
                        {vendor.commissionRate}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                      ₹{vendor.commissionEarnedINR.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          vendor.paymentStatus === "Paid in Full"
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                            : vendor.paymentStatus === "Advance Paid"
                            ? "bg-amber-950/60 text-amber-300 border border-amber-800/40"
                            : "bg-rose-950/60 text-rose-300 border border-rose-800/40"
                        }`}
                      >
                        {vendor.paymentStatus === "Paid in Full" ? (
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        ) : (
                          <Clock className="w-2.5 h-2.5" />
                        )}
                        {vendor.paymentStatus}
                      </span>
                      {vendor.nextDue !== "Completed" && vendor.nextDue !== "Cleared" && (
                        <div className="text-[10px] text-[#888888] mt-0.5 font-mono">
                          Due: {vendor.nextDue}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[#C5A059] font-serif text-[11px]">
                        {vendor.vipContact}
                      </div>
                      <div className="text-[10px] text-[#777777]">
                        Direct Line Attached
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setShowPayoutModal(true);
                        }}
                        className="px-2.5 py-1 bg-[#222222] hover:bg-[#C5A059] hover:text-black text-[#FDFBF7] rounded border border-[#333333] transition-colors text-[11px] font-serif"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Payout Management Modal */}
      {showPayoutModal && selectedVendor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#2A2A2A] pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Partner Payout & Contract
                </span>
                <h3 className="text-xl font-serif text-[#FDFBF7] mt-0.5">
                  {selectedVendor.vendorName}
                </h3>
                <p className="text-xs text-[#888888] mt-0.5">
                  {selectedVendor.propertyOrService}
                </p>
              </div>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-[#888888] hover:text-[#FDFBF7] p-1 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-[#111111] p-4 rounded-xl border border-[#222222]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888888]">Total Client Booking Value:</span>
                <span className="text-[#FDFBF7] font-mono font-medium">
                  ₹{selectedVendor.totalBookingsINR.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888888]">Contracted Agency Commission:</span>
                <span className="text-[#C5A059] font-mono font-bold">
                  {selectedVendor.commissionRate}% (₹{selectedVendor.commissionEarnedINR.toLocaleString("en-IN")})
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888888]">Current Payout Status:</span>
                <span className="text-amber-300 font-mono">
                  {selectedVendor.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888888]">VIP Concierge Desk Contact:</span>
                <span className="text-[#FDFBF7]">{selectedVendor.vipContact}</span>
              </div>
            </div>

            <div className="p-3 bg-[#202020] rounded-lg border border-[#333333] text-xs text-[#A0A0A0] space-y-1">
              <p className="font-serif text-[#FDFBF7] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />
                Direct Wire / RTGS Settlement Protocol
              </p>
              <p className="text-[11px]">
                SoulsVenture settles net dues (after retaining our agency commission) directly via institutional RTGS.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPayoutModal(false)}
                className="px-4 py-2 bg-transparent hover:bg-[#222222] text-[#888888] hover:text-[#FDFBF7] rounded-lg text-xs font-serif transition-colors"
              >
                Cancel
              </button>
              {selectedVendor.paymentStatus !== "Paid in Full" && (
                <button
                  onClick={() => handleMarkPaid(selectedVendor.id)}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#b08e48] text-black font-serif font-medium rounded-lg text-xs tracking-wider uppercase transition-colors"
                >
                  Mark Advance / Invoice Cleared
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
