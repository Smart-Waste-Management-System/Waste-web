export default async function handler(req, res) {
    if (req.method === 'GET') {
      const response = await fetch('http://14.225.255.120/wastebins/all');
      const data = await response.json();
  
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  