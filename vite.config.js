import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/app.tsx',
        'resources/css/app.css',
      ],
      refresh: true,
      buildDirectory: 'build/app',
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
      '@': '/resources/js',
    },
  },
});
