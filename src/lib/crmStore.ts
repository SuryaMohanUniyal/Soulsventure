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
  assignedCurator: "Suraj Uniyal" | "Harsh Sood" | "Kabir Malhotra";
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

export const INITIAL_LEADS: CRMLead[] = [
  {
    id: "lead-01",
    referenceCode: "SV-8241-IND",
    createdAt: "2026-10-24T09:15:00Z",
    dateKey: "2026-10-24",
    clientName: "Vikram Singhania",
    firstName: "Vikram",
    lastName: "Singhania",
    email: "vikram.singhania@apexholding.in",
    phone: "+91 98201 44521",
    destinations: ["Ladakh & The Himalayas"],
    destinationSummary: "Ladakh Solitude & High Passes",
    travelWindow: "Currently Traveling (Oct 21–28)",
    departureDate: "2026-10-21",
    duration: "8 Days",
    companions: "Family (4 Guests)",
    familyAges: "Spouse & 2 Children (14, 17)",
    budgetTier: "₹12,00,000 - ₹25,00,000 pp",
    estimatedValueINR: 5200000,
    specialInterests: ["High Altitude Glamping", "Astral Photography", "Senior Rinpoche Blessing"],
    specialRequests: "Strictly pure vegetarian organic meals. Private high-altitude expedition physician attached.",
    consultationMethod: "phone",
    preferredTimeOfDay: "Morning (09:00 - 12:00)",
    status: "On-Ground Active",
    assignedCurator: "Suraj Uniyal",
    internalNotes: "VVIP family. Currently at TUTC Chamba Camp Thiksey. Oxygen concentrators deployed to their suites. Suraj personally called GM at 7:30 AM.",
    isVIP: true,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: true,
      proposalSent: true,
      depositReceived: true,
      vouchersIssued: true,
      conciergeActive: true,
    },
  },
  {
    id: "lead-02",
    referenceCode: "SV-4912-IND",
    createdAt: "2026-10-24T14:30:00Z",
    dateKey: "2026-10-24",
    clientName: "Dr. Rajiv & Radhika Kapoor",
    firstName: "Rajiv",
    lastName: "Kapoor",
    email: "rajiv.kapoor@medanta.org",
    phone: "+91 98110 89234",
    destinations: ["Rajasthan"],
    destinationSummary: "Mewar Palaces & Jawai Leopards",
    travelWindow: "Currently Traveling (Oct 23–Nov 01)",
    departureDate: "2026-10-23",
    duration: "10 Days",
    companions: "Couple / Anniversary",
    budgetTier: "₹6,00,000 - ₹12,00,000 pp",
    estimatedValueINR: 1950000,
    specialInterests: ["Heritage Architecture", "Apex Wildlife Tracking", "Lake Cruises"],
    specialRequests: "Celebrating 25th Silver Wedding Anniversary. Requested private Pichola barge sunset dinner.",
    consultationMethod: "zoom",
    preferredTimeOfDay: "Evening (17:00 - 21:00)",
    status: "On-Ground Active",
    assignedCurator: "Harsh Sood",
    internalNotes: "Checked into Taj Lake Palace Grand Royal Suite. Anniversary champagne and personalized flower arrangements delivered. Transfer to SUJÁN JAWAI scheduled tomorrow.",
    isVIP: true,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: true,
      proposalSent: true,
      depositReceived: true,
      vouchersIssued: true,
      conciergeActive: true,
    },
  },
  {
    id: "lead-03",
    referenceCode: "SV-3189-IND",
    createdAt: "2026-10-25T11:20:00Z",
    dateKey: "2026-10-25",
    clientName: "Ananya Birla & Party",
    firstName: "Ananya",
    lastName: "Birla",
    email: "ab.office@ventureholdings.in",
    phone: "+91 98203 77112",
    destinations: ["Kerala Backwaters"],
    destinationSummary: "Private Royal Kettuvallam & Ayurvedic Sanctuaries",
    travelWindow: "Within the next 3 weeks (Nov 12 Departure)",
    departureDate: "2026-11-12",
    duration: "7 Days",
    companions: "Private Party (6 Guests)",
    budgetTier: "₹12,00,000 - ₹25,00,000 pp",
    estimatedValueINR: 7800000,
    specialInterests: ["Ayurvedic Lineage Rejuvenation", "Private Yacht Charters", "Organic Cuisine"],
    specialRequests: "Exclusive buyout of two private Kettuvallam houseboats. Yoga master accompanying.",
    consultationMethod: "whatsapp",
    preferredTimeOfDay: "Afternoon (12:00 - 17:00)",
    status: "Deposit Confirmed",
    assignedCurator: "Suraj Uniyal",
    internalNotes: "100% advance deposit paid via RTGS (₹78,00,000). Kumarakom Lake Resort heritage villas blocked. Master Vaidya briefed on dietary parameters.",
    isVIP: true,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: true,
      proposalSent: true,
      depositReceived: true,
      vouchersIssued: true,
      conciergeActive: false,
    },
  },
  {
    id: "lead-04",
    referenceCode: "SV-6604-IND",
    createdAt: "2026-10-25T16:45:00Z",
    dateKey: "2026-10-25",
    clientName: "Rohit & Meera Varma",
    firstName: "Rohit",
    lastName: "Varma",
    email: "rohit@varma-tech.com",
    phone: "+91 99002 55678",
    destinations: ["Central India & Ranthambore"],
    destinationSummary: "Ranthambore & Bandhavgarh Tiger Trail",
    travelWindow: "December 2026 (Christmas / New Year)",
    departureDate: "2026-12-24",
    duration: "8 Days",
    companions: "Couple",
    budgetTier: "₹6,00,000 - ₹12,00,000 pp",
    estimatedValueINR: 1650000,
    specialInterests: ["Wildlife Photography", "Core Zone Permits", "Bush Dining"],
    specialRequests: "Must have Zone 1–3 in Ranthambore. Top-tier telephoto lens mount required on safari 4WD.",
    consultationMethod: "zoom",
    preferredTimeOfDay: "Evening (17:00 - 21:00)",
    status: "Proposal Sent",
    assignedCurator: "Harsh Sood",
    internalNotes: "Sent custom moodboard for SUJÁN Sher Bagh + Taj Mahua Kothi. Client reviewing draft. Scheduled WhatsApp follow-up tomorrow at 4 PM.",
    isVIP: false,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: true,
      proposalSent: true,
      depositReceived: false,
      vouchersIssued: false,
      conciergeActive: false,
    },
  },
  {
    id: "lead-05",
    referenceCode: "SV-9021-IND",
    createdAt: "2026-10-25T18:10:00Z",
    dateKey: "2026-10-25",
    clientName: "Siddharth & Tanya Mehta",
    firstName: "Siddharth",
    lastName: "Mehta",
    email: "smehta@torquecapital.com",
    phone: "+91 98980 11223",
    destinations: ["Rajasthan"],
    destinationSummary: "Exclusive Fort Buyout: Mihir Garh & Umaid Bhawan",
    travelWindow: "November 2026 (Diwali Peak)",
    departureDate: "2026-11-08",
    duration: "9 Days",
    companions: "Multi-Gen Family (10 Guests)",
    budgetTier: "₹25,00,000+ pp (Ultra-Luxe)",
    estimatedValueINR: 18500000,
    specialInterests: ["Private Fort Buyout", "Marwari Equestrian Safaris", "Pure Vegetarian Jain Banquets"],
    specialRequests: "Complete private buyout of Mihir Garh (all 9 suites). Private turboprop charter Delhi-Jodhpur-Udaipur.",
    consultationMethod: "phone",
    preferredTimeOfDay: "Morning (09:00 - 12:00)",
    status: "Deposit Confirmed",
    assignedCurator: "Suraj Uniyal",
    internalNotes: "50% deposit received (₹92,50,000). Pilatus PC-12 private aviation charter locked with tarmac access. Mihir Garh owners notified for personal greeting.",
    isVIP: true,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: true,
      proposalSent: true,
      depositReceived: true,
      vouchersIssued: false,
      conciergeActive: false,
    },
  },
  {
    id: "lead-06",
    referenceCode: "SV-1178-IND",
    createdAt: "2026-10-25T18:40:00Z",
    dateKey: "2026-10-25",
    clientName: "Tanya & Arjun Oberoi",
    firstName: "Tanya",
    lastName: "Oberoi",
    email: "tanya.oberoi@thestudio.co.in",
    phone: "+91 98100 44332",
    destinations: ["Kashmir & Gulmarg"],
    destinationSummary: "The Crown of Kashmir & Apharwat Heli-Skiing",
    travelWindow: "January 2027 (Winter Snow Season)",
    departureDate: "2027-01-15",
    duration: "7 Days",
    companions: "Couple",
    budgetTier: "₹6,00,000 - ₹12,00,000 pp",
    estimatedValueINR: 1450000,
    specialInterests: ["Alpine Powder Skiing", "Private Houseboat Solitude", "Kashmiri Cuisine"],
    specialRequests: "The Khyber Himalayan Resort Presidential Suite and private ski instructor certification.",
    consultationMethod: "zoom",
    preferredTimeOfDay: "Afternoon (12:00 - 17:00)",
    status: "New Lead",
    assignedCurator: "Harsh Sood",
    internalNotes: "Incoming lead from website /enquire. Highly interested in winter Gulmarg gondola Phase 2 passes and Sukoon Houseboat.",
    isVIP: false,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: false,
      proposalSent: false,
      depositReceived: false,
      vouchersIssued: false,
      conciergeActive: false,
    },
  },
  {
    id: "lead-07",
    referenceCode: "SV-7350-IND",
    createdAt: "2026-10-23T10:00:00Z",
    dateKey: "2026-10-23",
    clientName: "Kavita Chidambaram",
    firstName: "Kavita",
    lastName: "Chidambaram",
    email: "kavita.c@chennai-investments.com",
    phone: "+91 94440 88991",
    destinations: ["Andaman Islands"],
    destinationSummary: "The Andaman Castaway: Catamarans & Island Villas",
    travelWindow: "December 2026",
    departureDate: "2026-12-10",
    duration: "7 Days",
    companions: "Family (3 Guests)",
    budgetTier: "₹6,00,000 - ₹12,00,000 pp",
    estimatedValueINR: 2100000,
    specialInterests: ["Marine Biology Coral Dives", "Barefoot Luxury", "Night Bioluminescence"],
    specialRequests: "Taj Exotica Havelock private pool villa. PADI-certified private instructor for 12-year-old son.",
    consultationMethod: "phone",
    preferredTimeOfDay: "Morning (09:00 - 12:00)",
    status: "Discovery Call",
    assignedCurator: "Suraj Uniyal",
    internalNotes: "Discovery call conducted by Suraj. Guest loved the private catamaran charter concept. Draft proposal being formulated.",
    isVIP: false,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: true,
      proposalSent: false,
      depositReceived: false,
      vouchersIssued: false,
      conciergeActive: false,
    },
  },
  {
    id: "lead-08",
    referenceCode: "SV-5510-IND",
    createdAt: "2026-10-22T15:15:00Z",
    dateKey: "2026-10-22",
    clientName: "Aman Singhal",
    firstName: "Aman",
    lastName: "Singhal",
    email: "aman@hyd-pharma.in",
    phone: "+91 98490 33441",
    destinations: ["Ladakh & The Himalayas"],
    destinationSummary: "Pangong Tso Stargazing & Nubra Valley",
    travelWindow: "May 2027 (Pass Opening Window)",
    departureDate: "2027-05-18",
    duration: "8 Days",
    companions: "Friends Group (4 Guests)",
    budgetTier: "₹6,00,000 - ₹12,00,000 pp",
    estimatedValueINR: 2800000,
    specialInterests: ["High Mountain Passes", "Astronomy", "Monastery Chants"],
    specialRequests: "Private Land Cruiser convoy with oxygen scrubbers. Professional telescope required.",
    consultationMethod: "whatsapp",
    preferredTimeOfDay: "Evening (17:00 - 21:00)",
    status: "Proposal Sent",
    assignedCurator: "Suraj Uniyal",
    internalNotes: "Proposal sent on WhatsApp. Aman confirmed they love the TUTC Chamba Camp glamping route. Awaiting confirmation after internal group review.",
    isVIP: false,
    milestones: {
      inquiryLogged: true,
      discoveryCallCompleted: true,
      proposalSent: true,
      depositReceived: false,
      vouchersIssued: false,
      conciergeActive: false,
    },
  },
];

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

