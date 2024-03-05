import { IncomingForm } from 'formidable';
import { connectToDatabase } from "../../../../../lib/connectToDatabase";
import { isConnected } from '../../../../../lib/session';
import { getUserSession } from '../../../../../lib/session';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
    if (req.method === 'PATCH' && isConnected())
    {
        const form = new IncomingForm();
        const { id } = req.query;
        form.parse(req, async (err, fields, files) => {
          
            if (err) {          
                res.status(500).json({ error: 'Form parsing failed' });
                return;
            }

            console.log(fields)
        const {
                nom,
                frag,
                clef,
                etoile_1,
                etoile_2,
                etoile_3,
                etoile_4,
                souhait_1,
                souhait_2,
                souhait_3,
                souhait_4,
                souhait_5,
                souhait_6,
                obtenu } = fields;
            try {
                const { mongoClient } = await connectToDatabase()
                // Get the 'eido' database and the 'user' collection
          
                const db = mongoClient.db('eido');
              
                const collection = db.collection('eido');
                const userSession = getUserSession(req)
                
                const result = await collection.updateOne({ _id: new ObjectId(id) },{$set : fields})

                res.status(200).json({ message: result });

            } catch (error) {

                console.log(error)
                res.status(500).json({ error: 'insertion failed' });
                
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed or not connected' });
    }
}