import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Hash the password with a salt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Here, you would store the username and hashed password in your database
      // For this example, we'll just send them back in the response
      res.status(200).json({ username, hashedPassword });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: 'Method not allowed' });
  }
}