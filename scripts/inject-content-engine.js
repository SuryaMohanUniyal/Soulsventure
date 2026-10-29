const fs = require('fs');
const path = require('path');

// 1. Update AdminSidebar.tsx
const sidebarPath = path.join(__dirname, '../src/components/admin/AdminSidebar.tsx');
let sidebar = fs.readFileSync(sidebarPath, 'utf8');

if (!sidebar.includes('id: "content-engine" as AdminTab')) {
  const targetItem = `    {
      id: "itinerary-builder" as AdminTab,
      label: "AI Itinerary & Magazine PDF",
      icon: Sparkles,
      badge: "AI Studio",
      badgeColor: "bg-[#C5A059] text-black font-bold",
    },`;

  const replItem = `    {
      id: "itinerary-builder" as AdminTab,
      label: "AI Itinerary & Magazine PDF",
      icon: Sparkles,
      badge: "AI Studio",
      badgeColor: "bg-[#C5A059] text-black font-bold",
    },
    {
      id: "content-engine" as AdminTab,
      label: "Content & Copywriting Engine",
      icon: Sparkles,
      badge: "SEO Copy",
      badgeColor: "bg-[#C5A059] text-black font-bold",
    },`;

  // normalize crlf
  const normalizedSidebar = sidebar.replace(/\r\n/g, '\n');
  const normalizedTarget = targetItem.replace(/\r\n/g, '\n');
  const normalizedRepl = replItem.replace(/\r\n/g, '\n');

  if (!normalizedSidebar.includes(normalizedTarget)) {
    console.error('Target item not found in AdminSidebar!');
    process.exit(1);
  }

  sidebar = normalizedSidebar.replace(normalizedTarget, normalizedRepl);
  fs.writeFileSync(sidebarPath, sidebar, 'utf8');
  console.log('AdminSidebar.tsx updated with content-engine tab!');
} else {
  console.log('content-engine already in AdminSidebar.tsx');
}

// 2. Update src/app/admin/page.tsx
const pagePath = path.join(__dirname, '../src/app/admin/page.tsx');
let page = fs.readFileSync(pagePath, 'utf8').replace(/\r\n/g, '\n');

if (!page.includes('AdminContentEngine')) {
  // Add import
  const importAnchor = `import AdminItineraryBuilder from "@/components/admin/AdminItineraryBuilder";`;
  const importAddition = `import AdminItineraryBuilder from "@/components/admin/AdminItineraryBuilder";
import AdminContentEngine from "@/components/admin/AdminContentEngine";`;

  page = page.replace(importAnchor, importAddition);

  // Add handleUpdateLeadNuances before return
  const handlerAnchor = `  const handleGenerateProposal = (lead: CRMLead) => {
    setProposalLead(lead);
  };`;

  const handlerAddition = `  const handleGenerateProposal = (lead: CRMLead) => {
    setProposalLead(lead);
  };

  const handleUpdateLeadNuances = (
    leadId: string,
    updatedNuances: Partial<ClientNuanceProfile>,
    newTranscript?: VoiceCallTranscript
  ) => {
    const updated = leads.map((l) => {
      if (l.id !== leadId) return l;
      const existingNuances = l.clientNuances || {
        dietaryRestrictions: [],
        roomPreferences: [],
        beveragePreferences: [],
        vehiclePreference: "",
        milestoneEvents: [],
        voiceCalls: [],
      };
      const combinedVoiceCalls = newTranscript
        ? [newTranscript, ...(existingNuances.voiceCalls || [])]
        : existingNuances.voiceCalls || [];

      const newNuances: ClientNuanceProfile = {
        dietaryRestrictions: Array.from(new Set([...(existingNuances.dietaryRestrictions || []), ...(updatedNuances.dietaryRestrictions || [])])),
        roomPreferences: Array.from(new Set([...(existingNuances.roomPreferences || []), ...(updatedNuances.roomPreferences || [])])),
        beveragePreferences: Array.from(new Set([...(existingNuances.beveragePreferences || []), ...(updatedNuances.beveragePreferences || [])])),
        vehiclePreference: updatedNuances.vehiclePreference || existingNuances.vehiclePreference || "",
        milestoneEvents: [...(existingNuances.milestoneEvents || []), ...(updatedNuances.milestoneEvents || [])],
        voiceCalls: combinedVoiceCalls,
        specialProtocol: updatedNuances.specialProtocol || existingNuances.specialProtocol,
      };
      return {
        ...l,
        clientNuances: newNuances,
      };
    });
    saveLeads(updated);
    setLeads(updated);
    pushCloudLeads(updated).catch(console.error);
  };`;

  page = page.replace(handlerAnchor, handlerAddition);

  // Add tab render block
  const tabRenderAnchor = `                {currentTab === "itinerary-builder" && (
                  <AdminItineraryBuilder
                    initialLead={proposalLead || selectedLead || leads[0]}
                    onSelectLead={(l) => setSelectedLead(l)}
                  />
                )}`;

  const tabRenderAddition = `                {currentTab === "itinerary-builder" && (
                  <AdminItineraryBuilder
                    initialLead={proposalLead || selectedLead || leads[0]}
                    onSelectLead={(l) => setSelectedLead(l)}
                  />
                )}

                {currentTab === "content-engine" && (
                  <AdminContentEngine
                    leads={leads}
                    onUpdateLeadNuances={handleUpdateLeadNuances}
                  />
                )}`;

  page = page.replace(tabRenderAnchor, tabRenderAddition);

  fs.writeFileSync(pagePath, page, 'utf8');
  console.log('src/app/admin/page.tsx updated with AdminContentEngine render block!');
} else {
  console.log('AdminContentEngine already imported in page.tsx');
}
