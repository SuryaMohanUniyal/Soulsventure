import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concierge OS | Soulsventure Bespoke Journeys",
  description: "Private Hospitality CRM & Operations System for Soulsventure Founders and Curators.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full max-w-full overflow-x-hidden bg-[#111111] text-[#FDFBF7]">
      {children}
    </div>
  );
}
