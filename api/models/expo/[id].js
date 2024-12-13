export default async function handler(req, res) {
  const { id } = req.query; // Lấy id từ URL query

    if (req.method === 'GET') {
      const response = await fetch(`http://14.225.255.120/models/expo/${id}`);
      const data = await response.json();
  
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  