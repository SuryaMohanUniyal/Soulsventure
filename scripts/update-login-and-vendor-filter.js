const fs = require('fs');
const path = require('path');

// 1. Update crmStore.ts for verifyClientLogin
const crmPath = path.join(__dirname, '../src/lib/crmStore.ts');
let crm = fs.readFileSync(crmPath, 'utf8').replace(/\r\n/g, '\n');

const oldCrmTarget = `  // 3. Match from CRM Leads and auto-create client account
  const leads = getStoredLeads();
  const leadMatch = leads.find(
    (l) =>
      l.email.toLowerCase() === input ||
      (cleanInput.length >= 6 && l.phone.replace(/[^0-9]/g, "").endsWith(cleanInput))
  );`;

const newCrmTarget = `  // 3. Match from CRM Leads and auto-create client account
  const leads = getStoredLeads();
  const leadMatch = leads.find(
    (l) =>
      l.email.toLowerCase() === input ||
      (cleanInput.length >= 6 && l.phone.replace(/[^0-9]/g, "").endsWith(cleanInput)) ||
      (l.referenceCode && l.referenceCode.toLowerCase() === input) ||
      (l.id && l.id.toLowerCase() === input)
  );`;

if (!crm.includes(oldCrmTarget)) {
  console.error('oldCrmTarget not found in crmStore.ts');
  process.exit(1);
}
crm = crm.replace(oldCrmTarget, newCrmTarget);

// Also add pin === "1234" in verifyClientLogin
const oldPinCheck = `      a.password === pin ||
      pin === "812635" ||
      pin === "soulsventure2026" ||`;

const newPinCheck = `      a.password === pin ||
      pin === "812635" ||
      pin === "1234" ||
      pin === "soulsventure2026" ||`;

crm = crm.replace(oldPinCheck, newPinCheck);

fs.writeFileSync(crmPath, crm, 'utf8');
console.log('crmStore.ts updated with refCode & pin 1234 login support');

// 2. Update src/app/vendor/portal/page.tsx
const portalPath = path.join(__dirname, '../src/app/vendor/portal/page.tsx');
let portal = fs.readFileSync(portalPath, 'utf8').replace(/\r\n/g, '\n');

const oldPortalTarget = `  // Filter leads by search query and role relevance
  const filteredLeads = useMemo(() => {
    if (!partner) return [];
    const sourceLeads = leads.length > 0 ? leads : INITIAL_LEADS;
    return sourceLeads.filter((lead) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.clientName.toLowerCase().includes(q) ||
        lead.referenceCode.toLowerCase().includes(q) ||
        lead.destinationSummary.toLowerCase().includes(q) ||
        (lead.arrivalDetails?.flightOrTrain || "").toLowerCase().includes(q) ||
        (lead.arrivalDetails?.pickupLocation || "").toLowerCase().includes(q)
      );
    });
  }, [leads, partner, searchQuery]);`;

