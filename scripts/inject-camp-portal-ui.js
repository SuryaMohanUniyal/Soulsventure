const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'vendor', 'portal', 'page.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add Tent, Flame, Target, Sunrise, Sunset, Moon to Lucide imports if missing
if (!code.includes('Tent,')) {
  code = code.replace(
    'Hotel,',
    'Hotel,\n  Tent,\n  Flame,\n  Target,\n  Sunrise,\n  Sunset,\n  Moon,'
  );
  console.log('Added Tent, Flame, Target, Sunrise, Sunset, Moon to lucide imports');
}

// 2. Add DailyCampAdventureSchedule to crmStore imports
if (!code.includes('DailyCampAdventureSchedule')) {
  code = code.replace(
    'DailyGuideSchedule,',
    'DailyGuideSchedule,\n  DailyCampAdventureSchedule,'
  );
  console.log('Added DailyCampAdventureSchedule to crmStore imports');
}

// 3. Add activeCampDayNumber state
if (!code.includes('activeCampDayNumber')) {
  const targetGuideState = `  const [activeGuideDayNumber, setActiveGuideDayNumber] = useState<Record<string, number>>({
    "lead-sharma-2026": 2,
    "lead-vance-2026": 1,
    "lead-rohan-2026": 2,
    "lead-singhania-2026": 2,
  });`;

  const newCampState = `  const [activeGuideDayNumber, setActiveGuideDayNumber] = useState<Record<string, number>>({
    "lead-sharma-2026": 2,
    "lead-vance-2026": 1,
    "lead-rohan-2026": 2,
    "lead-singhania-2026": 2,
  });
  const [activeCampDayNumber, setActiveCampDayNumber] = useState<Record<string, number>>({
    "lead-vance-2026": 1,
    "lead-sharma-2026": 3,
  });`;

  if (code.includes(targetGuideState)) {
    code = code.replace(targetGuideState, newCampState);
    console.log('Added activeCampDayNumber state');
  }
}

// 4. Update dateEventsMap to include safari / camp days
const targetDateEventsGuide = `      // Tour Guide schedule days
      lead.guideSchedule?.forEach((g) => {`;

const newCampDateEvents = `      // Camp & Safari days (for SUJÁN JAWAI & Wilderness Adventure Partners)
      lead.campSchedule?.forEach((c) => {
        if (c.date) {
          if (!map[c.date]) map[c.date] = [];
          if (!map[c.date].some((m) => m.type === "safari" && m.lead.id === lead.id)) {
            map[c.date].push({
              lead,
              type: "safari",
              label: \`Safari: \${c.dayTitle.substring(0, 22)}...\`,
              time: c.adventureAndSafaris[0]?.timeSlot?.split("–")[0]?.trim() || "06:00 IST",
            });
          }
        }
      });

      // Tour Guide schedule days
      lead.guideSchedule?.forEach((g) => {`;

if (!code.includes('// Camp & Safari days') && code.includes(targetDateEventsGuide)) {
  code = code.replace(targetDateEventsGuide, newCampDateEvents);
  console.log('Added camp & safari events to dateEventsMap');
}

// 5. Update dateEventsMap type definition for safari
code = code.replace(
  'type: "arrival" | "stay" | "departure" | "tour" | "route"',
  'type: "arrival" | "stay" | "departure" | "tour" | "route" | "safari"'
);

// 6. Update selectedDateBookings to check inCamp
const targetCheckInCamp = `      const inRoute = lead.routeSchedule?.some((r) => r.date === selectedDate);
      const inGuide = lead.guideSchedule?.some((g) => g.date === selectedDate);
      const inMenu = lead.gourmetMenuPlan?.some((m) => m.date === selectedDate);
      return arr === selectedDate || dep === selectedDate || inRoute || inGuide || inMenu;`;

const newCheckInCamp = `      const inRoute = lead.routeSchedule?.some((r) => r.date === selectedDate);
      const inGuide = lead.guideSchedule?.some((g) => g.date === selectedDate);
      const inCamp = lead.campSchedule?.some((c) => c.date === selectedDate);
      const inMenu = lead.gourmetMenuPlan?.some((m) => m.date === selectedDate);
      return arr === selectedDate || dep === selectedDate || inRoute || inGuide || inCamp || inMenu;`;

if (code.includes(targetCheckInCamp)) {
  code = code.replace(targetCheckInCamp, newCheckInCamp);
  console.log('Updated selectedDateBookings with inCamp');
}

// 7. Update calendar legend with Camp Safari & Adventure
const targetLegendGuide = `<span className="flex items-center gap-1.5 text-amber-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Tour Walkthrough
                </span>`;

