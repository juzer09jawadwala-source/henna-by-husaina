"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  ArrowRight,
  Flame,
  Feather
} from "lucide-react";

export const CraftVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCinematicMode, setIsCinematicMode] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  // Lazy load video only when user approaches the section (within 600px)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefetchObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          prefetchObserver.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    prefetchObserver.observe(section);
    return () => prefetchObserver.disconnect();
  }, []);

  // Viewport & Tab visibility management: pause offscreen or hidden tabs, resume when visible
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let isSectionVisible = false;

    const playIfAllowed = () => {
      if (isSectionVisible && !userPausedRef.current && document.visibilityState === "visible") {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    const pauseIfActive = () => {
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry.isIntersecting;
        if (isSectionVisible) {
          playIfAllowed();
        } else {
          pauseIfActive();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        pauseIfActive();
      } else if (isSectionVisible) {
        playIfAllowed();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      userPausedRef.current = true;
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const openBookingModal = () => {
    window.dispatchEvent(
      new CustomEvent("open-booking-modal", {
        detail: { package: "The Royal Heirloom" },
      })
    );
  };

  return (
    <section
      ref={sectionRef}
      id="organic"
      className="relative w-full min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#0A0507] text-[#FAF7F2] flex items-center justify-center"
    >
      {/* 1. BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          poster="/mehndi_poster.webp"
          loop
          muted={isMuted}
          playsInline
          preload={isNearViewport ? "auto" : "none"}
          className="w-full h-full object-cover object-center scale-[1.03] filter brightness-[0.92] contrast-[1.05]"
        >
          <source src="/mehndi_video-opt.mp4" type="video/mp4" />
          <source src="/mehndi_video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Multi-Layer Lighting Scrims */}
        {/* Horizontal readability gradient: darker on left where editorial text lives */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 z-10 ${
            isCinematicMode 
              ? "bg-[#0A0507]/25 backdrop-blur-[0px]" 
              : "bg-gradient-to-r from-[#0A0507]/95 via-[#0A0507]/75 to-[#0A0507]/45 md:from-[#0A0507]/92 md:via-[#0A0507]/65 md:to-transparent"
          }`} 
        />

        {/* Top and Bottom soft feathering to blend with adjacent sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0507] via-transparent to-[#0A0507] z-10 pointer-events-none" />

        {/* Ambient warm mahogany & gold radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(74,21,33,0.35),transparent_70%)] z-10 pointer-events-none" />
      </div>

      {/* 2. FLOATING VIDEO CONTROL HUD (Always visible in top right) */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 flex items-center gap-2.5">
        {/* Live indicator badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#110A0C]/75 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] font-sans font-semibold uppercase tracking-widest text-[#D4AF37] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]" />
          <span>Atelier In Motion</span>
        </div>

        {/* Play / Pause toggle */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="p-2.5 sm:p-3 rounded-full bg-[#110A0C]/75 backdrop-blur-md border border-white/20 text-[#FAF7F2] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
        </button>

        {/* Mute / Unmute toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="p-2.5 sm:p-3 rounded-full bg-[#110A0C]/75 backdrop-blur-md border border-white/20 text-[#FAF7F2] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
        </button>

        {/* Cinematic View toggle (hide / show overlay text) */}
        <button
          type="button"
          onClick={() => setIsCinematicMode(!isCinematicMode)}
          aria-label={isCinematicMode ? "Show text content" : "Hide text for cinematic view"}
          className="p-2.5 sm:p-3 rounded-full bg-[#110A0C]/75 backdrop-blur-md border border-white/20 text-[#FAF7F2] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all shadow-lg hover:scale-105 cursor-pointer"
          title={isCinematicMode ? "Show Content" : "Watch Video Only"}
        >
          {isCinematicMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 3. EDITORIAL FOREGROUND CONTENT */}
      <AnimatePresence>
        {!isCinematicMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-28 flex flex-col justify-center"
          >
            <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
              
              {/* Luxury Atelier Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24060E]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.28em] shadow-sm mb-6"
              >
                <Leaf className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>The Living Craft • Botanical Alchemy</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FAF7F2] leading-[1.12] tracking-wide mb-6"
              >
                Where Pure Botanicals{" "}
                <span className="italic font-normal text-[#D4AF37] block sm:inline">
                  Breathe Life Into Skin.
                </span>
              </motion.h2>

              {/* Poetic Narrative Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-base sm:text-lg text-[#FAF7F2]/80 max-w-xl font-light leading-relaxed mb-10"
              >
                Witness the fluid precision of hand-blended Rajasthani henna streaming through a 0.38mm precision tip. Sourced organically from the fertile soils of Sojat and freshly ground with therapeutic essential oils, every stroke is crafted to yield an unforgettable 48-hour deep mahogany stain.
              </motion.p>

              {/* Three Frosted Glass Craft Pillars */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10"
              >
                {/* Pillar 1 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#110A0C]/70 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 transition-colors shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-[#4A1521] text-[#D4AF37] flex items-center justify-center mb-3 border border-[#D4AF37]/30">
                    <Feather className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#FAF7F2] font-normal mb-1">
                    0.38mm Micro Cones
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/65 font-light leading-relaxed">
                    Hand-rolled cellophane tips calibrated for flawless hairline negative spaces.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#110A0C]/70 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 transition-colors shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-[#4A1521] text-[#D4AF37] flex items-center justify-center mb-3 border border-[#D4AF37]/30">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#FAF7F2] font-normal mb-1">
                    Rajasthan Sojat Crop
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/65 font-light leading-relaxed">
                    Triple-sifted organic leaves free from PPD, synthetic dyes, and preservatives.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#110A0C]/70 backdrop-blur-md border border-[#D4AF37]/50 transition-colors shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-[#4A1521] text-[#D4AF37] flex items-center justify-center mb-3 border border-[#D4AF37]/30">
                    <Flame className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#FAF7F2] font-normal mb-1">
                    48-Hr Mahogany Stain
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/65 font-light leading-relaxed">
                    Infused with therapeutic Bulgarian lavender for an opulent dark stain.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
              >
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#D4AF37] text-[#110A0C] font-semibold text-xs uppercase tracking-widest hover:bg-[#F3E2A9] transition-all shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] group cursor-pointer text-center"
                >
                  <span>Inquire for Your Celebration</span>
                  <ArrowRight className="w-4 h-4 text-[#110A0C] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsCinematicMode(true)}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest hover:bg-white/20 transition-colors cursor-pointer text-center"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Cinematic View</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hint when in Cinematic Mode */}
      <AnimatePresence>
        {isCinematicMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 z-30 flex flex-col items-center text-center cursor-pointer pointer-events-auto"
            onClick={() => setIsCinematicMode(false)}
          >
            <div className="px-5 py-2.5 rounded-full bg-[#110A0C]/80 backdrop-blur-md border border-[#D4AF37]/50 text-xs font-serif uppercase tracking-[0.25em] text-[#D4AF37] shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Tap Anywhere to Restore Content</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CraftVideoSection;

