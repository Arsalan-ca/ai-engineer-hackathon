"use client";

import Image from "next/image";
import UserInformation from "./userInfo";
import { useEffect, useState } from "react";
import UserDetails from "./userDetails";

type UserInfo = {
  id: string,
  name: string,
  years_of_experience: number,
  experience: string | null,
  location: string | null,
  keywords: string | null,
  commitment: string | null,
  description: string | null,
  companies: string | null,
  job_titles: string | null
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<UserInfo | null>(null);
  
  console.log("!!!!!!!1", isLoading)
  useEffect(() => {
    setIsLoading(true)
  })
  const handleProfileClick = (candidate: UserInfo) => {
    setIsSelected(candidate)
    setIsOpen(true)  
  };

  const handleCloseClick = () => {
    setIsOpen(false)
  };


  return (
    <div className="flex-1 h-screen w-screen bg-white items-center justify-items-center">
      <h1 className="text-black font-bold text-4xl p-3">Welcome to 10x AI Engineer Hackathon</h1>
      <div className="w-full max-w-4xl min-w-[100px]">
        <div className="relative">
          <input type="text" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Software Engineers with 5+ years of experience..." />
          <button
            className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            
          >
            Search
          </button>
        </div>
      </div>
      {!isLoading ? (
                <div className="flex justify-center items-center w-full min-h-screen">
                    <span className="loading loading-spinner text-accent loading-lg"></span>
                </div>
            ) : (
            <div className="w-full">
              <UserInformation 
                onOpen={handleProfileClick}/>
              <div className={`fixed top-0 right-0 w-4/6 h-full z-10 transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
                <UserDetails 
                  onClose={handleCloseClick}
                  selectedCandidate={isSelected}
                />
              </div>
            </div>
            )}
            
      
    </div>
  );
}
