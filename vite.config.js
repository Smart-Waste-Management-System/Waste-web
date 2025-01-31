import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://203.145.47.225:8080',
        changeOrigin: true,
        secure: false, // Nếu backend không dùng HTTPS
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
