import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // base: '/koala-movies/',
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: resolve(__dirname, 'index.html') // Entry point for the build
    }
  },
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#mdc-imports': path.resolve(__dirname, './stub-mdc-imports.js'),
      '#mdc-configs': path.resolve(__dirname, './stub-mdc-imports.js'),
    },
  },
})
