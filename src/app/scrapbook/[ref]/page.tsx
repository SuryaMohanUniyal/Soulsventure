import React from "react";
import { ClientScrapbookView } from "@/components/scrapbook/ClientScrapbookView";
import { INITIAL_SCRAPBOOKS } from "@/lib/crmStore";

export function generateStaticParams() {
  return INITIAL_SCRAPBOOKS.map((s) => ({
    ref: s.leadReference.toLowerCase(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <ClientScrapbookView initialRef={ref} />;
}
