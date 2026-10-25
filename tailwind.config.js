/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Variable"', 'Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
