import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wastebin': {
        target: 'http://14.225.255.120',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/wastebin/, '/wastebin'),
      },
    },
  },
});