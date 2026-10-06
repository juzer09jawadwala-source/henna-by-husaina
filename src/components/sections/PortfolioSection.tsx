import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ZoomIn, X, ArrowRight } from 'lucide-react';

// Portfolio Data
const categories = ['All Works', 'Royal Bridal', 'Contemporary Minimalist', 'Arabic & Indo-Western', 'Sangeet Party'];

const portfolioItems = [
  {
    id: 1,
    title: 'The Jaipur Heirloom Full Arms',
    category: 'Royal Bridal',
    image: '/design/04cfd49a13704a1538ee4ecbebd18d25.jpg',
    webp: '/design/04cfd49a13704a1538ee4ecbebd18d25.webp',
    thumb: '/design/04cfd49a13704a1538ee4ecbebd18d25-thumb.webp',
    description: 'Full traditional arms featuring reverse negative space and intricate bridal figures.',
  },
  {
    id: 2,
    title: 'Modern Floating Vine',
    category: 'Contemporary Minimalist',
    image: '/design/0b3bee658bdc8c81f6cb50def3f906f8.jpg',
    webp: '/design/0b3bee658bdc8c81f6cb50def3f906f8.webp',
    thumb: '/design/0b3bee658bdc8c81f6cb50def3f906f8-thumb.webp',
    description: 'A delicate, airy vine focusing on the index finger and backhand spacing.',
  },
  {
    id: 3,
    title: 'Arabic Shaded Floral Trailing Vine',
    category: 'Arabic & Indo-Western',
    image: '/design/25416a990595de24e0f82ae58dca394c.jpg',
    webp: '/design/25416a990595de24e0f82ae58dca394c.webp',
    thumb: '/design/25416a990595de24e0f82ae58dca394c-thumb.webp',
    description: 'Thick, bold strokes paired with intricate shading for a high-contrast stain.',
  },
  {
    id: 4,
    title: 'Sangeet Delicate Mandalas',
    category: 'Sangeet Party',
    image: '/design/2f960168849c101e1a0f092ed97068c0.jpg',
    webp: '/design/2f960168849c101e1a0f092ed97068c0.webp',
    thumb: '/design/2f960168849c101e1a0f092ed97068c0-thumb.webp',
    description: 'Chic, fast-paced center mandalas perfect for bridesmaids and guests.',
  },
  {
    id: 5,
    title: 'Geometric Architecture Cuff',
    category: 'Contemporary Minimalist',
    image: '/design/36b0dbf2a2ae7785ad8bc813ccca4501.jpg',
    webp: '/design/36b0dbf2a2ae7785ad8bc813ccca4501.webp',
    thumb: '/design/36b0dbf2a2ae7785ad8bc813ccca4501-thumb.webp',
    description: 'Sleek, architectural lines creating a modern wrist cuff illusion.',
  },
  {
    id: 6,
    title: 'Heritage Maharani Story',
    category: 'Royal Bridal',
    image: '/design/32d50772da5057ee7ffe4f71ae7882e6.jpg',
    webp: '/design/32d50772da5057ee7ffe4f71ae7882e6.webp',
    thumb: '/design/32d50772da5057ee7ffe4f71ae7882e6-thumb.webp',
    description: 'Intricate lotus patterns weaving the bride and groom’s initials into the design.',
  },
  {
    id: 7,
    title: 'Royal Feet Mehndi & Anklet',
    category: 'Royal Bridal',
    image: '/design/bf79b9729b21fe68ad4b454815625e50.jpg',
    webp: '/design/bf79b9729b21fe68ad4b454815625e50.webp',
    thumb: '/design/bf79b9729b21fe68ad4b454815625e50-thumb.webp',
    description: 'Delicate anklet jewelry motifs and symmetrical lotus vines for the bride.',
  },
  {
    id: 8,
    title: 'Rose Shaded Garland',
    category: 'Arabic & Indo-Western',
    image: '/design/c9814ce739621f7fb16825f26a76e73b.jpg',
    webp: '/design/c9814ce739621f7fb16825f26a76e73b.webp',
    thumb: '/design/c9814ce739621f7fb16825f26a76e73b.webp',
    description: 'Cascading floral vines with multidimensional shading technique.',
  },
  {
    id: 9,
    title: 'Negative Space Palms',
    category: 'Contemporary Minimalist',
    image: '/design/f6e8e92c36a63c3b3ad741ee69689db4.jpg',
    webp: '/design/f6e8e92c36a63c3b3ad741ee69689db4.webp',
    thumb: '/design/f6e8e92c36a63c3b3ad741ee69689db4.webp',
    description: 'Airy modern palm composition balancing negative space with fine mesh.',
  },
  {
    id: 10,
    title: 'The Royal Mandala & Cuffs',
    category: 'Sangeet Party',
    image: '/design/f9ab6ad14e7d3b53e880242ea6089383.jpg',
    webp: '/design/f9ab6ad14e7d3b53e880242ea6089383.webp',
    thumb: '/design/f9ab6ad14e7d3b53e880242ea6089383.webp',
    description: 'Classic central mandala with ornate wristband cuffs.',
  },
  {
    id: 11,
    title: 'Storybook Bridal Full Arms',
    category: 'Royal Bridal',
    image: '/design/fff34cde46f318017a7575556201734a.jpg',
    webp: '/design/fff34cde46f318017a7575556201734a.webp',
    thumb: '/design/fff34cde46f318017a7575556201734a-thumb.webp',
    description: 'Elbow-length bespoke storytelling motifs customized with wedding vows.',
  },
  {
    id: 12,
    title: 'Botanical Organic Palms',
    category: 'Sangeet Party',
    image: '/design/download.png',
    webp: '/design/download.webp',
    thumb: '/design/download-thumb.webp',
    description: 'Organic leaf trailing vines mixed with modern finger geometry.',
  },
];

