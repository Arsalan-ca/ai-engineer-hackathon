import { useState } from "react";

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

  type QueryObject = {
    location?: string;
    minYears?: number;
    position?: string;
  };

interface userDetailsProps {
    onClose: () => void;
    selectedCandidate: UserInfo | null;
}

export default function UserDetails({onClose, selectedCandidate}: userDetailsProps) {
    const [isLoading, setIsLoading] = useState(false);
    let parsedExperience: any[] = [];


    if (selectedCandidate?.experience) {
    parsedExperience = typeof selectedCandidate.experience === "string"
        ? JSON.parse(selectedCandidate.experience)
        : selectedCandidate.experience;
    }

    return(
        <div className="">
            {isLoading ? (
                <div className="flex justify-center items-center w-full min-h-screen">
                    <span className="loading loading-spinner text-accent loading-lg"></span>
                </div>
            ) : (
                <div className="
                relative flex-1 
                p-6
                pt-16 
                rounded-l-lg 
                shadow-1xl 
                overflow-x-hidden 
                overflow-y-auto 
                no-scrollbar 
                max-h-[calc(100vh-5px)] 
                h-[calc(100vh-5px)]
                bg-gradient-to-br from-white via-neutral-50 to-neutral-100">
                
                    <div className="absolute top-4 left-2">
                        <button 
                            className="rounded-md border border-slate-300 py-2 px-4 text-sm transition-all shadow-sm 
                            text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 
                            focus:text-white focus:bg-slate-800 focus:border-slate-800 
                            active:text-white active:bg-slate-800 active:border-slate-800 
                            disabled:opacity-50 h-8"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                    <div className="grid grid-rows-2 gap-4 text-black">
                        <div className="p-4 rounded-lg shadow-md hover:bg-gray-50 h-auto">
                            <div className="flex items-center">
                                <img 
                                    src={selectedCandidate?.profile_img ?? undefined}
                                    alt="profile" 
                                    className="w-30 h-30 rounded-[30%] mr-4"
                                />
                                <div>
                                    <h1 className="text-2xl font-semibold">
                                        {selectedCandidate?.name}
                                    </h1>
                                </div>
                            </div>
                            <div className="grid grid-row-3 w-full mt-4">
                                <div className="grid grid-cols-2 shadow-sm bg-neutral-50 rounded-2xl justify-center items-center p-1 mb-4">
                                    <h3 className="text-lg font-semibold">📍 Location:</h3>
                                    <p  className="border-l px-6 py-4 whitespace-nowrap text-sm text-gray-500">{selectedCandidate?.location}</p>
                                </div>
                                <div className="grid grid-cols-2 shadow-sm bg-neutral-50 rounded-2xl justify-center items-center p-1 mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Years of Experience:</h3>
                                    <p  className="border-l px-6 py-4 whitespace-nowrap text-sm text-gray-500">{selectedCandidate?.years_of_experience}</p>
                                </div>
                                <div className="grid grid-cols-2 shadow-sm bg-neutral-50 rounded-2xl justify-center items-center p-1 mb-4">
                                    <h3 className="text-lg font-semibold mb-2"> Experts in:</h3>
                                    <p  className="border-l px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {typeof selectedCandidate?.keywords === 'string' && selectedCandidate?.keywords.split(',').map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                                                >
                                                    {skill.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="shadow-lg p-4 rounded-lg hover:bg-gray-50">
                            <h3 className="text-lg font-semibold mb-2">Experience</h3>
                            <div className="space-y-4">
                                {Array.isArray(selectedCandidate?.experience) && selectedCandidate.experience.length > 0 ? (
                                    selectedCandidate.experience.map((job, index) => (
                                        <div key={index} className="border-t pb-4">
                                            <h3 className="text-lg font-semibold">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.company} | {job.start_date} - {job.end_date}</p>
                                            <ul className="list-disc list-inside mt-2 text-gray-700">
                                                {job.accomplishments?.map((point, i) => (
                                                <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                    ) : (
                                    <p className="text-gray-500 italic">No experience data available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}