const newLegendCamp = `<span className="flex items-center gap-1.5 text-emerald-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Camp Safari & Adventure
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Tour Walkthrough
                </span>`;

if (!code.includes('Camp Safari & Adventure') && code.includes(targetLegendGuide)) {
  code = code.replace(targetLegendGuide, newLegendCamp);
  console.log('Added Camp Safari & Adventure to calendar legend');
}

// 8. Update calendar cell badge styling for safari
const targetCellBadge = `ev.type === "tour"
                              ? "bg-amber-950/80 text-amber-300 border-amber-800 font-semibold"`;

const newCellBadge = `ev.type === "safari"
                              ? "bg-emerald-950/90 text-emerald-300 border-emerald-700 font-semibold"
                              : ev.type === "tour"
                              ? "bg-amber-950/80 text-amber-300 border-amber-800 font-semibold"`;

if (!code.includes('ev.type === "safari"') && code.includes(targetCellBadge)) {
  code = code.replace(targetCellBadge, newCellBadge);
  console.log('Updated calendar cell badge style with safari');
}

// 9. Add isCampPartner definition right after partnerRole
const targetPartnerRole = `  const partnerRole = partner.role as "hotel" | "driver" | "guide" | "activity";`;
const newPartnerRole = `  const partnerRole = partner.role as "hotel" | "driver" | "guide" | "activity";
  const isCampPartner =
    partnerRole === "activity" ||
    partner.name.toLowerCase().includes("camp") ||
    partner.name.toLowerCase().includes("jawai") ||
    partner.name.toLowerCase().includes("suján") ||
    (partner.serviceOrAssets || "").toLowerCase().includes("safari") ||
    (partner.serviceOrAssets || "").toLowerCase().includes("tented");`;

if (!code.includes('const isCampPartner =') && code.includes(targetPartnerRole)) {
  code = code.replace(targetPartnerRole, newPartnerRole);
  console.log('Added isCampPartner definition');
}

// 10. Update hotel metrics block to reflect camp & wilderness safaris when isCampPartner is true
const targetHotelMetrics = `{partner.role === "hotel" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Guests</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">{filteredLeads.length} Stays</div>
            <span className="text-[10px] text-[#C5A059] font-mono mt-0.5 block">Active Room Allocations</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Suite Tier</span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">Kohinoor & Royal Palace</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">High Floor Lake Sanctuary</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Dietary Alerts</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">100% Pure Veg & Jain</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Chef's Menu Cards Active</span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Contract Settlement</span>
            <div className="text-sm font-serif text-[#C5A059] mt-2 font-mono">{partner.negotiatedTariff}</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">{partner.paymentTerms}</span>
          </div>
        </div>
      )}`;

const newHotelMetrics = `{partner.role === "hotel" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">Assigned Guests</span>
            <div className="text-2xl font-serif text-[#FDFBF7] mt-1">
              {isCampPartner ? \`\${filteredLeads.length} Wilderness Safaris\` : \`\${filteredLeads.length} Stays\`}
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
              {isCampPartner ? "Active Camp & Safari Stays" : "Active Room Allocations"}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">
              {isCampPartner ? "Accommodation Tier" : "Suite Tier"}
            </span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">
              {isCampPartner ? "Royal Tented Pavilions" : "Kohinoor & Royal Palace"}
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
              {isCampPartner ? "Escarpment View & Private Plunge Pool" : "High Floor Lake Sanctuary"}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">
              {isCampPartner ? "Safaris & Activities" : "Dietary Alerts"}
            </span>
            <div className="text-sm font-serif text-[#FDFBF7] mt-2 truncate">
              {isCampPartner ? "Dawn Leopard Safaris & Archery" : "100% Pure Veg & Jain"}
            </div>
            <span className="text-[10px] text-amber-300 font-mono mt-0.5 block">
              {isCampPartner ? "Naturalist Salim & 4x4 Fleet" : "Chef's Menu Cards Active"}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2A2A2A]">
            <span className="text-[10px] font-mono uppercase text-[#71717A] block">
              {isCampPartner ? "Camp Contract Rate" : "Contract Settlement"}
            </span>
            <div className="text-sm font-serif text-[#C5A059] mt-2 font-mono">{partner.negotiatedTariff}</div>
            <span className="text-[10px] text-[#888] font-mono mt-0.5 block">{partner.paymentTerms}</span>
          </div>
        </div>
      )}`;

if (code.includes(targetHotelMetrics)) {
  code = code.replace(targetHotelMetrics, newHotelMetrics);
  console.log('Updated hotel metrics to dynamically support Camp & Safari partners');
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Base camp modifications written to portal page.');
