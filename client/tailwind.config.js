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
        background: '#090D16',
        surface: '#111827',
        'surface-hover': '#1F2937',
        card: '#131C2E',
        border: '#1E293B',
        primary: {
          DEFAULT: '#10B981', // Emerald
          hover: '#059669',
          light: '#34D399'
        },
        secondary: {
          DEFAULT: '#06B6D4', // Cyan
          hover: '#0891B2'
        },
        accent: {
          DEFAULT: '#8B5CF6', // Violet
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
