import { Destination, Itinerary, JournalArticle, TravelSpecialist, Testimonial } from "@/types";

export interface FAQItem {
  question: string;
  answer: string;
  category: "Bespoke Planning" | "Dietary & Wellness" | "Private Aviation" | "Heritage & Wilderness";
}

export const FAQS: FAQItem[] = [
  {
    question: "What distinguishes Soulsventure from conventional luxury tour operators in India?",
    answer:
      "Unlike regular agencies that sell crowded group tours or fixed packages, Soulsventure plans private, custom holidays across India. Every trip is tailored to your family's personal rhythm. We book authentic royal palace suites, arrange private chauffeur cars, and connect you with verified local guides and expert wildlife naturalists.",
    category: "Bespoke Planning",
  },
  {
    question: "Can Soulsventure arrange private jet and helicopter charters across India?",
    answer:
      "Yes. Over 65% of our luxury itineraries incorporate private aviation to eliminate long highway drives and commercial airport transit. From Pilatus PC-12 and King Air turboprops flying directly from Delhi or Mumbai into private airstrips in Jaisalmer, Jawai, and Kanha, to Airbus H125 helicopters landing directly on palace lawns or remote high-altitude Himalayan helipads in Ladakh and Gulmarg.",
    category: "Private Aviation",
  },
  {
    question: "How are strict vegetarian, vegan, and Jain culinary requirements handled at remote Indian hideaways?",
    answer:
      "We take food preferences very seriously. If you follow a pure vegetarian, Jain, or vegan diet, our team briefs the chefs at every hotel, camp, and houseboat well before you arrive. You will enjoy fresh, delicious local meals prepared strictly to your taste, including Jain meals made without onion or garlic.",
    category: "Dietary & Wellness",
  },
  {
    question: "How do you guarantee private, uncrowded tiger safaris in Central India and Ranthambore?",
    answer:
      "We exclusively reserve full-day and premium zone permits in advance, accompanied by master senior naturalists rather than generic park drivers. We partner with India’s most exclusive low-impact conservation lodges—including SUJÁN Sher Bagh, SUJÁN JAWAI, and Taj Safaris—which provide custom-outfitted, open-top 4WD safari vehicles with professional photography mountings and private bush breakfasts away from commercial tourist tracks.",
    category: "Heritage & Wilderness",
  },
  {
    question: "What is the typical investment for a Soulsventure bespoke journey within India?",
    answer:
      "Our private luxury journeys typically range from ₹4,50,000 to ₹12,00,000+ per person for 7 to 10 days. This includes 5-star palace suites and luxury tented lodges, private chauffeur-driven luxury cars, private boat rides, safari permits, and 24/7 support throughout your holiday.",
    category: "Bespoke Planning",
  },
  {
    question: "How far in advance should we initiate our luxury holiday planning?",
    answer:
      "For peak travel seasons—such as October to March in Rajasthan and Central India tiger reserves, or May to September in Ladakh—we recommend reaching out 3 to 6 months in advance. Iconic suites (such as the Kohinoor Suite at Oberoi Udaivilas or luxury tented pavilions at SUJÁN) are in extreme global demand. However, our 24/7 New Delhi and Mumbai private client desks also accommodate bespoke last-minute itineraries within 2 to 3 weeks.",
    category: "Bespoke Planning",
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-rajasthan",
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    region: "North-Western India",
    continent: "Rajasthan",
    tag: "Royal Palaces, Private Haveli Dinners & Desert Camp Solitude",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    ],
    climaticOverview: {
      bestTimeToVisit: "October to March (Warm Days, Crisp Cool Desert Nights)",
      idealDuration: "8 to 14 Days",
      averageTemp: "25°C / 77°F (Day) | 9°C / 48°F (Night)",
      gatewayAirport: "Udaipur (UDR) / Jaipur (JAI) / Private Airstrips",
    },
    shortOverview:
      "A realm of hypnotic regal splendour where floating marble palaces glow upon Lake Pichola, private havelis open their courtyards for candlelit concerts, and wild leopards roam granite boulders in Jawai.",
    narrativeOverview: [
      "Rajasthan is not merely a state; it is an enduring civilization of poetry, chivalry, and astonishing architectural ambition. At Soulsventure, we bypass the commercial tourist trail to curate intimate access to the living royal heritage of Rajputana.",
      "Glide across Lake Pichola on a private royal barge at dusk as the Aravalli hills turn violet. Dine inside the private residence of an erstwhile royal family in Jaipur, savoring centuries-old secret court recipes prepared by hereditary chefs.",
      "Venture into the wild granite wilderness of Jawai, where leopards live in profound harmony with pastoral Rabari tribesmen, before flying by private aircraft into the deep golden dunes of the Thar desert for midnight stargazing under pristine skies.",
    ],
    curator: {
      name: "Harsh Sood",
      role: "Co-Founder & Head of Curation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "True luxury in Rajasthan is not gold leaf—it is having the private keys to a 300-year-old palace courtyard where only your family hears the evening sitar.",
    },
    insiderTips: [
      {
        title: "Private Sunrise Shikara on Lake Pichola",
        category: "Secret Viewpoint",
        description:
          "Board our private wooden boat at 06:00 AM before the city awakes. The light hitting the marble facades of the City Palace creates reflections impossible to photograph later in the day.",
      },
      {
        title: "Private Royal Court Thali Experience",
        category: "Culinary Hideaway",
        description:
          "Experience a bespoke 14-course royal Rajasthani banquet curated with organic saffron, hand-pounded spices, and pure vegetarian or royal game specialties inside an exclusive private palace pavilion.",
      },
      {
        title: "Jawai Leopard Tracking with Rabari Elders",
        category: "Timing Advice",
        description:
          "Dawn safaris between 05:45 AM and 08:30 AM offer the highest probability of spotting apex leopards basking upon sun-warmed prehistoric granite monoliths.",
      },
    ],
    whereToStay: [
      {
        id: "lodge-lake-palace",
        name: "Taj Lake Palace, Udaipur",
        type: "Historic Palace",
        location: "Lake Pichola, Udaipur",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        pricePerNight: "From ₹85,000 / night",
        amenities: ["Private Royal Boat Transfers", "Jiva Spa Boat", "24/7 Palace Butler", "Pichola Lakefront Suites"],
        description:
          "An 18th-century floating white marble dream built by Maharana Jagat Singh II. Accessible only by private boat, offering unparalleled romance and living Mewar heritage.",
        highlightQuote: "Floating upon the still waters like a pearl, this is the definitive pinnacle of Indian royal hospitality.",
      },
      {
        id: "lodge-sujan-jawai",
        name: "SUJÁN JAWAI",
        type: "Boutique Safari Lodge",
        location: "Jawai Bandh, Pali, Rajasthan",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
        pricePerNight: "From ₹1,15,000 / night",
        amenities: ["Custom 4WD Safari Jeeps", "Relais & Châteaux Gastronomy", "Rabari Trackers", "Private Heated Plunge Pools"],
        description:
          "Ten state-of-the-art luxury tented pavilions situated amidst billion-year-old granite formations where leopards roam freely alongside the red-turbaned Rabari tribe.",
        highlightQuote: "A masterclass in sophisticated wilderness design where conservation meets unadulterated luxury.",
      },
    ],
    featuredItinerarySlugs: ["royal-maharajah-palaces-rajasthan"],
    coordinates: { x: 38, y: 46 },
  },
  {
    id: "dest-ladakh",
    slug: "ladakh",
    name: "Ladakh & The Himalayas",
    country: "India",
    region: "Trans-Himalayan Plateau",
    continent: "Himalayas",
    tag: "High-Altitude Solitude, Ancient Monasteries & Luxury Glamping",
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    ],
    climaticOverview: {
      bestTimeToVisit: "May to September (Crisp Alpine Sunlight, Open Mountain Passes)",
      idealDuration: "7 to 10 Days",
      averageTemp: "19°C / 66°F (Day) | 5°C / 41°F (Night)",
      gatewayAirport: "Kushok Bakula Rimpochee Airport, Leh (IXL)",
    },
    shortOverview:
      "A transcendent realm 11,000 feet above the sea, where wind-carved granite canyons meet Tibetan Buddhist monasteries, crystalline cobalt lakes, and ultra-luxury nomadic camps under Bortle 1 night skies.",
    narrativeOverview: [
      "Ladakh represents the roof of the Indian subcontinent. Here, where the Greater Himalayas meet the Karakoram, the sheer scale of the landscape dissolves ordinary human worries into profound stillness.",
      "Stay in individually pitched heated luxury nomadic suites beneath 15th-century cliffside gompas. Begin your morning with a private sunrise audience and butter-tea ceremony conducted by a senior Rinpoche at Thiksey Monastery.",
      "Cross the Khardung La pass in private bespoke 4WD convoys to reach the dramatic dunes of Nubra Valley, where Bactrian camels traverse glacial riverbeds and international astronomers guide your telescope through the Milky Way.",
    ],
    curator: {
      name: "Devika Rao",
      role: "Lead Himalayan & Trans-Plateau Curator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "In Ladakh, silence is not empty—it is a physical, vibrating force that realigns your sense of time and existence.",
    },
    insiderTips: [
      {
        title: "Acclimatization at Luxury Altitude Villas",
        category: "Timing Advice",
        description:
          "We mandate 48 hours of deceleration at your luxury Leh retreat with oxygen-enriched suites, Ayurvedic herbal teas, and private doctor checkups before ascending higher passes.",
      },
      {
        title: "Private After-Hours Monastery Access",
        category: "Local Custom",
        description:
          "Step into the ancient prayer hall of Hemis Monastery after public visiting hours, illuminated solely by hundreds of butter lamps with silent chanting.",
      },
      {
        title: "Pangong Tso Astral Stargazing",
        category: "Secret Viewpoint",
        description:
          "Observe the celestial core of the Milky Way from our private luxury glamping setup perched on the northern banks of Pangong Lake away from all light pollution.",
      },
    ],
    whereToStay: [
      {
        id: "lodge-tutc-thiksey",
        name: "The Ultimate Travelling Camp (TUTC), Chamba Camp",
        type: "Boutique Safari Lodge",
        location: "Thiksey, Leh, Ladakh",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        pricePerNight: "From ₹95,000 / night",
        amenities: ["Climate-Controlled Luxury Tents", "Private Valet & Butler", "Fine Dining Pavilion", "Direct View of Thiksey Gompa"],
        description:
          "Nomadic luxury at 11,500 feet. Hand-stitched imperial canvas suites featuring colonial teak furniture, private timber decks, and en-suite bathrooms with hot rainfall showers.",
        highlightQuote: "A sanctuary of imperial luxury set against the dramatic amphitheater of the Ladakh range.",
      },
    ],
    featuredItinerarySlugs: ["himalayan-solitude-ladakh-glamping"],
    coordinates: { x: 34, y: 18 },
  },
  {
    id: "dest-central-safaris",
    slug: "central-india-safaris",
    name: "Central India & Ranthambore",
    country: "India",
    region: "Madhya Pradesh & Eastern Rajasthan",
    continent: "Central India",
    tag: "Exclusive Bengal Tiger Safaris & Secluded Wilderness Lodges",
    heroImage: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    ],
    climaticOverview: {
      bestTimeToVisit: "October to May (Optimal Wildlife Visibility & Dry Sal Forests)",
      idealDuration: "6 to 10 Days",
      averageTemp: "28°C / 82°F (Day) | 12°C / 54°F (Night)",
      gatewayAirport: "Jabalpur (JLR) / Jaipur (JAI) / Khajuraho (HJR)",
    },
    shortOverview:
      "The primeval heart of Kipling's Jungle Book. Home to the world's densest populations of wild Bengal tigers, sloth bears, and leopards, explored via private custom-built 4WDs and luxury tented estates.",
    narrativeOverview: [
      "Central India's deciduous sal forests and bamboo thickets preserve one of the planet's most exhilarating wildlife spectacles. Through Soulsventure's privileged conservation alliances, we secure exclusive access to premier reserve core zones.",
      "Track majestic Bengal tigers through the crumbling stone ruins of Ranthambore Fort, where ancient banyan trees drape over abandoned Rajput pavilions and peacocks call from mist-shrouded lakes.",
      "In Bandhavgarh and Kanha, stay in bespoke earth-and-timber kutiyas crafted by indigenous craftsmen. Dine beside roaring campfires under ancient mahua trees, listening to the alarm calls of spotted deer echoing through the starlit canopy.",
    ],
    curator: {
      name: "Aarav Singhania",
      role: "Head of Wildlife & Conservation Safaris",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "When a four-hundred-pound wild tiger locks eyes with you from thirty paces across the sal grass, every trivial thought in your mind dissolves.",
    },
    insiderTips: [
      {
        title: "Full-Day Private Core Zone Permits",
        category: "Timing Advice",
        description:
          "We book VIP full-day tracking permits allowing our private safari jeeps to remain inside the national park from dawn till dusk without standard gate time restrictions.",
      },
      {
        title: "Dedicated Master Naturalist Accompaniment",
        category: "Local Custom",
        description:
          "Every safari is led by a veteran naturalist with over 15 years of field experience in tiger behavior, animal tracking, and wildlife photography composition.",
      },
      {
        title: "Champagne Bush Breakfasts in Buffer Forests",
        category: "Culinary Hideaway",
        description:
          "After an exhilarating dawn tracking drive, enjoy a full gourmet breakfast table prepared under a canopy of flowering flame-of-the-forest trees.",
      },
    ],
    whereToStay: [
      {
        id: "lodge-sujan-sher-bagh",
        name: "SUJÁN Sher Bagh, Ranthambore",
        type: "Boutique Safari Lodge",
        location: "Ranthambore National Park, Rajasthan",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
        pricePerNight: "From ₹1,10,000 / night",
        amenities: ["1920s Colonial Safari Aesthetic", "Organic Camp Farm", "Private Plunge Pools", "Evening Campfire Gatherings"],
        description:
          "A legendary Relais & Châteaux luxury tented camp paying homage to the safari golden era. Twelve hand-stitched white canvas pavilions set amidst lush indigenous woodland.",
        highlightQuote: "The undisputed royal benchmark for Indian safari luxury, where conservation and comfort live in total harmony.",
      },
    ],
    featuredItinerarySlugs: ["royal-bengal-tiger-safari-central-india"],
    coordinates: { x: 44, y: 52 },
  },
  {
    id: "dest-kerala",
    slug: "kerala-backwaters",
    name: "Kerala & The Malabar Backwaters",
    country: "India",
    region: "Malabar Coast, South India",
    continent: "South India",
    tag: "Private Houseboat Charters, Spice Estates & Ancient Ayurveda",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    ],
    climaticOverview: {
      bestTimeToVisit: "September to March (Gentle Sea Breezes & Tranquil Waters)",
      idealDuration: "6 to 9 Days",
      averageTemp: "29°C / 84°F (Day) | 22°C / 72°F (Night)",
      gatewayAirport: "Cochin International Airport (COK)",
    },
    shortOverview:
      "An emerald tapestry of palm-shaded lagoons, quiet canal villages, 300-year-old spice plantations, and private chartered Kettuvallam houseboats gliding across shimmering waters.",
    narrativeOverview: [
      "Known historically as the Spice Coast, Kerala is an intoxicating realm where lush Western Ghats cloud forests cascade down into serene backwaters and the Arabian Sea.",
      "Board Soulsventure’s private two-cabin royal Kettuvallam, crafted from anjili wood and tied with coir ropes. As your private captain navigates quiet channels where Kingfishers dive, your onboard private chef prepares freshly caught Karimeen and fragrant Malabar coconut delicacies.",
      "Retire to secluded colonial planters' bungalows hidden within cardamom and rubber estates, experiencing authentic Panchakarma and Ayurvedic therapies administered by lineage doctors.",
    ],
    curator: {
      name: "Meera Nambiar",
      role: "Lead South India & Malabar Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      quote: "To drift silently down the backwaters at sunset with no motor sound, only the gentle dip of the bamboo oar, is to remember how to breathe again.",
    },
    insiderTips: [
      {
        title: "Exclusive Night Mooring in Silent Lagoons",
        category: "Secret Viewpoint",
        description:
          "Unlike commercial houseboats anchored in crowded clusters, our private charters moor in private, secluded lagoons surrounded only by water lilies and silent paddy fields.",
      },
      {
        title: "Private Spice Estate Walking Masterclass",
        category: "Culinary Hideaway",
        description:
          "Walk the slopes of Wayanad with an expert botanist, tasting fresh green peppercorns, wild nutmeg, and cinnamon straight from century-old trees.",
      },
      {
        title: "Lineage Ayurvedic Rejuvenation",
        category: "Local Custom",
        description:
          "Experience personalized Abhyanga oil therapies tailored to your dosha profile, formulated using rare medicated herbal infusions.",
      },
    ],
    whereToStay: [
      {
        id: "lodge-kumarakom-resort",
        name: "Kumarakom Lake Resort",
        type: "Historic Palace",
        location: "Vembanad Lake, Kumarakom, Kerala",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
        pricePerNight: "From ₹48,000 / night",
        amenities: ["Heritage Pool Villas", "Meandering Lagoon Pool", "Ayurmana Heritage Spa", "Private Sunset Cruises"],
        description:
          "Reconstructed 16th-century traditional Kerala homesteads (Illams) set along the serene banks of Vembanad Lake, combining antique woodwork with modern five-star indulgence.",
        highlightQuote: "A timeless masterpiece of Kerala architectural preservation on the tranquil edge of Vembanad.",
      },
    ],
    featuredItinerarySlugs: ["malabar-serenade-kerala-houseboat"],
    coordinates: { x: 40, y: 84 },
  },
  {
    id: "dest-kashmir",
    slug: "kashmir-gulmarg",
    name: "Kashmir & Gulmarg",
    country: "India",
    region: "Valley of Kashmir, Himalayas",
    continent: "Himalayas",
    tag: "Mughal Waterways, Cedar Houseboats & Pristine Gulmarg Meadows",
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    ],
    climaticOverview: {
      bestTimeToVisit: "April to October (Lush Meadows & Saffron) | Dec to Feb (Gulmarg Powder Snow)",
      idealDuration: "6 to 9 Days",
      averageTemp: "21°C / 70°F (Summer) | -3°C / 26°F (Winter)",
      gatewayAirport: "Sheikh ul-Alam International Airport, Srinagar (SXR)",
    },
    shortOverview:
      "The fabled paradise of the Mughal emperors. From hand-carved deodar cedar houseboats on peaceful Nigeen Lake to alpine pine forests and powder snow heli-skiing in Gulmarg.",
    narrativeOverview: [
      "Emperor Jahangir once declared of Kashmir: 'If there is a paradise on earth, it is here, it is here, it is here.' Today, Kashmir remains one of the world's most poetic mountain sanctuaries.",
      "Stay aboard Sukoon, our partner luxury cedarwood houseboat moored on serene Nigeen Lake away from commercial hustle. Sip steaming saffron Kahwa on the sun deck as mist lifts off the lotus waters and shikaras glide past.",
      "Ascend by private helicopter or chauffeured luxury 4WD to the alpine heights of Gulmarg, staying at The Khyber Himalayan Resort amidst towering Himalayan firs with direct access to the Apharwat gondola.",
    ],
    curator: {
      name: "Devika Rao",
      role: "Lead Himalayan & Trans-Plateau Curator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "Kashmir is pure romance—morning shikaras through weeping willows, the aroma of crushed pine needles, and warmth from a crackling bukhari fireplace.",
    },
    insiderTips: [
      {
        title: "Dawn Floating Vegetable & Flower Market",
        category: "Secret Viewpoint",
        description:
          "Board a private cushioned Shikara at 05:30 AM to witness the 150-year-old floating bazaar in the inner channels of Dal Lake, where local farmers trade fresh blooms and produce boat-to-boat.",
      },
      {
        title: "Pampore Saffron Harvest Tasting",
        category: "Culinary Hideaway",
        description:
          "Visit the violet saffron fields of Pampore during the October harvest to see the delicate hand-plucking of stigma and enjoy traditional Wazwan infused with pure Kashmiri saffron.",
      },
      {
        title: "Private Meadow Picnics in Pahalgam",
        category: "Timing Advice",
        description:
          "Ride thoroughbred ponies into the secluded Baisaran valley for a private luxury picnic beside crystal glacial streams surrounded by dense deodar forests.",
      },
    ],
    whereToStay: [
      {
        id: "lodge-khyber-gulmarg",
        name: "The Khyber Himalayan Resort & Spa",
        type: "Alpine Chalet",
        location: "Gulmarg, Kashmir",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
        pricePerNight: "From ₹55,000 / night",
        amenities: ["Heated Indoor Infinity Pool", "L'Occitane Spa", "Ski-In Ski-Out Access", "Panoramic Pir Panjal Views"],
        description:
          "An 85-room luxury alpine chalet perched 8,825 feet above sea level in the Pir Panjal range, offering world-class warmth, gourmet cuisine, and snowy peak views.",
        highlightQuote: "A world-class ski and alpine sanctuary that rivals the finest chalets of St. Moritz and Courchevel.",
      },
    ],
    featuredItinerarySlugs: ["crown-of-kashmir-gulmarg-shikara"],
    coordinates: { x: 30, y: 14 },
  },
  {
    id: "dest-andaman",
    slug: "andaman-islands",
    name: "Andaman & Nicobar Islands",
    country: "India",
    region: "Bay of Bengal Archipelago",
    continent: "Islands",
    tag: "Private Coral Reefs, Turquoise Lagoons & Secluded Island Villas",
    heroImage: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    ],
    climaticOverview: {
      bestTimeToVisit: "November to April (Calm Sea Surface, High Underwater Visibility)",
      idealDuration: "5 to 8 Days",
      averageTemp: "28°C / 82°F (Year-Round Tropical Sun)",
      gatewayAirport: "Veer Savarkar International Airport, Port Blair (IXZ)",
    },
    shortOverview:
      "A remote tropical archipelago ringed by living coral reefs, ancient mangrove forests, and powdery white beaches repeatedly ranked among the finest on Earth.",
    narrativeOverview: [
      "Lying hundreds of kilometers off the eastern coast of mainland India in the sapphire waters of the Bay of Bengal, the Andaman Islands offer an untouched, low-density island escape.",
      "Stay at Taj Exotica on Havelock's legendary Radhanagar Beach, where 46 acres of coastal forest house stilted timber villas modeled on the indigenous Jarawa shelters.",
      "Charter private catamarans to dive pristine coral walls teeming with sea turtles and manta rays, or kayak through pitch-black mangrove channels at night as bioluminescent plankton sparkles with every paddle stroke.",
    ],
    curator: {
      name: "Aarav Singhania",
      role: "Head of Island & Wilderness Curations",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "Standing on the blinding white sands of Beach No. 7 at sunset with virgin jungle at your back, you realize India holds islands as pristine as the Maldives.",
    },
    insiderTips: [
      {
        title: "Private Speedboat Transfer to Havelock",
        category: "Timing Advice",
        description:
          "Bypass the crowded commercial passenger ferries. We arrange private luxury twin-engine speedboat charters directly from Port Blair to your Havelock resort jetty.",
      },
      {
        title: "Bioluminescent Night Kayaking",
        category: "Secret Viewpoint",
        description:
          "Paddle into the protected mangrove channels of Havelock during the new moon to witness magical glowing blue phytoplankton light up the water.",
      },
      {
        title: "Private Marine Biologist Diving Expedition",
        category: "Local Custom",
        description:
          "Dive remote, unmapped coral gardens with certified PADI instructors and marine researchers away from day-tourist snorkelling spots.",
      },
    ],
    whereToStay: [
      {
        id: "lodge-taj-exotica-andaman",
        name: "Taj Exotica Resort & Spa, Andamans",
        type: "Private Villa",
        location: "Radhanagar Beach, Havelock Island",
        image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
        pricePerNight: "From ₹62,000 / night",
        amenities: ["Olympic-Length Pool", "Private Beach Access", "Jiva Ayurvedic Spa", "Deep Sea Game Fishing"],
        description:
          "Sprawled across 46 acres of ancient coastal forest, 72 luxurious stilted sustainable villas built from plantation timber footsteps away from the turquoise ocean.",
        highlightQuote: "Unquestionably the most opulent and sustainable barefoot luxury sanctuary in the Bay of Bengal.",
      },
    ],
    featuredItinerarySlugs: ["andaman-castaway-luxury-catamarans"],
    coordinates: { x: 80, y: 76 },
  },
];

