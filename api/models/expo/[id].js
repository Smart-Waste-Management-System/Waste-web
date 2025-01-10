export default async function handler(req, res) {
  const { id } = req.query; // Lấy id từ URL query

    if (req.method === 'GET') {
      const response = await fetch(`http://203.145.47.225:8080/models/expo/${id}`);
      const data = await response.json();
  
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  