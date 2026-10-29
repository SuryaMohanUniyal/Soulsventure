const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "app", "vendor", "portal", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Normalize CRLF to LF for reliable string matching
const isCRLF = content.includes("\r\n");
content = content.replace(/\r\n/g, "\n");

// 1. Sanitize Tour Guide Chauffeur & Fleet in View 1 (Selected Date)
const guideTransitTarget1 = `                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Chauffeur & Fleet</span>
                                <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                                  {guideDay?.transportCoordination.chauffeurName || lead.assignedChauffeur || "Vikram Singh"}
                                </span>
                                <span className="text-[9px] text-sky-400 font-mono block">{guideDay?.transportCoordination.licensePlate || "Defender 110 (RJ 27 EA 0001)"}</span>
                              </div>`;

const guideTransitRepl1 = `                              <div>
                                <span className="text-[10px] text-[#71717A] uppercase font-mono block">Excursion Transit</span>
                                <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">
                                  Private Luxury AC Fleet
                                </span>
                                <span className="text-[9px] text-sky-400 font-mono block">Dedicated Lobby Dispatch</span>
                              </div>`;

if (!content.includes(guideTransitTarget1)) {
  console.error("Failed to find guideTransitTarget1");
} else {
  content = content.replace(guideTransitTarget1, guideTransitRepl1);
  console.log("Successfully replaced guideTransitTarget1");
}

// 2. Sanitize Tour Guide Chauffeur & Fleet in View 2 (Dossiers)
const guideTransitTarget2 = `                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Chauffeur & Fleet</span>
                            <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{currentGuideDay?.transportCoordination.chauffeurName || lead.assignedChauffeur || "Vikram Singh"}</span>
                            <span className="text-[9px] text-sky-400 font-mono block">{currentGuideDay?.transportCoordination.licensePlate || "Defender 110 (RJ 27 EA 0001)"}</span>
                          </div>`;

const guideTransitRepl2 = `                          <div>
                            <span className="text-[10px] text-[#71717A] uppercase font-mono block">Excursion Transit</span>
                            <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">Private Luxury AC Fleet</span>
                            <span className="text-[9px] text-sky-400 font-mono block">Dedicated Lobby Dispatch</span>
                          </div>`;

if (!content.includes(guideTransitTarget2)) {
  console.error("Failed to find guideTransitTarget2");
} else {
  content = content.replace(guideTransitTarget2, guideTransitRepl2);
  console.log("Successfully replaced guideTransitTarget2");
}

// 3. Sanitize Tour Guide fleet details in View 2 (Line 2044)
const guideTransitTarget3 = `<span>
                                      <strong>Vehicle:</strong> {currentGuideDay.transportCoordination.vehicleModel} ({currentGuideDay.transportCoordination.licensePlate}) • <strong>Chauffeur:</strong> {currentGuideDay.transportCoordination.chauffeurName}
                                    </span>`;

const guideTransitRepl3 = `<span>
                                      <strong>Fleet Transit:</strong> Private Luxury AC Fleet • <strong>Chauffeur Coordination:</strong> Dedicated Fleet Chauffeur
                                    </span>`;

if (!content.includes(guideTransitTarget3)) {
  console.error("Failed to find guideTransitTarget3");
} else {
  content = content.replace(guideTransitTarget3, guideTransitRepl3);
  console.log("Successfully replaced guideTransitTarget3");
}

// 4. Split View 1: Add Hotel Selected Date Manifest before Driver view
const view1SplitTarget = `                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* 1. Core Logistics Box: Reporting, Start/End, Pickup & Drop Points */}
{/* 1. Core Logistics Box: Reporting, Start/End, Pickup & Drop Points */}
                      {arr && (`;

