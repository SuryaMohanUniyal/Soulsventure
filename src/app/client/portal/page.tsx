"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  FileText,
  Hotel,
  Car,
  Utensils,
  Printer,
  ChevronRight,
  Heart,
  CheckCircle2,
  Lock,
  AlertCircle,
  ArrowRight,
  User,
  Eye,
  Check,
} from "lucide-react";
import {
  ClientAccount,
  getClientAuthSession,
  INITIAL_CLIENT_ACCOUNTS,
  getStoredClientDocuments,
  ClientDocumentVaultItem,
  BespokeItineraryDay,
  CRMLead,
  getStoredLeads,
  fetchCloudLeads,
  isLeadDepositConfirmed,
} from "@/lib/crmStore";

// Master Luxury 5-Day Itinerary Template
const MASTER_TRIP_DAYS: BespokeItineraryDay[] = [
  {
    dayNumber: 1,
    title: "Royal Arrival & Private Shikara onto Lake Pichola",
    location: "Udaipur, Rajasthan",
    accommodation: {
      name: "The Oberoi Udaivilas",
      roomType: "Kohinoor Lake View Suite with Private Pool",
      checkInTime: "14:00 VIP Expedited",
    },
    fleetVehicle: {
      model: "Mercedes-Maybach S-Class",
      chauffeur: "Vikram Singh (Senior Royal Chauffeur)",
    },
    highlights: [
      "Private tarmac greeter and champagne convoy transfer from Udaipur airport",
      "Ceremonial royal welcome at jetty with Aarti, Tikka, and rose petal shower",
      "Sunset private solar boat cruise with private sitar maestro aboard Lake Pichola",
    ],
    dining: {
      breakfast: "Royal High Tea at Chandni Courtyard",
      lunch: "Artisanal Mewari Degustation at Udaimahal",
      dinner: "Private Candlelight Lakeside Dining with Curated Vintage Champagnes",
    },
    insiderSecret: "Titular royal family private courtyard open for evening walk before public lighting.",
  },
  {
    dayNumber: 2,
    title: "Exclusive City Palace After-Hours & Royal Armoury Access",
    location: "Udaipur, Rajasthan",
    accommodation: {
      name: "The Oberoi Udaivilas",
      roomType: "Kohinoor Lake View Suite with Private Pool",
    },
    fleetVehicle: {
      model: "Vintage 1938 Rolls-Royce Ceremonial Fleet",
      chauffeur: "Ranveer Rathore",
    },
    highlights: [
      "Private keys to the 300-year-old Zenana Mahal before public opening gates",
      "Curated historical walkthrough led by Dr. Mathur (Senior ASI Royal Historian)",
      "Private gem & antique miniature painting consultation at exclusive royal atelier",
    ],
    dining: {
      breakfast: "Champagne Breakfast on Private Terrace Overlooking Jag Mandir",
      lunch: "Fresh Lake Breeze Al Fresco Dining at The Promenade",
      dinner: "14-Course Royal Rajasthani Banquet with Heirloom Saffron Recipes",
    },
    insiderSecret: "Private access to the Crystal Gallery with zero crowd presence permitted.",
  },
  {
    dayNumber: 3,
    title: "Scenic Overland Safari to SUJÁN JAWAI & Sunset Leopard Tracking",
    location: "Jawai Wilderness, Rajasthan",
    accommodation: {
      name: "SUJÁN JAWAI",
      roomType: "Royal Tented Pavilion with Private Butler",
    },
    fleetVehicle: {
      model: "Custom Open-Top Land Rover Defender 4WD Safari Spec",
      chauffeur: "Lead Naturalist Salim & Chauffeur Bhati",
    },
    highlights: [
      "Chauffeured luxury 4x4 convoy transfer across picturesque Aravali foothills into Jawai",
      "Afternoon safari tracking wild apex leopards basking upon prehistoric granite boulders",
      "Sunset sundowners atop granite kopjes with pastoral Rabari herdsmen elders",
    ],
    dining: {
      breakfast: "Bush Camp Breakfast under Ancient Neem Trees",
      lunch: "Farm-to-Table Organic Garden Pavilion Lunch",
      dinner: "Fireside Lantern Dinner under Starry Skies with Live Folk Manganiyar Troupe",
    },
    insiderSecret: "Rabari tribal elder shares ancient folklore around campfire regarding coexistence with leopards.",
  },
  {
    dayNumber: 4,
    title: "Overland Mountain Journey into Leh & Indus Valley Acclimatization",
    location: "Leh, Ladakh",
    accommodation: {
      name: "Chamba Camp Thiksey (TUTC)",
      roomType: "Luxury Heated Colonial Tented Suite with Supplemental O2",
    },
    fleetVehicle: {
      model: "Land Rover Defender 110 4WD (Mountain Spec)",
      chauffeur: "Tenzin Norbu",
    },
    highlights: [
      "Private landing at Kushok Bakula Airport with white silk ceremonial Khata scarf welcome",
      "Gentle acclimatization protocol with in-suite herbal infusions overseen by expedition doctor",
      "Evening serene monastery view from private heated verandah under the Milky Way",
    ],
    dining: {
      breakfast: "Alpine Breakfast at Jawai Bush Camp",
      lunch: "Light Organic Tsampa and Himalayan Broth at Thiksey",
      dinner: "Gourmet Tented Dining with Heated Ceramic Stones & French Bordeaux",
    },
    insiderSecret: "Private doctor monitors SpO2 levels ensuring effortless high-altitude comfort.",
  },
  {
    dayNumber: 5,
    title: "Private Chopper Crossing of Khardung La into Nubra Valley",
    location: "Nubra Valley, Ladakh",
    accommodation: {
      name: "The Kyagar Luxury Lodge",
      roomType: "Grand Valley Suite with Geothermal Underfloor Heating",
    },
    fleetVehicle: {
      model: "Airbus H130 Mountain Helicopter",
      chauffeur: "Capt. Roy (Aviation Commander)",
    },
    highlights: [
      "30-minute aerial crossing of Khardung La (18,380 ft) by twin-engine Airbus helicopter",
      "Private Bactrian double-humped camel trek along silver sand dunes of Hunder",
      "Dark-sky stargazing session with Celestron high-powered telescope and astrophysicist",
    ],
    dining: {
      breakfast: "Sunrise Breakfast on Monastery Rooftop",
      lunch: "Silk Route Oasis Picnic under Apricot Orchards",
      dinner: "Traditional Central Asian Clay Oven Feast with Artisanal Cheese",
    },
    insiderSecret: "Zero light pollution allows viewing the Andromeda Galaxy with optical binoculars.",
  },
];

