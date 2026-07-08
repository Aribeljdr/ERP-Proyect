import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        orbit: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#4F46E5',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        sidebar: {
          DEFAULT: '#0F172A',
          dark: '#030712',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          dark: '#020617',
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#111827',
        },
        border: {
          DEFAULT: '#E8EDF3',
          dark: '#1E293B',
        },
        hover: {
          DEFAULT: '#F1F5F9',
          dark: '#1E293B',
        },
        muted: {
          DEFAULT: '#64748B',
          dark: '#94A3B8',
        },
        text: {
          DEFAULT: '#0F172A',
          dark: '#F8FAFC',
        },
      },
      borderRadius: {
        'orbit-sm': '8px',
        'orbit-md': '12px',
        'orbit-lg': '18px',
      },
      boxShadow: {
        'orbit': '0 1px 2px rgba(15,23,42,.04), 0 4px 16px rgba(15,23,42,.05)',
        'orbit-lg': '0 8px 28px rgba(15,23,42,.09)',
        'orbit-dark': '0 1px 2px rgba(0,0,0,.3), 0 8px 24px rgba(0,0,0,.35)',
      },
      keyframes: {
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'toast-in': 'toast-in .35s cubic-bezier(.34,1.56,.64,1)',
        'fade-in': 'fade-in .25s ease',
        'pop-in': 'pop-in .18s ease',
        'slide-up': 'slide-up .35s ease',
      },
    },
  },
  plugins: [],
}
export default config
