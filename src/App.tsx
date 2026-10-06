import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StackedSection from './components/StackedSection';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import PortfolioSection from './components/sections/PortfolioSection';
import PackagesSection from './components/sections/PackagesSection';
import TransformationSection from './components/sections/TransformationSection';
import CraftVideoSection from './components/sections/CraftVideoSection';
import ContactSection from './components/sections/ContactSection';
import BookingModal from './components/BookingModal';
import CurtainReveal from './components/CurtainReveal';
import { FlipFadeText } from './components/ui/flip-fade-text';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("The Royal Heirloom");

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      if (e.detail?.package) {
        setSelectedPackage(e.detail.package);
      }
      setBookingModalOpen(true);
    };

    window.addEventListener("open-booking-modal", handleOpenModal);
    return () => window.removeEventListener("open-booking-modal", handleOpenModal);
  }, []);

  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#1A1412] min-h-screen">
      {/* Floating Global Navbar */}
      <Navbar />

      {/* Main Stacked Sections Canvas */}
      <main className="relative w-full">
        {/* SECTION 1: HERO SECTION (Pinned Layer 1) */}
        <StackedSection
          id="hero"
          index={0}
          bgClass="bg-[#FAF7F2] bg-henna-pattern"
          roundedTop={false}
        >
          <HeroSection />
        </StackedSection>

        {/* SECTION 2: THE ARTIST & HER JOURNEY (Layer 2) */}
        <StackedSection
          id="story"
          index={1}
          bgClass="bg-[#F8F4EE]"
          roundedTop={true}
        >
          <AboutSection />
        </StackedSection>

        {/* SECTION 3: SIGNATURE PORTFOLIO (Layer 3) */}
        <StackedSection
          id="portfolio"
          index={2}
          bgClass="bg-[#FAF7F2] bg-henna-pattern"
          roundedTop={true}
          isSticky={false}
          overflowHidden={false}
        >
          <CurtainReveal>
            <PortfolioSection />
          </CurtainReveal>
        </StackedSection>

        {/* NORMAL SCROLLING SECTIONS (No Stacking from Section 4 onwards) */}
        <div className="relative z-30 bg-[#110A0C] rounded-t-[32px] shadow-[0_-20px_40px_rgba(26,20,18,0.4)]">
          {/* SECTION 4: BESPOKE PACKAGES & 3D PHOTO CAROUSEL */}
          <section id="packages">
            <PackagesSection />
          </section>

          {/* INTER-SECTION TRANSITION: FLIP FADE TEXT */}
          <div className="w-full py-20 sm:py-24 bg-[#0A0507] border-y border-[#D4AF37]/25 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <div className="inline-flex items-center gap-2.5 font-serif text-[11px] sm:text-xs font-normal uppercase tracking-[0.3em] text-[#D4AF37] mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Atelier Signatures & Philosophy</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <FlipFadeText
              words={[
                "BESPOKE BRIDAL SUITES",
                "JAIPUR ROYAL HEIRLOOMS",
                "ORGANIC SOJAT BOTANICALS",
                "48-HOUR MAHOGANY STAIN",
                "CONTEMPORARY MINIMALIST",
              ]}
              interval={4500}
              textClassName="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white tracking-[0.16em] sm:tracking-[0.25em] md:tracking-[0.32em] justify-center text-center leading-tight"
            />
            <p className="mt-6 font-serif text-xs sm:text-sm text-[#FAF7F2]/65 font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase max-w-2xl px-4">
              ✦ Handcrafted with pure devotion for your sacred celebrations ✦
            </p>
          </div>

          {/* SECTION: THE SACRED TRANSFORMATION (SCROLL DISSOLVE REVEAL) */}
          <TransformationSection />

          {/* SECTION 5: THE LIVING CRAFT CINEMATIC VIDEO BACKGROUND */}
          <CraftVideoSection />

          {/* SECTION 6: INTERACTIVE BOOKING & DATE RESERVATION */}
          <ContactSection />
        </div>
      </main>

      {/* Global Interactive Booking Modal featuring CalendarWithPresets */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={selectedPackage}
      />
    </div>
  );
};

export default App;