export const ACTIVE_TRAVELERS: ActiveTraveler[] = [
  {
    id: "act-1",
    leadReference: "SV-8241-IND",
    guestName: "Singhania Family (4 Pax)",
    partySize: 4,
    itineraryTitle: "Himalayan Solitude: Monasteries & Luxury Glamping",
    currentDay: 5,
    totalDays: 8,
    currentLocation: "Nubra Valley, Ladakh (10,000 ft)",
    currentStay: "The Kyagar Luxury Lodge",
    nextMilestone: "Tomorrow: Crossing Chang La Pass to Pangong Tso Lake",
    assignedCurator: "Suraj Uniyal",
    status: "VIP Smooth",
    lastCheckIn: "Today, 18:30 IST • Direct confirmation with Camp GM",
  },
  {
    id: "act-2",
    leadReference: "SV-4912-IND",
    guestName: "Dr. Rajiv & Radhika Kapoor (2 Pax)",
    partySize: 2,
    itineraryTitle: "The Royal Maharajah Circuit",
    currentDay: 3,
    totalDays: 10,
    currentLocation: "Udaipur, Lake Pichola",
    currentStay: "Taj Lake Palace (Grand Royal Suite)",
    nextMilestone: "Tomorrow morning: Scenic Mercedes convoy drive to SUJÁN JAWAI",
    assignedCurator: "Harsh Sood",
    status: "VIP Smooth",
    lastCheckIn: "Today, 19:15 IST • Anniversary barge dinner underway",
  },
];

