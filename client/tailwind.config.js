module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
  //You don't actually need these ones below, these are just illistrating animations in the following code
        flyFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        flyFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        appear: {
          '0%': {opacity: 0},
          '100%': {opacity: 1}
        }
      },
  //You don't need this section either, I'm just illistrating how to make customer animations with tailwind
      animation: {
        flyFromLeft:'flyFromLeft', 
        appear:'appear',
        flyFromBottom: 'flyFromBottom'
      }
    },
  },
  plugins: [],
}