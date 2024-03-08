import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar  from '@/components/layout/navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eido",
  description: "Simple app for game data visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <header><Navbar /></header>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
