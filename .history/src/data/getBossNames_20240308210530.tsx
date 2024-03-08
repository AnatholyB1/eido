import axios from 'axios';

export async function getBossNames() {
  try {
      const response = await axios.get('/api/list');
    return response.data.message
  } catch (error) {
    console.error(error);
  }
}
