import Image from "next/image";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import logo from "../../../public/assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-8 px-4 md:px-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

        <div>
          <div>
            <Image src={logo} alt="FitSphere Logo" width={80} height={80} className="object-contain" />
  
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-1">
            Empowering your fitness journey with certified personal trainers, advanced BMI calculations, interactive health tracking, and premium workout gear—all tailored to build your ultimate lifestyle.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-lg font-bold tracking-wide">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-primary-01 transition-colors">Trainers</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-01 transition-colors">Products</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-01 transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-01 transition-colors">BMI Calculator</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold tracking-wide">Stay Connected</h3>
          <p className="text-sm text-gray-400">Stay connected with us for more updates</p>
          <div className="flex items-center gap-5 mt-2 text-white">
            <a href="#" className="hover:text-primary-01 transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary-01 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary-01 transition-colors">
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary-01 transition-colors">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-900 text-center text-sm text-gray-500">
        <p>© All rights reserved to FitSphere 2026</p>
      </div>
    </footer>
  );
};

export default Footer;