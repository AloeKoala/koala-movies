import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import { fileURLToPath } from 'url'

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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
