import { useState } from "react";

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

interface userDetailsProps {
    onClose: () => void;
    selectedCandidate: UserInfo | null;
}

export default function UserDetails({onClose, selectedCandidate}: userDetailsProps) {
    const [isLoading, setIsLoading] = useState(false);

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
                            className="text-black border rounded-xl p-1.5"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                    <div className="grid grid-rows-2 gap-4 text-black">
                        <div className="border border-gray-300 p-4 rounded-lg h-full">
                            <div className="flex items-center">
                                <img 
                                    src={"/profile.jpg"} 
                                    alt="profile" 
                                    className="w-16 h-16 rounded-[50%] mr-4"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {selectedCandidate?.name}
                                    </h2>
                                </div>
                                
                            </div>
                            <div className="grid grid-cols-2 w-full">
                                <table className="min-w-0 divide-y divide-gray-200">
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                📍 Location:
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {selectedCandidate?.location}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Years of Experience:
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {selectedCandidate?.years_of_experience}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Experts in:
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
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
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Experience</h3>
                            <p className="text-gray-700">{selectedCandidate?.experience}</p>
                            
                            <h3 className="text-lg font-semibold mt-4 mb-2">Description</h3>
                            <p className="text-gray-700">{selectedCandidate?.description}</p>
                            
                            {selectedCandidate?.companies && (
                                <>
                                    <h3 className="text-lg font-semibold mt-4 mb-2">Companies</h3>
                                    <p className="text-gray-700">{selectedCandidate.companies}</p>
                                </>
                            )}
                            
                            {selectedCandidate?.job_titles && (
                                <>
                                    <h3 className="text-lg font-semibold mt-4 mb-2">Job Titles</h3>
                                    <p className="text-gray-700">{selectedCandidate.job_titles}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}