export default async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === 'DELETE') {
      const response = await fetch(`http://14.225.255.120/reports/${id}/remove`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  