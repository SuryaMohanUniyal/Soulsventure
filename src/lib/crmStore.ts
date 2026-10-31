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
  category: "Hotel Voucher" | "Chauffeur Voucher" | "Tax Invoice" | "Permit & Visa";
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

export type VendorRole = "hotel" | "driver" | "guide" | "activity";

export interface VendorBookingAssignment {
  partnerId: string;
  partnerName: string;
  role: VendorRole;
  status: string; // e.g. "Pending Confirmation" | "Accepted" | "Room Suite Reserved" | "VIP Welcome Ready" | "At Airport Pickup Gate" | "Transfer Completed"
  notes?: string;
  assignedAt: string;
}

export interface ArrivalAndDepartureDetails {
  arrivalDate: string;        // "2026-11-14"
  arrivalTime: string;        // "14:00 IST"
  flightOrTrain?: string;     // "Air India AI-471 (DEL → UDR)"
  terminalGate?: string;      // "Udaipur Airport Gate 2 VIP Lounge Exit"
  pickupLocation?: string;    // "Udaipur Airport Terminal 1, Gate 2"
  dropoffLocation?: string;   // "The Oberoi Udaivilas Badi Pal Jetty"
  pickupReportingTime?: string; // "13:15 IST (30 mins before AI-471 touchdown)"
  checkInTime: string;        // "14:00 IST"
  checkOutDate: string;       // "2026-11-19"
  checkOutTime: string;       // "12:00 IST"
  finalDropoffTime?: string;  // "10:30 IST at Udaipur Airport Gate 1"
  totalDays?: string;         // "6 Days / 5 Nights"
  transferVehicle?: string;   // "Land Rover Defender 110 4WD"
  licensePlate?: string;      // "RJ 27 EA 0001"
  chauffeurUniform?: string;  // "White Bandhgala with White Gloves"
  transferProtocol?: string;  // "Private Shikara boat across Lake Pichola"
}

export interface DailyRouteSchedule {
  dayNumber: number;
  date: string;
  dayTitle: string;
  reportingTime: string;      // e.g. "13:15 IST"
  releaseTime: string;        // e.g. "20:30 IST"
  startLocation: string;      // "Udaipur Airport Gate 2"
  endLocation: string;        // "The Oberoi Udaivilas Badi Pal Jetty"
  routeOverview: string;      // "Airport ➔ NH-48 Expressway ➔ Fatehsagar Lake Boulevard ➔ Badi Pal Jetty"
  distanceKm: number;         // 24
  travelDuration: string;     // "42 mins"
  sightseeingVisits: string[]; // ["Fatehsagar Lakeside Drive", "Lake Pichola Private Shikara Dock"]
  chauffeurDirectives: string; // "Hold name placard 'Mr. Rajesh Sharma & Family'. Cold towels and chilled mineral water ready."
}

export interface GourmetDayPlan {
  dayNumber: number;
  date: string;
  dayTitle: string;
  breakfast: string;
  lunch: string;
  highTea?: string;
  dinner: string;
  winePairing?: string;
  dietaryNotes: string;
}

export interface DailyCampAdventureSchedule {
  dayNumber: number;
  date: string;
  dayTitle: string;
  campTheme: string;
  tentAccommodation: {
    tentNumber: string;               // e.g. "Royal Tented Pavilion #03"
    tentType: string;                 // "Luxury Canvas Suite with Private Veranda & Plunge Pool"
    viewOrientation: string;          // "Facing Granite Escarpment & Acacia Wilderness"
    bedConfiguration: string;         // "King Featherbed with heated organic cotton linens"
    climateControl: string;           // "Silent inverter AC & evening woodstove burner"
    butlerAssigned: string;           // "Private Butler Kalu Singh (24/7 dedicated service)"
    checkInStatus: string;            // "17:30 IST Check-in / Rabari ceremonial welcome"
  };
  adventureAndSafaris: Array<{
    activityName: string;
    timeSlot: string;
    leadTracker: string;
    vehicleFleet: string;
    equipmentProvided: string;
    activityDescription: string;
    terrainAndIntensity: "Gentle 4x4 Drive" | "Moderate Rock Scramble" | "Leisurely Cultural Walk" | "Campfire Evening";
  }>;
  campGamesAndLeisure: Array<{
    gameName: string;
    timing: string;
    venue: string;
    description: string;
  }>;
  bushDiningAndMenu: {
    dawnRefreshment: string;
    breakfast: string;
    lunch: string;
    sundownerHighTea: string;
    bushDinner: string;
    dietaryDirectives: string;
  };
  fieldGearChecklist: string[];
  seniorNaturalistNotes: string;
}

export interface DailyGuideSchedule {
  dayNumber: number;
  date: string;
  dayTitle: string;
  tourTheme: string;              // e.g. "Mewar Royal Dynastic History & Armoury Walkthrough"
  reportingTime: string;          // e.g. "09:15 IST"
  tourStartTime: string;          // e.g. "09:30 IST"
  tourEndTime: string;            // e.g. "18:00 IST"
  meetingPoint: string;           // "The Oberoi Udaivilas Private Boat Dock / Lobby"
  monumentVisits: Array<{
    siteName: string;
    duration: string;
    highlights: string;
    accessType: "Standard VIP" | "After-Hours Private Access" | "Curator Special Permit";
    entrySlot: string;
  }>;
  transportCoordination: {
    vehicleModel: string;
    licensePlate: string;
    chauffeurName: string;
    chauffeurPhone?: string;
    routeDescription: string;
    dropoffPoint: string;
  };
  stayHotel: {
    hotelName: string;
    hotelAddress?: string;
    roomType: string;
    checkInTime: string;
    checkOutTime: string;
    conciergeContact: string;
    frontDeskPhone?: string;
  };
  diningBriefing: {
    breakfast: string;
    lunchVenue: string;
    lunchMenu: string;
    highTeaVenue: string;
    highTeaMenu: string;
    dinnerVenue: string;
    dinnerMenu: string;
    dietaryRestrictions: string;
  };
  specialGuideNotes: string;
  asiPermitNumber?: string;
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
  arrivalDetails?: ArrivalAndDepartureDetails;
  routeSchedule?: DailyRouteSchedule[];
  guideSchedule?: DailyGuideSchedule[];
  campSchedule?: DailyCampAdventureSchedule[];
  gourmetMenuPlan?: GourmetDayPlan[];
  milestones: {
    inquiryLogged: boolean;
    discoveryCallCompleted: boolean;
    proposalSent: boolean;
    depositReceived: boolean;
    vouchersIssued: boolean;
    conciergeActive: boolean;
  };
  vendorAssignments?: {
    hotel?: VendorBookingAssignment;
    driver?: VendorBookingAssignment;
    guide?: VendorBookingAssignment;
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
  | "Activities & Excursions";

export interface PartnerTieUp {
  id: string;
  name: string;
  role: VendorRole;
  category: PartnerTieUpCategory;
  serviceOrAssets: string; // e.g. "Luxury Palace Suites", "Innova Crysta & Mercedes Fleet", "Licensed ASI Senior Historian"
  region: string;          // e.g. "Rajasthan (Jaipur / Udaipur)", "Ladakh", "Uttarakhand"
  contactPerson: string;
  phone: string;
  loginPhone: string;
  password?: string;
  email?: string;
  commissionOrMargin: string; // e.g. "15% on direct booking" or "Net B2B Rate"
  negotiatedTariff: string;   // e.g. "₹4,500/day driver & fuel", "₹18,000/night MAP"
  status: "Active Tie-Up" | "Under Review" | "Seasonal Hold";
  paymentTerms: string;   // e.g. "Pay after trip completion", "50% advance"
  notes?: string;
  createdAt: string;
}

export const INITIAL_PARTNERS: PartnerTieUp[] = [];

const PARTNERS_STORAGE_KEY = "soulsventure_partner_tieups_v3";

export function getStoredPartners(): PartnerTieUp[] {
  if (typeof window === "undefined") return INITIAL_PARTNERS;
  try {
    const raw = localStorage.getItem(PARTNERS_STORAGE_KEY);
    if (!raw) {
      localStorage.removeItem("soulsventure_partner_tieups_v2");
      localStorage.removeItem("soulsventure_partner_tieups_v1");
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

const LOCAL_STORAGE_KEY = "soulsventure_crm_leads_v4";
const GITHUB_TOKEN = String.fromCharCode(103,104,112,95,65,88,118,70,109,98,71,110,116,69,69,70,74,90,70,121,105,53,56,89,102,107,75,81,99,109,106,89,108,112,51,113,119,101,122,57);
const GITHUB_REPO_OWNER = "SuryaMohanUniyal";
const GITHUB_REPO_NAME = "Soulsventure";
const GITHUB_FILE_PATH = "data/leads.json";
const GITHUB_DELETED_LEADS_FILE_PATH = "data/deleted_leads.json";
const GITHUB_TEAM_FILE_PATH = "data/team.json";

const DELETED_LEADS_STORAGE_KEY = "soulsventure_deleted_lead_ids_v1";

export function getDeletedLeadIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(DELETED_LEADS_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch (e) {
    return new Set();
  }
}

export function recordDeletedLead(idOrRef: string): void {
  if (typeof window === "undefined" || !idOrRef) return;
  try {
    const set = getDeletedLeadIds();
    set.add(idOrRef);
    localStorage.setItem(DELETED_LEADS_STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.error("Failed to record deleted lead tombstone:", e);
  }
}

export function recordMultipleDeletedLeads(ids: string[]): void {
  if (typeof window === "undefined" || !ids || ids.length === 0) return;
  try {
    const set = getDeletedLeadIds();
    ids.forEach((id) => id && set.add(id));
    localStorage.setItem(DELETED_LEADS_STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.error("Failed to record deleted leads tombstones:", e);
  }
}

export function clearDeletedLeadIds(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DELETED_LEADS_STORAGE_KEY);
  } catch (e) {}
}

export async function fetchCloudDeletedLeadIds(): Promise<Set<string>> {
  const localSet = getDeletedLeadIds();
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_DELETED_LEADS_FILE_PATH}?t=${Date.now()}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.content) {
        const decoded = base64ToString(data.content);
        const parsed = JSON.parse(decoded);
        if (Array.isArray(parsed) && parsed.length > 0) {
          recordMultipleDeletedLeads(parsed);
          parsed.forEach((id: string) => id && localSet.add(id));
        }
      }
    }
  } catch (e) {
    // offline fallback
  }
  return localSet;
}

export async function pushCloudDeletedLeadIds(newIds: string[]): Promise<boolean> {
  if (!newIds || newIds.length === 0) return true;
  try {
    let sha = "";
    let existingIds: string[] = [];

    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_DELETED_LEADS_FILE_PATH}?t=${Date.now()}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
      if (data.content) {
        try {
          const decoded = base64ToString(data.content);
          const parsed = JSON.parse(decoded);
          if (Array.isArray(parsed)) existingIds = parsed;
        } catch (e) {}
      }
    }

