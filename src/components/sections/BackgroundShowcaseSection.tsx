import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * Full-viewport parallax scroll section showcasing background images.
 * Each image fills the entire section with text overlays that animate in on scroll.
 */

const slides = [
  {
    image: '/background/bg-1.jpg',
    subtitle: 'The Art of Mehndi',
    title: 'Every Line Tells a Story',
    description: 'Where tradition meets timeless beauty — handcrafted patterns that speak of love, devotion, and celebration.',
  },
  {
    image: '/background/bg-2.jpg',
    subtitle: 'Bridal Couture',
    title: 'Adorned in Henna & Gold',
    description: 'The bride\'s hands become a canvas of heritage, each motif carrying the blessings of generations.',
  },
  {
    image: '/background/bg-5.png',
    subtitle: 'Sacred Celebrations',
    title: 'Together in Tradition',
    description: 'From sangeet to shaadi — every hand tells a chapter of the journey.',
  },
  {
    image: '/background/bg-6.png',
    subtitle: 'Botanical Precision',
    title: 'Nature Woven Into Skin',
    description: 'Organic patterns inspired by blooming gardens, flowing rivers, and ancient paisley artistry.',
  },
  {
    image: '/background/bg-7.png',
    subtitle: 'Regal Heritage',
    title: 'The Maharani Collection',
    description: 'Opulent full-arm compositions fit for royalty — where every curve is a crown.',
  },
  {
    image: '/background/bg-3.jpg',
    subtitle: 'Extreme Detail',
    title: 'Precision in Every Stroke',
    description: 'Micro-fine linework that transforms hands into living tapestries of art.',
  },
  {
    image: '/background/bg-8.jpg',
    subtitle: 'Cultural Tapestry',
    title: 'Woven With Love',
    description: 'Inspired by the rich textile heritage of India — henna as intricate as Kashmiri carpets.',
  },
  {
    image: '/background/bg-4.jpg',
    subtitle: 'Close-Up Artistry',
    title: 'The Fine Details',
    description: 'Zooming into the mastery — where botanical precision meets creative expression.',
  },
  {
    image: '/background/bg-9.jpg',
    subtitle: 'Signature Stain',
    title: 'Deep Mahogany Perfection',
    description: 'Triple-sifted Sojat leaves, Bulgarian lavender oil — a stain that speaks for itself.',
  },
  {
    image: '/background/bg-10.jpg',
    subtitle: 'Modern Elegance',
    title: 'Contemporary Meets Classic',
    description: 'Blending modern minimalism with traditional intricacy for the discerning bride.',
  },
  {
    image: '/background/bg-11.jpg',
    subtitle: 'The Final Reveal',
    title: 'Your Story, Our Canvas',
    description: 'Every celebration deserves to be remembered — let your hands hold the memory.',
  },
];

/** A single full-viewport parallax slide */
const ParallaxSlide: React.FC<{
  slide: typeof slides[0];
  index: number;
}> = ({ slide, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax effect: background moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);

  // Text animations stagger based on scroll position within this slide
  const textY = useTransform(scrollYProgress, [0.1, 0.35], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.85], [0, 1, 1, 0]);
  const subtitleX = useTransform(scrollYProgress, [0.05, 0.3], [-40, 0]);
  const descY = useTransform(scrollYProgress, [0.15, 0.4], [60, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.85], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y, scale }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </motion.div>

      {/* Dark gradient overlay for text readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
        style={{ opacity }}
      />

      {/* Text Content */}
      <div className={`absolute inset-0 flex flex-col justify-end pb-16 sm:pb-24 md:pb-32 px-6 sm:px-10 md:px-20 lg:px-28 ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
        {/* Subtitle */}
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          style={{ opacity: textOpacity, x: subtitleX }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            {slide.subtitle}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-4 sm:mb-6 max-w-3xl"
          style={{ y: textY, opacity: textOpacity }}
        >
          {slide.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="font-sans text-sm sm:text-base md:text-lg text-white/80 font-light max-w-xl leading-relaxed"
          style={{ y: descY, opacity: descOpacity }}
        >
          {slide.description}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className={`mt-6 sm:mt-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent ${isEven ? 'w-32 sm:w-48' : 'w-32 sm:w-48 bg-gradient-to-l'}`}
          style={{ opacity: textOpacity }}
        />
      </div>
    </div>
  );
};

export const BackgroundShowcaseSection: React.FC = () => {
  return (
    <section id="showcase" className="relative w-full bg-black">
      {/* Section Intro */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <img
          src="/background/bg-1.jpg"
          alt="Showcase intro"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              The Husaina Experience
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] max-w-5xl"
          >
            A Journey Through
            <br />
            <span className="italic text-[#D4AF37]">Sacred Artistry</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 font-sans text-sm sm:text-base text-white/60 font-light tracking-wide max-w-lg"
          >
            Scroll to immerse yourself in the world of Husaina Mehndi Atelier
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Parallax Image Slides */}
      {slides.slice(1).map((slide, index) => (
        <ParallaxSlide key={index} slide={slide} index={index} />
      ))}
    </section>
  );
};

export default BackgroundShowcaseSection;
