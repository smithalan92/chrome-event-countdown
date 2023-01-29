import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  server: {
    port: 8000,
    open: true,
  },
  build: {
    chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER, // We dont care for a chrome extension
  },
  resolve:{
    alias:{
      '@': path.join(__dirname, './src'),
      '@sections': path.join(__dirname, './src/components/sections'),
      '@modals': path.join(__dirname, './src/components/modals'),
      '@widgets': path.join(__dirname, './src/components/widgets'),
    },
  },
})
