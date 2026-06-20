import Image from "next/image";
import aboutImage1 from "../../../../public/assets/about image 1.jpeg";
import aboutImage2 from "../../../../public/assets/about image 2.jpeg";
import aboutImage3 from "../../../../public/assets/about image 3.jpeg";

const AboutUs = () => {
  return (
    <div className="w-11/12 max-w-7xl mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-150">
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="relative group overflow-hidden rounded-2xl h-full">
          <Image
            src={aboutImage1}
            alt="Our Vision"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-md">
            <h3 className="text-2xl font-black mb-2 text-primary-01">Our Vision</h3>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              To build a healthier, more active world by making premium fitness coaching and personalized wellness accessible to everyone, everywhere.
            </p>
          </div>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="grid grid-rows-2 gap-6 h-full">
          <div className="relative group overflow-hidden rounded-2xl h-full">
            <Image
              src={aboutImage2}
              alt="Our Mission"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white max-w-md">
              <h3 className="text-2xl font-black mb-2 text-primary-01">Our Mission</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Empowering individuals to smash their fitness goals through expert-led workouts, evidence-based nutrition plans, and an unstoppable community.
              </p>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="relative group overflow-hidden rounded-2xl h-full">
            <Image
              src={aboutImage3}
              alt="Why Choose Us"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white max-w-md">
              <h3 className="text-2xl font-black mb-2 text-primary-01">Why Choose Us</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                We combine industry-certified trainers with cutting-edge workout strategies to ensure your fitness transformation is sustainable, safe, and highly effective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;