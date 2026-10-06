/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        henna: {
          950: '#2E0C14',
          900: '#4A1521',
          800: '#6B1724',
          700: '#8B2635',
          600: '#AB3B4C',
          500: '#C75163',
        },
        terracotta: {
          800: '#6E2D21',
          700: '#8B3A2B',
          600: '#A84836',
          500: '#C06039',
          400: '#D67D57',
          300: '#E8A384',
        },
        gold: {
          800: '#846613',
          700: '#9C7A1A',
          600: '#BA9528',
          500: '#D4AF37',
          400: '#E2C068',
          300: '#ECD395',
          200: '#F5E7C5',
          100: '#FAF3E3',
        },
        cream: {
          50: '#FDFAF7',
          100: '#FAF7F2',
          200: '#F3EDE4',
          300: '#E6DCD0',
          400: '#D5C7B8',
        },
        espresso: {
          950: '#120D0C',
          900: '#1A1412',
          800: '#2A201E',
          700: '#3D302C',
        },
        card: {
          DEFAULT: '#FAF7F2',
          foreground: '#1A1412',
        },
        muted: {
          DEFAULT: '#F3EDE4',
          foreground: '#8B3A2B',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'sheet': '0 -15px 35px -5px rgba(26, 20, 18, 0.12), 0 -8px 15px -6px rgba(26, 20, 18, 0.08)',
        'sheet-deep': '0 -25px 50px -12px rgba(26, 20, 18, 0.25)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.35)',
      },
    },
  },
  plugins: [],
}
