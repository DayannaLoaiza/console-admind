import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: {
        800: "#202939",
        900: "#0B0C14",
      },
      white: {
        900: "#FFFFFF",
      },
      blue: {
        50: "#eff7ff",
        100: "#dbebfe",
        200: "#bfddfe",
        300: "#93c9fd",
        400: "#60abfa",
        600: "#2B6FEC",
      },
      green: {
        800: "#3BBD7F",
        300: "#79dcaa",
      },
      gray: {
        100: "#f6f7f8",
        200: "#EAEDF0",
        800: "#D9D9D9",
        900: "#9A9A9E",
      },
      red: {
        800: "#EC1F1F",
      },
      transparent: 'transparent',
    },
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },

  plugins: [],
} satisfies Config;
