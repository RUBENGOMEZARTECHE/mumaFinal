/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'fondo-base':        '#050505',
        'fondo-secundario':  '#0a0a0a',
        'fondo-superficie':  '#111111',
        'texto-titulo':      '#ffffff',
        'texto-secundario':  '#a1a1aa',
        'texto-principal':   '#e4e4e7',
        'texto-sobre-accion':'#000000',
        'marca-principal':   '#1fe1a7',
        'marca-principal-hover': '#17c994',
        'acento-tecnologico-hover': '#0d0d0d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