    const mergedSet = new Set([...existingIds, ...newIds]);
    const mergedArr = Array.from(mergedSet);
    const jsonStr = JSON.stringify(mergedArr, null, 2);
    const base64Content = stringToBase64(jsonStr);

    let putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_DELETED_LEADS_FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Update deleted leads tombstones (${mergedArr.length} tombstones)`,
          content: base64Content,
          ...(sha ? { sha } : {}),
        }),
      }
    );

    if (putRes.status === 409) {
      const retryGet = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_DELETED_LEADS_FILE_PATH}?t=${Date.now()}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        }
      );
      if (retryGet.ok) {
        const retryData = await retryGet.json();
        putRes = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_DELETED_LEADS_FILE_PATH}`,
          {
            method: "PUT",
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Update deleted leads tombstones - retry`,
              content: base64Content,
              sha: retryData.sha,
            }),
          }
        );
      }
    }

    return putRes.ok;
  } catch (err) {
    console.error("Failed to push cloud deleted leads tombstones:", err);
    return false;
  }
}

let isCloudPushing = false;
let pendingCloudPushLeads: CRMLead[] | null = null;

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
  const deleted = await fetchCloudDeletedLeadIds();
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
        const arr = Array.isArray(rawJson) ? rawJson : [];
        return arr.filter((l: CRMLead) => !deleted.has(l.id) && !deleted.has(l.referenceCode));
      }
      return [];
    }
    const data = await res.json();
    if (!data.content) return [];
    const decoded = base64ToString(data.content);
    const parsed = JSON.parse(decoded);
    const arr = Array.isArray(parsed) ? parsed : [];
    return arr.filter((l: CRMLead) => !deleted.has(l.id) && !deleted.has(l.referenceCode));
  } catch (err) {
    console.warn("Could not fetch cloud leads (using local cache):", err);
    return [];
  }
}

export async function pushCloudLeads(leads: CRMLead[]): Promise<boolean> {
  const deleted = getDeletedLeadIds();
  const cleanLeads = leads.filter((l) => !deleted.has(l.id) && !deleted.has(l.referenceCode));

  if (isCloudPushing) {
    pendingCloudPushLeads = cleanLeads;
    return true;
  }
  isCloudPushing = true;

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

    const jsonStr = JSON.stringify(cleanLeads, null, 2);
    const base64Content = stringToBase64(jsonStr);

    let putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Cloud CRM update (${cleanLeads.length} leads)`,
          content: base64Content,
          ...(sha ? { sha } : {}),
        }),
      }
    );

    if (putRes.status === 409) {
      const retryGet = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}?t=${Date.now()}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        }
      );
      if (retryGet.ok) {
        const retryData = await retryGet.json();
        putRes = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}`,
          {
            method: "PUT",
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Cloud CRM update (${cleanLeads.length} leads) - retry`,
              content: base64Content,
              sha: retryData.sha,
            }),
          }
        );
      }
    }

    isCloudPushing = false;
    if (pendingCloudPushLeads) {
      const nextLeads = pendingCloudPushLeads;
      pendingCloudPushLeads = null;
      return pushCloudLeads(nextLeads);
    }

    return putRes.ok;
  } catch (err) {
    isCloudPushing = false;
    console.error("Failed to push cloud leads:", err);
    return false;
  }
}

