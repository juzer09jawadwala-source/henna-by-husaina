"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface LayoutTextFlipProps {
  text?: string;
  words?: string[];
  duration?: number;
}

export const LayoutTextFlip: React.FC<LayoutTextFlipProps> = ({
  text = "Timeless Henna,",
  words = ["Reimagined.", "for the Modern Bride.", "for your Big Day.", "for the Minimalist."],
  duration = 3200,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-baseline gap-x-4 sm:gap-x-5 gap-y-3 sm:gap-y-4 text-left">
      {/* Editorial Serif Main Line */}
      <motion.span
        layoutId="subtext"
        className="font-serif font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] text-[#FAF7F2] tracking-tight leading-[1.08] drop-shadow-md inline-block"
      >
        {text}
      </motion.span>

      {/* Refined Luxury Editorial Card for Changing Phrase */}
      <motion.span
        layout
        className="relative inline-flex items-center w-fit overflow-hidden rounded-xl sm:rounded-[20px] bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D4AF37]/35 px-4 sm:px-6 py-1.5 sm:py-2.5 font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-normal tracking-tight text-[#4A1521] shadow-[0_12px_32px_-6px_rgba(26,20,18,0.35),inset_0_1px_1px_rgba(255,255,255,0.8)] align-baseline transition-all duration-300"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentIndex}
            initial={{ y: -30, filter: "blur(6px)", opacity: 0 }}
            animate={{
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
            }}
            exit={{ y: 35, filter: "blur(6px)", opacity: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn("inline-block whitespace-nowrap leading-none py-1")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};

export default LayoutTextFlip;

