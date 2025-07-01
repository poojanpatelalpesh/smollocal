import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: false,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '35f7-2405-201-200a-919f-dd7c-793a-b0b1-1b47.ngrok-free.app',
    ]
  }
})
