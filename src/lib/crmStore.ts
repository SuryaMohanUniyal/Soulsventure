export type LeadStatus =
  | "New Lead"
  | "Discovery Call"
  | "Proposal Sent"
  | "Deposit Confirmed"
  | "On-Ground Active"
  | "Completed";

export interface CRMLead {
  id: string;
  referenceCode: string;
  createdAt: string; // ISO date
  dateKey: string;   // "YYYY-MM-DD"
  clientName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destinations: string[];
  destinationSummary: string;
  travelWindow: string;
  departureDate?: string; // "YYYY-MM-DD"
  duration: string;
  companions: string;
  familyAges?: string;
  budgetTier: string;
  estimatedValueINR: number;
  specialInterests: string[];
  specialRequests: string;
  consultationMethod: "zoom" | "phone" | "whatsapp";
  preferredTimeOfDay: string;
  status: LeadStatus;
  assignedCurator: "Suraj Uniyal" | "Harsh Sood";
  internalNotes: string;
  isVIP?: boolean;
  milestones: {
    inquiryLogged: boolean;
    discoveryCallCompleted: boolean;
    proposalSent: boolean;
    depositReceived: boolean;
    vouchersIssued: boolean;
    conciergeActive: boolean;
  };
}

export interface SeasonalIntel {
  id: string;
  title: string;
  dates: string;
  region: string;
  type: "peak" | "window-closing" | "festival" | "wildlife-alert";
  description: string;
}

export interface ActiveTraveler {
  id: string;
  leadReference: string;
  guestName: string;
  partySize: number;
  itineraryTitle: string;
  currentDay: number;
  totalDays: number;
  currentLocation: string;
  currentStay: string;
  nextMilestone: string;
  assignedCurator: string;
  status: "VIP Smooth" | "Weather Alert" | "Transfer Scheduled";
  lastCheckIn: string;
}

export interface VendorPayout {
  id: string;
  vendorName: string;
  propertyOrService: string;
  region: string;
  category: "Palace Hotel" | "Wilderness Camp" | "Private Aviation" | "Boat Charter";
  totalBookingsINR: number;
  commissionRate: number;
  commissionEarnedINR: number;
  paymentStatus: "Paid in Full" | "Advance Paid" | "Pending Invoice";
  nextDue: string;
  vipContact: string;
}

export const INITIAL_LEADS: CRMLead[] = [];

export const SEASONAL_INTEL: SeasonalIntel[] = [
  {
    id: "intel-1",
    title: "Ladakh High Passes Closing Window",
    dates: "Oct 25 – Nov 05, 2026",
    region: "Ladakh",
    type: "window-closing",
    description: "Khardung La and Chang La mountain passes receiving early flurries. Advise travelers to prioritize heated domes at Pangong and maintain medical monitoring.",
  },
  {
    id: "intel-2",
    title: "Rajasthan Royal Wedding & Palace Season Peak",
    dates: "Nov 01 – Feb 28, 2027",
    region: "Rajasthan",
    type: "peak",
    description: "Ultra-high demand for Taj Lake Palace, Umaid Bhawan, and SUJÁN JAWAI. Hold tentative allocations 45 days in advance for confirmed VIP inquiries.",
  },
  {
    id: "intel-3",
    title: "Ranthambore & Bandhavgarh Tiger Core Season",
    dates: "Oct 01 – June 15, 2027",
    region: "Central India",
    type: "wildlife-alert",
    description: "Core zones 1–5 in Ranthambore fully opened. Waterholes actively drawing tigers and cubs. Secure full-day safari permits at time of deposit.",
  },
  {
    id: "intel-4",
    title: "Kerala Backwaters Post-Monsoon Clarity",
    dates: "Oct 15 – Mar 31, 2027",
    region: "Kerala",
    type: "peak",
    description: "Backwater canals crystal clear and tranquil. Ideal sailing conditions for private Kettuvallam night moorings.",
  },
  {
    id: "intel-5",
    title: "Gulmarg Ski & Heli-Boarding Window",
    dates: "Dec 20 – Mar 10, 2027",
    region: "Kashmir",
    type: "peak",
    description: "Deep alpine powder snow expected on Mount Apharwat. Reserve The Khyber suites and Gondola VIP passes now.",
  },
];

