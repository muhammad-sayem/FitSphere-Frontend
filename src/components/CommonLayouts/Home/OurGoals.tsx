import Image from 'next/image';
import ourProgramsImgage from '../../../../public/assets/our program trainer image.png';
import { Flame, HeartPulse, Target, Dumbbell } from 'lucide-react';

const OurGoals = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mb-12 md:mb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
        
        <div className="w-full lg:w-1/2">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-wide uppercase mb-2">
              OUR <span className='text-primary-01'> GOALS </span>
            </h2>
            <div className="w-16 h-1 bg-primary-01 mb-6" />

            <p className="text-secondary-01 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Discover our premium, expert-led fitness routines tailored to transform your strength, endurance, and overall health step by step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-12 pt-4">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="relative w-full h-56 flex items-center justify-center filter drop-shadow-md group transition-all duration-300 transform hover:-translate-y-2">
              <div
                className="absolute inset-0 bg-white transition-colors duration-300 group-hover:bg-primary-01/5"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.5 bg-white pointer-events-none opacity-90 transition-all duration-300 group-hover:border-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", boxShadow: "inset 0 0 0 1px #E5E5E5" }}
              />
              <div
                className="absolute inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-white"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div className="absolute top-0 left-4 sm:left-2 z-10 w-11 h-11 bg-primary-01 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                <Flame className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="relative z-10 text-center px-8 sm:px-6 flex flex-col items-center justify-center mt-2">
                <h3 className="text-lg font-bold text-black mb-1">Crossfit</h3>
                <p className="text-secondary-01 text-xs leading-relaxed max-w-45">
                  Push your limits with high-intensity functional movements designed to improve power, agility, and overall conditioning.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="relative w-full h-56 flex items-center justify-center filter drop-shadow-md group transition-all duration-300 transform hover:-translate-y-2">
              <div
                className="absolute inset-0 bg-white transition-colors duration-300 group-hover:bg-primary-01/5"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.5 bg-white pointer-events-none opacity-90 transition-all duration-300 group-hover:border-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", boxShadow: "inset 0 0 0 1px #E5E5E5" }}
              />
              <div
                className="absolute inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-white"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div className="absolute top-0 left-4 sm:left-2 z-10 w-11 h-11 bg-primary-01 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                <HeartPulse className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="relative z-10 text-center px-8 sm:px-6 flex flex-col items-center justify-center mt-2">
                <h3 className="text-lg font-bold text-black mb-1">Healthy Life</h3>
                <p className="text-secondary-01 text-xs leading-relaxed max-w-45">
                  Adopt sustainable wellness habits and balanced routines to enhance longevity, vitality, and your daily energy.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="relative w-full h-56 flex items-center justify-center filter drop-shadow-md group transition-all duration-300 transform hover:-translate-y-2">
              <div
                className="absolute inset-0 bg-white transition-colors duration-300 group-hover:bg-primary-01/5"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.5 bg-white pointer-events-none opacity-90 transition-all duration-300 group-hover:border-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", boxShadow: "inset 0 0 0 1px #E5E5E5" }}
              />
              <div
                className="absolute inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-white"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div className="absolute top-0 left-4 sm:left-2 z-10 w-11 h-11 bg-primary-01 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                <Target className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="relative z-10 text-center px-8 sm:px-6 flex flex-col items-center justify-center mt-2">
                <h3 className="text-lg font-bold text-black mb-1">Strategies</h3>
                <p className="text-secondary-01 text-xs leading-relaxed max-w-45">
                  Receive data-driven, personalized action plans tailored specifically to optimize your milestones and fitness goals.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="relative w-full h-56 flex items-center justify-center filter drop-shadow-md group transition-all duration-300 transform hover:-translate-y-2">
              <div
                className="absolute inset-0 bg-white transition-colors duration-300 group-hover:bg-primary-01/5"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.5 bg-white pointer-events-none opacity-90 transition-all duration-300 group-hover:border-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", boxShadow: "inset 0 0 0 1px #E5E5E5" }}
              />
              <div
                className="absolute inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-primary-01"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div
                className="absolute inset-0.75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-white"
                style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
              />
              <div className="absolute top-0 left-4 sm:left-2 z-10 w-11 h-11 bg-primary-01 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                <Dumbbell className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="relative z-10 text-center px-8 sm:px-6 flex flex-col items-center justify-center mt-2">
                <h3 className="text-lg font-bold text-black mb-1">Workout</h3>
                <p className="text-secondary-01 text-xs leading-relaxed max-w-45">
                  Engage in structured physical exercises targeting key muscle groups to maximize strength and functional fat loss.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="1500"
          className="w-full lg:w-1/2 flex items-center justify-center relative min-h-75 sm:min-h-100 lg:min-h-125 mt-6 lg:mt-0">
          <div
            className="absolute inset-0 bg-primary-01 opacity-95 z-0"
            style={{ clipPath: "polygon(10% 20%, 100% 10%, 90% 90%, 15% 80%)" }}
          />

          <div className="relative z-10 w-full h-full flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-500 px-4 sm:px-12 lg:px-0">
            <Image
              src={ourProgramsImgage}
              alt="Our Programs Image"
              width={480}
              height={480}
              className="w-auto h-70 sm:h-100 lg:h-120 object-contain filter drop-shadow-2xl"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurGoals;