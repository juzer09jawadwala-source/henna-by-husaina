import React from 'react';
import { Sparkles, Heart, Leaf, Award, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[100svh] flex flex-col justify-between py-16 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Subtle background ambient accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#8B3A2B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="flex items-center justify-between border-b border-[#8B3A2B]/10 pb-6 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B3A2B]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Artist & Her Journey</span>
        </div>
        <span className="text-xs uppercase tracking-widest text-[#1A1412]/50 font-medium">
          Chapter 01
        </span>
      </div>

      {/* Main Two-Column Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center flex-1 my-auto">
        {/* Left Column: Portrait & Visual Storytelling */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white/90 group">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
              alt="Young Mehndi Artist at work"
              width={450}
              height={600}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/hero-image.webp';
              }}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Rich gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/85 via-transparent to-transparent" />

            {/* Floating Quote Badge on Image */}
            <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#8B3A2B]/20 shadow-lg text-[#1A1412]">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#8B3A2B] shrink-0 mt-0.5" />
                <p className="font-serif italic text-sm text-[#4A1521] leading-relaxed">
                  "Every stroke tells the story of who you are, where you've been, and the beautiful milestone you're stepping into."
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[#8B3A2B]/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1A1412] tracking-wide">Zahra Parveen</span>
                <span className="text-[10px] uppercase tracking-wider text-[#8B3A2B]">Founder & Artist</span>
              </div>
            </div>
          </div>

          {/* Floating Pill Badge */}
          <div className="hidden sm:flex absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl bg-[#4A1521] text-[#FAF7F2] shadow-xl items-center gap-3 border border-[#D4AF37]/40">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#FAF7F2]/70">Artisanal Cone Batch</p>
              <p className="text-xs font-semibold text-[#D4AF37]">Fresh Rajasthani Sojat Henna</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, Philosophy & Milestones */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8B3A2B] font-semibold">
              The Soul Behind The Cone
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1412] leading-[1.15]">
              Honoring Heritage,{' '}
              <span className="italic font-normal text-[#4A1521]">
                Crafting New Memories.
              </span>
            </h2>
          </div>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-[#1A1412]/80 font-light leading-relaxed">
            <p>
              Growing up, I was mesmerized by the intoxicating scent of wedding henna and the quiet magic of seeing family hands adorned with intricate lace. But as a new generation of brides emerged, I realized they craved something more intentional.
            </p>
            <p className="text-sm sm:text-base text-[#1A1412]/75">
              Today's brides don't just want dense traditional patterns—they want designs that breathe. They want delicate wrist cuffs, negative-space florals, hidden wedding vows, and skylines that commemorate where they met their partner.
            </p>
            <p className="text-sm sm:text-base text-[#1A1412]/75">
              I prepare every single henna cone by hand using triple-sifted organic Sojat leaves, soothing Bulgarian lavender oil, and eucalyptus. No synthetic chemicals, no artificial dyes—just pure, deep-staining, botanical artistry.
            </p>
          </div>

          {/* Three Key Pillars / Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#8B3A2B]/10">
            <div className="p-4 rounded-2xl bg-white/70 border border-[#8B3A2B]/15 shadow-sm">
              <div className="flex items-center gap-2 mb-1 text-[#8B3A2B]">
                <Leaf className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">100% Organic</span>
              </div>
              <p className="font-serif text-lg font-semibold text-[#4A1521]">Zero Chemicals</p>
              <p className="text-xs text-[#1A1412]/60 mt-1">Safe for the most sensitive bridal skin.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-[#8B3A2B]/15 shadow-sm">
              <div className="flex items-center gap-2 mb-1 text-[#8B3A2B]">
                <Award className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Bespoke Motifs</span>
              </div>
              <p className="font-serif text-lg font-semibold text-[#4A1521]">Custom Storytelling</p>
              <p className="text-xs text-[#1A1412]/60 mt-1">Initials, pet silhouettes & love quotes.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-[#8B3A2B]/15 shadow-sm">
              <div className="flex items-center gap-2 mb-1 text-[#8B3A2B]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Calm Sessions</span>
              </div>
              <p className="font-serif text-lg font-semibold text-[#4A1521]">Bride-First Care</p>
              <p className="text-xs text-[#1A1412]/60 mt-1">Gentle, unrushed wedding appointments.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtext */}
      <div className="pt-8 border-t border-[#8B3A2B]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1A1412]/60 gap-3">
        <span>Based in the city & available for worldwide destination bookings</span>
        <a href="#portfolio" className="text-[#8B3A2B] font-semibold hover:underline flex items-center gap-1">
          Continue to Signature Portfolio →
        </a>
      </div>
    </div>
  );
};

export default AboutSection;
