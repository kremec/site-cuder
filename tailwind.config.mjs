/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: "#143c2d",
        charcoal: "#151515",
        cream: "#f5f1e6",
        ink: "#15291f",
        orange: "#e65a34",
      },
      fontFamily: {
        sans: ["Aptos", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Aptos Display", "Aptos", "ui-sans-serif", "sans-serif"],
      },
      dropShadow: {
        hard: "7px 7px 0 rgb(0 0 0 / 65%)",
      },
    },
  },
};
