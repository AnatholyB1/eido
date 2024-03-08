
import { serialize } from 'cookie';
import { isConnected } from '../../../lib/session';


export default async function handler(req, res) {
  if (req.method === 'GET') {
      try {
          if (!isConnected(req))
          {
              res.status(401).json({ error: 'Not connected' });
          }
        res.status(200).json({ message: 'connected' });
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'failed' });
      }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}