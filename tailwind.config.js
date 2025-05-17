// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Include pages directory
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Include components directory
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Include app directory (for App Router)
    // Add any other directories where you use Tailwind classes
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, etc. here if needed
      // Example: Match your 'yellow-color', 'purple-color' etc.
      colors: {
        'brand-yellow': '#FFD700', // Replace with your actual yellow hex code
        'brand-purple': '#800080', // Replace with your actual purple hex code
        'secondary-black': '#333333', // Replace with your actual secondary black
        // ... other custom colors
      },
      fontSize: {
        // Example: If you really need font-36 (2.25rem)
        36: '2.25rem',
        // Example: If you really need font-60 (3.75rem)
        60: '3.75rem',
        48: '3rem', // for font-48
        30: '1.875rem', // for font-30
        24: '1.5rem', // for font-24
      },
      // You might need to extend other theme sections (spacing, etc.)
    },
  },
  plugins: [],
};
