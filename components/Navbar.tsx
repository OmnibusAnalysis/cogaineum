'use client';

import type React from 'react';
import { useState } from 'react';
import type { FC } from 'react';

interface NavbarProps {
  opacity: number;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  donateRef: React.RefObject<HTMLDivElement>;
}

const Navbar: FC<NavbarProps> = ({ opacity, scrollToSection, aboutRef, contactRef, donateRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => {
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
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40">
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={toggleMenu}
                  className="text-white p-2 focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile menu items */}
              <ul className="flex flex-col items-center justify-center flex-grow space-y-8">
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick(aboutRef)}
                    className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick(contactRef)}
                    className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick(donateRef)}
                    className="text-white hover:text-purple-400 transition-colors duration-300 text-2xl"
                  >
                    Donate
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
