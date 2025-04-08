"use client";

import Image from "next/image";
import UserInformation from "./userInfo";
import { useEffect, useState } from "react";
import UserDetails from "./userDetails";
import FilterModal from "./components/filterModal";
import axios from "axios";

type UserInfo = {
  id: string,
  name: string,
  years_of_experience: number,
  experience: ExperienceItem[] | null,
  location: string | null,
  keywords: string | null,
  commitment: string | null,
  description: string | null,
  companies: string | null,
  job_titles: string | null,
  profile_img: string | null
};

type ExperienceItem = {
  title: string | null,
  company: string | null,
  end_date: string | null,
  start_date: string  | null,
  accomplishments: string[] | null,
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<UserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textQuery, setTextQuery] = useState('');

  
  useEffect(() => {
    setIsLoading(true);
  }, []);
  
  const handleProfileClick = (candidate: UserInfo) => {
    setIsSelected(candidate)
    setIsOpen(true)  
  };

  const handleCloseClick = () => {
    setIsOpen(false)
  };


  const sendQuerySearch = async (query: string) => {
    console.log("!!!! Sending query:", query);
    if (!query) {
      console.error("No query provided");
      return;
    }

    try {
      const response = await axios.get('/api/ai-search', {
        params: { searchQuery: query },
      })

      console.log("!! Response:", response.data);


    } catch (error) {
      console.error("Error fetching candidates:", error);
    }

}


  return (
    <div className="flex-1 h-screen w-screen bg-white items-center justify-items-center">
      <h1 className="text-black font-bold text-4xl p-3">Welcome to 10x AI Engineer Hackathon</h1>
      <div className="w-full max-w-4xl min-w-[100px]">
      <div className="relative">
        <input
          type="text"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-32 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Software Engineers with 5+ years of experience..."
          value={textQuery}
          onChange={(e) => setTextQuery(e.target.value)}
        />
        <div className="absolute top-1 right-1 flex space-x-2">
          <button
            className="rounded bg-slate-800 py-1 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50"
            onClick={() => sendQuerySearch(textQuery)}>
            Search
          </button>
          <button
            className="rounded bg-slate-800 py-1 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setIsModalOpen(true)}
          >
            Filters
          </button>
        </div>
      </div>

      </div>
      {!isLoading ? (
            <div className="flex justify-center items-center w-full min-h-screen">
                <span className="loading loading-spinner text-accent loading-lg"></span>
            </div>
            ) : (
            <div className="w-full">
              {isModalOpen && (
                  <FilterModal onClose={() => setIsModalOpen(false)}/>
              )}
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
