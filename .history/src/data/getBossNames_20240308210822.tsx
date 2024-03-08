import axios from 'axios';

export async function getBossNames() {
  try {
      const response = await axios.get('/api/list');
    return response.data.message.map((boss: {_id : string, name: string}) => boss.name);
  } catch (error) {
      console.error(error);
      return([] as string[])
  }
}
