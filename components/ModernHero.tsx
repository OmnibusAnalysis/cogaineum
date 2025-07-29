'use client';

import type { FC } from 'react';

const ModernHero: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Simple, clean title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-animated" style={{ letterSpacing: '0.05em' }}>
          COGAINEUM
        </h1>
        
        {/* Simple subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Where artistic vision meets digital innovation
        </p>
        
        {/* Simple, clean buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="gradient-button-animated px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200"
          >
            View Portfolio
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white text-white px-8 py-4 text-lg font-medium rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
          >
            Learn More
          </button>
        </div>
        
        {/* Modern scroll indicator */}
        <div className="mt-16">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-3">Scroll down</span>
            <div className="relative">
              <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center animate-pulse">
                <svg 
                  className="w-4 h-4 text-gray-500 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;