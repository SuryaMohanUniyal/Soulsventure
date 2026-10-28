import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SoulsVenture Concierge OS | Luxury Admin & Booking CRM",
  description: "Executive dark-mode management platform and high-net-worth CRM for SoulsVenture bespoke travel agency.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#111111] text-[#FDFBF7] antialiased selection:bg-[#C5A059] selection:text-black">
      {children}
    </div>
  );
}
