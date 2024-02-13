"use client";
import "./globals.css";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

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

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <QueryClientProvider client={queryClient}>
        <body className={inter.className + "h-[100vh] overflow-hidden"}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
