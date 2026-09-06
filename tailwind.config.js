/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porsche: {
          red: '#E10600',
          dark: '#0A0C10',
          card: '#121620',
          gold: '#D4AF37',
          cyan: '#00F2FE',
          accent: '#38EF7D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'Syncopate', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(0, 242, 254, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
