/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030712",
          dark: "#060d1f",
          surface: "rgba(10, 18, 38, 0.65)",
          border: "rgba(0, 240, 255, 0.2)",
          cyan: "#00f0ff",
          blue: "#0066ff",
          purple: "#a855f7",
          violet: "#7928ca",
          emerald: "#10b981",
          pink: "#ec4899",
          text: "#e2e8f0",
          muted: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.3))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.7))' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(0, 240, 255, 0.35)',
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.35)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
      }
    }
  },
  plugins: []
}
