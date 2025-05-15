'use client';

import type { FC } from 'react';

interface HeroProps {
  currentWord: string;
  isSpinning: boolean;
  animationComplete: boolean;
  scrollOpacity: number;
  blurAmount: number;
}

const Hero: FC<HeroProps> = ({
  currentWord,
  isSpinning,
  animationComplete,
  scrollOpacity,
  blurAmount,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 bg-black">
      <div
        className="text-center transition-all duration-700 max-w-4xl mx-auto px-4"
        style={{
          opacity: scrollOpacity,
          filter: `blur(${blurAmount}px)`,
          transform: `scale(${1 + blurAmount * 0.01})`,
          visibility: scrollOpacity > 0 ? 'visible' : 'hidden',
        }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter flex items-center justify-center">
          <div className="relative flex items-center gap-0">
            {/* Base text with Co and eum */}
            <span
              className={`transition-colors duration-1000 ${animationComplete ? 'liquid-gradient-left' : ''} mr-[-0.1em]`}
            >
              Co
            </span>

            {/* Slot machine container */}
            <div className="relative h-[1.2em] overflow-hidden" style={{ width: '3.2ch' }}>
              {/* Current word (visible when not spinning) */}
              {!isSpinning && (
                <div
                  className={`h-full flex items-center justify-center transition-colors duration-1000 ${
                    animationComplete ? 'liquid-gradient-center' : ''
                  }`}
                >
                  {currentWord}
                </div>
              )}

              {/* Slot machine reel (visible when spinning) */}
              {isSpinning && (
                <div className="single-spin-animation h-full">
                  {/* Sequence of loss and gain repeated only once */}
                  {['loss', 'gain'].map((word, index) => (
                    <div key={index} className="h-full flex items-center justify-center">
                      {word}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span
              className={`transition-colors duration-1000 ${animationComplete ? 'liquid-gradient-right' : ''} ml-[-0.1em]`}
            >
              eum
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
