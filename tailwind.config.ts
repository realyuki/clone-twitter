import type { Config } from 'tailwindcss'

const px0_10 = Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i, `${i}px`]))
const px0_100 = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i}px`]))
const px0_200 = Object.fromEntries(Array.from({ length: 201 }, (_, i) => [i, `${i}px`]))
const px0_1000 = Object.fromEntries(Array.from({ length: 1001 }, (_, i) => [i, `${i}px`]))

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  // corePlugins: {
  //   preflight: false
  // },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    fontSize: {
      md: '17px',
      lg: '31px',
      xl: '64px'
    },
    extend: {
      colors: {
        dimmed: 'rgba(91, 112, 131, 0.4)',
        gray: '#71767B',
        blue: '#1d9bf0',
        white: '#e7e9ea',
        black: '#000',
        border: '#2f3336',
        input: {
          background: '#202327'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))'
      },
      borderRadius: px0_200,
      minWidth: px0_1000,
      minHeight: px0_1000,
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      padding: px0_200,
      height: px0_1000,
      spacing: px0_100
    }
  }
  // plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
