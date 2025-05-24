import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs' // Explicit path to config
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})