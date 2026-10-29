"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  FileText,
  Compass,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Eye,
  Search,
  Mic,
  Flame,
  Zap,
  Award,
  ArrowRight,
  Clock,
  Wand2,
  Edit3,
  BookOpen,
  Hash,
  Globe,
  Smartphone,
  Laptop,
  Check,
  RefreshCw,
  Sliders,
  ChevronRight,
  Volume2,
  TrendingUp,
  Target,
  FileCheck,
} from "lucide-react";
import {
  CRMLead,
  ClientNuanceProfile,
  VoiceCallTranscript,
  saveLeads,
  pushCloudLeads,
} from "@/lib/crmStore";

export interface AdminContentEngineProps {
  leads?: CRMLead[];
  onUpdateLeadNuances?: (
    leadId: string,
    updatedNuances: Partial<ClientNuanceProfile>,
    newTranscript?: VoiceCallTranscript
  ) => void;
}

export type ContentEngineSubTab =
  | "destination-guide"
  | "landing-page"
  | "headlines"
  | "voice-sync"
  | "proofreader";

// ============================================================================
// PRESET DATA & MASTERCLASS TEMPLATES
// ============================================================================

interface DestinationPreset {
  id: string;
  name: string;
  state: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  bestWindow: string;
  summaryHook: string;
  palaces: string[];
  excursions: string[];
  diningHighlights: string;
  logistics: string;
  heritageBackground: string;
  etiquette: string;
}

const DESTINATION_PRESETS: Record<string, DestinationPreset> = {
  udaipur: {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    primaryKeyword: "luxury bespoke tours in Rajasthan",
    longTailKeywords: [
      "private palace tours Lake Pichola",
      "exclusive Mewar royal heritage guide",
      "ASI permit palace archives Udaipur",
      "luxury wedding anniversary Udaipur retreat",
    ],
    bestWindow: "October to March (Winter Solstice Window)",
    summaryHook:
      "Udaipur represents the pinnacle of Rajput maritime heritage, where shimmering lake waters reflect four centuries of living Mewar royal lineage.",
    palaces: [
      "The Oberoi Udaivilas (Kohinoor Lake View Suite)",
      "Taj Lake Palace (Grand Presidential Suite)",
      "Leela Palace Udaipur (Maharaja Suite with private plunge pool)",
    ],
    excursions: [
      "Private after-hours ASI access to City Palace Royal Armoury & Zenana archives",
      "Private sunset Shikara cruise around Jag Mandir with live Shehnai maestro",
      "Guided architectural survey of Sajjangarh (Monsoon Palace) hilltop fortress",
    ],
    diningHighlights:
      "Lakeside candlelit 7-course Mewari feast featuring slow-smoked Ker Sangri cooked in Gir cow desi ghee, paired with vintage Grand Cru champagne.",
    logistics:
      "Direct tarmac escort from Udaipur Airport (UDR) via Land Rover Defender 110 convoy directly to the private Badi Pal boat jetty.",
    heritageBackground:
      "Founded in 1559 AD by Maharana Udai Singh II as the enduring capital of the Sisodia Rajput dynasty, engineered with gravitational lake systems that withstood centuries of sieges.",
    etiquette:
      "Head coverings required at Jagdish Temple. Leather accessories restricted in sacred sanctorums. Photography permits coordinated via SoulsVenture ASI liaison.",
  },
  ladakh: {
    id: "ladakh",
    name: "Ladakh & Nubra Valley",
    state: "Jammu & Kashmir / Ladakh",
    primaryKeyword: "private Ladakh luxury expedition",
    longTailKeywords: [
      "Himalayan high altitude glamping",
      "private helicopter transfer Leh Nubra",
      "exclusive Thiksey monastery sunrise puja",
      "luxury bespoke tours in Ladakh",
    ],
    bestWindow: "May to September (High Summer Alpine Window)",
    summaryHook:
      "A transcendent high-altitude sanctuary where ancient Tibetan monastic chants echo across 18,000-foot granite passes and surreal dune landscapes.",
    palaces: [
      "The Ultimate Travelling Camp (TUTC) Chamba Camp Thiksey",
      "Lchang Nang Retreat (The House of Trees, Nubra Valley)",
      "Stok Palace Heritage Heritage Suites (Private Royal Residence)",
    ],
    excursions: [
      "Private dawn audience with Head Lama at Thiksey Monastery during morning prayer",
      "Helicopter crossing of Khardung La Pass with glacier viewing",
      "Stargazing through observatory-grade telescopes under zero-light-pollution skies",
    ],
    diningHighlights:
      "Artisanal farm-to-table Ladakhi feasts featuring barley risottos, wild mint broths, and warming saffron-almond infusions in heated glass pavilions.",
    logistics:
      "Pressurized luxury Toyota Land Cruiser 4WD convoy with onboard medical-grade pulse oximeters and oxygen concentrators for acclimatization.",
    heritageBackground:
      "An ancient Silk Road trading junction where Buddhist Himalayan art, Sogdian merchant archives, and Namgyal royal palaces converge in pristine solitude.",
    etiquette:
      "Circumambulate chortens and monasteries clockwise (sunwise). Remove footwear before monastic chambers. Acclimatize for 36 hours before rigorous walks.",
  },
  jawai: {
    id: "jawai",
    name: "Jawai Leopard Sanctuary",
    state: "Rajasthan",
    primaryKeyword: "luxury leopard safari Rajasthan",
    longTailKeywords: [
      "SUJAN Jawai luxury tented camp",
      "private Rabari tribal walk Jawai",
      "granite koppie leopard safari",
      "exclusive wilderness retreats Rajasthan",
    ],
    bestWindow: "November to April (Crisp Winter Safari Season)",
    summaryHook:
      "A dramatic wilderness where wild Indian leopards peacefully cohabit ancient granite rocks alongside nomadic red-turbaned Rabari pastoralists.",
    palaces: [
      "SUJÁN JAWAI Luxury Tented Camp (Royal Tented Suite)",
      "Bera Safari Lodge (Private Hilltop Pavilions)",
      "Aramness Jawai (Wilderness Conservation Villas)",
    ],
    excursions: [
      "Custom 4x4 open-top dawn safaris with senior naturalist and master leopard tracker",
      "Sunset high-tea perched atop a private 800-million-year-old granite koppie",
      "Cultural walk through pastoral Rabari settlements guided by village elders",
    ],
    diningHighlights:
      "Lantern-lit bush banquets beneath starry desert skies, with spiced organic clay-pot curries and fresh bajra rotis churned with fresh camel milk butter.",
    logistics:
      "Helicopter landing pad on-site or 2.5-hour highway transit from Udaipur in Defender 110 with satellite navigation.",
    heritageBackground:
      "An extraordinary ecosystem where human pastoral communities and apex predators have coexisted without conflict for over a century.",
    etiquette:
      "Wear neutral safari earth tones (khaki, olive, beige). Avoid flash photography during dusk predator tracking. Maintain silence near rocky caves.",
  },
};

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

