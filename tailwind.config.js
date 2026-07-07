/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        background: "#020617", // slate-950
        surface: "rgba(15,23,42,0.85)",
      },
      boxShadow: {
        glass: "0 18px 45px rgba(15,23,42,0.75)",
      },
    },
  },
  plugins: [],
};

