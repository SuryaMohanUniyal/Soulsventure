"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClientMoodboard,
  INITIAL_MOODBOARDS,
  MoodboardItem,
  getStoredMoodboards,
  saveMoodboards,
} from "@/lib/crmStore";
import {
  Sparkles,
  ExternalLink,
  Share2,
  Lock,
  Plus,
  Trash2,
  Check,
  Send,
  Eye,
  Camera,
  Compass,
  MapPin,
  Heart,
  Palette,
  CheckCircle2,
} from "lucide-react";

export function AdminMoodboardVault() {
  const [moodboards, setMoodboards] = useState<ClientMoodboard[]>([]);
  const [selectedMb, setSelectedMb] = useState<ClientMoodboard | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  useEffect(() => {
    const list = getStoredMoodboards();
    setMoodboards(list);
    if (list.length > 0) setSelectedMb(list[0]);
  }, []);

  const handleCopyLink = (mb: ClientMoodboard) => {
    const url = `${window.location.origin}/moodboard/${mb.leadReference.toLowerCase()}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleSendWhatsAppMoodboard = (mb: ClientMoodboard) => {
    const url = `${window.location.origin}/moodboard/${mb.leadReference.toLowerCase()}`;
    const msg = encodeURIComponent(
      `Dear ${mb.clientName},\n\n` +
      `Before we discuss pricing or itineraries, our founders wished to present your private Visual Inspiration Moodboard for ${mb.title}.\n\n` +
      `Private Link: ${url}\n` +
      `VIP Access Passcode: *${mb.passcode}*\n\n` +
      `“${mb.curatorNote}”\n\n` +
      `Warm regards,\n${mb.curatorName}\nFounder, SoulsVenture Concierge`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Palette className="w-3 h-3" />
              Emotional Visual Curation
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Pre-Pricing Client Swipe-File & Inspiration Vault
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Client Moodboard & Inspiration Vault
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Curate private, password-protected visual aesthetic previews that emotionally connect high-net-worth clients before commercial proposals are shown.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#C5A059] hover:bg-[#b08e48] text-black text-xs font-serif font-medium uppercase tracking-wider rounded-lg transition-colors shadow-lg"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New Moodboard
        </button>
      </div>

      {successToast && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Moodboard Selector Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {moodboards.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-[#181818] border border-[#262626] rounded-xl text-[#71717A] text-xs space-y-2">
            <Palette className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
            <p className="font-serif text-sm text-[#FDFBF7]">No Client Moodboards Created Yet</p>
            <p className="text-[#71717A] max-w-md mx-auto">
              Click &ldquo;Create New Moodboard&rdquo; to build password-protected visual inspiration boards for your luxury travelers.
            </p>
          </div>
        ) : (
          moodboards.map((mb) => {
            const isSelected = selectedMb?.id === mb.id;

          return (
            <div
              key={mb.id}
              onClick={() => setSelectedMb(mb)}
              className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "bg-[#1C1A16] border-[#C5A059] shadow-xl ring-1 ring-[#C5A059]/30"
                  : "bg-[#181818] border-[#2A2A2A] hover:border-[#444]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30">
                      {mb.leadReference}
                    </span>
                    <span className="text-[11px] text-[#888888] font-mono">
                      Curated by {mb.curatorName}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif text-[#FDFBF7] mt-1.5 font-medium">
                    {mb.title}
                  </h3>
                  <div className="text-xs text-[#A0A0A0] mt-0.5 font-serif italic">
                    For {mb.clientName}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#C5A059] bg-[#111] px-2 py-1 rounded border border-[#333]">
                    <Lock className="w-3 h-3 text-[#C5A059]" />
                    {mb.passcode}
                  </span>
                  {mb.lastViewedByClient && (
                    <div className="text-[10px] text-emerald-400 mt-1 font-mono">
                      Viewed: {mb.lastViewedByClient}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                <span className="text-[#888888] font-mono">
                  {mb.items.length} Curated Visual Assets
                </span>
                <span className="text-[#C5A059] font-serif flex items-center gap-1">
                  Inspect Swipe-File →
                </span>
              </div>
            </div>
          );
        }))}
      </div>

      {/* Selected Moodboard Visual Canvas */}
      {selectedMb && (
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-6 shadow-2xl">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
                  Active Visual Curation
                </span>
                <span className="text-xs text-[#888]">• {selectedMb.leadReference}</span>
              </div>
              <h3 className="text-2xl font-serif text-[#FDFBF7] mt-1">
                {selectedMb.title}
              </h3>
              <p className="text-xs text-[#A0A0A0] mt-0.5">
                Theme: <strong className="text-[#C5A059] font-serif">{selectedMb.aestheticTheme}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/moodboard/${selectedMb.leadReference.toLowerCase()}`}
                target="_blank"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] rounded-lg text-xs font-serif border border-[#333333] transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                Open Live Client View
              </Link>

              <button
                onClick={() => handleCopyLink(selectedMb)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] rounded-lg text-xs font-serif border border-[#333333] transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Copy Secret Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleSendWhatsAppMoodboard(selectedMb)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 rounded-lg text-xs font-serif border border-emerald-600/40 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch WhatsApp Vault Pass
              </button>
            </div>
          </div>

          {/* Curator's Emotional Note */}
          <div className="p-4 bg-[#141414] rounded-xl border-l-2 border-[#C5A059] text-xs font-serif text-[#D0D0D0] leading-relaxed">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A059] block mb-1">
              Curator's Personal Preface (Client Visible):
            </span>
            “{selectedMb.curatorNote}”
            <div className="mt-1 text-[11px] text-[#777] font-mono">
              — {selectedMb.curatorName}, Founder
            </div>
          </div>

          {/* Visual Grid of Curated Assets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedMb.items.map((item) => (
              <div
                key={item.id}
                className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden group hover:border-[#C5A059]/50 transition-all space-y-3"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-sm text-[#C5A059] border border-white/10">
                    {item.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 pt-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-[#FDFBF7] text-base font-medium group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <div className="text-[11px] text-[#888888] font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    {item.location}
                  </div>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Moodboard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Inspiration Creator
                </span>
                <h3 className="text-lg font-serif text-[#FDFBF7] mt-0.5">
                  Curate New Client Moodboard
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
                const title = (form.elements.namedItem("title") as HTMLInputElement).value;
                const aestheticTheme = (form.elements.namedItem("aestheticTheme") as HTMLInputElement).value;
                const curatorNote = (form.elements.namedItem("curatorNote") as HTMLTextAreaElement).value;

                const newMb: ClientMoodboard = {
                  id: `mb-${Date.now()}`,
                  leadReference: `SV-${Math.floor(1000 + Math.random() * 9000)}-IND`,
                  clientName,
                  passcode: `SOUL-${clientName.split(" ")[0].toUpperCase()}`,
                  title,
                  aestheticTheme,
                  curatorName: "Suraj Uniyal",
                  curatorNote,
                  items: [
                    {
                      id: `mbi-${Date.now()}`,
                      title: "Private Palace Courtyard Candlelight",
                      category: "Architecture & Stays",
                      imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
                      description: "Secluded palatial terrace with private sitar and authentic torchlit ambience.",
                      location: "Rajasthan",
                    },
                  ],
                };

                const updated = [newMb, ...moodboards];
                setMoodboards(updated);
                saveMoodboards(updated);
                setSelectedMb(newMb);
                setShowAddModal(false);
                setSuccessToast("New client inspiration moodboard generated!");
                setTimeout(() => setSuccessToast(""), 4000);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-[#888888] block mb-1">Client Name *</label>
                <input
                  name="clientName"
                  required
                  placeholder="e.g., Ananya Birla"
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[#888888] block mb-1">Moodboard Title *</label>
                <input
                  name="title"
                  required
                  placeholder="e.g., Serenade of the Alleppey Backwaters"
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[#888888] block mb-1">Aesthetic & Emotional Theme *</label>
                <input
                  name="aestheticTheme"
                  required
                  placeholder="e.g., Kettuvallam Wood, Tropical Canals & Ayurvedic Tranquility"
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[#888888] block mb-1">Curator's Personal Note to Client *</label>
                <textarea
                  name="curatorNote"
                  rows={3}
                  required
                  placeholder="Write a warm note introducing the visual story..."
                  className="w-full bg-[#111111] border border-[#333333] rounded-lg p-3 text-[#FDFBF7] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-[#888] hover:text-white rounded-lg text-xs font-serif"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C5A059] text-black font-serif font-medium rounded-lg text-xs uppercase tracking-wider"
                >
                  Generate Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
