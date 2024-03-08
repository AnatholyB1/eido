"use client"
import Image from "next/image";
import './globals.css'
import { useEffect } from "react";
import { isConnected } from "../../lib/session"
import { useRouter } from "next/navigation";
import { getStatsByUser } from "@/data/userStats";

export default function Home() {

  const router = useRouter();
  const stats = getStatsByUser()
  useEffect(() => {
    if (!isConnected()) {
     router.push('/login')
    }
  }, [router])
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
