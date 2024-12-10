export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
      const response = await fetch(`http://14.225.255.120/reports/last/${id}`);
      const data = await response.json();
  
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  