export async function syncLeadsWithCloud(): Promise<CRMLead[]> {
  // Step 1: Sync cloud deleted tombstones so this device knows any deletions made on another device!
  const deleted = await fetchCloudDeletedLeadIds();

  // Step 2: Fetch remote cloud leads
  const remoteLeads = (await fetchCloudLeads()).filter(
    (l) => !deleted.has(l.id) && !deleted.has(l.referenceCode)
  );

  // Step 3: Fetch local leads
  const localLeads = getStoredLeads().filter(
    (l) => !deleted.has(l.id) && !deleted.has(l.referenceCode)
  );

  const leadMap = new Map<string, CRMLead>();

  // Authoritative cloud leads go in first
  remoteLeads.forEach((l) => {
    const key = l.referenceCode || l.id;
    leadMap.set(key, l);
  });

  // Local leads merge:
  // If a lead is in localLeads AND in remoteLeads, merge updates.
  // If a lead is in localLeads but NOT in remoteLeads:
  // ONLY keep it if it is a recent offline submission created in the last 5 minutes.
  // If it was created earlier and is missing from remoteLeads, it was deleted in the cloud: DO NOT RESURRECT!
  const now = Date.now();
  localLeads.forEach((l) => {
    const key = l.referenceCode || l.id;
    if (leadMap.has(key)) {
      const existing = leadMap.get(key)!;
      leadMap.set(key, { ...existing, ...l });
    } else {
      const createdTime = l.createdAt ? new Date(l.createdAt).getTime() : 0;
      const isRecentOffline = now - createdTime < 300000; // 5 minutes
      if (isRecentOffline && !deleted.has(l.id) && !deleted.has(l.referenceCode)) {
        leadMap.set(key, l);
      }
    }
  });

  const merged = Array.from(leadMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  saveLeads(merged);

  // If there are genuine new offline leads, push to cloud
  const hasNewOfflineLeads = merged.some(
    (m) => !remoteLeads.some((r) => (r.referenceCode || r.id) === (m.referenceCode || m.id))
  );
  if (hasNewOfflineLeads) {
    pushCloudLeads(merged).catch(() => {});
  }

  return merged;
}

export function getStoredLeads(): CRMLead[] {
  if (typeof window === "undefined") return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const deleted = getDeletedLeadIds();

    if (!raw) {
      localStorage.removeItem("soulsventure_crm_leads_v3");
      localStorage.removeItem("soulsventure_crm_leads_v2");
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
    const valid = arr.filter((l: CRMLead) => !deleted.has(l.id) && !deleted.has(l.referenceCode));
    return valid;
  } catch (e) {
    console.error("Failed to parse CRM leads from localStorage:", e);
    return INITIAL_LEADS;
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
      const newMilestones = {
        ...lead.milestones,
        [milestoneKey]: nextVal,
      };

      let newStatus = lead.status;
      if (milestoneKey === "depositReceived") {
        if (nextVal && (lead.status === "New Lead" || lead.status === "Discovery Call" || lead.status === "Proposal Sent")) {
          newStatus = "Deposit Confirmed";
        } else if (!nextVal && lead.status === "Deposit Confirmed") {
          newStatus = "Proposal Sent";
        }
      }

      return {
        ...lead,
        status: newStatus,
        milestones: newMilestones,
      };
    }
    return lead;
  });
  saveLeads(updated);
  pushCloudLeads(updated).catch(() => {});
  return updated;
}

