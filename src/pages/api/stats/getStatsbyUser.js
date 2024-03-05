import { connectToDatabase } from "../../../../lib/connectToDatabase";
import { isConnected } from '../../../../lib/session';
import { getUserSession } from '../../../../lib/session';

export default async function handler(req, res) {
    if (req.method === 'GET' && isConnected())
    {
        try {
            const { mongoClient } = await connectToDatabase()
            // Get the 'eido' database and the 'user' collection
        
            const db = mongoClient.db('eido');
            
            const collection = db.collection('eido');
            const userSession = getUserSession(req)
            
            const result = await collection.find({
                userId: userSession.username
            }).toArray();
            
            res.status(200).json({ message: result });

        } catch (error) {

            console.log(error)
            res.status(500).json({ error: 'get failed' });
            
        }
    } else {
        res.status(405).json({ message: 'Method not allowed or not connected' });
    }
}