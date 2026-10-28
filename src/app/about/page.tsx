import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Award, Globe, HeartHandshake, Compass, MapPin, Phone, Mail, UserCheck } from "lucide-react";
import { SPECIALISTS } from "@/data/mockData";

export const metadata: Metadata = {
  title: "About Soulsventure | Founders Harsh Sood & Suraj Uniyal | Dehradun, Uttarakhand",
  description:
    "Founded by Harsh Sood and Suraj Uniyal in Dehradun, Uttarakhand. Soulsventure is India's leading bespoke luxury travel studio, crafting private palace tours, tiger safaris, and Himalayan expeditions.",
  alternates: {
    canonical: "https://soulsventure.com/about",
  },
  openGraph: {
    title: "About Soulsventure | Bespoke Luxury Travel | Dehradun, Uttarakhand",
    description:
      "Founded by Harsh Sood and Suraj Uniyal. Crafting life-affirming private journeys across India: living palaces, private wildlife tracking & 24/7 concierge craft.",
    url: "https://soulsventure.com/about",
    siteName: "Soulsventure",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      {/* Editorial Hero Banner */}
      <section className="relative h-[65vh] min-h-[500px] w-full flex items-end overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=85"
          alt="Royal living palaces and serene waters of India"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-16 w-full space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> The House of Soulsventure
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight max-w-4xl">
            Travel as high art, curated with obsessive craft.
          </h1>
          <p className="text-white/80 font-light text-base sm:text-xl max-w-2xl leading-relaxed">
            Founded by Harsh Sood and Suraj Uniyal in Dehradun, Uttarakhand. We exist for those who understand that true luxury is not marble lobbies, but unscripted human access, rare privacy, and profound stillness.
          </p>
        </div>
      </section>

      {/* Brand Philosophy Spread */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
              Our Genesis & Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              An antidote to the homogenized world.
            </h2>
            <p className="drop-cap text-sm sm:text-base text-[#1A1A1A]/80 font-light leading-relaxed">
              ounded in Dehradun, Uttarakhand by Harsh Sood and Suraj Uniyal, Soulsventure was established out of a visceral frustration with the cookie-cutter packages sold to India&apos;s most sophisticated travelers. When luxury tourism became formulaic, we committed ourselves to creating unrepeatable domestic journeys shaped around emotional depth, heritage intimacy, and total peace of mind.
            </p>
            <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
              Headquartered amidst the serene foothills of Uttarakhand in Dehradun, Soulsventure curates journeys with zero intermediaries. Our founders and senior curators personally scout every private tiger reserve zone, vet every living royal palace suite in Rajasthan, and inspect every private houseboat hull in Kerala to guarantee uncompromised exclusivity.
            </p>
            <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-light leading-relaxed">
              From bespoke dietary choreography (including strict pure vegetarian and gourmet Jain gastronomy prepared by private royal chefs) to white-glove VIP tarmac clearances and domestic aviation charters, we handle every nuance with instinctive cultural mastery.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative h-64 sm:h-80 overflow-hidden border border-[#1A1A1A]/10">
              <Image
                src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80"
                alt="High-altitude Himalayan solitude in Ladakh"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 overflow-hidden border border-[#1A1A1A]/10 mt-8">
              <Image
                src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80"
                alt="Wild Bengal tiger in Ranthambore core forest"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founders Leadership Spotlight */}
      <section className="py-20 bg-white border-y border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl space-y-3 mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Founding Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              Guided by the Founders.
            </h2>
            <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light">
              Soulsventure was founded on a shared obsession with unscripted exploration, privacy, and elevating domestic Indian travel to global high-art standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founder 1: Suraj Uniyal */}
            <div className="bg-[#FDFBF7] border border-[#1A1A1A]/10 p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#DFCDAE] border-2 border-[#C5A880]/50 flex items-center justify-center font-serif text-lg font-medium tracking-widest flex-shrink-0 shadow-inner">
                      SU
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A]">
                        Suraj Uniyal
                      </h3>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mt-0.5">
                        Founder & Director of Operations
                      </span>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 font-mono">
                    Dehradun Desk
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
                  Suraj oversees the operational precision, private aviation logistics, and white-glove concierge execution across all domestic sectors. From helicopter charters into high Himalayan passes to bespoke dietary guarantees and VIP airport tarmac clearances, Suraj ensures total peace of mind for every Soulsventure traveler.
                </p>
                <blockquote className="p-4 bg-[#F5F2EB] border-l-2 border-[#C5A880] italic text-xs text-[#1A1A1A]/85 font-serif">
                  &ldquo;True luxury is effortless execution. When our guests land, every gate is open, every vehicle is waiting, and every meal is choreographed to their family&apos;s exact preferences.&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1A1A1A]/70">
                <a
                  href="tel:+918126357353"
                  className="inline-flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>+91 8126357353</span>
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Dehradun, Uttarakhand</span>
                </span>
              </div>
            </div>

            {/* Founder 2: Harsh Sood */}
            <div className="bg-[#FDFBF7] border border-[#1A1A1A]/10 p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#DFCDAE] border-2 border-[#C5A880]/50 flex items-center justify-center font-serif text-lg font-medium tracking-widest flex-shrink-0 shadow-inner">
                      HS
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A]">
                        Harsh Sood
                      </h3>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mt-0.5">
                        Founder & Director of Curation
                      </span>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 font-mono">
                    Dehradun Desk
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
                  Harsh drives the creative vision, architectural standards, and bespoke routing at Soulsventure. With a deep passion for untouched wilderness and royal heritage, he works closely with erstwhile royal families, private lodge custodians, and master naturalists across India to choreograph unrepeatable private journeys.
                </p>
                <blockquote className="p-4 bg-[#F5F2EB] border-l-2 border-[#C5A880] italic text-xs text-[#1A1A1A]/85 font-serif">
                  &ldquo;We don&apos;t build itineraries from brochures. We build them from living friendships with the royal stewards, park rangers, and keepers of India&apos;s greatest sanctuaries.&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1A1A1A]/70">
                <a
                  href="tel:+919319843524"
                  className="inline-flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>+91 9319843524</span>
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Dehradun, Uttarakhand</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Curators / Specialists Section */}
      <section id="specialists" className="py-24 bg-[#F5F2EB] border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl space-y-3 mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Regional Specialists
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              Meet our senior field curators.
            </h2>
            <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light">
              You will never be handed off to an automated system. Your dedicated curator personally oversees your voyage from initial sketch to your return home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SPECIALISTS.map((specialist) => (
              <div
                key={specialist.id}
                className="bg-white border border-[#1A1A1A]/10 p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A880] flex-shrink-0">
                      <Image
                        src={specialist.photo}
                        alt={specialist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                        {specialist.yearsExperience} Years Field Experience
                      </span>
                      <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                        {specialist.name}
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/60 font-light">
                        {specialist.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed">
                    {specialist.bio}
                  </p>

                  <blockquote className="p-3 bg-[#F5F2EB] border-l-2 border-[#C5A880] italic text-xs text-[#1A1A1A]/85 font-serif">
                    &ldquo;{specialist.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#1A1A1A]/60 font-light">
                    Specialties: {specialist.regions.join(" • ")}
                  </span>
                  <Link
                    href={`/enquire?curator=${encodeURIComponent(specialist.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] hover:text-[#C5A880] transition-colors"
                  >
                    <span>Plan with {specialist.name.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Luxury & Conservation Commitments */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            The Moral Imperative
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
            Responsible luxury & conservation alliances across India.
          </h2>
          <p className="text-[#1A1A1A]/70 text-sm font-light">
            We believe bespoke travel must enrich the ecosystems and heritage communities we touch, not extract from them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F5F2EB] p-8 border border-[#1A1A1A]/5 space-y-4">
            <Shield className="w-8 h-8 text-[#C5A880]" />
            <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
              Wildlife Habitat Conservation
            </h3>
            <p className="text-xs text-[#1A1A1A]/75 font-light leading-relaxed">
              Every safari booked directly funds frontline forest anti-poaching patrol equipment and local village conservation initiatives in Ranthambore and Bandhavgarh.
            </p>
          </div>

          <div className="bg-[#F5F2EB] p-8 border border-[#1A1A1A]/5 space-y-4">
            <HeartHandshake className="w-8 h-8 text-[#C5A880]" />
            <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
              Direct Artisan & Pastoral Alliances
            </h3>
            <p className="text-xs text-[#1A1A1A]/75 font-light leading-relaxed">
              We contract directly with Rabari shepherd trackers in Jawai, Ladakhi monastery preservation trusts, and traditional Kerala boat craftsmen, ensuring fair livelihoods remain in local hands.
            </p>
          </div>

          <div className="bg-[#F5F2EB] p-8 border border-[#1A1A1A]/5 space-y-4">
            <Award className="w-8 h-8 text-[#C5A880]" />
            <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
              Living Heritage Preservation
            </h3>
            <p className="text-xs text-[#1A1A1A]/75 font-light leading-relaxed">
              Our palace and fort buyouts directly support ongoing restoration of centuries-old fresco paintings, carved stone jali windows, and royal textile archives across Rajasthan.
            </p>
          </div>
        </div>

        {/* Bottom CTA with Founders direct contact */}
        <div className="mt-16 text-center space-y-4">
          <Link
            href="/enquire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-lg"
          >
            <span>Start a Confidential Conversation with Suraj & Harsh</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-[#1A1A1A]/60 font-light">
            Dehradun Headquarters: Suraj Uniyal: <a href="tel:+918126357353" className="underline hover:text-[#C5A880] font-medium">+91 8126357353</a> • Harsh Sood: <a href="tel:+919319843524" className="underline hover:text-[#C5A880] font-medium">+91 9319843524</a>
          </p>
        </div>
      </section>
    </div>
  );
}
