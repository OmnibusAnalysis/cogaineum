"use client"

import type { FC } from "react"

interface HeroProps {
  sequence: string[]
  currentWord: string
  isSpinning: boolean
  animationComplete: boolean
  scrollOpacity: number
  blurAmount: number
}

const Hero: FC<HeroProps> = ({ sequence, currentWord, isSpinning, animationComplete, scrollOpacity, blurAmount }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      <div
        className="text-center transition-all duration-700"
        style={{
          opacity: scrollOpacity,
          filter: `blur(${blurAmount}px)`,
          transform: `scale(${1 + blurAmount * 0.01})`,
          visibility: scrollOpacity > 0 ? 'visible' : 'hidden'
        }}
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter flex items-center justify-center">
          {/* Co part with liquid gradient effect */}
          <span className={`transition-colors duration-500 ${animationComplete ? "liquid-gradient-left" : ""}`}>
            Co
          </span>

          {/* Slot machine container */}
          <div className="relative h-[1.2em] mx-1 overflow-hidden" style={{ minWidth: "3ch" }}>
            {/* Current word (visible when not spinning) */}
            {!isSpinning && (
              <div
                className={`absolute inset-0 flex items-center justify-center transition-colors duration-500 ${
                  animationComplete ? "liquid-gradient-center" : ""
                }`}
              >
                {currentWord}
              </div>
            )}

            {/* Slot machine reel (visible when spinning) */}
            {isSpinning && (
              <div className="single-spin-animation absolute inset-0">
                {/* Just the sequence items in order */}
                {sequence.map((word, index) => (
                  <div key={index} className="h-[1.2em] flex items-center justify-center">
                    {word}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* eum part with liquid gradient effect */}
          <span className={`transition-colors duration-500 ${animationComplete ? "liquid-gradient-right" : ""}`}>
            eum
          </span>
        </h1>
      </div>
    </div>
  )
}

export default Hero
