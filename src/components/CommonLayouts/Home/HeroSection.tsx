const HeroSection = () => {
  return (
    <section className="w-full bg-white flex items-center mb-8 md:mb-12">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-10 w-full">

        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center z-10 md: pl-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black">
            Fit
            <span className="text-primary-01">Sphere</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-secondary-01">
            Book certified trainers, track your fitness journey,
            calculate BMI, discover health tips and shop premium
            fitness equipment — all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-primary-01 text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#d6412e] transition-colors">
              Get Started
            </button>

            <button className="border border-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Explore Trainers
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 w-full relative min-h-100 lg:min-h-135 flex items-center justify-center overflow-hidden">

          {/* Background glowing gradients representing "Sphere" theme */}
          <div className="absolute w-80 h-80 md:w-[480px] md:h-[480px] rounded-full bg-primary-01/10 blur-3xl animate-pulse" />
          <div className="absolute w-56 h-56 rounded-full bg-primary-01/5 blur-2xl -translate-x-12 -translate-y-12" />

          {/* Larger Modern Circular Interactive Sphere */}
          <div className="relative w-80 h-80 lg:w-[440px] lg:h-[440px] flex items-center justify-center">
            
            {/* Outer primary dashed spinning track (Clockwise) */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-01/70 animate-[spin_100s_linear_infinite]" />
            
            {/* Inner secondary dashed spinning track (Counter-Clockwise) */}
            <div className="absolute inset-4 rounded-full border border-dashed border-secondary-01 animate-[spin_80s_linear_infinite_reverse]" />
            
            {/* Middle glowing orbit */}
            <div className="absolute inset-8 rounded-full border border-gray-200/80 shadow-inner" />
            
            {/* Core Glowing Sphere */}
            <div className="absolute inset-[72px] rounded-full bg-gradient-to-tr from-primary-01 to-[#ff6b57] shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Inner glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full" />
              <div className="absolute inset-5 rounded-full border border-white/20" />
              <span className="text-white font-black text-4xl lg:text-5xl tracking-tight z-10">Fit</span>
              <span className="text-white/85 font-bold text-sm lg:text-base uppercase tracking-widest z-10">Sphere</span>
            </div>

            {/* Point 1: Expert Trainers (Top-Left) */}
            <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2.5 animate-[bounce_6s_ease-in-out_infinite]">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-primary-01">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Verified</p>
                <p className="text-xs font-bold text-gray-800">Expert Trainers</p>
              </div>
            </div>

            {/* Point 2: Calculate BMI (Top-Right) */}
            <div className="absolute -top-2 -right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2.5 animate-[bounce_5s_ease-in-out_infinite_1.5s]">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Instant</p>
                <p className="text-xs font-bold text-gray-800">Calculate BMI</p>
              </div>
            </div>

            {/* Point 3: Health Tips (Bottom-Left) */}
            <div className="absolute -bottom-4 -left-2 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2.5 animate-[bounce_5.5s_ease-in-out_infinite_2.5s]">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-[#d6412e]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Daily</p>
                <p className="text-xs font-bold text-gray-800">Health Tips</p>
              </div>
            </div>

            {/* Point 4: Fitness Equipments (Bottom-Right) */}
            <div className="absolute -bottom-2 -right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-2.5 animate-[bounce_6s_ease-in-out_infinite_1s]">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Premium</p>
                <p className="text-xs font-bold text-gray-800">Fitness Equipments</p>
              </div>
            </div>

            {/* Decorative orbit nodes */}
            <div className="absolute top-16 right-16 w-3 h-3 rounded-full bg-primary-01 shadow-lg shadow-primary-01/50" />
            <div className="absolute bottom-24 left-10 w-2 h-2 rounded-full bg-gray-300" />
          </div>

        </div>


      </div>
    </section>
  );
};

export default HeroSection;