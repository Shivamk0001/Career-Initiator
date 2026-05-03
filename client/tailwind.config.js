/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#3b82f6",
          600: "#2563eb"
        }
      },
      boxShadow: {
        glow: "0 20px 40px rgba(59,130,246,0.35)"
      }
    }
  },
  plugins: []
};
