import { Dumbbell, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import whyChooseFitSphereImage from "../../../../public/assets/why choose fit sphere image.png";

const WhyChooseFitSphere = () => {
  return (
    <section className="w-11/12 xl:w-9/10 mx-auto py-12 md:py-16 lg:py-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes runningMotion {
              0%, 100% {
                transform: translateY(0) translateX(0);
              }
              50% {
                transform: translateY(-12px) translateX(12px);
              }
            }

            .running-animation {
              animation: runningMotion 2s infinite ease-in-out;
            }
          `,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-12 items-center">
        {/* Left Side Image */}
        <div
          data-aos="zoom-out-right"
          className="relative w-full flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-primary-01"
            style={{
              clipPath:
                "polygon(0% 15%, 85% 0%, 100% 50%, 85% 100%, 0% 85%, 15% 50%)",
            }}
          />

          <div className="relative z-10 w-full h-85 sm:h-110 md:h-135 lg:h-150 xl:h-175 running-animation">
            <Image
              src={whyChooseFitSphereImage}
              alt="Why Choose FitSphere"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side Content */}
        <div
          data-aos="zoom-out-left"
          className="flex flex-col justify-center"
        >
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wide text-black">
              Why Choose <span className="text-primary-01">FitSphere</span>
            </h2>

            <p className="mt-5 text-secondary-01 text-sm md:text-base leading-relaxed max-w-2xl">
              FitSphere offers a premium fitness environment designed to support
              your personal goals. From certified guidance to top-tier layout
              architecture, we ensure your daily workouts are structured for
              optimal long-term success.
            </p>
          </div>

          <div className="space-y-8">
            {/* Item 1 */}
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="flex items-start gap-4"
            >
              <div className="relative shrink-0">
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-primary-01/10" />
                <Users className="relative w-10 h-10 md:w-12 md:h-12 text-primary-01 stroke-[1.75]" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-black text-neutral-900">
                  Expert Trainers
                </h3>

                <p className="mt-2 text-sm md:text-base text-secondary-01 leading-relaxed">
                  Our certified professionals provide tailored instruction and
                  anatomical guidance to accelerate your fitness journey safely.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div
              data-aos="fade-left"
              data-aos-duration="1400"
              className="flex items-start gap-4"
            >
              <div className="relative shrink-0">
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-primary-01/10" />
                <Dumbbell className="relative w-10 h-10 md:w-12 md:h-12 text-primary-01 stroke-[1.75]" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-black text-neutral-900">
                  Modern Equipment
                </h3>

                <p className="mt-2 text-sm md:text-base text-secondary-01 leading-relaxed">
                  Train with elite, top-tier structural machinery engineered to
                  support dynamic biomechanics and maximize physical output.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div
              data-aos="fade-left"
              data-aos-duration="1800"
              className="flex items-start gap-4"
            >
              <div className="relative shrink-0">
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-primary-01/10" />
                <ShieldCheck className="relative w-10 h-10 md:w-12 md:h-12 text-primary-01 stroke-[1.75]" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-black text-neutral-900">
                  Body Fitness
                </h3>

                <p className="mt-2 text-sm md:text-base text-secondary-01 leading-relaxed">
                  Achieve functional flexibility, peak cardiovascular stamina,
                  and solid core optimization through specialized programmatic
                  targeting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseFitSphere;