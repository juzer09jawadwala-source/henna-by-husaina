
import { RuixenGradientFooter } from '../ui/ruixen-gradient-footer';
import { Sparkles, Instagram, Facebook, Phone, MapPin } from 'lucide-react';

export function FooterSection() {
  return (
    <div className="relative bg-[#1A1412] mt-20 sm:mt-32 border-t border-white/5 z-10 overflow-hidden">
      <RuixenGradientFooter gradientHeight="50vh" className="relative z-10 w-full pt-16 sm:pt-24 text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 flex flex-col items-start text-left">
              <div className="flex items-center gap-2 text-[#D4AF37] mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="font-sans text-xs tracking-[0.2em] uppercase">
                  Artistry & Elegance
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-[#FAF7F2] mb-4">
                HUSAINA <br /> Mehndi Atelier
              </h2>
              <p className="text-[#FAF7F2]/60 text-sm max-w-sm font-sans font-light leading-relaxed mb-8">
                Elevating the timeless art of henna with contemporary precision and deeply traditional roots. Every design tells a story of love, celebration, and bespoke beauty.
              </p>
              <a 
                href="https://wa.me/918591603834?text=Hi%20Husaina,%20I%20would%20like%20to%20book%20a%20mehndi%20consultation!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#1A1412] transition-all font-sans text-xs tracking-[0.1em] uppercase shadow-lg shadow-[#D4AF37]/5"
              >
                Book via WhatsApp
              </a>
            </div>

            {/* Links Column */}
            <div className="flex flex-col text-left">
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                Explore
              </h3>
              <ul className="flex flex-col gap-4 font-sans font-light text-sm text-[#FAF7F2]/70">
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">The Artist</a></li>
                <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Portfolio</a></li>
                <li><a href="#packages" className="hover:text-[#D4AF37] transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col text-left">
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                Connect
              </h3>
              <ul className="flex flex-col gap-4 font-sans font-light text-sm text-[#FAF7F2]/70">
                <li>
                  <a href="https://wa.me/918591603834" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors">
                    <Phone className="w-4 h-4 text-[#D4AF37]/60" />
                    +91 8591603834
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#D4AF37]/60" />
                    Mumbai, India
                  </span>
                </li>
                <li className="pt-2 flex gap-4">
                  <a href="#" className="p-2 rounded-full border border-white/10 hover:border-[#D4AF37]/50 text-[#FAF7F2]/60 hover:text-[#D4AF37] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-full border border-white/10 hover:border-[#D4AF37]/50 text-[#FAF7F2]/60 hover:text-[#D4AF37] transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs uppercase tracking-wider text-[#FAF7F2]/40">
            <span>© {new Date().getFullYear()} Husaina Mehndi Atelier</span>
            <span>Crafted with passion</span>
          </div>
        </div>
      </RuixenGradientFooter>
    </div>
  );
}

