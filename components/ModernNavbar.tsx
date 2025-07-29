'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface ModernNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const ModernNavbar: FC<ModernNavbarProps> = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
      scrolled ? 'bg-slate-950/95 backdrop-blur-sm border-b border-slate-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl font-light text-white hover:text-slate-300 transition-colors"
            >
              Cogaineum
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-slate-300 transition-colors"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute h-px w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-0'
                  }`}
                />
                <span
                  className={`absolute h-px w-6 bg-current transform transition duration-300 ease-in-out translate-y-2 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-px w-6 bg-current transform transition duration-300 ease-in-out translate-y-4 ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="px-6 pt-2 pb-6 space-y-2 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-3 text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;