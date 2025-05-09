'use client';

import type React from 'react';

import type { FC } from 'react';

interface NavbarProps {
  opacity: number;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  donateRef: React.RefObject<HTMLDivElement>;
}

const Navbar: FC<NavbarProps> = ({ opacity, scrollToSection, aboutRef, contactRef, donateRef }) => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 px-6 py-4 transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Cogaineum
        </div>
        <ul className="flex space-x-8">
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
      </div>
    </nav>
  );
};

export default Navbar;
