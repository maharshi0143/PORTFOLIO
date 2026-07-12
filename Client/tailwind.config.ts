import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          950: '#050505',  // Pure black background
          900: '#0a0a0a',  // Dark background
          800: '#1a1a1a',  // Surface
          700: '#2a2a2a',  // Elevated surface
        },
        // Accent palette
        accent: {
          electric: '#00d9ff',    // Electric blue/cyan
          indigo: '#6366f1',      // Indigo
          purple: '#a855f7',      // Purple
          violet: '#7c3aed',      // Violet
          rose: '#ec4899',        // Rose/pink
          orange: '#ff6b35',      // Orange
        },
        // Neutral palette
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Utility colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        heading: ['League Spartan', 'Space Grotesk', 'sans-serif'],
        body: ['Inter', 'Geist', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        // Hero typography
        'hero': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-sm': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        // Headings
        'h1': ['56px', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h2': ['42px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['32px', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '700' }],
        'h4': ['24px', { lineHeight: '1.5', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '1.5', fontWeight: '600' }],
        'h6': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        // Body
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4' }],
      },
      spacing: {
        // Design system spacing scale
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },
      boxShadow: {
        // Soft shadows for premium feel
        'soft': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.2)',
        'soft-xl': '0 12px 32px rgba(0, 0, 0, 0.25)',
        // Glow shadows
        'glow-sm': '0 0 16px rgba(0, 217, 255, 0.3)',
        'glow-md': '0 0 32px rgba(0, 217, 255, 0.4)',
        'glow-lg': '0 0 48px rgba(0, 217, 255, 0.5)',
        'glow-accent': '0 0 24px rgba(168, 85, 247, 0.4)',
      },
      animation: {
        // Custom animations
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'bg-gradient': (value: string) => ({
            backgroundImage: `linear-gradient(135deg, ${value})`,
          }),
        },
        {
          values: theme('colors'),
        }
      );
    }),
  ],
};

export default config;
