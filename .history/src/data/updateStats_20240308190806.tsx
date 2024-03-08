import axios from 'axios';

export async function updateUserStatById(id : string) {
  try {
      const response = await axios.put('/api/stats/updateStatsbyUser/' + id);
    return response
  } catch (error) {
    return false
  }
}
