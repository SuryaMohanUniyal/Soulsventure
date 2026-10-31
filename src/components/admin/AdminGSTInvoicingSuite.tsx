"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Printer,
  Send,
  Plus,
  Trash2,
  FileText,
  CheckCircle2,
  Receipt,
  Download,
  Building,
  ShieldCheck,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import {
  GSTInvoice,
  GSTInvoiceLineItem,
  getStoredInvoices,
  saveInvoices,
  createGSTInvoice,
  getStoredLeads,
  CRMLead,
} from "@/lib/crmStore";

export default function AdminGSTInvoicingSuite() {
  const [invoices, setInvoices] = useState<GSTInvoice[]>(() => getStoredInvoices());
  const [leads, setLeads] = useState<CRMLead[]>(() => getStoredLeads());
  const [selectedInvoice, setSelectedInvoice] = useState<GSTInvoice | null>(
    invoices[0] || null
  );

  const [activeCurrency, setActiveCurrency] = useState<"INR" | "USD" | "EUR" | "GBP">("INR");
  const [successToast, setSuccessToast] = useState("");

  // Exchange rates relative to INR
  const FX_RATES: Record<string, number> = {
    INR: 1,
    USD: 84.5,
    EUR: 91.2,
    GBP: 108.5,
  };

  const currencySymbol =
    activeCurrency === "INR"
      ? "₹"
      : activeCurrency === "USD"
      ? "$"
      : activeCurrency === "EUR"
      ? "€"
      : "£";

  // Create new draft invoice
  const handleCreateNewInvoice = () => {
    const lead = leads[0] || {
      referenceCode: "SV-2026-VIP",
      clientName: "New VIP Client",
      email: "guest@soulsventure.com",
      phone: "+91 81263 57353",
    };

    const newInv = createGSTInvoice({
      leadReference: lead.referenceCode,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      clientName: lead.clientName,
      clientEmail: lead.email,
      clientPhone: lead.phone,
      billingAddress: "Registered Office / Residence Address Pending",
      clientGstinOrPan: "",
      agencyGstin: "05AAECS9821R1ZM",
      sacCode: "998555",
      currency: activeCurrency,
      exchangeRateToINR: FX_RATES[activeCurrency],
      lineItems: [
        {
          id: "li-" + Date.now(),
          description: "Royal Palace Suites Allocation (Taj / Oberoi Bespoke 5 Nights)",
          category: "Palace Suite",
          quantity: 5,
          unitPrice: activeCurrency === "INR" ? 180000 : 2130,
          amount: activeCurrency === "INR" ? 900000 : 10650,
        },
        {
          id: "li-" + (Date.now() + 1),
          description: "Private Pilatus PC-12 Turboprop Charter & VIP Tarmac Escort",
          category: "Private Aviation",
          quantity: 1,
          unitPrice: activeCurrency === "INR" ? 420000 : 4970,
          amount: activeCurrency === "INR" ? 420000 : 4970,
        },
        {
          id: "li-" + (Date.now() + 2),
          description: "Land Rover Defender 110 4WD Chauffeur Convoy & Fuel (6 Days)",
          category: "Luxury Fleet",
          quantity: 6,
          unitPrice: activeCurrency === "INR" ? 28000 : 330,
          amount: activeCurrency === "INR" ? 168000 : 1980,
        },
      ],
      subtotal: activeCurrency === "INR" ? 1488000 : 17600,
      gstRatePercent: 5,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: activeCurrency === "INR" ? 74400 : 880,
      totalGstAmount: activeCurrency === "INR" ? 74400 : 880,
      conciergeRetainerINR: activeCurrency === "INR" ? 50000 : 600,
      grandTotal: activeCurrency === "INR" ? 1612400 : 19080,
      paymentStatus: "Pro-Forma Issued",
      paymentTerms: "50% advance deposit via RTGS/Wire. Balance 50% 14 days prior to royal arrival.",
    });

    const updated = getStoredInvoices();
    setInvoices(updated);
    setSelectedInvoice(newInv);
    setSuccessToast(`Created Pro-Forma Invoice ${newInv.invoiceNumber}!`);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  // WhatsApp Send Invoice
  const handleSendWhatsAppInvoice = () => {
    if (!selectedInvoice) return;
    const cleanPhone = selectedInvoice.clientPhone.replace(/[^0-9]/g, "");
    const msg = `*SOULSVENTURE BESPOKE JOURNEYS*
_Official Pro-Forma Tax Invoice_

Dear *${selectedInvoice.clientName}*,

Please find your official tax-compliant Pro-Forma invoice details below:

📄 *Invoice No:* ${selectedInvoice.invoiceNumber}
📅 *Date of Issue:* ${selectedInvoice.invoiceDate}
💰 *Subtotal:* ${currencySymbol}${selectedInvoice.subtotal.toLocaleString()}
🏛️ *Tourism GST (5% SAC 998555):* ${currencySymbol}${selectedInvoice.totalGstAmount.toLocaleString()}
👑 *Concierge Retainer:* ${currencySymbol}${selectedInvoice.conciergeRetainerINR.toLocaleString()}
✨ *Grand Total Payable:* ${currencySymbol}${selectedInvoice.grandTotal.toLocaleString()} (${selectedInvoice.currency})

🔗 *View & Download Tax Invoice in Client Vault:*
https://soulsventure.com/client/trip/${selectedInvoice.leadReference.toLowerCase()}

Bank Escrow details:
Bank: HDFC Bank Private Banking
Branch: Dehradun / Delhi FBO
Beneficiary: SoulsVenture Luxury Journeys Pvt Ltd

Warm regards,
*Suraj Uniyal* (Founder & Director of Finance)
SoulsVenture Luxury Journeys`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Receipt className="w-3 h-3" />
              Multi-Currency & Tourism GST Suite
            </span>
            <span className="text-xs text-[#888888] font-mono">
              SAC 998555 • GSTIN 05AAECS9821R1ZM
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Automated Luxury GST Invoicing
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Generate legally compliant Indian tourism pro-forma invoices in INR, USD, EUR, and GBP with automated 5% GST calculation.
          </p>
        </div>

        {/* Global Currency Switcher & Add Invoice */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-[#1B1B1B] rounded-lg p-1 border border-[#333333]">
            {(["INR", "USD", "EUR", "GBP"] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setActiveCurrency(curr)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeCurrency === curr
                    ? "bg-[#C5A059] text-black shadow"
                    : "text-[#A1A1AA] hover:text-[#FDFBF7]"
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          <button
            onClick={handleCreateNewInvoice}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-[#111111] font-semibold text-xs rounded-lg shadow cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Pro-Forma</span>
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Split Layout: Invoices List & Live Tax Invoice Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Recent Invoices List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
            <span className="uppercase font-semibold tracking-wider">Issued Invoices</span>
            <span>{invoices.length} Total</span>
          </div>

          <div className="space-y-2.5">
            {invoices.length === 0 ? (
              <div className="p-8 text-center bg-[#151515] rounded-xl border border-[#262626] text-xs text-[#71717A] space-y-2">
                <Receipt className="w-8 h-8 text-[#444] mx-auto" />
                <p className="font-serif text-[#A0A0A0]">No Invoices Generated</p>
                <p className="text-[11px]">Click &quot;+ New Pro-Forma Invoice&quot; above to create one.</p>
              </div>
            ) : (
              invoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setSelectedInvoice(inv)}
                className={`p-4 rounded-xl border text-xs transition-all cursor-pointer ${
                  selectedInvoice?.id === inv.id
                    ? "bg-[#1E1E1E] border-[#C5A059] shadow-md shadow-[#C5A059]/10"
                    : "bg-[#161616] border-[#262626] hover:bg-[#1A1A1A] text-[#888888]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[#FDFBF7]">
                    {inv.invoiceNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      inv.paymentStatus === "Paid in Full"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : inv.paymentStatus === "Advance Paid"
                        ? "bg-amber-950 text-amber-300 border border-amber-800"
                        : "bg-blue-950 text-blue-300 border border-blue-800"
                    }`}
                  >
                    {inv.paymentStatus}
                  </span>
                </div>

                <div className="font-medium text-[#FDFBF7] truncate">{inv.clientName}</div>
                <div className="flex justify-between items-center text-[11px] text-[#A1A1AA] mt-2 pt-2 border-t border-[#262626]">
                  <span>Due: {inv.dueDate}</span>
                  <span className="font-mono font-bold text-[#C5A059]">
                    {inv.currency === "INR" ? "₹" : "$"}{inv.grandTotal.toLocaleString()} {inv.currency}
                  </span>
                </div>
              </div>
            )))}
          </div>
        </div>

        {/* Right Side: Printable Luxury Tax Letterhead (8 Cols) */}
        {selectedInvoice ? (
          <div className="lg:col-span-8 bg-[#151515] rounded-2xl border border-[#282828] p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Invoice Top Actions */}
            <div className="flex items-center justify-between border-b border-[#242424] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C5A059]">
                  LEGAL PRO-FORMA TAX INVOICE
                </span>
                <span className="text-xs text-[#71717A]">({selectedInvoice.invoiceNumber})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] text-xs font-semibold rounded-lg border border-[#333333] cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Print Pro-Forma PDF</span>
                </button>

                <button
                  onClick={handleSendWhatsAppInvoice}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-800 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Letterhead Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="font-serif text-2xl text-[#C5A059] block tracking-wide">
                  SOULSVENTURE
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] block mb-2">
                  Bespoke Journeys Private Limited
                </span>
                <div className="text-[#888888] space-y-0.5 leading-relaxed">
                  <p>Private Aviation & Heritage Concierge House</p>
                  <p>The Forest Manor, Rajpur Road, Dehradun 248001</p>
                  <p>
                    GSTIN: <strong className="text-[#FDFBF7] font-mono">05AAECS9821R1ZM</strong>
                  </p>
                  <p>
                    HSN/SAC Code: <strong className="text-[#FDFBF7] font-mono">998555 (Tour Operator Services)</strong>
                  </p>
                  <p>Email: finance@soulsventure.com | +91 98XXXXXXXX</p>
                </div>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#71717A] block">
                  Billed To Client:
                </span>
                <h4 className="font-serif text-base text-[#FDFBF7]">
                  {selectedInvoice.clientName}
                </h4>
                <p className="text-[#888888] max-w-xs sm:ml-auto leading-relaxed">
                  {selectedInvoice.billingAddress}
                </p>
                <p className="text-[#888888]">
                  Phone: {selectedInvoice.clientPhone}
                </p>
                {selectedInvoice.clientGstinOrPan && (
                  <p className="text-xs text-[#A1A1AA]">
                    Client GSTIN/PAN: <strong className="font-mono text-[#FDFBF7]">{selectedInvoice.clientGstinOrPan}</strong>
                  </p>
                )}
                <div className="pt-2 text-[11px] text-[#A1A1AA]">
                  <div>Invoice Date: <span className="font-mono text-[#FDFBF7]">{selectedInvoice.invoiceDate}</span></div>
                  <div>Payment Due: <span className="font-mono text-[#FDFBF7]">{selectedInvoice.dueDate}</span></div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto rounded-xl border border-[#262626]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1C1C1C] text-[#71717A] uppercase text-[10px] tracking-wider border-b border-[#262626]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Service / Asset Description</th>
                    <th className="py-2.5 px-3 font-semibold">Category</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Qty</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Unit Rate ({currencySymbol})</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Amount ({currencySymbol})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222] text-[#D4D4D8]">
                  {selectedInvoice.lineItems.map((li) => (
                    <tr key={li.id} className="hover:bg-[#1A1A1A]">
                      <td className="py-3 px-4 font-medium text-[#FDFBF7]">{li.description}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#242424] text-[#A1A1AA]">
                          {li.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono">{li.quantity}</td>
                      <td className="py-3 px-4 text-right font-mono">
                        {li.unitPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-medium text-[#FDFBF7]">
                        {li.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations & GST Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#262626] text-xs space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold block">
                  Mandatory Tax Compliance & Payment Terms
                </span>
                <p className="text-[#888888] leading-relaxed text-[11px]">
                  {selectedInvoice.paymentTerms}
                </p>
                <div className="pt-2 border-t border-[#262626] text-[10px] text-[#71717A]">
                  Applicable GST rule: 5% on passenger tour package (Notification No. 11/2017-Central Tax (Rate)).
                </div>
              </div>

              {/* Total Summary */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#888888]">
                  <span>Base Taxable Subtotal:</span>
                  <span className="font-mono text-[#FDFBF7]">
                    {currencySymbol}{selectedInvoice.subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-[#888888]">
                  <span>Tourism GST (5% SAC 998555):</span>
                  <span className="font-mono text-[#FDFBF7]">
                    {currencySymbol}{selectedInvoice.totalGstAmount.toLocaleString()}
                  </span>
                </div>

                {selectedInvoice.conciergeRetainerINR > 0 && (
                  <div className="flex justify-between text-[#888888]">
                    <span>Founder 24/7 Concierge Retainer:</span>
                    <span className="font-mono text-[#FDFBF7]">
                      {currencySymbol}{selectedInvoice.conciergeRetainerINR.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base font-serif font-bold text-[#C5A059] pt-3 border-t border-[#262626]">
                  <span>Total Amount Payable:</span>
                  <span className="font-mono">
                    {currencySymbol}{selectedInvoice.grandTotal.toLocaleString()} {selectedInvoice.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-[#151515] rounded-2xl border border-[#282828] p-12 text-center text-xs text-[#71717A] flex flex-col items-center justify-center min-h-[400px]">
            <Receipt className="w-12 h-12 text-[#444] mb-3" />
            <h3 className="font-serif text-lg text-[#FDFBF7]">No Pro-Forma Invoice Selected</h3>
            <p className="text-[11px] text-[#A0A0A0] mt-1 max-w-sm">
              Click &quot;+ New Pro-Forma Invoice&quot; above to generate a compliant Indian tourism invoice with automated 5% GST calculation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
