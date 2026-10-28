"use client";

import React from "react";

interface SoulsventureLogoProps {
  isScrolled?: boolean;
  variant?: "horizontal" | "stacked" | "icon-only";
  textVariant?: "venture" | "soulsventure";
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Creative "Soul & Venture" Emblem
 * An original, luxury bespoke mark combining:
 * 1. The ethereal Spirit / Soul ribbon (an ascending, fluid "S" flame)
 * 2. The North Star / Expedition Compass needle pointing forward to horizons
 * 3. A delicate celestial orbital meridian ring with 4 cardinal points
 */
export function CreativeSoulMark({
  className = "w-9 h-9",
  isScrolled = false,
}: {
  className?: string;
  isScrolled?: boolean;
}) {
  const primaryStroke = isScrolled ? "#1A1A1A" : "#FFFFFF";
  const accentGold = "#C5A880";
  const lightGold = isScrolled ? "#9E7E50" : "#DFCDAE";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Soulsventure Emblem"
    >
      <defs>
        {/* Soft subtle metallic gradient */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFCDAE" />
          <stop offset="50%" stopColor="#C5A880" />
          <stop offset="100%" stopColor="#9E7E50" />
        </linearGradient>

        <linearGradient id="spiritGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentGold} />
          <stop offset="60%" stopColor={primaryStroke} />
          <stop offset="100%" stopColor={lightGold} />
        </linearGradient>
      </defs>

      {/* 1. Delicate Celestial Meridian / Horizon Ring */}
      <circle
        cx="32"
        cy="32"
        r="28.5"
        stroke={accentGold}
        strokeWidth="1.2"
        strokeOpacity={isScrolled ? "0.45" : "0.55"}
      />
      
      {/* Inner fine concentric orbit */}
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke={primaryStroke}
        strokeWidth="0.6"
        strokeDasharray="2 3"
        strokeOpacity={isScrolled ? "0.25" : "0.35"}
      />

      {/* 2. Cardinal Compass Coordinates (N, S, E, W facets) */}
      {/* North Arrow / Pointer */}
      <polygon points="32,2 34,7 32,9 30,7" fill="url(#goldGradient)" />
      {/* South Arrow */}
      <polygon points="32,62 34,57 32,55 30,57" fill="url(#goldGradient)" />
      {/* East Accent */}
      <polygon points="62,32 57,34 55,32 57,30" fill="url(#goldGradient)" />
      {/* West Accent */}
      <polygon points="2,32 7,34 9,32 7,30" fill="url(#goldGradient)" />

      {/* 3. The Ascending Soul Flame / Winged 'S' Ribbon */}
      {/* Primary Fluid Ribbon: curves like an elegant Spirit in flight */}
      <path
        d="
          M 32 10
          C 37 10, 46 16, 44 26
          C 42 34, 25 32, 23 41
          C 21 49, 31 52, 38 50
          C 43 49, 45 45, 45 42
        "
        stroke="url(#spiritGradient)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secondary Complementary Horizon Arc: creates the dimensional dual-soul essence */}
      <path
        d="
          M 20 22
          C 20 18, 24 14, 29 13
          M 35 51
          C 40 51, 46 47, 46 39
          C 46 33, 39 31, 35 29
        "
        stroke={accentGold}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />

      {/* 4. The Cardinal Compass Star in the Soul's Heart */}
      <g transform="translate(32, 32)">
        {/* Vertical Needle */}
        <polygon points="0,-12 2.2,-2 0,0 -2.2,-2" fill={accentGold} />
        <polygon points="0,12 2.2,2 0,0 -2.2,2" fill={accentGold} opacity="0.75" />
        {/* Horizontal Needle */}
        <polygon points="12,0 2,2.2 0,0 2,-2.2" fill={accentGold} opacity="0.85" />
        <polygon points="-12,0 -2,2.2 0,0 -2,-2.2" fill={accentGold} opacity="0.75" />
        {/* Center Brilliant Core */}
        <circle cx="0" cy="0" r="2" fill={primaryStroke} />
      </g>
    </svg>
  );
}

export default function SoulsventureLogo({
  isScrolled = false,
  variant = "horizontal",
  textVariant = "venture",
  className = "",
  size = "md",
}: SoulsventureLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7 sm:w-8 sm:h-8",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const titleSizes = {
    sm: "text-base sm:text-lg tracking-[0.24em]",
    md: "text-lg sm:text-xl lg:text-2xl tracking-[0.26em]",
    lg: "text-2xl sm:text-3xl lg:text-4xl tracking-[0.28em]",
  };

  const sloganSizes = {
    sm: "text-[8px] sm:text-[9px] tracking-[0.3em]",
    md: "text-[9px] sm:text-[10px] tracking-[0.32em]",
    lg: "text-[11px] sm:text-[12px] tracking-[0.35em]",
  };

  if (variant === "icon-only") {
    return <CreativeSoulMark className={iconSizes[size]} isScrolled={isScrolled} />;
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center group cursor-pointer ${className}`}>
        <CreativeSoulMark
          className={`${iconSizes[size]} mb-2 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500`}
          isScrolled={isScrolled}
        />
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif font-light uppercase ${titleSizes[size]} transition-colors ${
              isScrolled ? "text-[#1A1A1A]" : "text-white"
            }`}
          >
            {textVariant === "venture" ? "VENTURE" : "SOULSVENTURE"}
          </span>
        </div>
        <span
          className={`font-sans uppercase font-medium ${sloganSizes[size]} mt-1 transition-colors ${
            isScrolled ? "text-[#C5A880]" : "text-[#DFCDAE]"
          }`}
        >
          BESPOKE JOURNEYS
        </span>
      </div>
    );
  }

  // Horizontal Lockup: [LOGO] + VENTURE | BESPOKE JOURNEYS
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group cursor-pointer ${className}`}>
      {/* 1. Creative Soul & Compass Emblem */}
      <CreativeSoulMark
        className={`${iconSizes[size]} flex-shrink-0 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500`}
        isScrolled={isScrolled}
      />

      {/* 2. Text Lockup: VENTURE | BESPOKE JOURNEYS */}
      <div className="flex items-center gap-2.5 sm:gap-3 leading-none">
        {/* Brand Main Wordmark */}
        <span
          className={`font-serif font-light uppercase ${titleSizes[size]} transition-colors ${
            isScrolled
              ? "text-[#1A1A1A] group-hover:text-[#C5A880]"
              : "text-white group-hover:text-[#DFCDAE]"
          }`}
        >
          {textVariant === "venture" ? "VENTURE" : "SOULSVENTURE"}
        </span>

        {/* Vertical Divider & Tagline */}
        <div
          className={`hidden sm:inline-flex items-center pl-2.5 sm:pl-3 border-l transition-colors ${
            isScrolled ? "border-[#1A1A1A]/20" : "border-white/20"
          }`}
        >
          <span
            className={`font-sans uppercase font-medium ${sloganSizes[size]} transition-colors whitespace-nowrap ${
              isScrolled ? "text-[#1A1A1A]/60" : "text-white/70"
            }`}
          >
            BESPOKE JOURNEYS
          </span>
        </div>
      </div>
    </div>
  );
}
