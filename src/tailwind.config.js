/** @type {import('tailwindcss').Config} */
export default {
    // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: ['./App.vue', './src/**/*.{js,jsx,ts,tsx,vue}'],
    theme: {
      extend: {
        spacing: {
          16: '1rem',
          32: '2rem',
          48: '3rem',
          64: '4rem',
          80: '5rem'
        },
        colors: {
          primary: '#ece3cd',
          secondary: '#f0d986'
        }
      }
    },
    plugins: []
  }