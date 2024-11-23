import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: "#FFF6E9",
        green: "#0D9276",
        darkBlue: "#40A2E3",
        blue: "#BBE2EC",
        lightGreen: "#9FE8B1",
        darkGreen: "#0D9276",
        water: "#1976B3",
        redSunday: "#FA5B5B",
        mango: "#FEF2B7",
        pinki: "#F991CC",
        orange: "#FFC489",
        purr: "#EA95F2"
      },
    },
  },
  plugins: [],
} satisfies Config;
