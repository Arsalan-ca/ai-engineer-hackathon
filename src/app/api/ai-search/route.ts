// src/app/api/ai-search/route.ts

import { supabase } from "../../../lib/supabase";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const searchQuery = body.searchQuery;
    const filterWords = body.filter_words;

    console.log(">>> Received query:", searchQuery);

    if (searchQuery) {
        try {
            const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: searchQuery,
            });
    
            const embeddedQuery = embeddingResponse.data[0].embedding;
    
            const { data: similarCandidates, error: searchError } = await supabase.rpc(
            "search_candidates",
            {
                query_embedding: embeddedQuery,
                match_threshold: 0.1,
                match_count: 5,
                location_filter: null,
                keywords_filter: null,
                companies_filter: null,
                job_titles_filter: null,
            }
            );
    
            if (searchError) {
            console.error("Supabase RPC call failed:", searchError);
            return NextResponse.json({ error: "Supabase RPC call failed", searchError }, { status: 500 });
            }
    
            return NextResponse.json({ candidates: similarCandidates });
    
    
        } catch (error: any) {
            console.error("Query Search error:", error?.message || error);
            return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
        }
    }

    if (filterWords) {
        try {
            const { keywords, companies, job_titles, location, years_of_experience } = filterWords;
            const { data: filteredCandidates, error: filterError } = await supabase.rpc(
                "filter_candidates",
                {
                    match_count: 5,
                    location_filter: location,
                    keywords_filter: keywords,
                    companies_filter: companies,
                    job_titles_filter: job_titles,
                    min_years_exp: years_of_experience,
                }
            );
    
            if (filterError) {
                console.error("Supabase RPC call failed:", filterError);
                return NextResponse.json({ error: "Supabase RPC call failed", filterError }, { status: 500 });
            }
    
            return NextResponse.json({ candidates: filteredCandidates });
        } catch (error: any ){
            console.error("Filter Words error:", error?.message || error);
            return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
        }
        
    }

    

  } catch (error: any) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
