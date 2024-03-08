import { z } from "zod"

 
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


export type Stats = {
    _id: string;
    nom: string;
    frag: number;
    clef: number;
    etoile_1: boolean;
    etoile_2: boolean;
    etoile_3: boolean;
    etoile_4: boolean;
    souhait_1: boolean;
    souhait_2: boolean;
    souhait_3: boolean;
    souhait_4: boolean;
    souhait_5: boolean;
    souhait_6: boolean;
    obtenu: boolean;
    userId: string;
  };