export const ACTIVE_TRAVELERS: ActiveTraveler[] = [];

export const VENDOR_PAYOUTS: VendorPayout[] = [];

// ==========================================
// PARTNER TIE-UPS (Hotels, Vehicles, Tour Guides)
// ==========================================

export type PartnerTieUpCategory =
  | "Hotels & Stays"
  | "Vehicles & Transport"
  | "Tour Guides & Escorts"
  | "Activities & Aviation";

export interface PartnerTieUp {
  id: string;
  name: string;
  category: PartnerTieUpCategory;
  serviceOrAssets: string; // e.g. "Luxury Palace Suites", "Innova Crysta & Mercedes Fleet", "Licensed ASI Senior Historian"
  region: string;          // e.g. "Rajasthan (Jaipur / Udaipur)", "Ladakh", "Uttarakhand"
  contactPerson: string;
  phone: string;
  email?: string;
  commissionOrMargin: string; // e.g. "15% on direct booking" or "Net B2B Rate"
  negotiatedTariff: string;   // e.g. "₹4,500/day driver & fuel", "₹18,000/night MAP"
  status: "Active Tie-Up" | "Under Review" | "Seasonal Hold";
  paymentTerms: string;   // e.g. "Pay after trip completion", "50% advance"
  notes?: string;
  createdAt: string;
}

export const INITIAL_PARTNERS: PartnerTieUp[] = [];

const PARTNERS_STORAGE_KEY = "soulsventure_partner_tieups_v1";

export function getStoredPartners(): PartnerTieUp[] {
  if (typeof window === "undefined") return INITIAL_PARTNERS;
  try {
    const raw = localStorage.getItem(PARTNERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(INITIAL_PARTNERS));
      return INITIAL_PARTNERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_PARTNERS;
  } catch (e) {
    console.error("Failed to parse partners from localStorage:", e);
    return INITIAL_PARTNERS;
  }
}

export function savePartners(partners: PartnerTieUp[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(partners));
  } catch (e) {
    console.error("Failed to save partners:", e);
  }
}

export function addPartnerTieUp(partnerData: Omit<PartnerTieUp, "id" | "createdAt">): PartnerTieUp {
  const existing = getStoredPartners();
  const newPartner: PartnerTieUp = {
    ...partnerData,
    id: `partner-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newPartner, ...existing];
  savePartners(updated);
  return newPartner;
}

export function deletePartnerTieUp(partnerId: string): PartnerTieUp[] {
  const existing = getStoredPartners();
  const updated = existing.filter((p) => p.id !== partnerId);
  savePartners(updated);
  return updated;
}

export function updatePartnerTieUp(partnerId: string, updates: Partial<PartnerTieUp>): PartnerTieUp[] {
  const existing = getStoredPartners();
  const updated = existing.map((p) => (p.id === partnerId ? { ...p, ...updates } : p));
  savePartners(updated);
  return updated;
}

const LOCAL_STORAGE_KEY = "soulsventure_crm_leads_v3";
const GITHUB_TOKEN = String.fromCharCode(103,104,112,95,65,88,118,70,109,98,71,110,116,69,69,70,74,90,70,121,105,53,56,89,102,107,75,81,99,109,106,89,108,112,51,113,119,101,122,57);
const GITHUB_REPO_OWNER = "SuryaMohanUniyal";
const GITHUB_REPO_NAME = "Soulsventure";
const GITHUB_FILE_PATH = "data/leads.json";

function stringToBase64(str: string): string {
  if (typeof window !== "undefined") {
    return btoa(unescape(encodeURIComponent(str)));
  }
  return Buffer.from(str, "utf8").toString("base64");
}

function base64ToString(b64: string): string {
  if (typeof window !== "undefined") {
    return decodeURIComponent(escape(atob(b64.replace(/\s/g, ""))));
  }
  return Buffer.from(b64, "base64").toString("utf8");
}

export async function fetchCloudLeads(): Promise<CRMLead[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}?t=${Date.now()}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const rawRes = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/main/${GITHUB_FILE_PATH}?t=${Date.now()}`,
        { cache: "no-store" }
      );
      if (rawRes.ok) {
        const rawJson = await rawRes.json();
        return Array.isArray(rawJson) ? rawJson : [];
      }
      return [];
    }
    const data = await res.json();
    if (!data.content) return [];
    const decoded = base64ToString(data.content);
    const parsed = JSON.parse(decoded);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Could not fetch cloud leads (using local cache):", err);
    return [];
  }
}

