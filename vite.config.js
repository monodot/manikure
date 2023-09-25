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
  define: {
    'process.env.FARO_API_URL': process.env.FARO_API_URL !== undefined ? JSON.stringify(process.env.FARO_API_URL) : JSON.stringify('http://localhost:4317'),
    'process.env.FARO_APP_ENVIRONMENT': process.env.FARO_APP_ENVIRONMENT !== undefined ? JSON.stringify(process.env.FARO_APP_ENVIRONMENT) : JSON.stringify('development'),
  }
})
