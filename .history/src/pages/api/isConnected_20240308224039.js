
import { isConnected } from '../../../lib/session';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!isConnected(req)) {
        res.status(401).json({ error: 'Not connected' });
        return;  // Add this line
      }
      res.status(200).json({ message: 'connected' });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'failed' });
      return;
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
}