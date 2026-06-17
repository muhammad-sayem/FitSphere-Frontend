import Image from "next/image";
import QuoteSectionImage from "../../../../public/assets/quote section image.webp";

const QuoteSection = () => {
  return (
    <div className="relative w-full min-h-100 md:min-h-125 flex items-center justify-center overflow-hidden mb-8 md:mb-16">
      <Image
        src={QuoteSectionImage}
        alt="Quote Section Background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-11/12 max-w-4xl mx-auto text-center px-4">
        <blockquote className="text-2xl md:text-4xl font-black text-white italic tracking-wide leading-relaxed mb-4">
          “I hated every minute of training, but I said, ‘Don’t quit. Suffer now and live the rest of your life as a champion.”
        </blockquote>
        <cite className="block text-lg md:text-xl font-bold text-primary-01 not-italic uppercase tracking-wider">
          – Muhammad Ali
        </cite>
      </div>
    </div>
  );
};

export default QuoteSection;