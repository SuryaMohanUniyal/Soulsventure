import React from "react";
import HeroSection from "@/components/home/HeroSection";
import StartYourJourneySection from "@/components/home/StartYourJourneySection";
import ExploreOurTripsCarousel from "@/components/home/ExploreOurTripsCarousel";
import CuratedJourneysSection from "@/components/home/CuratedJourneysSection";
import BespokeProcessSection from "@/components/home/BespokeProcessSection";
import EditorialFeatureSection from "@/components/home/EditorialFeatureSection";
import FaqSection from "@/components/home/FaqSection";
import SocialProofSection from "@/components/home/SocialProofSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Full-Viewport Hero with Discovery Bar */}
      <HeroSection />

      {/* 2. Black Tomato Signature: "START YOUR JOURNEY" Tabbed Spotlight Cards */}
      <StartYourJourneySection />

      {/* 3. Black Tomato Signature: "EXPLORE OUR TRIPS" Horizontal Scroll Carousel */}
      <ExploreOurTripsCarousel />

      {/* 4. Flagship Curated Journeys Preview */}
      <CuratedJourneysSection />

      {/* 5. Interactive 3-Step Bespoke Process Timeline */}
      <BespokeProcessSection />

      {/* 6. Editorial Feature Spread (Patagonia & Atacama) */}
      <EditorialFeatureSection />

      {/* 7. Comprehensive FAQ Accordion with Schema.org JSON-LD */}
      <FaqSection />

      {/* 8. Press Banner & Client Testimonials */}
      <SocialProofSection />
    </div>
  );
}
