import axios from 'axios';

export async function getStatsByUser() {
  try {
      const response = await axios.get('/api/stats/getStatsbyUser');
    return response
  } catch (error) {
    console.error(error);
  }
}
