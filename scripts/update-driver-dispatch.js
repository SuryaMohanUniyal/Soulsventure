const fs = require("fs");
const path = require("path");

// ============================================================================
// 1. UPDATE crmStore.ts WITH FULL MULTI-DAY ROUTE SCHEDULES FOR ALL LEADS
// ============================================================================
const crmStorePath = path.join(__dirname, "..", "src", "lib", "crmStore.ts");
let crmContent = fs.readFileSync(crmStorePath, "utf8");
const isCrmCRLF = crmContent.includes("\r\n");
crmContent = crmContent.replace(/\r\n/g, "\n");

// Add Days 3, 4, 5, 6 for lead-vance-2026 (6-day booking: Nov 18 - Nov 23)
const vanceTarget = `        chauffeurDirectives: "Coordinate with 4x4 safari team. Keep cold drinks, mineral water, and binoculars accessible."
      }
    ],
        campSchedule: [`;

const vanceRepl = `        chauffeurDirectives: "Coordinate with 4x4 safari team. Keep cold drinks, mineral water, and binoculars accessible."
      },
      {
        dayNumber: 3,
        date: "2026-11-20",
        dayTitle: "Devgiri Cave Temple & Granite Hills Exploration",
        reportingTime: "06:00 IST",
        releaseTime: "19:30 IST",
        startLocation: "SUJÁN JAWAI Camp Base",
        endLocation: "SUJÁN JAWAI Camp Base",
        routeOverview: "Camp ➔ Devgiri Granite Caves ➔ Hilltop Shrine ➔ Wilderness Pastures ➔ Camp",
        distanceKm: 36,
        travelDuration: "Half Day Disposal + Sunset Drive",
        sightseeingVisits: [
          "Ancient Devgiri cave temple perched atop monolith rocks",
          "Wild leopard habitat tracking on granite boulders",
          "Sunset high-tea setup at escarpment summit"
        ],
        chauffeurDirectives: "Standby at camp gate. Assist guests during rocky ascents and maintain chilled beverages in vehicle."
      },
      {
        dayNumber: 4,
        date: "2026-11-21",
        dayTitle: "Jawai Dam Reservoir & Migratory Flamingo Safari",
        reportingTime: "06:15 IST",
        releaseTime: "19:00 IST",
        startLocation: "SUJÁN JAWAI Camp Base",
        endLocation: "SUJÁN JAWAI Camp Base",
        routeOverview: "Camp ➔ Jawai Bandh Sluice Gates ➔ Marshland Overlook ➔ Local Artisan Pottery ➔ Camp",
        distanceKm: 48,
        travelDuration: "Full Day Wetland Excursion",
        sightseeingVisits: [
          "Jawai Dam reservoir & marsh crocodile observation points",
          "Migratory flamingo, crane and pelican colonies with Swarovski optics",
          "Pottery demonstration with rural village master artisans"
        ],
        chauffeurDirectives: "Keep dust covers on luggage. Coordinate timing with Naturalist Salim for ideal wetland lighting."
      },
      {
        dayNumber: 5,
        date: "2026-11-22",
        dayTitle: "Granite Wilderness Sundowner & Astronomy Night",
        reportingTime: "08:00 IST",
        releaseTime: "21:30 IST",
        startLocation: "SUJÁN JAWAI Camp Base",
        endLocation: "SUJÁN JAWAI Camp Base",
        routeOverview: "Camp ➔ Southern Koppies Track ➔ Bush Dining Glade ➔ Stargazing Ridge ➔ Camp",
        distanceKm: 32,
        travelDuration: "Afternoon & Stargazing Disposal",
        sightseeingVisits: [
          "Leisurely bush trail drive exploring indigenous flora & fauna",
          "Campfire sundowner on scenic granite ridge",
          "Telescope stargazing session under clear desert skies"
        ],
        chauffeurDirectives: "Pre-warm cabin with fleece blankets for night return transfer. Flashlights on standby."
      },
      {
        dayNumber: 6,
        date: "2026-11-23",
        dayTitle: "Intercity Highway Departure to Udaipur Airport",
        reportingTime: "07:30 IST",
        releaseTime: "11:30 IST (Trip Sign-Off)",
        startLocation: "SUJÁN JAWAI Camp Porch",
        endLocation: "Udaipur Airport (UDR) Terminal 1 Gate 1",
        routeOverview: "Jawai Bandh ➔ Pindwara ➔ Gogunda Mountain Pass ➔ NH-27 Expressway ➔ Udaipur Airport",
        distanceKm: 145,
        travelDuration: "3 hours 15 mins",
        sightseeingVisits: [
          "Scenic morning drive through southern Aravalli hills",
          "VIP airport express transfer to Departure Gate 1"
        ],
        chauffeurDirectives: "Check tyre pressure and fuel at 07:00 IST. Assist with luggage handover at airport VIP check-in."
      }
    ],
        campSchedule: [`;

if (!crmContent.includes(vanceTarget)) {
  console.error("Failed to find vanceTarget in crmStore.ts");
} else {
  crmContent = crmContent.replace(vanceTarget, vanceRepl);
  console.log("Successfully added Days 3-6 to lead-vance-2026");
}

