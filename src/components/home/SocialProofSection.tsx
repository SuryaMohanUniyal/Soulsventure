import React from "react";
import Image from "next/image";
import { Star, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "@/data/mockData";

export default function SocialProofSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F2EB] text-[#1A1A1A] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Client Testimonials Section */}
        <div>
          <div className="max-w-3xl space-y-3 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Private Client Dispatches
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              Words from those who have journeyed with us.
            </h2>
            <p className="text-[#1A1A1A]/70 text-sm sm:text-base font-light">
              Every year we limit our bespoke intake to maintain uncompromising intimacy and perfection in execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white p-8 border border-[#1A1A1A]/10 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-light leading-relaxed italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-[#C5A880]/30">
                    <Image
                      src={test.avatar}
                      alt={test.client}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#1A1A1A]">
                      {test.client}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block">
                      {test.location}
                    </span>
                    <span className="text-[10px] text-[#C5A880] font-medium block">
                      {test.journey} ({test.year})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
