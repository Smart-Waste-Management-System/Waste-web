import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://14.225.255.120',
        changeOrigin: true,
        secure: false, // Nếu backend không dùng HTTPS
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       const { email, password, first_name, last_name, phone, category, gender, role} = req.body;
  
//       if ( !phone || !password) {
//         return res.status(400).json({ error: 'Missing required fields' });
//       }
  
//       try {
//         const response = await fetch('http://14.225.255.120/users/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({  email, password, first_name, last_name, phone, category, gender, role}),
//         });
  
//         const data = await response.json();
        
//         if (response.ok) {
//           return res.status(200).json({ message: 'User registered successfully', user: data });
//         } else {
//           return res.status(response.status).json({ error: data.error || 'Registration failed' });
//         }
//       } catch (error) {
//         console.error("Error during registration:", error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//     } else {
//       return res.status(405).json({ error: 'Method Not Allowed' });
//     }
//   }
  