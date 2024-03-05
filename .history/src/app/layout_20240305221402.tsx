import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isConnected } from '../../lib/session';

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

  const router = useRouter();

    useEffect(() => {
      if (!isConnected()) {
        router.push('/login');
      }
    }, [router]);
  
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
