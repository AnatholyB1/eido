import { connectToDatabase } from '../../../../lib/connectToDatabase';
import { getUserSession } from '../../../../lib/session';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Check if the user is connected
  const session = getUserSession(req);
  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  // Check if the request is a DELETE request
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const { id } = req.query;
  console.log(id)
  try {
    const { mongoClient } = await connectToDatabase()

    // Get the 'eido' database
    const db = mongoClient.db('eido');

    // Delete the 'eido' collection
    const result = await db.collection('eido').deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ message: result });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to delete collection' });
  }
}