export const ITINERARIES: Itinerary[] = [
  {
    id: "itin-rajasthan-royal",
    slug: "royal-maharajah-palaces-rajasthan",
    title: "The Royal Maharajah Circuit: Palaces of Mewar & Desert Stargazing",
    tagline: "Private palace suites, vintage car drives through the Aravallis, leopard tracking at Jawai, and champagne sunsets on Lake Pichola.",
    destinationSlug: "rajasthan",
    destinationName: "Rajasthan",
    continent: "Rajasthan",
    travelStyle: "Honeymoons & Romance",
    durationDays: 10,
    durationNights: 9,
    priceFromINR: 550000,
    priceFromUSD: 550000,
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    ],
    pace: "Leisurely",
    idealSeason: "October to March",
    routeSummary: "Udaipur → Jawai Wilderness → Jodhpur → Jaipur",
    routeStops: [
      { name: "Udaipur", days: "Days 1–3", highlights: "Taj Lake Palace, Private Pichola Royal Barge, Old City Havelis" },
      { name: "Jawai", days: "Days 4–5", highlights: "SUJÁN JAWAI, Apex Leopard Tracking, Rabari Culture" },
      { name: "Jodhpur", days: "Days 6–7", highlights: "Umaid Bhawan Palace, Mehrangarh Private Tour, Blue City Rooftops" },
      { name: "Jaipur", days: "Days 8–10", highlights: "The Oberoi Rajvilas, Amber Fort Secret Tunnels, Royal Family Dinner" },
    ],
    overview:
      "A ten-day masterclass in royal Rajput hospitality. From the floating white marble sanctuary of Taj Lake Palace on Lake Pichola to tracking wild leopards across the ancient granite hills of Jawai and dining with an erstwhile royal family inside their private Jaipur palace.",
    keyHighlights: [
      "Stay in private royal suites at Taj Lake Palace and Umaid Bhawan Palace",
      "Private custom 4WD leopard safaris at SUJÁN JAWAI with senior Rabari trackers",
      "After-hours private torchlight tour of Mehrangarh Fort with the head curator",
      "Exclusive royal Rajasthani banquet in a private courtyard with live Sufi musicians",
    ],
    days: [
          {
                "dayNumber": 1,
                "dayTitle": "Arrival in Udaipur & Sunset Royal Barge Cruise",
                "location": "Udaipur, Lake Pichola",
                "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Arrive at Maharana Pratap Airport where your private Soulsventure representative whisks you into a luxury chauffeur-driven Mercedes convoy. Transfer to the private jetty and board an ornamental royal barge to reach Taj Lake Palace floating on Lake Pichola. Savor champagne and rose-petal welcomes before an evening sunset cruise around Jagmandir Island.",
                "bespokeAccess": "Private Lake Pichola royal barge reserved exclusively for your party with personal palace historian.",
                "includedDining": "Welcome royal Mewari dinner on the palace rooftop overlooking illuminated City Palace.",
                "stay": {
                      "name": "Taj Lake Palace, Udaipur",
                      "roomType": "Grand Royal Suite with Lake View",
                      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 2,
                "dayTitle": "Private City Palace Tour & Vintage Car Collection",
                "location": "Udaipur",
                "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Explore the private quarters of the Udaipur City Palace before public gates open. Inspect royal crystal galleries, historic armory halls, and painted miniature courtyards. In the afternoon, enjoy a private drive in a vintage 1934 Rolls-Royce from the Maharana's royal garage around Fateh Sagar Lake.",
                "bespokeAccess": "Early access to private crystal gallery and private vintage car drive accompanied by palace chauffeur.",
                "includedDining": "Al fresco lunch at Ambrai followed by private fine dining inside the palace courtyard.",
                "stay": {
                      "name": "Taj Lake Palace, Udaipur",
                      "roomType": "Grand Royal Suite with Lake View",
                      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 3,
                "dayTitle": "Scenic Drive Through the Aravallis to SUJÁN JAWAI",
                "location": "Jawai Bandh, Pali",
                "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Depart Udaipur on a scenic private drive across the rugged Aravalli mountains, stopping at the magnificent 15th-century marble temple complex of Ranakpur. Arrive at SUJÁN JAWAI, where luxury tented pavilions blend seamlessly into billion-year-old granite formations. Embark on your first late-afternoon leopard tracking drive.",
                "bespokeAccess": "Private naturalist and custom-fitted open 4WD vehicle for the duration of your stay in Jawai.",
                "includedDining": "Bush breakfast at Ranakpur; camp dinner under a million stars prepared with organic local produce.",
                "stay": {
                      "name": "SUJÁN JAWAI",
                      "roomType": "Luxury Tented Pavilion with Private Deck",
                      "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 4,
                "dayTitle": "Apex Leopard Tracking with Rabari Elders in Jawai",
                "location": "Jawai Wilderness",
                "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Set out before dawn into the granite hills where wild leopards live in harmony with indigenous Rabari herdsmen. Track mother leopards and cubs returning from night hunts. In the afternoon, visit a Rabari pastoral hamlet with your camp naturalist to learn ancient conservation traditions.",
                "bespokeAccess": "Private tea atop a billion-year-old granite kopje with panoramic views of Jawai Dam.",
                "includedDining": "Gourmet al fresco bush breakfast followed by a traditional copper-pot Rajasthani dinner by lantern light.",
                "stay": {
                      "name": "SUJÁN JAWAI",
                      "roomType": "Luxury Tented Pavilion with Private Deck",
                      "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 5,
                "dayTitle": "Granite Kopje Sunrise & Wilderness Solitude",
                "location": "Jawai Bandh",
                "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Wake to wild birdcalls across Jawai lake. Enjoy an early morning bird-watching safari spotting migratory flamingos and sarus cranes. Spend the afternoon in relaxed reverie at the camp spa or swimming in the heated infinity pool overlooking the savanna.",
                "bespokeAccess": "Private wilderness sundowner with vintage champagne on a secluded rocky outcrop.",
                "includedDining": "Seven-course culinary showcase crafted over wood fires by executive camp chefs.",
                "stay": {
                      "name": "SUJÁN JAWAI",
                      "roomType": "Luxury Tented Pavilion with Private Deck",
                      "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 6,
                "dayTitle": "Scenic Drive to the Blue City: Jodhpur & Umaid Bhawan Palace",
                "location": "Jodhpur",
                "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Depart Jawai on a scenic highway drive into Jodhpur, the legendary Sun City of Marwar. Arrive at Umaid Bhawan Palace, one of the world's largest private residences, where you are greeted by royal fanfare and palace butlers. Unpack in the art-deco royal palace suite.",
                "bespokeAccess": "Personalized welcome by the Palace GM and private access to the royal family museum quarters.",
                "includedDining": "Afternoon high tea on the royal palace lawn; fine dining at Risala under vaulted sandstone arches.",
                "stay": {
                      "name": "Umaid Bhawan Palace, Jodhpur",
                      "roomType": "Historical Royal Palace Suite",
                      "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 7,
                "dayTitle": "Mehrangarh Fort Private Curator Tour & Stepwell Walk",
                "location": "Jodhpur",
                "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Climb the imposing ramparts of Mehrangarh Fort with the head curator as your private guide. Gain entrance to closed palace apartments and private royal jewelry reserves. Later, stroll through the vibrant indigo alleys of the old city and historic Toorji Ka Jhalra stepwell.",
                "bespokeAccess": "After-hours private champagne reception on Mehrangarh's cannons terrace overlooking the blue roofs.",
                "includedDining": "Terrace dinner at Pillars with unobstructed night panoramas of the illuminated fort.",
                "stay": {
                      "name": "Umaid Bhawan Palace, Jodhpur",
                      "roomType": "Historical Royal Palace Suite",
                      "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 8,
                "dayTitle": "Chauffeured Transfer to Jaipur: The Oberoi Rajvilas",
                "location": "Jaipur",
                "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Travel in air-conditioned comfort to the Pink City of Jaipur. Check into The Oberoi Rajvilas, set within 32 acres of landscaped gardens, reflection pools, and 280-year-old Shiva temple courtyards. Spend a tranquil evening relaxing by your private garden courtyard.",
                "bespokeAccess": "VIP check-in inside the private villa with dedicated butler and garland ceremony.",
                "includedDining": "Traditional Rajasthani thali featuring ker sangri, gatte ki sabzi, and saffron kheer at Surya Mahal.",
                "stay": {
                      "name": "The Oberoi Rajvilas, Jaipur",
                      "roomType": "Luxury Villa with Private Garden Pool",
                      "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 9,
                "dayTitle": "Amber Fort Secret Tunnels & Private Royal Family Dinner",
                "location": "Jaipur",
                "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Visit the legendary Amber Fort at dawn, unlocking subterranean defense tunnels that lead to Jaigarh Fort. In the afternoon, visit private gemstone ateliers in Johari Bazaar with a master jewelry historian. In the evening, enjoy a confidential dining experience in a private wing of City Palace.",
                "bespokeAccess": "Exclusive access to Sukh Niwas hall of mirrors and private dinner hosted with titular royal family representatives.",
                "includedDining": "Royal Mewar-Jaipur heritage fusion banquet served on silver serviceware.",
                "stay": {
                      "name": "The Oberoi Rajvilas, Jaipur",
                      "roomType": "Luxury Villa with Private Garden Pool",
                      "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 10,
                "dayTitle": "Hawa Mahal Dawn Walk & VIP Departure from Jaipur",
                "location": "Jaipur",
                "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Begin the morning with private photography access opposite Hawa Mahal before street crowds arrive. Savor a final garden breakfast at Rajvilas. Your private chauffeur transfers you to Jaipur International Airport with full tarmac VIP assistance.",
                "bespokeAccess": "Private VIP terminal tarmac escort and luggage handling directly to aircraft departure gates.",
                "includedDining": "Leisurely champagne garden breakfast at Rajvilas.",
                "stay": {
                      "name": "The Oberoi Rajvilas, Jaipur",
                      "roomType": "Luxury Villa with Private Garden Pool",
                      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                }
          }
    ],
    curatorNotes: {
      specialistName: "Harsh Sood",
      specialistRole: "Co-Founder & Head of Curation",
      notes: "This journey balances the sublime romance of Udaipur's lake sanctuaries with the wild pulse of Jawai's leopard country. We recommend travelling between November and February when desert evenings are wonderfully crisp.",
    },
  },
  {
    id: "itin-ladakh-himalayas",
    slug: "himalayan-solitude-ladakh-glamping",
    title: "Himalayan Solitude: Monasteries, High Passes & Luxury Glamping in Ladakh",
    tagline: "Private monastery blessings with senior Rinpoches, heated luxury dome tents beneath Thiksey, and astral photography across Pangong Tso.",
    destinationSlug: "ladakh",
    destinationName: "Ladakh & The Himalayas",
    continent: "Himalayas",
    travelStyle: "Off-the-Grid Expeditions",
    durationDays: 8,
    durationNights: 7,
    priceFromINR: 495000,
    priceFromUSD: 495000,
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    ],
    pace: "Moderate",
    idealSeason: "May to September",
    routeSummary: "Leh (Acclimatization) → Thiksey → Nubra Valley → Pangong Tso",
    routeStops: [
      { name: "Leh", days: "Days 1–2", highlights: "Gentle acclimatization, Shanti Stupa, Private Heritage House" },
      { name: "Thiksey", days: "Days 3–4", highlights: "TUTC Chamba Camp, Dawn Monastery Prayers, Shey Palace" },
      { name: "Nubra Valley", days: "Days 5–6", highlights: "Khardung La Pass, Diskit Monastery, Sand Dunes by Camel" },
      { name: "Pangong Tso", days: "Days 7–8", highlights: "Chang La Pass, Cobalt Lake Stargazing, Return to Leh" },
    ],
    overview:
      "An ethereal expedition across the high Tibetan plateau. Designed with dedicated medical acclimatization protocols, luxury heated imperial tents, and private access to the most sacred Buddhist monastic sanctuaries in the world.",
    keyHighlights: [
      "Heated colonial luxury tented pavilions at TUTC Chamba Camp facing Thiksey Gompa",
      "Private early-morning meditation session with the head Lama of Thiksey",
      "Private 4WD expedition across Khardung La (17,982 ft) into the Nubra Valley",
      "Astral photography masterclass under pristine Bortle 1 dark skies at Pangong Lake",
    ],
    days: [
          {
                "dayNumber": 1,
                "dayTitle": "Arrival in Leh & Oxygenated Acclimatization",
                "location": "Leh, Ladakh (11,500 ft)",
                "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Arrive at Kushok Bakula Rimpochee Airport where your Soulsventure mountain liaison greets you with silk Khata scarves. Check into your oxygen-enriched luxury suite in Leh. Spend the day resting and hydrating under the supervision of a dedicated expedition physician.",
                "bespokeAccess": "Private airport clearance and 24/7 dedicated medical support team on site.",
                "includedDining": "Light, nourishing Tibetan herbal broth and organic garden luncheon at the resort.",
                "stay": {
                      "name": "The Grand Dragon Ladakh / Dolkhar Resort",
                      "roomType": "Heritage Mountain Suite",
                      "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 2,
                "dayTitle": "Old Town Heritage Walk & Sunset at Shanti Stupa",
                "location": "Leh Old Town",
                "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Take a gentle, unhurried guided stroll through Old Leh's 400-year-old mud-brick alleyways and Central Asian bazaar. Visit a restored 17th-century Ladakhi heritage house for butter tea with local historians. In the evening, ascend to Shanti Stupa for uninterrupted sunset views across the Indus Valley.",
                "bespokeAccess": "Private rooftop tea session in an aristocratic Ladakhi heritage house closed to the general public.",
                "includedDining": "Traditional Ladakhi tasting menu featuring skyu, thukpa, and apricot crumble at Tsas by Dolkhar.",
                "stay": {
                      "name": "The Grand Dragon Ladakh / Dolkhar Resort",
                      "roomType": "Heritage Mountain Suite",
                      "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 3,
                "dayTitle": "Transfer to Thiksey & TUTC Chamba Camp Luxury Glamping",
                "location": "Thiksey, Ladakh (11,800 ft)",
                "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Drive downstream along the Indus River to Thiksey. Check into The Ultimate Travelling Camp (TUTC) Chamba Camp, where climate-controlled presidential tents stand directly beneath the twelve-tiered Thiksey Monastery. Meet your private camp valet and enjoy views of snowcapped Karakoram ranges.",
                "bespokeAccess": "Dedicated personal camp valet and bespoke tented sanctuary beneath the monastery silhouette.",
                "includedDining": "Three-course farm-to-table lunch in the camp dining tent; fine wines and grilled mountain delicacies by evening firelight.",
                "stay": {
                      "name": "The Ultimate Travelling Camp (TUTC) Chamba Camp",
                      "roomType": "Presidential Luxury Suite Tent",
                      "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 4,
                "dayTitle": "Dawn Monastery Prayers with Senior Rinpoche & Shey Palace",
                "location": "Thiksey & Shey",
                "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Ascend the monastery steps before dawn to witness morning puja. Sit in quiet reverie as young novices sound brass conch shells and deep bass gongs. Receive a private protective silk blessing from a venerable Senior Rinpoche. Later, explore Shey Palace and its gigantic copper-gilt Buddha.",
                "bespokeAccess": "Private morning audience and silk prayer cord ceremony with the Head Lama inside the inner sanctuary.",
                "includedDining": "Freshly baked monastery breads and butter tea; gourmet outdoor terrace lunch in Shey.",
                "stay": {
                      "name": "The Ultimate Travelling Camp (TUTC) Chamba Camp",
                      "roomType": "Presidential Luxury Suite Tent",
                      "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 5,
                "dayTitle": "Crossing Khardung La Pass (17,982 ft) into Nubra Valley",
                "location": "Khardung La to Nubra Valley",
                "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Embark in customized 4WD Toyota Land Cruisers across the dramatic zigzagging switchbacks of Khardung La, one of the world's highest motorable passes. Descend into the otherworldly Nubra Valley, where green river oases carve through soaring silver sand dunes at 10,000 ft.",
                "bespokeAccess": "Expedition-level satellite phone coverage, dedicated medical oxygen kit, and hot spiced mountain tea at the summit.",
                "includedDining": "Summit hot tea and artisanal snacks; organic dinner at Kyagar luxury lodge in Sumur.",
                "stay": {
                      "name": "The Kyagar Luxury Lodge / Lchang Nang Retreat",
                      "roomType": "Private Orchard Suite",
                      "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 6,
                "dayTitle": "Diskit Monastery & Bactrian Camel Dunes of Hunder",
                "location": "Hunder & Diskit, Nubra",
                "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Visit Diskit Monastery, perched on a sheer rocky cliff topped by a 106-ft Maitreya Buddha statue. Later in the afternoon, ride rare double-humped Bactrian camels through the rolling white sand dunes of Hunder against a backdrop of snowcapped peaks.",
                "bespokeAccess": "Private sunset camel safari escorted by elder Silk Route caravan custodians.",
                "includedDining": "Riverside picnic lunch under apricot orchards; candlelit dinner beneath the Nubra Milky Way.",
                "stay": {
                      "name": "The Kyagar Luxury Lodge / Lchang Nang Retreat",
                      "roomType": "Private Orchard Suite",
                      "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 7,
                "dayTitle": "Chang La Pass to the Cobalt Solitude of Pangong Tso",
                "location": "Pangong Tso (14,270 ft)",
                "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Traverse scenic high-altitude desert routes across Chang La Pass to reach Pangong Tso, the 134-km long alpine lake spanning India and Tibet. Watch the waters change hues from emerald turquoise to deep sapphire cobalt. At night, experience Bortle Class 1 dark sky astral stargazing.",
                "bespokeAccess": "High-magnification astronomical telescope and private astral guide on lakefront shores.",
                "includedDining": "Heated private dining dome overlooking Pangong Tso with multi-course Tibetan and continental cuisine.",
                "stay": {
                      "name": "Pangong Luxury Glamping Resort",
                      "roomType": "Heated Geodesic Lakeview Dome",
                      "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 8,
                "dayTitle": "Sunrise Over Pangong Lake & Private Departure from Leh",
                "location": "Pangong to Leh Airport",
                "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Witness the unforgettable sunrise as golden light hits the mirror-like surface of Pangong Lake. Enjoy a warm mountain breakfast before your scenic private transfer back to Leh Airport for your outward flight, carrying memories of high-Himalayan stillness.",
                "bespokeAccess": "VIP terminal escort and assistance with high-altitude departure protocols.",
                "includedDining": "Artisanal lakefront sunrise breakfast with warm pancakes, organic honey, and Himalayan herbal teas.",
                "stay": {
                      "name": "Departure (Day 8 Outward Flight)",
                      "roomType": "VIP Airport Transit",
                      "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80"
                }
          }
    ],
    curatorNotes: {
      specialistName: "Devika Rao",
      specialistRole: "Lead Himalayan & Trans-Plateau Curator",
      notes: "Ladakh requires respectful pacing. We choreograph every day around altitude acclimatization so you feel energetic and clear-headed while experiencing the most sublime landscapes on the subcontinent.",
    },
  },
  {
    id: "itin-central-tiger",
    slug: "royal-bengal-tiger-safari-central-india",
    title: "The Royal Bengal Tiger Trail: Private Safaris in Ranthambore & Bandhavgarh",
    tagline: "Exclusive custom-built safari 4WDs, master naturalists, 1920s-style private tented camps, and tiger tracking in pristine deciduous forest.",
    destinationSlug: "central-india-safaris",
    destinationName: "Central India & Ranthambore",
    continent: "Central India",
    travelStyle: "Private Safari & Wildlife",
    durationDays: 8,
    durationNights: 7,
    priceFromINR: 620000,
    priceFromUSD: 620000,
    heroImage: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    ],
    pace: "Active Exploration",
    idealSeason: "October to May",
    routeSummary: "New Delhi → Ranthambore → Bandhavgarh → Panna & Khajuraho",
    routeStops: [
      { name: "New Delhi", days: "Days 1–2", highlights: "The Lodhi, Private Aviation briefing & Old Delhi Heritage" },
      { name: "Ranthambore", days: "Days 3–4", highlights: "SUJÁN Sher Bagh, Zones 1–5 Core Safaris, Ranthambore Fort" },
      { name: "Bandhavgarh", days: "Days 5–6", highlights: "Taj Mahua Kothi, Tala Zone Tiger Tracking, Jungle Banquets" },
      { name: "Panna & Khajuraho", days: "Days 7–8", highlights: "Pashan Garh Stone Cottages, Ken River Boat Safari, UNESCO Temples" },
    ],
    overview:
      "A thrilling eight-day safari expedition across India's two most celebrated tiger reserves. Accompanied by legendary wildlife biographers, you will track Bengal tigers through ancient ruins and towering bamboo forests from the comfort of private 4WDs.",
    keyHighlights: [
      "Full-day VIP core zone tracking permits in Bandhavgarh and Ranthambore",
      "1920s luxury colonial tented hospitality at Relais & Châteaux SUJÁN Sher Bagh",
      "Private aircraft charter connecting Delhi, Sawai Madhopur, and Jabalpur",
      "Evening campfire conservation discussions with senior park forest wardens",
    ],
    days: [
          {
                "dayNumber": 1,
                "dayTitle": "Private Fly-in to Ranthambore & Campfire Welcomes",
                "location": "Ranthambore National Park",
                "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Arrive at New Delhi or Jaipur private terminal where your private aircraft or luxury 4WD whisks you directly to SUJÁN Sher Bagh in Ranthambore. Check into 1920s British colonial-style luxury canvas pavilions. Gather around the evening campfire for a briefing with your senior naturalist.",
                "bespokeAccess": "Personal camp valet, custom-built open safari 4WD, and priority core zone conservation permits.",
                "includedDining": "Bush welcomes and campfire game dinner cooked in copper cauldrons with organic camp garden produce.",
                "stay": {
                      "name": "SUJÁN Sher Bagh",
                      "roomType": "Royal Safari Tent with Private Jacuzzi",
                      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 2,
                "dayTitle": "Zones 1–5 Core Morning & Afternoon Tiger Tracking",
                "location": "Ranthambore Core Sanctuary",
                "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Enter the park's prized core lakes zones at first light. Watch mist lift off Padam Talao and Rajbagh ruins as spotted deer sound predator alarms. Track Bengal tigresses and cubs resting beneath banyan groves. Return to camp for a midday massage before your afternoon deep-forest drive.",
                "bespokeAccess": "Full-day core zone safari permits granting unrestricted photography across prime tiger territories.",
                "includedDining": "Gourmet hot bush breakfast inside the jungle; afternoon high tea and dinner under acacia trees.",
                "stay": {
                      "name": "SUJÁN Sher Bagh",
                      "roomType": "Royal Safari Tent with Private Jacuzzi",
                      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 3,
                "dayTitle": "Private Access to Ranthambore Fort & Camp Solitude",
                "location": "Ranthambore Fort & Buffer Reserves",
                "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Ascend the 1,000-year-old cliffside ramparts of UNESCO-listed Ranthambore Fort with a private historian. Look down onto wild vultures nesting on sheer stone precipices and leopards patrolling temple courtyards below. Spend the afternoon in quiet reverie by the camp pool.",
                "bespokeAccess": "Private after-hours entry to Trinetra Ganesha temple atop the fort without tourist crowds.",
                "includedDining": "Picnic lunch at the historic Jogi Mahal pavilion; six-course Anglo-Indian campfire dinner.",
                "stay": {
                      "name": "SUJÁN Sher Bagh",
                      "roomType": "Royal Safari Tent with Private Jacuzzi",
                      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 4,
                "dayTitle": "Private Charter Flight to Bandhavgarh: Taj Mahua Kothi",
                "location": "Bandhavgarh National Park",
                "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Board a private turboprop charter hop from Sawai Madhopur directly into the jungle airstrip near Bandhavgarh. Check into Taj Mahua Kothi, an exclusive sanctuary of 12 handcrafted Kutiyas (mud cottages) shaded by sacred Mahua trees. Prepare for Central India's highest tiger density.",
                "bespokeAccess": "VIP airstrip tarmac clearance and direct chauffeured transfer to the lodge.",
                "includedDining": "Private veranda luncheon; lantern-lit dinner beside the central fireplace with forest tribal melodies.",
                "stay": {
                      "name": "Taj Mahua Kothi, Bandhavgarh",
                      "roomType": "Handcrafted Luxury Forest Kutiya",
                      "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 5,
                "dayTitle": "Tala Zone Deep Forest Tracking with Master Naturalist",
                "location": "Bandhavgarh Tala Zone",
                "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Explore the legendary Tala Zone, celebrated for its soaring Sal forests and high density of royal Bengal tigers. Your dedicated master tracker reads fresh pugmarks and listening to langur monkey calls. Witness tigers cooling themselves in forest watering holes.",
                "bespokeAccess": "Dedicated Taj naturalist and private 4WD with swiveling photography mounts.",
                "includedDining": "Bush breakfast in the back of the customized safari vehicle; farm-to-table dinner at the lodge.",
                "stay": {
                      "name": "Taj Mahua Kothi, Bandhavgarh",
                      "roomType": "Handcrafted Luxury Forest Kutiya",
                      "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 6,
                "dayTitle": "Bandhavgarh Hill Fortress Trail & Starlit Bush Dinner",
                "location": "Bandhavgarh National Park",
                "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Track through the bamboo thickets of Magadhi and Khitauli zones. Later, inspect the ancient 2,000-year-old rock-carved Shesh Shaiya statue of Lord Vishnu reclining on seven-headed serpents amidst spring pools deep in the forest.",
                "bespokeAccess": "Private ranger-guided access to the inner forest heritage caves closed to ordinary tourist routes.",
                "includedDining": "Specialty Central Indian thali banquet featuring bafla, slow-cooked lentils, and wild berry desserts.",
                "stay": {
                      "name": "Taj Mahua Kothi, Bandhavgarh",
                      "roomType": "Handcrafted Luxury Forest Kutiya",
                      "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 7,
                "dayTitle": "Transfer to Panna National Park & Ken River Sunset Boat Safari",
                "location": "Panna & Ken River",
                "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Scenic private drive to Panna National Park, home to India's greatest tiger revival success story. Check into Taj Pashan Garh, set upon 200 acres of private jungle. In the late afternoon, take a private wooden boat safari on the crystal-clear Ken River watching marsh crocodiles and kingfishers.",
                "bespokeAccess": "Private boat safari with master ornithologist on the tranquil Ken River.",
                "includedDining": "Sundowner drinks on the river deck followed by rooftop stone-hearth dining at Pashan Garh.",
                "stay": {
                      "name": "Taj Pashan Garh, Panna",
                      "roomType": "Luxury Stone Cottage with Private Gazebo",
                      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 8,
                "dayTitle": "UNESCO Khajuraho Temple Curated Walk & VIP Departure",
                "location": "Khajuraho & Airport Transfer",
                "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Conclude your expedition with an early morning private curator tour of the 10th-century Western Group of Temples at Khajuraho, renowned for their intricate sandstone architectural carvings. Transfer to Khajuraho Airport for your outbound journey.",
                "bespokeAccess": "VIP gate access and private historical discourse led by a senior archaeological authority.",
                "includedDining": "Farewell champagne breakfast at Pashan Garh before airport transfer.",
                "stay": {
                      "name": "Departure (Day 8 Outward Flight)",
                      "roomType": "VIP Airport Transit",
                      "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80"
                }
          }
    ],
    curatorNotes: {
      specialistName: "Aarav Singhania",
      specialistRole: "Head of Wildlife & Conservation Safaris",
      notes: "Central India offers unmatched tiger densities. We secure full-day access permits that allow you to track the big cats without having to exit the gates at midday.",
    },
  },
  {
    id: "itin-kerala-houseboat",
    slug: "malabar-serenade-kerala-houseboat",
    title: "The Malabar Serenade: Private Houseboat Charters & Spice Sanctuaries",
    tagline: "A private two-cabin royal Kettuvallam navigating silent backwater canals, personalized Ayurvedic doctors, and colonial spice estate bungalows.",
    destinationSlug: "kerala-backwaters",
    destinationName: "Kerala & The Malabar Backwaters",
    continent: "South India",
    travelStyle: "Sanctuary & Wellness",
    durationDays: 7,
    durationNights: 6,
    priceFromINR: 420000,
    priceFromUSD: 420000,
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    ],
    pace: "Leisurely",
    idealSeason: "September to March",
    routeSummary: "Kochi → Kumarakom → Alleppey Backwaters → Marari Beach",
    routeStops: [
      { name: "Kochi", days: "Days 1–2", highlights: "Brunton Boatyard, Chinese Fishing Nets, Kathakali Masterclass" },
      { name: "Kumarakom", days: "Days 3–4", highlights: "Kumarakom Lake Resort, Bird Sanctuary, Ayurvedic Healing" },
      { name: "Alleppey", days: "Day 5", highlights: "Private Royal Kettuvallam, Silent Canal Navigation, Chef Dinners" },
      { name: "Marari", days: "Days 6–7", highlights: "Marari Beach Hideaway, Coconut Groves, Ocean Sunset" },
    ],
    overview:
      "A decelerated voyage through southern India's most tranquil waterways. Cruise aboard an exclusive private houseboat with your own chef and captain, before retreating to heritage lake villas with world-class Ayurvedic wellness.",
    keyHighlights: [
      "Exclusive private 2-cabin royal Kettuvallam with air-conditioned master suite",
      "Personalized Ayurvedic health consultation with resident Vaidya (herbal physician)",
      "Private walking spice tour across centuries-old organic cardamom and vanilla estates",
      "Private harbor cruise in Fort Kochi with historic architectural curator",
    ],
    days: [
          {
                "dayNumber": 1,
                "dayTitle": "Arrival in Fort Kochi & Colonial Heritage Walk",
                "location": "Kochi, Kerala",
                "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Arrive at Cochin International Airport and transfer to Brunton Boatyard in historic Fort Kochi. Stroll past 500-year-old Portuguese residences, Dutch churches, and cantilevered Chinese fishing nets. Enjoy an evening private Kathakali performance demonstrating classical facial mudras.",
                "bespokeAccess": "Private back-stage access to the Kathakali green room to watch the intricate natural-pigment makeup transformation.",
                "includedDining": "Welcome coastal seafood dinner featuring Malabar fish curry and appams overlooking the harbor.",
                "stay": {
                      "name": "Brunton Boatyard / Malabar House",
                      "roomType": "Harbour View Heritage Suite",
                      "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 2,
                "dayTitle": "Private Spice Trail & Jew Town Exploration",
                "location": "Mattancherry & Fort Kochi",
                "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Walk the scented ginger and cardamom lanes of Mattancherry with a private heritage historian. Visit the 1568 Paradesi Synagogue and the Dutch Palace with its vibrant Ramayana murals. Savor fresh coconut water and local spice estate tastings.",
                "bespokeAccess": "Private curator access to historic spice warehouses closed to the general public.",
                "includedDining": "Traditional banana-leaf Kerala vegetarian Sadya lunch served at a heritage colonial bungalow.",
                "stay": {
                      "name": "Brunton Boatyard / Malabar House",
                      "roomType": "Harbour View Heritage Suite",
                      "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 3,
                "dayTitle": "Transfer to Kumarakom Lake Resort & Ayurvedic Consultation",
                "location": "Kumarakom, Vembanad Lake",
                "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Scenic private drive to Kumarakom on the eastern shores of Vembanad Lake. Check into Kumarakom Lake Resort, where traditional 16th-century heritage villas feature open-roof private pool courtyards. Meet the resident Ayurvedic Vaidya for a personalized wellness pulse diagnosis.",
                "bespokeAccess": "Comprehensive private Ayurvedic wellness consultation and personalized 90-minute Abhyanga treatment.",
                "includedDining": "Fresh lake Karimeen (pearl spot fish) and coconut-milk curries served at Ettukettu heritage restaurant.",
                "stay": {
                      "name": "Kumarakom Lake Resort",
                      "roomType": "Heritage Pool Villa with Private Plunge Pool",
                      "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 4,
                "dayTitle": "Vembanad Bird Sanctuary Dawn Kayaking & Spa Solitude",
                "location": "Kumarakom",
                "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Glide across the silent morning mist of Kumarakom Bird Sanctuary in a private wooden country boat. Spot Siberian storks, darter birds, and kingfishers. Spend the afternoon in peaceful relaxation by the meandering 250-meter lagoon pool.",
                "bespokeAccess": "Private dawn canoe excursion accompanied by an expert wetland naturalist.",
                "includedDining": "Al fresco lakeside luncheon followed by evening sunset tea with Kerala sweet delicacies.",
                "stay": {
                      "name": "Kumarakom Lake Resort",
                      "roomType": "Heritage Pool Villa with Private Plunge Pool",
                      "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 5,
                "dayTitle": "Boarding the Private Royal Kettuvallam: Alleppey Backwaters",
                "location": "Alleppey Backwaters",
                "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Board your private handcrafted two-cabin luxury Kettuvallam houseboat, constructed entirely of jackwood and coir ropes with zero nails. Cruise silently through narrow canal networks lined with swaying palms and emerald paddy fields. Anchor at dusk in a secluded private lagoon.",
                "bespokeAccess": "Private yacht-standard houseboat with dedicated captain, chef, and butler exclusively for your party.",
                "includedDining": "Live chef masterclass preparing tiger prawns, red rice, and organic tapioca on board the vessel.",
                "stay": {
                      "name": "Soulsventure Private Royal Kettuvallam",
                      "roomType": "Presidential Houseboat Master Cabin",
                      "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 6,
                "dayTitle": "Disembarkation & Transfer to Marari Beach Private Ocean Villa",
                "location": "Mararikulam, Arabian Sea",
                "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Wake to the gentle lapping of backwater ripples and fresh filter coffee. Disembark after breakfast and take a short private transfer to the pristine shores of Marari Beach. Check into an eco-luxe thatched cottage surrounded by coconut groves.",
                "bespokeAccess": "Private beach pavilion and evening barefoot bonfire dinner on the sand.",
                "includedDining": "Catch-of-the-day grilled seafood and coconut desserts served under starlit skies on the beach.",
                "stay": {
                      "name": "Marari Beach Resort / Carnoustie Ayurveda Retreat",
                      "roomType": "Luxury Beach Villa with Private Plunge Pool",
                      "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 7,
                "dayTitle": "Coastal Fishermen Dawn Stroll & Chauffeured Cochin Departure",
                "location": "Marari to Cochin Airport",
                "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Watch traditional fishing catamarans launch through morning surf at sunrise. Enjoy a relaxed breakfast under palm fronds. Your private chauffeur transfers you seamlessly to Cochin International Airport for your homeward flight.",
                "bespokeAccess": "Chauffeured Mercedes airport transfer with direct VIP baggage check assistance.",
                "includedDining": "Tropical fruit and freshly brewed South Indian estate coffee breakfast.",
                "stay": {
                      "name": "Departure (Day 7 Outward Flight)",
                      "roomType": "VIP Airport Transit",
                      "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
                }
          }
    ],
    curatorNotes: {
      specialistName: "Meera Nambiar",
      specialistRole: "Lead South India & Malabar Specialist",
      notes: "Kerala is best experienced slowly. Our private houseboats use electric auxiliary motors where possible to ensure your backwater cruise is enveloped in total, natural silence.",
    },
  },
  {
    id: "itin-kashmir-crown",
    slug: "crown-of-kashmir-gulmarg-shikara",
    title: "The Crown of Kashmir: Private Shikaras, Saffron Valleys & Gulmarg Peaks",
    tagline: "Hand-carved cedar houseboats on peaceful Nigeen Lake, dawn floating flower markets, private saffron farm tastings, and alpine meadows in Gulmarg.",
    destinationSlug: "kashmir-gulmarg",
    destinationName: "Kashmir & Gulmarg",
    continent: "Himalayas",
    travelStyle: "Honeymoons & Romance",
    durationDays: 7,
    durationNights: 6,
    priceFromINR: 450000,
    priceFromUSD: 450000,
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    ],
    pace: "Leisurely",
    idealSeason: "April to October & Dec to Feb",
    routeSummary: "Srinagar & Dal Lake → Gulmarg Peaks → Pahalgam Valleys → Nigeen Sanctuary",
    routeStops: [
      { name: "Srinagar & Dal Lake", days: "Days 1–2", highlights: "Sukoon Luxury Houseboat, Dawn Floating Flower Market, Old City" },
      { name: "Gulmarg Peaks", days: "Days 3–4", highlights: "The Khyber Himalayan Resort, Apharwat Gondola, Pine Ridge Riding" },
      { name: "Pahalgam & Lidder Valley", days: "Days 5–6", highlights: "Luxury Riverside Pine Chalet, Betaab Valley, Saffron Harvest Tea" },
      { name: "Nigeen Lake Solitude", days: "Day 7", highlights: "Private Sunset Shikara, Farewell Wazwan Banquet, Airport Tarmac Transfer" },
    ],
    overview:
      "A seven-day romantic retreat through Kashmir's iconic landscapes. From waking to mist on Nigeen Lake inside an antique carved cedar houseboat to gazing at snowy Himalayan peaks from the heated glass pavilions of Gulmarg.",
    keyHighlights: [
      "Exclusive stay on Sukoon luxury eco-houseboat on Nigeen Lake with private chef",
      "Private dawn Shikara tour to the floating vegetable and flower market",
      "5-star mountain chalet accommodation at The Khyber Himalayan Resort in Gulmarg",
      "Private saffron plucking and Kashmiri Wazwan banquet in an exclusive orchard",
    ],
    days: [
          {
                "dayNumber": 1,
                "dayTitle": "Arrival in Srinagar & Nigeen Lake Houseboat Welcome",
                "location": "Srinagar, Kashmir",
                "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Touch down at Sheikh ul-Alam International Airport in Srinagar. Your Soulsventure concierge escorts you directly to peaceful Nigeen Lake. Board a private hand-carved shikara to reach Sukoon, a luxury cedarwood houseboat moored in silent lotus waters.",
                "bespokeAccess": "Private shikara transfers and exclusive mooring in peaceful Nigeen Lake away from commercial boat traffic.",
                "includedDining": "Traditional Kashmiri Kehwa welcoming tea with crushed green almonds, saffron, and honey; sunset deck dinner.",
                "stay": {
                      "name": "Sukoon Luxury Cedar Houseboat",
                      "roomType": "Presidential Suite Houseboat Cabin",
                      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 2,
                "dayTitle": "Dawn Floating Flower Market & Mughal Gardens Private Tour",
                "location": "Dal Lake & Srinagar",
                "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Glide through silent lake canals at 5:30 AM to witness the vibrant floating vegetable and flower market where vendors barter from wooden canoes. Later, explore Nishat Bagh and Shalimar Bagh terraced water gardens built by Emperor Jahangir for Empress Nur Jahan.",
                "bespokeAccess": "Private morning shikara with hot tea service and private curator walkthrough of historic Mughal garden watercourses.",
                "includedDining": "Breakfast on the rooftop deck; authentic Kashmiri walnut and lotus-stem gourmet luncheon.",
                "stay": {
                      "name": "Sukoon Luxury Cedar Houseboat",
                      "roomType": "Presidential Suite Houseboat Cabin",
                      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 3,
                "dayTitle": "Ascent to Gulmarg: The Khyber Himalayan Resort Check-in",
                "location": "Gulmarg (8,690 ft)",
                "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Take a scenic drive ascending through pine and fir forests into Gulmarg, the Meadow of Flowers. Check into The Khyber Himalayan Resort & Spa, renowned for its timber-clad alpine architecture and heated indoor infinity pool gazing directly onto Mount Apharwat.",
                "bespokeAccess": "Private check-in with dedicated resort mountain guide and heated boot concierge service.",
                "includedDining": "Multi-course mountain dinner at Cloves featuring slow-braised Rogan Josh and saffron basmati rice.",
                "stay": {
                      "name": "The Khyber Himalayan Resort & Spa, Gulmarg",
                      "roomType": "Premier Mountain View Luxury Suite",
                      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 4,
                "dayTitle": "Apharwat Peak Gondola (13,780 ft) & Pine Forest Trek",
                "location": "Mount Apharwat, Gulmarg",
                "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Board the Gulmarg Gondola with VIP priority boarding straight to Phase 2 at 13,780 ft. Look across breathtaking snow peaks extending to Nanga Parbat in Pakistan. In the afternoon, enjoy a private pine forest horse ride or signature L'Occitane spa therapy.",
                "bespokeAccess": "Skip-the-line VIP Phase 2 Gondola passes and private mountain guide accompaniment.",
                "includedDining": "Hot alpine summit tea and chocolate fondue; cozy fireside dinner at Calabash lounge.",
                "stay": {
                      "name": "The Khyber Himalayan Resort & Spa, Gulmarg",
                      "roomType": "Premier Mountain View Luxury Suite",
                      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 5,
                "dayTitle": "Scenic Drive to Pahalgam & Lidder River Luxury Chalet",
                "location": "Pahalgam, Lidder Valley",
                "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Descend from Gulmarg and drive across the fertile saffron plateaus of Pampore into the tranquil valley of Pahalgam. Check into your private riverfront chalet by the rushing waters of the Lidder River. Spend the afternoon fly-fishing for brown trout or walking through pine glades.",
                "bespokeAccess": "Private Lidder River angling permit with custom fly-fishing equipment and local river guide.",
                "includedDining": "Riverside barbecue dinner featuring freshly grilled river trout and warm tandoori breads.",
                "stay": {
                      "name": "The Chinar Resort & Spa / Pahalgam Pines Chalet",
                      "roomType": "Riverfront Executive Pine Chalet",
                      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 6,
                "dayTitle": "Aru & Betaab Valleys Exploration & Saffron Harvest Tea",
                "location": "Aru Valley & Betaab Valley",
                "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Travel up into the pristine meadows of Aru Valley, framed by dramatic snow-capped amphitheaters. Enjoy an artisanal meadow picnic prepared by your private chef. On your return, visit a multi-generational family saffron farm for an exclusive grade-one saffron harvest tasting.",
                "bespokeAccess": "Private meadow picnic setup with Persian carpets, brass samovars, and personal service staff.",
                "includedDining": "Gourmet meadow picnic lunch; evening dinner with live Kashmiri Santoor music.",
                "stay": {
                      "name": "The Chinar Resort & Spa / Pahalgam Pines Chalet",
                      "roomType": "Riverfront Executive Pine Chalet",
                      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 7,
                "dayTitle": "Farewell Royal Wazwan Feast & VIP Srinagar Airport Transfer",
                "location": "Srinagar & Departure",
                "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Return to Srinagar for a celebratory 12-course ceremonial Royal Wazwan luncheon prepared by master Wazas. Your private chauffeur transfers you directly to Sheikh ul-Alam Airport with full VIP lounge and tarmac escort.",
                "bespokeAccess": "Private royal Wazwan dining ceremony inside a private lakeside garden pavilion.",
                "includedDining": "Grand ceremonial Royal Wazwan including Gushtaba, Rista, Tabak Maaz, and Phirni.",
                "stay": {
                      "name": "Departure (Day 7 Outward Flight)",
                      "roomType": "VIP Airport Transit",
                      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                }
          }
    ],
    curatorNotes: {
      specialistName: "Devika Rao",
      specialistRole: "Lead Himalayan & Trans-Plateau Curator",
      notes: "Kashmir in spring and summer is filled with roses and chinar foliage, while winter transforms Gulmarg into Asia's premier luxury ski haven. We curate both seasons with equal poetic depth.",
    },
  },
  {
    id: "itin-andaman-castaway",
    slug: "andaman-castaway-luxury-catamarans",
    title: "The Andaman Castaway: Private Catamarans, Coral Reefs & Island Villas",
    tagline: "Private twin-engine catamaran charters, untouched coral atolls, night bioluminescence kayaking, and secluded barefoot luxury at Taj Exotica Havelock.",
    destinationSlug: "andaman-islands",
    destinationName: "Andaman & Nicobar Islands",
    continent: "Islands",
    travelStyle: "Off-the-Grid Expeditions",
    durationDays: 7,
    durationNights: 6,
    priceFromINR: 500000,
    priceFromUSD: 500000,
    heroImage: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    ],
    pace: "Leisurely",
    idealSeason: "November to April",
    routeSummary: "Port Blair → Havelock Island (Radhanagar Beach) → Neil Island → Port Blair",
    routeStops: [
      { name: "Port Blair", days: "Day 1", highlights: "Private Speedboat Transfer, VIP Harbour Lounge" },
      { name: "Havelock Island", days: "Days 2–4", highlights: "Taj Exotica, Private Catamaran Diving, Bioluminescent Kayaking" },
      { name: "Neil Island", days: "Days 5–6", highlights: "Uninhabited Coral Atoll Snorkelling, Sunset Beach Banquets" },
      { name: "Port Blair", days: "Day 7", highlights: "Historic Cellular Jail Private Visit & Departure" },
    ],
    overview:
      "A secluded tropical island odyssey through India's most pristine marine archipelago. Travel by private chartered speedboat and luxury catamaran, exploring vibrant coral gardens and retreating to stilted sustainable villas tucked into ancient coastal rainforest.",
    keyHighlights: [
      "Private twin-engine speedboat transfer bypassing commercial ferry queues",
      "Stay in stilted luxury forest villas at Taj Exotica on legendary Radhanagar Beach",
      "Private night kayaking through mangrove channels illuminated by glowing bioluminescence",
      "Chartered catamaran day-sail to untouched offshore reefs with dedicated PADI marine biologist",
    ],
    days: [
          {
                "dayNumber": 1,
                "dayTitle": "VIP Arrival at Port Blair & Private Speedboat to Havelock",
                "location": "Havelock Island (Swaraj Dweep)",
                "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Land at Veer Savarkar International Airport in Port Blair. Your Soulsventure yacht liaison greets you at the private marina. Board a private twin-engine speedboat charter skimming across azure Andaman waters directly to Havelock Island. Check into Taj Exotica Resort & Spa on Radhanagar Beach.",
                "bespokeAccess": "Private twin-engine speedboat charter eliminating commercial ferry queues and schedules.",
                "includedDining": "Welcome coconut water and tropical seafood dinner at The Settlers private pavilion.",
                "stay": {
                      "name": "Taj Exotica Resort & Spa, Havelock",
                      "roomType": "Luxury Villa with Private Plunge Pool",
                      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 2,
                "dayTitle": "Radhanagar Beach Barefoot Luxury & Taj Exotica Sanctuary",
                "location": "Radhanagar Beach (Beach No. 7)",
                "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Spend a sublime morning walking on the powdery two-kilometer white sands of Radhanagar Beach, rated among the world's finest beaches. Indulge in an afternoon Jiva Spa Ayurvedic therapy amidst coconut groves. Watch the sun sink below the horizon in dazzling crimson tones.",
                "bespokeAccess": "Reserved private beach cabana with dedicated butler and chilled champagne service.",
                "includedDining": "Al fresco seafood luncheon at Shoreline; private beachside grill dinner under torchlight.",
                "stay": {
                      "name": "Taj Exotica Resort & Spa, Havelock",
                      "roomType": "Luxury Villa with Private Plunge Pool",
                      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 3,
                "dayTitle": "Private Catamaran Charter to Untouched Coral Reefs",
                "location": "South Button & Outlying Atolls",
                "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Board a private 40-ft catamaran charter with an expert PADI dive master and marine biologist. Sail to the protected marine sanctuary of South Button Island. Dive or snorkel alongside manta rays, sea turtles, and pristine coral gardens in 30-meter visibility waters.",
                "bespokeAccess": "Exclusive catamaran charter with full private dive equipment, underwater photographer, and chef on board.",
                "includedDining": "Gourmet lobster and tropical fruit lunch prepared on the yacht deck anchored in a turquoise lagoon.",
                "stay": {
                      "name": "Taj Exotica Resort & Spa, Havelock",
                      "roomType": "Luxury Villa with Private Plunge Pool",
                      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 4,
                "dayTitle": "Elephant Beach Marine Biologist Snorkel & Bioluminescent Kayak",
                "location": "Elephant Beach & Mangroves",
                "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Trek through lush lowland rainforest to Elephant Beach for a private guided reef exploration. Return to your villa for afternoon rest. After nightfall, launch into silent mangrove lagoons for an astonishing night kayaking adventure where every paddle stroke illuminates glowing bioluminescent plankton.",
                "bespokeAccess": "Private night bioluminescence kayaking expedition guided by an Andaman marine ecologist.",
                "includedDining": "Beachfront jungle picnic lunch; private five-course candlelit dinner by the infinity pool.",
                "stay": {
                      "name": "Taj Exotica Resort & Spa, Havelock",
                      "roomType": "Luxury Villa with Private Plunge Pool",
                      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 5,
                "dayTitle": "Private Speedboat to Neil Island: Natural Rock Bridge & Coconut Groves",
                "location": "Neil Island (Shaheed Dweep)",
                "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Take a private speedboat hop to peaceful Neil Island. Explore the famous natural rock formation bridge exposed at low tide, observing vibrant tidal pools filled with starfish and sea anemones. Enjoy unhurried barefoot walks along Laxmanpur and Bharatpur beaches.",
                "bespokeAccess": "Private naturalist accompaniment unlocking secret coral shelves and secluded coves.",
                "includedDining": "Freshly roasted mud-oven Andaman crabs and coconut rice served at a private beach hideaway.",
                "stay": {
                      "name": "Sea Shell Samssara / Coral Reef Resort Neil",
                      "roomType": "Luxury Lagoon Villa",
                      "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 6,
                "dayTitle": "Sunset Beach Banquet & Private Speedboat Return to Port Blair",
                "location": "Neil Island to Port Blair",
                "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Spend a relaxing morning on Neil's quiet shores before your private speedboat transfers you back to Port Blair. Check into Welcomhotel Bay Island, perched on a scenic rocky promontory overlooking the Andaman Sea. Toast your final evening with champagne.",
                "bespokeAccess": "Private harbor sunset yacht cruise around Ross Island followed by exclusive cliffside dining.",
                "includedDining": "Celebratory farewell seafood grill banquet on the oceanfront terrace.",
                "stay": {
                      "name": "Welcomhotel by ITC Hotels, Bay Island",
                      "roomType": "Sea-Facing Deluxe Suite",
                      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 7,
                "dayTitle": "Historical Cellular Jail Private Access & Departure",
                "location": "Port Blair & Departure",
                "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Enjoy an early morning private curator tour of the historic Cellular Jail (Kala Pani) before gates open to tourists, learning profound stories of India's freedom movement. Transfer to Port Blair Airport for your flight back to the mainland.",
                "bespokeAccess": "Early private entrance to the central tower and gallows with senior historical curator.",
                "includedDining": "Oceanfront buffet breakfast with fresh tropical fruits and estate coffees.",
                "stay": {
                      "name": "Departure (Day 7 Outward Flight)",
                      "roomType": "VIP Airport Transit",
                      "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                }
          }
    ],
    curatorNotes: {
      specialistName: "Aarav Singhania",
      specialistRole: "Head of Island & Wilderness Curations",
      notes: "The Andaman archipelago has underwater visibility exceeding 30 meters between December and March. We arrange private dive boats so you explore coral walls in total privacy.",
    },
  },
  {
    id: "itin-rajasthan-family-fort",
    slug: "rajasthan-royal-family-heritage-fort",
    title: "The Royal Family Heritage Circuit: Fort Buyouts, Wildlife & Desert Astronomy",
    tagline: "Exclusive private fort buyouts in the Thar desert, junior naturalist camel safaris, multi-generational pure vegetarian and Jain banquets, and vintage rail transfers.",
    destinationSlug: "rajasthan",
    destinationName: "Rajasthan",
    continent: "Rajasthan",
    travelStyle: "Family & Multi-Gen",
    durationDays: 9,
    durationNights: 8,
    priceFromINR: 580000,
    priceFromUSD: 580000,
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    ],
    pace: "Moderate",
    idealSeason: "October to March",
    routeSummary: "Jaipur (Pink City) → Mihir Garh (Rohet) → Jodhpur (Blue City) → Udaipur",
    routeStops: [
      { name: "Jaipur", days: "Days 1–3", highlights: "The Oberoi Rajvilas, Private Puppet Shows, Elephant Sanctuary" },
      { name: "Mihir Garh", days: "Days 4–5", highlights: "Exclusive Fort Buyout, Marwari Horse Riding, Village Safari" },
      { name: "Jodhpur", days: "Days 6–7", highlights: "Umaid Bhawan Palace, Flying Fox Fort Zipline, Blue City Walk" },
      { name: "Udaipur", days: "Days 8–9", highlights: "The Leela Palace, Lake Pichola Private Boat, Farewell Gala" },
    ],
    overview:
      "Choreographed specifically for multi-generational families. Featuring private heritage fort buyouts, dedicated children's cultural workshops, gentle pacing with no early crack-of-dawn rush, and impeccable pure vegetarian and Jain culinary care overseen by royal household chefs.",
    keyHighlights: [
      "Complete private compound buyout at Mihir Garh fortress in the Thar desert",
      "Royal horse riding on indigenous Marwari thoroughbreds with private riding masters",
      "Private astronomy masterclass on the fort ramparts with high-powered telescopes",
      "Personalized dietary chef traveling with the family ensuring pure Jain/veg standards",
    ],
    days: [
          {
                "dayNumber": 1,
                "dayTitle": "Royal Welcome to the Pink City with Private Concierge",
                "location": "Jaipur, Rajasthan",
                "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Touch down at Jaipur International Airport where your private Soulsventure expedition team greets all family generations with traditional marigold garlands and shehnai players. Transfer in a private convoy of Mercedes SUVs to The Oberoi Rajvilas.",
                "bespokeAccess": "VIP terminal clearance and dedicated multi-gen family butler service throughout.",
                "includedDining": "Welcome royal family banquet featuring pure vegetarian Mewari and Marwari delicacies.",
                "stay": {
                      "name": "The Oberoi Rajvilas, Jaipur",
                      "roomType": "Luxury Villa with Private Pool & Interconnecting Family Room",
                      "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 2,
                "dayTitle": "Private Amber Palace Courtyard Tour & Dera Amer Elephant Sanctuary",
                "location": "Amber & Dera Amer",
                "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Tour the majestic Amber Fort at opening bell with a specialized junior-naturalist guide engaging young travelers with tales of hidden fort treasures. In the afternoon, visit Dera Amer wilderness camp to bathe, feed, and walk alongside rescued Asian elephants in tranquil forest foothills.",
                "bespokeAccess": "Exclusive private family interaction and gentle washing of rescued elephants at Dera Amer sanctuary.",
                "includedDining": "Private al fresco luncheon in the Dera Amer grasslands; royal thali dinner at Rajvilas.",
                "stay": {
                      "name": "The Oberoi Rajvilas, Jaipur",
                      "roomType": "Luxury Villa with Private Pool & Interconnecting Family Room",
                      "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 3,
                "dayTitle": "Jaipur Gemstone & Block Print Masterclass with Royal Artisans",
                "location": "Jaipur Old City",
                "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Immerse in interactive artisan workshops. Family members carve wooden blocks and stamp their own organic indigo scarves with 5th-generation master printers. Later, visit a royal gem-polishing atelier in the Johari Bazaar where children handle uncut emeralds and sapphires.",
                "bespokeAccess": "Private studio access with Master Craftsman award winners in Sanganer.",
                "includedDining": "Courtyard lunch at 1135 AD inside Amber Fort; afternoon garden high tea.",
                "stay": {
                      "name": "The Oberoi Rajvilas, Jaipur",
                      "roomType": "Luxury Villa with Private Pool & Interconnecting Family Room",
                      "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 4,
                "dayTitle": "Private Drive to Mihir Garh: The Fortress of the Sun",
                "location": "Thar Desert, Rohet",
                "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Drive across the open scrublands of the Thar Desert toward Rohet. Rise upon the desert horizon to see Mihir Garh, an awe-inspiring mud fortress of just nine suites created as a tribute to equestrian heritage. Check into your private fort wing with heated plunge pools.",
                "bespokeAccess": "Exclusive private fort wing buyout ensuring complete family intimacy and personal staff.",
                "includedDining": "Desert sunset drinks and royal Marwari hunter dinner prepared by royal family chefs.",
                "stay": {
                      "name": "Mihir Garh (The Fortress of the Sun)",
                      "roomType": "Shandar Royal Suite with Private Jacuzzi",
                      "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 5,
                "dayTitle": "Exclusive Fort Buyout: Marwari Horse Safari & Village Interaction",
                "location": "Mihir Garh Wilderness",
                "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Ride pure-blood Marwari horses with their distinctive lyre-shaped ears across desert dunes, or take customized vintage open 4WDs. Visit the Bishnoi tribal communities who have protected blackbuck antelopes and khejri trees for over 500 years.",
                "bespokeAccess": "Private equestrian masterclass with royal stable custodians and opium-free Amal ceremony with Bishnoi elders.",
                "includedDining": "Royal desert breakfast in sand dunes under silk shamianas; evening campfire banquet.",
                "stay": {
                      "name": "Mihir Garh (The Fortress of the Sun)",
                      "roomType": "Shandar Royal Suite with Private Jacuzzi",
                      "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 6,
                "dayTitle": "Chauffeured Transfer to Jodhpur: Umaid Bhawan Palace & Jaswant Thada",
                "location": "Jodhpur",
                "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Depart Mihir Garh on a short private drive to the Sun City of Jodhpur. Arrive at Umaid Bhawan Palace, greeted with royal trumpets and peacock feather fans. After unpacking, visit the white marble cenotaphs of Jaswant Thada overlooking the blue city.",
                "bespokeAccess": "Private access to the Maharaja's vintage automobile museum and palace squash courts.",
                "includedDining": "High tea on the palace lawns watching roaming peacocks; fine dining at Risala.",
                "stay": {
                      "name": "Umaid Bhawan Palace, Jodhpur",
                      "roomType": "Palace Family Royal Suite",
                      "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 7,
                "dayTitle": "Mehrangarh Fort Flying Fox & Stepwell Stroll",
                "location": "Mehrangarh Fort, Jodhpur",
                "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Thrill the younger generation with the Flying Fox zipline course soaring over fort moats and desert lakes. Older family members enjoy a leisurely curator-led private golf cart tour through Mehrangarh's palanquin and weapon galleries.",
                "bespokeAccess": "Private early fort entry before opening hours and exclusive family zipline sequence.",
                "includedDining": "Lunch at the Stepwell Cafe followed by sunset cocktails and dinner at Pillars.",
                "stay": {
                      "name": "Umaid Bhawan Palace, Jodhpur",
                      "roomType": "Palace Family Royal Suite",
                      "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 8,
                "dayTitle": "Scenic Drive to Udaipur: The Leela Palace Check-in",
                "location": "Udaipur, Lake Pichola",
                "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Drive through the green Aravalli hills to Udaipur, the City of Lakes. Check into The Leela Palace on Lake Pichola, arriving by private decorated royal boat. Spend a peaceful afternoon by the outdoor heated pool gazing at the floating palaces.",
                "bespokeAccess": "Private Lake Pichola sunset cruise with live Santoor recital exclusively for your family.",
                "includedDining": "Fine dining on the lakeside terrace at Sheesh Mahal under candlelit chandeliers.",
                "stay": {
                      "name": "The Leela Palace, Udaipur",
                      "roomType": "Royal Heritage Lake View Suite",
                      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                }
          },
          {
                "dayNumber": 9,
                "dayTitle": "Lake Pichola Sunrise Boat & Farewell Palace Gala Banquet",
                "location": "Udaipur & Departure",
                "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
                "narrative": "Begin the morning with a serene sunrise boat cruise past the bathing ghats and palaces of Udaipur. Savor an exquisite farewell multi-course gala banquet with your family. Transfer in luxury convoys to Maharana Pratap Airport with full VIP tarmac assistance.",
                "bespokeAccess": "Private island garden farewell toast and VIP airport tarmac assistance directly to your flight.",
                "includedDining": "Farewell champagne brunch and celebratory royal Mewari lunch.",
                "stay": {
                      "name": "Departure (Day 9 Outward Flight)",
                      "roomType": "VIP Airport Transit",
                      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                }
          }
    ],
    curatorNotes: {
      specialistName: "Harsh Sood",
      specialistRole: "Co-Founder & Head of Curation",
      notes: "Multi-gen travel requires flexible pacing. We design every day with two distinct tracks—one active track for younger members, and one leisurely cultural track for elders, reuniting every evening for royal dinners.",
    },
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "journal-1",
    slug: "poetry-of-the-palace-udaipur",
    title: "The Poetry of the Palace: A Night Inside Udaipur's Floating Sanctuaries",
    subtitle: "What happens when you spend 24 hours on a white marble island floating in Lake Pichola with no sound but the lapping water?",
    category: "The Art of the Hideaway",
    readTime: "6 min read",
    date: "October 20, 2026",
    author: {
      name: "Harsh Sood",
      role: "Co-Founder & Head of Curation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85",
    pullQuote:
      "Out here in the middle of Lake Pichola, the city feels like a distant painting. You are suspended in marble, water, and royal memory.",
    excerpt:
      "As dusk descends over Lake Pichola, the whitewashed walls of Udaipur's City Palace blaze in cadmium gold, while Taj Lake Palace appears to levitate above the cobalt lake.",
    content: {
      intro:
        "There are hotels that impress, and then there are architectural sanctuaries that alter your pulse. Built in 1746 as a pleasure palace for Maharana Jagat Singh II, Taj Lake Palace belongs to the latter rare category.",
      sections: [
        {
          heading: "The Ritual of the Royal Arrival",
          text: "You do not simply arrive here by car. You step onto an ornamental wooden barge at the private jetty. The mainland recedes in gentle ripples, and with it, every hum of modern vehicular noise. Uniformed royal retainers shower you with fragrant rose petals as you step onto the cool white marble threshold.",
          image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80",
          caption: "Lake Pichola reflected against the Aravalli mountains at dusk.",
        },
        {
          heading: "Midnight Solitude on the Marble Verandahs",
          text: "By 11:00 PM, when the last candlelit dinner on the lily pond is cleared, an extraordinary silence blankets the palace. Leaning against the cusped stone balustrades, watching the faint reflection of the stars in the ink-black water, you understand why the Maharanas considered this lake their spiritual escape.",
        },
      ],
    },
    relatedItinerarySlug: "royal-maharajah-palaces-rajasthan",
  },
  {
    id: "journal-2",
    slug: "tracking-leopards-of-jawai",
    title: "Tracking the Ghost of the Scrub: A Private Leopard Expedition in Jawai",
    subtitle: "Living in complete harmony with wild apex predators amidst the billion-year-old granite monoliths of rural Rajasthan.",
    category: "Expedition Chronicles",
    readTime: "7 min read",
    date: "October 12, 2026",
    author: {
      name: "Aarav Singhania",
      role: "Head of Wildlife & Conservation Safaris",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85",
    pullQuote:
      "Nowhere else on Earth do wild leopards live in such peaceful proximity to pastoral human settlements as they do in Jawai.",
    excerpt:
      "Rising before sunrise in custom-fitted 4WD jeeps, following Rabari elders who point to fresh pugmarks on sun-warmed granite rocks.",
    content: {
      intro:
        "Most wildlife destinations keep human beings and apex predators strictly segregated behind fences. In Jawai, five hours south of Jaipur, an ancient ecological truce has survived for generations.",
      sections: [
        {
          heading: "The Granite Amphitheatre",
          text: "Billion-year-old volcanic granite boulders litter the plains like forgotten sculptures. Within these deep caves, female leopards raise cubs, frequently resting on open rock faces directly above village temples where bells chime at dawn.",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
          caption: "A magnificent leopard surveying territory from a high granite ridge.",
        },
        {
          heading: "The Wisdom of the Rabari Elders",
          text: "Our tracker, Laxman, is an elder of the red-turbaned Rabari shepherd tribe. Without binoculars or radio, he pauses, listens to the distinct warning chatter of a babbler bird, and gestures toward a high ledge. Sure enough, thirty seconds later, a male leopard steps silently into the morning sun.",
        },
      ],
    },
    relatedItinerarySlug: "royal-maharajah-palaces-rajasthan",
  },
  {
    id: "journal-3",
    slug: "high-altitude-solitude-ladakh-nubra",
    title: "Under the Stars of Nubra: High-Altitude Solitude at 10,000 Feet",
    subtitle: "Crossing the highest motorable passes on Earth to find complete mental clarity in the Karakoram shadows.",
    category: "Curator Dispatch",
    readTime: "8 min read",
    date: "September 28, 2026",
    author: {
      name: "Devika Rao",
      role: "Lead Himalayan & Trans-Plateau Curator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=85",
    pullQuote:
      "When the air thins at 15,000 feet, every thought becomes razor sharp and every unnecessary complication of modern life falls away.",
    excerpt:
      "Navigating the hairpin turns of Khardung La into Nubra's sand dunes, where double-humped camels graze beside crystal glacial rivers.",
    content: {
      intro:
        "To cross from the Indus Valley into the Nubra Valley over Khardung La is to experience planetary geography at its rawest. Glaciers grind against granite ridges just yards from your vehicle window.",
      sections: [
        {
          heading: "The Sands Beneath the Glaciers",
          text: "Descending into Nubra at Hunder, the landscape shifts from rocky gorge to sweeping white sand dunes at 10,000 feet. Descendants of Silk Road Bactrian camels graze amidst sea buckthorn bushes, silhouetted against snow-capped 20,000-foot peaks.",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
          caption: "Morning light carving the sand dunes of Hunder in Nubra Valley.",
        },
      ],
    },
    relatedItinerarySlug: "himalayan-solitude-ladakh-glamping",
  },
];

export const SPECIALISTS: TravelSpecialist[] = [
  {
    id: "spec-suraj",
    name: "Suraj Uniyal",
    role: "Co-Founder & Operations Director",
    regions: ["Himalayas", "Uttarakhand", "Ladakh & Kashmir", "VIP Logistics"],
    yearsExperience: 10,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    favoriteHideaway: "Ananda in the Himalayas, Rishikesh",
    bio: "Co-founder of Soulsventure, Suraj spearheads luxury operations, high-altitude logistics, VIP private aviation corridors, and seamless on-ground concierge execution across India.",
    quote: "True luxury is invisible precision. You never see the logistical gears turning; you only experience the seamless, unhurried magic of every single moment.",
  },
  {
    id: "spec-harsh",
    name: "Harsh Sood",
    role: "Co-Founder & Head of Curation",
    regions: ["Rajasthan", "Mewar Palaces", "Jawai Wilderness", "Royal Circuits"],
    yearsExperience: 10,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    favoriteHideaway: "Taj Lake Palace, Udaipur",
    bio: "Co-founder of Soulsventure, Harsh curates intimate access to Rajputana's living palaces, royal courtyards, private desert fly-ins, and bespoke architectural itineraries for distinguished families.",
    quote: "True luxury in Rajasthan is intimacy with heritage—having the private keys to a 300-year-old courtyard where only your family hears the evening sitar.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    client: "Rohit & Radhika Singhania",
    location: "Malabar Hill, Mumbai",
    quote:
      "Soulsventure curated our 10-day Rajasthan journey to perfection. From our private barge transfer to Taj Lake Palace to tracking leopards on the granite rocks of Jawai with our own private naturalist, every single moment felt unrepeatable and exquisitely choreographed.",
    journey: "The Royal Maharajah Circuit",
    year: "2026",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "test-2",
    client: "Vikram & Ananya Shroff",
    location: "Prithviraj Road, New Delhi",
    quote:
      "Traveling with our multi-generational family can be logistically challenging, especially with pure vegetarian and Jain dietary needs. Soulsventure’s team ensured our private heated glamping tents in Ladakh had world-class customized dining and 24/7 medical oxygen care.",
    journey: "Himalayan Solitude & Ladakh",
    year: "2026",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "test-3",
    client: "Priya & Karan Mehra",
    location: "Indiranagar, Bengaluru",
    quote:
      "Our tiger safari in Ranthambore and Bandhavgarh was beyond anything we imagined. Full-day VIP core zone permits, SUJÁN Sher Bagh’s unbelievable hospitality, and spotting six different wild tigers in four days. Truly world-class.",
    journey: "The Royal Bengal Tiger Trail",
    year: "2026",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];

export const PRESS_ACCOLADES = [
  {
    outlet: "Condé Nast Traveller India",
    badge: "TOP SPECIALIST 2026",
    quote: "Soulsventure represents the new golden age of bespoke Indian luxury travel—cultivating unscripted access with obsessive craft.",
  },
  {
    outlet: "Vogue India",
    badge: "THE LUXURY ATELIER",
    quote: "The premier private travel atelier for India's most discerning families seeking unlisted palace sanctuaries and wilderness fly-ins.",
  },
  {
    outlet: "The Economic Times Panache",
    badge: "BESPOKE OPERATOR OF THE YEAR",
    quote: "Redefining domestic ultra-luxury holidays through private aviation, conservation alliances, and white-glove concierge execution.",
  },
  {
    outlet: "Robb Report India",
    badge: "BEST OF THE BEST 2026",
    quote: "Soulsventure crafts unrepeatable journeys across India that rival the world's most elite private travel ateliers.",
  },
];
