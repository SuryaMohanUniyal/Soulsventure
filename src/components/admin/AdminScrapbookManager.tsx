"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PostTripScrapbook,
  INITIAL_SCRAPBOOKS,
  getStoredScrapbooks,
  saveScrapbooks,
} from "@/lib/crmStore";
import {
  Sparkles,
  Camera,
  Star,
  Send,
  Share2,
  Check,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Award,
  Plus,
  Heart,
  Eye,
  MapPin,
  Calendar,
} from "lucide-react";

export function AdminScrapbookManager() {
  const [scrapbooks, setScrapbooks] = useState<PostTripScrapbook[]>([]);
  const [selectedSb, setSelectedSb] = useState<PostTripScrapbook | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  useEffect(() => {
    const list = getStoredScrapbooks();
    setScrapbooks(list);
    if (list.length > 0) setSelectedSb(list[0]);
  }, []);

  const handleCopyLink = (sb: PostTripScrapbook) => {
    const url = `${window.location.origin}/scrapbook/${sb.leadReference.toLowerCase()}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDeployScrapbook = (sb: PostTripScrapbook) => {
    const url = `${window.location.origin}/scrapbook/${sb.leadReference.toLowerCase()}`;
    const msg = encodeURIComponent(
      `Dear ${sb.clientName},\n\n` +
      `Welcome home! We trust you are resting comfortably after your extraordinary journey.\n\n` +
      `Our team and private escorts have curated a private, complimentary Digital Scrapbook capturing the most intimate moments and wildlife sightings of your travels:\n\n` +
      `Your Digital Keepsake: ${url}\n\n` +
      `We have also included a discreet space for your reflections. It was our true honour hosting you.\n\n` +
      `Warmest personal regards,\nSuraj Uniyal & Harsh Sood\nFounders, SoulsVenture Concierge\nDirect: +91 98XXXXXXXX`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
    setSuccessToast(`Keepsake scrapbook deployed via WhatsApp to ${sb.clientName}.`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Camera className="w-3 h-3" />
              Post-Trip Retention & Loyalty Engine
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Automated 3-Day Post-Journey Keepsake & Review Collector
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Post-Trip Digital Scrapbook & Review Collector
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Exquisitely capture memories captured by our on-ground naturalists, deliver branded keepsake photo narratives, and frictionlessly collect 5-star Google reviews.
          </p>
        </div>
      </div>

      {successToast && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Keepsakes Delivered
          </p>
          <div className="text-3xl font-serif text-[#FDFBF7] mt-1.5 font-medium">
            {scrapbooks.length} Active
          </div>
          <p className="text-[11px] text-[#C5A059] mt-1">
            100% opened within 24 hours
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Average Client Rating
          </p>
          <div className="text-3xl font-serif text-emerald-400 mt-1.5 font-medium flex items-center gap-1.5">
            5.0 <Star className="w-5 h-5 fill-emerald-400 text-emerald-400" />
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Flawless hospitality satisfaction
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Google Reviews Prompted
          </p>
          <div className="text-3xl font-serif text-[#C5A059] mt-1.5 font-medium">
            92% Rate
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Direct verified reviews secured
          </p>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Repeat Booking Pitch Due
          </p>
          <div className="text-3xl font-serif text-purple-400 mt-1.5 font-medium">
            In 60 Days
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-1">
            Automated handoff to Anniversary Radar
          </p>
        </div>
      </div>

      {/* Selected Scrapbook Showcase */}
      {selectedSb ? (
        <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-6 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
                  Post-Journey Keepsake Dossier
                </span>
                <span className="text-xs text-[#888]">• Ref: {selectedSb.leadReference}</span>
              </div>
              <h3 className="text-2xl font-serif text-[#FDFBF7] mt-1">
                {selectedSb.clientName}
              </h3>
              <p className="text-xs text-[#A0A0A0] mt-0.5">
                Trip: <strong className="text-[#C5A059] font-serif">{selectedSb.itineraryTitle}</strong> ({selectedSb.travelDates})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/scrapbook/${selectedSb.leadReference.toLowerCase()}`}
                target="_blank"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] rounded-lg text-xs font-serif border border-[#333333] transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                Preview Client Keepsake
              </Link>

              <button
                onClick={() => handleCopyLink(selectedSb)}
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
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDeployScrapbook(selectedSb)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 rounded-lg text-xs font-serif border border-emerald-600/40 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Deploy via WhatsApp
              </button>
            </div>
          </div>

          {/* Captured Memories Gallery */}
          <div className="space-y-3">
            <h4 className="font-serif text-[#FDFBF7] text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              Captured Moments & Wildlife Sightings:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSb.memories.map((mem) => (
                <div
                  key={mem.id}
                  className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden group space-y-3"
                >
                  <div className="h-52 w-full overflow-hidden bg-neutral-900 relative">
                    <img
                      src={mem.imageUrl}
                      alt={mem.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded text-[10px] font-mono bg-black/75 backdrop-blur-sm text-[#FDFBF7] border border-white/10 flex items-center gap-2">
                      <span>{mem.date}</span>
                      <span>•</span>
                      <span className="text-[#C5A059]">{mem.location}</span>
                    </div>
                  </div>

                  <div className="p-4 pt-1 space-y-1">
                    <h5 className="font-serif text-[#FDFBF7] text-base font-medium">
                      {mem.caption}
                    </h5>
                    <p className="text-xs text-[#A0A0A0] italic font-serif">
                      “{mem.curatorMemory}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Feedback & Testimonial Box */}
          {selectedSb.feedback && (
            <div className="p-6 bg-[#141414] rounded-xl border border-[#C5A059]/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                    Verified Post-Trip Feedback Collected
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                  <span className="text-xs font-mono text-[#FDFBF7] ml-1">5.0 / 5.0</span>
                </div>
              </div>

              <blockquote className="text-sm font-serif italic text-[#FDFBF7] leading-relaxed">
                “{selectedSb.feedback.testimonialQuote}”
              </blockquote>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#888888] font-mono pt-2 border-t border-[#222222]">
                <div className="flex items-center gap-4">
                  <span>Hotel Standards: <strong className="text-[#FDFBF7]">5/5</strong></span>
                  <span>Concierge Attention: <strong className="text-[#FDFBF7]">5/5</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3" />
                    Google Business Review Submitted
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-16 text-center bg-[#181818] border border-[#262626] rounded-xl text-[#71717A] text-xs space-y-2">
          <Camera className="w-8 h-8 text-[#C5A059]/40 mx-auto" />
          <p className="font-serif text-sm text-[#FDFBF7]">No Completed Journey Keepsakes Yet</p>
          <p className="text-[#71717A] max-w-md mx-auto">
            When returning guests conclude their travels, automated post-trip digital scrapbooks and Google Review invitations will appear here for one-click WhatsApp dispatch.
          </p>
        </div>
      )}
    </div>
  );
}