const view1SplitRepl = `                        </div>
                      ) : partner.role === "hotel" ? (
                        <div className="space-y-4">
                          {/* 1. Hotel Stay & Room Reservation Logistics */}
                          {arr && (
                            <div className="p-4 rounded-xl bg-[#161616] border border-[#292929] space-y-3">
                              <div className="flex items-center justify-between border-b border-[#222] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Hotel className="w-3.5 h-3.5" />
                                  Hotel Stay, Suite Allocation & Check-In / Out Logistics ({selectedDate})
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                  {arr.totalDays || lead.duration}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-In</span>
                                  <p className="font-mono text-[#C5A059] font-bold text-sm">
                                    {arr.arrivalDate} • {arr.checkInTime || "14:00 IST"}
                                  </p>
                                  <span className="text-[9px] text-[#888] font-mono">
                                    {isArrivalDay ? "Guest Arrives Today" : "In-House Stay"}
                                  </span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-Out</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">
                                    {arr.checkOutDate || "Nov 19, 2026"} • {arr.checkOutTime || "12:00 IST"}
                                  </p>
                                  <span className="text-[9px] text-rose-400/90 font-mono">
                                    {isDepartureDay ? "Departure Handover Today" : "Confirmed Reservation"}
                                  </span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Reserved Suite & Wing</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">
                                    {lead.clientNuances?.roomPreferences?.[0] || "Kohinoor Lake View Suite #204"}
                                  </p>
                                  <span className="text-[9px] text-emerald-400 font-mono">Palace Lake View Wing</span>
                                </div>

                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Stay Duration</span>
                                  <p className="font-serif text-[#FDFBF7] font-medium leading-snug">
                                    {arr.totalDays || lead.duration}
                                  </p>
                                  <span className="text-[9px] text-sky-400 font-mono">Full Board Gastronomy</span>
                                </div>
                              </div>

                              {/* Arrival Welcome Protocol */}
                              <div className="pt-2.5 border-t border-[#222] space-y-1 text-xs">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                                  VIP Arrival Welcome Protocol at Hotel Porch / Jetty:
                                </span>
                                <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                                  {arr.transferProtocol || lead.clientNuances?.specialProtocol || "Private Shikara boat across Lake Pichola with rose petal shower and traditional nagada drums at Badi Pal Jetty. In-suite registration upon arrival with luggage delivered directly to suite."}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* 2. VIP Room Preferences & Guest Housekeeping Nuances */}
                          {lead.clientNuances && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#181818] border border-[#2A2A2A] space-y-3.5">
                              <div className="flex items-center justify-between border-b border-[#242424] pb-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                                  <Hotel className="w-3.5 h-3.5 text-[#C5A059]" />
                                  VIP Room Nuances & Housekeeping Preferences
                                </span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                  5-Star Hospitality Directives
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                {lead.clientNuances.roomPreferences && (
                                  <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1.5">
                                    <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block">
                                      Suite Preferences & Setup:
                                    </span>
                                    <ul className="space-y-1 text-[#A1A1AA] text-[11px]">
                                      {lead.clientNuances.roomPreferences.map((pref, i) => (
                                        <li key={i} className="flex items-start gap-1.5">
                                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                          <span>{pref}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="space-y-3">
                                  {lead.clientNuances.beveragePreferences && (
                                    <div className="p-3 rounded-lg bg-[#111111] border border-[#242424] space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                        In-Suite Beverage & Mini-Bar Setup:
                                      </span>
                                      <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                                        {lead.clientNuances.beveragePreferences.join(" • ")}
                                      </p>
                                    </div>
                                  )}

                                  {lead.clientNuances.milestoneEvents && lead.clientNuances.milestoneEvents.length > 0 && (
                                    <div className="p-3 rounded-lg bg-[#111111] border border-amber-900/40 space-y-1">
                                      <span className="text-[10px] font-mono uppercase text-amber-300 font-semibold block flex items-center gap-1">
                                        <Sparkles className="w-3 h-3 text-amber-400" />
                                        VIP Milestone Celebration:
                                      </span>
                                      <p className="text-[#FDFBF7] text-xs font-serif font-medium">
                                        {lead.clientNuances.milestoneEvents[0].title} ({lead.clientNuances.milestoneEvents[0].relation})
                                      </p>
                                      <span className="text-[10px] text-[#888] font-mono block">
                                        Date: {lead.clientNuances.milestoneEvents[0].date} — Complimentary celebration cake / champagne to be arranged.
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. Full Gourmet Gastronomy Plan of the Selected Day */}
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

                              <div className="p-2.5 rounded-lg bg-[#121212] border border-amber-900/40 text-xs text-amber-300 font-mono">
                                <strong>Strict Dietary Directives:</strong> {menuDay.dietaryNotes || lead.clientNuances?.dietaryRestrictions?.join(" • ") || "Pure Vegetarian"}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* 1. Driver Core Logistics Box: Reporting, Start/End, Pickup & Drop Points */}
                          {arr && (`;

