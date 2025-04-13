# 10X AI Engineer Hackathon 🚀

An AI-powered candidate search engine built to help **hiring managers**, **employers**, and **startup founders** discover top talent faster and smarter.

---

## 🧠 What is this project about?

**10X AI Engineer Hackathon** is designed to simplify and accelerate the hiring process by combining natural language understanding with structured filtering. Powered by AI, it allows users to:

- 🔍 Enter natural language queries like  
  _“A software developer with over 5 years of experience working in Toronto”_
- 🎯 Apply structured filters such as skills, location, companies, and years of experience
- 🤖 Instantly receive the top 5 best-matching candidates from a large dataset

---

## 🌟 Key Features

- **Natural Language Search** using OpenAI Embeddings  
- **Smart Filtering** by location, skills, experience, and companies  
- **Live Candidate Results** returned with relevant information  
- **PostgreSQL & Supabase** for fast, scalable data storage & filtering  
- **Next.js + React + TypeScript** for a modern, responsive UI  
- **Deployed on Vercel**, connected to GitHub for continuous deployment

---

## 📦 Tech Stack

| Frontend         | Backend/API       | Database          | AI/ML             | Deployment  |
|------------------|-------------------|-------------------|-------------------|-------------|
| Next.js + React  | TypeScript + API Routes | Supabase (PostgreSQL) | OpenAI Embeddings | Vercel      |

---

## 🧩 How It Works – Step by Step

1. **User submits a search query** or uses filter options (skills, location, company, experience).
2. The **query is embedded** using OpenAI’s Embedding API.
3. The **embedding is matched** against candidate experience embeddings in PostgreSQL using Supabase.
4. The **top 5 candidates** with the highest similarity scores are retrieved.
5. The **candidate profiles** are returned and displayed in the frontend.

---

## ✅ When Should You Use This?

- You're a **startup founder** looking to quickly build a team
- You're a **recruiter** tired of manually screening resumes
- You’re an **HR professional** needing to search through thousands of candidates
- You want to experiment with **AI-powered search interfaces**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/10X-AI-Engineer-Hackathon.git
cd 10X-AI-Engineer-Hackathon
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
Create a `.env.local` file in the root of the project and add:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-api-key
```
### 4. Run Locally
```bash
npm run dev
```
App will be available at http://localhost:3000

## 🌐 Live Demo
[Check it out on Vercel →](https://ai-engineer-hackathon.vercel.app/)
