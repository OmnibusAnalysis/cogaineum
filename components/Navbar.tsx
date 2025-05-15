'use client';

import type React from 'react';
import { useState } from 'react';
import type { FC } from 'react';
import type { NavbarProps } from '@/app/types';

const Navbar: FC<NavbarProps> = ({ opacity, scrollToSection, aboutRef, contactRef, donateRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (ref: React.RefObject<HTMLDivElement | null>) => {
    scrollToSection(ref);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 px-6 py-4 transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Cogaineum
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white hover:text-purple-400 transition-colors duration-300"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-white hover:text-purple-400 transition-colors duration-300"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-white hover:text-purple-400 transition-colors duration-300"
            >
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(donateRef)}
              className="text-white hover:text-purple-400 transition-colors duration-300"
            >
              Donate
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>

        {/* Mobile menu overlay */}
        <div
          className={`md:hidden fixed top-[72px] left-0 right-0 h-[40%] z-40 bg-black opacity-100 transform transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'translate-y-0 pointer-events-auto'
              : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col h-full p-0 m-0">
            {/* Mobile menu items */}
            <ul className="flex flex-col items-center justify-start space-y-6 p-0 m-0">
              <li>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl text-center w-full"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick(aboutRef)}
                  className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl text-center w-full"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick(contactRef)}
                  className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl text-center w-full"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick(donateRef)}
                  className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl text-center w-full"
                >
                  Donate
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