if (!content.includes(view1SplitTarget)) {
  console.error("Failed to find view1SplitTarget");
} else {
  content = content.replace(view1SplitTarget, view1SplitRepl);
  console.log("Successfully replaced view1SplitTarget");
}

// 5. Split View 2: Add Hotel Dossier before Driver view
const view2SplitTarget = `                    </div>
                  ) : (
                    <>
                      {/* Key Logistics Ribbon: Duration, Reporting, Pickup & Final Drop */}
                  {arr && (`;

const view2SplitRepl = `                    </div>
                  ) : partner.role === "hotel" ? (
                    <div className="space-y-4 my-3">
                      {/* Hotel Key Logistics Ribbon */}
                      {arr && (
                        <div className="p-4 rounded-xl bg-[#111111] border border-[#262626] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold flex items-center gap-1.5">
                              <Hotel className="w-3.5 h-3.5" />
                              Hotel Reservation Logistics: Stay Duration, Check-In / Out & Suite Tier
                            </span>
                            <span className="text-[10px] font-mono text-[#A1A1AA]">
                              {arr.totalDays || lead.duration}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-In</span>
                              <span className="font-mono text-[#C5A059] font-bold text-sm block">{arr.arrivalDate} • {arr.checkInTime || "14:00 IST"}</span>
                              <span className="text-[9px] text-[#888] font-mono block">Welcome Ceremony Ready</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Scheduled Check-Out</span>
                              <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{arr.checkOutDate || "Nov 19, 2026"} • {arr.checkOutTime || "12:00 IST"}</span>
                              <span className="text-[9px] text-emerald-400 font-mono block">Departure Handover</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Allocated Luxury Suite</span>
                              <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{lead.clientNuances?.roomPreferences?.[0] || "Kohinoor Lake View Suite #204"}</span>
                              <span className="text-[9px] text-sky-400 font-mono block">Lake Pichola Sanctuary</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#71717A] uppercase font-mono block">Total Stay Duration</span>
                              <span className="font-serif text-[#FDFBF7] font-medium block leading-tight">{arr.totalDays || lead.duration}</span>
                              <span className="text-[9px] text-amber-300 font-mono block">Confirmed Reservation</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* VIP Room Preferences & Nuances */}
                      {lead.clientNuances && (
                        <div className="p-4 sm:p-5 rounded-xl bg-[#161616] border border-[#2B2B2B] space-y-3">
                          <div className="flex items-center justify-between border-b border-[#242424] pb-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                              VIP Guest Suite Preferences & Welcome Directives
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400">
                              5-Star Service Standard
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {lead.clientNuances.roomPreferences && (
                              <div className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1.5">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block">
                                  Suite & Housekeeping Requirements:
                                </span>
                                <ul className="space-y-1 text-[#A1A1AA] text-[11px]">
                                  {lead.clientNuances.roomPreferences.map((pref, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                      <span>{pref}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="space-y-2.5">
                              {lead.clientNuances.beveragePreferences && (
                                <div className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block">
                                    In-Suite Beverage & Mini-Bar Setup:
                                  </span>
                                  <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                                    {lead.clientNuances.beveragePreferences.join(" • ")}
                                  </p>
                                </div>
                              )}

                              {lead.clientNuances.milestoneEvents && lead.clientNuances.milestoneEvents.length > 0 && (
                                <div className="p-3 rounded-lg bg-[#111111] border border-amber-900/40 space-y-0.5">
                                  <span className="text-[10px] font-mono uppercase text-amber-300 font-semibold block flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-amber-400" />
                                    VIP Milestone Celebration:
                                  </span>
                                  <p className="text-[#FDFBF7] text-xs font-serif font-medium">
                                    {lead.clientNuances.milestoneEvents[0].title} ({lead.clientNuances.milestoneEvents[0].relation})
                                  </p>
                                  <span className="text-[10px] text-[#888] font-mono block">
                                    Date: {lead.clientNuances.milestoneEvents[0].date}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Arrival Welcome Protocol */}
                          <div className="p-3 rounded-lg bg-[#111111] border border-[#222] space-y-1 text-xs">
                            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-semibold block">
                              VIP Arrival Welcome Protocol at Hotel Porch / Jetty:
                            </span>
                            <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                              {arr?.transferProtocol || lead.clientNuances?.specialProtocol || "Private Shikara boat across Lake Pichola with rose petal shower and traditional nagada drums at Badi Pal Jetty. In-suite registration upon arrival with luggage delivered directly to suite."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Driver Key Logistics Ribbon: Duration, Reporting, Pickup & Final Drop */}
                      {arr && (`;

