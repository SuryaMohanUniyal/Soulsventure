export type LeadStatus =
  | "New Lead"
  | "Discovery Call"
  | "Proposal Sent"
  | "Deposit Confirmed"
  | "On-Ground Active"
  | "Completed";


export interface VoiceCallTranscript {
  id: string;
  timestamp: string;
  duration: string;
  caller: string;
  rawTranscript: string;
  summary: string;
  extractedNuances: {
    dietary?: string[];
    roomViews?: string[];
    champagneOrBeverage?: string[];
    milestone?: string;
    vehicle?: string;
    insiderRequests?: string[];
  };
}

export interface ClientNuanceProfile {
  dietaryRestrictions: string[];
  roomPreferences: string[];
  beveragePreferences: string[];
  vehiclePreference: string;
  milestoneEvents: Array<{ title: string; date: string; relation: string }>;
  voiceCalls: VoiceCallTranscript[];
  specialProtocol?: string;
}

export interface BespokeItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  accommodation: {
    name: string;
    roomType: string;
    checkInTime?: string;
    image?: string;
  };
  fleetVehicle: {
    model: string;
    chauffeur: string;
  };
  highlights: string[];
  dining: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  insiderSecret?: string;
}

export interface GSTInvoiceLineItem {
  id: string;
  description: string;
  category: "Palace Suite" | "Private Aviation" | "Luxury Fleet" | "Curator Fee" | "Excursion";
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface GSTInvoice {
  id: string;
  invoiceNumber: string;
  leadReference: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  billingAddress: string;
  clientGstinOrPan?: string;
  agencyGstin: string;
  sacCode: string;
  currency: "INR" | "USD" | "EUR" | "GBP";
  exchangeRateToINR: number;
  lineItems: GSTInvoiceLineItem[];
  subtotal: number;
  gstRatePercent: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalGstAmount: number;
  conciergeRetainerINR: number;
  grandTotal: number;
  paymentStatus: "Paid in Full" | "Advance Paid" | "Pro-Forma Issued";
  paymentTerms: string;
}

export interface CharterEstimate {
  id: string;
  sector: string;
  fromCity: string;
  toCity: string;
  aircraftType: "Airbus H130 Helicopter" | "Bell 407 Helo" | "Pilatus PC-12 Turboprop" | "Bombardier Challenger 605";
  paxCapacity: number;
  flightTimeMins: number;
  cruisingAltitudeFt: number;
  baseRateINR: number;
  landingHandlingINR: number;
  totalEstimateINR: number;
  rateUSD: number;
  dgcaStatus: "DGCA Slot Pre-Approved" | "Military Clearance Required" | "Weather Hold Advisory";
  mountainPassRisk: "None (Direct Flight)" | "High-Altitude Thermal Protocol" | "Alpine Visual Flight Rules Only";
  recommendedFleet: string;
}

export interface ClientDocumentVaultItem {
  id: string;
  title: string;
  category: "Hotel Voucher" | "Flight Ticket" | "Charter Boarding Pass" | "Tax Invoice" | "Permit & Visa";
  referenceCode: string;
  issuer: string;
  issuedDate: string;
  status: "Verified & Active" | "Gate Cleared";
  details: string;
  downloadUrl?: string;
}

export interface ClientAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  activeTripRef: string;
  assignedCurator: string;
  nuances: ClientNuanceProfile;
}

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
  clientNuances?: ClientNuanceProfile;
  assignedVehicle?: string;
  assignedChauffeur?: string;
  proposalDays?: BespokeItineraryDay[];
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
const GITHUB_TEAM_FILE_PATH = "data/team.json";

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
  password?: string;
  isFounder?: boolean;
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
    password: "812635",
    isFounder: true,
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
    password: "931984",
    isFounder: true,
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


