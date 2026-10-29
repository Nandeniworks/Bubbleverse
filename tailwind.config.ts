import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        boba: {
          bg: "#000000",
          cream: "#FFF8F1",
          beige: "#E7D8C9",
          caramel: "#B56A2D",
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'rise': 'rise 4s ease-in infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-200px) scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