export default function ClientPortalDashboard() {
  const [client, setClient] = useState<ClientAccount>(INITIAL_CLIENT_ACCOUNTS[0]);
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [selectedLeadRef, setSelectedLeadRef] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"itinerary" | "vault" | "nuances" | "history">("itinerary");
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [documents, setDocuments] = useState<ClientDocumentVaultItem[]>(() => getStoredClientDocuments());
  const [viewingDoc, setViewingDoc] = useState<ClientDocumentVaultItem | null>(null);
  const [nuanceUpdateToast, setNuanceUpdateToast] = useState("");
  const [customRequestText, setCustomRequestText] = useState("");

  // Sync client session & all CRM leads (local + cloud)
  useEffect(() => {
    const session = getClientAuthSession();
    if (session) {
      setClient(session);
    }

    const loadLeadsData = async () => {
      const local = getStoredLeads();
      setLeads(local);

      try {
        const cloud = await fetchCloudLeads();
        if (cloud && cloud.length > 0) {
          setLeads(cloud);
        }
      } catch (err) {
        console.warn("Cloud leads sync deferred:", err);
      }
    };

    loadLeadsData();

    // Listen for storage events (e.g., when Admin changes lead status in another tab)
    const handleStorageChange = () => {
      const s = getClientAuthSession();
      if (s) setClient(s);
      setLeads(getStoredLeads());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Normalize phone and email for reliable matching
  const clientPhoneClean = useMemo(() => {
    return client?.phone ? client.phone.replace(/[^0-9]/g, "") : "";
  }, [client?.phone]);

  const clientEmailNorm = useMemo(() => {
    return client?.email ? client.email.trim().toLowerCase() : "";
  }, [client?.email]);

  // Find all queries/leads matching this client
  const clientLeads = useMemo(() => {
    return leads.filter((l) => {
      if (client?.activeTripRef && l.referenceCode === client.activeTripRef) return true;
      if (clientEmailNorm && l.email && l.email.trim().toLowerCase() === clientEmailNorm) return true;
      if (clientPhoneClean.length >= 6 && l.phone) {
        const leadPhoneClean = l.phone.replace(/[^0-9]/g, "");
        if (leadPhoneClean.endsWith(clientPhoneClean) || clientPhoneClean.endsWith(leadPhoneClean)) return true;
      }
      return false;
    });
  }, [leads, client?.activeTripRef, clientEmailNorm, clientPhoneClean]);

  // Active query/lead: prioritize user selection, then confirmed leads, then first lead
  const activeLead = useMemo(() => {
    if (selectedLeadRef) {
      const selected = clientLeads.find((l) => l.referenceCode === selectedLeadRef);
      if (selected) return selected;
    }
    const confirmed = clientLeads.find((l) => isLeadDepositConfirmed(l, client));
    return confirmed || clientLeads[0] || null;
  }, [clientLeads, selectedLeadRef, client]);

  // Deposit Confirmation Flag: query MUST have deposit confirmed to unlock active trip
  const isDepositConfirmed = useMemo(() => {
    return isLeadDepositConfirmed(activeLead, client);
  }, [activeLead, client]);

  // Handcrafted Itinerary Days (custom from proposal if created by curator, else master luxury 5-day template)
  const tripDays: BespokeItineraryDay[] = useMemo(() => {
    if (activeLead?.proposalDays && activeLead.proposalDays.length > 0) {
      return activeLead.proposalDays;
    }
    return MASTER_TRIP_DAYS;
  }, [activeLead?.proposalDays]);

  const currentDay = tripDays[selectedDayNum - 1] || tripDays[0];

  const handleSendNuanceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRequestText.trim()) return;
    setNuanceUpdateToast(
      `Your request has been dispatched directly to ${client.assignedCurator || "Founders Desk"} (Suraj Uniyal & Harsh Sood). Confirmation will follow via WhatsApp shortly.`
    );
    setCustomRequestText("");
    setTimeout(() => setNuanceUpdateToast(""), 5000);
  };

  const currentTripRef = activeLead?.referenceCode || client.activeTripRef || "SV-BESPOKE";

  const whatsappConciergeUrl = `https://wa.me/918126357353?text=${encodeURIComponent(
    isDepositConfirmed
      ? `Hello Suraj & Harsh, this is ${client.name} (Ref: ${currentTripRef}). I am reviewing my confirmed itinerary in the Member Portal and have a concierge request.`
      : `Hello Suraj & Harsh, this is ${client.name} (Ref: ${currentTripRef}). I am reviewing my bespoke query in the Client Portal and would like to confirm my booking deposit.`
  )}`;

  return (
    <div className="space-y-6">
      {/* Multi-Query Switcher Bar (if client has submitted multiple enquiries) */}
      {clientLeads.length > 1 && (
        <div className="p-3 bg-[#171717] rounded-xl border border-[#282828] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#71717A]">
              Your Travel Queries ({clientLeads.length}):
            </span>
          </div>

          <div className="flex items-center gap-2">
            {clientLeads.map((leadItem) => {
              const leadConfirmed = isLeadDepositConfirmed(leadItem, client);
              const isSelected = activeLead?.referenceCode === leadItem.referenceCode;
              return (
                <button
                  key={leadItem.referenceCode}
                  onClick={() => setSelectedLeadRef(leadItem.referenceCode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? leadConfirmed
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-600 shadow font-semibold"
                        : "bg-amber-950 text-amber-300 border border-amber-600 shadow font-semibold"
                      : "bg-[#202020] text-[#888888] border border-[#2E2E2E] hover:text-[#FDFBF7]"
                  }`}
                >
                  <span className="font-semibold">{leadItem.referenceCode}</span>
                  <span className="text-[10px] text-[#A1A1AA]">• {leadItem.destinationSummary}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                      leadConfirmed
                        ? "bg-emerald-900/80 text-emerald-200"
                        : "bg-amber-900/80 text-amber-200"
                    }`}
                  >
                    {leadConfirmed ? "Deposit Confirmed ✓" : "Deposit Pending ⏳"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Welcome Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-10 border border-[#2E2E2E] bg-gradient-to-r from-[#171717] via-[#1A1A1A] to-[#141414] shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {isDepositConfirmed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  Confirmed Bespoke Journey (Deposit Verified)
                </span>
              ) : activeLead ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-700/60 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Query Received • Deposit Confirmation Pending
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  SoulsVenture VIP Member Suite
                </span>
              )}

              <span className="text-xs font-mono text-[#A1A1AA] bg-[#222222] px-2.5 py-1 rounded-md border border-[#333333]">
                Ref: {currentTripRef}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl text-[#FDFBF7] tracking-wide">
              {isDepositConfirmed ? `Welcome back, ${client.name}` : `Welcome, ${client.name}`}
            </h1>

            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-2xl leading-relaxed">
              {isDepositConfirmed ? (
                <>
                  Your handcrafted private journey across{" "}
                  <span className="text-[#FDFBF7] font-medium">
                    {activeLead?.destinationSummary || "Rajasthan & Ladakh"}
                  </span>{" "}
                  is confirmed and actively coordinated by our founders. All palace suites, dedicated chauffeur fleets, and private royal guides are locked in.
                </>
              ) : activeLead ? (
                <>
                  Your bespoke luxury travel commission is currently under active choreography at the SoulsVenture Founders Desk{" "}
                  <span className="text-[#FDFBF7] font-medium">(Suraj Uniyal & Harsh Sood)</span>. Your complete personalized day-by-day itinerary, 5-star palace vouchers, and dedicated chauffeur passes will unlock in this portal immediately upon{" "}
                  <span className="text-amber-300 font-semibold underline underline-offset-2">booking deposit confirmation</span>.
                </>
              ) : (
                <>
                  Your private member suite is active. You currently have no open travel queries. Tap{" "}
                  <Link href="/enquire" className="text-[#C5A059] underline underline-offset-2 font-medium">
                    Begin Bespoke Enquiry
                  </Link>{" "}
                  to start planning your next private palace or Himalayan journey with our founders.
                </>
              )}
            </p>
          </div>

          {/* Quick Curator Contact Card */}
          <div className="p-4 bg-[#1F1F1F] rounded-xl border border-[#333333] space-y-2 flex-shrink-0 lg:w-72 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold">
                Lead Concierge Director
              </span>
              <span
                className={`text-[10px] font-mono flex items-center gap-1 ${
                  isDepositConfirmed ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isDepositConfirmed ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                {isDepositConfirmed ? "Active on Standby" : "Curation Active"}
              </span>
            </div>

            <div className="font-serif text-sm font-semibold text-[#FDFBF7]">
              {activeLead?.assignedCurator || client.assignedCurator || "Suraj Uniyal & Harsh Sood"}
            </div>

            <a
              href={whatsappConciergeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold text-xs transition-all shadow cursor-pointer text-center ${
                isDepositConfirmed
                  ? "bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300"
                  : "bg-[#C5A059] hover:bg-[#D4AF37] text-black"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isDepositConfirmed ? "Direct WhatsApp Line" : "Confirm Deposit on WhatsApp"}</span>
            </a>
          </div>
        </div>
      </div>

      {nuanceUpdateToast && (
        <div className="p-3.5 bg-emerald-950/70 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{nuanceUpdateToast}</span>
        </div>
      )}

      {/* Query Status & Deposit Pending Card (Shown prominently when deposit is not yet confirmed) */}
      {!isDepositConfirmed && activeLead && (
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#1C1710] via-[#1A1A1A] to-[#161616] rounded-2xl border-2 border-[#C5A059]/40 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2E281F] pb-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                QUERY RECEIVED & IN PROGRESS
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] mt-1">
                Your Bespoke Journey is Awaiting Booking Deposit Confirmation
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1 max-w-2xl">
                Securing luxury palace suites (The Oberoi Udaivilas, Taj Lake Palace, SUJÁN) and dedicated chauffeur fleet requires booking deposit confirmation. Once verified, your full day-by-day plan, hotel vouchers, and assigned fleet credentials will unlock immediately.
              </p>
            </div>

            <a
              href={whatsappConciergeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-serif font-bold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm Deposit Now</span>
            </a>
          </div>

          {/* 2-Column: Left Query Summary | Right 4-Step Milestone Stepper */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Query Summary */}
            <div className="p-5 bg-[#141414] rounded-xl border border-[#2E2E2E] space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#71717A] block">
                Submitted Query Summary
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#71717A] block text-[11px]">Reference Code:</span>
                  <span className="font-mono text-[#FDFBF7] font-semibold">{activeLead.referenceCode}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[11px]">Destination(s):</span>
                  <span className="text-[#C5A059] font-medium">{activeLead.destinationSummary}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[11px]">Travel Window:</span>
                  <span className="text-[#FDFBF7]">{activeLead.travelWindow || "Upcoming Season"}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[11px]">Duration:</span>
                  <span className="text-[#FDFBF7]">{activeLead.duration || "7 to 10 Days"}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[11px]">Party / Companions:</span>
                  <span className="text-[#FDFBF7]">{activeLead.companions || "Private Travellers"}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[11px]">Investment Tier:</span>
                  <span className="text-emerald-400 font-medium">{activeLead.budgetTier}</span>
                </div>
              </div>

              {activeLead.specialRequests && (
                <div className="pt-2 border-t border-[#242424] text-xs">
                  <span className="text-[#71717A] block text-[11px]">Special Notes:</span>
                  <p className="text-[#D4D4D8] italic text-[11px] mt-0.5">&ldquo;{activeLead.specialRequests}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Right: 4-Step Milestone Stepper */}
            <div className="p-5 bg-[#141414] rounded-xl border border-[#2E2E2E] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#71717A] block">
                  Bespoke Journey Activation Tracker
                </span>
                <span className="text-[10px] text-amber-400 font-mono">Stage 2 of 4 Active</span>
              </div>

              <div className="space-y-2.5">
                {/* Step 1 */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-emerald-950/30 border border-emerald-900/50">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-black flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-emerald-300 block">Step 1: Consultation Query Received</span>
                    <span className="text-[11px] text-[#A1A1AA]">
                      Enquiry logged on {new Date(activeLead.createdAt).toLocaleDateString("en-IN")}. Curators assigned.
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-amber-950/40 border border-amber-900/60">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 animate-pulse">
                    ●
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-amber-300 block">
                      Step 2: Founders Curation & Bespoke Proposal (Active)
                    </span>
                    <span className="text-[11px] text-[#A1A1AA]">
                      Founders reviewing palace suite availability and luxury convoy routing.
                    </span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-[#1E1912] border border-[#C5A059]/40">
                  <div className="w-5 h-5 rounded-full bg-[#C5A059]/30 text-[#C5A059] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ⏳
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-[#C5A059] block">
                      Step 3: Advance Booking Deposit (Required to Unlock Portal)
                    </span>
                    <span className="text-[11px] text-[#A1A1AA]">
                      Once advance deposit is confirmed, your customized itinerary & palace vouchers go live.
                    </span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-[#161616] border border-[#262626] opacity-60">
                  <div className="w-5 h-5 rounded-full bg-[#2A2A2A] text-[#71717A] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    🔒
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-[#888888] block">
                      Step 4: Confirmed Bespoke Journey & Official Vouchers
                    </span>
                    <span className="text-[11px] text-[#71717A]">
                      Full day-by-day sightseeing, private aircraft passes, and concierge tracking unlocked.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#242424] pb-2 overflow-x-auto scrollbar-none">
        {[
          {
            id: "itinerary" as const,
            label: isDepositConfirmed ? "Day-by-Day Schedule" : "Day-by-Day Schedule (Locked 🔒)",
            icon: isDepositConfirmed ? Calendar : Lock,
          },
          {
            id: "vault" as const,
            label: isDepositConfirmed ? "Digital Document Vault" : "Digital Document Vault (Locked 🔒)",
            icon: isDepositConfirmed ? FileText : ShieldCheck,
            badge: isDepositConfirmed ? `${documents.length} Files` : "Locked",
          },
          {
            id: "nuances" as const,
            label: "VIP Preferences & Nuances",
            icon: Heart,
            badge: "Open for Input",
          },
          {
            id: "history" as const,
            label: "Travel History & Milestones",
            icon: Compass,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-serif transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/20"
                  : "bg-[#181818] text-[#888888] hover:text-[#FDFBF7] hover:bg-[#202020] border border-[#262626]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? "bg-black text-[#C5A059]" : "bg-[#252525] text-[#A1A1AA]"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Day-by-Day Schedule */}
      {activeTab === "itinerary" && (
        <div className="space-y-6">
          {isDepositConfirmed ? (
            /* UNLOCKED ITINERARY FOR CONFIRMED DEPOSIT */
            <>
              {/* Day Selector Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {tripDays.map((d) => (
                  <button
                    key={d.dayNumber}
                    onClick={() => setSelectedDayNum(d.dayNumber)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-serif whitespace-nowrap transition-all cursor-pointer ${
                      selectedDayNum === d.dayNumber
                        ? "bg-[#1E1E1E] text-[#FDFBF7] font-bold border-[#C5A059] shadow-md shadow-[#C5A059]/10"
                        : "bg-[#161616] border-[#262626] text-[#71717A] hover:text-[#FDFBF7]"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center text-[10px] font-bold">
                      {d.dayNumber}
                    </span>
                    <span>Day {d.dayNumber}</span>
                    <span className="text-[10px] text-[#A1A1AA] font-sans">
                      ({d.location.split(",")[0]})
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Day Showcase Card */}
              <div className="p-6 sm:p-8 bg-[#161616] rounded-2xl border border-[#282828] space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242424] pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                      Day {currentDay.dayNumber} of {tripDays.length}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] mt-0.5">
                      {currentDay.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] font-mono bg-[#202020] px-3 py-1.5 rounded-lg border border-[#333333]">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    {currentDay.location}
                  </span>
                </div>

                {/* 3 Pillars: Stay, Fleet Vehicle, Dining */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Accommodation */}
                  <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#2A2A2A] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                      <Hotel className="w-4 h-4" />
                      <span>5-Star Sanctuary / Palace</span>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[#FDFBF7]">
                      {currentDay.accommodation.name}
                    </h4>
                    <p className="text-xs text-[#A1A1AA]">
                      {currentDay.accommodation.roomType}
                    </p>
                    {currentDay.accommodation.checkInTime && (
                      <span className="text-[10px] font-mono text-[#71717A] block pt-1">
                        Check-in: {currentDay.accommodation.checkInTime}
                      </span>
                    )}
                  </div>

                  {/* Vehicle & Chauffeur */}
                  <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#2A2A2A] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                      <Car className="w-4 h-4" />
                      <span>Assigned Fleet & Chauffeur</span>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[#FDFBF7]">
                      {currentDay.fleetVehicle.model}
                    </h4>
                    <p className="text-xs text-[#A1A1AA]">
                      Chauffeur: {currentDay.fleetVehicle.chauffeur}
                    </p>
                    <span className="text-[10px] text-emerald-400 font-mono block pt-1">
                      ✓ Dedicated 24/7 Vehicle & Fuel Inclusive
                    </span>
                  </div>

                  {/* Gourmet Dining */}
                  <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#2A2A2A] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                      <Utensils className="w-4 h-4" />
                      <span>Pre-Curated Gourmet Dining</span>
                    </div>
                    <div className="text-xs space-y-1 text-[#D4D4D8]">
                      <p>• <strong className="text-[#A1A1AA]">High Tea:</strong> {currentDay.dining.breakfast}</p>
                      <p>• <strong className="text-[#A1A1AA]">Lunch:</strong> {currentDay.dining.lunch}</p>
                      <p>• <strong className="text-[#C5A059]">Dinner:</strong> {currentDay.dining.dinner}</p>
                    </div>
                  </div>
                </div>

                {/* Day Highlights */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> Handcrafted Day Excursions
                  </h4>
                  <div className="space-y-2 pl-3 border-l-2 border-[#C5A059]/40">
                    {currentDay.highlights.map((h, i) => (
                      <p key={i} className="text-xs text-[#D4D4D8] leading-relaxed">
                        • {h}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Insider Secret */}
                {currentDay.insiderSecret && (
                  <div className="p-3.5 bg-[#1C1C1C] rounded-xl border border-[#333333] flex items-start gap-2.5 text-xs text-[#A1A1AA]">
                    <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#C5A059] block">
                        Curator&apos;s Special Privileged Access
                      </span>
                      <p className="italic text-[#FDFBF7] mt-0.5">{currentDay.insiderSecret}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* LOCKED ITINERARY STATE (Awaiting Deposit Confirmation) */
            <div className="p-8 sm:p-12 bg-[#161616] rounded-2xl border-2 border-[#2E281F] text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center mx-auto text-[#C5A059] shadow-lg shadow-[#C5A059]/10">
                <Lock className="w-8 h-8" />
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  HANDCRAFTED ITINERARY LOCKED
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
                  Day-by-Day Schedule Unlocks Upon Deposit Confirmation
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  Your personalized day-by-day itinerary, assigned luxury fleet vehicle (Mercedes-Maybach / Land Rover Defender), dedicated royal chauffeur, and executive chef menus will unlock in your member portal immediately upon booking deposit confirmation.
                </p>
              </div>

              {/* Blurred Day Preview Teaser */}
              <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 opacity-50 pointer-events-none select-none">
                <div className="p-3 bg-[#1F1F1F] rounded-xl border border-[#333333] text-left">
                  <span className="text-[10px] text-[#C5A059] font-mono">Day 1 Preview</span>
                  <div className="font-serif text-xs text-[#FDFBF7] mt-1">Royal Arrival & Palace Check-In</div>
                  <span className="text-[9px] text-[#71717A] mt-1 block">🔒 Unlocks on Deposit</span>
                </div>
                <div className="p-3 bg-[#1F1F1F] rounded-xl border border-[#333333] text-left">
                  <span className="text-[10px] text-[#C5A059] font-mono">Day 2 Preview</span>
                  <div className="font-serif text-xs text-[#FDFBF7] mt-1">Privileged After-Hours Access</div>
                  <span className="text-[9px] text-[#71717A] mt-1 block">🔒 Unlocks on Deposit</span>
                </div>
                <div className="p-3 bg-[#1F1F1F] rounded-xl border border-[#333333] text-left">
                  <span className="text-[10px] text-[#C5A059] font-mono">Day 3 Preview</span>
                  <div className="font-serif text-xs text-[#FDFBF7] mt-1">Wilderness Flight & Luxury Safari</div>
                  <span className="text-[9px] text-[#71717A] mt-1 block">🔒 Unlocks on Deposit</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappConciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Curator to Confirm Deposit</span>
                </a>

                <button
                  onClick={() => setActiveTab("nuances")}
                  className="px-5 py-3 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] text-xs font-semibold border border-[#333333] transition-colors cursor-pointer"
                >
                  Configure VIP Preferences First ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Digital Document Vault */}
      {activeTab === "vault" && (
        <div className="space-y-6">
          {isDepositConfirmed ? (
            /* UNLOCKED VAULT FOR CONFIRMED DEPOSIT */
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242424] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                    SECURE DIGITAL VAULT
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                    Hotel Vouchers, Chauffeur Passes & Tax Invoices
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    All official travel documents issued for your reservation are encrypted and directly accessible here without needing PDFs over messaging apps.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 bg-[#161616] rounded-xl border border-[#282828] hover:border-[#3A3A3A] transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#222222] text-[#C5A059] border border-[#333333]">
                          {doc.category}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          {doc.status}
                        </span>
                      </div>

                      <h4 className="font-serif text-base text-[#FDFBF7] font-medium leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-[#888888] mt-1.5 leading-relaxed">
                        {doc.details}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#242424] text-xs">
                      <span className="text-[#71717A] text-[11px]">
                        Issued: {doc.issuedDate} by {doc.issuer}
                      </span>

                      <button
                        onClick={() => setViewingDoc(doc)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-[#FDFBF7] font-semibold text-xs border border-[#333333] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>View Voucher</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* LOCKED VAULT (Awaiting Deposit Confirmation) */
            <div className="p-8 sm:p-12 bg-[#161616] rounded-2xl border-2 border-[#2E281F] text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center mx-auto text-[#C5A059] shadow-lg shadow-[#C5A059]/10">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  DIGITAL TRAVEL VAULT LOCKED
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7]">
                  Palace Vouchers & Reservation Passes Issue Post-Deposit
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  Official palace suite reservation vouchers, luxury chauffeur fleet passes, military high-altitude permits, and pro-forma GST tax invoices will be issued and securely stored here immediately upon deposit confirmation.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappConciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Verify Deposit Status via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* Document Viewer Modal */}
          {viewingDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in">
              <div className="w-full max-w-lg bg-[#141414] border border-[#2E2E2E] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#242424] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                      OFFICIAL VOUCHER CONFIRMATION
                    </span>
                    <h3 className="font-serif text-lg text-[#FDFBF7] mt-0.5">
                      {viewingDoc.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setViewingDoc(null)}
                    className="p-1.5 rounded-lg text-[#888888] hover:text-[#FDFBF7] hover:bg-[#202020]"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-3 text-xs">
                  <div className="flex justify-between text-[#888888]">
                    <span>Reference Code:</span>
                    <strong className="font-mono text-[#FDFBF7]">{viewingDoc.referenceCode}</strong>
                  </div>
                  <div className="flex justify-between text-[#888888]">
                    <span>Category:</span>
                    <span className="text-[#C5A059]">{viewingDoc.category}</span>
                  </div>
                  <div className="flex justify-between text-[#888888]">
                    <span>Issuing Authority:</span>
                    <span className="text-[#FDFBF7]">{viewingDoc.issuer}</span>
                  </div>
                  <div className="flex justify-between text-[#888888]">
                    <span>Verification Status:</span>
                    <span className="text-emerald-400 font-semibold">{viewingDoc.status}</span>
                  </div>
                  <div className="pt-2 border-t border-[#242424] text-[#D4D4D8] leading-relaxed">
                    {viewingDoc.details}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save Voucher</span>
                  </button>

                  <button
                    onClick={() => setViewingDoc(null)}
                    className="px-4 py-2 bg-[#222222] hover:bg-[#282828] text-[#FDFBF7] text-xs rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: VIP Preferences & Nuances (Always Open for Client Input) */}
      {activeTab === "nuances" && (
        <div className="space-y-6">
          <div className="p-6 bg-[#161616] rounded-2xl border border-[#282828] space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                  CONFIDENTIAL VIP RECORD
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" /> Always Open for Curation
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7] mt-0.5">
                Your Recorded Preferences & Dietary Nuances
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Executive chefs, palace general managers, and private aviation crews are briefed strictly based on these parameters. You can add or update your nuances anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-2">
                <span className="text-[10px] uppercase text-[#71717A] font-semibold block">
                  Dietary Restrictions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {client.nuances.dietaryRestrictions.map((d, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#242424] text-[#FDFBF7] border border-[#333333]">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-2">
                <span className="text-[10px] uppercase text-[#71717A] font-semibold block">
                  Room Views & Comfort
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {client.nuances.roomPreferences.map((r, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#242424] text-[#FDFBF7] border border-[#333333]">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-2">
                <span className="text-[10px] uppercase text-[#71717A] font-semibold block">
                  Beverage & Champagne
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {client.nuances.beveragePreferences.map((b, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#242424] text-[#FDFBF7] border border-[#333333]">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#282828] space-y-2">
                <span className="text-[10px] uppercase text-[#71717A] font-semibold block">
                  Allocated Fleet Vehicle
                </span>
                <span className="text-xs font-semibold text-[#FDFBF7] block">
                  {client.nuances.vehiclePreference}
                </span>
              </div>
            </div>

            {/* Request Nuance Update Form */}
            <form onSubmit={handleSendNuanceUpdate} className="p-4 bg-[#1B1B1B] rounded-xl border border-[#2A2A2A] space-y-3">
              <span className="text-xs font-semibold text-[#C5A059] block">
                Request an Update or Specific Nuance to Your Curator Desk
              </span>
              <textarea
                rows={2}
                value={customRequestText}
                onChange={(e) => setCustomRequestText(e.target.value)}
                placeholder="e.g. Please arrange an anniversary cake on Day 2 evening, and prefer ground-floor suite overlooking the water..."
                className="w-full bg-[#242424] text-xs text-[#FDFBF7] p-3 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059]"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded-lg cursor-pointer transition-colors"
                >
                  Notify Concierge Director
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: Travel History & Milestones */}
      {activeTab === "history" && (
        <div className="p-6 bg-[#161616] rounded-2xl border border-[#282828] space-y-4">
          <h3 className="font-serif text-xl text-[#FDFBF7]">Expedition Portfolio</h3>
          <p className="text-xs text-[#888888]">
            Historical luxury journeys & registered queries with SoulsVenture Bespoke Journeys.
          </p>

          <div className="space-y-3 pt-2">
            {/* Active / Current Query Milestone */}
            {activeLead && (
              <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#2E281F] flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif font-semibold text-[#FDFBF7] block">
                    {activeLead.destinationSummary} Luxury Expedition
                  </span>
                  <span className="text-[11px] text-[#71717A]">
                    Reference: {activeLead.referenceCode} • Travel Window: {activeLead.travelWindow || "Upcoming"}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded text-[10px] font-semibold border ${
                    isDepositConfirmed
                      ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                      : "bg-amber-950 text-amber-300 border-amber-800"
                  }`}
                >
                  {isDepositConfirmed ? "Deposit Confirmed ✓" : "Deposit Pending ⏳"}
                </span>
              </div>
            )}

            {/* Past Archived Sample Trip */}
            <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#262626] flex items-center justify-between text-xs">
              <div>
                <span className="font-serif font-semibold text-[#FDFBF7] block">
                  Royal Rajasthan & Desert Solitude
                </span>
                <span className="text-[11px] text-[#71717A]">
                  Completed: November 2025 • Udaipur, Jodhpur & Jawai
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-semibold text-[10px] border border-emerald-800">
                Archived in Vault
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
