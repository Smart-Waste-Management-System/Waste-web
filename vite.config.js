import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wastebin': {
        target: 'https://www.waste.congmanh18.click',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/wastebin/, '/wastebin'),
      },
    },
  },
});

