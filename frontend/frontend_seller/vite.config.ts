import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from LAN or external URLs
    strictPort: false,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '17d3-2405-201-200a-919f-ad80-5289-f13f-61ce.ngrok-free.app',
    ]
  }
})
