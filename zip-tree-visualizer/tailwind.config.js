/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Safe side ke liye
    "./*.{js,ts,jsx,tsx,mdx}",         // Root files ke liye
  ],
  theme: {
    extend: {
      colors: {
        // Fallback colors de dete hain agar HSL vars fail ho jayein
        background: "var(--background, #0a0a0a)",
        foreground: "var(--foreground, #ffffff)",
        primary: "var(--primary, #8b5cf6)",
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
