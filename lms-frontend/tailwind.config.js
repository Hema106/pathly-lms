/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FAFAF8",
        surfaceAlt: "#F1F0EC",
        ink: "#1C1B29",
        inkSoft: "#54536A",
        primary: {
          DEFAULT: "#4338CA",
          dark: "#332B9E",
          light: "#EEECFD",
        },
        progress: {
          DEFAULT: "#0EA37A",
          light: "#E1F5EE",
        },
        highlight: {
          DEFAULT: "#FFC145",
          dark: "#E0A526",
        },
        coral: "#FF6B4A",
        border: "#E4E2DC",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,27,41,0.06), 0 4px 12px rgba(28,27,41,0.05)",
        cardHover: "0 4px 8px rgba(28,27,41,0.08), 0 12px 24px rgba(28,27,41,0.08)",
      },
    },
  },
  plugins: [],
};
