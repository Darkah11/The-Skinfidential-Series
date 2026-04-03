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
        gold: "#F4E7A3",
        accent: "#FF3FB9",
        primary: {
          50: "#916E99",
          100: "#310246",
        },
      },
    },
    keyframes: {
      "infinite-scale": {
        "0%, 100%": { transform: "scale(0.7)" },
        "50%": { transform: "scale(1)" },
      },
    },
    animation: {
      "scale-logo": "infinite-scale 3s ease-in-out infinite",
    },
  },
  plugins: [],
};
export default config;
