"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Playlist } from "./data/playlist"
import { usePathname } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { useState } from "react"
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
}

export function getFirstStringBetweenSlashes(inputString: string): string | null {
  const match = inputString.match(/\/([^/]+)\//);
  if (match && match[1]) {
    return match[1];
  }
  return null; // Return null if no match is found
}

export function Sidebar({ className }: SidebarProps) {

 

  const pathname = usePathname()

  

  

  const renderheightanomalySidebar = (str: string) =>{ 
    

   


    return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">

          <Accordion type="single" collapsible defaultValue={str} className="w-full">


            <AccordionItem value="item-1" className="data-[state=closed]:border-none ">
              <AccordionTrigger>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-4 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <p className="text-sm ">Analysis</p>
                </div>
              </AccordionTrigger>

              <AccordionContent  >

                <Link
                  href="/heightanomaly/analysis/tables"
                  className='text-sm transition-colors hover:text-primary'
                >
                  <div className="pl-9 m-4"> Tables</div>
                </Link>




              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="data-[state=closed]:border-none">
              <AccordionTrigger>

                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  ml-4 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg> <p className=" text-sm ">

                    Point
                  </p>
                </div></AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">

                  <Link
                    href="/heightanomaly/point/addpoint"
                    className='text-sm transition-colors hover:text-primary'
                  >
                    <div className="pl-9 m-4"> AddPoint</div>
                  </Link>


                  

                  <Link
                    href="/heightanomaly/point/baselineandtemp"
                    className='text-sm transition-colors hover:text-primary'
                  >
                    <div className="pl-9 m-4"> Start_End Points</div>
                  </Link>

                

                </div>
              </AccordionContent>
            </AccordionItem>


          </Accordion>

         




         

        </div>
      </div>
    </div>
  )};



  


  let check: String;
  if (getFirstStringBetweenSlashes(pathname + '/')=== "heightanomaly")
  
  { check = "/heightanomaly" }
  else if(getFirstStringBetweenSlashes(pathname+ '/')==="advertiser")
  
  { check = "/advertiser" }
  else {
    check = "/admin"
  }
console.log(pathname);

  switch (check) {
    case "/admin":
      // return renderAdminSidebar();
    case "/heightanomaly":
      if (pathname.includes("/heightanomaly/analysis"))
      {return renderheightanomalySidebar('item-1');}
      if(pathname.includes("/heightanomaly/point"))
      return renderheightanomalySidebar('item-2')
    return renderheightanomalySidebar('')
    case "/advertiser":
      if (pathname.includes("/advertiser/media-planner"))
        return
      // return renderAdvertiserSidebar('item-1');
      // return renderAdvertiserSidebar('');
    default:
      return null;
  }


}