export const PortfolioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Works');
  const [selectedImage, setSelectedImage] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = activeTab === 'All Works' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  return (
    <>
      <div className="relative w-full h-full min-h-[100svh] flex flex-col pt-20 pb-16 px-5 sm:px-8 max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B3A2B] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Our Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1412] leading-[1.15] mb-4">
            Bespoke Artistry for{' '}
            <span className="italic font-normal text-[#4A1521]">Every Celebration.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#1A1412]/75 font-light">
            Filter by style to discover the aesthetic crafted for your big day.
          </p>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeTab === category
                  ? 'bg-[#4A1521] text-[#FAF7F2] shadow-md'
                  : 'bg-white border border-[#8B3A2B]/20 text-[#1A1412]/70 hover:border-[#8B3A2B]/50 hover:text-[#4A1521]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 flex-1">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white shadow-sm cursor-pointer border border-[#8B3A2B]/10"
                onClick={() => setSelectedImage(item)}
              >
                <picture>
                  <source srcSet={item.thumb || item.webp} type="image/webp" />
                  <img
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/90 via-[#1A1412]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold mb-3 backdrop-blur-sm">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#FAF7F2] mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-[#FAF7F2]/80 text-xs font-medium mt-4 uppercase tracking-widest">
                      <ZoomIn className="w-4 h-4" />
                      <span>View Detail</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Modal (Rendered above everything) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-[#1A1412]/95 backdrop-blur-md"
          >
            {/* Close Background Area */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setSelectedImage(null)} 
            />

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-md hover:bg-white rounded-full text-[#1A1412] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-3/5 aspect-square md:aspect-auto md:h-[80svh] relative">
                <picture>
                  <source srcSet={selectedImage.webp} type="image/webp" />
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>

              {/* Modal Details */}
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-[#8B3A2B] text-xs font-semibold uppercase tracking-widest mb-4">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#4A1521] leading-tight mb-6">
                  {selectedImage.title}
                </h3>
                <p className="font-sans text-[#1A1412]/75 text-base md:text-lg font-light leading-relaxed mb-10">
                  {selectedImage.description}
                </p>
                
                <button
                  type="button"
                  onClick={() => {
                    const styleTitle = selectedImage.title;
                    setSelectedImage(null);
                    window.dispatchEvent(
                      new CustomEvent('open-booking-modal', {
                        detail: { package: styleTitle },
                      })
                    );
                  }}
                  className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-[#4A1521] text-[#FAF7F2] text-sm font-semibold tracking-wider uppercase hover:bg-[#6B1724] transition-colors shadow-md group cursor-pointer"
                >
                  <span>Inquire for this style</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioSection;
