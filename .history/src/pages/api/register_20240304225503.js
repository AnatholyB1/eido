import {nextConnect} from 'next-connect';
import bcrypt from 'bcrypt';
import formidable from 'formidable';

const handler = nextConnect()
  .use(async (req, res, next) => {
    if (req.method === 'POST') {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({ error: 'Form parsing failed' });
          return;
        }
        req.body = fields;
        next();
      });
    } else {
      next();
    }
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password with a salt
        const hashedPassword = await bcrypt.hash(password, 10);
        const { mongoClient } = await connectToDatabase()
        
        // Get the 'eido' database and the 'name_list' collection
        const db = mongoClient.db('eido');
        const collection = db.collection('user');

        await collection.insertOne({ username : username, password: hashedPassword });
        // Here, you would store the username and hashed password in your database
        // For this example, we'll just send them back in the response
        res.status(200).json({ username, hashedPassword });
        } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
        }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;