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
    'process.env.NODE_ENV': process.env.NODE_ENV !== undefined ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('development'),
  }
})
