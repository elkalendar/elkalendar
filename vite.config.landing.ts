import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/landing.css',
        'resources/js/landing/app.tsx'
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
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/resources/js/landing',
    },
  },
});
