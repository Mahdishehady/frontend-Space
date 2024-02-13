"use client"

import { Metadata } from "next"
import { ReactNode } from "react"
import TeamSwitcher from "@/components/HeaderComponents/team-switcher"
import { MainNav } from "@/components/HeaderComponents/main-nav"
import { Search } from "@/components/HeaderComponents/search"
import { UserNav } from "@/components/HeaderComponents/user.nav"
import { Sidebar } from "@/components/HeaderComponents/sidebar"
import { playlists } from "../../HeaderComponents/data/playlist"
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';
interface MyComponentProps {
  children: ReactNode;
}


export const metadata: Metadata = {
  title: "Analytics App",
  description: "Website that shows the analytics.",
}

export default function MainLayout({ children }: MyComponentProps) {

  const queryClient = new QueryClient();


  return (
    <>
<ToastContainer />
      <QueryClientProvider client={queryClient}>
      <div className=" md:block overflow-y-hidden ">
        <div className="border-b">
          <div className="flex h-16 items-center justify-center px-4">
            <div className="flex justify-center items-center">
            <TeamSwitcher />
            <MainNav className="mx-6 pb-2" />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <div className="hidden md:block"><Search /></div>
              
              <UserNav />
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-6">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-5 lg:border-l">
                <div className="h-[91vh]  px-4 py-2 lg:px-8 overflow-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </QueryClientProvider>
    </>
  )
}