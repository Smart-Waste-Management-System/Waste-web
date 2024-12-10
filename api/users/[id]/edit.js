export default async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === 'PATCH') {
      const response = await fetch(`http://14.225.255.120/users/${id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  