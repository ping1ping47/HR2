import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
      '@fullcalendar/vue3',
      '@fullcalendar/daygrid',
      'axios',
      // และโมดูลอื่น ๆ ที่คุณใช้
    ],
  },
})
