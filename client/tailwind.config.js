/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#3b82f6",
          600: "#2563eb"
        },
        glass: {
          white: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)"
        }
      },
      boxShadow: {
        glow: "0 20px 40px rgba(59,130,246,0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};