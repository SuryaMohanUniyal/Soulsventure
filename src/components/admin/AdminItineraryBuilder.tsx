"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Printer,
  Share2,
  Calendar,
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Plus,
  Trash2,
  Hotel,
  Car,
  Utensils,
  CheckCircle2,
  FileText,
  DollarSign,
  ChevronRight,
  Eye,
  Download,
  Flame,
} from "lucide-react";
import {
  CRMLead,
  BespokeItineraryDay,
  getStoredLeads,
  saveLeads,
} from "@/lib/crmStore";

interface AdminItineraryBuilderProps {
  initialLead?: CRMLead | null;
  onSelectLead?: (lead: CRMLead) => void;
}

const DESTINATION_PRESETS: Record<
  string,
  {
    heroImage: string;
    tagline: string;
    sampleDays: BespokeItineraryDay[];
  }
> = {
  Rajasthan: {
    heroImage:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85",
    tagline: "Palaces of Pichola, Royal Court Dinners & Jawai Leopard Wilderness",
    sampleDays: [
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
        insiderSecret:
          "Titular royal family private courtyard open for evening walk before public lighting.",
      },
      {
        dayNumber: 2,
        title: "Exclusive City Palace After-Hours & Royal Armoury Access",
        location: "Udaipur, Rajasthan",
        accommodation: {
          name: "The Oberoi Udaivilas",
          roomType: "Kohinoor Lake View Suite with Private Pool",
          checkInTime: "In-residence",
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
        insiderSecret:
          "Private access to the Crystal Gallery with zero crowd presence permitted.",
      },
      {
        dayNumber: 3,
        title: "Wilderness Flight to SUJÁN JAWAI & Sunset Leopard Tracking",
        location: "Jawai Wilderness, Rajasthan",
        accommodation: {
          name: "SUJÁN JAWAI",
          roomType: "Royal Tented Pavilion with Private Butler",
          checkInTime: "13:00 VIP Arrival",
        },
        fleetVehicle: {
          model: "Custom Open-Top Land Rover Defender 4WD Safari Spec",
          chauffeur: "Lead Naturalist Salim & Chauffeur Bhati",
        },
        highlights: [
          "Private Pilatus PC-12 turboprop charter flight into Jawai private escarpment strip",
          "Afternoon safari tracking wild apex leopards basking upon prehistoric granite boulders",
          "Sunset sundowners atop granite kopjes with pastoral Rabari herdsmen elders",
        ],
        dining: {
          breakfast: "Bush Camp Breakfast under Ancient Neem Trees",
          lunch: "Farm-to-Table Organic Garden Pavilion Lunch",
          dinner: "Fireside Lantern Dinner under Starry Skies with Live Folk Manganiyar Troupe",
        },
        insiderSecret:
          "Rabari tribal elder shares ancient folklore around campfire regarding coexistence with leopards.",
      },
      {
        dayNumber: 4,
        title: "Jodhpur Blue City Heritage Walk & Umaid Bhawan Royal Gala",
        location: "Jodhpur, Rajasthan",
        accommodation: {
          name: "Umaid Bhawan Palace (Taj)",
          roomType: "Maharani Palace Suite",
          checkInTime: "12:30",
        },
        fleetVehicle: {
          model: "Land Rover Defender 110 4WD",
          chauffeur: "Vikram Singh",
        },
        highlights: [
          "Private after-hours Mehrangarh Fort ramparts tour with Director of Heritage",
          "Champagne toast at sunset overlooking the Indigo blue houses of Brahmpuri",
          "Private sit-down gala in the grand marble rotunda of Umaid Bhawan Palace",
        ],
        dining: {
          breakfast: "Pillared Verandah Breakfast Overlooking Peacocks on Palace Lawns",
          lunch: "Dal Baati Churma and Royal Laal Maas Degustation at Pillars",
          dinner: "Gala Dinner with Private Champagne Saber Ceremony at Risala",
        },
        insiderSecret:
          "Access to the private vintage car museum guided by the palace master mechanic.",
      },
      {
        dayNumber: 5,
        title: "Royal Departure & Private Aviation Flight Home",
        location: "Jodhpur / New Delhi",
        accommodation: {
          name: "In-Transit Private FBO",
          roomType: "Executive Lounge VIP Bay",
        },
        fleetVehicle: {
          model: "Bombardier Challenger 605 Private Jet",
          chauffeur: "Private Flight Crew",
        },
        highlights: [
          "Morning restorative yoga session on palace lawns with royal guru",
          "SoulsVenture handcrafted silver keepsake presentation",
          "Private jet direct takeoff back to client base city with onboard gourmet dining",
        ],
        dining: {
          breakfast: "Artisanal Organic Breakfast with Fresh Pressed Juices",
          lunch: "In-Flight Michelin-Inspired Caviar & Champagne Degustation",
          dinner: "Home Arrival",
        },
        insiderSecret:
          "Tarmac vehicle escort directly to aircraft steps with expedited baggage clearance.",
      },
    ],
  },
  Ladakh: {
    heroImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    tagline: "High-Altitude Solitude, Ancient Monasteries & Stargazing Domes",
    sampleDays: [
      {
        dayNumber: 1,
        title: "Gentle Himalayan Acclimatization & Private Villa Welcome",
        location: "Leh, Ladakh",
        accommodation: {
          name: "The Grand Dragon Ladakh / Chamba Camp Thiksey",
          roomType: "Presidential Luxury Suite with Supplemental Oxygen",
        },
        fleetVehicle: {
          model: "Toyota Land Cruiser Prado 4x4 Heated Luxury Spec",
          chauffeur: "Tenzin Norbu (High-Altitude Specialist Chauffeur)",
        },
        highlights: [
          "Private arrival at Kushok Bakula Rimpochee Airport with traditional Khata white silk scarfs",
          "Curated acclimatization protocol overseen by private expedition physician",
          "Evening herbal tea and meditation session overlooking the Stok Kangri mountain range",
        ],
        dining: {
          breakfast: "Light Himalayan Tsampa and Organic Apricot Jam",
          lunch: "Slow-Steamed Tibetan Momos and Restorative Herbal Broth",
          dinner: "Organic Farm-to-Table Ladakhi Feast with Warm Butter Tea",
        },
        insiderSecret:
          "Private doctor checks SpO2 levels and arranges mild oxygenation for seamless sleep.",
      },
      {
        dayNumber: 2,
        title: "Private Dawn Puja at Thiksey Monastery & Old Town Walk",
        location: "Thiksey & Shey, Ladakh",
        accommodation: {
          name: "Chamba Camp Thiksey (TUTC)",
          roomType: "Luxury Heated Colonial Tented Suite",
        },
        fleetVehicle: {
          model: "Land Rover Defender 110 4WD",
          chauffeur: "Tenzin Norbu",
        },
        highlights: [
          "06:00 AM private access to the main prayer hall for monk chanting and conch shells",
          "Private audience with Head Rinpoche (Abbot) with blessing of holy thread",
          "Guided heritage walk through 17th-century mud-brick alleyways of Old Leh",
        ],
        dining: {
          breakfast: "Sunrise Breakfast on Monastery Rooftop with Monks' Blessing",
          lunch: "Riverside Garden Al Fresco Picnic along Indus River",
          dinner: "Gourmet Tented Dining with Heated Ceramic Stones & French Bordeaux",
        },
        insiderSecret:
          "Witness the sacred unveiling of ancient thangkas not shown to public visitors.",
      },
      {
        dayNumber: 3,
        title: "Helicopter Transfer Over Khardung La into Nubra Sand Dunes",
        location: "Nubra Valley, Ladakh",
        accommodation: {
          name: "The Kyagar Luxury Lodge",
          roomType: "Grand Valley Suite with Geothermal Underfloor Heating",
        },
        fleetVehicle: {
          model: "Airbus H130 Mountain Helicopter & Defender 4x4",
          chauffeur: "Capt. Sharma (Pilot) & Stanzin (Local Escort)",
        },
        highlights: [
          "Breathtaking 30-minute aerial crossing of Khardung La Pass (18,380 ft) by private helicopter",
          "Private double-humped Bactrian camel trek through the white dunes of Hunder at dusk",
          "Fireside astronomy session with professional Celestron telescope & dark-sky astrophysicist",
        ],
        dining: {
          breakfast: "Alpine Breakfast at Chamba Camp",
          lunch: "Silk Route Oasis Picnic under Apricot Orchards in Diskit",
          dinner: "Traditional Central Asian Clay Oven Banquet with Yak Cheese Degustation",
        },
        insiderSecret:
          "Zero light pollution in Nubra allows viewing the Milky Way core with the naked eye.",
      },
    ],
  },
  Kashmir: {
    heroImage:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85",
    tagline: "Dal Lake Royal Houseboats, Pine Forests & Gulmarg Powder Heli-Skiing",
    sampleDays: [
      {
        dayNumber: 1,
        title: "Dal Lake Private Royal Kettuvallam & Shalimar Sunset",
        location: "Srinagar, Kashmir",
        accommodation: {
          name: "Sukoon Luxury Heritage Houseboat / The Lalit Grand Palace",
          roomType: "Maharaja Royal Suite with Carved Walnut Wood",
        },
        fleetVehicle: {
          model: "Mercedes-Benz E-Class All-Terrain 4MATIC",
          chauffeur: "Bashir Ahmed (Senior Concierge Chauffeur)",
        },
        highlights: [
          "Private luxury Shikara transfer across serene Dal Lake with floating flower vendor welcome",
          "Afternoon stroll through Emperor Jahangir’s Shalimar and Nishat Mughal Gardens",
          "Evening Sitar and Santoor concert on private cedarwood sun-deck under chinar trees",
        ],
        dining: {
          breakfast: "Kashmiri Noon Chai with Artisanal Girda and Bakarkhani Breads",
          lunch: "Fresh Lotus Stem (Nadru) and Rogan Josh Gourmet Table",
          dinner: "Traditional 7-Course Wazwan Feast served in Heirloom Copper Tramis",
        },
        insiderSecret:
          "Private Shikara takes secluded canal routes past heritage wooden houses away from tourist boats.",
      },
      {
        dayNumber: 2,
        title: "Helicopter Transfer to Gulmarg & Virgin Powder Skiing",
        location: "Gulmarg, Kashmir",
        accommodation: {
          name: "The Khyber Himalayan Resort & Spa",
          roomType: "Presidential Pine Suite with Heated Outdoor Jacuzzi",
        },
        fleetVehicle: {
          model: "Airbus H130 Helicopter / 4x4 Snow Convoy",
          chauffeur: "Capt. Roy (Aviation) & Chauffeur Mir",
        },
        highlights: [
          "Helicopter direct flight from Srinagar airport into Gulmarg alpine helipad",
          "VIP Phase 2 Gondola boarding (13,780 ft) accompanied by master ski instructor",
          "Evening Swedish pine sauna and L’Occitane heated Ayurvedic massage",
        ],
        dining: {
          breakfast: "Champagne High-Altitude Breakfast at The Cloves",
          lunch: "Fireside Fondue and Truffle Fries at Highlands Alpine Lounge",
          dinner: "Nordic Charcoal Grill Feast with Mulled Spiced Wine at Nouf",
        },
        insiderSecret:
          "Expedited VIP bypass for Gondola queues ensures zero waiting time in freezing weather.",
      },
    ],
  },
};

