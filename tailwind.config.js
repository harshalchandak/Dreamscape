/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a14',
        surface: '#12101f',
        primary: '#06b6d4',
        accent: '#0ea5e9',
        textPrimary: '#e8e0f0',
        textMuted: '#6b7280',
        danger: '#ef4444',
        success: '#22c55e',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