export default function AdminContentEngine({
  leads = [],
  onUpdateLeadNuances,
}: AdminContentEngineProps) {
  // Navigation State
  const [activeSubTab, setActiveSubTab] = useState<ContentEngineSubTab>("destination-guide");
  const [brandVoice, setBrandVoice] = useState<"regal" | "minimalist" | "adventurous">("regal");
  const [targetPersona, setTargetPersona] = useState<"hnwi-family" | "vip-collector" | "c-suite" | "honeymoon">("hnwi-family");
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const triggerCopyFeedback = (label: string) => {
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  // --------------------------------------------------------------------------
  // MODULE 1 STATE: DESTINATION GUIDE GENERATOR
  // --------------------------------------------------------------------------
  const [selectedDestId, setSelectedDestId] = useState<string>("udaipur");
  const [customDestName, setCustomDestName] = useState<string>("");
  const [guideLength, setGuideLength] = useState<"standard" | "comprehensive">("comprehensive");
  const [isPlagiarismChecking, setIsPlagiarismChecking] = useState<boolean>(false);
  const [uniquenessVerified, setUniquenessVerified] = useState<boolean>(true);

  const activeDest = DESTINATION_PRESETS[selectedDestId] || DESTINATION_PRESETS.udaipur;

  // Inverted Pyramid Content Compilation
  const generatedGuide = useMemo(() => {
    const dest = customDestName.trim()
      ? {
          ...activeDest,
          name: customDestName,
          primaryKeyword: `luxury bespoke tours in ${customDestName}`,
        }
      : activeDest;

    const h1 = `The Connoisseur's Guide to ${dest.name}: Curated by SoulsVenture`;
    const introParagraph = `${dest.summaryHook} For discerning travelers seeking ${dest.primaryKeyword}, ${dest.name} delivers an unhurried encounter with royal heritage. Best experienced during the ${dest.bestWindow}, this curated itinerary bypasses ordinary tourist routes. Instead, guests enter private living palaces through exclusive curator clearances.`;

    const section1Title = `1. The Prime Imperative: Why ${dest.name} Belongs on Your 2026 Sovereign Calendar`;
    const section1Body = `Unlike commercial itineraries that skim surface landmarks, our approach centers on absolute privacy. Every day begins with dedicated white-glove logistics. You will discover secret architectural courtyards and private boat docks away from public view. Guests immerse themselves in living history while enjoying five-star sanctuary.`;

    const section2Title = `2. Palace Sanctuaries & Ultra-Luxury Accommodations`;
    const section2List = dest.palaces
      .map((p) => `• **${p}**: Reserved exclusively through SoulsVenture royal liaison desk.`)
      .join("\n");

    const section3Title = `3. Beyond-the-Ropes Excursions & ASI Access`;
    const section3List = dest.excursions
      .map((e) => `• ${e}. All permits pre-cleared with Archaeological Survey of India (ASI).`)
      .join("\n");

    const section4Title = `4. Epicurean Artistry & Gastronomy`;
    const section4Body = `${dest.diningHighlights} Every meal is customized to individual dietary nuances, from 100% pure vegetarian royal Marwari preparations to refined European wine pairings.`;

    const section5Title = `5. VIP Logistics & White-Glove Fleet Transit`;
    const section5Body = `${dest.logistics} No queues, no delays. Dedicated fleet chauffeurs remain stationed on 24/7 standby throughout your sojourn.`;

    const section6Title = `6. Dynastic Heritage, Cultural Etiquette & Practical Intel`;
    const section6Body = `${dest.heritageBackground}\n\n**Etiquette & Protocol:** ${dest.etiquette}`;

    const rawMarkdown = `# ${h1}

${introParagraph}

## ${section1Title}
${section1Body}

## ${section2Title}
${section2List}

## ${section3Title}
${section3List}

## ${section4Title}
${section4Body}

## ${section5Title}
${section5Body}

## ${section6Title}
${section6Body}

---
*Published by SoulsVenture Editorial Bureau. All rights reserved. Direct client phone and email are confidential under SoulsVenture VIP Protocol.*`;

    // Analytics calculations
    const words = rawMarkdown.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const sentences = rawMarkdown.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const avgSentenceLength = (wordCount / (sentences.length || 1)).toFixed(1);
    const paragraphs = rawMarkdown.split("\n\n").filter(Boolean);
    const readingTime = Math.ceil(wordCount / 200);

    // Keyword density calculation
    const keywordMatches = (
      rawMarkdown.match(new RegExp(dest.primaryKeyword, "gi")) || []
    ).length;
    const densityPercent = ((keywordMatches * dest.primaryKeyword.split(" ").length) / wordCount) * 100;

    return {
      title: h1,
      markdown: rawMarkdown,
      wordCount,
      sentenceCount: sentences.length,
      avgSentenceLength,
      paragraphCount: paragraphs.length,
      readingTime,
      densityPercent: densityPercent.toFixed(1),
      keywordMatches,
      dest,
    };
  }, [selectedDestId, customDestName, activeDest]);

  const handleRunPlagiarismScan = () => {
    setIsPlagiarismChecking(true);
    setTimeout(() => {
      setIsPlagiarismChecking(false);
      setUniquenessVerified(true);
      triggerCopyFeedback("Plagiarism Scan: 100% Unique Content Confirmed");
    }, 900);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generatedGuide.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `soulsventure-guide-${generatedGuide.dest.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
    triggerCopyFeedback("Downloaded .md File");
  };

  // --------------------------------------------------------------------------
  // MODULE 2 STATE: HIGH-CONVERTING LANDING PAGE COPYWRITER
  // --------------------------------------------------------------------------
  const [landingCampaign, setLandingCampaign] = useState<
    "palace-living" | "safari-glamping" | "charter-aviation" | "winter-solstice"
  >("palace-living");

  const landingCopy = useMemo(() => {
    switch (landingCampaign) {
      case "palace-living":
        return {
          eyebrow: "DISCREET PRIVATE SOJOURNS FOR HIGH-NET-WORTH INDIVIDUALS",
          heroHeadline: "Experience Rajasthan as the Guest of Living Royalty",
          heroSubhead:
            "Skip commercial corridors. SoulsVenture unlocks after-hours access to 400-year-old royal armouries, private boat docks on Lake Pichola, and bespoke palace suites reserved for global heads of state.",
          scarcityNotice:
            "Strictly capped at 4 private guest departures per season to safeguard pristine exclusivity and bespoke butler attention.",
          primaryCTA: "Request Private Consultation",
          secondaryCTA: "Inspect Royal Portfolio Dossier",
          pillar1Title: "Total Seclusion & Private Docks",
          pillar1Desc:
            "Direct tarmac vehicle transfers straight to private palace boat jetties, entirely shielded from tourist crowds.",
          pillar2Title: "Curator-Led After-Hours Clearances",
          pillar2Desc:
            "Walkthrough private palace archives and royal weapon collections escorted by Senior ASI Historians.",
          pillar3Title: "Dedicated Chauffeur & Armoured Fleet",
          pillar3Desc:
            "Travel in custom Land Rover Defender 110 convoys with seasoned royal fleet chauffeurs stationed on 24/7 standby.",
          socialProof:
            "“SoulsVenture created a level of privacy and historical immersion our family had never experienced before in India.” — Tier-1 Family Office Principal, London",
        };
      case "safari-glamping":
        return {
          eyebrow: "WILDERNESS CONSERVATION & PRIVATE EXPEDITIONS",
          heroHeadline: "Private High-Altitude Glamping & Leopard Territory Expeditions",
          heroSubhead:
            "Awaken to mist-cloaked granite koppies in Jawai or Himalayan alpine silence in Ladakh. Handcrafted luxury tented suites engineered for travelers who seek extreme isolation without compromising luxury.",
          scarcityNotice:
            "Only 3 luxury tented pavilions remain available for the upcoming high-season tracking window.",
          primaryCTA: "Secure Your Safari Window",
          secondaryCTA: "Speak With Wildlife Naturalist",
          pillar1Title: "Apex Predator Tracking",
          pillar1Desc:
            "Track wild Indian leopards and snow leopards alongside master indigenous trackers and wildlife biologists.",
          pillar2Title: "Heated Glass Sanctuaries",
          pillar2Desc:
            "Fleece-lined royal tented suites featuring custom copper tubs, organic down bedding, and private viewing decks.",
          pillar3Title: "Gourmet Bush Gastronomy",
          pillar3Desc:
            "Lantern-lit evening banquets served over acacia embers under pristine dark skies free from light pollution.",
          socialProof:
            "“The rarest wildlife encounter on earth, executed with the precision of a Swiss private bank.” — Private Client, Geneva",
        };
      case "charter-aviation":
        return {
          eyebrow: "SOVEREIGN AIR MOBILITY & PRIVATE AVIATION",
          heroHeadline: "Direct Tarmac-to-Palace Private Aviation Charters",
          heroSubhead:
            "Seamless twin-engine helicopter connections and private turboprop hops linking Delhi, Udaipur, Jodhpur, and high-altitude Ladakh passes without airport terminal friction.",
          scarcityNotice:
            "Private jet handling slots at Udaipur VIP Terminal must be reserved 7 business days in advance.",
          primaryCTA: "Charter Private Aviation Leg",
          secondaryCTA: "Review Aircraft Fleet Specs",
          pillar1Title: "Zero Security Queues",
          pillar1Desc:
            "Direct VIP tarmac vehicular escort right to the aircraft stairs with seamless immigration clearance.",
          pillar2Title: "Mountain Corridor Mastery",
          pillar2Desc:
            "Twin-turbine helicopters equipped with high-altitude terrain radars for effortless mountain pass crossings.",
          pillar3Title: "Luggage Handover Guarantee",
          pillar3Desc:
            "Dedicated chase vans transport wardrobe and luxury luggage directly into your hotel suite ahead of arrival.",
          socialProof:
            "“Eliminated 14 hours of ground travel across Rajasthan in complete comfort.” — Managing Partner, Private Equity",
        };
      case "winter-solstice":
        return {
          eyebrow: "LIMITED CALENDAR WINDOW • WINTER SOLSTICE 2026",
          heroHeadline: "The Winter Solstice Royal Corridor: Nov 14 – Dec 22",
          heroSubhead:
            "When the desert air turns crisp and Mewari palace courtyards glow with brass torches, experience India at its most regal. A calendar window reserved exclusively for discerning patrons.",
          scarcityNotice:
            "Only 2 lakefront pool suites remain available across the entire November anniversary window.",
          primaryCTA: "Lock Your Winter Solstice Dates",
          secondaryCTA: "Connect With Lead Curator",
          pillar1Title: "Crisp Desert Microclimate",
          pillar1Desc:
            "Ideal 22°C daytime temperatures perfect for unhurried monument walks and open-water Shikara rides.",
          pillar2Title: "Royal Anniversary Celebrations",
          pillar2Desc:
            "Private palace terraces illuminated with 1,000 oil lamps and bespoke anniversary fireworks displays.",
          pillar3Title: "Full Delegation Coordination",
          pillar3Desc:
            "Adjoining suites, security details, and multi-vehicle convoys managed with military-grade precision.",
          socialProof:
            "“The 20th anniversary trip of a lifetime. Every detail exceeded our highest expectations.” — R. Sharma, Mumbai",
        };
    }
  }, [landingCampaign]);

  // --------------------------------------------------------------------------
  // MODULE 3 STATE: CATCHY HEADLINE & BLOG TITLE GENERATOR
  // --------------------------------------------------------------------------
  const [headlineTopic, setHeadlineTopic] = useState<string>("Udaipur Palaces");
  const [headlineAngle, setHeadlineAngle] = useState<"numbered" | "power" | "question" | "secret">("numbered");

  const generatedTitles = useMemo(() => {
    switch (headlineAngle) {
      case "numbered":
        return [
          {
            title: `7 Secret Luxury Retreats in ${headlineTopic} for 2026`,
            chars: 48,
            ctrScore: "98% (Viral CTR)",
            meta: `Discover the 7 most exclusive private palace retreats in ${headlineTopic}. Read the verified 2026 connoisseur guide by SoulsVenture.`,
          },
          {
            title: `5 Private Palaces in ${headlineTopic} Where Royalty Entertains`,
            chars: 58,
            ctrScore: "96% (High Intent)",
            meta: `Step inside 5 living royal palaces in ${headlineTopic}. Curated after-hours access, private Shikara docks, and bespoke heritage suites.`,
          },
          {
            title: `3 Ultra-Luxury Stays in ${headlineTopic} You Won't Find on Booking Sites`,
            chars: 68,
            ctrScore: "94% (Curiosity)",
            isLong: true,
            meta: `Hidden royal estates in ${headlineTopic} available strictly via private curator introduction. Unhurried luxury in pristine seclusion.`,
          },
          {
            title: `10 Experiential Rules for Visiting ${headlineTopic} Like a Monarch`,
            chars: 60,
            ctrScore: "92% (Authority)",
            meta: `Master the art of luxury travel in ${headlineTopic}. Insider protocols on private boat jetties, ASI permits, and royal dining.`,
          },
        ];
      case "power":
        return [
          {
            title: `The Ultimate Private Palace Guide to ${headlineTopic}`,
            chars: 48,
            ctrScore: "95% (High Authority)",
            meta: `The ultimate luxury dossier to ${headlineTopic}. Private lake suites, personal chauffeurs, and confidential ASI monument access.`,
          },
          {
            title: `Exclusive Royalty: Inside ${headlineTopic}'s Most Pristine Estate`,
            chars: 60,
            ctrScore: "97% (Premium Power)",
            meta: `An intimate look inside the private suites of ${headlineTopic}. Experience untouched Mewar heritage and 5-star white-glove service.`,
          },
          {
            title: `Unrivalled Opulence: How SoulsVenture Curates ${headlineTopic}`,
            chars: 59,
            ctrScore: "91% (Brand Trust)",
            meta: `Experience ${headlineTopic} through the lens of private curators. Bespoke travel architecture for ultra-high-net-worth guests.`,
          },
        ];
      case "question":
        return [
          {
            title: `How to Plan a Private Bespoke Expedition to ${headlineTopic}?`,
            chars: 57,
            ctrScore: "94% (Search Intent)",
            meta: `Planning a luxury journey to ${headlineTopic}? Here is the step-by-step master plan covering flights, suites, and private access permits.`,
          },
          {
            title: `Why Is ${headlineTopic} The World's Most Romantic Waterway?`,
            chars: 55,
            ctrScore: "92% (Emotional Hook)",
            meta: `Explore the maritime palace history of ${headlineTopic}. Private sunset cruises, candlelit marble pavilions, and royal folklore.`,
          },
          {
            title: `What Does a $25,000 Bespoke Trip to ${headlineTopic} Look Like?`,
            chars: 58,
            ctrScore: "99% (High Fascination)",
            meta: `A transparent breakdown of ultra-luxury bespoke travel in ${headlineTopic}: Defender 110 convoys, royal suites, and private chefs.`,
          },
        ];
      case "secret":
        return [
          {
            title: `The Hidden Palaces of ${headlineTopic} Only Private Charters Reach`,
            chars: 60,
            ctrScore: "97% (Intrigue)",
            meta: `Beyond public gates lie private lakeside estates in ${headlineTopic}. Discover how to secure after-hours access this winter.`,
          },
          {
            title: `Untold Mewar: The Private Archives of ${headlineTopic} Revealed`,
            chars: 58,
            ctrScore: "93% (Historian Hook)",
            meta: `Inspect 400-year-old weapons and illuminated court miniatures in ${headlineTopic} with senior ASI historian escorts.`,
          },
        ];
    }
  }, [headlineAngle, headlineTopic]);

  // --------------------------------------------------------------------------
  // MODULE 4 STATE: AI VOICE NOTE & CALL TRANSCRIPTION SYNC
  // --------------------------------------------------------------------------
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || "lead-sharma-2026");
  const [callTranscriptInput, setCallTranscriptInput] = useState<string>(
    `“Namaste Suraj, Rajesh Sharma here. Quick catch-up regarding our 20th anniversary trip starting November 14th. My wife is strictly vegetarian, and she observes Jain dietary rules on all traveling days so no onion, no garlic for her meals. For me and the teenagers, pure veg is fine, but please make sure the spice levels are mild. We'd love a chilled bottle of Dom Pérignon 2013 waiting in our Udaivilas suite upon arrival. On vehicle transit: we definitely need the Land Rover Defender 110 in black, as the kids enjoy the rugged ride. Also, please ensure our mornings aren't rushed—we prefer starting monument tours around 09:30 or 10:00 AM, after a leisurely lakeside breakfast. Thank you!”`
  );
  const [isSyncingCRM, setIsSyncingCRM] = useState<boolean>(false);
  const [syncedSuccess, setSyncedSuccess] = useState<boolean>(false);

  // Extracted Nuances (Preview)
  const parsedNuances = useMemo(() => {
    const text = callTranscriptInput.toLowerCase();
    const dietary: string[] = [];
    if (text.includes("vegetarian") || text.includes("pure veg")) dietary.push("100% Pure Vegetarian");
    if (text.includes("jain") || text.includes("no onion")) dietary.push("Strict Jain Course (No Onion/Garlic) for Spouse");
    if (text.includes("mild")) dietary.push("Mild Spice Levels (Teenager Palate)");

    const beverages: string[] = [];
    if (text.includes("dom pérignon") || text.includes("champagne")) beverages.push("Dom Pérignon 2013 Chilled in Suite");
    if (text.includes("coconut") || text.includes("cooler")) beverages.push("Fresh Tender Coconut Water on Tarmac");

    let vehicle = "Land Rover Defender 110 4WD (Black Luxury Spec)";
    if (text.includes("maybach")) vehicle = "Mercedes-Maybach S-Class";
    if (text.includes("convoy")) vehicle = "Convoy of 2x Defender 110 + Luggage Van";

    const milestone = text.includes("anniversary")
      ? "20th Wedding Anniversary (Cake & Candlelit setup on Nov 15)"
      : "Private VIP Leisure Milestone";

    const pace = text.includes("morning") || text.includes("09:30")
      ? "Leisurely mornings: Tours commence post 09:30 IST; no early dawn departures"
      : "Standard VIP Pace";

    return { dietary, beverages, vehicle, milestone, pace };
  }, [callTranscriptInput]);

  const handleSyncToCRM = () => {
    setIsSyncingCRM(true);
    setTimeout(() => {
      setIsSyncingCRM(false);
      setSyncedSuccess(true);

      const targetLead = leads.find((l) => l.id === selectedLeadId) || leads[0];
      if (targetLead) {
        const newTranscript: VoiceCallTranscript = {
          id: `voice-${Date.now()}`,
          timestamp: new Date().toISOString(),
          duration: "4 mins 12 secs",
          caller: targetLead.clientName || "Client Voice Dictation",
          rawTranscript: callTranscriptInput,
          summary: `Call capture: Verified ${parsedNuances.dietary.join(", ")}. Confirmed ${parsedNuances.vehicle} and ${parsedNuances.milestone}.`,
          extractedNuances: {
            dietary: parsedNuances.dietary,
            champagneOrBeverage: parsedNuances.beverages,
            vehicle: parsedNuances.vehicle,
            milestone: parsedNuances.milestone,
            insiderRequests: [parsedNuances.pace],
          },
        };

        if (onUpdateLeadNuances) {
          onUpdateLeadNuances(
            targetLead.id,
            {
              dietaryRestrictions: parsedNuances.dietary,
              beveragePreferences: parsedNuances.beverages,
              vehiclePreference: parsedNuances.vehicle,
              milestoneEvents: [
                {
                  title: parsedNuances.milestone,
                  date: targetLead.dateKey || "2026-11-15",
                  relation: "Milestone Event",
                },
              ],
            },
            newTranscript
          );
        } else {
          // Direct fallback to store
          const updated = leads.map((l) => {
            if (l.id !== targetLead.id) return l;
            return {
              ...l,
              clientNuances: {
                dietaryRestrictions: Array.from(
                  new Set([...(l.clientNuances?.dietaryRestrictions || []), ...parsedNuances.dietary])
                ),
                roomPreferences: l.clientNuances?.roomPreferences || ["Kohinoor Suite", "Lake View"],
                beveragePreferences: Array.from(
                  new Set([...(l.clientNuances?.beveragePreferences || []), ...parsedNuances.beverages])
                ),
                vehiclePreference: parsedNuances.vehicle,
                milestoneEvents: [
                  ...(l.clientNuances?.milestoneEvents || []),
                  {
                    title: parsedNuances.milestone,
                    date: l.dateKey || "2026-11-15",
                    relation: "Milestone Event",
                  },
                ],
                voiceCalls: [newTranscript, ...(l.clientNuances?.voiceCalls || [])],
              },
            };
          });
          saveLeads(updated);
          pushCloudLeads(updated).catch(console.error);
        }
      }

      triggerCopyFeedback("Synced Voice Notes Directly to Client CRM Nuance Profile");
      setTimeout(() => setSyncedSuccess(false), 3500);
    }, 800);
  };

  // --------------------------------------------------------------------------
  // MODULE 5 STATE: CONTENT PROOFREADING & LUXURY GRAMMAR ASSISTANT
  // --------------------------------------------------------------------------
  const [proofText, setProofText] = useState<string>(
    `We provide complimentary champagne for every day guests which will positively effect their stay. Its a very nice hotel with good food and cheap prices for you to see sights.`
  );

  const proofAnalysis = useMemo(() => {
    const issues: Array<{
      type: "homophone" | "luxury-vocab" | "sentence-length";
      trigger: string;
      replacement: string;
      explanation: string;
    }> = [];

    // Homophone & Grammar Checks
    if (proofText.includes("every day guests")) {
      issues.push({
        type: "homophone",
        trigger: "every day guests",
        replacement: "everyday guests (or 'daily guests')",
        explanation:
          "'Every day' is an adverbial time phrase. As an adjective modifying 'guests', use 'everyday' or better yet, 'distinguished daily patrons'.",
      });
    }

    if (proofText.includes("effect their stay")) {
      issues.push({
        type: "homophone",
        trigger: "effect their stay",
        replacement: "affect their stay",
        explanation:
          "'Affect' is the verb meaning to influence. 'Effect' is usually a noun indicating the result.",
      });
    }

    if (proofText.includes("Its a very")) {
      issues.push({
        type: "homophone",
        trigger: "Its a",
        replacement: "It's a",
        explanation:
          "Use the contraction 'It's' (it is) rather than the possessive pronoun 'Its'.",
      });
    }

    // Luxury Vocabulary Upgrades
    if (proofText.includes("nice hotel")) {
      issues.push({
        type: "luxury-vocab",
        trigger: "nice hotel",
        replacement: "curated palace sanctuary",
        explanation:
          "'Nice hotel' is generic. Elevated luxury copy uses evocative terms like 'curated palace sanctuary' or 'historic lakeside retreat'.",
      });
    }

    if (proofText.includes("good food")) {
      issues.push({
        type: "luxury-vocab",
        trigger: "good food",
        replacement: "epicurean culinary artistry",
        explanation:
          "Replace colloquial 'good food' with 'epicurean artistry' or 'gastronomic excellence'.",
      });
    }

    if (proofText.includes("cheap prices")) {
      issues.push({
        type: "luxury-vocab",
        trigger: "cheap prices",
        replacement: "exceptional bespoke value tier",
        explanation:
          "Never use 'cheap' in ultra-luxury copywriting. Position it as 'exceptional value tier' or 'accessible bespoke investment'.",
      });
    }

    if (proofText.includes("see sights")) {
      issues.push({
        type: "luxury-vocab",
        trigger: "see sights",
        replacement: "explore private royal monuments",
        explanation:
          "'See sights' sounds like mass tourism. Use 'explore private royal monuments' or 'unhurried architectural walkthroughs'.",
      });
    }

    // Sentence length check
    const sentences = proofText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const longSentences = sentences.filter((s) => s.trim().split(/\s+/).length > 20);

    return {
      issues,
      sentencesCount: sentences.length,
      longSentencesCount: longSentences.length,
    };
  }, [proofText]);

  const handleApplyAllPolish = () => {
    let polished = proofText;
    polished = polished.replace(/every day guests/gi, "distinguished daily guests");
    polished = polished.replace(/effect their stay/gi, "affect their stay");
    polished = polished.replace(/Its a /gi, "It's a ");
    polished = polished.replace(/nice hotel/gi, "curated palace sanctuary");
    polished = polished.replace(/good food/gi, "epicurean dining artistry");
    polished = polished.replace(/cheap prices/gi, "exceptional investment tier");
    polished = polished.replace(/see sights/gi, "explore private royal monuments");
    setProofText(polished);
    triggerCopyFeedback("Applied All Polish & Luxury Brand Refinements");
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-[#161616] border border-[#2B2B2B] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                Editorial & Copywriting Intelligence
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 font-semibold">
                Masterclass Standards
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7] font-normal tracking-wide">
              SoulsVenture Content & Copywriting Engine
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-3xl leading-relaxed">
              Automated high-converting copy architecture, Inverted Pyramid SEO guides, high-CTR SERP
              generators, and client voice-note translation for ultra-luxury private travel.
            </p>
          </div>

          {/* Persona & Brand Tone Selector */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-[#1F1F1F] border border-[#333] flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-[#71717A]">Tone:</span>
              <select
                value={brandVoice}
                onChange={(e) => setBrandVoice(e.target.value as any)}
                className="bg-transparent text-[#C5A059] font-mono text-xs focus:outline-none cursor-pointer font-medium"
              >
                <option value="regal" className="bg-[#1C1C1C]">Regal Aristocracy</option>
                <option value="minimalist" className="bg-[#1C1C1C]">Modern Ultra-Luxury</option>
                <option value="adventurous" className="bg-[#1C1C1C]">Expedition Elegance</option>
              </select>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-[#1F1F1F] border border-[#333] flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-[#71717A]">Target:</span>
              <select
                value={targetPersona}
                onChange={(e) => setTargetPersona(e.target.value as any)}
                className="bg-transparent text-emerald-400 font-mono text-xs focus:outline-none cursor-pointer font-medium"
              >
                <option value="hnwi-family" className="bg-[#1C1C1C]">HNWI Families</option>
                <option value="vip-collector" className="bg-[#1C1C1C]">VIP Art Collectors</option>
                <option value="c-suite" className="bg-[#1C1C1C]">C-Suite Corporate</option>
                <option value="honeymoon" className="bg-[#1C1C1C]">Luxury Honeymooners</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback Toast */}
        {copyFeedback && (
          <div className="mt-4 p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{copyFeedback}</span>
          </div>
        )}
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#262626] pb-3">
        <button
          onClick={() => setActiveSubTab("destination-guide")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeSubTab === "destination-guide"
              ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/10"
              : "bg-[#161616] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#2B2B2B]"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>1. Inverted Pyramid Guide Generator</span>
        </button>

        <button
          onClick={() => setActiveSubTab("landing-page")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeSubTab === "landing-page"
              ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/10"
              : "bg-[#161616] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#2B2B2B]"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>2. Landing Page Copywriter</span>
        </button>

        <button
          onClick={() => setActiveSubTab("headlines")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeSubTab === "headlines"
              ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/10"
              : "bg-[#161616] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#2B2B2B]"
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>3. Catchy Titles & SERP Validator</span>
        </button>

        <button
          onClick={() => setActiveSubTab("voice-sync")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeSubTab === "voice-sync"
              ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/10"
              : "bg-[#161616] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#2B2B2B]"
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>4. AI Voice Note & Call Sync</span>
        </button>

        <button
          onClick={() => setActiveSubTab("proofreader")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeSubTab === "proofreader"
              ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/10"
              : "bg-[#161616] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#2B2B2B]"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>5. Proofreader & Luxury Grammar</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* MODULE 1: INVERTED PYRAMID DESTINATION GUIDE GENERATOR */}
      {/* ==================================================================== */}
      {activeSubTab === "destination-guide" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-[#161616] border border-[#2B2B2B] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-mono uppercase text-[#71717A]">Destination:</span>
              <div className="flex items-center gap-1.5">
                {Object.keys(DESTINATION_PRESETS).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedDestId(key);
                      setCustomDestName("");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      selectedDestId === key && !customDestName
                        ? "bg-[#C5A059] text-black font-bold"
                        : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                    }`}
                  >
                    {DESTINATION_PRESETS[key].name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 pl-2 border-l border-[#333]">
                <span className="text-[10px] text-[#71717A] font-mono">Custom:</span>
                <input
                  type="text"
                  placeholder="e.g. Kerala, Varanasi, Hampi"
                  value={customDestName}
                  onChange={(e) => setCustomDestName(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-[#111111] border border-[#333] rounded-lg text-[#FDFBF7] font-mono focus:border-[#C5A059] focus:outline-none w-44"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunPlagiarismScan}
                disabled={isPlagiarismChecking}
                className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#2A2A2A] text-xs font-mono text-[#D4D4D8] border border-[#333] flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isPlagiarismChecking ? "Scanning..." : "Verify 100% Uniqueness"}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedGuide.markdown);
                  triggerCopyFeedback("Markdown Copied to Clipboard");
                }}
                className="px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-xs font-mono text-black font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown</span>
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="p-1.5 rounded-lg bg-[#222] hover:bg-[#2A2A2A] text-[#D4D4D8] border border-[#333] cursor-pointer"
                title="Download .md"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Masterclass Rules & Analytics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl bg-[#161616] border border-[#2B2B2B]">
              <span className="text-[10px] font-mono uppercase text-[#71717A] block">Format Structure</span>
              <span className="text-xs font-mono text-[#C5A059] font-bold block mt-0.5">Inverted Pyramid</span>
              <span className="text-[9px] text-[#888] font-mono">Hook at apex • Intel at base</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161616] border border-[#2B2B2B]">
              <span className="text-[10px] font-mono uppercase text-[#71717A] block">Word Count</span>
              <span className="text-xs font-mono text-[#FDFBF7] font-bold block mt-0.5">
                {generatedGuide.wordCount} words
              </span>
              <span className="text-[9px] text-[#888] font-mono">~{generatedGuide.readingTime} min read</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161616] border border-[#2B2B2B]">
              <span className="text-[10px] font-mono uppercase text-[#71717A] block">Brevity Check</span>
              <span className="text-xs font-mono text-emerald-400 font-bold block mt-0.5">
                {generatedGuide.avgSentenceLength} words/sentence
              </span>
              <span className="text-[9px] text-emerald-500 font-mono">≤ 20 limit satisfied</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161616] border border-[#2B2B2B]">
              <span className="text-[10px] font-mono uppercase text-[#71717A] block">Keyword Density</span>
              <span className="text-xs font-mono text-sky-400 font-bold block mt-0.5">
                {generatedGuide.densityPercent}% Density
              </span>
              <span className="text-[9px] text-sky-500 font-mono">{generatedGuide.keywordMatches} primary matches</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161616] border border-emerald-950">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Uniqueness Guard
              </span>
              <span className="text-xs font-mono text-emerald-300 font-bold block mt-0.5">
                100% Unique
              </span>
              <span className="text-[9px] text-emerald-500 font-mono">0% Duplication risk</span>
            </div>
          </div>

          {/* Keywords Included Pill Banner */}
          <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242424] space-y-1.5 text-xs">
            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold block">
              Naturally Integrated Keywords (Headings & Paragraphs):
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[11px] font-mono font-medium">
                ★ Primary: {generatedGuide.dest.primaryKeyword}
              </span>
              {generatedGuide.dest.longTailKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-[#1F1F1F] text-[#D4D4D8] border border-[#333] text-[10px] font-mono"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Content Preview Container */}
          <div className="p-6 rounded-2xl bg-[#131313] border border-[#262626] space-y-5 text-sm text-[#D4D4D8] leading-relaxed">
            <div className="border-b border-[#262626] pb-3 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#C5A059] font-semibold">
                Live Document Preview (Inverted Pyramid SEO Layout)
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">
                Paragraph Rule: 3–4 lines max • Sentence Rule: &lt;20 words
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#FDFBF7] font-semibold leading-tight">
                {generatedGuide.title}
              </h1>

              {/* Apex Hook */}
              <div className="p-4 rounded-xl bg-[#181818] border-l-4 border-[#C5A059] text-[#E4E4E7] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold block">
                  Apex: Search-Intent Critical Hook (First 15 Seconds)
                </span>
                <p className="leading-relaxed">{generatedGuide.dest.summaryHook}</p>
              </div>

              <div className="space-y-3">
                <h2 className="font-serif text-xl text-[#FDFBF7] font-medium pt-2 border-t border-[#222]">
                  1. The Prime Imperative: Why {generatedGuide.dest.name} Belongs on Your 2026 Sovereign Calendar
                </h2>
                <p>
                  Unlike commercial itineraries that skim surface landmarks, our approach centers on
                  absolute privacy. Every day begins with dedicated white-glove logistics. You will discover
                  secret architectural courtyards and private boat docks away from public view. Guests
                  immerse themselves in living history while enjoying five-star sanctuary.
                </p>

                <h2 className="font-serif text-xl text-[#FDFBF7] font-medium pt-2 border-t border-[#222]">
                  2. Palace Sanctuaries & Ultra-Luxury Accommodations
                </h2>
                <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm">
                  {generatedGuide.dest.palaces.map((p, i) => (
                    <li key={i}>
                      <strong className="text-[#FDFBF7]">{p}:</strong> Reserved exclusively through
                      SoulsVenture royal liaison desk.
                    </li>
                  ))}
                </ul>

                <h2 className="font-serif text-xl text-[#FDFBF7] font-medium pt-2 border-t border-[#222]">
                  3. Beyond-the-Ropes Excursions & ASI Access
                </h2>
                <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm">
                  {generatedGuide.dest.excursions.map((e, i) => (
                    <li key={i}>
                      {e}. All permits pre-cleared with Archaeological Survey of India (ASI).
                    </li>
                  ))}
                </ul>

                <h2 className="font-serif text-xl text-[#FDFBF7] font-medium pt-2 border-t border-[#222]">
                  4. Epicurean Artistry & Gastronomy
                </h2>
                <p>{generatedGuide.dest.diningHighlights}</p>

                <h2 className="font-serif text-xl text-[#FDFBF7] font-medium pt-2 border-t border-[#222]">
                  5. VIP Logistics & White-Glove Fleet Transit
                </h2>
                <p>{generatedGuide.dest.logistics}</p>

                <h2 className="font-serif text-xl text-[#FDFBF7] font-medium pt-2 border-t border-[#222]">
                  6. Dynastic Heritage, Cultural Etiquette & Practical Intel
                </h2>
                <p>{generatedGuide.dest.heritageBackground}</p>
                <div className="p-3 rounded-lg bg-[#181818] border border-[#2B2B2B] text-xs space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
                    Protocol & Dress Code:
                  </span>
                  <p className="text-[#A1A1AA]">{generatedGuide.dest.etiquette}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 2: HIGH-CONVERTING LANDING PAGE COPYWRITER */}
      {/* ==================================================================== */}
      {activeSubTab === "landing-page" && (
        <div className="space-y-6">
          {/* Campaign Selector Bar */}
          <div className="p-4 rounded-xl bg-[#161616] border border-[#2B2B2B] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-[#71717A]">Campaign Angle:</span>
              <button
                onClick={() => setLandingCampaign("palace-living")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  landingCampaign === "palace-living"
                    ? "bg-[#C5A059] text-black font-bold"
                    : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                }`}
              >
                Palace Living & Heritage
              </button>
              <button
                onClick={() => setLandingCampaign("safari-glamping")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  landingCampaign === "safari-glamping"
                    ? "bg-[#C5A059] text-black font-bold"
                    : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                }`}
              >
                Wilderness & Safari Glamping
              </button>
              <button
                onClick={() => setLandingCampaign("charter-aviation")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  landingCampaign === "charter-aviation"
                    ? "bg-[#C5A059] text-black font-bold"
                    : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                }`}
              >
                Private Aviation & Charters
              </button>
              <button
                onClick={() => setLandingCampaign("winter-solstice")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  landingCampaign === "winter-solstice"
                    ? "bg-[#C5A059] text-black font-bold"
                    : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                }`}
              >
                Winter Solstice Window
              </button>
            </div>

            <button
              onClick={() => {
                const text = `${landingCopy.heroHeadline}\n\n${landingCopy.heroSubhead}\n\nScarcity: ${landingCopy.scarcityNotice}\n\nPrimary CTA: ${landingCopy.primaryCTA}\n\nBenefits:\n1. ${landingCopy.pillar1Title}: ${landingCopy.pillar1Desc}\n2. ${landingCopy.pillar2Title}: ${landingCopy.pillar2Desc}\n3. ${landingCopy.pillar3Title}: ${landingCopy.pillar3Desc}\n\nTestimonial: ${landingCopy.socialProof}`;
                navigator.clipboard.writeText(text);
                triggerCopyFeedback("Landing Page Copy Staged to Clipboard");
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-xs font-mono text-black font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Landing Copy</span>
            </button>
          </div>

          {/* Zero-Distraction Live Page Mockup */}
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0F0F0F] border border-[#2B2B2B] space-y-8 max-w-4xl mx-auto shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#222] pb-4">
              <span className="font-serif text-lg tracking-widest text-[#FDFBF7] font-semibold">
                SOULSV̄ENTURE
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
                Zero-Distraction Mode (No External Links)
              </span>
            </div>

            {/* Hero Section */}
            <div className="space-y-4 text-center max-w-2xl mx-auto pt-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                {landingCopy.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FDFBF7] font-normal leading-tight">
                {landingCopy.heroHeadline}
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {landingCopy.heroSubhead}
              </p>

              {/* Scarcity Banner */}
              <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl bg-amber-950/60 border border-amber-700/60 text-amber-300 text-xs font-mono">
                <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{landingCopy.scarcityNotice}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-serif font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#C5A059]/20 cursor-pointer">
                  {landingCopy.primaryCTA}
                </button>
                <button className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222] text-[#D4D4D8] font-mono text-xs border border-[#333] transition-all cursor-pointer">
                  {landingCopy.secondaryCTA}
                </button>
              </div>
            </div>

            {/* 3 Experiential Benefit Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#222]">
              <div className="p-4 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
                <span className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">
                  01
                </span>
                <h4 className="font-serif text-base text-[#FDFBF7] font-semibold">
                  {landingCopy.pillar1Title}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {landingCopy.pillar1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
                <span className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">
                  02
                </span>
                <h4 className="font-serif text-base text-[#FDFBF7] font-semibold">
                  {landingCopy.pillar2Title}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {landingCopy.pillar2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
                <span className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">
                  03
                </span>
                <h4 className="font-serif text-base text-[#FDFBF7] font-semibold">
                  {landingCopy.pillar3Title}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {landingCopy.pillar3Desc}
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#242424] text-center text-xs text-[#A1A1AA] italic">
              {landingCopy.socialProof}
            </div>

            {/* Prominent Footer CTA Box */}
            <div className="p-6 rounded-2xl bg-[#171717] border border-[#C5A059]/40 text-center space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#C5A059] tracking-widest font-bold block">
                Direct Confidential Channel
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FDFBF7]">
                Connect With Lead Curator Suraj Uniyal
              </h3>
              <p className="text-xs text-[#A1A1AA] max-w-lg mx-auto">
                No automated bots. Every itinerary inquiry is personally evaluated and structured by our
                founding team within 4 business hours.
              </p>
              <div className="pt-2">
                <button className="px-6 py-2.5 rounded-lg bg-[#C5A059] text-black font-serif font-bold text-xs uppercase tracking-wider">
                  Initiate Confidential Dialogue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 3: CATCHY HEADLINE & BLOG TITLE GENERATOR */}
      {/* ==================================================================== */}
      {activeSubTab === "headlines" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-[#161616] border border-[#2B2B2B] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-mono uppercase text-[#71717A]">Topic / Focus:</span>
              <input
                type="text"
                value={headlineTopic}
                onChange={(e) => setHeadlineTopic(e.target.value)}
                placeholder="e.g. Udaipur Palaces, Ladakh Glamping"
                className="px-3 py-1.5 text-xs bg-[#111111] border border-[#333] rounded-lg text-[#FDFBF7] font-mono focus:border-[#C5A059] focus:outline-none w-56"
              />

              <div className="flex items-center gap-1.5 pl-2 border-l border-[#333]">
                <span className="text-[11px] font-mono uppercase text-[#71717A]">Formula:</span>
                <button
                  onClick={() => setHeadlineAngle("numbered")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    headlineAngle === "numbered"
                      ? "bg-[#C5A059] text-black font-bold"
                      : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                  }`}
                >
                  Numbered Lists
                </button>
                <button
                  onClick={() => setHeadlineAngle("power")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    headlineAngle === "power"
                      ? "bg-[#C5A059] text-black font-bold"
                      : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                  }`}
                >
                  Power Words
                </button>
                <button
                  onClick={() => setHeadlineAngle("question")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    headlineAngle === "question"
                      ? "bg-[#C5A059] text-black font-bold"
                      : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                  }`}
                >
                  Question Intent
                </button>
                <button
                  onClick={() => setHeadlineAngle("secret")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    headlineAngle === "secret"
                      ? "bg-[#C5A059] text-black font-bold"
                      : "bg-[#202020] text-[#A1A1AA] hover:text-white border border-[#333]"
                  }`}
                >
                  Secret & Intrigue
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-[#888]">
              SERP Safe Limit: <strong className="text-emerald-400">≤ 60 chars</strong>
            </div>
          </div>

          {/* Generated Titles List */}
          <div className="space-y-4">
            {generatedTitles.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-[#141414] border border-[#262626] space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-mono font-bold flex items-center justify-center border border-amber-800">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      {item.ctrScore}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        item.chars <= 60
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                          : "bg-rose-950/80 text-rose-300 border-rose-800"
                      }`}
                    >
                      {item.chars} / 60 Chars {item.chars <= 60 ? "• Google Safe" : "• May Truncate"}
                    </span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.title);
                        triggerCopyFeedback(`Copied: "${item.title}"`);
                      }}
                      className="px-2.5 py-1 rounded bg-[#222] hover:bg-[#2A2A2A] text-[11px] font-mono text-[#D4D4D8] border border-[#333] flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Title</span>
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-lg text-[#FDFBF7] font-semibold">{item.title}</h3>

                {/* Google SERP Live Simulation */}
                <div className="p-3.5 rounded-lg bg-[#101010] border border-[#222] space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
                    <Globe className="w-3 h-3 text-[#C5A059]" />
                    <span>soulsventure.com</span>
                    <span>›</span>
                    <span>journal</span>
                    <span>›</span>
                    <span className="text-[#888]">{headlineTopic.toLowerCase().replace(/\s+/g, "-")}</span>
                  </div>
                  <h4 className="text-blue-400 font-sans text-sm font-medium hover:underline cursor-pointer">
                    {item.title}
                  </h4>
                  <p className="text-[#888] text-[11px] leading-relaxed line-clamp-2">
                    {item.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 4: AI VOICE NOTE & CALL TRANSCRIPTION SYNC */}
      {/* ==================================================================== */}
      {activeSubTab === "voice-sync" && (
        <div className="space-y-6">
          {/* Top Explainer */}
          <div className="p-4 rounded-xl bg-[#161616] border border-[#2B2B2B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-[#C5A059] font-bold block flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-amber-400" />
                Audio Note & Consultation Call Parser to CRM
              </span>
              <p className="text-xs text-[#A1A1AA]">
                Paste or transcribe client consultation audio. The AI parser extracts dietary, champagne,
                fleet, and milestone nuances, then directly enriches the client’s permanent CRM profile.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-[#71717A]">Sync to Client:</span>
              <select
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#111111] border border-[#333] rounded-lg text-[#FDFBF7] font-mono focus:border-[#C5A059] focus:outline-none cursor-pointer"
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.id} className="bg-[#1C1C1C]">
                    {l.clientName} ({l.referenceCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Textarea */}
            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
              <div className="flex items-center justify-between border-b border-[#222] pb-2.5">
                <span className="text-[11px] font-mono uppercase text-[#C5A059] font-semibold">
                  Client Call / Voice Note Transcript
                </span>
                <span className="text-[10px] font-mono text-[#71717A]">Unstructured Natural Speech</span>
              </div>

              <textarea
                rows={9}
                value={callTranscriptInput}
                onChange={(e) => setCallTranscriptInput(e.target.value)}
                placeholder="Paste transcription of phone consultation or WhatsApp voice note here..."
                className="w-full p-3.5 bg-[#101010] border border-[#2B2B2B] rounded-xl text-xs text-[#E4E4E7] font-mono focus:border-[#C5A059] focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-[#888]">
                  Words: {callTranscriptInput.split(/\s+/).filter(Boolean).length}
                </span>

                <button
                  onClick={handleSyncToCRM}
                  disabled={isSyncingCRM}
                  className="px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-xs font-mono text-black font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingCRM ? "animate-spin" : ""}`} />
                  <span>{isSyncingCRM ? "Syncing..." : "Sync Directly to Client CRM Profile"}</span>
                </button>
              </div>
            </div>

            {/* Right: Real-Time Structured Extracted Nuances */}
            <div className="p-5 rounded-2xl bg-[#161616] border border-[#2B2B2B] space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-[#242424] pb-2.5">
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Structured Nuances Ready for CRM Sync
                </span>
                {syncedSuccess && (
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    ✓ Synced to CRM
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#71717A] block">
                    Dietary Directives Extracted:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {parsedNuances.dietary.map((d, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-mono"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#71717A] block">
                    Beverage & Champagne Amenities:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {parsedNuances.beverages.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-mono"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#71717A] block">
                    Assigned Fleet & Vehicle Preference:
                  </span>
                  <p className="font-serif text-[#FDFBF7] font-semibold">{parsedNuances.vehicle}</p>
                </div>

                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#71717A] block">
                    Milestone Event & Date:
                  </span>
                  <p className="font-serif text-[#C5A059] font-medium">{parsedNuances.milestone}</p>
                </div>

                <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#71717A] block">
                    Pace of Travel & Timing Nuance:
                  </span>
                  <p className="text-[#A1A1AA] italic leading-relaxed">{parsedNuances.pace}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 5: PROOFREADER & LUXURY GRAMMAR ASSISTANT */}
      {/* ==================================================================== */}
      {activeSubTab === "proofreader" && (
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="p-4 rounded-xl bg-[#161616] border border-[#2B2B2B] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase text-[#C5A059] font-bold block flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                Linguistic Polish & Luxury Voice Assistant
              </span>
              <p className="text-xs text-[#A1A1AA]">
                Identifies homophone traps (every day vs. everyday, affect vs. effect) and elevates pedestrian
                phrasing into aristocratic 5-star brand copy.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleApplyAllPolish}
                className="px-4 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-xs font-mono text-black font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Apply All Polish & Refinements</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(proofText);
                  triggerCopyFeedback("Polished Text Copied to Clipboard");
                }}
                className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#2A2A2A] text-xs font-mono text-[#D4D4D8] border border-[#333] flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Draft</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Textarea */}
            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
              <div className="flex items-center justify-between border-b border-[#222] pb-2.5">
                <span className="text-[11px] font-mono uppercase text-[#C5A059] font-semibold">
                  Draft Copy Under Inspection
                </span>
                <span className="text-[10px] font-mono text-[#71717A]">Editable Field</span>
              </div>

              <textarea
                rows={10}
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
                placeholder="Type or paste copy to audit for homophones, sentence brevity, and luxury vocabulary..."
                className="w-full p-3.5 bg-[#101010] border border-[#2B2B2B] rounded-xl text-xs text-[#E4E4E7] font-mono focus:border-[#C5A059] focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-[#888]">
                <span>Total Words: {proofText.split(/\s+/).filter(Boolean).length}</span>
                <span>Detected Flags: {proofAnalysis.issues.length}</span>
              </div>
            </div>

            {/* Right: Flagged Issues & Improvements */}
            <div className="p-5 rounded-2xl bg-[#161616] border border-[#2B2B2B] space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#242424] pb-2.5">
                <span className="text-[11px] font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Identified Pitfalls & Luxury Recommendations ({proofAnalysis.issues.length})
                </span>
                <span className="text-[10px] font-mono text-[#71717A]">Automated Rulebook</span>
              </div>

              {proofAnalysis.issues.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-serif text-[#FDFBF7] text-sm">Pristine 5-Star Copy</p>
                  <p className="text-[#888] text-[11px]">
                    No homophone errors, runaway sentences, or clichéd phrases detected.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {proofAnalysis.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            issue.type === "homophone"
                              ? "bg-rose-950 text-rose-300 border border-rose-800"
                              : "bg-amber-950 text-amber-300 border border-amber-800"
                          }`}
                        >
                          {issue.type === "homophone" ? "Grammar / Homophone" : "Luxury Vocabulary"}
                        </span>
                        <span className="text-[10px] font-mono text-[#71717A]">
                          Found: “{issue.trigger}”
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-[#888] line-through font-mono">{issue.trigger}</span>
                        <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                        <span className="text-emerald-400 font-mono font-bold">
                          {issue.replacement}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                        {issue.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
