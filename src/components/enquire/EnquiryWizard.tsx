"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Compass,
  Users,
  Calendar,
  IndianRupee,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Video,
  MessageCircle,
  ShieldCheck,
  Check,
} from "lucide-react";
import { DESTINATIONS } from "@/data/mockData";
import { addIncomingEnquiry } from "@/lib/crmStore";

// Zod Validation Schema
const enquirySchema = z.object({
  destinations: z.array(z.string()).min(1, "Please select at least one destination or 'Open to Inspiration'"),
  companions: z.string().min(1, "Please select your travel companions"),
  familyAges: z.string().optional(),
  travelWindow: z.string().min(1, "Please choose your desired travel window"),
  duration: z.string().min(1, "Please select your preferred duration"),
  budgetTier: z.string().min(1, "Please select an estimated budget tier"),
  specialInterests: z.array(z.string()).optional(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(6, "Please provide a telephone number"),
  consultationMethod: z.enum(["zoom", "phone", "whatsapp"]),
  preferredTimeOfDay: z.string().min(1, "Please choose preferred consultation time"),
  specialRequests: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const STEPS = [
  { id: 1, title: "Destination", icon: Compass },
  { id: 2, title: "Companions", icon: Users },
  { id: 3, title: "Timeline", icon: Calendar },
  { id: 4, title: "Investment", icon: IndianRupee },
  { id: 5, title: "Contact", icon: User },
];

export default function EnquiryWizard() {
  const searchParams = useSearchParams();
  const preselectedDest = searchParams.get("dest") || searchParams.get("destination");
  const preselectedItinerary = searchParams.get("itinerary");

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [stepError, setStepError] = useState<string | null>(null);

  const [selectedDests, setSelectedDests] = useState<string[]>(() => {
    if (preselectedDest) return [preselectedDest.toLowerCase()];
    return ["rajasthan"];
  });
  const [selectedCompanions, setSelectedCompanions] = useState<string>("Couple / Honeymoon");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Culinary & Wine",
    "Wildlife & Nature",
  ]);

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      destinations: preselectedDest ? [preselectedDest.toLowerCase()] : ["rajasthan"],
      companions: "Couple / Honeymoon",
      familyAges: "",
      travelWindow: "Within the next 6 months",
      duration: "10-14 Days",
      budgetTier: "₹6,00,000 - ₹12,00,000 pp",
      specialInterests: ["Culinary & Wine", "Wildlife & Nature"],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consultationMethod: "zoom",
      preferredTimeOfDay: "Afternoon (12:00 - 17:00)",
      specialRequests: preselectedItinerary ? `Interested in customizing: ${preselectedItinerary}` : "",
    },
  });

  // Step advancement with validation
  const nextStep = () => {
    setStepError(null);
    if (currentStep === 1) {
      if (!selectedDests || selectedDests.length === 0) {
        setStepError("Please select at least one destination (or choose 'Open to Inspiration') to continue.");
        return;
      }
      setValue("destinations", selectedDests, { shouldValidate: true });
    }
    if (currentStep === 2) {
      if (!selectedCompanions) {
        setStepError("Please select who will be travelling with you.");
        return;
      }
      setValue("companions", selectedCompanions, { shouldValidate: true });
    }
    // Steps 3 & 4 have valid defaults already selected
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStepError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    const code = `SV-${Math.floor(1000 + Math.random() * 9000)}-IND`;
    setReferenceCode(code);

    let estimatedVal = 600000;
    if (data.budgetTier.includes("3,50,000")) estimatedVal = 475000;
    else if (data.budgetTier.includes("6,00,000")) estimatedVal = 900000;
    else if (data.budgetTier.includes("12,00,000")) estimatedVal = 1850000;
    else if (data.budgetTier.includes("25,00,000")) estimatedVal = 3500000;

    const finalDests = selectedDests.length > 0 ? selectedDests : data.destinations;
    const finalInterests = selectedInterests.length > 0 ? selectedInterests : (data.specialInterests || []);

    try {
      await addIncomingEnquiry({
        referenceCode: code,
        clientName: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        destinations: finalDests,
        destinationSummary: finalDests
          .map((d) => (d === "open-inspiration" ? "Open to Inspiration" : d.charAt(0).toUpperCase() + d.slice(1)))
          .join(", "),
        travelWindow: data.travelWindow,
        duration: data.duration,
        companions: selectedCompanions || data.companions,
        familyAges: data.familyAges,
        budgetTier: data.budgetTier,
        estimatedValueINR: estimatedVal,
        specialInterests: finalInterests,
        specialRequests: data.specialRequests || "",
        consultationMethod: data.consultationMethod,
        preferredTimeOfDay: data.preferredTimeOfDay,
      });
    } catch (e) {
      console.error("Enquiry save error:", e);
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }

    setIsSubmitting(false);
    setSubmissionSuccess(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const toggleDestination = (destSlug: string) => {
    setStepError(null);
    clearErrors("destinations");
    if (destSlug === "open-inspiration") {
      setSelectedDests(["open-inspiration"]);
      setValue("destinations", ["open-inspiration"], { shouldValidate: true, shouldDirty: true });
      return;
    }
    const current = selectedDests.filter((d) => d !== "open-inspiration");
    let next: string[];
    if (current.includes(destSlug)) {
      next = current.filter((d) => d !== destSlug);
    } else {
      next = [...current, destSlug];
    }
    setSelectedDests(next);
    setValue("destinations", next, { shouldValidate: true, shouldDirty: true });
  };

  const toggleInterest = (interest: string) => {
    let next: string[];
    if (selectedInterests.includes(interest)) {
      next = selectedInterests.filter((i) => i !== interest);
    } else {
      next = [...selectedInterests, interest];
    }
    setSelectedInterests(next);
    setValue("specialInterests", next);
  };

  return (
    <div className="pt-28 pb-32 bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Funnel Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Private Client Consultation Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A] leading-tight">
            Begin your bespoke journey.
          </h1>
          <p className="text-[#1A1A1A]/70 text-sm font-light">
            Share your aspirations with our senior designers. We respond with a tailored conceptual framework within 24 hours.
          </p>
        </div>

        {/* Step Progress Tracker */}
        {!submissionSuccess && (
          <div className="mb-12">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const isCurrent = currentStep === s.id;
                const isCompleted = currentStep > s.id;
                return (
                  <div
                    key={s.id}
                    className={`flex items-center gap-2 text-xs uppercase tracking-wider ${
                      isCurrent
                        ? "text-[#1A1A1A] font-semibold"
                        : isCompleted
                        ? "text-[#C5A880]"
                        : "text-[#1A1A1A]/35"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                        isCurrent
                          ? "bg-[#1A1A1A] text-white"
                          : isCompleted
                          ? "bg-[#C5A880] text-white"
                          : "bg-[#F5F2EB] text-[#1A1A1A]/50"
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </span>
                    <span className="hidden sm:inline">{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Multi-Step Wizard Body */}
        {submissionSuccess ? (
          /* Confirmation Receipt State */
          <div className="bg-white border border-[#1A1A1A]/10 p-8 sm:p-12 shadow-2xl space-y-8 animate-in fade-in zoom-in-95">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 text-[#C5A880] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Consultation Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
                Your consultation is registered.
              </h2>
              <p className="text-sm text-[#1A1A1A]/70 font-light max-w-lg mx-auto">
                We have received your travel preferences and assigned a Senior Travel Designer to review your file.
              </p>
            </div>

            {/* Reference Badge Box */}
            <div className="bg-[#F5F2EB] p-6 border border-[#1A1A1A]/5 space-y-4 max-w-md mx-auto">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/50 uppercase tracking-wider">Client Reference:</span>
                <span className="font-serif font-medium text-base text-[#1A1A1A]">
                  {referenceCode}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/50 uppercase tracking-wider">Lead Designer:</span>
                <span className="font-medium text-[#1A1A1A]">Suraj Uniyal & Harsh Sood (Founders)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#1A1A1A]/50 uppercase tracking-wider">Guaranteed Response:</span>
                <span className="font-medium text-[#C5A880]">Within 24 Hours</span>
              </div>
            </div>

            {/* Next Steps Timeline */}
            <div className="space-y-4 pt-4 border-t border-[#1A1A1A]/10 max-w-lg mx-auto">
              <h4 className="font-serif text-lg text-[#1A1A1A]">What happens next?</h4>
              <div className="space-y-3 text-xs text-[#1A1A1A]/80 font-light">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    A confirmation email has been dispatched to your inbox with direct calendar scheduling links.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Your specialist reviews live aircraft charter availability, private estate allocations, and seasonal climate factors.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    You will receive a confidential invitation to join your 30-minute private consultation.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/918126357353?text=${encodeURIComponent(
                  `Hello Suraj, I have submitted a bespoke consultation request on Soulsventure (Ref: ${referenceCode}). Destinations: ${selectedDests.join(", ")}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Founder WhatsApp (+91 8126357353)</span>
              </a>

              
            </div>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="text-xs text-[#1A1A1A]/60 hover:text-[#1A1A1A] underline transition-colors"
              >
                Return to Soulsventure Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-[#1A1A1A]/10 p-8 sm:p-12 shadow-xl space-y-8"
          >
            {/* STEP 1: Destinations */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                    Step 1 of 5
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                    Where would you like to escape?
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 font-light">
                    Select all regions of interest, or choose &ldquo;Open to Inspiration&rdquo;.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => toggleDestination("open-inspiration")}
                    className={`p-4 text-left border transition-all cursor-pointer rounded-lg relative ${
                      selectedDests.includes("open-inspiration")
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-[#C5A880]"
                        : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base block font-medium">
                        Open to Inspiration
                      </span>
                      {selectedDests.includes("open-inspiration") && (
                        <span className="w-5 h-5 rounded-full bg-[#C5A880] text-white flex items-center justify-center text-xs">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] opacity-75 font-light">
                      Let our curators suggest
                    </span>
                  </button>

                  {DESTINATIONS.map((dest) => {
                    const isSelected = selectedDests.includes(dest.slug);
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => toggleDestination(dest.slug)}
                        className={`p-4 text-left border transition-all cursor-pointer rounded-lg relative ${
                          isSelected
                            ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-[#C5A880]"
                            : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base block font-medium">
                            {dest.name}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#C5A880] text-white flex items-center justify-center text-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] opacity-75 font-light">
                          {dest.continent}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {stepError && currentStep === 1 && (
                  <div className="p-3 bg-red-950/10 border border-red-500/30 text-red-600 text-xs rounded-lg animate-in fade-in">
                    {stepError}
                  </div>
                )}
                {errors.destinations && (
                  <p className="text-xs text-red-600">{errors.destinations.message}</p>
                )}
              </div>
            )}

            {/* STEP 2: Companions */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                    Step 2 of 5
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                    Who is travelling with you?
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 font-light">
                    Party dynamics allow us to curate the right private villa configurations and privacy levels.
                  </p>
                </div>

                {stepError && currentStep === 2 && (
                  <div className="p-3 bg-red-950/10 border border-red-500/30 text-red-600 text-xs rounded-lg animate-in fade-in">
                    {stepError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Solo Explorer", desc: "Private immersion & personal pace" },
                    { label: "Couple / Honeymoon", desc: "Intimate cliffside suites & romantic privacy" },
                    { label: "Family with Children", desc: "Private compounds & multi-gen spaces" },
                    { label: "Private Group / Milestone", desc: "Full lodge or superyacht buyouts" },
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => {
                        setSelectedCompanions(option.label);
                        setValue("companions", option.label, { shouldValidate: true });
                      }}
                      className={`p-5 text-left border transition-all cursor-pointer ${
                        selectedCompanions === option.label
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]"
                      }`}
                    >
                      <h4 className="font-serif text-lg font-medium mb-1">{option.label}</h4>
                      <p className="text-xs opacity-75 font-light">{option.desc}</p>
                    </button>
                  ))}
                </div>

                {selectedCompanions === "Family with Children" && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs uppercase tracking-wider text-[#1A1A1A]/70 font-semibold">
                      Children Ages (Optional)
                    </label>
                    <Controller
                      name="familyAges"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="e.g. 7, 12, 16"
                          className="w-full bg-[#F5F2EB] border border-[#1A1A1A]/10 px-4 py-3 text-xs focus:outline-none"
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Timeline & Duration */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                    Step 3 of 5
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                    When would you like to travel?
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 font-light">
                    Our curators cross-reference migration patterns, harvest seasons, and climate data.
                  </p>
                </div>

                {/* Desired Window */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A]/70 font-semibold">
                    Preferred Travel Window
                  </label>
                  <Controller
                    name="travelWindow"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          "Within the next 3 months",
                          "3 to 6 months out",
                          "6 to 12 months out",
                          "Festive Season / Holidays",
                          "Specific Dates (Flexible)",
                        ].map((win) => (
                          <button
                            key={win}
                            type="button"
                            onClick={() => field.onChange(win)}
                            className={`p-3 text-xs text-left border transition-all cursor-pointer ${
                              field.value === win
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]"
                            }`}
                          >
                            {win}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2 pt-4 border-t border-[#1A1A1A]/10">
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A]/70 font-semibold">
                    Preferred Trip Duration
                  </label>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["7 to 10 Days", "10 to 14 Days", "14 to 21 Days", "3+ Weeks Grand Tour"].map(
                          (dur) => (
                            <button
                              key={dur}
                              type="button"
                              onClick={() => field.onChange(dur)}
                              className={`p-3 text-xs text-center border transition-all cursor-pointer ${
                                field.value === dur
                                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                  : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]"
                              }`}
                            >
                              {dur}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Budget Tier & Special Interests */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                    Step 4 of 5
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                    Estimated investment & passions.
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 font-light">
                    Helps us pair you with the appropriate aviation charters and exclusive accommodations.
                  </p>
                </div>

                {/* Budget Tiers */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A]/70 font-semibold">
                    Budget Tier (per person sharing)
                  </label>
                  <Controller
                    name="budgetTier"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { tier: "₹3,50,000 - ₹6,00,000 pp", desc: "Boutique heritage havelis, luxury glamping & private chauffeurs" },
                          { tier: "₹6,00,000 - ₹12,00,000 pp", desc: "Flagship royal palace suites & private naturalist tracking" },
                          { tier: "₹12,00,000 - ₹25,00,000 pp", desc: "Private turbo-prop charter hops, presidential suites & royal fort buyouts" },
                          { tier: "₹25,00,000+ pp (Ultra-Luxe)", desc: "Complete private island / palace buyouts & bespoke aviation convoys" },
                        ].map((b) => (
                          <button
                            key={b.tier}
                            type="button"
                            onClick={() => field.onChange(b.tier)}
                            className={`p-4 text-left border transition-all cursor-pointer ${
                              field.value === b.tier
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]"
                            }`}
                          >
                            <span className="font-serif text-base block font-medium">{b.tier}</span>
                            <span className="text-[11px] opacity-75 font-light">{b.desc}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* Special Interests */}
                <div className="space-y-2 pt-4 border-t border-[#1A1A1A]/10">
                  <label className="block text-xs uppercase tracking-wider text-[#1A1A1A]/70 font-semibold">
                    Signature Interests (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Culinary & Wine",
                      "Wildlife & Nature",
                      "Contemporary Art",
                      "Architecture & Design",
                      "Alpine Wellness & Spa",
                      "Extreme Polar Exploration",
                      "Astrophotography & Dark Skies",
                    ].map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 text-xs transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1A1A1A] text-white"
                              : "bg-[#F5F2EB] text-[#1A1A1A]/80 hover:bg-[#EAE5D9]"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Personal Details & Contact */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                    Step 5 of 5
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
                    Personal details & consultation preferences.
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 font-light">
                    Strictly confidential. We never sell or share client data.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#1A1A1A]/70 font-semibold mb-1">
                      First Name *
                    </label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          required
                          className="w-full bg-[#F5F2EB] border border-[#1A1A1A]/10 px-4 py-3 text-xs focus:outline-none"
                        />
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#1A1A1A]/70 font-semibold mb-1">
                      Last Name *
                    </label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          required
                          className="w-full bg-[#F5F2EB] border border-[#1A1A1A]/10 px-4 py-3 text-xs focus:outline-none"
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#1A1A1A]/70 font-semibold mb-1">
                      Email Address *
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          required
                          className="w-full bg-[#F5F2EB] border border-[#1A1A1A]/10 px-4 py-3 text-xs focus:outline-none"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#1A1A1A]/70 font-semibold mb-1">
                      Phone Number *
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="tel"
                          placeholder="+44 20 7946 0912"
                          required
                          className="w-full bg-[#F5F2EB] border border-[#1A1A1A]/10 px-4 py-3 text-xs focus:outline-none"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Consultation Method Preference */}
                <div className="space-y-2 pt-4 border-t border-[#1A1A1A]/10">
                  <label className="block text-[11px] uppercase tracking-wider text-[#1A1A1A]/70 font-semibold">
                    Preferred Consultation Format
                  </label>
                  <Controller
                    name="consultationMethod"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => field.onChange("zoom")}
                          className={`p-3 text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                            field.value === "zoom"
                              ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                              : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10"
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Private Zoom</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => field.onChange("phone")}
                          className={`p-3 text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                            field.value === "phone"
                              ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                              : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10"
                          }`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Direct Phone</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => field.onChange("whatsapp")}
                          className={`p-3 text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                            field.value === "whatsapp"
                              ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                              : "bg-[#F5F2EB] text-[#1A1A1A] border-[#1A1A1A]/10"
                          }`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    )}
                  />
                </div>

                {/* Special Requests textarea */}
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#1A1A1A]/70 font-semibold">
                    Aspirations, Milestones or Specific Requests (Optional)
                  </label>
                  <Controller
                    name="specialRequests"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        placeholder="Tell us about celebratory milestones, dietary guidelines, or private aircraft preferences..."
                        className="w-full bg-[#F5F2EB] border border-[#1A1A1A]/10 p-3 text-xs focus:outline-none"
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#1A1A1A]/10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-[#1A1A1A]/20 text-xs uppercase tracking-wider text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#C5A880] hover:bg-[#9E7E50] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Dispatching to Curator..." : "Submit Consultation Request"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
