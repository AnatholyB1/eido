import axios from 'axios';

export async function getConnectedCall() {
  try {
      const response = await axios.get('/api/isConnected');
    return response
  } catch (error) {
    console.error(error);
  }
}
