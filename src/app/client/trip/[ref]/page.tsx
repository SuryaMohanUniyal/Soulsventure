import React from "react";
import ClientPortalDashboard from "@/app/client/portal/page";

export function generateStaticParams() {
  return [
    { ref: "preview" },
    { ref: "bespoke" },
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
