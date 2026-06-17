import Image from 'next/image';
import ourProgramsImgage from '../../../../public/assets/our program trainer image.png';
import { Dumbbell, BicepsFlexed, Bike, SportShoe } from 'lucide-react';

const OurPrograms = () => {
  return (
    <div className="w-9/10 mx-auto mb-8 md:mb-12 rounded-lg p-6">
      <div className="flex gap-4">
        <div className="w-1/2">
          {/* Section Header */}
          <h2 className="text-3xl font-black text-black tracking-wide uppercase mb-2">
            OUR <span className='text-primary-01'> PROGRAMS </span>
          </h2>
          <div className="w-16 h-1 bg-primary-01 mb-6" />
          
          <p className="text-secondary-01 text-lg leading-relaxed mb-10">
            Discover our premium, expert-led fitness routines tailored to transform your strength, endurance, and overall health step by step.
          </p>

          {/* Programs Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {/* Weight Lifting */}
            <div className="flex flex-col gap-3">
              <Dumbbell className="w-10 h-10 text-primary-01 stroke-[1.5]" />
              <h3 className="text-2xl font-bold text-black">Weight Lifting</h3>
              <p className="text-secondary-01 text-md leading-relaxed">
                Build fundamental explosive power, density, and core body strength with specialized free-weight movements.
              </p>
            </div>

            {/* Body Building */}
            <div className="flex flex-col gap-3">
              <BicepsFlexed className="w-10 h-10 text-primary-01 stroke-[1.5]" />
              <h3 className="text-2xl font-bold text-black">Body Building</h3>
              <p className="text-secondary-01 text-md leading-relaxed">
                Sculpt your physique, increase clean muscular hypertrophy, and improve overall symmetry effectively.
              </p>
            </div>

            {/* Cycling */}
            <div className="flex flex-col gap-3">
              <Bike className="w-10 h-10 text-primary-01 stroke-[1.5]" />
              <h3 className="text-2xl font-bold text-black">Cycling</h3>
              <p className="text-secondary-01 text-md leading-relaxed">
                Boost active cardiovascular endurance, burn calories rapidly, and strengthen lower-body muscle groups.
              </p>
            </div>

            {/* Running */}
            <div className="flex flex-col gap-3">
              <SportShoe  className="w-10 h-10 text-primary-01 stroke-[1.5]" />
              <h3 className="text-2xl font-bold text-black">Running</h3>
              <p className="text-secondary-01 text-md leading-relaxed">
                Enhance your peak stamina, lung capacity, and mental clarity through structural running and pacing setups.
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <Image 
            src={ourProgramsImgage}
            alt="Our Programs Image"
            width={500}
            height={500}
            className="w-100 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default OurPrograms;