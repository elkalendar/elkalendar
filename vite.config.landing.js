import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import autoprefixer from "autoprefixer";
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/landing.css',
      ],
      refresh: true,
      buildDirectory: 'build/landing',
    }),
    react(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        tailwindcss(),
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
});
