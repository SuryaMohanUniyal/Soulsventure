export type Continent = "Rajasthan" | "Himalayas" | "Central India" | "South India" | "Islands";

export type TravelStyle =
  | "Honeymoons & Romance"
  | "Off-the-Grid Expeditions"
  | "Private Safari & Wildlife"
  | "Family & Multi-Gen"
  | "Sanctuary & Wellness"
  | "Culinary & Wine Masterclasses";

export interface ClimateOverview {
  bestTimeToVisit: string;
  idealDuration: string;
  averageTemp: string;
  gatewayAirport: string;
}

export interface InsiderTip {
  title: string;
  description: string;
  category: "Secret Viewpoint" | "Local Custom" | "Culinary Hideaway" | "Timing Advice";
}

export interface LuxuryLodge {
  id: string;
  name: string;
  type: "Private Villa" | "Boutique Safari Lodge" | "Historic Palace" | "Eco-Sanctuary" | "Alpine Chalet";
  location: string;
  image: string;
  pricePerNight: string;
  amenities: string[];
  description: string;
  highlightQuote: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  continent: Continent;
  tag: string;
  heroImage: string;
  gallery: string[];
  climaticOverview: ClimateOverview;
  shortOverview: string;
  narrativeOverview: string[];
  curator: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
  };
  insiderTips: InsiderTip[];
  whereToStay: LuxuryLodge[];
  featuredItinerarySlugs: string[];
  coordinates: { x: number; y: number }; // For interactive vector map
}

export interface DayItinerary {
  dayNumber: number;
  dayTitle: string;
  location: string;
  image: string;
  narrative: string;
  bespokeAccess: string;
  includedDining: string;
  stay: {
    name: string;
    roomType: string;
    image: string;
  };
  optionalAddOns?: string[];
}

export interface Itinerary {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destinationSlug: string;
  destinationName: string;
  continent: Continent;
  travelStyle: TravelStyle;
  durationDays: number;
  durationNights: number;
  priceFromINR: number;
  priceFromUSD?: number;
  heroImage: string;
  gallery: string[];
  pace: "Leisurely" | "Moderate" | "Active Exploration" | "Expedition";
  idealSeason: string;
  routeSummary: string;
  routeStops: {
    name: string;
    days: string;
    highlights: string;
  }[];
  overview: string;
  keyHighlights: string[];
  days: DayItinerary[];
  curatorNotes: {
    specialistName: string;
    specialistRole: string;
    notes: string;
  };
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Curator Dispatch" | "The Art of the Hideaway" | "Expedition Chronicles" | "Culinary Horizons";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  pullQuote: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading?: string;
      text: string;
      image?: string;
      caption?: string;
    }[];
  };
  relatedItinerarySlug?: string;
}

export interface TravelSpecialist {
  id: string;
  name: string;
  role: string;
  regions: string[];
  photo: string;
  yearsExperience: number;
  favoriteHideaway: string;
  quote: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  client: string;
  location: string;
  journey: string;
  year: string;
  quote: string;
  rating: number;
  avatar: string;
}