// Add Days 3, 4, 5 for lead-rohan-2026 (5-day booking: Dec 02 - Dec 06)
const rohanTarget = `        chauffeurDirectives: "Ensure Vintage Cadillac is prepped and polished for afternoon 16:30 IST lakeside promenade drive."
      }
    ],
        guideSchedule: [`;

const rohanRepl = `        chauffeurDirectives: "Ensure Vintage Cadillac is prepped and polished for afternoon 16:30 IST lakeside promenade drive."
      },
      {
        dayNumber: 3,
        date: "2026-12-04",
        dayTitle: "Kumbhalgarh Fort Great Wall & Mountain Excursion",
        reportingTime: "08:30 IST",
        releaseTime: "18:30 IST",
        startLocation: "The Oberoi Udaivilas",
        endLocation: "The Oberoi Udaivilas",
        routeOverview: "Udaivilas ➔ NH-58 Hill Corridor ➔ Kumbhalgarh Forest Range ➔ Badal Mahal ➔ Return",
        distanceKm: 98,
        travelDuration: "Full Day Mountain Excursion (2h 15m each way)",
        sightseeingVisits: [
          "The Great Wall of India (second longest continuous wall in the world)",
          "Cloud Palace (Badal Mahal) birthplace of Maharana Pratap",
          "Scenic mountain pass vistas of the Aravalli range"
        ],
        chauffeurDirectives: "Smooth hill driving with gentle acceleration. Maintain 21°C cabin temperature. Assist Countess during steep fortress walks."
      },
      {
        dayNumber: 4,
        date: "2026-12-05",
        dayTitle: "Shilpgram Artisan Village & Lake Badi Sunset Loop",
        reportingTime: "09:30 IST",
        releaseTime: "19:30 IST",
        startLocation: "The Oberoi Udaivilas",
        endLocation: "The Oberoi Udaivilas",
        routeOverview: "Udaivilas ➔ Shilpgram Rural Arts Complex ➔ Lake Badi (Tiger Lake) ➔ Bahubali Hill ➔ Udaivilas",
        distanceKm: 34,
        travelDuration: "Heritage Leisure Disposal",
        sightseeingVisits: [
          "Shilpgram traditional folk art and terracotta craft pavilion",
          "Lake Badi tranquil mountain-surrounded waters",
          "Sunset viewpoint at Bahubali Hill overview"
        ],
        chauffeurDirectives: "Station vehicle in shade at Shilpgram VIP parking. Assist with delicate artisan pottery purchases."
      },
      {
        dayNumber: 5,
        date: "2026-12-06",
        dayTitle: "Final VIP Airport Express Departure",
        reportingTime: "12:00 IST",
        releaseTime: "14:30 IST (Trip Sign-Off)",
        startLocation: "The Oberoi Udaivilas Main Lobby",
        endLocation: "Udaipur Airport VIP Lounge Exit Gate 1",
        routeOverview: "The Oberoi Udaivilas ➔ Fatehsagar Promenade ➔ NH-48 Expressway ➔ Udaipur Airport VIP Lounge",
        distanceKm: 24,
        travelDuration: "35 mins",
        sightseeingVisits: [
          "Farewell lakeside drive",
          "VIP tarmac lounge drop-off"
        ],
        chauffeurDirectives: "Report at 12:00 IST sharp. Transfer 5 VIP bags with white-glove protocol to airport airline concierge."
      }
    ],
        guideSchedule: [`;

if (!crmContent.includes(rohanTarget)) {
  console.error("Failed to find rohanTarget in crmStore.ts");
} else {
  crmContent = crmContent.replace(rohanTarget, rohanRepl);
  console.log("Successfully added Days 3-5 to lead-rohan-2026");
}

// Add Days 2, 3, 4, 5 for lead-singhania-2026 (5-day booking: Dec 10 - Dec 14)
const singhaniaTarget = `        chauffeurDirectives: "Both Defenders in tandem formation with luggage van behind. Presidential protocol in place."
      }
    ],
        guideSchedule: [`;

