/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premium-black': '#0A0A0A',
        'premium-gray': '#1A1A2E',
        'premium-light': '#F8F7F4',
        'blush-pink': '#F2A6B7',
        'soft-rose': '#E8738A',
        'soft-lavender': '#B8A9D9',
        'deep-slate-blue': '#3D3B8E',
        'off-white-lavender': '#F5F3FA',
        'deep-navy': '#1B2A4A',
        'electric-cobalt': '#1E3A8A',
        'warm-taupe': '#C8B89A',
        'soft-yellow': '#F4D03F',
        'muted-coral': '#E8A87C',
        'sage-green': '#8FAF7E',
        'sky-blue': '#87CEEB',
        'lemon-yellow': '#FFF44F',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-women': 'linear-gradient(135deg, #F2A6B7 0%, #B8A9D9 50%, #F5F3FA 100%)',
        'gradient-men': 'linear-gradient(135deg, #1B2A4A 0%, #3D3B8E 50%, #1E3A8A 100%)',
        'gradient-kids': 'linear-gradient(135deg, #87CEEB 0%, #FFF44F 50%, #E8A87C 100%)',
        'gradient-accessories': 'linear-gradient(135deg, #C8B89A 0%, #8FAF7E 50%, #F4D03F 100%)',
      },
    },
  },
  plugins: [],
}
