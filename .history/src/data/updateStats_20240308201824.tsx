import { z } from "zod"
import axios from 'axios';
import { formSchema } from "@/app/page";

export async function updateUserStatById(id : string, data : z.infer<typeof formSchema>) {
  try {
      const response = await axios.patch('/api/stats/updateStatsbyUser/' + id, data);
    return response
  } catch (error) {
    return false
  }
}
