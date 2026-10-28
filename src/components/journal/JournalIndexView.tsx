"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/data/mockData";

const CATEGORIES = [
  "All Dispatches",
  "Expedition Chronicles",
  "The Art of the Hideaway",
  "Curator Dispatch",
];

export default function JournalIndexView() {
  const [selectedCategory, setSelectedCategory] = useState("All Dispatches");

  const filteredArticles = JOURNAL_ARTICLES.filter((art) => {
    if (selectedCategory === "All Dispatches") return true;
    return art.category === selectedCategory;
  });

  const featured = JOURNAL_ARTICLES[0];

  return (
    <div className="pt-28 pb-32 bg-[#FDFBF7] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Journal Masthead */}
        <div className="border-b border-[#1A1A1A]/10 pb-12 mb-12 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> The Soulsventure Journal • Volume IX
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#1A1A1A] tracking-tight">
            The Art of Travel
          </h1>
          <p className="text-[#1A1A1A]/65 text-sm sm:text-base font-light max-w-xl mx-auto">
            Dispatches from the edges of the world: architectural hideaway reviews, curator essays, and field notes curated for discerning travelers.
          </p>
        </div>

        {/* Featured Cover Story Banner */}
        {featured && (
          <div className="mb-16 border border-[#1A1A1A]/10 bg-white overflow-hidden shadow-lg group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-80 sm:h-[460px] overflow-hidden bg-[#1A1A1A]">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#DFCDAE]">
                  Featured Cover Story
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#1A1A1A]/50">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                      {featured.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featured.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#1A1A1A] leading-tight group-hover:text-[#C5A880] transition-colors">
                    <Link href={`/journal/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-light leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                {/* Author footer */}
                <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C5A880]">
                      <Image
                        src={featured.author.avatar}
                        alt={featured.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-serif text-xs font-medium block">
                        {featured.author.name}
                      </span>
                      <span className="text-[10px] text-[#1A1A1A]/50 block">
                        {featured.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/journal/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] hover:text-[#C5A880] transition-colors"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4 mb-10 overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-[#F5F2EB] text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#EAE5D9]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#1A1A1A]/50 hidden sm:inline font-light">
            {filteredArticles.length} Monograph Dispatches
          </span>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-[#1A1A1A]/10 overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-500"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-[#1A1A1A]">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-white">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#1A1A1A]/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors leading-snug">
                    <Link href={`/journal/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#1A1A1A]/70 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#1A1A1A]/60 font-medium">
                    By {article.author.name}
                  </span>

                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