const singhaniaRepl = `        chauffeurDirectives: "Both Defenders in tandem formation with luggage van behind. Presidential protocol in place."
      },
      {
        dayNumber: 2,
        date: "2026-12-11",
        dayTitle: "Bilateral Clean Energy Summit & Zenana Mahal Escort",
        reportingTime: "08:30 IST",
        releaseTime: "21:30 IST",
        startLocation: "The Oberoi Udaivilas Presidential Wing",
        endLocation: "The Oberoi Udaivilas Presidential Wing",
        routeOverview: "Udaivilas ➔ Private Jetty ➔ City Palace Badi Pol ➔ Zenana Mahal Executive Chamber ➔ Return Convoy",
        distanceKm: 18,
        travelDuration: "Full Day VIP Security Protocol",
        sightseeingVisits: [
          "VIP delegation motorcade to City Palace",
          "Bilateral Clean Energy Summit in Zenana Mahal",
          "Private lakeside escort and evening gala dinner"
        ],
        chauffeurDirectives: "Both Defenders maintain tandem spacing with lead protocol. Standby at City Palace VIP portico."
      },
      {
        dayNumber: 3,
        date: "2026-12-12",
        dayTitle: "Eklingji & Nagda 10th-Century Temple Complex Convoy",
        reportingTime: "09:00 IST",
        releaseTime: "18:30 IST",
        startLocation: "The Oberoi Udaivilas Presidential Wing",
        endLocation: "The Oberoi Udaivilas Presidential Wing",
        routeOverview: "Udaivilas ➔ NH-58 North Expressway ➔ Kailashpuri Eklingji Temple ➔ Sas-Bahu Nagda Temples ➔ Udaivilas",
        distanceKm: 46,
        travelDuration: "Half Day Temple Convoy Excursion",
        sightseeingVisits: [
          "Eklingji Temple (guardian deity of the House of Mewar with 108 shrines)",
          "10th-century Sas-Bahu twin temples in ancient Nagda",
          "Private temple blessing by Chief Priest"
        ],
        chauffeurDirectives: "Highway convoy cruising. Ensure security clearance at temple VIP gate. Keep bottled spring water chilled."
      },
      {
        dayNumber: 4,
        date: "2026-12-13",
        dayTitle: "Jagmandir Island Palace Gala Dinner Security Escort",
        reportingTime: "10:00 IST",
        releaseTime: "23:00 IST",
        startLocation: "The Oberoi Udaivilas Presidential Wing",
        endLocation: "The Oberoi Udaivilas Presidential Wing",
        routeOverview: "Udaivilas ➔ Waterfront Promenade ➔ Badi Pal Jetty (Boat Transfer) ➔ Jagmandir Island ➔ Return Escort",
        distanceKm: 14,
        travelDuration: "Executive Leisure & Evening Island Gala",
        sightseeingVisits: [
          "Executive delegation shopping at Mewar Art Gallery",
          "Sunset royal boat transfer across Lake Pichola",
          "Jagmandir Island Palace celebratory gala dinner"
        ],
        chauffeurDirectives: "Station vehicles at Badi Pal jetty parking. Remain on active radio standby until final return boat docks."
      },
      {
        dayNumber: 5,
        date: "2026-12-14",
        dayTitle: "Presidential Convoy Departure Transfer",
        reportingTime: "10:30 IST",
        releaseTime: "12:30 IST (Trip Sign-Off)",
        startLocation: "The Oberoi Udaivilas Presidential Wing",
        endLocation: "General Aviation VIP Terminal, Udaipur Airport",
        routeOverview: "Udaivilas ➔ Express Corridor ➔ Airport Bypass ➔ General Aviation VIP Terminal",
        distanceKm: 26,
        travelDuration: "35 mins",
        sightseeingVisits: [
          "Presidential motorcade farewell transfer",
          "Direct tarmac escort to private jet steps"
        ],
        chauffeurDirectives: "Full ceremonial departure formation. Transfer all delegation luggage directly to aircraft hold."
      }
    ],
        guideSchedule: [`;

if (!crmContent.includes(singhaniaTarget)) {
  console.error("Failed to find singhaniaTarget in crmStore.ts");
} else {
  crmContent = crmContent.replace(singhaniaTarget, singhaniaRepl);
  console.log("Successfully added Days 2-5 to lead-singhania-2026");
}

if (isCrmCRLF) {
  crmContent = crmContent.replace(/\n/g, "\r\n");
}
fs.writeFileSync(crmStorePath, crmContent, "utf8");
console.log("Updated crmStore.ts successfully.");

// ============================================================================
// 2. UPDATE vendor/portal/page.tsx FOR DRIVER ARRIVAL TIME & TIMED MEAL SCHEDULE
// ============================================================================
const portalPath = path.join(__dirname, "..", "src", "app", "vendor", "portal", "page.tsx");
let portalContent = fs.readFileSync(portalPath, "utf8");
const isPortalCRLF = portalContent.includes("\r\n");
portalContent = portalContent.replace(/\r\n/g, "\n");

