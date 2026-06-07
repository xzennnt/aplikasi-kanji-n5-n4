/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sumi: "#27272a",
        washi: "#f8f7f4",
        vermilion: "#d73535",
        akane: "#a61f2b",
        mist: "#e7e5e4"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(39, 39, 42, 0.08)"
      }
    }
  },
  plugins: []
};
