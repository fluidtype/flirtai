import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#E50914',
        secondary: '#FF6B72',
        success: '#00FF7F',
        amber: '#FFC857',
        cyan: '#39E6FF',
        bg: '#050505',
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

export default config