// Add getDriverMealSchedule helper if not present
if (!portalContent.includes("function getDriverMealSchedule")) {
  const insertBefore = `export default function VendorPortalPage() {`;
  const helperCode = `// Helper function: Driver-specific meal schedule (TIMINGS & VENUES ONLY - NO DISHES/RECIPES)
function getDriverMealSchedule(lead: CRMLead, dayNumber: number, date?: string) {
  const guideDay = lead.guideSchedule?.find((g) => g.dayNumber === dayNumber);
  const isFirstDay = dayNumber === 1;
  const totalDays = lead.routeSchedule?.length || 6;
  const isFinalDay = dayNumber === totalDays;

  const lunchVenue = guideDay?.diningBriefing?.lunchVenue || "1559 AD Heritage Restaurant / Fatehsagar Lake View";
  const highTeaVenue = guideDay?.diningBriefing?.highTeaVenue || "The Oberoi Udaivilas Lakeside Domes";
  const dinnerVenue = guideDay?.diningBriefing?.dinnerVenue || "Jagmandir Island Palace / Main Dining Hall";

  return {
    breakfast: {
      title: "Breakfast / Morning Service",
      time: isFirstDay ? "14:00 IST (Tarmac Arrival Welcome)" : "08:00 – 09:30 IST",
      venue: isFirstDay ? "Airport VIP Lounge / Hotel Welcome Veranda" : "Hotel Lakeside Breakfast Terrace",
      driverDuty: isFirstDay
        ? "Flight touchdown standby at 13:15 IST • Placard ready at Gate 2"
        : "Vehicle wiped & AC cooled at hotel lobby by 09:15 IST for morning departure",
    },
    lunch: {
      title: "Royal Lunch Excursion",
      time: "13:00 – 14:30 IST",
      venue: lunchVenue,
      driverDuty: "Drop guests at venue by 12:45 IST (15 mins prior) • Standby for pickup at 14:30 IST",
    },
    highTea: {
      title: "Sunset High-Tea & Sundowner",
      time: "17:00 – 18:00 IST",
      venue: highTeaVenue,
      driverDuty: "Arrive at high-tea venue by 16:45 IST • Standby at 18:00 IST for evening transfer",
    },
    dinner: {
      title: isFinalDay ? "Farewell Royal Dinner" : "Evening Banquet & Royal Dinner",
      time: "20:00 – 22:30 IST",
      venue: dinnerVenue,
      driverDuty: "Drop guests at dining venue / dock at 19:45 IST • Standby for return transfer at 22:30 IST",
    },
  };
}

`;
  portalContent = portalContent.replace(insertBefore, helperCode + insertBefore);
  console.log("Added getDriverMealSchedule helper");
}

// In View 1: Update activeDriverDayNum, currentDriverRouteDay, driverMealSchedule in selectedDateBookings loop
const view1LeadVarsTarget = `                  const isArrivalDay = arr?.arrivalDate === selectedDate;
                  const isDepartureDay = arr?.checkOutDate === selectedDate;
                  const routeDay = lead.routeSchedule?.find((r) => r.date === selectedDate);`;

const view1LeadVarsRepl = `                  const isArrivalDay = arr?.arrivalDate === selectedDate;
                  const isDepartureDay = arr?.checkOutDate === selectedDate;
                  const activeDriverDayNum = activeRouteDayNumber[lead.id] || (lead.routeSchedule?.find((r) => r.date === selectedDate)?.dayNumber || 1);
                  const currentDriverRouteDay = lead.routeSchedule?.find((r) => r.dayNumber === activeDriverDayNum) || lead.routeSchedule?.[0];
                  const driverMealSchedule = getDriverMealSchedule(lead, activeDriverDayNum, currentDriverRouteDay?.date);
                  const routeDay = lead.routeSchedule?.find((r) => r.date === selectedDate);`;

if (!portalContent.includes(view1LeadVarsTarget)) {
  console.error("Failed to find view1LeadVarsTarget");
} else {
  portalContent = portalContent.replace(view1LeadVarsTarget, view1LeadVarsRepl);
  console.log("Successfully replaced view1LeadVarsTarget");
}

