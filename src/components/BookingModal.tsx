import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Heart, Send, MessageCircle } from "lucide-react";
import { CalendarWithPresets } from "@/components/ui/calendar-with-presets";
import { Button } from "@/components/ui/button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  initialPackage = "The Royal Heirloom (Full Bridal)",
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  );
  const [packageName, setPackageName] = useState(initialPackage);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Jaipur / Rajasthan",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Tue, Oct 20, 2026";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Husaina! I would like to inquire about booking my wedding date.\n\n👰 Name: ${formData.name || "A Bride"}\n📅 Target Date: ${formattedDate}\n✨ Package: ${packageName}\n📍 City/Venue: ${formData.city}\n💭 Vision: ${formData.notes || "Custom Bridal Suite"}\n\nPlease confirm availability!`
    );
    window.open(`https://wa.me/918591603834?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#110A0C]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto z-10 my-auto rounded-[32px] p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Floating Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#4A1521] shadow-lg border border-[#8B3A2B]/15 transition-all hover:scale-105 cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Exactly the 2-Card Layout from Reference Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Interactive Calendar + Atelier Card */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Top Calendar Card */}
                <div className="w-full bg-white rounded-[28px] p-6 sm:p-7 border border-[#8B3A2B]/15 shadow-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#8B3A2B]/10">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#4A1521]">
                      <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                      <span>Interactive Calendar</span>
                    </div>
                    <span className="text-[10px] font-sans text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Slots
                    </span>
                  </div>

                  {/* Calendar with Presets */}
                  <CalendarWithPresets
                    selected={selectedDate}
                    onSelect={(d) => setSelectedDate(d)}
                    className="w-full shadow-none border-0 p-0"
                  />

                  {/* Dynamic Status Footer */}
                  <div className="mt-5 pt-3.5 border-t border-[#8B3A2B]/10 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1A1412]/60 font-light">Target Date:</span>
                      <span className="font-serif text-sm font-semibold text-[#4A1521]">
                        {formattedDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1A1412]/60 font-light">Availability Status:</span>
                      <span className="text-emerald-700 font-medium">Available (2 Slots Left)</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Jaipur Atelier Card */}
                <div className="w-full p-5 rounded-2xl bg-[#4A1521] text-[#FAF7F2] shadow-xl flex items-center justify-between border border-white/10">
                  <div>
                    <h4 className="font-serif text-base font-medium">Jaipur Atelier & Destination</h4>
                    <p className="text-xs text-[#FAF7F2]/70 font-light mt-0.5">Booking 2026–2027 Wedding Seasons</p>
                  </div>
                  <Heart className="w-5 h-5 text-[#D4AF37] shrink-0" />
                </div>
              </div>

              {/* Right Column: Bespoke Inquiry Details Card */}
              <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-9 border border-[#8B3A2B]/15 shadow-2xl">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#4A1521] mb-1.5">
                  Bespoke Inquiry Details
                </h3>
                <p className="text-xs sm:text-sm text-[#1A1412]/70 font-light mb-7">
                  Fill in your celebration details. Our bridal concierge reviews all inquiries within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                        Bride / Client Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/40 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+919876543210"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/40 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Package & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                        Selected Package
                      </label>
                      <select
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/40 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="The Royal Heirloom (Full Bridal)">The Royal Heirloom (Full Bridal)</option>
                        <option value="The Modern Minimalist (Intimate/Roka)">The Modern Minimalist (Intimate/Roka)</option>
                        <option value="Sangeet & Bridal Party">Sangeet & Bridal Party</option>
                        <option value="Custom Bespoke Suite">Custom Bespoke Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                        Event City / Venue
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Jaipur / Rajasthan"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/40 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Design Vision */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                      Design Vision & Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us about your wedding motifs, portrait requests, or ceremony timeline..."
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/40 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Row 4: Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 bg-[#4A1521] hover:bg-[#631828] text-[#FAF7F2] py-3.5 sm:py-4 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Atelier Inquiry</span>
                    </Button>

                    <Button
                      type="button"
                      size="lg"
                      onClick={handleWhatsApp}
                      className="flex-1 bg-[#C2922D] hover:bg-[#A87B1F] text-[#1A1412] py-3.5 sm:py-4 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer border border-[#D4AF37]/50"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Instant WhatsApp Booking</span>
                    </Button>
                  </div>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
                    >
                      <span>✦ Inquiry logged for {formattedDate}! We will connect with you via WhatsApp within 24 hours.</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default BookingModal;


