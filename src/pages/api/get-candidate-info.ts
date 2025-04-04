import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Record<string, any> # for json
// string[] # for array
// ******** Type *******
export type UserInfo = {
    userID: string,
    userName: string,
    yearsOfEx: number | null,
    experience: string | null,
    location: string | null,
    keywords: string | null,
    commitment: string | null,
    description: string | null,
    companies: string | null,
    jobTitle: string | null
};

// ******** Supabase setup ******
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE_KEY){
    throw new Error('Missing Supabase environment variables.');
}
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { data: candidateData, error: candidateError } = await supabase
            .from('candidates')
            .select('*')
        if(candidateError){
            throw new Error(`Error fetching attempts: ${candidateError.message}`);
        }

        const items: UserInfo[] = (candidateData || []).map((item: any) => {
            return {
                userID: item.id,
                userName: item.name,
                yearsOfEx: item.years_of_experience,
                experience: item.experience,
                location: item.location,
                keywords: item.keywords,
                commitment: item.commitment,
                description: item.description,
                companies: item.companies,
                jobTitle: item.job_title
            }
        })
    }
    catch(error: any){
        console.error('Error in get-candidate-info', error);
    }
}




