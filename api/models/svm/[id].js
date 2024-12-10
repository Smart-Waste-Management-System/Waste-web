export default async function handler(req, res) {
  const { id } = req.query; // Lấy id từ URL query

  if (req.method === 'GET') {
    try {
      const response = await fetch(`http://14.225.255.120/models/svm/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      // Kiểm tra trạng thái của response từ bên ngoài
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error fetching data from external API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
