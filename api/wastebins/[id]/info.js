export default async function handler(req, res) {
    const { id } = req.query; // Lấy param từ URL
  
    if (req.method === 'GET') {
      // Fetch dữ liệu từ backend
      const response = await fetch(`http://14.225.255.120/wastebins/${id}/info`);
      const data = await response.json();
  
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  