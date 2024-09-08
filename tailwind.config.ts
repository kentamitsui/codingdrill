import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(1, 4, 9)",
        menu: "rgb(13, 17, 23)",
      },
      screens: {
        width_1440px: "1440px",
        width_1680px: "1680px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
