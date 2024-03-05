import { IncomingForm } from 'formidable';
import { connectToDatabase } from "../../../../lib/connectToDatabase";
import { isConnected } from '../../../../lib/session';
import { getUserSession } from '../../../../lib/session';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
    if (req.method === 'POST' && isConnected())
    {
        const form = new IncomingForm();
      
        form.parse(req, async (err, fields, files) => {
          
            if (err) {          
                res.status(500).json({ error: 'Form parsing failed' });
                return;
            }
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

                console.log(userSession)
                
                const result = await collection.insertOne({
                    nom: nom[0],
                    frag: frag[0],
                    clef: clef[0],
                    etoile_1: etoile_1[0],
                    etoile_2: etoile_2[0],
                    etoile_3: etoile_3[0],
                    etoile_4: etoile_4[0],
                    souhait_1: souhait_1[0],
                    souhait_2: souhait_2[0],
                    souhait_3: souhait_3[0],
                    souhait_4: souhait_4[0],
                    souhait_5: souhait_5[0],
                    souhait_6: souhait_6[0],
                    obtenu: obtenu[0],
                    userId: userSession.userId
                })
              
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