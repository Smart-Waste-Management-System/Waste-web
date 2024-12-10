export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { Email, Password, First_Name, Last_Name, Phone, Category, Gender, Role } = req.body;
  
      if (!Phone || !Password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const mappedBody = {
        email: Email,
        password: Password,
        first_name: First_Name,
        last_name: Last_Name,
        phone: Phone,
        category: Category,
        gender: Gender,
        role: Role,
      };
  
      try {
        const response = await fetch('http://14.225.255.120/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mappedBody),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          return res.status(201).json({ message: 'User registered successfully', user: data });
        } else {
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
  