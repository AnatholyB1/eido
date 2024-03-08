import axios from 'axios';

export async function getConnectedCall() {
  try {
      const response = await axios.get('/api/isConnected');
    return response.status === 200
  } catch (error) {
    console.error(error);
  }
}
