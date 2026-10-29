const fs = require("fs");
const path = require("path");

const portalPath = path.join(__dirname, "..", "src", "app", "vendor", "portal", "page.tsx");
let portal = fs.readFileSync(portalPath, "utf8");
const isPortalCRLF = portal.includes("\r\n");
portal = portal.replace(/\r\n/g, "\n");

const target = `                  {/* Expandable Gourmet Dining Plan Accordion */}
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
                        <ChevronUp className="w-4 h-4 text-[#C5A059]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#C5A059]" />
                      )}
                    </button>

                    {isMenuExpanded && lead.gourmetMenuPlan && (
                      <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                        {lead.gourmetMenuPlan.map((m) => (
                          <div
                            key={m.dayNumber}
                            className="p-4 rounded-xl bg-[#121212] border border-[#242424] space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between border-b border-[#222] pb-2">
                              <span className="font-serif text-[#C5A059] font-bold text-sm">
                                Day {m.dayNumber}: {m.dayTitle}
                              </span>
                              <span className="font-mono text-[10px] text-[#888]">
                                Date: {m.date}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  🌅 Breakfast
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.breakfast}</p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  ☀️ Royal Lunch
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.lunch}</p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  ☕ Sunset High-Tea
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">
                                  {m.highTea || "Royal Kashmiri Kahwa & artisanal sweet treats"}
                                </p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  🌙 Evening Banquet
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.dinner}</p>
                                {m.winePairing && (
                                  <span className="text-[10px] text-amber-300 font-mono block mt-1">
                                    🍷 {m.winePairing}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-900/50">
                              <strong>Dietary & Allergy Directive:</strong> {m.dietaryNotes}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>`;

const repl = `                  {/* Dining Schedule: Timed Transit Coordinates for Driver vs Gourmet Plan for Others */}
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
                        <ChevronUp className="w-4 h-4 text-[#C5A059]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#C5A059]" />
                      )}
                    </button>

                    {isMenuExpanded && lead.gourmetMenuPlan && (
                      <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                        {lead.gourmetMenuPlan.map((m) => (
                          <div
                            key={m.dayNumber}
                            className="p-4 rounded-xl bg-[#121212] border border-[#242424] space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between border-b border-[#222] pb-2">
                              <span className="font-serif text-[#C5A059] font-bold text-sm">
                                Day {m.dayNumber}: {m.dayTitle}
                              </span>
                              <span className="font-mono text-[10px] text-[#888]">
                                Date: {m.date}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  🌅 Breakfast
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.breakfast}</p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  ☀️ Royal Lunch
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.lunch}</p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  ☕ Sunset High-Tea
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">
                                  {m.highTea || "Royal Kashmiri Kahwa & artisanal sweet treats"}
                                </p>
                              </div>

                              <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                                <span className="text-[10px] font-mono uppercase text-[#C5A059] block mb-1">
                                  🌙 Evening Banquet
                                </span>
                                <p className="text-[#D4D4D8] leading-relaxed">{m.dinner}</p>
                                {m.winePairing && (
                                  <span className="text-[10px] text-amber-300 font-mono block mt-1">
                                    🍷 {m.winePairing}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-900/50">
                              <strong>Dietary & Allergy Directive:</strong> {m.dietaryNotes}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  )}`;

if (!portal.includes(target)) {
  console.error("target not found in page.tsx");
} else {
  portal = portal.replace(target, repl);
  console.log("Successfully replaced View 2 dining accordion");
}

if (isPortalCRLF) portal = portal.replace(/\n/g, "\r\n");
fs.writeFileSync(portalPath, portal, "utf8");
console.log("Done.");
