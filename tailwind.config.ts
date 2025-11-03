import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'varaaz-primary': '#8B5CF6',
        'varaaz-dark': '#1F2937',
      },
      fontFamily: {
        devanagari: 'var(--font-devanagari), system-ui, sans-serif',
      },
    },
  },
  plugins: [],
}
export default config
