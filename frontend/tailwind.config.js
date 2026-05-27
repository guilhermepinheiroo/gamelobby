/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#a855f7',
          violet: '#7c3aed',
          pink: '#ec4899',
          cyan: '#06b6d4',
        },
        dark: {
          950: '#07030f',
          900: '#0d0818',
          800: '#130f23',
          700: '#1a1530',
          600: '#221d3d',
          500: '#2d2650',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Exo 2', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(168, 85, 247, 0.4)',
        'neon-sm': '0 0 8px rgba(168, 85, 247, 0.3)',
        'neon-lg': '0 0 40px rgba(168, 85, 247, 0.5)',
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate',
        scanline: 'scanline 8s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: 0, transform: 'translateX(20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        glow: {
          from: { boxShadow: '0 0 10px rgba(168,85,247,0.3)' },
          to: { boxShadow: '0 0 30px rgba(168,85,247,0.7), 0 0 60px rgba(168,85,247,0.3)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
