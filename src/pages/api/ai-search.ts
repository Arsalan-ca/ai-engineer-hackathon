import { createClient } from '@supabase/supabase-js'
import {supabase} from "../../lib/supabase";
import OpenAI from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handleSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed'});
  }

  const { searchQuery } = req.query;
  if(searchQuery) {
    console.log('>>> Received query:', searchQuery);
  }

  if(!searchQuery || typeof searchQuery !== 'string') {
    return res.status(400).json({ error: 'No search query provided' });
  }

  try{

    console.log(">>> Getting embedding...");
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: searchQuery,
    }).catch(err => {
      console.error("Error generating embedding:", err);
      throw new Error("Failed to generate embedding");
    });
    console.log("Embedding Response:", embeddingResponse);


    const embeddedQuery = embeddingResponse.data[0].embedding;
    console.log(">>> Embedding generated. Length:", embeddedQuery.length);


    const {data: similarCandidates, error: searchError} = await supabase.rpc(
        'search_candidates', 
        {
          query_embedding: embeddedQuery,
          match_threshold: 0.1,
          match_count: 5,
          location_filter: null,
          keywords_filter: null,
          companies_filter: null,
          job_titles_filter: null
        });
    
      if (searchError) {
        console.error("Supabase RPC error:", searchError);
        throw new Error("Supabase RPC call failed");
      } else {
      console.log("!!! Similar candidates: ", similarCandidates);
      return res.status(200).json({ results: similarCandidates });

    }

    // const candidatesProfile = await Promise.all((similarCandidates || []).map(async (candidate: any) => {
    //   const prompt = `
    //   Search query: "${searchQuery}"
      
    //   Candidate Information:
    //   ${JSON.stringify(candidate, null, 2)}
      
    //   Go through the candidates and choose 2 or 3 reasons from candidate information that are strictly related to the search query.
    //   Then write a short summary why this candidate is a good fit for the search query with only  words max.

    //   `
    // }))
    
  } catch (error: any) {
    console.error('🔥 Server crashed with:', error);
    return res.status(500).json({ error: error?.message || 'Unknown error' });
  }
  
}
