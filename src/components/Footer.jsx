import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0E535F] text-white pt-6 pb-4 px-4">
      <div className="container mx-auto text-center sm:max-w-96 md:max-w-128 lg:max-w-192 xl:max-w-256">
        {/* College Name */}
        <h2 className="text-xl font-semibold mb-4">
          Fr. C. Rodrigues Institute of Technology
        </h2>
        
        {/* Address */}
        <p className="text-sm mb-6">
          Agnel Technical Education Complex, Sector 9-A, Vashi, Navi Mumbai, Maharashtra, India, Pin - 400703
        </p>
        
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/council.fcrit2024/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
