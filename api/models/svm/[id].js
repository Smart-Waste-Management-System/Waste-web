export default async function handler(req, res) {
    if (req.method === 'POST') {
      const response = await fetch(`http://14.225.255.120/models/svm/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  