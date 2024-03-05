import { IncomingForm } from 'formidable';
import { connectToDatabase } from "../../../../../lib/connectToDatabase";
import { isConnected } from '../../../../../lib/session';

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

      
          
            const { username, password } = fields;

        
          
            try {
            
              
                const { mongoClient } = await connectToDatabase()

              
                // Get the 'eido' database and the 'user' collection
          
                const db = mongoClient.db('eido');
              
                const collection = db.collection('eido');
        
              
                res.status(200).json({ message: 'Login successful' });
      
          
            } catch (error) {
        
              
                console.log(error)
        
              
                res.status(500).json({ error: 'Login failed' });
      
          
            }
    
      
        });
  
  
    } else {
    
      
        res.status(405).json({ message: 'Method not allowed or not connected' });
  
  
    }
}