import { IncomingForm } from 'formidable';
import bcrypt from 'bcrypt';
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

      const { username, password } = fields;

      try {
        const { mongoClient } = await connectToDatabase()
        
        // Get the 'eido' database and the 'user' collection
        const db = mongoClient.db('eido');
        const collection = db.collection('user');

        // Retrieve the user record
        const user = await collection.findOne({ username : username[0] });

        if (!user) {
          res.status(401).json({ error: 'Invalid username or password' });
          return;
        }

        // Compare the password with the hashed password stored in the user record
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          res.status(401).json({ error: 'Invalid username or password' });
          return;
        }

        // Create a session for the user
        // This part depends on how you handle sessions in your application
        // For this example, we'll just create a simple session object
        const session = { username, loggedInAt: new Date() };

        // Store the session on the server
        // This part depends on how you handle sessions in your application
        // For this example, we'll just store the session in a global variable
        global.session = session;

        // Create a session cookie
        const cookie = serialize('session', JSON.stringify(session), {
          maxAge: 60 * 60 * 24,  // 1 day
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        });

        // Set the session cookie in the response
        res.setHeader('Set-Cookie', cookie);

        res.status(200).json({ message: 'Login successful' });
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Login failed' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}