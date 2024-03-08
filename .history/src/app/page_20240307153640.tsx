"use client"
import Image from "next/image";
import './globals.css'
import { useEffect } from "react";
import { isConnected } from "../../lib/session"
import { useRouter } from "next/navigation";
import { getStatsByUser } from "@/data/userStats";
import { getConnectedCall } from "@/data/connection";

export default function Home() {

  const router = useRouter();
  
  
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
