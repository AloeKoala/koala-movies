import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/koala-movies/',
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'violet',
          neutral: 'slate',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias for src directory
    },
  },
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: resolve(__dirname, 'index.html'), // Entry point for the build
    },
  },
})
