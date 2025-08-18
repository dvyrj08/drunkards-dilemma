/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F10',
        card: '#111827',
        neon: '#39FF14'
      }
    },
  },
  plugins: [],
}
