/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Open sans', 'Segoe UI', 'Arial', 'Helvetica', 'sans-serif'],
      serif: ['Libre Baskerville', 'Georgia', 'Times New Roman', 'Times', 'serif'],
    },
    extend: {
      colors: {
        dark: "hsl(0, 0%, 6%)",
        light: "hsl(0, 0%, 93%)",
        accent: "hsl(37, 68%, 49%)",
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('error', '&[data-error]:not([data-error=""])');
    }
  ],
}

