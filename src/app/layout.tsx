"use client";
import "./globals.css";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';
const metadata: Metadata = {
  title: "portal",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
    const checkAuth = () => {

      const email = localStorage.getItem("email");
    

      if (!email)
        router.push('/login');
       }

    checkAuth();
  }, [])
  return (
    
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      
      <QueryClientProvider client={queryClient}>
      {isClient && <ToastContainer />}
        <body className={inter.className + "h-[100vh] overflow-hidden"}>
        {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
