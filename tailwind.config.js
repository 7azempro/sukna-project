/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Sukna's logo colours, plus the tints the page is built from
      colors: {
        navy: { DEFAULT: '#023047', 700: '#0b3f58', 900: '#012233' },
        teal: { DEFAULT: '#219ebc', 600: '#1a87a1', 50: '#eaf6fa', 100: '#d4eef5' },
        sand: '#ffb703',
      },
      fontFamily: { sans: ['Tajawal', 'system-ui', 'sans-serif'] },
      boxShadow: {
        card: '0 1px 2px rgba(2,48,71,.06), 0 12px 32px -12px rgba(2,48,71,.18)',
        lift: '0 2px 4px rgba(2,48,71,.06), 0 24px 48px -16px rgba(2,48,71,.28)',
      },
    },
  },
  plugins: [],
};
