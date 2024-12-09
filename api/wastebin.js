// api/wastebin.js
export default async function handler(req, res) {
    const apiUrl = `http://14.225.255.120${req.url}`;
    try {
      const response = await fetch(apiUrl, {
        method: req.method, // Giữ nguyên phương thức HTTP (GET, POST, PUT, DELETE)
        headers: req.headers,
        body: req.body, // Nếu có body (chẳng hạn khi dùng POST hoặc PUT)
      });
  
      // Nếu có lỗi từ server bên ngoài
      if (!response.ok) {
        return res.status(response.status).json({ message: 'Error from backend' });
      }
  
      const data = await response.json(); // Giả sử dữ liệu trả về là JSON
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  