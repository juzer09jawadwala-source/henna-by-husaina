import React, { useState } from "react";
import { Sparkles, Calendar as CalendarIcon, Send, MessageCircle, Heart } from "lucide-react";
import { CalendarWithPresets } from "@/components/ui/calendar-with-presets";
import { Button } from "@/components/ui/button";

export const ContactSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  );
  const [packageName, setPackageName] = useState("The Royal Heirloom");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Jaipur / Rajasthan",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Select a date";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Husaina! I'm interested in reserving a date.\n\n👰 Name: ${formData.name || "A Bride"}\n📅 Date: ${formattedDate}\n✨ Package: ${packageName}\n📍 City: ${formData.city}\n\nPlease let me know your availability!`
    );
    window.open(`https://wa.me/918591603834?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 bg-[#F8F4EE] border-t border-[#8B3A2B]/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#4A1521]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B3A2B] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Private Bridal Reservations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1412] leading-[1.15] mb-4">
            Book Your Wedding{' '}
            <span className="italic font-normal text-[#4A1521]">Date.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#1A1412]/75 font-light max-w-xl">
            Select your preferred wedding or celebration date with our live interactive calendar to check atelier availability.
          </p>
        </div>

        {/* Interactive Booking Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Calendar with Presets */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-white/90 rounded-[28px] p-5 sm:p-8 border border-[#8B3A2B]/15 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#8B3A2B]/10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A1521]">
                  <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Interactive Calendar</span>
                </div>
                <span className="text-[10px] font-sans text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Slots
                </span>
              </div>

              {/* RENDER THE USER'S REQUESTED COMPONENT */}
              <CalendarWithPresets
                selected={selectedDate}
                onSelect={(d) => setSelectedDate(d)}
                className="w-full shadow-none border-0 p-0"
              />

              {/* Dynamic date selection status */}
              <div className="mt-6 pt-4 border-t border-[#8B3A2B]/10 flex flex-col gap-2">
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

            {/* Studio Info Card */}
            <div className="w-full mt-6 p-5 rounded-2xl bg-[#4A1521] text-[#FAF7F2] shadow-lg flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-medium">Jaipur Atelier & Destination</h4>
                <p className="text-xs text-[#FAF7F2]/70 font-light mt-0.5">Booking 2026–2027 Wedding Seasons</p>
              </div>
              <Heart className="w-5 h-5 text-[#D4AF37] shrink-0" />
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7 bg-white/95 rounded-[28px] p-5 sm:p-10 border border-[#8B3A2B]/15 shadow-xl backdrop-blur-md">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#4A1521] mb-2">
              Bespoke Inquiry Details
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1412]/70 font-light mb-8">
              Fill in your celebration details. Our bridal concierge reviews all inquiries within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                    Bride / Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/50 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/50 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                    Selected Package
                  </label>
                  <select
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/50 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="The Royal Heirloom">The Royal Heirloom (Full Bridal)</option>
                    <option value="The Modern Minimalist">The Modern Minimalist (Intimate/Roka)</option>
                    <option value="Sangeet & Party">Sangeet & Bridal Party</option>
                    <option value="Custom Bespoke Suite">Custom Bespoke Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                    Event City / Venue
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Udaipur, Delhi, Mumbai"
                    className="w-full px-4 py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/50 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A1521] mb-1.5">
                  Design Vision & Special Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your wedding motifs, portrait requests, or ceremony timeline..."
                  className="w-full px-4 py-3 rounded-xl border border-[#8B3A2B]/20 bg-[#FAF7F2]/50 text-sm text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-[#4A1521] hover:bg-[#6B1724] text-[#FAF7F2] py-4 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Atelier Inquiry</span>
                </Button>

                <Button
                  type="button"
                  size="lg"
                  variant="gold"
                  onClick={handleWhatsApp}
                  className="flex-1 py-4 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Instant WhatsApp Booking</span>
                </Button>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                  <span className="font-semibold block mb-0.5">✦ Inquiry Received!</span>
                  We have tentatively held {formattedDate} for you. Husaina's atelier manager will WhatsApp you shortly with sketches & consultation availability.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

