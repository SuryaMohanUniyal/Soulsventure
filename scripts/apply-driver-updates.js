const fs = require("fs");
const path = require("path");

// 1. UPDATE crmStore.ts
const crmPath = path.join(__dirname, "..", "src", "lib", "crmStore.ts");
let crm = fs.readFileSync(crmPath, "utf8");
const isCrmCRLF = crm.includes("\r\n");
crm = crm.replace(/\r\n/g, "\n");

// lead-vance-2026 Days 3-6
const vanceDays = fs.readFileSync(path.join(__dirname, "driver_vance_days.txt"), "utf8").replace(/\r\n/g, "\n");
const vanceTarget = `        chauffeurDirectives: "Coordinate with 4x4 safari team. Keep cold drinks, mineral water, and binoculars accessible."
      }
    ],
        campSchedule: [`;

const vanceRepl = `        chauffeurDirectives: "Coordinate with 4x4 safari team. Keep cold drinks, mineral water, and binoculars accessible."
      },
${vanceDays}
    ],
        campSchedule: [`;

if (!crm.includes(vanceTarget)) {
  console.error("vanceTarget not found");
} else {
  crm = crm.replace(vanceTarget, vanceRepl);
  console.log("Added Vance days 3-6");
}

// lead-rohan-2026 Days 3-5
const rohanDays = fs.readFileSync(path.join(__dirname, "driver_rohan_days.txt"), "utf8").replace(/\r\n/g, "\n");
const rohanTarget = `        chauffeurDirectives: "Ensure Vintage Cadillac is prepped and polished for afternoon 16:30 IST lakeside promenade drive."
      }
    ],
        guideSchedule: [`;

const rohanRepl = `        chauffeurDirectives: "Ensure Vintage Cadillac is prepped and polished for afternoon 16:30 IST lakeside promenade drive."
      },
${rohanDays}
    ],
        guideSchedule: [`;

if (!crm.includes(rohanTarget)) {
  console.error("rohanTarget not found");
} else {
  crm = crm.replace(rohanTarget, rohanRepl);
  console.log("Added Rohan days 3-5");
}

// lead-singhania-2026 Days 2-5
const singhaniaDays = fs.readFileSync(path.join(__dirname, "driver_singhania_days.txt"), "utf8").replace(/\r\n/g, "\n");
const singhaniaTarget = `        chauffeurDirectives: "Both Defenders in tandem formation with luggage van behind. Presidential protocol in place."
      }
    ],
        guideSchedule: [`;

const singhaniaRepl = `        chauffeurDirectives: "Both Defenders in tandem formation with luggage van behind. Presidential protocol in place."
      },
${singhaniaDays}
    ],
        guideSchedule: [`;

if (!crm.includes(singhaniaTarget)) {
  console.error("singhaniaTarget not found");
} else {
  crm = crm.replace(singhaniaTarget, singhaniaRepl);
  console.log("Added Singhania days 2-5");
}

if (isCrmCRLF) crm = crm.replace(/\n/g, "\r\n");
fs.writeFileSync(crmPath, crm, "utf8");
console.log("crmStore.ts updated successfully.");

// 2. UPDATE vendor/portal/page.tsx
const portalPath = path.join(__dirname, "..", "src", "app", "vendor", "portal", "page.tsx");
let portal = fs.readFileSync(portalPath, "utf8");
const isPortalCRLF = portal.includes("\r\n");
portal = portal.replace(/\r\n/g, "\n");

// Add helper function before export default
const helperCode = fs.readFileSync(path.join(__dirname, "driver_helper.txt"), "utf8").replace(/\r\n/g, "\n");
if (!portal.includes("function getDriverMealSchedule")) {
  portal = portal.replace("export default function VendorPortalPage() {", helperCode + "export default function VendorPortalPage() {");
  console.log("Added helper to page.tsx");
}

// In View 1: Variables inside selectedDateBookings
const v1VarsTarget = `                  const isArrivalDay = arr?.arrivalDate === selectedDate;
                  const isDepartureDay = arr?.checkOutDate === selectedDate;
                  const routeDay = lead.routeSchedule?.find((r) => r.date === selectedDate);`;

