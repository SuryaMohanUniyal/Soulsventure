import React, { Suspense } from "react";
import { Metadata } from "next";
import EnquiryWizard from "@/components/enquire/EnquiryWizard";

export const metadata: Metadata = {
  title: "Plan Your Bespoke Journey | Confidential Consultation | Soulsventure",
  description:
    "Initiate your confidential luxury travel consultation with Soulsventure's Founders Harsh Sood & Suraj Uniyal in Dehradun, Uttarakhand (+91 8126357353 / +91 9319843524). Tailor-made Indian royal palace circuits, tiger safaris & private aviation.",
  alternates: {
    canonical: "https://soulsventure.com/enquire",
  },
  openGraph: {
    title: "Plan Your Bespoke Journey | Soulsventure Luxury Travel",
    description:
      "Schedule a confidential video or telephone consultation with founders Harsh Sood and Suraj Uniyal in Dehradun, Uttarakhand. Tailored domestic luxury travel across India.",
    url: "https://soulsventure.com/enquire",
    siteName: "Soulsventure",
    type: "website",
  },
};

export default function EnquirePage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-sm font-light">Preparing consultation portal...</div>}>
      <EnquiryWizard />
    </Suspense>
  );
}
