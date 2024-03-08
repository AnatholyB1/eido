import { Stats } from '@/app/page';
import axios from 'axios';

export async function updateUserStatById(id : string, data : Stats) {
  try {
      const response = await axios.put('/api/stats/updateStatsbyUser/' + id, data);
    return response
  } catch (error) {
    return false
  }
}
