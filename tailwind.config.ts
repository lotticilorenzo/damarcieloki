import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        heading: ['var(--font-nunito)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      colors: {
        bg: '#FFFDF8',
        'bg-alt': '#FFF5EC',
        surface: '#FFFFFF',
        border: '#F0E8DD',
        'border-hover': '#DDD0C0',
        orange: '#D4581A',
        'orange-dark': '#A83F0E',
        'orange-light': '#FFF0E6',
        'orange-glow': 'rgba(212,88,26,0.12)',
        teal: '#2A7A7B',
        'teal-dark': '#1F5C5D',
        'teal-light': '#E8F5F5',
        'teal-glow': 'rgba(42,122,123,0.10)',
        brown: '#6B3A2A',
        'brown-light': '#F5EDE8',
        text: '#2C1810',
        'text-sec': '#7A5C50',
        'text-muted': '#B09080',
      },
    },
  },
  plugins: [],
};
export default config;
