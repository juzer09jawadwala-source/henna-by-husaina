import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StackedSectionProps {
  id?: string;
  index: number;
  totalSections?: number;
  children: React.ReactNode;
  className?: string;
  bgClass?: string;
  roundedTop?: boolean;
  isSticky?: boolean;
  overflowHidden?: boolean;
}

export const StackedSection: React.FC<StackedSectionProps> = ({
  id,
  index,
  children,
  className = '',
  bgClass = 'bg-[#FAF7F2]',
  roundedTop = true,
  isSticky = true,
  overflowHidden = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for subtle Apple-style depth scale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Previous section subtly shrinks and dims slightly as next sheet slides over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.96, 0.9]);
  const filter = useTransform(scrollYProgress, [0, 1], ['brightness(100%)', 'brightness(94%)']);

  // Dynamic z-index so every subsequent section stacks cleanly over previous ones
  const zIndex = 10 + index * 10;
  const isFirst = index === 0;

  return (
    <div
      ref={containerRef}
      id={id}
      style={{ zIndex }}
      className={`${isSticky ? 'sticky top-0' : 'relative'} w-full min-h-[100svh] ${className}`}
    >
      <motion.div
        style={{
          scale: isFirst ? scale : undefined,
          opacity: isFirst ? opacity : undefined,
          filter: isFirst ? filter : undefined,
          transformOrigin: 'center top',
        }}
        className={`w-full min-h-[100svh] ${bgClass} ${
          !isFirst && roundedTop
            ? 'rounded-t-[28px] md:rounded-t-[36px] shadow-[0_-20px_50px_rgba(26,20,18,0.18)] border-t border-white/20'
            : ''
        } relative ${overflowHidden ? 'overflow-hidden' : ''} flex flex-col justify-between transition-shadow duration-300`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StackedSection;

