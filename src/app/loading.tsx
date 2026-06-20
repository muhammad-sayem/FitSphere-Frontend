"use client";

import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary-01/10">
      
      <div className="flex flex-col items-center justify-center gap-5 p-8 rounded-2xl">
        
        <Hourglass
          size="90"
          bgOpacity="0.2"
          speed="1.75"
          color="#F34E3A" 
        />

        <div className="text-center">
          <p className="text-black font-semibold">
            Loading...
          </p>
          <p className="text-sm text-black/60">
            Please wait a moment
          </p>
        </div>

      </div>
    </div>
  );
}