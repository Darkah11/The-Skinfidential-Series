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
        gold: '#F4E7A3',
        accent: '#FF3FB9',
        primary: {
          50: '#916E99',
          100: '#310246',
        },
      },
    },
  },
  plugins: [],
};
export default config;
