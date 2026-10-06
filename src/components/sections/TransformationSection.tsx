"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown, CheckCircle2, ArrowRight, Play, Pause } from "lucide-react";
import { ScrollDissolveReveal } from "@/components/ui/scroll-dissolve-reveal";

export const TransformationSection: React.FC = () => {
  const [revealPercent, setRevealPercent] = useState(0);
  const [autoProgress, setAutoProgress] = useState<number | undefined>(undefined);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      setAutoProgress(undefined);
      return;
    }

    setIsAutoPlaying(true);
    let start: number | null = null;
    const duration = 2800; // 2.8s smooth sweep

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      setAutoProgress(progress);
      setRevealPercent(Math.round(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsAutoPlaying(false);
          setAutoProgress(undefined);
        }, 1200);
      }
    };

    requestAnimationFrame(animate);
  };

  const openBookingModal = () => {
    window.dispatchEvent(
      new CustomEvent("open-booking-modal", {
        detail: { package: "The Royal Heirloom" },
      })
    );
  };

  return (
    <section id="transformation" className="relative w-full bg-[#0A0507]">
      <ScrollDissolveReveal
        imageFront="/design/new/no-henna.webp"
        imageBack="/design/new/henna.webp"
        containerClassName="h-[240vh] sm:h-[280vh]"
        className="bg-[#0A0507]"
        manualProgress={autoProgress}
        onProgressChange={(latest) => {
          if (!isAutoPlaying) {
            setRevealPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
          }
        }}
      >
        {/* ATMOSPHERIC LUXURY OVERLAYS */}
        {/* Soft Vignette around canvas edges */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,5,7,0.75)_100%)] z-10" />

        {/* Top Gradient for header readability */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#0A0507] via-[#0A0507]/70 to-transparent z-10 pointer-events-none" />

        {/* Bottom Gradient for footer readability */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0A0507] via-[#0A0507]/85 to-transparent z-10 pointer-events-none" />

        {/* TOP EDITORIAL HEADER (Pinned in sticky viewport) */}
        <div className="absolute top-8 sm:top-12 left-0 right-0 z-20 flex flex-col items-center text-center px-4 pointer-events-none">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A060E]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-serif text-[11px] sm:text-xs uppercase tracking-[0.28em] shadow-lg mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Sacred Transformation • Before & After</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#FAF7F2] tracking-wide leading-tight drop-shadow-md">
            From Pure Canvas to{" "}
            <span className="italic font-normal text-[#D4AF37]">
              Royal Heirloom.
            </span>
          </h2>
        </div>

        {/* BOTTOM HUD / TRANSFORMATION STATUS & PROGRESS */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 flex flex-col items-center px-4 pointer-events-auto">
          {/* Dynamic Status Capsule */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 py-3.5 rounded-2xl sm:rounded-full bg-[#110A0C]/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] max-w-xl w-full sm:w-auto">
            {/* Stage Text */}
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              {revealPercent >= 90 ? (
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
              )}
              <span className="font-serif text-sm sm:text-base text-[#FAF7F2] tracking-wider">
                {revealPercent < 20 && "1. The Bare Canvas (Pristine Unadorned Skin)"}
                {revealPercent >= 20 && revealPercent < 85 && "2. Organic Henna Infusion • Intricate Bridal Etching..."}
                {revealPercent >= 85 && "3. Completed Heirloom • The Sacred Bridal Adornment"}
              </span>
            </div>

            {/* Progress indicator + Auto Play button */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-16 sm:w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E2A9] transition-all duration-150 rounded-full"
                  style={{ width: `${revealPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-sans font-semibold text-[#D4AF37] tracking-wider min-w-[32px]">
                {revealPercent}%
              </span>

              {/* Auto Play / Pause Toggle */}
              <button
                type="button"
                onClick={toggleAutoPlay}
                aria-label={isAutoPlaying ? "Pause Auto-Reveal" : "Play Auto-Reveal"}
                title={isAutoPlaying ? "Pause Auto-Reveal" : "Play Auto-Reveal"}
                className="p-1.5 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#110A0C] text-[#FAF7F2] transition-colors border border-white/15 cursor-pointer"
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
              </button>
            </div>
          </div>

          {/* Interactive Hint / Booking CTA when complete */}
          <div className="mt-4 flex items-center justify-center">
            {revealPercent >= 85 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A1521] text-[#FAF7F2] border border-[#D4AF37]/50 font-serif text-xs uppercase tracking-[0.25em] shadow-lg hover:bg-[#6B1724] transition-all cursor-pointer"
                >
                  <span>Reserve This Bridal Adornment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
                <span className="text-[11px] text-[#FAF7F2]/60 font-serif uppercase tracking-widest hidden sm:inline">
                  ✦ Scroll ahead for living craft
                </span>
              </motion.div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/60 font-serif uppercase tracking-[0.25em]">
                <span>Scroll to Reveal Henna</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
              </div>
            )}
          </div>
        </div>
      </ScrollDissolveReveal>
    </section>
  );
};

export default TransformationSection;

