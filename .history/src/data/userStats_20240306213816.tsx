import axios from 'axios';

async function getStatsByUser() {
  try {
    const response = await axios.get('http://your-api-url/api/getStatsbyUser');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getStatsByUser();