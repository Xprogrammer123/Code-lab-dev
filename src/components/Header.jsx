import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom

const Header = () => {
  const [activeLink, setActiveLink] = useState(''); // To track the active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  // Links array for easier mapping and control
  const links = [
    { name: 'Products', path: '/' }, // Update with your route paths
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu on link click
  };

  return (
    <header className="bg-transparent shadow-md rounded-full">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✖️' : '☰'} {/* Toggle icon */}
        </button>

        {/* Navigation links */}
        <nav className={`flex space-x-20 text-gray-600 relative ${isMenuOpen ? 'flex-col absolute left-0 w-full bg-white md:bg-transparent' : 'hidden md:flex'}`}>
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path} // Use Link for internal routing
              className={`relative font-bold transition duration-300 ease-in-out ${
                activeLink === link.name ? 'text-gray-900' : 'hover:text-gray-900'
              }`}
              onClick={() => handleClick(link.name)} // Set active link on click
            >
              {link.name}

              {/* Underline with transition */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-gray-600 transition-all duration-500 ease-in-out ${
                  activeLink === link.name
                    ? 'w-full' // Full width when active
                    : 'w-0 group-hover:w-full' // Expand on hover
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Shopping basket icon */}
        <div className="relative">
          <AiOutlineShoppingCart className="text-2xl text-gray-600 hover:text-gray-900" />
          {/* Basket count */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
