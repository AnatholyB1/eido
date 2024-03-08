"use client"
import './globals.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStatsByUser } from "@/data/userStats";
import { getConnectedCall } from "@/data/connection";
import { useToast } from "@/components/ui/use-toast";
import { atom, useRecoilState } from 'recoil';
import { Skeleton } from "@/components/ui/skeleton";

  const userData = atom({
    key: 'userData', // unique ID (with respect to other atoms/selectors)
    default: [], // default initial value
  });


export default function Home() {

  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useRecoilState(userData);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if(data.length > 0) return;
    getStatsByUser().then((res) => {
      setLoading(false)
      setData(res?.data.message)
    }).catch(() => {
      toast({
        title: 'Error',
        description: 'There was an error fetching the user stats',
      })
    }
    )
  },[toast, setData, data])
  
  
  useEffect(() => {
    if (!getConnectedCall()) {
     router.push('/login')
    }
  }, [router])
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ComponentSelector
        FalseElement={<Skeleton className="" />}
        TrueElement={<div />}
        validator={() => !loading}
      />
    </main>
  );
}




interface ComponentSelectorProps {
  TrueElement: React.ReactNode;
  FalseElement: React.ReactNode;
  validator: () => boolean;
}

export function ComponentSelector({ TrueElement, FalseElement, validator }: ComponentSelectorProps) {
  return validator() ? TrueElement : FalseElement;
}






import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stats = {
  _id: string;
  nom: string;
  frag: number;
  clef: number;
  etoile_1: string;
  etoile_2: string;
  etoile_3: string;
  etoile_4: string;
  souhait_1: string;
  souhait_2: string;
  souhait_3: string;
  souhait_4: string;
  souhait_5: string;
  souhait_6: string;
  obtenu: 'oui' | 'non';
  userId: string;
};

export const columns: ColumnDef<Stats>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
