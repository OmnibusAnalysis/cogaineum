'use client';

import { forwardRef } from 'react';

interface IntroProps {
  scrollOpacity: number;
  blurAmount: number;
}

const Intro = forwardRef<HTMLDivElement, IntroProps>(({ scrollOpacity, blurAmount }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
      style={{
        opacity: scrollOpacity,
        filter: `blur(${blurAmount}px)`,
        transform: `scale(${1 + blurAmount * 0.01})`,
        visibility: scrollOpacity > 0 ? 'visible' : 'hidden',
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Desktop view - all paragraphs fade in/out together */}
        <div className="hidden md:block text-lg">
          <div className="space-y-6">
            <p className="text-gray-300 italic">
              The Colosseum, a grand architectural feat of the Roman Empire, was emblematic of the
              &ldquo;bread and circuses&rdquo; strategy—an elaborate spectacle designed to pacify and
              distract the masses through displays of violence and death. It served as a political
              tool, offering brutal entertainment to maintain control over an oppressed population.
            </p>
            <p className="text-gray-300 italic">
              In contrast, &ldquo;<span style={{ letterSpacing: '0.15em' }}>Cogainium</span>&rdquo; represents a radically different philosophy: the
              use of entertainment not as a means of manipulation, but as a form of universal
              expression and benefit.
            </p>
            <p className="text-gray-300 italic">
              The Colosseum glorified the end of life for public amusement.
            </p>
            <p className="text-gray-300 italic">
              <span style={{ letterSpacing: '0.15em' }}>Cogainium</span> celebrates the absurdity and vibrancy of life itself. It thrives on
              face-to-face interaction, transforming performance into a competitive, yet
              collaborative, sport of art—one that invites participation, fosters creativity, and
              reclaims entertainment as a shared human experience rather than a spectacle of
              suffering.
            </p>
          </div>
        </div>

        {/* Mobile view - sequential fade in/out */}
        <div className="block md:hidden text-base">
          {/* First section - fades in first, then out */}
          <div 
            className="transition-opacity duration-500"
            style={{
              opacity: Math.min(1, Math.max(0, 1 - (scrollOpacity - 0.7) * 3))
            }}
          >
            <div className="space-y-4">
              <p className="text-gray-300 italic">
                The Colosseum, a grand architectural feat of the Roman Empire, was emblematic of the
                &ldquo;bread and circuses&rdquo; strategy—an elaborate spectacle designed to pacify and
                distract the masses through displays of violence and death. It served as a political
                tool, offering brutal entertainment to maintain control over an oppressed population.
              </p>
              <p className="text-gray-300 italic">
                In contrast, &ldquo;<span style={{ letterSpacing: '0.15em' }}>Cogainium</span>&rdquo; represents a radically different philosophy: the
                use of entertainment not as a means of manipulation, but as a form of universal
                expression and benefit.
              </p>
            </div>
          </div>

          {/* Second section - fades in after first section, then out */}
          <div 
            className="transition-opacity duration-500 mt-8"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollOpacity - 0.7) * 3))
            }}
          >
            <div className="space-y-4">
              <p className="text-gray-300 italic">
                The Colosseum glorified the end of life for public amusement.
              </p>
              <p className="text-gray-300 italic">
                <span style={{ letterSpacing: '0.15em' }}>Cogainium</span> celebrates the absurdity and vibrancy of life itself. It thrives on
                face-to-face interaction, transforming performance into a competitive, yet
                collaborative, sport of art—one that invites participation, fosters creativity, and
                reclaims entertainment as a shared human experience rather than a spectacle of
                suffering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Intro.displayName = 'Intro';

export default Intro;
