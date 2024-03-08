import { z } from "zod"
import axios from 'axios';
import { formSchema } from "@/app/page";

export async function createUserStatById(data : z.infer<typeof formSchema>) {
  try {
      const response = await axios.put('/api/stats/createStatsbyUser', data);
    return response
  } catch (error) {
    return false
  }
}