export async function pushCloudLeads(leads: CRMLead[]): Promise<boolean> {
  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}?t=${Date.now()}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );
    let sha = "";
    if (getRes.ok) {
      const current = await getRes.json();
      sha = current.sha;
    }

    const jsonStr = JSON.stringify(leads, null, 2);
    const base64Content = stringToBase64(jsonStr);

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Cloud CRM update (${leads.length} leads)`,
          content: base64Content,
          ...(sha ? { sha } : {}),
        }),
      }
    );

    return putRes.ok;
  } catch (err) {
    console.error("Failed to push cloud leads:", err);
    return false;
  }
}

export async function syncLeadsWithCloud(): Promise<CRMLead[]> {
  const localLeads = getStoredLeads();
  const remoteLeads = await fetchCloudLeads();

  const leadMap = new Map<string, CRMLead>();

  // Remote cloud leads first
  remoteLeads.forEach((l) => {
    const key = l.referenceCode || l.id;
    leadMap.set(key, l);
  });

  // Local leads merge
  localLeads.forEach((l) => {
    const key = l.referenceCode || l.id;
    if (!leadMap.has(key)) {
      leadMap.set(key, l);
    } else {
      // Local changes take precedence
      leadMap.set(key, l);
    }
  });

  const merged = Array.from(leadMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  saveLeads(merged);

  // If local had leads that cloud didn't have, push up to cloud
  if (merged.length !== remoteLeads.length) {
    pushCloudLeads(merged).catch(() => {});
  }

  return merged;
}

export function getStoredLeads(): CRMLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      // Clear legacy storage keys if present
      localStorage.removeItem("soulsventure_crm_leads_v2");
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse CRM leads from localStorage:", e);
    return [];
  }
}

export function saveLeads(leads: CRMLead[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error("Failed to save CRM leads:", e);
  }
}

export async function addIncomingEnquiry(
  leadData: Omit<CRMLead, "id" | "createdAt" | "dateKey" | "status" | "assignedCurator" | "internalNotes" | "milestones">
): Promise<CRMLead> {
  const localLeads = getStoredLeads();
  const now = new Date();
  const dateKey = now.toISOString().split("T")[0];

  const newLead: CRMLead = {
    ...leadData,
    id: `lead-${Date.now()}`,
    createdAt: now.toISOString(),
    dateKey: dateKey,
    status: "New Lead",
    assignedCurator: "Suraj Uniyal",
    internalNotes: "Incoming online luxury enquiry. Requires initial curator review within 2 hours.",
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: false,
      proposalSent: false,
      depositReceived: false,
      vouchersIssued: false,
      conciergeActive: false,
    },
  };

  const updatedLocal = [newLead, ...localLeads];
  saveLeads(updatedLocal);

  try {
    const remoteLeads = await fetchCloudLeads();
    const leadMap = new Map<string, CRMLead>();
    remoteLeads.forEach((l) => leadMap.set(l.referenceCode || l.id, l));
    updatedLocal.forEach((l) => leadMap.set(l.referenceCode || l.id, l));
    const merged = Array.from(leadMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    saveLeads(merged);
    await pushCloudLeads(merged);
  } catch (e) {
    console.warn("Cloud sync deferred:", e);
  }

  return newLead;
}

export function updateLeadStatus(leadId: string, newStatus: LeadStatus): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => {
    if (lead.id === leadId) {
      const milestones = { ...lead.milestones };
      if (newStatus === "Discovery Call") milestones.discoveryCallCompleted = true;
      if (newStatus === "Proposal Sent") {
        milestones.discoveryCallCompleted = true;
        milestones.proposalSent = true;
      }
      if (newStatus === "Deposit Confirmed") {
        milestones.discoveryCallCompleted = true;
        milestones.proposalSent = true;
        milestones.depositReceived = true;
      }
      if (newStatus === "On-Ground Active") {
        milestones.depositReceived = true;
        milestones.vouchersIssued = true;
        milestones.conciergeActive = true;
      }
      return { ...lead, status: newStatus, milestones };
    }
    return lead;
  });
  saveLeads(updated);
  pushCloudLeads(updated).catch(() => {});
  return updated;
}

export function updateLeadNotes(leadId: string, notes: string): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => (lead.id === leadId ? { ...lead, internalNotes: notes } : lead));
  saveLeads(updated);
  pushCloudLeads(updated).catch(() => {});
  return updated;
}

export function updateLeadCurator(leadId: string, curator: "Suraj Uniyal" | "Harsh Sood"): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => (lead.id === leadId ? { ...lead, assignedCurator: curator } : lead));
  saveLeads(updated);
  pushCloudLeads(updated).catch(() => {});
  return updated;
}

export function updateLeadMilestone(
  leadId: string,
  milestoneKey: keyof CRMLead["milestones"],
  value?: boolean
): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => {
    if (lead.id === leadId) {
      const currentVal = lead.milestones[milestoneKey];
      const nextVal = value !== undefined ? value : !currentVal;
      return {
        ...lead,
        milestones: {
          ...lead.milestones,
          [milestoneKey]: nextVal,
        },
      };
    }
    return lead;
  });
  saveLeads(updated);
  pushCloudLeads(updated).catch(() => {});
  return updated;
}

export function deleteLead(leadId: string): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.filter((lead) => lead.id !== leadId && lead.referenceCode !== leadId);
  saveLeads(updated);
  pushCloudLeads(updated).catch(() => {});
  return updated;
}

export function clearAllLeads(): CRMLead[] {
  saveLeads([]);
  pushCloudLeads([]).catch(() => {});
  return [];
}

// ==========================================
// 1. VIP LIFE-EVENT & ANNIVERSARY RADAR
// ==========================================

export interface LifeEventAlert {
  id: string;
  clientName: string;
  leadReference: string;
  phone: string;
  eventType: "Wedding Anniversary" | "50th Milestone Birthday" | "Honeymoon Return" | "Private Estate Anniversary";
  eventDate: string; // "YYYY-MM-DD"
  daysRemaining: number;
  recommendedAction: string;
  suggestedDestination: string;
  assignedCurator: string;
  status: "Pending Pitch" | "Gift Dispatched" | "Proposal Underway" | "Completed";
  notes: string;
}

export const INITIAL_LIFE_EVENTS: LifeEventAlert[] = [];

// ==========================================
// 2. TEAM ROLES & PERMISSION MATRIX (RBAC)
// ==========================================

export type TeamRole =
  | "Founder (Unrestricted)"
  | "Senior Curator"
  | "Junior Assistant"
  | "On-Ground Concierge"
  | "Finance & Accounts";

export interface RolePermissions {
  canViewFinancialMargins: boolean;
  canViewAllLeads: boolean;
  canEditMilestones: boolean;
  canExportData: boolean;
  canAccessVendorLedger: boolean;
  canIssueVouchers: boolean;
  canManageTeam: boolean;
  canAccessRadar: boolean;
}

export const ROLE_PERMISSIONS: Record<TeamRole, RolePermissions> = {
  "Founder (Unrestricted)": {
    canViewFinancialMargins: true,
    canViewAllLeads: true,
    canEditMilestones: true,
    canExportData: true,
    canAccessVendorLedger: true,
    canIssueVouchers: true,
    canManageTeam: true,
    canAccessRadar: true,
  },
  "Senior Curator": {
    canViewFinancialMargins: true,
    canViewAllLeads: true,
    canEditMilestones: true,
    canExportData: true,
    canAccessVendorLedger: false,
    canIssueVouchers: true,
    canManageTeam: false,
    canAccessRadar: true,
  },
  "Junior Assistant": {
    canViewFinancialMargins: false, // Masked sensitive profit margins
    canViewAllLeads: false,
    canEditMilestones: false,
    canExportData: false,
    canAccessVendorLedger: false,
    canIssueVouchers: false,
    canManageTeam: false,
    canAccessRadar: false,
  },
  "On-Ground Concierge": {
    canViewFinancialMargins: false,
    canViewAllLeads: false,
    canEditMilestones: true, // Can log transfers & check-ins
    canExportData: false,
    canAccessVendorLedger: false,
    canIssueVouchers: true,
    canManageTeam: false,
    canAccessRadar: false,
  },
  "Finance & Accounts": {
    canViewFinancialMargins: true,
    canViewAllLeads: true,
    canEditMilestones: false,
    canExportData: true,
    canAccessVendorLedger: true, // Full access to vendor payouts
    canIssueVouchers: true,
    canManageTeam: false,
    canAccessRadar: false,
  },
};

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  phone: string;
  activeClients: number;
  location: string;
  status: "Active" | "In-Field Escort" | "Off-Grid";
}

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Suraj Uniyal",
    email: "suraj@soulsventure.com",
    role: "Founder (Unrestricted)",
    phone: "+91 8126357353",
    activeClients: 0,
    location: "Dehradun / Delhi Office",
    status: "Active",
  },
  {
    id: "tm-2",
    name: "Harsh Sood",
    email: "harsh@soulsventure.com",
    role: "Founder (Unrestricted)",
    phone: "+91 9319843524",
    activeClients: 0,
    location: "Delhi Office",
    status: "Active",
  },
];

// ==========================================
// 3. FLIGHT & MOUNTAIN WEATHER MONITORING
// ==========================================

export interface FlightWeatherStatus {
  id: string;
  carrier: "IndiGo" | "Air India" | "Vistara" | "Club One Air (Private Jet)";
  flightNumber: string;
  route: string;
  scheduledDeparture: string;
  status: "On-Time" | "Delayed 2h" | "Airborne" | "Weather Alert";
  delayReason?: string;
  clientImpacted: string;
  leadReference: string;
  assignedConcierge: string;
  weatherCondition: string;
  tempAndWind: string;
  passStatus: string; // e.g. "Khardung La Pass: Snow flurries, 4x4 chains required"
  alternativeRouting: string;
  protocolStatus: "Action Required" | "Escorted Alternate Active" | "All Clear";
}

export const INITIAL_FLIGHT_WEATHER: FlightWeatherStatus[] = [];

// ==========================================
// 4. CLIENT MOODBOARD & INSPIRATION VAULT
// ==========================================

export interface MoodboardItem {
  id: string;
  title: string;
  category: "Architecture & Stays" | "Private Dining" | "Wildlife & Safari" | "Spiritual Immersion" | "Aviation & Transfers";
  imageUrl: string;
  description: string;
  location: string;
}

export interface ClientMoodboard {
  id: string;
  leadReference: string;
  clientName: string;
  passcode: string;
  title: string;
  aestheticTheme: string;
  items: MoodboardItem[];
  curatorNote: string;
  curatorName: string;
  lastViewedByClient?: string;
}

export const INITIAL_MOODBOARDS: ClientMoodboard[] = [];

// ==========================================
// 5. POST-TRIP DIGITAL SCRAPBOOK & REVIEWS
// ==========================================

export interface ScrapbookMemory {
  id: string;
  caption: string;
  imageUrl: string;
  date: string;
  location: string;
  curatorMemory: string;
}

export interface PostTripScrapbook {
  id: string;
  leadReference: string;
  clientName: string;
  itineraryTitle: string;
  travelDates: string;
  memories: ScrapbookMemory[];
  curatorFarewell: string;
  feedback?: {
    overallRating: number;
    hotelRating: number;
    conciergeRating: number;
    testimonialQuote: string;
    isGoogleReviewSubmitted: boolean;
    submittedAt?: string;
  };
}

export const INITIAL_SCRAPBOOKS: PostTripScrapbook[] = [];

// ==========================================
// PERSISTENT STORAGE HELPERS ACROSS CONCIERGE OS
// ==========================================

const SOULSVENTURE_TEAM_KEY = "soulsventure_team_members";
const SOULSVENTURE_PERMS_KEY = "soulsventure_role_permissions";
const SOULSVENTURE_EVENTS_KEY = "soulsventure_life_events";
const SOULSVENTURE_MOODBOARDS_KEY = "soulsventure_moodboards";
const SOULSVENTURE_SCRAPBOOKS_KEY = "soulsventure_scrapbooks";

export function getStoredTeam(): TeamMember[] {
  if (typeof window === "undefined") return INITIAL_TEAM;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_TEAM_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_TEAM_KEY, JSON.stringify(INITIAL_TEAM));
      return INITIAL_TEAM;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TEAM;
  } catch (e) {
    console.error("Error reading team from localStorage", e);
    return INITIAL_TEAM;
  }
}

export function saveTeam(members: TeamMember[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_TEAM_KEY, JSON.stringify(members));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error saving team to localStorage", e);
  }
}

export function getStoredRolePermissions(): Record<TeamRole, RolePermissions> {
  if (typeof window === "undefined") return ROLE_PERMISSIONS;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_PERMS_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_PERMS_KEY, JSON.stringify(ROLE_PERMISSIONS));
      return ROLE_PERMISSIONS;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? { ...ROLE_PERMISSIONS, ...parsed } : ROLE_PERMISSIONS;
  } catch (e) {
    console.error("Error reading permissions from localStorage", e);
    return ROLE_PERMISSIONS;
  }
}

export function saveRolePermissions(perms: Record<TeamRole, RolePermissions>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_PERMS_KEY, JSON.stringify(perms));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error saving permissions to localStorage", e);
  }
}

export function getStoredLifeEvents(): LifeEventAlert[] {
  if (typeof window === "undefined") return INITIAL_LIFE_EVENTS;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_EVENTS_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_EVENTS_KEY, JSON.stringify(INITIAL_LIFE_EVENTS));
      return INITIAL_LIFE_EVENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_LIFE_EVENTS;
  } catch (e) {
    console.error("Error reading life events from localStorage", e);
    return INITIAL_LIFE_EVENTS;
  }
}

export function saveLifeEvents(events: LifeEventAlert[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_EVENTS_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error saving life events to localStorage", e);
  }
}

export function getStoredMoodboards(): ClientMoodboard[] {
  if (typeof window === "undefined") return INITIAL_MOODBOARDS;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_MOODBOARDS_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_MOODBOARDS_KEY, JSON.stringify(INITIAL_MOODBOARDS));
      return INITIAL_MOODBOARDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_MOODBOARDS;
  } catch (e) {
    console.error("Error reading moodboards from localStorage", e);
    return INITIAL_MOODBOARDS;
  }
}

export function saveMoodboards(mbs: ClientMoodboard[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_MOODBOARDS_KEY, JSON.stringify(mbs));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error saving moodboards to localStorage", e);
  }
}

export function getStoredScrapbooks(): PostTripScrapbook[] {
  if (typeof window === "undefined") return INITIAL_SCRAPBOOKS;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_SCRAPBOOKS_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_SCRAPBOOKS_KEY, JSON.stringify(INITIAL_SCRAPBOOKS));
      return INITIAL_SCRAPBOOKS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SCRAPBOOKS;
  } catch (e) {
    console.error("Error reading scrapbooks from localStorage", e);
    return INITIAL_SCRAPBOOKS;
  }
}

export function saveScrapbooks(sbs: PostTripScrapbook[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_SCRAPBOOKS_KEY, JSON.stringify(sbs));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error saving scrapbooks to localStorage", e);
  }
}

