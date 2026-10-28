import React from "react";
import { ClientMoodboardView } from "@/components/moodboard/ClientMoodboardView";
import { INITIAL_MOODBOARDS } from "@/lib/crmStore";

export function generateStaticParams() {
  const list = INITIAL_MOODBOARDS.map((m) => ({
    ref: m.leadReference.toLowerCase(),
  }));
  return list.length > 0 ? list : [{ ref: "preview" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <ClientMoodboardView initialRef={ref} />;
}
