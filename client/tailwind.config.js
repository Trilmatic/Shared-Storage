import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.vue'
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans]
      }
    },
    colors: ({ colors }) => ({
      ...colors,
      primary: '#DAA520',
      'primary-focus': '#C4912C',
      secondary: '#20B2AA',
      'secondary-focus': '#1A908A',
      error: '#DC3545',
      'error-focus': '#C82333'
    })
  },

  plugins: [typography]
}
