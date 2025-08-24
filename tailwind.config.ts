import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        fg: '#FFFFFF',
        primary: '#FF1A1A',
        card: '#111113',
        muted: '#B3B3B3',
        success: '#22C55E',
        warn: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: { '2xl': '1.25rem' },
    },
  },
}

export default config
