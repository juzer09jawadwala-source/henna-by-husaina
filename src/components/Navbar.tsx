import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Menu, X, Instagram, MessageCircle } from 'lucide-react';

/**
 * Luxury Bridal Atelier Glassmorphism Navbar
 * Features dynamic frosted glass styling, dual-state hero adaptation,
 * refined typography, and floating mobile glass card menu.
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position for glassmorphism density and compacting (rAF throttled, no layout queries)
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 35;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Use IntersectionObserver to track active section with zero layout reflows
  useEffect(() => {
    const sections = ['hero', 'story', 'portfolio', 'packages', 'transformation', 'organic', 'reviews', 'contact'];
    const elements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Story', href: '#story', id: 'story' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Packages', href: '#packages', id: 'packages' },
    { name: 'Transformation', href: '#transformation', id: 'transformation' },
    { name: 'The Living Craft', href: '#organic', id: 'organic' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Floating Outer Wrapper */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-500 ease-out">
        <div
          className={`max-w-7xl mx-auto transition-all duration-500 ease-out pointer-events-auto ${
            isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-6'
          }`}
        >
          {/* Glassmorphic Nav Capsule */}
          <nav
            aria-label="Main Navigation"
            className={`w-full rounded-full transition-all duration-500 ease-out flex items-center justify-between px-5 sm:px-7 ${
              isScrolled
                ? 'py-2.5 sm:py-3 bg-[#FAF7F2]/85 backdrop-blur-xl border border-white/60 shadow-[0_12px_36px_-6px_rgba(26,20,18,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)]'
                : 'py-3.5 sm:py-4 bg-[#1A1412]/20 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.3)]'
            }`}
          >
            {/* Left: Brand Logo & Atelier Identity */}
            <a
              href="#"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-full pr-2"
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isScrolled
                    ? 'bg-gradient-to-br from-[#8B3A2B] to-[#4A1521] text-[#FAF7F2] ring-1 ring-[#8B3A2B]/20 group-hover:scale-105'
                    : 'bg-white/15 backdrop-blur-sm border border-white/30 text-[#D4AF37] group-hover:bg-white/25 group-hover:scale-105'
                }`}
              >
                <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div className="flex flex-col text-left">
                <span
                  className={`font-serif text-xl sm:text-2xl font-normal tracking-wide leading-none transition-colors duration-300 ${
                    isScrolled ? 'text-[#4A1521]' : 'text-[#FAF7F2]'
                  }`}
                >
                  Husaina
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-sans font-medium mt-0.5 transition-colors duration-300 ${
                    isScrolled ? 'text-[#8B3A2B]' : 'text-[#D4AF37]'
                  }`}
                >
                  Mehndi Atelier
                </span>
              </div>
            </a>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`group relative text-[11px] uppercase tracking-[0.2em] font-medium py-1 transition-all duration-200 focus:outline-none focus-visible:text-[#D4AF37] ${
                      isScrolled
                        ? isActive
                          ? 'text-[#4A1521] font-semibold'
                          : 'text-[#1A1412]/75 hover:text-[#4A1521] hover:-translate-y-[1px]'
                        : isActive
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white hover:-translate-y-[1px]'
                    }`}
                  >
                    <span>{link.name}</span>

                    {/* Subtle Gold Active Dot */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                    )}

                    {/* Elegant Gold Hover Underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-[1.5px] rounded-full transition-all duration-300 group-hover:w-full ${
                        isScrolled ? 'bg-[#8B3A2B]' : 'bg-[#D4AF37]'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Right: Social Icon + Luxury Pill CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* WhatsApp Quick Touch */}
              <a
                href="https://wa.me/918591603834"
                target="_blank"
                rel="noreferrer"
                aria-label="Direct WhatsApp Consultation"
                className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center transition-all duration-300 ${
                  isScrolled
                    ? 'text-[#4A1521] bg-[#4A1521]/5 hover:bg-[#8B3A2B]/15 hover:scale-105 border border-[#8B3A2B]/15'
                    : 'text-white bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/25'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Luxury "Book Date" Pill Button */}
              <a
                href="https://wa.me/918591603834?text=Hi%20Husaina,%20I%20would%20like%20to%20book%20a%20mehndi%20consultation!"
                target="_blank"
                rel="noreferrer"
                className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 group overflow-hidden active:scale-95 shadow-md cursor-pointer ${
                  isScrolled
                    ? 'bg-gradient-to-r from-[#4A1521] via-[#631828] to-[#4A1521] text-[#FAF7F2] hover:shadow-lg hover:shadow-[#4A1521]/25 border border-white/20'
                    : 'bg-gradient-to-r from-[#D4AF37] via-[#E5C778] to-[#BA9528] text-[#1A1412] hover:shadow-lg hover:shadow-[#D4AF37]/30 border border-white/40'
                }`}
              >
                {/* Subtle Glass Light Reflection Sheen */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                <Calendar
                  className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12 ${
                    isScrolled ? 'text-[#D4AF37]' : 'text-[#1A1412]'
                  }`}
                />
                <span className="relative z-10 font-sans">Book Date</span>
              </a>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isScrolled
                    ? 'text-[#4A1521] hover:bg-[#4A1521]/10'
                    : 'text-white hover:bg-white/15'
                }`}
                aria-label="Toggle navigation drawer"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Floating Glass Panel Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[105] lg:hidden flex flex-col justify-start px-4 pt-24 sm:pt-28">
          {/* Dimmed backdrop overlay */}
          <div
            className="fixed inset-0 bg-[#1A1412]/40 backdrop-blur-sm transition-opacity duration-300 -z-10"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Floating Glass Card */}
          <div className="w-full max-w-md mx-auto rounded-[32px] bg-[#FAF7F2]/95 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(26,20,18,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] p-7 animate-in fade-in zoom-in-95 duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between pb-5 border-b border-[#8B3A2B]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#4A1521] text-[#FAF7F2] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span className="font-serif text-lg text-[#4A1521]">Husaina Atelier</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-[#4A1521]/60 hover:text-[#4A1521] hover:bg-[#8B3A2B]/10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-xl sm:text-2xl text-[#1A1412] hover:text-[#8B3A2B] transition-colors py-1 flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-sans tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
                    ✦
                  </span>
                </a>
              ))}
            </nav>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-[#8B3A2B]/10 flex flex-col gap-3">
              <a href="https://wa.me/918591603834?text=Hi%20Husaina,%20I%20would%20like%20to%20book%20a%20mehndi%20consultation!" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#4A1521] to-[#6B1724] text-[#FAF7F2] text-xs font-semibold tracking-widest uppercase shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"><Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /><span>Book Your Wedding Date</span></a>

              <div className="flex items-center justify-center gap-4 text-[#8B3A2B] pt-2">
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-[#8B3A2B]/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/918591603834"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full hover:bg-[#8B3A2B]/10 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;



