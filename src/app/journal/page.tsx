import React from "react";
import { Metadata } from "next";
import JournalIndexView from "@/components/journal/JournalIndexView";
import { JOURNAL_ARTICLES } from "@/data/mockData";

export const metadata: Metadata = {
  title: "The Editorial Journal & Field Dispatches",
  description:
    "Dispatches from the world's most remote sanctums. Architectural hideaway reviews, curator essays, and field notes curated for discerning luxury travelers.",
  alternates: {
    canonical: "https://soulsventure.com/journal",
  },
  openGraph: {
    title: "The Soulsventure Journal | Luxury Travel Essays",
    description:
      "Field notes and architectural dispatches from the world's most secluded sanctums. Written by our senior travel designers.",
    url: "https://soulsventure.com/journal",
    siteName: "Soulsventure",
    type: "website",
  },
};

export default function JournalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Soulsventure Journal",
    description: "Curated essays, expedition chronicles, and luxury travel intelligence.",
    url: "https://soulsventure.com/journal",
    blogPost: JOURNAL_ARTICLES.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      image: article.coverImage,
      datePublished: "2026-10-14",
      author: {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.role,
      },
      url: `https://soulsventure.com/journal/${article.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalIndexView />
    </>
  );
}
