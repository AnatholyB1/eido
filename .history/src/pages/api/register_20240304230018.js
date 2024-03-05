import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Hash the password with a salt
      const hashedPassword = await bcrypt.hash(password, 10);
      const { mongoClient } = await connectToDatabase()
      
      // Get the 'eido' database and the 'name_list' collection
      const db = mongoClient.db('eido');
      const collection = db.collection('user');

      await collection.insertOne({ username : username, password: hashedPassword });

      res.status(200).json({ username, hashedPassword });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Registration failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}