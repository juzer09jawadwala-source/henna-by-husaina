import React from 'react';
import { Sparkles, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { ThreeDPhotoCarousel, type CarouselImage } from '@/components/ui/3d-carousel';

// User's authentic henna designs mapped to CarouselImage interface
const CAROUSEL_IMAGES: CarouselImage[] = [
  { id: 'img-1', src: '/design/04cfd49a13704a1538ee4ecbebd18d25.webp', alt: 'Jaipur Royal Bridal Full Arm Pattern', title: 'The Jaipur Heirloom' },
  { id: 'img-2', src: '/design/0b3bee658bdc8c81f6cb50def3f906f8.webp', alt: 'Negative Space Minimalist Cuff & Palms', title: 'Contemporary Cuff' },
  { id: 'img-3', src: '/design/25416a990595de24e0f82ae58dca394c.webp', alt: 'Arabic Shaded Floral Trailing Vine', title: 'Arabic Bloom' },
  { id: 'img-4', src: '/design/2f960168849c101e1a0f092ed97068c0.webp', alt: 'Delicate Wrist Mandala & Fingertip Lace', title: 'Sangeet Delicate Lace' },
  { id: 'img-5', src: '/design/32d50772da5057ee7ffe4f71ae7882e6.webp', alt: 'Traditional Intricate Palms & Story Elements', title: 'Maharani Heritage' },
  { id: 'img-6', src: '/design/36b0dbf2a2ae7785ad8bc813ccca4501.webp', alt: 'Geometric Backhand Finger Architecture', title: 'Minimalist Architecture' },
  { id: 'img-7', src: '/design/bf79b9729b21fe68ad4b454815625e50.webp', alt: 'Royal Feet Mehndi & Anklet Motifs', title: 'Bridal Lotus Feet' },
  { id: 'img-8', src: '/design/c9814ce739621f7fb16825f26a76e73b.webp', alt: 'Bold Shaded Rose & Leaf Garland', title: 'Rose Shaded Garland' },
  { id: 'img-9', src: '/design/f6e8e92c36a63c3b3ad741ee69689db4.webp', alt: 'Delicate Finger Rings & Negative Palms', title: 'Negative Space Palms' },
  { id: 'img-10', src: '/design/f9ab6ad14e7d3b53e880242ea6089383.webp', alt: 'Symmetrical Central Mandala & Cuffs', title: 'The Royal Mandala' },
  { id: 'img-11', src: '/design/fff34cde46f318017a7575556201734a.webp', alt: 'Signature Intricate Bridal Full Arms', title: 'Storybook Bridal' },
  { id: 'img-12', src: '/design/download.webp', alt: 'Botanical Organic Henna Artistry', title: 'Organic Botanicals' },
];

const PACKAGES_DATA = [
  {
    name: 'The Modern Minimalist',
    tagline: 'Intimate Ceremonies & Roka',
    description: 'Chic negative space, delicate wrist cuffs, fingertips, and personalized couple initials.',
    includes: ['Both hands up to mid-forearm', 'Fresh lavender essential oil cones', 'Aftercare balm & seal kit'],
    badge: 'Intimate',
  },
  {
    name: 'The Royal Heirloom',
    tagline: 'Bespoke Traditional Bridal',
    description: 'Elbow-length bespoke storytelling patterns, personalized love silhouettes, and delicate feet motifs.',
    includes: ['Full arms to elbows + Feet design', 'Bespoke sketch preview consultation', 'Luxury stain care kit + 24/7 care support'],
    badge: 'Most Loved',
    highlighted: true,
  },
  {
    name: 'Sangeet & Bridal Party',
    tagline: 'Celebrations & Guests',
    description: 'Speed artistry for bridesmaids and immediate family with clean, elegant party motifs.',
    includes: ['Coverage for up to 12-15 guests', 'Fast-drying organic formula', 'Coordinated artist assistant available'],
    badge: 'Celebration',
  },
];

export const PackagesSection: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col z-10 bg-[#110A0C]">
      {/* 3D Photo Carousel Showcase Stage */}
      <div className="relative w-full overflow-hidden bg-[#110A0C] pt-24 sm:pt-28 pb-24 sm:pb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        
        {/* Header Content */}
        <div className="relative flex flex-col items-center text-center px-6 max-w-3xl mx-auto z-50 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Gallery</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF7F2] font-light drop-shadow-2xl leading-[1.1] mb-4">
            Curated works
          </h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/60 font-light max-w-xl">
            Drag the carousel to rotate and click any image to view details in full screen.
          </p>
        </div>
        
        {/* The 3D Carousel */}
        <ThreeDPhotoCarousel images={CAROUSEL_IMAGES} className="z-20" />
      </div>

      {/* Package Tier Cards Grid (Light Section) */}
      <div className="w-full bg-[#F5EDE4] rounded-t-[40px] px-4 sm:px-8 py-20 relative z-30 shadow-[0_-20px_50px_rgba(17,10,12,0.5)]">
        <div className="max-w-7xl mx-auto">
          {/* Header for packages */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B3A2B] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bespoke Suites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1412] leading-[1.15] mb-3">
              Bridal & Celebration{' '}
              <span className="italic font-normal text-[#4A1521]">Packages.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#1A1412]/75 font-light max-w-xl">
              From intimate Roka ceremonies to full royal bridal storytelling, explore tailored experiences designed for your special day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PACKAGES_DATA.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.highlighted
                    ? 'bg-[#4A1521] text-[#FAF7F2] shadow-2xl scale-[1.02] border-2 border-[#D4AF37]/50'
                    : 'bg-white/85 text-[#1A1412] shadow-md border border-[#8B3A2B]/15 hover:shadow-xl hover:border-[#8B3A2B]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold ${
                      pkg.highlighted
                        ? 'bg-[#D4AF37] text-[#1A1412]'
                        : 'bg-[#FAF7F2] text-[#8B3A2B] border border-[#8B3A2B]/20'
                    }`}
                  >
                    {pkg.badge}
                  </span>
                  <span className="text-xs tracking-wider opacity-60 font-sans">2026-2027</span>
                </div>

                <div className="mb-6">
                  <h3
                    className={`font-serif text-2xl sm:text-3xl font-medium mb-1.5 ${
                      pkg.highlighted ? 'text-[#FAF7F2]' : 'text-[#4A1521]'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p className={`text-xs uppercase tracking-wider font-sans ${pkg.highlighted ? 'text-[#D4AF37]' : 'text-[#8B3A2B]'}`}>
                    {pkg.tagline}
                  </p>
                  <p className={`text-sm mt-3 font-light leading-relaxed ${pkg.highlighted ? 'text-white/80' : 'text-[#1A1412]/75'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-current/10 mb-8">
                  {pkg.includes.map((inc) => (
                    <div key={inc} className="flex items-center gap-2.5 text-xs font-light">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          pkg.highlighted ? 'text-[#D4AF37]' : 'text-[#8B3A2B]'
                        }`}
                      />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent('open-booking-modal', {
                        detail: { package: pkg.name },
                      })
                    );
                  }}
                  className={`w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer ${
                    pkg.highlighted
                      ? 'bg-[#D4AF37] hover:bg-[#E2C068] text-[#1A1412] hover:shadow-lg'
                      : 'bg-[#4A1521] hover:bg-[#6B1724] text-[#FAF7F2] hover:shadow-lg'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Inquire for this Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesSection;

