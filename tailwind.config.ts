import type { Config } from 'tailwindcss';

// Tokens sampled visually from the reference screenshot.
// Exact hex values are best-effort estimates, not extracted from a design file —
// nudge these against real brand guidelines if/when you have them.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#040404',
        surface: '#121214',
        'surface-raised': '#18181b',
        border: 'rgba(255,255,255,0.08)',
        accent: {
          DEFAULT: '#FF8A1E',
          soft: 'rgba(255,138,30,0.16)',
          dim: 'rgba(255,138,30,0.35)',
        },
        ink: {
          DEFAULT: '#F5F5F5',
          muted: 'rgba(245,245,245,0.6)',
          faint: 'rgba(245,245,245,0.4)',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      borderRadius: {
        card: '1.75rem',
        pill: '999px',
      },
      boxShadow: {
        fab: '0 8px 24px -6px rgba(255,138,30,0.55)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(5px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(3px)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
