import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wastebin': {
        target: 'http://14.225.255.120', // Địa chỉ backend của bạn
        changeOrigin: true, // Giúp thay đổi nguồn gốc của yêu cầu nếu cần thiết
        secure: true, // Nếu backend không sử dụng HTTPS
        rewrite: (path) => path.replace(/^\/wastebin/, '/wastebin'), // Đảm bảo đường dẫn giữ nguyên
      },
    },
  },
});
