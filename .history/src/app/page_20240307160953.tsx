"use client"
import Image from "next/image";
import './globals.css'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStatsByUser } from "@/data/userStats";
import { getConnectedCall } from "@/data/connection";
import { useToast } from "@/components/ui/use-toast";
import { atom, useRecoilState } from 'recoil';


  const userData = atom({
  key: 'userData', // unique ID (with respect to other atoms/selectors)
  default: [], // default initial value
  });


export default function Home() {

  const router = useRouter();
  const {toast} = useToast();
  



  useEffect(() => {
    getStatsByUser().then((res) => {
      console.log(res?.data.message)
    }).catch(() => {
      toast({
        title: 'Error',
        description: 'There was an error fetching the user stats',
      })
    }
    )
  },[toast])
  
  
  useEffect(() => {
    if (!getConnectedCall()) {
     router.push('/login')
    }
  }, [router])
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
