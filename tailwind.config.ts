import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C9A84C",
        "gold-light": "#E2C97E",
        "gold-muted": "#8A6E2F",
        "gold-subtle": "rgba(201,168,76,0.15)",
        "gray-muted": "#9CA3AF",
        "surface-dark": "#0D0D0D",
        "surface-card": "#111111",
        "border-subtle": "rgba(255,255,255,0.08)",
        "border-gold": "rgba(201,168,76,0.35)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        pulse_dot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.5)" },
        },
      },
      animation: {
        pulse_dot: "pulse_dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
