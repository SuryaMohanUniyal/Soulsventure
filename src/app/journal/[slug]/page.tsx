import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, ArrowLeft, Volume2, Sparkles, CheckCircle2, User, Globe, Shield } from "lucide-react";
import { JOURNAL_ARTICLES, ITINERARIES } from "@/data/mockData";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Dispatch Not Found | Soulsventure Journal",
    };
  }

  return {
    title: article.title,
    description: article.subtitle || article.excerpt,
    alternates: {
      canonical: `https://soulsventure.com/journal/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.subtitle || article.excerpt,
      url: `https://soulsventure.com/journal/${article.slug}`,
      siteName: "Soulsventure",
      type: "article",
      publishedTime: "2026-10-14T00:00:00.000Z",
      authors: [article.author.name],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function JournalArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedItinerary = article.relatedItinerarySlug
    ? ITINERARIES.find((it) => it.slug === article.relatedItinerarySlug)
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.subtitle || article.excerpt,
    image: article.coverImage,
    datePublished: "2026-10-14T00:00:00.000Z",
    dateModified: "2026-10-24T00:00:00.000Z",
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Soulsventure",
      logo: {
        "@type": "ImageObject",
        url: "https://soulsventure.com/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://soulsventure.com/journal/${article.slug}`,
    },
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Editorial Header */}
      <div className="pt-32 pb-16 max-w-4xl mx-auto px-6 sm:px-8 space-y-6 text-center">
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/60 hover:text-[#C5A880] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dispatches</span>
        </Link>

        <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
          <span>{article.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#1A1A1A]/60">
            <Clock className="w-3 h-3" /> {article.readTime}
          </span>
          <span>•</span>
          <span className="text-[#1A1A1A]/60">{article.date}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-[1.12]">
          {article.title}
        </h1>

        <p className="text-base sm:text-xl text-[#1A1A1A]/75 font-light leading-relaxed max-w-2xl mx-auto">
          {article.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#1A1A1A]/10 max-w-xs mx-auto">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C5A880]">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <span className="font-serif text-sm font-medium text-[#1A1A1A] block">
              {article.author.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block">
              {article.author.role}
            </span>
          </div>
        </div>

        {/* Ambient Soundscape indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F2EB] border border-[#1A1A1A]/10 text-[11px] text-[#1A1A1A]/70">
          <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Field Soundscape: 48kHz Stereo Master recorded on location</span>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-16">
        <div className="relative h-96 sm:h-[540px] w-full overflow-hidden border border-[#1A1A1A]/10 shadow-lg">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Reading Essay Container */}
      <article className="max-w-3xl mx-auto px-6 sm:px-8 pb-24 space-y-10">
        {/* Intro with Drop Cap */}
        <p className="drop-cap text-base sm:text-lg text-[#1A1A1A]/85 font-light leading-relaxed">
          {article.content.intro}
        </p>

        {/* Pull Quote Callout */}
        <blockquote className="my-8 p-8 bg-[#F5F2EB] border-l-2 border-[#C5A880] space-y-2 text-center sm:text-left">
          <p className="font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-snug">
            &ldquo;{article.pullQuote}&rdquo;
          </p>
        </blockquote>

        {/* Essay Sections */}
        {article.content.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-6">
            {section.heading && (
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] pt-4">
                {section.heading}
              </h2>
            )}

            <p className="text-sm sm:text-base text-[#1A1A1A]/80 font-light leading-relaxed">
              {section.text}
            </p>

            {section.image && (
              <figure className="space-y-2 py-4">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden border border-[#1A1A1A]/10">
                  <Image
                    src={section.image}
                    alt={section.caption || "Story visual"}
                    fill
                    className="object-cover"
                  />
                </div>
                {section.caption && (
                  <figcaption className="text-xs text-center text-[#1A1A1A]/50 italic">
                    {section.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        ))}

        {/* Curator's Field Notes & Logistics Summary Box (E-E-A-T & UX) */}
        <div className="my-12 p-8 bg-[#F5F2EB] border border-[#C5A880]/30 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Curator&apos;s Field Intelligence & Logistics
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A]">
            Planning Your Expedition from India
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#1A1A1A]/80 font-light">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
              <span><strong>Flight Connectivity:</strong> Direct long-haul links available from New Delhi (DEL) and Mumbai (BOM) connect effortlessly with private charter transfers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
              <span><strong>Dietary Care:</strong> Pure vegetarian, vegan, and gourmet Jain culinary choreography arranged in advance with private chefs.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
              <span><strong>Visa Concierge:</strong> Soulsventure handles end-to-end documentation, biometric priority scheduling, and VIP airport clearances.</span>
            </li>
          </ul>
        </div>

        {/* Author Bio Card (E-E-A-T) */}
        <div className="p-6 bg-white border border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#C5A880] flex-shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
              About The Author
            </span>
            <h4 className="font-serif text-lg font-medium text-[#1A1A1A]">
              {article.author.name}
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-light">
              Senior Travel Designer at Soulsventure. Leading bespoke expeditions and private aviation routing for discerning patrons across India and Europe.
            </p>
            <div className="pt-2">
              <Link
                href={`/enquire?curator=${encodeURIComponent(article.author.name)}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C5A880] transition-colors underline underline-offset-4"
              >
                Consult with {article.author.name.split(" ")[0]}
              </Link>
            </div>
          </div>
        </div>

        {/* Experience This Story Box */}
        {relatedItinerary && (
          <div className="mt-16 bg-[#F5F2EB] border border-[#1A1A1A]/10 p-8 sm:p-10 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
              Experience This Dispatch In Reality
            </span>
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
              {relatedItinerary.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
              Inspired by this dispatch? This handcrafted journey unlocks the exact private sanctuaries, secret airstrips, and master guides described in this essay.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="font-serif text-lg font-medium text-[#1A1A1A]">
                From ₹{relatedItinerary.priceFromINR.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-sans text-[#1A1A1A]/60 font-light">
                  ({relatedItinerary.durationDays} Days)
                </span>
              </span>
              <Link
                href={`/itineraries/${relatedItinerary.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                <span>Explore Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
