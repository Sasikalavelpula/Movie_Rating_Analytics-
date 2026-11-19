/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',
          card: '#111827',
          cardHover: '#1F2937',
          accent: '#F59E0B',      // Warm Amber / Golden star
          accentLight: '#FBBF24',
          accentGlow: 'rgba(245, 158, 11, 0.15)',
          primary: '#6366F1',     // Indigo / Violet accent for charts
          primaryHover: '#4F46E5',
          danger: '#EF4444',
          success: '#10B981',
          muted: '#9CA3AF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'glow-primary': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
      }
    },
  },
  plugins: [],
}
