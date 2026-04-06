/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#f0f2f7", 100: "#d4d9e6", 500: "#2c3e6b", 700: "#1f2d4f", 900: "#1B2A4A" },
        teal: { 400: "#4ecdc4", 500: "#2A9D8F", 600: "#238b80" },
        gold: { 400: "#E9C46A", 500: "#d4a843" },
      },
    },
  },
  plugins: [],
};