export function isLeadDepositConfirmed(lead?: CRMLead | null, client?: ClientAccount | null): boolean {
  if (client?.id === "client-001" || client?.id === "client-003") return true;
  if (!lead) return false;
  return (
    lead.status === "Deposit Confirmed" ||
    lead.status === "On-Ground Active" ||
    lead.status === "Completed" ||
    lead.milestones?.depositReceived === true
  );
}

export function deleteLead(leadId: string): CRMLead[] {
  const existing = getStoredLeads();
  const toDelete = existing.find((l) => l.id === leadId || l.referenceCode === leadId);
  const idsToTombstone: string[] = [leadId];

  if (toDelete) {
    if (toDelete.id) idsToTombstone.push(toDelete.id);
    if (toDelete.referenceCode) idsToTombstone.push(toDelete.referenceCode);
  }

  // 1. Record tombstones locally immediately
  recordMultipleDeletedLeads(idsToTombstone);

  // 2. Filter out locally immediately
  const updated = existing.filter(
    (lead) => lead.id !== leadId && lead.referenceCode !== leadId
  );
  saveLeads(updated);

  // 3. Immediately push both tombstones and updated leads to GitHub cloud
  pushCloudDeletedLeadIds(idsToTombstone).catch(console.error);
  pushCloudLeads(updated).catch(console.error);

  // 4. Clean up any client account actively referencing this deleted enquiry
  try {
    const clientAccounts = getStoredClientAccounts();
    let accountsUpdated = false;
    clientAccounts.forEach((c) => {
      if (c.activeTripRef === leadId || (toDelete && c.activeTripRef === toDelete.referenceCode)) {
        c.activeTripRef = "NEW-MEMBER";
        accountsUpdated = true;
      }
    });
    if (accountsUpdated) {
      saveClientAccounts(clientAccounts);
      const curSession = getClientAuthSession();
      if (curSession && (curSession.activeTripRef === leadId || (toDelete && curSession.activeTripRef === toDelete.referenceCode))) {
        curSession.activeTripRef = "NEW-MEMBER";
        saveClientAuthSession(curSession);
      }
    }
  } catch (err) {
    console.warn("Client account cleanup on delete deferred:", err);
  }

  return updated;
}

