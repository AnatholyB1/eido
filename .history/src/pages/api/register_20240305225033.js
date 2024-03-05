import { IncomingForm } from 'formidable';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../../lib/connectToDatabase';
import { serialize } from 'cookie';

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
          
            const user = await collection.findOne({ username : username });
        
            if (user) {
                res.status(401).json({ error: 'user already exist' });
                return;
            } 
              

            const result = await collection.insertOne({ username: username, password: hashedPassword, permission: 'user' });
          
                    
            const session = { username, loggedInAt: new Date() };
            global.session = session;
          
            const cookie = serialize('session', JSON.stringify(session), {
                maxAge: 60 * 60 * 24,  // 1 day
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'lax',
                username: username,
                permission: 'user',
                userId: result.insertedId,
            });
          
            res.setHeader('Set-Cookie', cookie);    
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Registration failed' });
        }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}