// In View 1: Replace driver block (Reporting Time -> Guest Arrival Time, Multi-day tabs, Timed meal schedule)
const view1DriverBlockTarget = `                      ) : (
                        <div className="space-y-4">
                          {/* 1. Driver Core Logistics Box: Reporting, Start/End, Pickup & Drop Points */}
                          {arr && (
                        <div className="p-4 rounded-xl bg-[#161616] border border-[#292929] space-y-3">
                          <div className="flex items-center justify-between border-b border-[#222] pb-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              Booking Duration, Reporting Window & Pickup/Drop Coordinates
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                              {arr.totalDays || lead.duration}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Chauffeur Reporting Time</span>
                              <p className="font-mono text-[#C5A059] font-bold text-sm">{arr.pickupReportingTime}</p>
                              <span className="text-[9px] text-[#888] font-mono">Flight arrival: {arr.arrivalTime}</span>
                            </div>

                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Pickup Location (Day 1)</span>
                              <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.pickupLocation}</p>
                              <span className="text-[9px] text-sky-400 font-mono">Gate 2 • Placard Ready</span>
                            </div>

                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Drop-off Destination (Day 1)</span>
                              <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.dropoffLocation}</p>
                              <span className="text-[9px] text-emerald-400 font-mono">Check-in at {arr.checkInTime}</span>
                            </div>

                            <div className="space-y-0.5">
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Final Trip Drop-off</span>
                              <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.finalDropoffTime || "Airport Gate 1"}</p>
                              <span className="text-[9px] text-rose-400 font-mono">End of Booking</span>
                            </div>
                          </div>

                          {arr.transferVehicle && (
                            <div className="pt-2 border-t border-[#222] flex flex-wrap items-center justify-between text-[11px] text-[#A1A1AA] gap-2">
                              <span>
                                <strong>Assigned Fleet:</strong> {arr.transferVehicle} {arr.licensePlate ? `(${arr.licensePlate})` : ""}
                              </span>
                              <span>
                                <strong>Chauffeur Protocol:</strong> {arr.chauffeurUniform || "White Formal Livery with Gloves"}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 2. Route Schedule for the Selected Date ("Kha se kha jana h or khakha visit karwana h") */}
                      {routeDay && (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-sky-950/80 space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                              <Navigation className="w-4 h-4 text-sky-400" />
                              Day {routeDay.dayNumber} Route Itinerary & Sightseeing Plan ({selectedDate})
                            </span>
                            <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                              Duty: {routeDay.reportingTime} – {routeDay.releaseTime}
                            </span>
                          </div>

                          {/* Route Overview: Where to go from where */}
                          <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-1.5">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                              Transit Route (Where to go from where)
                            </span>
                            <p className="text-sm font-serif text-[#FDFBF7] leading-relaxed">
                              {routeDay.routeOverview}
                            </p>
                            <div className="flex items-center gap-4 text-[10px] font-mono text-[#888] pt-1">
                              <span>Distance: <strong className="text-[#D4D4D8]">{routeDay.distanceKm} km</strong></span>
                              <span>•</span>
                              <span>Travel Time: <strong className="text-[#D4D4D8]">{routeDay.travelDuration}</strong></span>
                              <span>•</span>
                              <span>From: <strong className="text-sky-300">{routeDay.startLocation}</strong></span>
                              <span>➔</span>
                              <span>To: <strong className="text-emerald-300">{routeDay.endLocation}</strong></span>
                            </div>
                          </div>

                          {/* Sightseeing Stops: Khakha visit karwana h */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                              Sightseeing & Monument Excursions to Visit (Khakha visit karwana hai):
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {routeDay.sightseeingVisits.map((visit, i) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-lg bg-[#111111] border border-[#242424] flex items-start gap-2 text-xs"
                                >
                                  <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                                  <span className="text-[#D4D4D8] font-medium">{visit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Chauffeur Directives */}
                          {routeDay.chauffeurDirectives && (
                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] text-xs space-y-1">
                              <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                Chauffeur VIP Directives:
                              </span>
                              <p className="text-[#A1A1AA] leading-relaxed">
                                {routeDay.chauffeurDirectives}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 3. Full Gourmet Menu of the Selected Day */}
                      {menuDay && (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2A2A2A] space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5" />
                              Gourmet Gastronomy Plan for this Date ({selectedDate})
                            </span>
                            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                              Dietary Directives Verified
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Coffee className="w-3 h-3" /> Breakfast / Morning
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.breakfast}</p>
                            </div>

                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Utensils className="w-3 h-3" /> Royal Lunch
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.lunch}</p>
                            </div>

                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Coffee className="w-3 h-3" /> Sunset High-Tea
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.highTea || "Royal Tea Service"}</p>
                            </div>

                            <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                <Wine className="w-3 h-3" /> Evening Banquet
                              </span>
                              <p className="text-[#FDFBF7] text-xs leading-relaxed">{menuDay.dinner}</p>
                              {menuDay.winePairing && (
                                <p className="text-[10px] text-amber-300 font-mono mt-1 pt-1 border-t border-[#222]">
                                  Pairing: {menuDay.winePairing}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#121212] border border-[#222] text-xs text-emerald-300 font-mono">
                            <strong>Dietary Notes:</strong> {menuDay.dietaryNotes}
                          </div>
                        </div>
                      )}`;

