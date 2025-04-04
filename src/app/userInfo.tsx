"use client";

import { useEffect, useState } from "react";
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import {supabase} from "../lib/supabase";

interface UserInfoProps {
    onOpen: (candidate: UserInfo) => void;
}

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

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// if (!SUPABASE_URL || !SERVICE_ROLE_KEY){
//     throw new Error('Missing Supabase environment variables.');
// }
// const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);


export default function UserInformation({onOpen}: UserInfoProps) {
    const [candidateData, setCandidateData] = useState<UserInfo[]>([]);

    useEffect(() => {
        async function fetchCandidate() {
            const { data, error } = await supabase
                .from('candidates')
                .select('*')
            
            if(error){
                throw new Error('Error fetching candidates', error)
            }
            if(data){
                setCandidateData(data as UserInfo[]); 
            }
        }
        fetchCandidate();
    }, []); 

    console.log('!data ', candidateData);


    return (
    <div className="bg-white p-6 text-black">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidateData.map((candidate, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 w-full text-md">
                <div className="flex items-center justify-between">
                    <img 
                        src={"./favicon.ico"} 
                        alt="" 
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <h2 className="text-xl font-semibold">
                        {candidate.name} | Exp: {candidate.years_of_experience} years
                    </h2>
                    <button 
                        className="ml-auto bg-blue-700 text-white px-4 py-2 rounded-lg group inline-flex items-center transition-all duration-300 min-w-0 text-sm overflow-hidden"
                        onClick={() => onOpen(candidate)}
                    >
                        <span className="transition-all duration-300 ">
                            View profile
                        </span>
                        <span className="hidden group-hover:inline transition-opacity duration-200 ml-1">→</span>
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-gray-600">{candidate.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="mt-4 flex-grow basis-0 min-w-0">
                        <h3 className="font-semibold">Expert in</h3>
                        <div className="flex flex-wrap mt-2 text-blue-700">
                            {typeof candidate.keywords === 'string' && candidate.keywords.split(',').map((skill: string, i: number) => (
                                <span 
                                    key={i} 
                                    className="bg-blue-100  px-3 py-1 rounded-full mr-2 mb-2 text-[12px]"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 flex-grow basis-0 min-w-0 text-right">
                        <h3 className="font-semibold">Commitment</h3>
                        <div className="flex flex-row justify-end mt-2 ">
                            {typeof candidate.commitment == 'string' && candidate.commitment.split(',').map((skill: string, i: number) => (
                                <span 
                                    key={i}
                                    className="bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2 text-[12px]">
                                        {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div> 
            </div>
        ))}
    </div>
</div>

    );
}





{/* <div class="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
    <div class="flex items-center">
        <img src="https://placehold.co/60x60" alt="Profile picture of V. D." class="w-16 h-16 rounded-full mr-4">
        <div>
            <h2 class="text-xl font-semibold">V. D. | Exp: 6 years</h2>
            <p class="text-gray-600">Led Anduril's software platform development with deployment in active war zones.</p>
        </div>
        <button class="ml-auto bg-purple-500 text-white px-4 py-2 rounded-lg">View profile</button>
    </div>
    <div class="mt-4">
        <h3 class="font-semibold">Expert in</h3>
        <div class="flex flex-wrap mt-2">
            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">Python</span>
            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">Pytorch</span>
            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">Docker</span>
            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">C++</span>
            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">SQL</span>
        </div>
    </div>
    <div class="mt-4">
        <h3 class="font-semibold">Commitment</h3>
        <div class="flex flex-wrap mt-2">
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">Full-time</span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">Part-time</span>
        </div>
    </div>
</div> */}