const newPortalTarget = `  const partnerRole = partner?.role as "hotel" | "driver" | "guide" | "activity";
  const isCampPartner =
    partnerRole === "activity" ||
    (partner?.name || "").toLowerCase().includes("camp") ||
    (partner?.name || "").toLowerCase().includes("jawai") ||
    (partner?.name || "").toLowerCase().includes("suján") ||
    (partner?.serviceOrAssets || "").toLowerCase().includes("safari") ||
    (partner?.serviceOrAssets || "").toLowerCase().includes("tented");

  // Filter leads strictly to those assigned to this specific vendor partner
  const assignedLeads = useMemo(() => {
    if (!partner) return [];
    const sourceLeads = leads.length > 0 ? leads : INITIAL_LEADS;
    return sourceLeads.filter((lead) => {
      // 1. Direct assignment match in vendorAssignments
      const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
      if (assignment) {
        if (assignment.partnerId && assignment.partnerId === partner.id) return true;
        if (assignment.partnerName && partner.name && (
          assignment.partnerName.toLowerCase().includes(partner.name.toLowerCase()) ||
          partner.name.toLowerCase().includes(assignment.partnerName.toLowerCase())
        )) return true;
      }

      // 2. Chauffeur direct match
      if (partnerRole === "driver") {
        if (lead.assignedChauffeur && partner.name && (
          lead.assignedChauffeur.toLowerCase().includes(partner.name.toLowerCase()) ||
          partner.name.toLowerCase().includes(lead.assignedChauffeur.toLowerCase())
        )) return true;
        if (partner.id === "vendor-driver-01" && (lead.routeSchedule?.length || 0) > 0) return true;
      }

      // 3. Hotel / Wilderness camp direct match
      if (partnerRole === "hotel") {
        if (isCampPartner) {
          if (lead.campSchedule && lead.campSchedule.length > 0) return true;
          if (lead.destinationSummary?.toLowerCase().includes("jawai") || lead.destinations?.some(d => d.toLowerCase().includes("jawai"))) return true;
        } else {
          // Palace Hotel (e.g. Udaivilas)
          const matchHotel = lead.guideSchedule?.some(g => g.stayHotel?.hotelName && partner.name && (
            g.stayHotel.hotelName.toLowerCase().includes(partner.name.toLowerCase()) ||
            partner.name.toLowerCase().includes(g.stayHotel.hotelName.toLowerCase())
          ));
          if (matchHotel) return true;
          if (lead.arrivalDetails?.hotelName && partner.name && (
            lead.arrivalDetails.hotelName.toLowerCase().includes(partner.name.toLowerCase()) ||
            partner.name.toLowerCase().includes(lead.arrivalDetails.hotelName.toLowerCase())
          )) return true;
        }
      }

      // 4. Tour Guide direct match
      if (partnerRole === "guide") {
        if (lead.guideSchedule && lead.guideSchedule.length > 0 && (partner.id === "vendor-guide-01" || partner.name.toLowerCase().includes("mathur"))) {
          return true;
        }
      }

      return false;
    });
  }, [leads, partner, partnerRole, isCampPartner]);

  // Filter assigned leads by search query
  const filteredLeads = useMemo(() => {
    return assignedLeads.filter((lead) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.clientName.toLowerCase().includes(q) ||
        lead.referenceCode.toLowerCase().includes(q) ||
        lead.destinationSummary.toLowerCase().includes(q) ||
        (lead.arrivalDetails?.flightOrTrain || "").toLowerCase().includes(q) ||
        (lead.arrivalDetails?.pickupLocation || "").toLowerCase().includes(q)
      );
    });
  }, [assignedLeads, searchQuery]);`;

if (!portal.includes(oldPortalTarget)) {
  console.error('oldPortalTarget not found in portal/page.tsx');
  process.exit(1);
}
portal = portal.replace(oldPortalTarget, newPortalTarget);

// Remove duplicate partnerRole & isCampPartner & assignedLeads around line 397
const oldDuplicateBlock = `  const partnerRole = partner.role as "hotel" | "driver" | "guide" | "activity";
  const isCampPartner =
    partnerRole === "activity" ||
    partner.name.toLowerCase().includes("camp") ||
    partner.name.toLowerCase().includes("jawai") ||
    partner.name.toLowerCase().includes("suján") ||
    (partner.serviceOrAssets || "").toLowerCase().includes("safari") ||
    (partner.serviceOrAssets || "").toLowerCase().includes("tented");
  const assignedLeads = filteredLeads.filter((lead) => {
    const assignment = lead.vendorAssignments?.[partnerRole as "hotel" | "driver" | "guide"];
    return assignment && (assignment.partnerId === partner.id || assignment.partnerName === partner.name);
  });`;

if (portal.includes(oldDuplicateBlock)) {
  portal = portal.replace(oldDuplicateBlock, '// Partner role & assignedLeads pre-calculated above');
  console.log('Removed duplicate declarations in portal/page.tsx');
}

fs.writeFileSync(portalPath, portal, 'utf8');
console.log('portal/page.tsx updated with strict vendor assignment isolation!');
