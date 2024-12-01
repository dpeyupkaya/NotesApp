/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-blue': '0 0 15px 5px rgba(0, 123, 255, 0.75)',
        'glow-purple': '0 0 15px 5px rgba(128, 0, 255, 0.75)',
        'glow-blue-sm': '0 0 15px 5px rgba(0, 123, 255, 0.75)',
        'glow-purple-md': '0 0 15px 5px rgba(128, 0, 255, 0.75)',
      },
      animation: {
        'move-up-down': 'moveUpDown 1s ease-in-out infinite',
        'move-left-right': 'moveLeftRight 1.5s ease-in-out infinite',
        'move-up-down-md': 'moveUpDown 1s ease-in-out infinite',
        'move-left-right-lg': 'moveLeftRight 1s ease-in-out infinite',
      },
      keyframes: {
        moveUpDown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        moveLeftRight: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        moveUpDownLg: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        moveLeftRightLg: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(15px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
