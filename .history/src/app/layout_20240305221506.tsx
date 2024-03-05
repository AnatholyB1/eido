import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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

  if (!isConnected()) {
    // If not authenticated, redirect to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
