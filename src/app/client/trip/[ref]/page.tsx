import React from "react";
import ClientPortalDashboard from "@/app/client/portal/page";

export function generateStaticParams() {
  return [
    { ref: "mr-sharma" },
    { ref: "sv-2026-vip" },
    { ref: "preview" },
    { ref: "sv-2026-ksh" },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  await params;
  return <ClientPortalDashboard />;
}