export default function AdminItineraryBuilder({
  initialLead,
  onSelectLead,
}: AdminItineraryBuilderProps) {
  const [leads, setLeads] = useState<CRMLead[]>(() => getStoredLeads());
  const [selectedLeadId, setSelectedLeadId] = useState<string>(
    initialLead ? initialLead.id : leads[0]?.id || ""
  );

  const currentLead = leads.find((l) => l.id === selectedLeadId) || initialLead || leads[0];

  const defaultDestination =
    currentLead?.destinations[0] && DESTINATION_PRESETS[currentLead.destinations[0]]
      ? currentLead.destinations[0]
      : "Rajasthan";

  const [selectedDestination, setSelectedDestination] = useState<string>(defaultDestination);
  const [tripDays, setTripDays] = useState<BespokeItineraryDay[]>(
    DESTINATION_PRESETS[defaultDestination]?.sampleDays || DESTINATION_PRESETS["Rajasthan"].sampleDays
  );

  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [activeTabDay, setActiveTabDay] = useState(1);

  // Auto-generate itinerary with AI
  const handleAIGenerate = (destinationName: string) => {
    const preset = DESTINATION_PRESETS[destinationName] || DESTINATION_PRESETS["Rajasthan"];
    setSelectedDestination(destinationName);
    setTripDays(preset.sampleDays);
    setActiveTabDay(1);
    setSaveSuccessMsg(`AI Itinerary choreographed for ${destinationName} (5-Star Properties & Fleet)!`);
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  const handleUpdateDay = (index: number, field: keyof BespokeItineraryDay, value: any) => {
    setTripDays((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveToLead = () => {
    if (!currentLead) return;
    const allLeads = getStoredLeads();
    const updated = allLeads.map((l) =>
      l.id === currentLead.id
        ? {
            ...l,
            proposalDays: tripDays,
            status: l.status === "New Lead" ? ("Proposal Sent" as const) : l.status,
            milestones: { ...l.milestones, proposalSent: true },
          }
        : l
    );
    saveLeads(updated);
    setLeads(updated);
    setSaveSuccessMsg(`Itinerary & Magazine Brochure successfully attached to ${currentLead.clientName}!`);
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  const currentDayData = tripDays[activeTabDay - 1] || tripDays[0];

  // WhatsApp Proposal Message
  const whatsappProposalText = currentLead
    ? `*SOULSVENTURE BESPOKE JOURNEYS*
_Private Client Proposal & Itinerary_

Dear *${currentLead.clientName}*,

We have crafted an exclusive, day-by-day luxury travel brochure tailored specifically for you:

👑 *Journey:* ${selectedDestination} Grand Royal Tour
⏳ *Duration:* ${tripDays.length} Days Handcrafted
🏰 *Signature Stays:* ${tripDays.map((d) => d.accommodation.name).filter((v, i, a) => a.indexOf(v) === i).join(" & ")}
🚗 *Luxury Fleet:* ${tripDays[0]?.fleetVehicle.model || "Land Rover Defender 110 4WD"}
🍾 *Dietary & Nuances:* Strict adherence to your VIP preferences.

✨ *Explore Your Digital Client Portal & Brochure:*
https://soulsventure.com/client/trip/${currentLead.referenceCode.toLowerCase()}

Warmest regards,
*Suraj Uniyal & Harsh Sood*
Founders & Concierge Directors | SoulsVenture
WhatsApp / Direct: +91 98XXXXXXXX`
    : "";

  const handleSendWhatsApp = () => {
    if (!currentLead) return;
    const cleanPhone = currentLead.phone.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappProposalText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif tracking-wider uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Sparkles className="w-3 h-3" />
              AI Itinerary Studio & Brochure Exporter
            </span>
            <span className="text-xs text-[#888888] font-mono">
              Black Tomato Style Luxury Curation
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#FDFBF7]">
            Modular Trip Builder & Magazine Generator
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Choreograph day-by-day palace stays, luxury 4x4 convoys, private choppers, and Michelin-tier dining menus with automated brochure export.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setBrochureModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-[#111111] font-semibold text-xs rounded-lg shadow-lg cursor-pointer transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Magazine Brochure Preview</span>
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold text-xs rounded-lg shadow cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send via WhatsApp</span>
          </button>

          <button
            onClick={handleSaveToLead}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#222222] hover:bg-[#2A2A2A] border border-[#3A3A3A] text-[#FDFBF7] font-semibold text-xs rounded-lg shadow cursor-pointer transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
            <span>Save to CRM Lead</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Control Strip: Select Client & AI Presets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#181818] rounded-xl border border-[#282828]">
        {/* Client Selector */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
            Assign to VIP Client
          </label>
          <select
            value={currentLead?.id || ""}
            onChange={(e) => {
              setSelectedLeadId(e.target.value);
              const found = leads.find((l) => l.id === e.target.value);
              if (found && onSelectLead) onSelectLead(found);
            }}
            className="w-full bg-[#202020] text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#333333] text-xs font-medium focus:outline-none focus:border-[#C5A059] cursor-pointer"
          >
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.clientName} ({l.referenceCode}) — {l.destinationSummary}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Preset */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold block mb-1.5">
            Destination Archetype
          </label>
          <div className="flex gap-2">
            {["Rajasthan", "Ladakh", "Kashmir"].map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => handleAIGenerate(dest)}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-serif transition-colors cursor-pointer border ${
                  selectedDestination === dest
                    ? "bg-[#C5A059]/15 border-[#C5A059] text-[#C5A059] font-bold"
                    : "bg-[#202020] border-[#333333] text-[#A1A1AA] hover:text-[#FDFBF7]"
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* AI Quick Re-Choreograph Button */}
        <div className="flex flex-col justify-end">
          <button
            type="button"
            onClick={() => handleAIGenerate(selectedDestination)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#252525] hover:bg-[#303030] border border-[#3A3A3A] text-[#FDFBF7] text-xs font-semibold cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>AI Auto-Choreograph ({selectedDestination})</span>
          </button>
        </div>
      </div>

      {/* Day by Day Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tripDays.map((d) => (
          <button
            key={d.dayNumber}
            onClick={() => setActiveTabDay(d.dayNumber)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-serif whitespace-nowrap transition-all cursor-pointer ${
              activeTabDay === d.dayNumber
                ? "bg-[#C5A059] text-[#111111] font-bold border-[#C5A059] shadow-md shadow-[#C5A059]/20"
                : "bg-[#181818] border-[#2A2A2A] text-[#8E8E93] hover:text-[#FDFBF7] hover:bg-[#202020]"
            }`}
          >
            <span>Day {d.dayNumber}</span>
            <span className="text-[10px] opacity-80 truncate max-w-[120px] font-sans">
              {d.location.split(",")[0]}
            </span>
          </button>
        ))}

        <button
          onClick={() => {
            const newDayNum = tripDays.length + 1;
            const newDay: BespokeItineraryDay = {
              dayNumber: newDayNum,
              title: `Day ${newDayNum} Bespoke Exploration & Leisure`,
              location: selectedDestination,
              accommodation: {
                name: "Luxury Palace Suite",
                roomType: "Royal Pavilion",
              },
              fleetVehicle: {
                model: "Land Rover Defender 110 4WD",
                chauffeur: "Assigned Senior Chauffeur",
              },
              highlights: [
                "Private breakfast with panoramic mountain/lake vista",
                "Curated private excursion led by local specialist",
                "Evening sunset aperitif and bespoke dinner experience",
              ],
              dining: {
                breakfast: "Artisanal Table Breakfast",
                lunch: "Curated Al Fresco Dining",
                dinner: "Private Candlelight Chef's Table",
              },
            };
            setTripDays([...tripDays, newDay]);
            setActiveTabDay(newDayNum);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#202020] hover:bg-[#282828] border border-dashed border-[#3A3A3A] text-[#C5A059] text-xs font-semibold cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Day</span>
        </button>
      </div>

      {/* Active Day Detail Form & Editor */}
      {currentDayData && (
        <div className="p-5 sm:p-6 bg-[#161616] rounded-2xl border border-[#262626] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242424] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                Choreographing Day {currentDayData.dayNumber} of {tripDays.length}
              </span>
              <input
                type="text"
                value={currentDayData.title}
                onChange={(e) =>
                  handleUpdateDay(activeTabDay - 1, "title", e.target.value)
                }
                className="w-full font-serif text-lg sm:text-xl text-[#FDFBF7] bg-transparent border-b border-transparent hover:border-[#333333] focus:border-[#C5A059] focus:outline-none mt-1 py-0.5"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888888] font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <input
                  type="text"
                  value={currentDayData.location}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "location", e.target.value)
                  }
                  className="bg-[#202020] text-[#FDFBF7] px-2.5 py-1 rounded text-xs border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </span>
            </div>
          </div>

          {/* 3 Pillars: Stay, Fleet Vehicle, Dining */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Luxury Accommodation */}
            <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#2A2A2A] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                <Hotel className="w-4 h-4" />
                <span>5-Star Sanctuary / Palace</span>
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] uppercase block mb-1">Property Name</label>
                <input
                  type="text"
                  value={currentDayData.accommodation.name}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "accommodation", {
                      ...currentDayData.accommodation,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-[#242424] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] uppercase block mb-1">Suite / Room Category</label>
                <input
                  type="text"
                  value={currentDayData.accommodation.roomType}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "accommodation", {
                      ...currentDayData.accommodation,
                      roomType: e.target.value,
                    })
                  }
                  className="w-full bg-[#242424] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* 2. Luxury Transport & Chauffeur */}
            <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#2A2A2A] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                <Car className="w-4 h-4" />
                <span>Assigned Fleet & Chauffeur</span>
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] uppercase block mb-1">Vehicle Model</label>
                <input
                  type="text"
                  value={currentDayData.fleetVehicle.model}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "fleetVehicle", {
                      ...currentDayData.fleetVehicle,
                      model: e.target.value,
                    })
                  }
                  className="w-full bg-[#242424] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] uppercase block mb-1">Chauffeur / Pilot</label>
                <input
                  type="text"
                  value={currentDayData.fleetVehicle.chauffeur}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "fleetVehicle", {
                      ...currentDayData.fleetVehicle,
                      chauffeur: e.target.value,
                    })
                  }
                  className="w-full bg-[#242424] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* 3. Gourmet Dining Menu */}
            <div className="p-4 bg-[#1B1B1B] rounded-xl border border-[#2A2A2A] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                <Utensils className="w-4 h-4" />
                <span>Pre-Curated Gourmet Dining</span>
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] uppercase block mb-1">Breakfast & High Tea</label>
                <input
                  type="text"
                  value={currentDayData.dining.breakfast}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "dining", {
                      ...currentDayData.dining,
                      breakfast: e.target.value,
                    })
                  }
                  className="w-full bg-[#242424] text-xs text-[#FDFBF7] px-2.5 py-1.5 rounded border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] uppercase block mb-1">Curated Lunch</label>
                <input
                  type="text"
                  value={currentDayData.dining.lunch}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "dining", {
                      ...currentDayData.dining,
                      lunch: e.target.value,
                    })
                  }
                  className="w-full bg-[#242424] text-xs text-[#FDFBF7] px-2.5 py-1.5 rounded border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] uppercase block mb-1">Evening Gala / Dinner</label>
                <input
                  type="text"
                  value={currentDayData.dining.dinner}
                  onChange={(e) =>
                    handleUpdateDay(activeTabDay - 1, "dining", {
                      ...currentDayData.dining,
                      dinner: e.target.value,
                    })
                  }
                  className="w-full bg-[#242424] text-xs text-[#FDFBF7] px-2.5 py-1.5 rounded border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Highlights & Excursions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Bespoke Sightseeing & Privileged Access
              </label>
              <button
                type="button"
                onClick={() => {
                  const currentH = currentDayData.highlights || [];
                  handleUpdateDay(activeTabDay - 1, "highlights", [
                    ...currentH,
                    "Private after-hours palace garden access with personal escort",
                  ]);
                }}
                className="text-[10px] text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Highlight
              </button>
            </div>

            <div className="space-y-2">
              {currentDayData.highlights.map((h, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] flex-shrink-0" />
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => {
                      const updated = [...currentDayData.highlights];
                      updated[hIdx] = e.target.value;
                      handleUpdateDay(activeTabDay - 1, "highlights", updated);
                    }}
                    className="flex-1 bg-[#202020] text-xs text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#333333] focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = currentDayData.highlights.filter((_, idx) => idx !== hIdx);
                      handleUpdateDay(activeTabDay - 1, "highlights", updated);
                    }}
                    className="p-1.5 text-[#71717A] hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Insider Secret / Curator Note */}
          {currentDayData.insiderSecret && (
            <div className="p-3 bg-[#1A1A1A] rounded-xl border border-[#2B2B2B] flex items-start gap-2.5 text-xs text-[#A1A1AA]">
              <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#C5A059] block">
                  Curator's Confidential Insider Secret
                </span>
                <p className="italic text-[#FDFBF7] mt-0.5">{currentDayData.insiderSecret}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Magazine-Style PDF Brochure Modal */}
      {brochureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-4xl bg-[#111111] border border-[#2E2E2E] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Topbar */}
            <div className="p-4 border-b border-[#242424] bg-[#161616] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <h3 className="font-serif text-base sm:text-lg text-[#FDFBF7]">
                  Magazine-Style Editorial Brochure • SoulsVenture
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setBrochureModalOpen(false)}
                  className="px-3 py-1.5 bg-[#252525] hover:bg-[#303030] text-[#A1A1AA] hover:text-[#FDFBF7] text-xs rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Printable Magazine Content */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#FDFBF7]">
              {/* Cover Spread */}
              <div
                className="relative rounded-2xl overflow-hidden p-8 sm:p-12 min-h-[360px] flex flex-col justify-between border border-[#333333]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(17,17,17,0.3), rgba(17,17,17,0.95)), url('${
                    DESTINATION_PRESETS[selectedDestination]?.heroImage ||
                    DESTINATION_PRESETS["Rajasthan"].heroImage
                  }')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-bold block mb-1">
                      PRIVATE COMMISSION • SOULSVENTURE
                    </span>
                    <span className="text-xs font-mono text-[#E4E4E7]">
                      Commissioned for: {currentLead?.clientName || "VIP Guest"}
                    </span>
                  </div>
                  <span className="text-[11px] font-serif tracking-wider text-[#C5A059] border border-[#C5A059]/40 px-3 py-1 rounded-full bg-black/40">
                    Bespoke Portfolio 2026–2027
                  </span>
                </div>

                <div className="space-y-2 mt-8">
                  <h1 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] leading-tight">
                    {selectedDestination}
                  </h1>
                  <p className="text-sm sm:text-base font-serif italic text-[#C5A059] max-w-xl">
                    "{DESTINATION_PRESETS[selectedDestination]?.tagline || "The Art of Living Like Kings"}"
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#A1A1AA] pt-2">
                    <span>{tripDays.length} Days of Private Solitude</span>
                    <span>•</span>
                    <span>Curated by Suraj Uniyal & Harsh Sood</span>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Spreads */}
              <div className="space-y-6">
                <div className="border-b border-[#262626] pb-2 flex items-center justify-between">
                  <h3 className="font-serif text-xl text-[#C5A059]">Day-by-Day Choreography</h3>
                  <span className="text-xs font-mono text-[#71717A]">
                    Reference: {currentLead?.referenceCode || "SV-VIP-2026"}
                  </span>
                </div>

                {tripDays.map((d) => (
                  <div
                    key={d.dayNumber}
                    className="p-5 bg-[#171717] rounded-xl border border-[#262626] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222222] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                          {d.dayNumber}
                        </span>
                        <div>
                          <h4 className="font-serif text-base sm:text-lg text-[#FDFBF7]">
                            {d.title}
                          </h4>
                          <span className="text-xs text-[#71717A]">{d.location}</span>
                        </div>
                      </div>

                      <div className="text-xs text-right">
                        <span className="text-[#C5A059] font-medium block">
                          {d.accommodation.name}
                        </span>
                        <span className="text-[11px] text-[#71717A]">
                          {d.accommodation.roomType}
                        </span>
                      </div>
                    </div>

                    {/* Excursions */}
                    <div className="space-y-1.5 pl-2 border-l border-[#2E2E2E]">
                      {d.highlights.map((h, i) => (
                        <p key={i} className="text-xs text-[#D4D4D8] leading-relaxed">
                          • {h}
                        </p>
                      ))}
                    </div>

                    {/* Fleet & Dining Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-2.5 bg-[#1F1F1F] rounded-lg border border-[#2B2B2B] flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase block">
                            Assigned Fleet
                          </span>
                          <span className="text-xs text-[#FDFBF7]">
                            {d.fleetVehicle.model} ({d.fleetVehicle.chauffeur})
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#1F1F1F] rounded-lg border border-[#2B2B2B] flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase block">
                            Evening Dining
                          </span>
                          <span className="text-xs text-[#FDFBF7]">
                            {d.dining.dinner}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Founder Pledge & Footer */}
              <div className="p-6 bg-[#161616] rounded-xl border border-[#2B2B2B] text-center space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
                  THE SOULSVENTURE PLEDGE
                </span>
                <p className="text-xs text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
                  "Every suite, private aircraft charter, and palace dinner in this commission has been personally inspected and guaranteed by the founders. We do not sell packages; we unlock the living soul of India."
                </p>
                <div className="text-xs font-serif text-[#C5A059] pt-2">
                  Suraj Uniyal & Harsh Sood • Directors of Private Client Concierge
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
