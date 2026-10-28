"use client";

import React, { useState } from "react";
import {
  TeamRole,
  ROLE_PERMISSIONS,
  INITIAL_TEAM,
  TeamMember,
} from "@/lib/crmStore";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Users,
  Eye,
  EyeOff,
  UserCheck,
  KeyRound,
  FileSpreadsheet,
  AlertTriangle,
  Building,
  Plus,
} from "lucide-react";

interface AdminPermissionsMatrixProps {
  activeRole: TeamRole;
  setActiveRole: (role: TeamRole) => void;
}

export function AdminPermissionsMatrix({
  activeRole,
  setActiveRole,
}: AdminPermissionsMatrixProps) {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [showAddMember, setShowAddMember] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const permissionsList = [
    {
      key: "canViewFinancialMargins" as const,
      label: "View Sensitive Financial Margins & Profit Yield",
      desc: "Reveals exact gross margins, net vendor rates, and agency commission profit (e.g., ₹5.2L margin). Masked as ₹*** for junior staff.",
    },
    {
      key: "canViewAllLeads" as const,
      label: "View All Agency Portfolios & Incoming Inquiries",
      desc: "Grants access to global inbound leads across India. Non-founder curators only view their individually assigned clients.",
    },
    {
      key: "canEditMilestones" as const,
      label: "Progress Trip Stage Pipeline & Milestone Checklist",
      desc: "Ability to shift leads between 'Discovery Call', 'Proposal Sent', and 'Deposit Confirmed'.",
    },
    {
      key: "canAccessVendorLedger" as const,
      label: "Access Palace & Private Aviation Vendor Ledger",
      desc: "View and disburse vendor advance dues, RTGS accounts, and negotiated B2B commission contracts.",
    },
    {
      key: "canIssueVouchers" as const,
      label: "Issue Luxury Travel Vouchers & VIP Passes",
      desc: "Release official encrypted SoulsVenture boarding vouchers and royal palace access passes to clients.",
    },
    {
      key: "canAccessRadar" as const,
      label: "Access VIP Life-Event & Anniversary Radar",
      desc: "View private client milestone vaults, wedding anniversary alerts, and gift dispatch triggers.",
    },
    {
      key: "canExportData" as const,
      label: "Export Master CRM Data & Client Lists",
      desc: "Download full database CSVs. Strictly audited to prevent client data leakage.",
    },
    {
      key: "canManageTeam" as const,
      label: "Manage Team Permissions & Add Staff",
      desc: "Assign roles, modify access keys, and invite new concierges to the operating system.",
    },
  ];

  const allRoles: TeamRole[] = [
    "Founder (Unrestricted)",
    "Senior Curator",
    "Junior Assistant",
    "On-Ground Concierge",
    "Finance & Accounts",
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <KeyRound className="w-3 h-3" />
              Enterprise Security & RBAC
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Role-Based Access Control Architecture
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Multi-Curator & Team Permission Matrix
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Safeguard high-net-worth client confidentiality, shield sensitive agency margin yields, and assign role-specific operational scopes.
          </p>
        </div>

        <button
          onClick={() => setShowAddMember(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#FDFBF7] text-xs font-serif uppercase tracking-wider rounded-lg border border-[#333333] transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
          Invite Team Member
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Interactive Role Switcher Simulation Strip */}
      <div className="bg-[#181818] border border-[#C5A059]/30 rounded-xl p-5 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
            <h3 className="text-base font-serif text-[#FDFBF7]">
              Live Role Simulator (Test View Permissions)
            </h3>
          </div>
          <span className="text-xs text-[#C5A059] font-mono">
            Currently Operating As: <strong>{activeRole}</strong>
          </span>
        </div>

        <p className="text-xs text-[#A0A0A0]">
          Click any role below to instantly simulate how the dashboard adapts. Notice how sensitive profit margins and client dossiers mask or reveal in real time:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {allRoles.map((role) => {
            const isSelected = activeRole === role;
            return (
              <button
                key={role}
                onClick={() => {
                  setActiveRole(role);
                  setSuccessMsg(`Simulated view switched to '${role}'. Screen permissions updated.`);
                  setTimeout(() => setSuccessMsg(""), 4000);
                }}
                className={`p-3 rounded-lg text-xs font-serif text-left border transition-all ${
                  isSelected
                    ? "bg-[#C5A059]/15 border-[#C5A059] text-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30"
                    : "bg-[#141414] border-[#2A2A2A] text-[#888888] hover:text-[#FDFBF7] hover:border-[#444]"
                }`}
              >
                <div className="font-semibold text-[13px]">{role}</div>
                <div className="text-[10px] text-[#777] font-mono mt-1">
                  {role === "Founder (Unrestricted)"
                    ? "Suraj & Harsh (Full Access)"
                    : role === "Senior Curator"
                    ? "Itinerary Designers"
                    : role === "Junior Assistant"
                    ? "Masked Financials"
                    : role === "On-Ground Concierge"
                    ? "Field Ops & Stays"
                    : "Ledger & Payouts"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Simulation Banner */}
        <div className="p-3.5 bg-[#121212] rounded-lg border border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            {ROLE_PERMISSIONS[activeRole].canViewFinancialMargins ? (
              <Unlock className="w-4 h-4 text-emerald-400" />
            ) : (
              <Lock className="w-4 h-4 text-amber-400" />
            )}
            <div>
              <span className="text-[#888888]">Sensitive Profit Margin Visibility: </span>
              {ROLE_PERMISSIONS[activeRole].canViewFinancialMargins ? (
                <span className="text-emerald-400 font-mono font-bold">
                  UNMASKED — ₹5,17,500 (15% Net Yield Visible)
                </span>
              ) : (
                <span className="text-amber-400 font-mono font-bold">
                  MASKED — ₹***,*** (Restricted to Founders & Accounts)
                </span>
              )}
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#777]">
            Global Database Export: {ROLE_PERMISSIONS[activeRole].canExportData ? "Allowed" : "Blocked"}
          </div>
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-[#181818] border border-[#262626] rounded-xl overflow-hidden shadow-2xl space-y-4 p-6">
        <div>
          <h3 className="font-serif text-[#FDFBF7] text-lg">
            Master Role-Based Permissions Grid
          </h3>
          <p className="text-xs text-[#888888] mt-0.5">
            Granular privilege hierarchy across SoulsVenture concierge departments
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#141414] text-[#888888] font-serif uppercase tracking-wider">
                <th className="py-3 px-4 font-normal w-1/3">System Privilege / Scope</th>
                {allRoles.map((r) => (
                  <th
                    key={r}
                    className={`py-3 px-2 text-center font-normal text-[11px] ${
                      activeRole === r ? "text-[#C5A059] bg-[#C5A059]/5" : ""
                    }`}
                  >
                    {r.replace(" (Unrestricted)", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222]">
              {permissionsList.map((perm) => (
                <tr key={perm.key} className="hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-serif text-[#FDFBF7] text-sm">{perm.label}</div>
                    <div className="text-[11px] text-[#777777] font-sans mt-0.5">{perm.desc}</div>
                  </td>

                  {allRoles.map((role) => {
                    const isGranted = ROLE_PERMISSIONS[role][perm.key];
                    const isCurrent = activeRole === role;

                    return (
                      <td
                        key={role}
                        className={`py-3 px-2 text-center ${
                          isCurrent ? "bg-[#C5A059]/5" : ""
                        }`}
                      >
                        {isGranted ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-700/40">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-[#555] border border-neutral-800">
                            <Lock className="w-3 h-3" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Roster Section */}
      <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <h3 className="font-serif text-[#FDFBF7] text-lg">
              Authorized Team Directory & On-Ground Escorts
            </h3>
            <p className="text-xs text-[#888888]">
              Active personnel credentials across New Delhi, Dehradun, Leh, and Rajasthan
            </p>
          </div>
          <Users className="w-4 h-4 text-[#C5A059]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 space-y-3 hover:border-[#C5A059]/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-[#FDFBF7] text-base">{member.name}</h4>
                  <div className="text-[11px] text-[#C5A059] font-mono mt-0.5">{member.role}</div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                    member.status === "Active"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                      : "bg-purple-950/60 text-purple-300 border border-purple-800/40"
                  }`}
                >
                  {member.status}
                </span>
              </div>

              <div className="space-y-1 bg-[#181818] p-3 rounded-lg border border-[#222222] text-xs font-mono text-[#A0A0A0]">
                <div>Email: {member.email}</div>
                <div>Direct: {member.phone}</div>
                <div>Station: {member.location}</div>
                <div className="text-[#C5A059]">Active Clients: {member.activeClients} Pax</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Team Provisioning
                </span>
                <h3 className="text-lg font-serif text-[#FDFBF7] mt-0.5">
                  Invite New Team Member
                </h3>
              </div>
              <button
                onClick={() => setShowAddMember(false)}
                className="text-[#888888] hover:text-[#FDFBF7] p-1 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const role = (form.elements.namedItem("role") as HTMLSelectElement).value as TeamRole;
                const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
                const location = (form.elements.namedItem("location") as HTMLInputElement).value;

                const newMember: TeamMember = {
                  id: `tm-${Date.now()}`,
                  name,
                  email,
                  role,
                  phone,
                  activeClients: 0,
                  location,
                  status: "Active",
                };

                setTeam([...team, newMember]);
                setShowAddMember(false);
                setSuccessMsg(`Team member '${name}' invited with '${role}' credentials.`);
                setTimeout(() => setSuccessMsg(""), 4000);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-[#888888] block mb-1">Full Name *</label>
                <input
                  name="name"
                  required
                  placeholder="e.g., Ananya Deshmukh"
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[#888888] block mb-1">Official Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="ananya@soulsventure.com"
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#888888] block mb-1">Access Role *</label>
                  <select
                    name="role"
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Senior Curator">Senior Curator</option>
                    <option value="Junior Assistant">Junior Assistant</option>
                    <option value="On-Ground Concierge">On-Ground Concierge</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="Founder (Unrestricted)">Founder (Unrestricted)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#888888] block mb-1">Phone *</label>
                  <input
                    name="phone"
                    required
                    placeholder="+91 98200 12345"
                    className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#888888] block mb-1">Assigned Station / Location</label>
                <input
                  name="location"
                  defaultValue="New Delhi Office"
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="px-3 py-1.5 text-[#888] hover:text-white rounded-lg text-xs font-serif"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C5A059] text-black font-serif font-medium rounded-lg text-xs uppercase tracking-wider"
                >
                  Generate Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