export const VENDOR_PAYOUTS: VendorPayout[] = [
  {
    id: "vend-1",
    vendorName: "The Indian Hotels Company (IHCL)",
    propertyOrService: "Taj Lake Palace & Umaid Bhawan Palace",
    region: "Rajasthan",
    category: "Palace Hotel",
    totalBookingsINR: 3450000,
    commissionRate: 15,
    commissionEarnedINR: 517500,
    paymentStatus: "Advance Paid",
    nextDue: "Nov 02, 2026",
    vipContact: "Manvendra Rathore (Head of Luxury Sales)",
  },
  {
    id: "vend-2",
    vendorName: "SUJÁN Luxury Camps",
    propertyOrService: "SUJÁN JAWAI & SUJÁN Sher Bagh",
    region: "Rajasthan & Central India",
    category: "Wilderness Camp",
    totalBookingsINR: 2850000,
    commissionRate: 18,
    commissionEarnedINR: 513000,
    paymentStatus: "Paid in Full",
    nextDue: "Nov 15, 2026",
    vipContact: "Yuvraj Singh (Camp Director)",
  },
  {
    id: "vend-3",
    vendorName: "The Ultimate Travelling Camp (TUTC)",
    propertyOrService: "TUTC Chamba Camp Thiksey",
    region: "Ladakh",
    category: "Wilderness Camp",
    totalBookingsINR: 2100000,
    commissionRate: 20,
    commissionEarnedINR: 420000,
    paymentStatus: "Paid in Full",
    nextDue: "Completed",
    vipContact: "Tashi Namgyal (Operations Lead)",
  },
  {
    id: "vend-4",
    vendorName: "Taj Wilderness Safari Lodges",
    propertyOrService: "Taj Mahua Kothi & Taj Pashan Garh",
    region: "Central India (Bandhavgarh & Panna)",
    category: "Wilderness Camp",
    totalBookingsINR: 1980000,
    commissionRate: 15,
    commissionEarnedINR: 297000,
    paymentStatus: "Advance Paid",
    nextDue: "Nov 20, 2026",
    vipContact: "Deepak Sharma (Lead Naturalist Coordinator)",
  },
  {
    id: "vend-5",
    vendorName: "Club One Air / Private Aviation Charters",
    propertyOrService: "Pilatus PC-12 & Falcon 2000 Turboprop Convoys",
    region: "Pan-India",
    category: "Private Aviation",
    totalBookingsINR: 4500000,
    commissionRate: 10,
    commissionEarnedINR: 450000,
    paymentStatus: "Advance Paid",
    nextDue: "Nov 05, 2026",
    vipContact: "Captain Sandhu (VIP Charter Operations)",
  },
];

