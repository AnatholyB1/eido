import { connectToDatabase } from "../../../lib/connectToDatabase";

export default async function handler(request, response){

    try {
        // Connect to the MongoDB database
        const { mongoClient } = await connectToDatabase()

        // Get the 'eido' database and the 'name_list' collection
        const db = mongoClient.db('eido');
        const collection = db.collection('name_list');

        const result = await collection.find({}).toArray();
        
        response.status(200).json({ message: result });
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Unable to connect to database' });
    } 
}