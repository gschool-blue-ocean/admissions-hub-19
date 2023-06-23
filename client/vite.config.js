import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },
  plugins: [react()]
})
