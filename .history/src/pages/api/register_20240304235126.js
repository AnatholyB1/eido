import { IncomingForm } from 'formidable';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../../lib/connectToDatabase';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Form parsing failed' });
        return;
      }

        const { username, password } = fields

      try {
            // Hash the password with a salt
            const hashedPassword = await bcrypt.hash(password[0], 10);
            const { mongoClient } = await connectToDatabase()
            
            // Get the 'eido' database and the 'name_list' collection
            const db = mongoClient.db('eido');
            const collection = db.collection('user');

            await collection.insertOne({ username : username[0], password: hashedPassword, permission : 'user' });
            res.status(200).json({ username : username[0], hashedPassword : hashedPassword });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Registration failed' });
        }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}