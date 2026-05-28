/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#FF5B2E",
        secondary: "#2E3192",
        dark: "#0F172A",
        soft: "#F8FAFC",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Sora", "sans-serif"],
      },

      boxShadow: {
        glow: "0 0 30px rgba(255,91,46,0.15)",
      },
    },
  },

  plugins: [],
};