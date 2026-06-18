"use client";

import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
  return (
    <section className="w-full bg-linear-to-tr from-white via-primary-01/2 to-primary-01/[0.07] pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden relative">

      <div className="absolute top-0 right-0 w-125 h-125 bg-primary-01/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-6 w-full h-auto">

        {/* Left Side */}
        <div className="lg:pl-16 flex-1 flex flex-col justify-center z-10 text-center lg:text-left items-center lg:items-start">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black leading-tight">
            Fit
            <span className="text-primary-01">Sphere</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-xl text-secondary-01 leading-relaxed">
            Book certified trainers, track your fitness journey,
            calculate BMI, discover health tips and shop premium
            fitness equipment — all in one place.
          </p>

          <div className="mt-4 text-lg font-bold flex flex-row gap-1 items-center justify-center lg:justify-start min-h-[28px] text-primary-01">
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

          <div className="mt-8 flex flex-row gap-4 w-full justify-center lg:justify-start">
            <button className="bg-primary-01 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-[#d6412e] transition-colors shadow-lg shadow-primary-01/20 text-sm sm:text-base">
              Get Started
            </button>

            <button className="border border-gray-300 bg-white/50 backdrop-blur-sm px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base">
              Explore Trainers
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 w-full relative flex items-center justify-center pt-8 lg:pt-0">

          {/* Background glowing gradients representing "Sphere" theme */}
          <div className="absolute w-72 h-72 md:w-110 md:h-110 rounded-full bg-primary-01/10 blur-3xl animate-pulse" />
          <div className="absolute w-48 h-48 rounded-full bg-primary-01/5 blur-2xl -translate-x-12 -translate-y-12" />

          {/* Larger Modern Circular Interactive Sphere */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100 flex items-center justify-center scale-95 sm:scale-100">
            
            {/* Outer primary dashed spinning track (Clockwise) */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-01/60 animate-[spin_100s_linear_infinite]" />
            
            {/* Inner secondary dashed spinning track (Counter-Clockwise) */}
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-secondary-01/80 animate-[spin_80s_linear_infinite_reverse]" />
            
            {/* Core Glowing Sphere */}
            <div className="absolute inset-12 sm:inset-16 rounded-full bg-linear-to-tr from-primary-01 to-[#ff6b57] shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Inner glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/25 to-transparent rounded-t-full" />
              <div className="absolute inset-8 rounded-full border border-white/20" />
              <span className="text-white font-black text-4xl lg:text-5xl tracking-tight z-10">Fit</span>
              <span className="text-white/85 font-bold text-xs lg:text-sm uppercase tracking-widest z-10">Sphere</span>
            </div>

            {/* Point 1: Expert Trainers (Top-Left) */}
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

            {/* Point 2: Calculate BMI (Top-Right) */}
            <div className="absolute -top-2 -right-4 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 animate-[bounce_5s_ease-in-out_infinite_1.5s]">
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

            {/* Point 3: Health Tips (Bottom-Left) */}
            <div className="absolute -bottom-4 -left-2 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 animate-[bounce_5.5s_ease-in-out_infinite_2.5s]">
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

            {/* Point 4: Fitness Equipments (Bottom-Right) */}
            <div className="absolute -bottom-2 -right-6 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 animate-[bounce_6s_ease-in-out_infinite_1s]">
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

            {/* Decorative orbit nodes */}
            <div className="absolute top-14 right-14 w-3 h-3 rounded-full bg-primary-01 shadow-lg shadow-primary-01/50" />
            <div className="absolute bottom-20 left-8 w-2 h-2 rounded-full bg-gray-300" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;