'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an advanced monitoring service like Sentry or Datadog
    console.error("Advanced Monitoring Log:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center text-white bg-slate-900 rounded-2xl m-8">
      <h2 className="text-3xl font-bold mb-4 text-red-400">Something went wrong!</h2>
      <p className="text-slate-300 mb-8 max-w-md">Our advanced error handler caught an issue. Don't worry, your tasks are safely synced to the cloud.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full font-semibold transition-colors"
      >
        Try recovering
      </button>
    </div>
  );
}
