import React from "react";
import { ClientScrapbookView } from "@/components/scrapbook/ClientScrapbookView";
import { INITIAL_SCRAPBOOKS } from "@/lib/crmStore";

export function generateStaticParams() {
  const list = INITIAL_SCRAPBOOKS.map((s) => ({
    ref: s.leadReference.toLowerCase(),
  }));
  return list.length > 0 ? list : [{ ref: "preview" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <ClientScrapbookView initialRef={ref} />;
}