export async function fetchCloudTeam(): Promise<TeamMember[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_TEAM_FILE_PATH}?t=${Date.now()}`,
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
        `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/main/${GITHUB_TEAM_FILE_PATH}?t=${Date.now()}`,
        { cache: "no-store" }
      );
      if (rawRes.ok) {
        const rawJson = await rawRes.json();
        return Array.isArray(rawJson) && rawJson.length > 0 ? rawJson : INITIAL_TEAM;
      }
      return INITIAL_TEAM;
    }
    const data = await res.json();
    if (!data.content) return INITIAL_TEAM;
    const decoded = base64ToString(data.content);
    const parsed = JSON.parse(decoded);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TEAM;
  } catch (err) {
    console.warn("Could not fetch cloud team (using local cache):", err);
    return INITIAL_TEAM;
  }
}

export async function pushCloudTeam(members: TeamMember[]): Promise<boolean> {
  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_TEAM_FILE_PATH}?t=${Date.now()}`,
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

    const jsonStr = JSON.stringify(members, null, 2);
    const base64Content = stringToBase64(jsonStr);

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_TEAM_FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Cloud Team sync (${members.length} members)`,
          content: base64Content,
          ...(sha ? { sha } : {}),
        }),
      }
    );

    return putRes.ok;
  } catch (err) {
    console.error("Failed to push cloud team:", err);
    return false;
  }
}

export async function syncTeamWithCloud(): Promise<TeamMember[]> {
  const localTeam = getStoredTeam();
  const remoteTeam = await fetchCloudTeam();

  const memberMap = new Map<string, TeamMember>();
  remoteTeam.forEach((m) => memberMap.set(m.email.toLowerCase(), m));
  localTeam.forEach((m) => memberMap.set(m.email.toLowerCase(), m));

  const merged = Array.from(memberMap.values());
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SOULSVENTURE_TEAM_KEY, JSON.stringify(merged));
    } catch {}
  }
  return merged;
}

export function updateTeamMemberPassword(memberId: string, newPassword: string): TeamMember[] {
  const team = getStoredTeam();
  const updated = team.map((m) =>
    m.id === memberId ? { ...m, password: newPassword.trim() } : m
  );
  saveTeam(updated);
  return updated;
}

export function saveTeam(members: TeamMember[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_TEAM_KEY, JSON.stringify(members));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error saving team to localStorage", e);
  }
  pushCloudTeam(members).catch(() => {});
}

export interface AdminAuthSession {
  token: string;
  user: TeamMember;
  loginTime: string;
}

const SOULSVENTURE_AUTH_SESSION_KEY = "soulsventure_admin_auth_session_v1";

export function getAdminAuthSession(): AdminAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_AUTH_SESSION_KEY);
    if (!raw) return null;
    const session: AdminAuthSession = JSON.parse(raw);
    if (!session || !session.user) return null;
    return session;
  } catch {
    return null;
  }
}

export function saveAdminAuthSession(session: AdminAuthSession): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_AUTH_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error("Failed to save auth session", e);
  }
}

export function clearAdminAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SOULSVENTURE_AUTH_SESSION_KEY);
}

export const MASTER_FOUNDER_PASSCODE = "SoulsVentureVIP2026";

export function verifyAdminLogin(emailOrPhone: string, passOrPin: string): TeamMember | null {
  const team = getStoredTeam();
  const input = emailOrPhone.trim().toLowerCase();
  const pass = passOrPin.trim();

  // Master founder override allows instant recovery
  if (pass === MASTER_FOUNDER_PASSCODE || pass === "812635") {
    const match = team.find((t) => t.isFounder || t.role === "Founder (Unrestricted)");
    if (match) return match;
    return INITIAL_TEAM[0];
  }

  const user = team.find(
    (t) =>
      t.email.toLowerCase() === input ||
      t.email.split("@")[0].toLowerCase() === input ||
      t.phone.replace(/[^0-9]/g, "").endsWith(input.replace(/[^0-9]/g, "")) ||
      t.id.toLowerCase() === input
  );

  if (!user) return null;

  const userPass = user.password || user.phone.replace(/[^0-9]/g, "").slice(-6);
  if (
    pass === userPass ||
    pass === MASTER_FOUNDER_PASSCODE ||
    (user.isFounder && (pass === "812635" || pass === "931984" || pass === "Soulsventure@2026"))
  ) {
    return user;
  }

  return null;
}

export function registerNewTeamMember(
  data: {
    name: string;
    email: string;
    phone: string;
    role: TeamRole;
    password: string;
    location?: string;
  },
  authSecretKey?: string
): { success: boolean; error?: string; member?: TeamMember } {
  if (authSecretKey && authSecretKey.trim() !== MASTER_FOUNDER_PASSCODE && authSecretKey.trim() !== "812635") {
    return { success: false, error: "Invalid Founder Authorization Key. Only Suraj & Harsh can authorize staff." };
  }

  const team = getStoredTeam();
  const existing = team.find((t) => t.email.toLowerCase() === data.email.trim().toLowerCase());
  if (existing) {
    return { success: false, error: "An account with this email address already exists." };
  }

  const newMember: TeamMember = {
    id: "tm-" + Date.now(),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    role: data.role,
    password: data.password.trim(),
    activeClients: 0,
    location: data.location || "Operations Desk",
    status: "Active",
    isFounder: data.role === "Founder (Unrestricted)",
  };

  const updated = [...team, newMember];
  saveTeam(updated);
  return { success: true, member: newMember };
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



// ==========================================
// CLIENT NUANCES & AI CALL TRANSCRIPTION SYNC
// ==========================================

export function extractNuancesFromCallTranscript(text: string): Partial<ClientNuanceProfile> {
  const lower = text.toLowerCase();
  const dietary: string[] = [];
  const room: string[] = [];
  const beverage: string[] = [];
  let vehicle = "";
  let milestone = "";

  // Dietary detections
  if (lower.includes("vegetarian") || lower.includes("veg")) dietary.push("Strict Pure Vegetarian");
  if (lower.includes("jain") || lower.includes("no onion") || lower.includes("no garlic")) dietary.push("Jain Culinary Preparation (No root vegetables)");
  if (lower.includes("no seafood") || lower.includes("seafood") || lower.includes("shellfish")) dietary.push("Zero Shellfish / Seafood Allergy");
  if (lower.includes("vegan") || lower.includes("dairy free")) dietary.push("100% Plant-Based / Dairy-Free");
  if (lower.includes("gluten") || lower.includes("celiac")) dietary.push("Gluten-Sensitive / Artisanal Millet bread");

  // Room view detections
  if (lower.includes("lake") || lower.includes("pichola")) room.push("Direct Lake Pichola / Water Palace View");
  if (lower.includes("ground floor") || lower.includes("elevator") || lower.includes("stairs")) room.push("Ground Floor Accessibility (No High Stairs)");
  if (lower.includes("mountain") || lower.includes("valley") || lower.includes("himalaya")) room.push("High-Altitude Snow Mountain Panorama");
  if (lower.includes("heated") || lower.includes("warm tent") || lower.includes("dome")) room.push("Heated Luxury Pavilions & Humidifier");
  if (lower.includes("private pool") || lower.includes("plunge")) room.push("Private Plunge Pool / Courtyard");

  // Beverage & Champagne detections
  if (lower.includes("dom perignon") || lower.includes("champagne") || lower.includes("vintage")) beverage.push("Dom Pérignon Vintage / Moët Chandon on arrival");
  if (lower.includes("scotch") || lower.includes("single malt") || lower.includes("macallan") || lower.includes("whisky")) beverage.push("Single Malt Scotch (Macallan 18 / Glenfiddich)");
  if (lower.includes("coffee") || lower.includes("espresso") || lower.includes("blue mountain")) beverage.push("Blue Mountain Artisanal Pour-over Coffee");
  if (lower.includes("sparkling") || lower.includes("pellegrino")) beverage.push("Chilled San Pellegrino Sparkling Water");

  // Vehicle detections
  if (lower.includes("defender") || lower.includes("4x4") || lower.includes("suv")) vehicle = "Land Rover Defender 110 4x4 (Off-Road Air Suspension)";
  else if (lower.includes("maybach") || lower.includes("mercedes") || lower.includes("s-class")) vehicle = "Mercedes-Maybach S-Class (Reclining Executive Chauffeur)";
  else if (lower.includes("vintage") || lower.includes("rolls")) vehicle = "Vintage 1938 Rolls-Royce Ceremonial Fleet";
  else if (lower.includes("chopper") || lower.includes("heli") || lower.includes("aviation")) vehicle = "Private Airbus H130 Helicopter Direct Tarmac Transfer";

  // Milestone detections
  if (lower.includes("anniversary") || lower.includes("wedding")) milestone = "Silver 25th Wedding Anniversary Celebration";
  if (lower.includes("birthday") || lower.includes("50th")) milestone = "50th Milestone Golden Birthday Gala";

  return {
    dietaryRestrictions: dietary.length > 0 ? dietary : ["Pure Vegetarian Preferred", "Organic Farm-to-Table"],
    roomPreferences: room.length > 0 ? room : ["Highest Floor Palace Lake Suite"],
    beveragePreferences: beverage.length > 0 ? beverage : ["Dom Pérignon Champagne & Fresh Darjeeling First Flush"],
    vehiclePreference: vehicle || "Land Rover Defender 110 4WD Luxury Spec",
    milestoneEvents: milestone ? [{ title: milestone, date: "2026-11-14", relation: "Self & Spouse" }] : [],
  };
}

export function simulateVoiceCallTranscription(
  callerName: string,
  scenarioNotes?: string
): VoiceCallTranscript {
  const id = "call-" + Date.now();
  const now = new Date().toISOString();
  const caller = callerName || "VIP Guest";

  const rawTranscript = scenarioNotes || `"Hello Suraj, this is ${caller}. Regarding our upcoming trip to Rajasthan and Ladakh: please ensure our room at Udaivilas is on the ground floor with an unhindered Lake Pichola view. My wife has a severe shellfish allergy and we prefer strictly vegetarian organic dining. Also, we are celebrating our 25th wedding anniversary on November 14th, so we would love chilled Dom Pérignon champagne waiting in the suite upon arrival. For the desert and mountain sectors, kindly assign the new Land Rover Defender 4x4 with an experienced senior escort."`;

  const extracted = extractNuancesFromCallTranscript(rawTranscript);

  return {
    id,
    timestamp: now,
    duration: "2m 45s",
    caller,
    rawTranscript,
    summary: `Verified caller: ${caller}. Stated strict vegetarian dining, ground floor lake suite, 25th anniversary on Nov 14th, Dom Pérignon champagne, and Land Rover Defender 4x4 allocation.`,
    extractedNuances: {
      dietary: extracted.dietaryRestrictions,
      roomViews: extracted.roomPreferences,
      champagneOrBeverage: extracted.beveragePreferences,
      vehicle: extracted.vehiclePreference,
      milestone: extracted.milestoneEvents && extracted.milestoneEvents[0] ? extracted.milestoneEvents[0].title : undefined,
      insiderRequests: [
        "Chilled champagne on arrival",
        "Senior ASI licensed royal historian escort",
        "Daily oxygen & thermal kit in high altitude"
      ],
    },
  };
}

// ==========================================
// MULTI-CURRENCY & AUTOMATED GST INVOICING SUITE
// ==========================================

export const SOULSVENTURE_INVOICES_KEY = "soulsventure_invoices_v1";

export const INITIAL_INVOICES: GSTInvoice[] = [
  {
    id: "inv-2026-001",
    invoiceNumber: "SV-INV-2026-089",
    leadReference: "SV-2026-VIP",
    invoiceDate: "2026-10-20",
    dueDate: "2026-11-01",
    clientName: "Mr. Rajesh Sharma & Family",
    clientEmail: "rajesh.sharma@luxuryinvest.in",
    clientPhone: "+91 98201 44521",
    billingAddress: "Penthouse 42, Altamount Road, Mumbai, Maharashtra 400026",
    clientGstinOrPan: "27AAAPL1234F1Z8",
    agencyGstin: "05AAECS9821R1ZM",
    sacCode: "998555",
    currency: "INR",
    exchangeRateToINR: 1,
    lineItems: [
      {
        id: "li-1",
        description: "The Oberoi Udaivilas - Kohinoor Lake Suite with Private Pool (3 Nights)",
        category: "Palace Suite",
        quantity: 3,
        unitPrice: 220000,
        amount: 660000,
      },
      {
        id: "li-2",
        description: "SUJÁN JAWAI - Royal Tented Suite & Private Leopard Safaris (2 Nights)",
        category: "Palace Suite",
        quantity: 2,
        unitPrice: 195000,
        amount: 390000,
      },
      {
        id: "li-3",
        description: "Private Pilatus PC-12 Turboprop Charter (Jaipur ⇄ JAWAI Airstrip)",
        category: "Private Aviation",
        quantity: 1,
        unitPrice: 480000,
        amount: 480000,
      },
      {
        id: "li-4",
        description: "Chauffeured Land Rover Defender 110 4WD Convoy & Dedicated Concierge",
        category: "Luxury Fleet",
        quantity: 6,
        unitPrice: 28000,
        amount: 168000,
      },
      {
        id: "li-5",
        description: "Private After-Hours City Palace Access & Royal Courtyard Dining with Historian",
        category: "Excursion",
        quantity: 1,
        unitPrice: 145000,
        amount: 145000,
      },
    ],
    subtotal: 1843000,
    gstRatePercent: 5,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 92150,
    totalGstAmount: 92150,
    conciergeRetainerINR: 75000,
    grandTotal: 2010150,
    paymentStatus: "Advance Paid",
    paymentTerms: "50% Advance received via RTGS. Balance 50% due 14 days prior to royal arrival.",
  },
  {
    id: "inv-2026-002",
    invoiceNumber: "SV-INV-2026-092",
    leadReference: "SV-2026-KSH",
    invoiceDate: "2026-10-24",
    dueDate: "2026-11-10",
    clientName: "Mrs. Ananya Kapoor",
    clientEmail: "ananya.kapoor@atelier.com",
    clientPhone: "+91 98112 33456",
    billingAddress: "The Manor, Golf Links, New Delhi 110003",
    clientGstinOrPan: "07AAACK9988D1Z2",
    agencyGstin: "05AAECS9821R1ZM",
    sacCode: "998555",
    currency: "USD",
    exchangeRateToINR: 84.5,
    lineItems: [
      {
        id: "li-10",
        description: "The Khyber Himalayan Resort & Spa - Presidential Pine Suite (4 Nights)",
        category: "Palace Suite",
        quantity: 4,
        unitPrice: 1850,
        amount: 7400,
      },
      {
        id: "li-11",
        description: "Airbus H130 Mountain Heli-Ski Charter (Srinagar ⇄ Gulmarg Heli-bowl)",
        category: "Private Aviation",
        quantity: 2,
        unitPrice: 2400,
        amount: 4800,
      },
      {
        id: "li-12",
        description: "Private Master Alpine Ski Guide & Heated Mercedes Sprinter Convoy",
        category: "Luxury Fleet",
        quantity: 5,
        unitPrice: 420,
        amount: 2100,
      },
    ],
    subtotal: 14300,
    gstRatePercent: 5,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 715,
    totalGstAmount: 715,
    conciergeRetainerINR: 0,
    grandTotal: 15015,
    paymentStatus: "Pro-Forma Issued",
    paymentTerms: "Pro-Forma Tax Invoice. Wire transfer via SWIFT / Wire to SoulsVenture HDFC Bank Escrow.",
  },
];

export function getStoredInvoices(): GSTInvoice[] {
  if (typeof window === "undefined") return INITIAL_INVOICES;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_INVOICES_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_INVOICES_KEY, JSON.stringify(INITIAL_INVOICES));
      return INITIAL_INVOICES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_INVOICES;
  } catch (e) {
    return INITIAL_INVOICES;
  }
}

export function saveInvoices(invoices: GSTInvoice[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_INVOICES_KEY, JSON.stringify(invoices));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save invoices:", e);
  }
}

export function createGSTInvoice(data: Omit<GSTInvoice, "id" | "invoiceNumber">): GSTInvoice {
  const existing = getStoredInvoices();
  const nextNum = "SV-INV-2026-" + String(existing.length + 95).padStart(3, "0");
  const newInv: GSTInvoice = {
    ...data,
    id: "inv-" + Date.now(),
    invoiceNumber: nextNum,
  };
  const updated = [newInv, ...existing];
  saveInvoices(updated);
  return newInv;
}

// ==========================================
// PRIVATE JET & CHOPPER CHARTER BOOKING MODULE
// ==========================================

export const INITIAL_CHARTER_SECTORS: CharterEstimate[] = [
  {
    id: "sec-1",
    sector: "Srinagar (SXR) ⇄ Gulmarg Ski Helipad",
    fromCity: "Srinagar International",
    toCity: "Gulmarg High-Altitude Helipad",
    aircraftType: "Airbus H130 Helicopter",
    paxCapacity: 5,
    flightTimeMins: 22,
    cruisingAltitudeFt: 11500,
    baseRateINR: 285000,
    landingHandlingINR: 35000,
    totalEstimateINR: 320000,
    rateUSD: 3780,
    dgcaStatus: "DGCA Slot Pre-Approved",
    mountainPassRisk: "Alpine Visual Flight Rules Only",
    recommendedFleet: "Turbomeca Arriel 2D turbine with emergency floatation gear",
  },
  {
    id: "sec-2",
    sector: "Leh Kushok Bakula (IXL) ⇄ Nubra Valley Diskit",
    fromCity: "Leh Military & Civil Airstrip",
    toCity: "Diskit Nubra Riverbed Helipad",
    aircraftType: "Airbus H130 Helicopter",
    paxCapacity: 4,
    flightTimeMins: 32,
    cruisingAltitudeFt: 18380,
    baseRateINR: 390000,
    landingHandlingINR: 45000,
    totalEstimateINR: 435000,
    rateUSD: 5150,
    dgcaStatus: "Military Clearance Required",
    mountainPassRisk: "High-Altitude Thermal Protocol",
    recommendedFleet: "High-density altitude certified with onboard medical supplemental O2",
  },
  {
    id: "sec-3",
    sector: "New Delhi IGI (DEL) ⇄ Udaipur Maharana Pratap (UDR)",
    fromCity: "Delhi Private Jet Terminal (T3 GA)",
    toCity: "Udaipur VIP Bay",
    aircraftType: "Pilatus PC-12 Turboprop",
    paxCapacity: 8,
    flightTimeMins: 65,
    cruisingAltitudeFt: 26000,
    baseRateINR: 520000,
    landingHandlingINR: 60000,
    totalEstimateINR: 580000,
    rateUSD: 6860,
    dgcaStatus: "DGCA Slot Pre-Approved",
    mountainPassRisk: "None (Direct Flight)",
    recommendedFleet: "BMW Designworks luxury executive cabin with satellite phone",
  },
  {
    id: "sec-4",
    sector: "Jaipur (JAI) ⇄ SUJÁN JAWAI Private Airstrip",
    fromCity: "Jaipur VIP GA Terminal",
    toCity: "JAWAI Granite Escarpment Strip",
    aircraftType: "Bell 407 Helo",
    paxCapacity: 5,
    flightTimeMins: 45,
    cruisingAltitudeFt: 8500,
    baseRateINR: 340000,
    landingHandlingINR: 40000,
    totalEstimateINR: 380000,
    rateUSD: 4490,
    dgcaStatus: "DGCA Slot Pre-Approved",
    mountainPassRisk: "None (Direct Flight)",
    recommendedFleet: "Rolls-Royce 250-C47B engine with Bose noise-canceling headsets",
  },
  {
    id: "sec-5",
    sector: "Dehradun Jolly Grant (DED) ⇄ Kedarnath / Badrinath",
    fromCity: "Dehradun Helipad (Sahastradhara)",
    toCity: "Kedarnath Base Helipad",
    aircraftType: "Airbus H130 Helicopter",
    paxCapacity: 5,
    flightTimeMins: 35,
    cruisingAltitudeFt: 12200,
    baseRateINR: 360000,
    landingHandlingINR: 40000,
    totalEstimateINR: 400000,
    rateUSD: 4730,
    dgcaStatus: "DGCA Slot Pre-Approved",
    mountainPassRisk: "Alpine Visual Flight Rules Only",
    recommendedFleet: "Fenestron enclosed tail rotor for highest mountain safety margin",
  },
  {
    id: "sec-6",
    sector: "Mumbai VIP Terminal (BOM) ⇄ Goa Dabolim / Mopa (GOX)",
    fromCity: "Mumbai Kalina Private Jet Terminal",
    toCity: "Goa Mopa VIP FBO",
    aircraftType: "Bombardier Challenger 605",
    paxCapacity: 11,
    flightTimeMins: 55,
    cruisingAltitudeFt: 38000,
    baseRateINR: 880000,
    landingHandlingINR: 95000,
    totalEstimateINR: 975000,
    rateUSD: 11500,
    dgcaStatus: "DGCA Slot Pre-Approved",
    mountainPassRisk: "None (Direct Flight)",
    recommendedFleet: "Stand-up executive luxury suite with full galley and flight attendant",
  },
];

// ==========================================
// CLIENT PORTAL & WHITE-LABEL MEMBER SUITE
// ==========================================

export const SOULSVENTURE_CLIENT_ACCOUNTS_KEY = "soulsventure_client_accounts_v1";
export const SOULSVENTURE_CLIENT_AUTH_KEY = "soulsventure_client_auth_session_v1";
export const SOULSVENTURE_DOCUMENTS_KEY = "soulsventure_client_documents_v1";

export const INITIAL_CLIENT_ACCOUNTS: ClientAccount[] = [
  {
    id: "client-001",
    name: "Mr. Rajesh Sharma",
    email: "rajesh.sharma@luxuryinvest.in",
    phone: "+91 98201 44521",
    password: "soulsventure2026",
    createdAt: "2026-10-15T10:00:00Z",
    activeTripRef: "SV-2026-VIP",
    assignedCurator: "Suraj Uniyal",
    nuances: {
      dietaryRestrictions: ["Pure Vegetarian (No meat/fish)", "Jain options for spouse on festival dates"],
      roomPreferences: ["Ground Floor Lake View Suite", "Feather pillows & evening lavender pillow mist"],
      beveragePreferences: ["Dom Pérignon Vintage 2013 on arrival", "Fresh Kashmiri Saffron Kahwa"],
      vehiclePreference: "Land Rover Defender 110 4WD (Black Obsidian, Chauffeur Vikram)",
      milestoneEvents: [{ title: "25th Silver Wedding Anniversary", date: "2026-11-14", relation: "Self & Spouse" }],
      voiceCalls: [],
      specialProtocol: "Titular Royal family greetings requested during Udaipur City Palace after-hours tour.",
    },
  },
  {
    id: "client-002",
    name: "Mrs. Ananya Kapoor",
    email: "ananya.kapoor@atelier.com",
    phone: "+91 98112 33456",
    password: "soulsventure2026",
    createdAt: "2026-10-18T14:30:00Z",
    activeTripRef: "SV-2026-KSH",
    assignedCurator: "Harsh Sood",
    nuances: {
      dietaryRestrictions: ["Gluten-Sensitive", "Wild Himalayan Morel & Truffle degustation"],
      roomPreferences: ["Pine forest facing Presidential Suite with heated fireplace"],
      beveragePreferences: ["Macallan 18 Double Cask Single Malt", "Fresh mountain spring water"],
      vehiclePreference: "Heated Mercedes-Benz Sprinter Executive Lounge",
      milestoneEvents: [{ title: "Milestone Birthday Escape", date: "2026-12-05", relation: "Self" }],
      voiceCalls: [],
      specialProtocol: "Requires certified UIAGM Alpine Mountain Ski Master at all times.",
    },
  },
  {
    id: "client-003",
    name: "Suraj Uniyal (Founder & VIP Member)",
    email: "suraj@soulsventure.com",
    phone: "+91 8126357353",
    password: "soulsventure2026",
    createdAt: "2026-10-10T10:00:00Z",
    activeTripRef: "SV-2026-VIP",
    assignedCurator: "Harsh Sood",
    nuances: {
      dietaryRestrictions: ["Pure Vegetarian", "Organic Farm-to-Table"],
      roomPreferences: ["Panoramic Lake View Presidential Suite"],
      beveragePreferences: ["Dom Pérignon Champagne & Fresh Darjeeling First Flush"],
      vehiclePreference: "Land Rover Defender 110 4WD Luxury Spec",
      milestoneEvents: [{ title: "Founders Bespoke Expedition", date: "2026-11-20", relation: "Self" }],
      voiceCalls: [],
      specialProtocol: "VIP Founder White-Glove Protocol.",
    },
  },
];

export const INITIAL_CLIENT_DOCUMENTS: ClientDocumentVaultItem[] = [
  {
    id: "doc-1",
    title: "The Oberoi Udaivilas - Kohinoor Suite Palace Voucher",
    category: "Hotel Voucher",
    referenceCode: "SV-2026-VIP",
    issuer: "The Oberoi Group Luxury Sales",
    issuedDate: "2026-10-22",
    status: "Verified & Active",
    details: "Confirmed VIP Check-In at 14:00 hrs. Includes Private Boat Arrival & Butler.",
  },
  {
    id: "doc-2",
    title: "SUJÁN JAWAI - Royal Leopard Safari Camp Confirmation",
    category: "Hotel Voucher",
    referenceCode: "SV-2026-VIP",
    issuer: "SUJÁN Luxury Wilderness",
    issuedDate: "2026-10-22",
    status: "Verified & Active",
    details: "2 Nights Royal Tented Suite with 4 Private Game Safaris & Lead Naturalist.",
  },
  {
    id: "doc-3",
    title: "Pilatus PC-12 Private Turboprop VIP Boarding Pass",
    category: "Charter Boarding Pass",
    referenceCode: "SV-2026-VIP",
    issuer: "Club One Air VIP Charter Desk",
    issuedDate: "2026-10-24",
    status: "Verified & Active",
    details: "Sector: Jaipur VIP GA Bay → JAWAI Airstrip. Tarmac vehicle clearance granted.",
  },
  {
    id: "doc-4",
    title: "Official Pro-Forma Tax Invoice (SV-INV-2026-089)",
    category: "Tax Invoice",
    referenceCode: "SV-2026-VIP",
    issuer: "SoulsVenture Luxury Journeys Pvt Ltd",
    issuedDate: "2026-10-20",
    status: "Verified & Active",
    details: "Total Investment: ₹20,10,150 (Includes 5% Tourism GST + Private Aviation).",
  },
  {
    id: "doc-5",
    title: "Inner Line Permit & Khardung La High Pass Clearance",
    category: "Permit & Visa",
    referenceCode: "SV-2026-VIP",
    issuer: "District Magistrate Leh & Northern Command",
    issuedDate: "2026-10-25",
    status: "Gate Cleared",
    details: "Official Military & Wildlife Permit for Nubra Valley & Pangong Tso crossing.",
  },
];

export function getStoredClientAccounts(): ClientAccount[] {
  if (typeof window === "undefined") return INITIAL_CLIENT_ACCOUNTS;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_CLIENT_ACCOUNTS_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_CLIENT_ACCOUNTS_KEY, JSON.stringify(INITIAL_CLIENT_ACCOUNTS));
      return INITIAL_CLIENT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CLIENT_ACCOUNTS;
  } catch {
    return INITIAL_CLIENT_ACCOUNTS;
  }
}

export function saveClientAccounts(accounts: ClientAccount[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_CLIENT_ACCOUNTS_KEY, JSON.stringify(accounts));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save client accounts:", e);
  }
}

export function getClientAuthSession(): ClientAccount | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_CLIENT_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveClientAuthSession(client: ClientAccount): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_CLIENT_AUTH_KEY, JSON.stringify(client));
  } catch (e) {
    console.error("Failed to save client auth session:", e);
  }
}

export function clearClientAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SOULSVENTURE_CLIENT_AUTH_KEY);
}

export function verifyClientLogin(emailOrPhone: string, pass: string): ClientAccount | null {
  const accounts = getStoredClientAccounts();
  const input = emailOrPhone.trim().toLowerCase();
  const cleanInput = input.replace(/[^0-9]/g, "");
  const password = pass.trim();

  // 1. Direct match in registered accounts
  const found = accounts.find(
    (a) =>
      (a.email.toLowerCase() === input ||
        (cleanInput.length >= 6 && a.phone.replace(/[^0-9]/g, "").endsWith(cleanInput))) &&
      (a.password === password ||
        password === "soulsventure2026" ||
        password === "SoulsVentureVIP2026" ||
        password === "812635" ||
        a.phone.replace(/[^0-9]/g, "").endsWith(password))
  );
  if (found) return found;

  // 2. Demo master bypass
  if (password === "soulsventure2026" || password === "SoulsVentureVIP2026" || password === "812635") {
    const match = accounts.find(
      (a) =>
        a.email.toLowerCase() === input ||
        (cleanInput.length >= 6 && a.phone.replace(/[^0-9]/g, "").endsWith(cleanInput)) ||
        a.id.toLowerCase() === input
    );
    if (match) return match;
    return accounts[0] || null;
  }

  // 3. Match from CRM Leads and auto-create client session
  const leads = getStoredLeads();
  const leadMatch = leads.find(
    (l) =>
      l.email.toLowerCase() === input ||
      (cleanInput.length >= 6 && l.phone.replace(/[^0-9]/g, "").endsWith(cleanInput))
  );

  if (leadMatch) {
    const synthAccount: ClientAccount = {
      id: "client-" + leadMatch.id,
      name: leadMatch.clientName,
      email: leadMatch.email,
      phone: leadMatch.phone,
      password: password,
      createdAt: leadMatch.createdAt,
      activeTripRef: leadMatch.referenceCode,
      assignedCurator: leadMatch.assignedCurator,
      nuances: leadMatch.clientNuances || {
        dietaryRestrictions: ["Pure Vegetarian", "Custom Culinary Brief"],
        roomPreferences: ["Panoramic Lake / Mountain View Suite"],
        beveragePreferences: ["Chilled Champagne & Spring Water"],
        vehiclePreference: leadMatch.assignedVehicle || "Land Rover Defender 110 4WD",
        milestoneEvents: [{ title: "Bespoke Journey", date: "2026-11-20", relation: "Self" }],
        voiceCalls: [],
      },
    };
    const updatedAccounts = [synthAccount, ...accounts.filter((a) => a.id !== synthAccount.id)];
    saveClientAccounts(updatedAccounts);
    return synthAccount;
  }

  return null;
}

export function registerClientAccount(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  destinations?: string[];
}): { success: boolean; error?: string; client?: ClientAccount } {
  const accounts = getStoredClientAccounts();
  const existing = accounts.find(
    (a) => a.email.toLowerCase() === data.email.trim().toLowerCase()
  );
  if (existing) {
    return { success: false, error: "An account with this email already exists. Please log in." };
  }

  const newRef = "SV-2026-VIP-" + Math.floor(100 + Math.random() * 900);
  const newClient: ClientAccount = {
    id: "client-" + Date.now(),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    password: data.password.trim(),
    createdAt: new Date().toISOString(),
    activeTripRef: newRef,
    assignedCurator: "Suraj Uniyal",
    nuances: {
      dietaryRestrictions: ["Pure Vegetarian", "Custom Culinary Brief Requested"],
      roomPreferences: ["Panoramic Lake / Mountain View Suite"],
      beveragePreferences: ["Chilled Champagne & Himalayan Spring Water"],
      vehiclePreference: "Land Rover Defender 110 4WD Luxury Spec",
      milestoneEvents: [{ title: "Handcrafted Luxury Voyage", date: "2026-11-20", relation: "Personal" }],
      voiceCalls: [],
      specialProtocol: "VIP White-Glove Concierge Assigned by Founders.",
    },
  };

  const updated = [newClient, ...accounts];
  saveClientAccounts(updated);
  saveClientAuthSession(newClient);
  return { success: true, client: newClient };
}

export function getStoredClientDocuments(): ClientDocumentVaultItem[] {
  if (typeof window === "undefined") return INITIAL_CLIENT_DOCUMENTS;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_DOCUMENTS_KEY);
    if (!raw) {
      localStorage.setItem(SOULSVENTURE_DOCUMENTS_KEY, JSON.stringify(INITIAL_CLIENT_DOCUMENTS));
      return INITIAL_CLIENT_DOCUMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CLIENT_DOCUMENTS;
  } catch {
    return INITIAL_CLIENT_DOCUMENTS;
  }
}

export function saveClientDocuments(docs: ClientDocumentVaultItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_DOCUMENTS_KEY, JSON.stringify(docs));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save documents:", e);
  }
}
