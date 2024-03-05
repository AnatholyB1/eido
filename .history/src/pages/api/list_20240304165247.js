import { connectToDatabase } from "../../../lib/connectToDatabase";

export default async function handler(request, response){
    try {
        const { mongoClient } = await connectToDatabase();
        const db = mongoClient.db('sample-restaurants');
        const collection = db.collection('restaurants');
        const results = await collection
            .find({})
            .limit(10)
            .toArray();
        
        response.status(200).json(results);
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Unable to connect to database' });
    };
}