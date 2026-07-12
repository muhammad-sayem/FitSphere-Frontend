"use client";

import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="w-full bg-linear-to-tr from-white via-primary-01/[0.04] to-primary-01/[0.12] pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden relative">
      <style>{`
        @keyframes ripple-wave {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        @keyframes heartbeat-strong {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.25); }
          40% { transform: scale(0.95); }
          60% { transform: scale(1.18); }
          80% { transform: scale(0.98); }
        }
        @keyframes customFadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-40px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes customFadeInRight {
          from {
            opacity: 0;
            transform: translate3d(40px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes subtle-float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-20px) translateX(15px) scale(1.08); }
        }
        @keyframes subtle-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(22px) translateX(-15px) scale(0.92); }
        }
        @keyframes subtle-float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-18px) translateX(-20px) scale(1.05); }
        }
        @keyframes slow-pan {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        @keyframes ecg-line {
          0% { stroke-dashoffset: 2400; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-ripple-1 {
          animation: ripple-wave 2s infinite cubic-bezier(0.1, 0.8, 0.3, 1);
        }
        .animate-ripple-2 {
          animation: ripple-wave 2s infinite cubic-bezier(0.1, 0.8, 0.3, 1);
          animation-delay: 0.8s;
        }
        .animate-heartbeat-strong {
          animation: heartbeat-strong 1.5s infinite ease-in-out;
        }
        .custom-fade-in-left {
          animation: customFadeInLeft 1s ease-out forwards;
        }
        .custom-fade-in-right {
          animation: customFadeInRight 1s ease-out forwards;
        }
        .animate-subtle-1 {
          animation: subtle-float-1 9s ease-in-out infinite;
        }
        .animate-subtle-2 {
          animation: subtle-float-2 11s ease-in-out infinite;
        }
        .animate-subtle-3 {
          animation: subtle-float-3 13s ease-in-out infinite;
        }
        .animate-slow-pan {
          animation: slow-pan 20s linear infinite;
        }
        .animate-ecg {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: ecg-line 14s linear infinite;
        }
      `}</style>

      {/* Structured Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none animate-slow-pan" />

      {/* Vibrant Ambient Glowing Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary-01/[0.09] blur-[90px] rounded-full pointer-events-none animate-subtle-1" />
      <div className="absolute bottom-10 right-10 w-110 h-110 bg-[#ff6b57]/[0.08] blur-[100px] rounded-full pointer-events-none animate-subtle-2" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/[0.05] blur-[80px] rounded-full pointer-events-none animate-subtle-3" />

      {/* ECG Heartbeat Line positioned at the absolute bottom */}
      <div className="absolute inset-x-0 bottom-10 h-20 opacity-55 pointer-events-none hidden md:block z-0">
        <svg className="w-full h-full text-primary-01" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
          <path className="animate-ecg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M0,70 L350,70 L370,70 L380,25 L390,95 L400,60 L408,78 L415,70 L430,70 L950,70 L960,30 L970,95 L980,55 L988,78 L995,70 L1440,70" />
        </svg>
      </div>

      {/* Rich Collection of Colored Fitness Icons */}
      
      {/* 1. Dumbbell (Top Left) */}
      <div className="absolute top-16 left-16 opacity-12 text-[#F34E3A] pointer-events-none animate-subtle-1 hidden lg:block z-0">
        <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18H4a2 2 0 01-2-2v-3a2 2 0 012-2h2m12 7h2a2 2 0 002-2v-3a2 2 0 00-2-2h-2M6 12H4m14 0h2M8 8h8M8 12h8M8 16h8" />
        </svg>
      </div>

      {/* 2. Calendar (Bottom Center-Left) */}
      <div className="absolute bottom-40 left-1/3 opacity-10 text-emerald-500 pointer-events-none animate-subtle-2 hidden lg:block z-0">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* 3. Shopping Bag (Top Right) */}
      <div className="absolute top-24 right-20 opacity-10 text-blue-500 pointer-events-none animate-subtle-3 hidden lg:block z-0">
        <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>

      {/* 4. Kettlebell (Mid Left, behind heading) */}
      <div className="absolute top-1/2 left-8 opacity-[0.08] text-amber-600 pointer-events-none animate-subtle-3 hidden xl:block z-0">
        <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a4 4 0 00-4 4v3H6a3 3 0 00-3 3v5a3 3 0 003 3h12a3 3 0 003-3v-5a3 3 0 00-3-3h-2V7a4 4 0 00-4-4zM10 7a2 2 0 014 0v3h-4V7z" />
        </svg>
      </div>

      {/* 5. Heartbeat / Heart (Top Center) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-10 text-[#F34E3A] pointer-events-none animate-subtle-1 hidden lg:block z-0">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

      {/* 6. Stopwatch / Speed (Bottom Left-Center) */}
      <div className="absolute bottom-16 left-24 opacity-10 text-indigo-500 pointer-events-none animate-subtle-2 hidden lg:block z-0">
        <svg className="w-11 h-11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6" strokeWidth={2} />
        </svg>
      </div>

      {/* 7. Shopping Cart (Mid Right) */}
      <div className="absolute top-1/2 right-8 opacity-[0.08] text-rose-500 pointer-events-none animate-subtle-1 hidden xl:block z-0">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      {/* NEW ICONS PLACED SPECIFICALLY IN THE MARKED EMPTY SPACES */}

      {/* 8. Treadmill (Upper-Center Red Zone Gap) */}
      <div className="absolute top-[22%] left-[43%] opacity-12 text-indigo-500 pointer-events-none animate-subtle-1 hidden lg:block z-0">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16h13a1 1 0 001-1V8M17 16l-2 3M6 19h10M17 10V5a1 1 0 00-1-1h-2M13 4l-1-2h-3" />
          <circle cx="6" cy="16" r="1" />
          <circle cx="11" cy="16" r="1" />
        </svg>
      </div>

      {/* 9. Heavy Barbell Weight Plate (Mid-Center Red Zone Gap) */}
      <div className="absolute top-[48%] left-[45%] opacity-12 text-[#F34E3A] pointer-events-none animate-subtle-3 hidden lg:block z-0">
        <svg className="w-11 h-11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      </div>

      {/* 10. Skipping Rope / Active Cord (Lower-Center Red Zone Gap, right of CTA) */}
      <div className="absolute bottom-[40%] left-[28%] opacity-12 text-emerald-500 pointer-events-none animate-subtle-2 hidden lg:block z-0">
        <svg className="w-11 h-11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 4v5m0 0a3 3 0 01-3 3H8a3 3 0 01-3-3V4M5 4H4m11 0h1" />
          <circle cx="5" cy="4" r="1" />
          <circle cx="19" cy="4" r="1" />
        </svg>
      </div>

      {/* 11. Running Active Shoe (Middle Center, lower height) */}
      <div className="absolute top-[68%] left-[40%] opacity-[0.09] text-amber-500 pointer-events-none animate-subtle-1 hidden xl:block z-0">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16h11.5a2.5 2.5 0 002.5-2.5v-3.5a1 1 0 00-1-1H13l-3-3H6L4 10v6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3M8 14h4M4 16H2M16 16h3" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-125 h-125 bg-primary-01/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-6 w-full h-auto">

        <div className="custom-fade-in-right lg:pl-16 flex-1 flex flex-col justify-center z-10 text-center lg:text-left items-center lg:items-start">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black leading-tight">
            Fit
            <span className="text-primary-01">Sphere</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-xl text-secondary-01 leading-relaxed">
            Book certified trainers, track your fitness journey,
            calculate BMI, discover health tips and shop premium
            fitness equipment — all in one place.
          </p>

          <div className="mt-4 text-2xl font-bold flex flex-row gap-1 items-center justify-center lg:justify-start min-h-7 text-primary-01">
            <Typewriter
              words={[
                'Fitness • Health • LifeStyle',
                'Health • LifeStyle • Fitness',
                'LifeStyle • Fitness • Health'
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              cursorColor='#F34E3A'
            />
          </div>

          <div className="mt-8 flex flex-row gap-4 w-full justify-center lg:justify-start z-10">
            <Link href="/trainers" className="text-white bg-primary-01 backdrop-blur-sm px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-01 hover:transition-colors duration-300 text-sm sm:text-base hover:border hover:border-primary-01">
              Explore Trainers
            </Link>
          </div>
        </div>

        <div className="custom-fade-in-left flex-1 w-full relative flex items-center justify-center pt-8 lg:pt-0">

          <div className="absolute w-72 h-72 md:w-110 md:h-110 rounded-full bg-primary-01/10 blur-3xl animate-pulse" />
          <div className="absolute w-48 h-48 rounded-full bg-primary-01/5 blur-2xl -translate-x-12 -translate-y-12" />

          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100 flex items-center justify-center scale-95 sm:scale-100">
            
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-01/60 animate-[spin_100s_linear_infinite]" />
            
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-secondary-01/80 animate-[spin_100s_linear_infinite_reverse]" />
            
            <div className="absolute inset-12 sm:inset-16 rounded-full bg-linear-to-tr from-primary-01 to-[#ff6b57] shadow-[0_15px_50px_rgba(243,78,58,0.4)] flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />
              
              <div className="absolute inset-5 rounded-full border border-dashed border-white/20 animate-[spin_50s_linear_infinite]" />
              
              <div className="absolute inset-8 rounded-full bg-white/10 animate-pulse" />

              <div className="z-10 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-ripple-1 pointer-events-none" />
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ripple-2 pointer-events-none" />
                  
                  <div className="relative bg-white text-primary-01 p-4 rounded-full shadow-xl flex items-center justify-center animate-heartbeat-strong z-10 border border-white/30">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-01" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <span className="mt-4 text-[9px] sm:text-[8px] font-black tracking-[0.2em] text-white/90 uppercase animate-pulse">
                  Fitness • Health • LifeStyle
                </span>
              </div>
            </div>

            {/* Float Point 1 */}
            <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 animate-[bounce_6s_ease-in-out_infinite]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-50 flex items-center justify-center text-primary-01">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Verified</p>
                <p className="text-[11px] sm:text-xs font-bold text-gray-800 whitespace-nowrap">Expert Trainers</p>
              </div>
            </div>

            {/* Float Point 2 */}
            <div className="absolute -top-2 -right-4 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 animate-[bounce_5s_ease-in-out_infinite_-1.5s]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Instant</p>
                <p className="text-[11px] sm:text-xs font-bold text-gray-800 whitespace-nowrap">Calculate BMI</p>
              </div>
            </div>

            {/* Float Point 3 */}
            <div className="absolute -bottom-4 -left-2 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 animate-[bounce_5.5s_ease-in-out_infinite_-2.5s]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-50 flex items-center justify-center text-[#d6412e]">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Regular</p>
                <p className="text-[11px] sm:text-xs font-bold text-gray-800 whitespace-nowrap">Health Tips</p>
              </div>
            </div>

            {/* Float Point 4 */}
            <div className="absolute -bottom-2 -right-6 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 animate-[bounce_6s_ease-in-out_infinite_-1s]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Premium</p>
                <p className="text-[11px] sm:text-xs font-bold text-gray-800 whitespace-nowrap">Fitness Equipments</p>
              </div>
            </div>

            <div className="absolute top-14 right-14 w-3 h-3 rounded-full bg-primary-01 shadow-lg shadow-primary-01/50" />
            <div className="absolute bottom-20 left-8 w-2 h-2 rounded-full bg-gray-300" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;