const LOCAL_STORAGE_KEY = "soulsventure_crm_leads_v2";

export function getStoredLeads(): CRMLead[] {
  if (typeof window === "undefined") return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_LEADS;
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

export function addIncomingEnquiry(leadData: Omit<CRMLead, "id" | "createdAt" | "dateKey" | "status" | "assignedCurator" | "internalNotes" | "milestones">): CRMLead {
  const existing = getStoredLeads();
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

  const updated = [newLead, ...existing];
  saveLeads(updated);
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
  return updated;
}

export function updateLeadNotes(leadId: string, notes: string): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => (lead.id === leadId ? { ...lead, internalNotes: notes } : lead));
  saveLeads(updated);
  return updated;
}

export function updateLeadCurator(leadId: string, curator: "Suraj Uniyal" | "Harsh Sood" | "Kabir Malhotra"): CRMLead[] {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => (lead.id === leadId ? { ...lead, assignedCurator: curator } : lead));
  saveLeads(updated);
  return updated;
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

export const INITIAL_LIFE_EVENTS: LifeEventAlert[] = [
  {
    id: "radar-1",
    clientName: "Dr. Rajiv & Radhika Kapoor",
    leadReference: "SV-4912-IND",
    phone: "+91 98110 33412",
    eventType: "Wedding Anniversary",
    eventDate: "2026-11-22",
    daysRemaining: 28,
    recommendedAction: "Send bespoke silver attar gift box & hand-written calligraphy note. Pitch Lake Pichola private royal barge buyout or Taj Umaid Bhawan palace retreat.",
    suggestedDestination: "Udaipur & Jodhpur, Rajasthan",
    assignedCurator: "Harsh Sood",
    status: "Pending Pitch",
    notes: "Celebrated their 20th in Nubra last year; Radhika explicitly mentioned wishing for a candlelit palace anniversary dinner.",
  },
  {
    id: "radar-2",
    clientName: "Vikram Singhania",
    leadReference: "SV-8241-IND",
    phone: "+91 98201 44521",
    eventType: "50th Milestone Birthday",
    eventDate: "2026-12-05",
    daysRemaining: 41,
    recommendedAction: "Dispatch single-estate Kashmiri saffron & ceremonial silk scarf. Propose private chartered Falcon convoy with family to Gulmarg The Khyber.",
    suggestedDestination: "Gulmarg Alpine Sanctuary, Kashmir",
    assignedCurator: "Suraj Uniyal",
    status: "Pending Pitch",
    notes: "Loves cold weather; keen on private heliskiing session with an elite mountain guide.",
  },
  {
    id: "radar-3",
    clientName: "Siddharth & Tanya Mehta",
    leadReference: "SV-6319-IND",
    phone: "+91 98210 55432",
    eventType: "Honeymoon Return",
    eventDate: "2026-11-14",
    daysRemaining: 20,
    recommendedAction: "Deliver framed hand-bound trip memory book. Invite them for exclusive winter leopard safari at SUJÁN JAWAI with founder escort.",
    suggestedDestination: "Jawai Leopard Enclave, Rajasthan",
    assignedCurator: "Suraj Uniyal",
    status: "Gift Dispatched",
    notes: "Gift basket dispatched via BlueDart Apex priority. Tanya messaged expressing warm gratitude.",
  },
  {
    id: "radar-4",
    clientName: "Ananya Birla",
    leadReference: "SV-9104-IND",
    phone: "+91 99302 77810",
    eventType: "Private Estate Anniversary",
    eventDate: "2026-11-04",
    daysRemaining: 10,
    recommendedAction: "Priority alert: 10 days out! Call private family office chief of staff. Offer private royal heritage houseboat in Alleppey backwaters.",
    suggestedDestination: "Kerala Backwaters & Vembanad Lake",
    assignedCurator: "Suraj Uniyal",
    status: "Proposal Underway",
    notes: "Drafted custom 4-day private kettuvallam sailing with ayurvedic master and personal sitar maestro.",
  },
];

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
    activeClients: 5,
    location: "Dehradun / Delhi Office",
    status: "Active",
  },
  {
    id: "tm-2",
    name: "Harsh Sood",
    email: "harsh@soulsventure.com",
    role: "Founder (Unrestricted)",
    phone: "+91 9319843524",
    activeClients: 4,
    location: "Delhi / Jodhpur",
    status: "Active",
  },
  {
    id: "tm-3",
    name: "Kabir Malhotra",
    email: "kabir@soulsventure.com",
    role: "Senior Curator",
    phone: "+91 98111 88201",
    activeClients: 3,
    location: "Jaipur Studio",
    status: "Active",
  },
  {
    id: "tm-4",
    name: "Tashi Namgyal",
    email: "tashi.ops@soulsventure.com",
    role: "On-Ground Concierge",
    phone: "+91 94191 76543",
    activeClients: 2,
    location: "Leh, Ladakh (On-Field)",
    status: "In-Field Escort",
  },
  {
    id: "tm-5",
    name: "Roshni Sen",
    email: "roshni.finance@soulsventure.com",
    role: "Finance & Accounts",
    phone: "+91 98200 11984",
    activeClients: 0,
    location: "Mumbai",
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

export const INITIAL_FLIGHT_WEATHER: FlightWeatherStatus[] = [
  {
    id: "fw-1",
    carrier: "Air India",
    flightNumber: "AI-445",
    route: "DEL ➔ IXL (Delhi to Leh)",
    scheduledDeparture: "06:15 IST",
    status: "Delayed 2h",
    delayReason: "Early morning crosswinds & runway snow-clearing at Leh Airport.",
    clientImpacted: "Singhania Family (4 Pax)",
    leadReference: "SV-8241-IND",
    assignedConcierge: "Tashi Namgyal (Leh Desk)",
    weatherCondition: "Light snowfall, -2°C at Leh Kushok Bakula Rimpochee Airport",
    tempAndWind: "-2°C • Visibility 2800m • Wind 14 knots NW",
    passStatus: "Khardung La Pass (17,582 ft): Closed temporarily until 11:30 IST for military snowplows.",
    alternativeRouting: "Hold private luxury convoy at Chamba Camp Thiksey for organic brunch; execute crossing via lower altitude route at 12:00 IST.",
    protocolStatus: "Escorted Alternate Active",
  },
  {
    id: "fw-2",
    carrier: "Club One Air (Private Jet)",
    flightNumber: "COA-PC12-VIP",
    route: "DEL ➔ UDR (Delhi to Udaipur)",
    scheduledDeparture: "11:30 IST",
    status: "Airborne",
    clientImpacted: "Dr. Rajiv & Radhika Kapoor (2 Pax)",
    leadReference: "SV-4912-IND",
    assignedConcierge: "Harsh Sood (Founder)",
    weatherCondition: "Clear autumn skies, 28°C over Lake Pichola",
    tempAndWind: "28°C • Visibility 9000m • Wind 4 knots SE",
    passStatus: "Aravalli Mountain corridors: 100% clear with smooth luxury cruising.",
    alternativeRouting: "No alternative needed. Private barge greeters stationed at Lake Palace jetty.",
    protocolStatus: "All Clear",
  },
  {
    id: "fw-3",
    carrier: "IndiGo",
    flightNumber: "6E-2081",
    route: "BOM ➔ SXR (Mumbai to Srinagar)",
    scheduledDeparture: "08:45 IST",
    status: "Weather Alert",
    delayReason: "High-altitude cloud base descending on Pir Panjal Range.",
    clientImpacted: "Tanya Oberoi (2 Pax)",
    leadReference: "SV-3829-IND",
    assignedConcierge: "Suraj Uniyal (Founder)",
    weatherCondition: "Freezing rain over Srinagar, heavy alpine snow above 8,500 ft in Gulmarg",
    tempAndWind: "4°C (Srinagar) / -4°C (Apharwat Peak)",
    passStatus: "Gulmarg Mountain Road: Heavy snowfall past Tangmarg. Chains mandatory.",
    alternativeRouting: "Dispatched 4x4 Toyota Prado convoy equipped with Nokian studded snow tires to Tangmarg checkpoint.",
    protocolStatus: "Action Required",
  },
];

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

export const INITIAL_MOODBOARDS: ClientMoodboard[] = [
  {
    id: "mb-1",
    leadReference: "SV-8241-IND",
    clientName: "Vikram Singhania",
    passcode: "LADAKH-SOLITUDE",
    title: "The Astral Silence of Ladakh",
    aestheticTheme: "Monastic Gold, Crisp Himalayan Granite & Starlit Glamping",
    curatorName: "Suraj Uniyal",
    curatorNote: "Vikram, we envisioned your family's journey not simply as travel, but as a spiritual awakening amid India's highest plateaus. Every image here reflects the exact suite, lighting, and private blessings we have secured for your stay.",
    lastViewedByClient: "Yesterday at 21:14 IST",
    items: [
      {
        id: "mbi-1",
        title: "TUTC Chamba Camp Thiksey",
        category: "Architecture & Stays",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        description: "Four-poster featherbeds, private viewing verandas, and personalized butler service beneath the dramatic shadow of Thiksey Gompa.",
        location: "Thiksey, Indus Valley",
      },
      {
        id: "mbi-2",
        title: "Private Twilight Aarti & Astral Stargazing",
        category: "Spiritual Immersion",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        description: "Fireside observation through our high-powered celestial telescope with a private astrophysicist at 11,500 feet.",
        location: "Nubra Valley",
      },
      {
        id: "mbi-3",
        title: "Pangong Tso Lakeside Champagne Setting",
        category: "Private Dining",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        description: "An isolated table set directly on the turquoise shoreline, surrounded by silence and snowcapped reflections.",
        location: "Pangong Tso, 14,270 ft",
      },
    ],
  },
  {
    id: "mb-2",
    leadReference: "SV-4912-IND",
    clientName: "Dr. Rajiv & Radhika Kapoor",
    passcode: "ROYAL-UDAIPUR",
    title: "A Symphony of Floating Marble",
    aestheticTheme: "Mewar Royalty, Rose-Petal Canals & Private Palaces",
    curatorName: "Harsh Sood",
    curatorNote: "Dr. Kapoor, for your anniversary, nothing less than complete royal seclusion will do. We have arranged private palace buyouts and vintage ceremonial cruises on Lake Pichola.",
    lastViewedByClient: "Today at 10:45 IST",
    items: [
      {
        id: "mbi-4",
        title: "Taj Lake Palace Grand Royal Suite",
        category: "Architecture & Stays",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        description: "Centuries-old royal frescoes, hand-carved jharokhas overlooking the tranquil waters, and 24/7 personal palace retainers.",
        location: "Lake Pichola, Udaipur",
      },
      {
        id: "mbi-5",
        title: "Private Royal Barge Dinner on Lake Pichola",
        category: "Private Dining",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        description: "Drifting slowly under torchlight with a private sitar maestro and a 6-course Mewari royal feast prepared by the executive chef.",
        location: "Udaipur",
      },
    ],
  },
];

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

export const INITIAL_SCRAPBOOKS: PostTripScrapbook[] = [
  {
    id: "sb-1",
    leadReference: "SV-6319-IND",
    clientName: "Siddharth & Tanya Mehta",
    itineraryTitle: "Royal Maharajah Fortresses & Thar Desert Romance",
    travelDates: "October 10 – 18, 2026",
    curatorFarewell: "Siddharth & Tanya, hosting you across Rajasthan was an honour for our entire team. From your private candlelit dinners at Mihir Garh to the dawn leopard sighting in Jawai, we hope these captured moments remain etched in your hearts forever.",
    memories: [
      {
        id: "sbm-1",
        caption: "Sunset at Mihir Garh Fortress",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        date: "Oct 12, 2026",
        location: "Mihir Garh, Rohet",
        curatorMemory: "The golden hour light across the dunes was magnificent as your private Marwari horses arrived.",
      },
      {
        id: "sbm-2",
        caption: "A Mother Leopard with Cub on the Jawai Monoliths",
        imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
        date: "Oct 15, 2026",
        location: "SUJÁN JAWAI",
        curatorMemory: "Our lead tracker spotted her at 06:20 AM. An unforgettable privilege.",
      },
    ],
    feedback: {
      overallRating: 5,
      hotelRating: 5,
      conciergeRating: 5,
      testimonialQuote: "SoulsVenture created the most effortless, life-affirming journey of our lives. Suraj and Harsh handled every detail with such warmth and discretion. We will never travel with anyone else.",
      isGoogleReviewSubmitted: true,
      submittedAt: "2026-10-21T14:30:00Z",
    },
  },
];

