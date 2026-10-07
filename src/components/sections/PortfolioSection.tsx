import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Carousel, Card } from '../ui/apple-cards-carousel';

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

  const filteredItems = activeTab === 'All Works' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  const cards = filteredItems.map((item, index) => (
    <Card 
      key={`${item.id}-${activeTab}`} // Re-render card if tab changes
      index={index}
      card={{
        src: item.image, // BlurImage inside Card uses this
        category: item.category,
        title: item.title,
        content: (
          <div className="bg-[#FAF7F2] p-6 sm:p-10 rounded-[28px] mb-4 shadow-sm border border-[#8B3A2B]/10">
            <p className="font-sans text-[#1A1412]/75 text-base md:text-lg font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              {item.description}
            </p>
            
            <div className="w-full flex justify-center mb-10">
              <picture className="block w-full max-w-2xl mx-auto">
                <source srcSet={item.webp} type="image/webp" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto rounded-[24px] object-cover shadow-lg"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            <button
              type="button"
              onClick={() => {
                const text = encodeURIComponent(`Hi Husaina, I would like to book a mehndi consultation for the ${item.title} package!`);
                window.location.href = `https://wa.me/918591603834?text=${text}`;
              }}
              className="mx-auto flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#4A1521] text-[#FAF7F2] text-sm font-semibold tracking-wider uppercase hover:bg-[#6B1724] transition-colors shadow-md group cursor-pointer"
            >
              <span>Inquire for this style</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )
      }}
    />
  ));

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

        {/* Apple Cards Carousel */}
        <div className="w-full flex-1">
          <Carousel items={cards} />
        </div>
      </div>
    </>
  );
};

export default PortfolioSection;
