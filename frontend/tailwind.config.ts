import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#162839',
          container: '#2c3e50',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          container: '#F8F9FA',
        },
        tertiary: {
          DEFAULT: '#392200',
          container: '#523711',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        surface: {
          DEFAULT: '#f8f9fa',
          bright: '#f8f9fa',
          dim: '#d9dadb',
          container: {
            lowest: '#ffffff',
            low: '#f3f4f5',
            DEFAULT: '#edeeef',
            high: '#e7e8e9',
            highest: '#e1e3e4',
          },
        },
        outline: {
          DEFAULT: '#74777d',
          variant: '#c4c6cd',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0 24px 48px -12px rgba(22, 40, 57, 0.08)',
      },
      borderRadius: {
        'md': '8px',
        'xl': '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
