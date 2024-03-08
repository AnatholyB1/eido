import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 
export const formSchema = z.object({
  nom: z.string().min(1, { message: 'The name is required' }),
  frag: z.number(),
  clef: z.number(),
  etoile_1: z.boolean(),
  etoile_2: z.boolean(),
  etoile_3: z.boolean(),
  etoile_4: z.boolean(),
  souhait_1: z.boolean(),
  souhait_2: z.boolean(),
  souhait_3: z.boolean(),
  souhait_4: z.boolean(),
  souhait_5: z.boolean(),
  souhait_6: z.boolean(),
  obtenu: z.boolean(),
  userId: z.string(),

})