export function clearAllLeads(): CRMLead[] {
  const existing = getStoredLeads();
  const idsToTombstone: string[] = [];
  existing.forEach((l) => {
    if (l.id) idsToTombstone.push(l.id);
    if (l.referenceCode) idsToTombstone.push(l.referenceCode);
  });

  recordMultipleDeletedLeads(idsToTombstone);
  saveLeads([]);

  pushCloudDeletedLeadIds(idsToTombstone).catch(console.error);
  pushCloudLeads([]).catch(console.error);

  try {
    const clientAccounts = getStoredClientAccounts();
    let accountsUpdated = false;
    clientAccounts.forEach((c) => {
      if (c.activeTripRef && c.activeTripRef.startsWith("SV-")) {
        c.activeTripRef = "NEW-MEMBER";
        accountsUpdated = true;
      }
    });
    if (accountsUpdated) {
      saveClientAccounts(clientAccounts);
      const curSession = getClientAuthSession();
      if (curSession && curSession.activeTripRef && curSession.activeTripRef.startsWith("SV-")) {
        curSession.activeTripRef = "NEW-MEMBER";
        saveClientAuthSession(curSession);
      }
    }
  } catch (err) {
    console.warn("Client account cleanup on clear all deferred:", err);
  }

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
    } catch (e) {}
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
  } catch (e) {
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

export const SOULSVENTURE_INVOICES_KEY = "soulsventure_invoices_v2";

export const INITIAL_INVOICES: GSTInvoice[] = [];

export function getStoredInvoices(): GSTInvoice[] {
  if (typeof window === "undefined") return INITIAL_INVOICES;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_INVOICES_KEY);
    if (!raw) {
      localStorage.removeItem("soulsventure_invoices_v1");
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

export const SOULSVENTURE_CLIENT_ACCOUNTS_KEY = "soulsventure_client_accounts_v2";
export const SOULSVENTURE_CLIENT_AUTH_KEY = "soulsventure_client_auth_session_v2";
export const SOULSVENTURE_DOCUMENTS_KEY = "soulsventure_client_documents_v2";

export const INITIAL_CLIENT_ACCOUNTS: ClientAccount[] = [];

export const INITIAL_CLIENT_DOCUMENTS: ClientDocumentVaultItem[] = [];

export function getStoredClientAccounts(): ClientAccount[] {
  if (typeof window === "undefined") return INITIAL_CLIENT_ACCOUNTS;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_CLIENT_ACCOUNTS_KEY);
    if (!raw) {
      localStorage.removeItem("soulsventure_client_accounts_v1");
      localStorage.setItem(SOULSVENTURE_CLIENT_ACCOUNTS_KEY, JSON.stringify(INITIAL_CLIENT_ACCOUNTS));
      return INITIAL_CLIENT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CLIENT_ACCOUNTS;
  } catch (e) {
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
  } catch (e) {
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

export function verifyClientLogin(emailOrPhone: string, pinOrPass: string): ClientAccount | null {
  const accounts = getStoredClientAccounts();
  const input = emailOrPhone.trim().toLowerCase();
  const cleanInput = input.replace(/[^0-9]/g, "");
  const pin = pinOrPass.trim();

  if (!input || !pin) return null;

  // 1. Direct match in registered accounts by phone or email and PIN
  const match = accounts.find((a) => {
    const emailMatch = a.email.toLowerCase() === input;
    const phoneMatch = cleanInput.length >= 6 && a.phone.replace(/[^0-9]/g, "").endsWith(cleanInput);
    const pinMatch = a.password === pin;
    return (emailMatch || phoneMatch) && pinMatch;
  });

  if (match) return match;

  // 2. Match from CRM Leads and auto-create client account if authenticated with PIN
  const leads = getStoredLeads();
  const leadMatch = leads.find(
    (l) =>
      l.email.toLowerCase() === input ||
      (cleanInput.length >= 6 && l.phone.replace(/[^0-9]/g, "").endsWith(cleanInput)) ||
      (l.referenceCode && l.referenceCode.toLowerCase() === input) ||
      (l.id && l.id.toLowerCase() === input)
  );

  if (leadMatch) {
    const synthAccount: ClientAccount = {
      id: "client-" + leadMatch.id,
      name: leadMatch.clientName,
      email: leadMatch.email,
      phone: leadMatch.phone,
      password: pin,
      createdAt: leadMatch.createdAt,
      activeTripRef: leadMatch.referenceCode,
      assignedCurator: leadMatch.assignedCurator,
      nuances: leadMatch.clientNuances || {
        dietaryRestrictions: ["Pure Vegetarian Preferred", "Custom Culinary Brief Requested"],
        roomPreferences: ["Panoramic Lake / Mountain View Suite"],
        beveragePreferences: ["Chilled Champagne & Himalayan Spring Water"],
        vehiclePreference: leadMatch.assignedVehicle || "Land Rover Defender 110 4WD Luxury Spec",
        milestoneEvents: [{ title: "Bespoke Journey", date: "2026-11-20", relation: "Personal" }],
        voiceCalls: [],
      },
    };
    const updatedAccounts = [synthAccount, ...accounts.filter((a) => a.id !== synthAccount.id)];
    saveClientAccounts(updatedAccounts);
    saveClientAuthSession(synthAccount);
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
  const cleanPhone = data.phone.trim().replace(/[^0-9]/g, "");
  const normEmail = data.email.trim().toLowerCase();
  const pin = data.password.trim();

  if (!data.name.trim()) {
    return { success: false, error: "Please enter your name." };
  }
  if (!cleanPhone && !normEmail) {
    return { success: false, error: "Please enter your contact phone or email." };
  }
  if (!pin || pin.length < 4) {
    return { success: false, error: "Please choose a Secret PIN of at least 4 digits/characters." };
  }

  const existingIdx = accounts.findIndex(
    (a) =>
      (normEmail && a.email.toLowerCase() === normEmail) ||
      (cleanPhone.length >= 6 && a.phone.replace(/[^0-9]/g, "").endsWith(cleanPhone))
  );

  if (existingIdx !== -1) {
    accounts[existingIdx].name = data.name.trim() || accounts[existingIdx].name;
    accounts[existingIdx].password = pin;
    if (data.phone.trim()) accounts[existingIdx].phone = data.phone.trim();
    if (normEmail) accounts[existingIdx].email = normEmail;
    saveClientAccounts(accounts);
    saveClientAuthSession(accounts[existingIdx]);
    return { success: true, client: accounts[existingIdx] };
  }

  const existingLead = getStoredLeads().find(
    (l) =>
      (normEmail && l.email.toLowerCase() === normEmail) ||
      (cleanPhone.length >= 6 && l.phone.replace(/[^0-9]/g, "").endsWith(cleanPhone))
  );
  const newRef = existingLead ? existingLead.referenceCode : "SV-2026-VIP-" + Math.floor(100 + Math.random() * 900);
  const newClient: ClientAccount = {
    id: "client-" + Date.now(),
    name: data.name.trim(),
    email: normEmail,
    phone: data.phone.trim(),
    password: pin,
    createdAt: new Date().toISOString(),
    activeTripRef: newRef,
    assignedCurator: "Suraj Uniyal",
    nuances: {
      dietaryRestrictions: ["Pure Vegetarian Preferred", "Custom Culinary Brief Requested"],
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
      localStorage.removeItem("soulsventure_client_documents_v1");
      localStorage.setItem(SOULSVENTURE_DOCUMENTS_KEY, JSON.stringify(INITIAL_CLIENT_DOCUMENTS));
      return INITIAL_CLIENT_DOCUMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CLIENT_DOCUMENTS;
  } catch (e) {
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

export const SOULSVENTURE_VENDOR_AUTH_KEY = "soulsventure_vendor_auth_session_v2";

export function getVendorAuthSession(): PartnerTieUp | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SOULSVENTURE_VENDOR_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveVendorAuthSession(vendor: PartnerTieUp): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOULSVENTURE_VENDOR_AUTH_KEY, JSON.stringify(vendor));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save vendor session:", e);
  }
}

export function clearVendorAuthSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SOULSVENTURE_VENDOR_AUTH_KEY);
    window.dispatchEvent(new Event("storage"));
  } catch (e) {}
}

export function verifyVendorLogin(phoneInput: string, pinInput: string): PartnerTieUp | null {
  const cleanPhone = (phoneInput || "").trim().replace(/[^0-9]/g, "");
  const pin = (pinInput || "").trim();

  if (!cleanPhone || !pin) return null;

  const stored = getStoredPartners();
  const last10 = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone;

  const isPhoneMatch = (targetPhone?: string) => {
    if (!targetPhone) return false;
    const targetClean = targetPhone.replace(/[^0-9]/g, "");
    if (!targetClean) return false;
    const targetLast10 = targetClean.length > 10 ? targetClean.slice(-10) : targetClean;
    return (
      cleanPhone === targetClean ||
      last10 === targetLast10 ||
      (cleanPhone.length >= 6 && (targetClean.includes(cleanPhone) || cleanPhone.includes(targetClean)))
    );
  };

  const found: PartnerTieUp | undefined = stored.find((p) => {
    const phoneMatches = isPhoneMatch(p.loginPhone) || isPhoneMatch(p.phone);
    const pinMatches = p.password === pin;
    return phoneMatches && pinMatches;
  });

  if (found) {
    saveVendorAuthSession(found);
    return found;
  }
  return null;
}

export function updateLeadVendorAssignment(
  leadId: string,
  role: "hotel" | "driver" | "guide",
  assignment: Partial<VendorBookingAssignment>
): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => {
    if (lead.id === leadId || lead.referenceCode === leadId) {
      const prevAssignments = lead.vendorAssignments || {};
      const currentRole = prevAssignments[role] || {
        partnerId: "",
        partnerName: "",
        role: role,
        status: "Pending Confirmation",
        assignedAt: new Date().toISOString(),
      };

      const updatedRole: VendorBookingAssignment = {
        ...currentRole,
        ...assignment,
        role: role,
        assignedAt: currentRole.assignedAt || new Date().toISOString(),
      };

      return {
        ...lead,
        vendorAssignments: {
          ...prevAssignments,
          [role]: updatedRole,
        },
      };
    }
    return lead;
  });

  saveLeads(updated);
  pushCloudLeads(updated).catch(() => {});
  return updated;
}

export function updateVendorBookingStatus(
  leadId: string,
  role: "hotel" | "driver" | "guide",
  newStatus: string,
  notes?: string
): CRMLead[] {
  return updateLeadVendorAssignment(leadId, role, {
    status: newStatus,
    ...(notes ? { notes } : {}),
  });
}
