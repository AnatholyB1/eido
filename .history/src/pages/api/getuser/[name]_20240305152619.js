// pages/api/user/[param].js
import { connectToDatabase } from "../../../../lib/connectToDatabase";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { param } = req.query;

    try {
      const { mongoClient } = await connectToDatabase()
      
      // Get the 'eido' database and the 'user' collection
      const db = mongoClient.db('eido');
      const collection = db.collection('user');

      let user;

      // Check if param is an ObjectId
      if (ObjectId.isValid(param)) {
        user = await collection.findOne({ _id: ObjectId(param) });
      } else {
        user = await collection.findOne({ username: param });
      }

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}