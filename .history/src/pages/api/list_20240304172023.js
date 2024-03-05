import { connectToDatabase } from "../../../lib/connectToDatabase";

export default async function handler(request, response){
    try {
        const { mongoClient } = await connectToDatabase();
        const db = mongoClient.db('sample_restaurants');
        const collection = db.collection('restaurants');
        const results = await collection
            .find({
               borough : 'Brooklyn'
            })
            .limit(10)
            .toArray();
        console.log(results);
        response.status(200).json(results);
    } catch (error) {
        console.log(error)
    };
}