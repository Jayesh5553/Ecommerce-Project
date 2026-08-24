/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fk: {
          blue: '#2874f0',
          darkBlue: '#1759b8',
          yellow: '#ff9f00',
          orange: '#fb641b',
          green: '#388e3c',
          bg: '#f1f2f6',
          card: '#ffffff',
          textDark: '#212121',
          textGray: '#878787',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'fk-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'fk-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