if (!content.includes(view2SplitTarget)) {
  console.error("Failed to find view2SplitTarget");
} else {
  content = content.replace(view2SplitTarget, view2SplitRepl);
  console.log("Successfully replaced view2SplitTarget");
}

// 6. Update input placeholders
const placeholderTarget1 = `placeholder="Add partner note (e.g. Defender prepped with cold towels, reporting at 13:15 IST)..."`;
const placeholderRepl1 = `placeholder={
                            partner.role === "hotel"
                              ? isCampPartner
                                ? "Add camp note (e.g. Tent #03 inspected, naturalist briefed, high-tea ready)..."
                                : "Add hotel note (e.g. Suite #204 inspected, champagne chilled, welcome jetty ready)..."
                              : partner.role === "guide"
                              ? "Add tour guide note (e.g. ASI permits collected, lobby meeting at 09:15 IST)..."
                              : "Add chauffeur note (e.g. Defender prepped with cold towels, reporting at 13:15 IST)..."
                          }`;

if (!content.includes(placeholderTarget1)) {
  console.error("Failed to find placeholderTarget1");
} else {
  content = content.replace(placeholderTarget1, placeholderRepl1);
  console.log("Successfully replaced placeholderTarget1");
}

const placeholderTarget2 = `placeholder="Internal partner notes (e.g. Defender prepped with cold towels, reporting at 13:15 IST at Gate 2)..."`;
const placeholderRepl2 = `placeholder={
                        partner.role === "hotel"
                          ? isCampPartner
                            ? "Internal camp notes (e.g. Tent #03 inspected, plunge pool heated, bush dinner setup)..."
                            : "Internal hotel notes (e.g. Suite #204 inspected, champagne chilled at 14:00 IST)..."
                          : partner.role === "guide"
                          ? "Internal guide notes (e.g. ASI passes validated, heritage briefing prepared)..."
                          : "Internal chauffeur notes (e.g. Defender prepped with cold towels, reporting at 13:15 IST at Gate 2)..."
                      }`;

if (!content.includes(placeholderTarget2)) {
  console.error("Failed to find placeholderTarget2");
} else {
  content = content.replace(placeholderTarget2, placeholderRepl2);
  console.log("Successfully replaced placeholderTarget2");
}

// Write back with appropriate line endings
if (isCRLF) {
  content = content.replace(/\n/g, "\r\n");
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Updated src/app/vendor/portal/page.tsx successfully.");
