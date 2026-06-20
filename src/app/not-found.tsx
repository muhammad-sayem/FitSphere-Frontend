"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-white px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-01/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <h1 className="text-[120px] font-black tracking-tighter text-black leading-none selection:bg-primary-01 selection:text-white">
          4<span className="text-primary-01">0</span>4
        </h1>

        <div className="h-1 w-16 bg-primary-01 my-6 rounded-full" />

        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">
          Page Not Found
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          The requested resource could not be found or has been moved to a different URL.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center bg-primary-01 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#d6412e] transition-all duration-300 shadow-lg shadow-primary-01/10 hover:shadow-primary-01/20 transform active:scale-98 text-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}