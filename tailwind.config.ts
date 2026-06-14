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
        "surface-dark": "#0A0A0A",
        "surface-card": "#101010",
        "border-subtle": "rgba(255,255,255,0.08)",
        "border-gold": "rgba(201,168,76,0.35)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        pulse_dot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(-40px,24px) scale(1.1)" },
          "66%": { transform: "translate(40px,-16px) scale(0.95)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.18" },
          "50%": { opacity: "0.34" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        bounceDown: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        shimmerText: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        scrollHint: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(180%)" },
        },
      },
      animation: {
        pulse_dot: "pulse_dot 2s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        "drift-slow": "drift 20s ease-in-out infinite",
        "drift-slower": "drift 28s ease-in-out infinite",
        "glow-pulse": "glowPulse 9s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-fast": "marquee 24s linear infinite",
        "gradient-move": "gradientMove 8s ease infinite",
        "bounce-down": "bounceDown 1.8s ease-in-out infinite",
        "shimmer-text": "shimmerText 6s linear infinite",
        "spin-slow": "spinSlow 22s linear infinite",
        "scroll-hint": "scrollHint 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
