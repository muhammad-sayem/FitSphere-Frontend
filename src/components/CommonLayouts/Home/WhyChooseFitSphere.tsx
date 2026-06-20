import { Dumbbell, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import whyChooseFitSphereImage from '../../../../public/assets/why choose fit sphere image.png';

const WhyChooseFitSphere = () => {
  return (
    <div className="w-9/10 mx-auto mb-8 md:mb-16">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes runningMotion {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-16px) translateX(16px);
          }
        }
        .running-animation {
          animation: runningMotion 2s infinite ease-in-out;
        }
      `}} />
      <div className="flex gap-6">
        <div
          data-aos="zoom-out-right"
          className="w-1/2 relatie min-h-100 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-primary-01 -z-10"
            style={{ clipPath: "polygon(0% 15%, 85% 0%, 100% 50%, 85% 100%, 0% 85%, 15% 50%)" }}
          />

          <div className="relative w-full h-full p-4 running-animation">
            <Image
              src={whyChooseFitSphereImage}
              alt="Why Choose FitSphere"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div
          data-aos="zoom-out-left"
          className="w-1/2 bg-white">
          <div className="text-center mb-6 px-4 pt-6">
            <h2 className="text-xl md:text-2xl font-black tracking-wide uppercase text-black">
              Why Choose <span className="text-primary-01"> FitSphere </span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 px-6 max-w-xl mx-auto pb-6">
            <p className="text-secondary-01 text-md leading-relaxed mb-2">
              FitSphere offers a premium fitness environment designed to support your personal goals. From certified guidance to top-tier layout architecture, we ensure your daily workouts are structured for optimal long-term success.
            </p>

            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary-01/10 rounded-full -z-10" />
                <Users className="w-12 h-12 text-primary-01 stroke-[1.75]" />
              </div>
              <div

                className="flex flex-col gap-1">
                <h3 className="text-lg font-black tracking-wide text-neutral-900">Expert Trainers</h3>
                <p className="text-secondary-01 text-sm leading-relaxed">
                  Our certified professionals provide tailored instruction and anatomical guidance to accelerate your fitness journey safely.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary-01/10 rounded-full -z-10" />
                <Dumbbell className="w-12 h-12 text-primary-01 stroke-[1.75]" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black tracking-wide text-neutral-900">Modern Equipment</h3>
                <p className="text-secondary-01 text-sm leading-relaxed">
                  Train with elite, top-tier structural machinery engineered to support dynamic biomechanics and maximize physical output.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary-01/10 rounded-full -z-10" />
                <ShieldCheck className="w-12 h-12 text-primary-01 stroke-[1.75]" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black tracking-wide text-neutral-900">Body Fitness</h3>
                <p className="text-secondary-01 text-sm leading-relaxed">
                  Achieve functional flexibility, peak cardiovascular stamina, and solid core optimization through specialized programmatic targeting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseFitSphere;