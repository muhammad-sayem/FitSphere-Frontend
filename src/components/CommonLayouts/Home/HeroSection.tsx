import Image from "next/image";

const HeroSection = () => {
  return (
    <div>
      <Image src="/assets/hero image.webp" alt="Hero Image" width={1200} height={600} className="w-full h-160 object-cover contain-fit" />
    </div>
  );
};

export default HeroSection;