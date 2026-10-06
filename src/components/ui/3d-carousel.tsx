"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  useReducedMotion,
  animate,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface ThreeDPhotoCarouselProps {
  images: CarouselImage[];
  className?: string;
  autoRotateSpeed?: number;
}

export function ThreeDPhotoCarousel({
  images,
  className,
  autoRotateSpeed = 0.12,
}: ThreeDPhotoCarouselProps) {
  const [activeImage, setActiveImage] = useState<CarouselImage | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interaction tracking
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const pointerStartX = useRef(0);
  const hasDragged = useRef(false);
  const lastVelocity = useRef(0);
  const lastMoveTime = useRef(0);

  // Guarantee minimum 6 cards to maintain a beautiful 3D cylinder
  const displayImages = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    let items = [...images];
    let dupCount = 0;
    while (items.length > 0 && items.length < 8) {
      items = [
        ...items,
        ...images.map((img) => ({
          ...img,
          id: `${img.id}-dup-${dupCount++}`,
        })),
      ];
    }
    return items;
  }, [images]);

  const numItems = displayImages.length;
  const angleStep = 360 / Math.max(numItems, 1);

  // Responsive portrait card dimensions matching henna photography
  // Standard bridal photography is ~3:4 / 4:5 vertical
  const [dimensions, setDimensions] = useState({ cardWidth: 320, cardHeight: 450, radius: 660 });

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      
      // Tall, elegant portrait proportions so hands & wrists are never cut off
      const cardWidth = isMobile ? 84 : isTablet ? 108 : 132;
      const cardHeight = isMobile ? 118 : isTablet ? 152 : 184;
      
      // Calculate cylinder radius with a tailored comfortable gap (~25px)
      const gap = isMobile ? 7 : 11;
      const chord = cardWidth + gap;
      const calculatedRadius = Math.max(
        isMobile ? 152 : 216,
        Math.round(chord / (2 * Math.sin(Math.PI / Math.max(numItems, 1))))
      );

      setDimensions({ cardWidth, cardHeight, radius: calculatedRadius });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [numItems]);

  // Pause rotation when offscreen or in background tab
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "150px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Buttery smooth 60fps auto-rotation loop with delta-time normalization
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const rotate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 16.67, 2.5); // Normalize to 60Hz frame time
      lastTime = currentTime;

      if (!isDragging.current && !isHovered.current && !activeImage && document.visibilityState === "visible") {
        rotation.set(rotation.get() - autoRotateSpeed * dt);
      }
      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoRotateSpeed, activeImage, prefersReducedMotion, rotation, isInView]);

  // Pointer drag event handlers with momentum
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    pointerStartX.current = e.clientX;
    lastVelocity.current = 0;
    lastMoveTime.current = performance.now();
    rotation.stop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - pointerStartX.current;
    
    if (Math.abs(deltaX) > 4) {
      hasDragged.current = true;
    }

    const now = performance.now();
    const timeDelta = now - lastMoveTime.current;
    if (timeDelta > 0) {
      lastVelocity.current = (deltaX / timeDelta) * 15;
    }
    lastMoveTime.current = now;

    // Direct, highly-responsive angle modification
    const sensitivity = window.innerWidth < 640 ? 0.35 : 0.28;
    rotation.set(rotation.get() + deltaX * sensitivity);
    pointerStartX.current = currentX;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Apply smooth momentum if user gave it a flick
    if (!prefersReducedMotion && Math.abs(lastVelocity.current) > 2) {
      const current = rotation.get();
      const target = current + lastVelocity.current * 8;
      animate(rotation, target, {
        type: "spring",
        damping: 30,
        stiffness: 60,
        restDelta: 0.01,
      });
    }
  };

  // Step navigation via buttons or keyboard
  const step = useCallback(
    (direction: 1 | -1) => {
      const current = rotation.get();
      rotation.stop();
      // Snap to nearest target card index
      const target = Math.round((current + direction * angleStep) / angleStep) * angleStep;
      animate(rotation, target, {
        type: "spring",
        damping: 26,
        stiffness: 70,
      });
    },
    [rotation, angleStep]
  );

  // Keyboard navigation & accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImage) {
        if (e.key === "Escape") {
          e.preventDefault();
          setActiveImage(null);
        }
        return;
      }
      if (e.key === "ArrowLeft") step(1);
      if (e.key === "ArrowRight") step(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, step]);

  // Modal scroll locking
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  if (numItems === 0) {
    return <div className="p-8 text-center text-white/50">No images provided.</div>;
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex flex-col items-center justify-center select-none",
        className
      )}
      ref={containerRef}
    >
      {/* 3D Cylindrical Stage */}
      <div
        className="relative w-full h-[200px] sm:h-[260px] md:h-[310px] lg:h-[330px] flex items-center justify-center cursor-grab active:cursor-grabbing [perspective:1400px] sm:[perspective:1800px] md:[perspective:2100px] touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseEnter={() => {
          isHovered.current = true;
        }}
        onMouseLeave={() => {
          isHovered.current = false;
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="3D Cylindrical Photo Gallery"
      >
        <motion.div
          className="relative [transform-style:preserve-3d] flex items-center justify-center"
          style={{
            width: dimensions.cardWidth,
            height: dimensions.cardHeight,
            rotateY: rotation,
          }}
        >
          {displayImages.map((img, i) => {
            const itemAngle = i * angleStep;
            return (
              <div
                key={img.id}
                className="absolute inset-0 rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-white/10 bg-[#1A1412] [backface-visibility:visible] transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  width: dimensions.cardWidth,
                  height: dimensions.cardHeight,
                  transform: `rotateY(${itemAngle}deg) translateZ(${dimensions.radius}px)`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Only open if the user clicked without dragging
                  if (!hasDragged.current) {
                    setActiveImage(img);
                  }
                }}
              >
                {/* STRICTLY SINGLE IMAGE PER CARD — exactly as in reference */}
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Accessible Navigation & Visual Guidance */}
      <div className="mt-8 sm:mt-12 flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-6 z-20 pointer-events-auto px-4 max-w-full">
        <button
          onClick={() => step(1)}
          className="p-2.5 sm:p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-[#FAF7F2] backdrop-blur-md transition-all border border-white/10 hover:border-[#D4AF37]/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[9px] sm:text-xs font-sans tracking-wider sm:tracking-[0.2em] uppercase text-[#D4AF37]/80 font-medium text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>Drag to explore • Click to expand</span>
        </div>

        <button
          onClick={() => step(-1)}
          className="p-2.5 sm:p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-[#FAF7F2] backdrop-blur-md transition-all border border-white/10 hover:border-[#D4AF37]/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Animated Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title || "Expanded henna design preview"}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 sm:-top-12 sm:right-0 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                onClick={() => setActiveImage(null)}
                aria-label="Close preview"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.img
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 15 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />

              {activeImage.title && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 px-6 py-3 rounded-full bg-[#1A1412]/80 backdrop-blur-md text-[#FAF7F2] border border-white/10 text-center"
                >
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#FAF7F2]">
                    {activeImage.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider text-[#D4AF37] mt-0.5">
                    {activeImage.alt}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
