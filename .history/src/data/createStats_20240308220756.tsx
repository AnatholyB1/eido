import { z } from "zod"
import axios from 'axios';
import { formSchema } from "@/app/type";

export async function createUserStat(data : z.infer<typeof formSchema>) {
  try {
      const response = await axios.put('/api/stats/createStatsbyUser', data);
    return response
  } catch (error) {
    return false
  }
}
