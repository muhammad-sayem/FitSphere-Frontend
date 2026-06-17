import Image from 'next/image';
import galleryImage1 from '../../../../public/assets/gallery 1.webp';
import galleryImage2 from '../../../../public/assets/gallery 2.webp';
import galleryImage3 from '../../../../public/assets/gallery 3.webp';
import galleryImage4 from '../../../../public/assets/gallery 4.webp';

const Gallery = () => {
  return (
    <div className="bg-[#F8F8F8] mb-8 md:mb-16 pt-10 pb-14">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 rounded-2xl">
        <div className="text-center mb-6 px-4">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-wide uppercase">
            Our <span className="text-primary-01"> Gallery </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          <div className="md:col-span-2 relative aspect-21/9 md:aspect-auto md:h-70 w-full overflow-hidden rounded-2xl border border-neutral-300 shadow-sm group">
            <Image
              src={galleryImage1}
              alt="Gallery Image 1"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="relative aspect-[16/10] md:aspect-auto md:h-[280px] w-full overflow-hidden rounded-2xl border border-neutral-300 shadow-sm group">
            <Image
              src={galleryImage2}
              alt="Gallery Image 2"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="relative aspect-[16/10] md:aspect-auto md:h-[280px] w-full overflow-hidden rounded-2xl border border-neutral-300 shadow-sm group">
            <Image
              src={galleryImage3}
              alt="Gallery Image 3"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* 4th Image adjusted for full context display using object-top alignment */}
          <div className="md:col-span-2 relative aspect-[21/9] md:aspect-auto md:h-[280px] w-full overflow-hidden rounded-2xl border border-neutral-300 shadow-sm group">
            <Image
              src={galleryImage4}
              alt="Gallery Image 4"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>

        </div>
      </div>
    </div>

  );
};

export default Gallery;