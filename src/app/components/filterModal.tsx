import { useState } from "react";
import axios from "axios";



interface FilterModalProps {
    onClose: () => void; 
  }

export default function FilterModal({onClose}: FilterModalProps) {
    const [skills, setSkills] = useState('');
    const [companies, setCompanies] = useState('');
    const [jobTitles, setJobTitles] = useState('');
    const [location, setLocation] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [filterWords, setFilterWords] = useState('');

    const buildString = () => {
        const combinedString = `Skills: ${skills}, Companies: ${companies}, Job Titles: ${jobTitles}, Location: ${location}, Years of Experience: ${yearsOfExperience}`;
        setFilterWords(combinedString);
    };

    const handleWordFilter = async (query: string) => {
    
        axios.get('/api/ai-search', {
            params: {   filter_words: filterWords }
        })
        .then(response => console.log(response.data));
    
    }

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm w-full" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-lg w-[70vw] relative"
                onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-5 border-b-3 border-b-black p-6 h-[10vh]">
                    <div className="flex col-span-3">
                        <h3 className="text-black text-xl font-semibold mb-6 flex-grow">Filter the Candidates</h3>
                    </div>
                    <div className="flex col-span-2 justify-end gap-4">
                        <button 
                            className="rounded-md border border-slate-300 py-2 px-4 text-sm transition-all shadow-sm 
                                    text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 
                                    focus:text-white focus:bg-slate-800 focus:border-slate-800 
                                    active:text-white active:bg-slate-800 active:border-slate-800 
                                    disabled:opacity-50 h-8">
                            Clear Filter
                        </button>
                        <button 
                            className="rounded-md border border-slate-800 bg-slate-800 text-white py-2 px-4 text-sm transition-all shadow-sm 
                                    hover:bg-white hover:text-slate-800 hover:border-slate-800 
                                    focus:bg-white focus:text-slate-800 
                                    active:bg-white active:text-slate-800 
                                    disabled:opacity-50 h-8"
                            onClick={buildString}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-3 gap-4 text-black p-4 text-sm " >
                    <div className="bg-gray-100 p-2 rounded-2xl space-y-2 row-span-1 col-span-1">
                        <h3>Skills and Keywords:</h3>
                        <input 
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border 
                                    border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none 
                                    focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                        placeholder="Python, React, SQL..."
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        />
                    </div>

                    <div className="bg-gray-100 p-2 rounded-2xl space-y-3 row-span-2 ">
                        <h3>Companies:</h3>
                        <input 
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border 
                                    border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none 
                                    focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Google, Amazon, Microsoft..." 
                        value={companies}
                        onChange={(e) => setCompanies(e.target.value)}
                        />
                        <h3>Job Titles:</h3>
                        <input 
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border 
                                    border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none 
                                    focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Software Developer, Lawyer, Teacher..."
                        value={jobTitles}
                        onChange={(e) => setJobTitles(e.target.value)}
                        />
                    </div>

                    <div className="bg-gray-100 p-2 rounded-2xl space-y-2 row-span-1 col-span-1">
                        <h3>Location:</h3>
                        <input 
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border 
                                    border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none 
                                    focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Toronto, California, Vancouver..." 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="bg-gray-100 p-2 rounded-2xl space-y-2 row-span-1 col-span-1">
                        <h3>Years of Experince:</h3>
                        <input 
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border 
                                    border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none 
                                    focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Min years of experience..." 
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}