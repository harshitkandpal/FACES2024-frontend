// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Example styles object to use the imported font
const styles = {
  fontFamily: "Graduate",
  fontStyle: 'normal',
  fontWeight: '400',
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authState, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#0E535F]">
      <div className="container mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <div className="text-white text-lg font-inter font-normal" style={styles}>
          <Link to="/" className="hover:text-[#c8ebeb]">UMANG</Link>
        </div>

        {/* Hamburger Menu Button (Hidden on Desktop) */}
        <div className="text-black text-xl font-bold align-middle md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navbar Links (Visible on Desktop) */}
        <div className="hidden md:flex space-x-4" style={styles}>
          <Link to="/" className="text-white text-lg hover:bg-[#0E535F] py-2 px-2">Home</Link>
          <Link to="/aboutFaces" className="text-white text-lg hover:bg-[#0E535F] py-2 px-2">About</Link>
          <Link to="/events" className="text-white text-lg hover:bg-[#0E535F] py-2 px-2">Events</Link>
          {authState.isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white text-lg hover:bg-[#0E535F] py-2 px-2">Profile</Link>
              <button onClick={logout} className="text-white text-lg hover:bg-[#0E535F] py-2 px-2">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white text-lg hover:bg-[#0E535F] py-2 px-2">Login</Link>
          )}
        </div>
      </div>

      {/* Dropdown Menu (Visible on Mobile) */}
      <div className='bg-[#032A33] w-full' style={styles}>
        <div className={`mt-2 ${isOpen ? 'block' : 'hidden'} md:hidden text-center m-4`}>
          <Link to="/" onClick={toggleMenu} className="block text-white px-2 py-2 text-lg hover:bg-[#0E535F] border-b-2">Home</Link>
          <Link to="/aboutFaces" onClick={toggleMenu} className="block text-white px-2 py-2 text-lg hover:bg-[#0E535F] border-b-2">About</Link>
          <Link to="/events" onClick={toggleMenu} className="block text-white px-2 py-2 text-lg hover:bg-[#0E535F] border-b-2">Events</Link>
          {authState.isAuthenticated ? (
            <>
              <Link to="/profile" onClick={toggleMenu} className="block text-white px-2 py-2 text-lg hover:bg-[#0E535F] border-b-2">Profile</Link>
              <button onClick={logout} className="block text-white px-2 py-2 text-lg hover:bg-[#0E535F] border-b-2">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="block text-white px-2 py-2 text-lg hover:bg-[#0E535F] border-b-2">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
