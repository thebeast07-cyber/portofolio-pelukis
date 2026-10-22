import type { Config } from "tailwindcss";

/**
 * Semua warna & font diambil dari CSS variable di src/app/globals.css.
 * Pas desain tim jadi, cukup ubah nilai variable di sana — komponen tidak perlu disentuh.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      maxWidth: {
        page: "var(--page-max)",
      },
      boxShadow: {
        art: "var(--shadow-art)",
      },
    },
  },
  plugins: [],
};
export default config;
