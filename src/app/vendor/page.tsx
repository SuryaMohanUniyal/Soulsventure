"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getVendorAuthSession } from "@/lib/crmStore";

export default function VendorIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getVendorAuthSession();
    if (session) {
      router.replace("/vendor/portal");
    } else {
      router.replace("/vendor/login");
    }
  }, [router]);

  return null;
}
