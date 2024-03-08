import axios from 'axios';

export async function getBossNames() {
  try {
      const response = await axios.get('/api/list');
    return response
  } catch (error) {
    console.error(error);
  }
}
