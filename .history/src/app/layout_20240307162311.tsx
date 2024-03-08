'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/navbar';


import {
  RecoilRoot,
} from 'recoil';


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <Navbar />
          {children}
          <Toaster />
        </RecoilRoot>
      </body>
    </html>
  );
}
