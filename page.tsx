'use client';

import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Code splitting and lazy loading of TaskList
const TaskList = dynamic(() => import('@/components/TaskList'), {
  loading: () => <p className="text-white mt-12 animate-pulse">Loading amazing tasks...</p>,
  ssr: false // Ensure it's client side only for real-time polling to not break hydration
});

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_HELLO);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-x-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="z-10 text-center max-w-3xl flex flex-col items-center">
        
        {/* Next/Image performance optimization */}
        <div className="mb-6 relative w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-2xl">
          <Image 
            src="/logo.png" 
            alt="ProHabit Logo" 
            fill
            className="object-cover transition-transform hover:scale-110 duration-500"
            sizes="(max-width: 768px) 128px, 192px"
            priority
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 pb-4">
          ProHabit
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          The AI-powered Task & Habit Manager with real-time sync. <br />
          Achieve more, stress less.
        </p>

        <div 
          className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl transition-transform duration-300 ease-out hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-sm uppercase tracking-widest text-indigo-300 font-semibold mb-2">
            GraphQL API Status
          </div>
          {loading ? (
            <div className="text-slate-200 animate-pulse">Connecting to Serverless GraphQL...</div>
          ) : error ? (
            <div className="text-red-400">Error connecting to API</div>
          ) : (
            <div className={`text-xl font-medium transition-colors duration-300 ${isHovered ? 'text-cyan-300' : 'text-white'}`}>
              {data?.hello}
            </div>
          )}
        </div>

        {/* Dynamic component loading */}
        <TaskList />

      </div>
    </main>
  );
}