const v1VarsRepl = `                  const isArrivalDay = arr?.arrivalDate === selectedDate;
                  const isDepartureDay = arr?.checkOutDate === selectedDate;
                  const activeDriverDayNum = activeRouteDayNumber[lead.id] || (lead.routeSchedule?.find((r) => r.date === selectedDate)?.dayNumber || 1);
                  const currentDriverRouteDay = lead.routeSchedule?.find((r) => r.dayNumber === activeDriverDayNum) || lead.routeSchedule?.[0];
                  const driverMealSchedule = getDriverMealSchedule(lead, activeDriverDayNum, currentDriverRouteDay?.date);
                  const routeDay = lead.routeSchedule?.find((r) => r.date === selectedDate);`;

if (!portal.includes(v1VarsTarget)) {
  console.error("v1VarsTarget not found");
} else {
  portal = portal.replace(v1VarsTarget, v1VarsRepl);
  console.log("Replaced v1VarsTarget");
}

// In View 1: Replace driver block
const v1DriverTarget = `                      ) : (
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
                                <strong>Assigned Fleet:</strong> {arr.transferVehicle} {arr.licensePlate ? \`(\${arr.licensePlate})\` : ""}
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

const v1DriverRepl = fs.readFileSync(path.join(__dirname, "driver_view1_repl.txt"), "utf8").replace(/\r\n/g, "\n");

if (!portal.includes(v1DriverTarget)) {
  console.error("v1DriverTarget not found");
} else {
  portal = portal.replace(v1DriverTarget, v1DriverRepl);
  console.log("Replaced v1DriverTarget");
}

// In View 2: Replace Chauffeur Reporting Time with Guest Arrival Time
const v2ChauffeurTimeTarget = `                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Chauffeur Reporting Time</span>
                          <span className="font-mono text-[#C5A059] font-bold text-sm">{arr.pickupReportingTime}</span>
                          <span className="text-[9px] text-[#888] font-mono block">Day 1 Arrival Duty</span>
                        </div>`;

const v2ChauffeurTimeRepl = `                        <div>
                          <span className="text-[10px] text-[#71717A] uppercase font-mono block">Guest Arrival Time</span>
                          <span className="font-mono text-[#C5A059] font-bold text-sm">{arr.arrivalTime || "13:45 IST"}</span>
                          <span className="text-[9px] text-[#888] font-mono block">Chauffeur Ready: {arr.pickupReportingTime}</span>
                        </div>`;

if (!portal.includes(v2ChauffeurTimeTarget)) {
  console.error("v2ChauffeurTimeTarget not found");
} else {
  portal = portal.replace(v2ChauffeurTimeTarget, v2ChauffeurTimeRepl);
  console.log("Replaced v2ChauffeurTimeTarget");
}

// In View 2: Replace View 2 active day route card duty badges
const v2RouteHeaderTarget = `                      {/* Active Day Route Card */}
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

const v2RouteHeaderRepl = `                      {/* Active Day Route Card */}
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

if (!portal.includes(v2RouteHeaderTarget)) {
  console.error("v2RouteHeaderTarget not found");
} else {
  portal = portal.replace(v2RouteHeaderTarget, v2RouteHeaderRepl);
  console.log("Replaced v2RouteHeaderTarget");
}

// In View 2: Replace menu accordion with Driver Timed Schedule
const v2AccordionTarget = `                  {/* Expandable Gourmet Dining Plan Accordion */}
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

const v2AccordionRepl = fs.readFileSync(path.join(__dirname, "driver_view2_repl.txt"), "utf8").replace(/\r\n/g, "\n");

if (!portal.includes(v2AccordionTarget)) {
  console.error("v2AccordionTarget not found");
} else {
  portal = portal.replace(v2AccordionTarget, v2AccordionRepl);
  console.log("Replaced v2AccordionTarget");
}

if (isPortalCRLF) portal = portal.replace(/\n/g, "\r\n");
fs.writeFileSync(portalPath, portal, "utf8");
console.log("vendor/portal/page.tsx updated successfully.");
