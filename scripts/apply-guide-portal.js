const fs = require('fs');
const path = require('path');

const portalPath = path.join(__dirname, '../src/app/vendor/portal/page.tsx');
let portal = fs.readFileSync(portalPath, 'utf8');

console.log('Original portal length:', portal.length);

// 1. Add activeGuideDayNum and currentGuideDay in View 1 mapping
const v1VarAnchor = `                  const menuDay = lead.gourmetMenuPlan?.find((m) => m.date === selectedDate);`;
const v1VarAddition = `                  const menuDay = lead.gourmetMenuPlan?.find((m) => m.date === selectedDate);
                  const activeGuideDayNum = activeGuideDayNumber[lead.id] || (guideDay?.dayNumber || 1);
                  const currentGuideDay = lead.guideSchedule?.find((g) => g.dayNumber === activeGuideDayNum) || guideDay || lead.guideSchedule?.[0];`;

if (!portal.includes(v1VarAnchor)) {
  console.error('v1VarAnchor not found!');
  process.exit(1);
}
portal = portal.replace(v1VarAnchor, v1VarAddition);
console.log('View 1 guide day variables added');

// 2. Replace View 1 Tour Guide Block
const v1StartMarker = '                      {/* ========================================================= */}\n                      {/* IF VENDOR IS A TOUR GUIDE: DEDICATED TOUR GUIDE MANIFEST */}\n                      {/* ========================================================= */}\n                      {partner.role === "guide" ? (';
const v1EndMarker = '                      ) : isCampPartner ? (\n                        <div className="space-y-4">\n                          {/* 1. Camp Logistics Ribbon */}';

const v1StartIndex = portal.indexOf(v1StartMarker);
const v1EndIndex = portal.indexOf(v1EndMarker);

console.log('v1StartIndex:', v1StartIndex, 'v1EndIndex:', v1EndIndex);

if (v1StartIndex === -1 || v1EndIndex === -1 || v1EndIndex <= v1StartIndex) {
  console.error('View 1 Tour Guide block markers not found!');
  process.exit(1);
}

const v1Repl = fs.readFileSync(path.join(__dirname, 'guide_view1_repl.txt'), 'utf8');

portal = portal.slice(0, v1StartIndex) + v1Repl + portal.slice(v1EndIndex + '                      ) : isCampPartner ? ('.length - '                      ) : isCampPartner ? ('.length);

console.log('View 1 Tour Guide manifest replaced');

// 3. Replace View 2 Tour Guide Block
const v2StartMarker = '                  {/* ========================================================= */}\n                  {/* TOUR GUIDE DOSSIER: KEY LOGISTICS & EXCURSION WALKTHROUGH */}\n                  {/* ========================================================= */}\n                  {partner.role === "guide" ? (';
const v2EndMarker = '                  ) : isCampPartner ? (\n                    <div className="space-y-4 my-3">\n                      {/* Camp Key Logistics Ribbon */}';

const v2StartIndex = portal.indexOf(v2StartMarker);
const v2EndIndex = portal.indexOf(v2EndMarker);

console.log('v2StartIndex:', v2StartIndex, 'v2EndIndex:', v2EndIndex);

if (v2StartIndex === -1 || v2EndIndex === -1 || v2EndIndex <= v2StartIndex) {
  console.error('View 2 Tour Guide block markers not found!');
  process.exit(1);
}

const v2Repl = fs.readFileSync(path.join(__dirname, 'guide_view2_repl.txt'), 'utf8');

portal = portal.slice(0, v2StartIndex) + v2Repl + portal.slice(v2EndIndex + '                  ) : isCampPartner ? ('.length - '                  ) : isCampPartner ? ('.length);

console.log('View 2 Tour Guide manifest replaced');

fs.writeFileSync(portalPath, portal, 'utf8');
console.log('Successfully written portal/page.tsx! New length:', portal.length);
