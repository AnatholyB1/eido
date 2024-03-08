import axios from 'axios';

async function getStatsByUser() {
  try {
    const response = await axios.get('/api/getStatsbyUser');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getStatsByUser();