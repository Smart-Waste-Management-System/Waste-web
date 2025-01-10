export default async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === 'PUT') {
      const response = await fetch(`http://203.145.47.225:8080/users/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  