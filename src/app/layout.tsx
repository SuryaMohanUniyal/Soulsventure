import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://soulsventure.com"),
  title: {
    default: "Soulsventure | India's Premier Bespoke Luxury Travel Agency",
    template: "%s | Soulsventure Bespoke Journeys",
  },
  description:
    "Soulsventure is India's leading bespoke luxury travel agency. We curate ultra-luxury tailor-made journeys across India: private royal palace suites in Rajasthan, luxury glamping in Ladakh, exclusive tiger safaris in Ranthambore, and private royal houseboats in Kerala.",
  keywords: [
    "luxury travel agency in India",
    "bespoke luxury tours India",
    "luxury Rajasthan tour packages private palace",
    "luxury Ladakh tour private glamping",
    "luxury wildlife tiger safari India",
    "luxury Kerala houseboat private charter",
    "Soulsventure",
    "Soulsventure bespoke journeys",
    "ultra luxury travel company India",
    "private jet tours India",
    "Jawai leopard safari luxury camps",
    "Kashmir luxury tour packages Gulmarg",
    "private fort buyouts Rajasthan",
    "tailor-made holidays India",
  ],
  authors: [{ name: "Soulsventure Private Curations" }],
  creator: "Soulsventure",
  publisher: "Soulsventure Bespoke Journeys Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Soulsventure | Bespoke Luxury Travel & Curated Private Journeys Across India",
    description:
      "Remarkable private travel across India, tailored entirely to you. Discover private palace buyouts, luxury wildlife safaris, high-altitude Himalayan glamping, and 24/7 concierge craft.",
    url: "https://soulsventure.com",
    siteName: "Soulsventure",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Soulsventure Bespoke Luxury Travel India - Lake Pichola & Palaces",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soulsventure | Luxury Bespoke Journeys Across India",
    description:
      "India's premier architects of life-affirming bespoke travel. Private flights, unlisted royal palaces, master tiger naturalists, and 24/7 concierge craft.",
    images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85"],
  },
  alternates: {
    canonical: "https://soulsventure.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global JSON-LD Schema for TravelAgency (E-E-A-T & Google Knowledge Graph)
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Soulsventure",
    legalName: "Soulsventure Bespoke Journeys Pvt. Ltd.",
    url: "https://soulsventure.com",
    logo: "https://soulsventure.com/favicon.ico",
    description:
      "India's premier bespoke luxury travel studio curating tailor-made domestic private journeys, private palace buyouts, conservation tiger safaris, and high-altitude Himalayan glamping.",
    telephone: "+91 8126357353",
    priceRange: "₹₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rajpur Road",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      postalCode: "248001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.3165",
      longitude: "78.0322",
    },
    founder: [
      {
        "@type": "Person",
        name: "Suraj Uniyal",
        jobTitle: "Founder",
        telephone: "+91 8126357353",
      },
      {
        "@type": "Person",
        name: "Harsh Sood",
        jobTitle: "Founder",
        telephone: "+91 9319843524",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "19:30",
      },
    ],
    sameAs: [
      "https://www.instagram.com/soulsventure",
      "https://www.linkedin.com/company/soulsventure",
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#C5A880]/20 selection:text-[#1A1A1A]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
