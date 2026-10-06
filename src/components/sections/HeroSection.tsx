import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Globe2, ChevronDown } from 'lucide-react';
import { LayoutTextFlip } from '../ui/layout-text-flip';

/**
 * Polished Luxury Bridal Landing Section
 * Balances high-fashion bridal editorial typography with preserved mehndi photo details,
 * restrained cinematic entry choreography, and delicate glass accents.
 */
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle background parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-14 z-10 overflow-hidden"
    >
      {/* Cinematic Background Layer with Subtle Settle & Parallax */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        initial={{ scale: 1.05, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full z-0 origin-center pointer-events-none"
      >
        <picture>
          <source srcSet="/hero-image.webp" type="image/webp" />
          <img
            src="/hero-image.jpg"
            alt="Bespoke Bridal Mehndi Artwork"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </picture>

        {/* Luminous, High-End Vignette & Readability Gradient
            Carefully balanced to showcase image artistry while ensuring text is legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1412]/85 via-[#1A1412]/55 to-[#1A1412]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/90 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(74,21,33,0.35),transparent_65%)]" />
      </motion.div>

      {/* Main Hero Content (Editorial Hierarchy) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto max-w-7xl mx-auto w-full">
        <div className="lg:col-span-12 flex flex-col items-start gap-5 sm:gap-6 text-left">
          
          {/* 1. Thinner, Elegant Glass Capsule Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1A1412]/45 backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] text-[11px] sm:text-xs font-medium text-[#FAF7F2]/90 tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.9)] animate-pulse" />
            <span className="tracking-wide">Bespoke Bridal & Contemporary Henna</span>
            <span className="text-white/30 text-[10px]">|</span>
            <span className="text-[#D4AF37] font-semibold tracking-wider">100% Organic Cones</span>
          </motion.div>

          {/* 2. Headline with Polished Magazine Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl"
          >
            <LayoutTextFlip
              text="Timeless Henna,"
              words={[
                "Reimagined.",
                "for the Modern Bride.",
                "for your Big Day.",
                "for the Minimalist.",
              ]}
            />
          </motion.div>

          {/* 3. Refined Body Copy */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-base md:text-[17px] text-[#FAF7F2]/85 max-w-xl font-light leading-relaxed sm:leading-loose tracking-wide pt-1"
          >
            Handcrafted organic botanical mehndi celebrating your milestone moments. 
            Blending centuries-old intricate Indian & Middle Eastern heritage with chic negative space, 
            personalized love-story motifs, and modern symmetry.
          </motion.p>

          {/* 4. Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-3 w-full sm:w-auto"
          >
            {/* Primary Muted Gold CTA */}
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E2C474] to-[#C49B2E] text-[#1A1412] text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_10px_25px_-5px_rgba(212,175,55,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.5)] active:translate-y-0 transition-all duration-300 group overflow-hidden border border-white/40"
            >
              {/* Subtle Light Reflection Sheen */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              <span className="relative z-10">Reserve Your Date</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412] relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>

            {/* Secondary Frosted Glass CTA */}
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/25 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.18] hover:border-white/50 text-[#FAF7F2] text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
            >
              <span>Explore Signature Work</span>
            </a>
          </motion.div>

          {/* Young Artist Wedding Season Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.52 }}
            className="flex items-center gap-2.5 pt-1 text-xs text-[#FAF7F2]/65 font-light"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Currently accepting bookings for the 2026–2027 Wedding Season</span>
          </motion.div>
        </div>
      </div>

      {/* 5. Bottom Hero Information (Understated Indicators & Scroll Indicator) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pt-6 sm:pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 max-w-7xl mx-auto w-full"
      >
        {/* Understated Feature Indicators */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-10 w-full md:w-auto">
          <div className="flex items-center gap-2.5 group">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:scale-110 duration-200" />
            <span className="text-[11px] sm:text-xs font-medium text-[#FAF7F2]/85 uppercase tracking-[0.16em]">
              Fresh Organic Cones
            </span>
          </div>

          <div className="flex items-center gap-2.5 group">
            <HeartHandshake className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:scale-110 duration-200" />
            <span className="text-[11px] sm:text-xs font-medium text-[#FAF7F2]/85 uppercase tracking-[0.16em]">
              Custom Story Motifs
            </span>
          </div>

          <div className="flex items-center gap-2.5 group">
            <Globe2 className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:scale-110 duration-200" />
            <span className="text-[11px] sm:text-xs font-medium text-[#FAF7F2]/85 uppercase tracking-[0.16em]">
              Worldwide Travel
            </span>
          </div>
        </div>

        {/* Elegant Minimalist Scroll Indicator */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.24em] text-[#FAF7F2]/70 hover:text-[#D4AF37] transition-colors cursor-default select-none pt-1 md:pt-0">
          <span>Scroll to uncover</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
