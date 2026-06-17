import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full bg-white flex items-center mb-8 md:mb-12">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-10 w-full">
        
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center z-10">
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
        <div className="flex-1 w-full relative min-h-100 lg:min-h-135 flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/our program trainer image.png"
              alt="FitSphere Hero"
              fill
              priority
              quality={100}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain lg:object-right" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;