const view1DriverBlockRepl = `                      ) : (
                        <div className="space-y-4">
                          {/* 1. Driver Core Logistics Box: Arrival Time, Start/End, Pickup & Drop Points */}
                          {arr && (
                            <div className="p-4 rounded-xl bg-[#161616] border border-[#292929] space-y-3">
                              <div className="flex items-center justify-between border-b border-[#222] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  Booking Duration, Arrival Time & Pickup/Drop Coordinates
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                  {arr.totalDays || lead.duration}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Guest Arrival Time</span>
                                  <p className="font-mono text-[#C5A059] font-bold text-sm">{arr.arrivalTime || "13:45 IST"}</p>
                                  <span className="text-[9px] text-[#888] font-mono">Chauffeur Ready: {arr.pickupReportingTime || "13:15 IST (30m prior)"}</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Pickup Location (Day 1)</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.pickupLocation}</p>
                                  <span className="text-[9px] text-sky-400 font-mono">Gate 2 • Placard Ready</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Drop-off Destination (Day 1)</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.dropoffLocation}</p>
                                  <span className="text-[9px] text-emerald-400 font-mono">Check-in at {arr.checkInTime}</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Final Trip Drop-off</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">{arr.finalDropoffTime || "Airport Gate 1"}</p>
                                  <span className="text-[9px] text-rose-400 font-mono">End of Booking</span>
                                </div>
                              </div>

                              {arr.transferVehicle && (
                                <div className="pt-2 border-t border-[#222] flex flex-wrap items-center justify-between text-[11px] text-[#A1A1AA] gap-2">
                                  <span>
                                    <strong>Assigned Fleet:</strong> {arr.transferVehicle} {arr.licensePlate ? \`(\${arr.licensePlate})\` : ""}
                                  </span>
                                  <span>
                                    <strong>Chauffeur Protocol:</strong> {arr.chauffeurUniform || "White Formal Livery with Gloves"}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 2. Complete Multi-Day Route Itinerary (All Days Pre-Decided for Driver) */}
                          {lead.routeSchedule && lead.routeSchedule.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-sky-950/80 space-y-4">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#242424] pb-2">
                                <div>
                                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                                    <Navigation className="w-4 h-4 text-sky-400" />
                                    Complete {lead.routeSchedule.length}-Day Route & Sightseeing Itinerary ({arr?.totalDays || lead.duration})
                                  </span>
                                  <span className="text-[10px] text-[#888] font-mono block mt-0.5">
                                    Pre-decided transit routes, duty timings, and sightseeing stops across all {lead.routeSchedule.length} days:
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2.5 py-1 rounded border border-sky-800">
                                  Active Day Duty: {currentDriverRouteDay?.reportingTime} – {currentDriverRouteDay?.releaseTime}
                                </span>
                              </div>

                              {/* Multi-Day Selector Pills so Driver can inspect any/all days */}
                              <div className="flex flex-wrap items-center gap-1.5">
                                {lead.routeSchedule.map((r) => (
                                  <button
                                    key={r.dayNumber}
                                    type="button"
                                    onClick={() =>
                                      setActiveRouteDayNumber((prev) => ({ ...prev, [lead.id]: r.dayNumber }))
                                    }
                                    className={\`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer \${
                                      activeDriverDayNum === r.dayNumber
                                        ? "bg-sky-950 text-sky-200 border border-sky-600 font-bold shadow-sm"
                                        : "bg-[#141414] text-[#888] hover:text-[#D4D4D8] border border-[#2B2B2B]"
                                    }\`}
                                  >
                                    Day {r.dayNumber} ({r.date.slice(5)})
                                  </button>
                                ))}
                              </div>

                              {/* Active Day Route Card */}
                              {currentDriverRouteDay && (
                                <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] space-y-3.5 text-xs">
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-2.5">
                                    <div>
                                      <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                        Day {currentDriverRouteDay.dayNumber} Transit Schedule ({currentDriverRouteDay.date})
                                      </span>
                                      <h5 className="font-serif text-base text-[#FDFBF7] font-semibold mt-0.5">
                                        {currentDriverRouteDay.dayTitle}
                                      </h5>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-medium">
                                        Reporting (Kitne bje jana hai): <strong>{currentDriverRouteDay.reportingTime}</strong>
                                      </span>
                                      <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800 font-medium">
                                        Release (Kitne bje aana hai): <strong>{currentDriverRouteDay.releaseTime}</strong>
                                      </span>
                                    </div>
                                  </div>

                                  {/* Transit Route (Kha se kha jana hai) */}
                                  <div className="p-3 rounded-xl bg-[#161616] border border-[#242424] space-y-1.5">
                                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                      Transit Route (Kha se kha jana hai):
                                    </span>
                                    <p className="text-sm font-serif text-[#FDFBF7] leading-relaxed">
                                      {currentDriverRouteDay.routeOverview}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#888] pt-1">
                                      <span>Distance: <strong className="text-[#D4D4D8]">{currentDriverRouteDay.distanceKm} km</strong></span>
                                      <span>•</span>
                                      <span>Travel Time: <strong className="text-[#D4D4D8]">{currentDriverRouteDay.travelDuration}</strong></span>
                                      <span>•</span>
                                      <span>Pickup Point: <strong className="text-sky-300">{currentDriverRouteDay.startLocation}</strong></span>
                                      <span>➔</span>
                                      <span>Drop Destination: <strong className="text-emerald-300">{currentDriverRouteDay.endLocation}</strong></span>
                                    </div>
                                  </div>

                                  {/* Sightseeing Stops (Khakha visit karwana hai) */}
                                  <div className="space-y-1.5">
                                    <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                      Sightseeing & Monument Excursions to Visit (Khakha visit karwana hai):
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {currentDriverRouteDay.sightseeingVisits.map((visit, i) => (
                                        <div
                                          key={i}
                                          className="p-2.5 rounded-lg bg-[#161616] border border-[#242424] flex items-start gap-2 text-xs"
                                        >
                                          <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                                          <span className="text-[#D4D4D8] font-medium">{visit}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Chauffeur Directives */}
                                  {currentDriverRouteDay.chauffeurDirectives && (
                                    <div className="p-3 rounded-lg bg-[#161616] border border-[#242424] text-xs space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                        Chauffeur VIP Directives:
                                      </span>
                                      <p className="text-[#A1A1AA] leading-relaxed">
                                        {currentDriverRouteDay.chauffeurDirectives}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* All-Days Master Timeline Roadmap (So driver sees all 5/6 days at a glance) */}
                              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242424] space-y-2">
                                <span className="text-[10px] font-mono uppercase text-[#A1A1AA] font-semibold block">
                                  📋 Full {lead.routeSchedule.length}-Day Tour Roadmap (All Days Pre-Decided At a Glance):
                                </span>
                                <div className="space-y-1.5">
                                  {lead.routeSchedule.map((day) => (
                                    <div
                                      key={day.dayNumber}
                                      onClick={() => setActiveRouteDayNumber((prev) => ({ ...prev, [lead.id]: day.dayNumber }))}
                                      className={\`p-2 rounded-lg border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 cursor-pointer transition-all \${
                                        activeDriverDayNum === day.dayNumber
                                          ? "bg-[#1E1E1E] border-sky-600/70 text-[#FDFBF7]"
                                          : "bg-[#101010] border-[#222] text-[#888] hover:border-[#333] hover:text-[#CCC]"
                                      }\`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-sky-300 font-bold">
                                          Day {day.dayNumber}
                                        </span>
                                        <span className="font-mono text-[10px] text-[#A1A1AA]">{day.date}</span>
                                        <span className="font-serif font-medium text-xs text-[#E4E4E7] truncate max-w-[240px] sm:max-w-[340px]">
                                          {day.dayTitle}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 text-[10px] font-mono">
                                        <span className="text-emerald-400">Jana: {day.reportingTime.split(" ")[0]} IST</span>
                                        <span>•</span>
                                        <span className="text-sky-300">Aana: {day.releaseTime.split(" ")[0]} IST</span>
                                        <span>•</span>
                                        <span className="text-[#71717A]">{day.distanceKm} km</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. Driver Meal Schedule & Transit Timings (TIMINGS ONLY - NO DISHES/RECIPES) */}
                          <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-amber-900/40 space-y-3.5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#262626] pb-2">
                              <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-[#C5A059]" />
                                  Guest Meal Schedule & Chauffeur Transit Drop/Pickup Timings ({currentDriverRouteDay?.date || selectedDate})
                                </span>
                                <span className="text-[10px] text-[#A1A1AA] font-mono block mt-0.5">
                                  Meal timings for chauffeur: drop guests 15 mins prior and standby for pickup.
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                                Day {activeDriverDayNum} Dining Duty
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                              {/* Breakfast */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Coffee className="w-3 h-3 text-[#C5A059]" /> Breakfast / Morning
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.breakfast.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.breakfast.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.breakfast.driverDuty}
                                </div>
                              </div>

                              {/* Royal Lunch */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Utensils className="w-3 h-3 text-[#C5A059]" /> Royal Lunch
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.lunch.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.lunch.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.lunch.driverDuty}
                                </div>
                              </div>

                              {/* Sunset High-Tea */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#222] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Coffee className="w-3 h-3 text-[#C5A059]" /> Sunset High-Tea
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.highTea.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.highTea.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.highTea.driverDuty}
                                </div>
                              </div>

                              {/* Evening Royal Dinner */}
                              <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                                <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                  <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                    <Wine className="w-3 h-3 text-[#C5A059]" /> Evening Dinner
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {driverMealSchedule.dinner.time}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">{driverMealSchedule.dinner.venue}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                  <strong>Chauffeur Duty:</strong> {driverMealSchedule.dinner.driverDuty}
                                </div>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#121212] border border-amber-900/40 text-xs text-amber-300 font-mono flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span><strong>Chauffeur Dining Protocol:</strong> Drop guests at dining venue 15 minutes before scheduled reservation. Maintain AC cabin pre-cooled to 21°C. Standby at entrance/dock for return transit.</span>
                            </div>
                          </div>`;

if (!portalContent.includes(view1DriverBlockTarget)) {
  console.error("Failed to find view1DriverBlockTarget in portal page.tsx");
} else {
  portalContent = portalContent.replace(view1DriverBlockTarget, view1DriverBlockRepl);
  console.log("Successfully replaced view1DriverBlockTarget");
}

// In View 2: Replace Chauffeur Reporting Time with Guest Arrival Time
const view2ChauffeurTimeTarget = `                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Chauffeur Reporting Time</span>
                          <span className="font-mono text-[#C5A059] font-bold text-sm">{arr.pickupReportingTime}</span>
                          <span className="text-[9px] text-[#888] font-mono block">Day 1 Arrival Duty</span>
                        </div>`;

const view2ChauffeurTimeRepl = `                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Guest Arrival Time</span>
                          <span className="font-mono text-[#C5A059] font-bold text-sm">{arr.arrivalTime || "13:45 IST"}</span>
                          <span className="text-[9px] text-[#888] font-mono block">Chauffeur Ready: {arr.pickupReportingTime}</span>
                        </div>`;

if (!portalContent.includes(view2ChauffeurTimeTarget)) {
  console.error("Failed to find view2ChauffeurTimeTarget in portal page.tsx");
} else {
  portalContent = portalContent.replace(view2ChauffeurTimeTarget, view2ChauffeurTimeRepl);
  console.log("Successfully replaced view2ChauffeurTimeTarget");
}

// In View 2: Add duty reporting & release time badges + roadmap to View 2 route card
const view2RouteHeaderTarget = `                      {/* Active Day Route Card */}
                      {currentRouteDay && (
                        <div className="p-4 rounded-xl bg-[#111111] border border-[#262626] space-y-3 text-xs">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-2">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] block">
                                Day {currentRouteDay.dayNumber} Schedule ({currentRouteDay.date})
                              </span>
                              <h5 className="font-serif text-base text-[#FDFBF7] font-semibold">
                                {currentRouteDay.dayTitle}
                              </h5>
                            </div>
                            <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                              Duty Hours: {currentRouteDay.reportingTime} – {currentRouteDay.releaseTime}
                            </span>
                          </div>`;

