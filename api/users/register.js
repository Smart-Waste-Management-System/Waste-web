export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password, first_name, last_name, phone, category, gender, role } = req.body;
      console.log(req.body);

      if (!phone || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    
      try {
        console.log("Sending request to external API...");
        const response = await fetch(`http://14.225.255.120/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, first_name, last_name, phone, category, gender, role }),
        });
  
        let data;
        try {
          data = await response.json();
        } catch (err) {
          console.error("Error parsing JSON from external API:", err);
          return res.status(500).json({ error: 'Invalid response from external API' });
        }
  
        if (response.ok) {
          return res.status(201).json({ message: 'User registered successfully', user: data });
        } else {
          console.error("External API error:", data.error);
          return res.status(response.status).json({ error: data.error || 'Registration failed' });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  