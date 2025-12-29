/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050625",          // მთლიანი background
        panel: "#1c1f4a",       // მუქი ბარათები
        panelSoft: "#23265c",   // შიდა ბარათები
        cardBlue: "#4c5cff",    // მთავარი გრადიენტის ღია მხარე
        cardBlueDark: "#3b44c5",// მთავარი გრადიენტის მუქი მხარე
        button: "#4f6bff",      // Search ღილაკი
        muted: "#9aa0d0",       // secondary ტექსტი
      },
      borderRadius: {
        xl2: "18px",            // ზუსტად ისეთი radius როგორც ფოტოზე
      },
      fontSize: {
        hero: "42px",           // სათაური
        temp: "64px",           // ტემპერატურა
      },
      boxShadow: {
        soft: "0 20px 40px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