const view2RouteHeaderRepl = `                      {/* Active Day Route Card */}
                      {currentRouteDay && (
                        <div className="p-4 rounded-xl bg-[#111111] border border-[#262626] space-y-3.5 text-xs">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#222] pb-2">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-semibold">
                                Day {currentRouteDay.dayNumber} Schedule ({currentRouteDay.date})
                              </span>
                              <h5 className="font-serif text-base text-[#FDFBF7] font-semibold mt-0.5">
                                {currentRouteDay.dayTitle}
                              </h5>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800 font-medium">
                                Reporting (Jana hai): <strong>{currentRouteDay.reportingTime}</strong>
                              </span>
                              <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded border border-sky-800 font-medium">
                                Release (Aana hai): <strong>{currentRouteDay.releaseTime}</strong>
                              </span>
                            </div>
                          </div>`;

if (!portalContent.includes(view2RouteHeaderTarget)) {
  console.error("Failed to find view2RouteHeaderTarget in portal page.tsx");
} else {
  portalContent = portalContent.replace(view2RouteHeaderTarget, view2RouteHeaderRepl);
  console.log("Successfully replaced view2RouteHeaderTarget");
}

// In View 2: Replace dishes accordion for driver with Timed Meal Schedule
const view2AccordionTarget = `                  {/* Expandable Gourmet Dining Plan Accordion */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMenuLeadId(isMenuExpanded ? null : lead.id)
                      }
                      className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#202020] border border-[#333333] flex items-center justify-between text-xs font-mono text-[#C5A059] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#C5A059]" />
                        <span className="font-semibold">
                          {isMenuExpanded
                            ? "Hide Gourmet Dining & Wine Pairing Plan"
                            : \`View Complete Day-by-Day Gourmet Dining Plan (\${lead.gourmetMenuPlan?.length || 0} Days Included)\`}
                        </span>
                      </div>
                      {isMenuExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {isMenuExpanded && lead.gourmetMenuPlan && (
                      <div className="grid grid-cols-1 gap-3 p-4 rounded-xl bg-[#121212] border border-[#222222] animate-in fade-in">
                        {lead.gourmetMenuPlan.map((m) => (`;

const view2AccordionRepl = `                  {/* Dining Schedule: Timed Transit Coordinates for Driver vs Gourmet Plan for Others */}
                  {partner.role === "driver" ? (
                    (() => {
                      const dSchedule = getDriverMealSchedule(lead, activeDayNum, currentRouteDay?.date);
                      return (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-amber-900/40 space-y-3.5 my-3">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#262626] pb-2">
                            <div>
                              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-[#C5A059]" />
                                Day {activeDayNum} Guest Dining Timings & Chauffeur Standby ({currentRouteDay?.date || lead.dateKey})
                              </span>
                              <span className="text-[10px] text-[#A1A1AA] font-mono block mt-0.5">
                                Meal schedule for chauffeur: drop guests 15 mins prior and standby for pickup.
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                              Day {activeDayNum} Dining Duty
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Coffee className="w-3 h-3 text-[#C5A059]" /> Breakfast
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.breakfast.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.breakfast.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.breakfast.driverDuty}
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Utensils className="w-3 h-3 text-[#C5A059]" /> Royal Lunch
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.lunch.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.lunch.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.lunch.driverDuty}
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Coffee className="w-3 h-3 text-[#C5A059]" /> Sunset High-Tea
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.highTea.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.highTea.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.highTea.driverDuty}
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#111111] border border-[#242424] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#222] pb-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] flex items-center gap-1 font-semibold">
                                  <Wine className="w-3 h-3 text-[#C5A059]" /> Evening Dinner
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                  {dSchedule.dinner.time}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-[#71717A] uppercase font-mono block">Venue:</span>
                                <p className="text-[#FDFBF7] text-xs font-serif font-medium">{dSchedule.dinner.venue}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-[#161616] border border-[#222] text-[10px] text-amber-300 font-mono">
                                <strong>Chauffeur Duty:</strong> {dSchedule.dinner.driverDuty}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMenuLeadId(isMenuExpanded ? null : lead.id)
                      }
                      className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#202020] border border-[#333333] flex items-center justify-between text-xs font-mono text-[#C5A059] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#C5A059]" />
                        <span className="font-semibold">
                          {isMenuExpanded
                            ? "Hide Gourmet Dining & Wine Pairing Plan"
                            : \`View Complete Day-by-Day Gourmet Dining Plan (\${lead.gourmetMenuPlan?.length || 0} Days Included)\`}
                        </span>
                      </div>
                      {isMenuExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {isMenuExpanded && lead.gourmetMenuPlan && (
                      <div className="grid grid-cols-1 gap-3 p-4 rounded-xl bg-[#121212] border border-[#222222] animate-in fade-in">
                        {lead.gourmetMenuPlan.map((m) => (`;

if (!portalContent.includes(view2AccordionTarget)) {
  console.error("Failed to find view2AccordionTarget in portal page.tsx");
} else {
  portalContent = portalContent.replace(view2AccordionTarget, view2AccordionRepl);
  console.log("Successfully replaced view2AccordionTarget");
}

if (isPortalCRLF) {
  portalContent = portalContent.replace(/\n/g, "\r\n");
}
fs.writeFileSync(portalPath, portalContent, "utf8");
console.log("Updated vendor/portal/page.tsx successfully.");
