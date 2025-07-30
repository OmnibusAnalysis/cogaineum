'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';

const ModernAbout: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="py-24 px-6 section-gradient">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light gradient-text-animated mb-6">
            About
          </h2>
          <div className="w-24 h-px gradient-bg mx-auto mb-8"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start relative">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light gradient-text-animated mb-4">
                  Robert Maxwell Remlinger
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Creator and human thought process behind Cogaineum. I have an academmic background in Finance from Miami, University in Oxford. I am a native of Springfield, Ohio and currently reside in Cincinnati, Ohio.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-light gradient-text-animated mb-4">
                  Creative Vision
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  My work illustrates the absurdity and vibrancy of life itself. It thrives on face-to-face interaction, something that is increasingly rare in our society.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-light gradient-text-animated mb-4">
                  Anti-Corporate
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  I am anti-corporate and do not wish to work with them unless necesary. I am a firm believer in the power of the individual and the importance of personal expression.
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px gradient-bg transform -translate-x-1/2"></div>

          {/* Right Column - Philosophy */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-light gradient-text-animated mb-6">
                Philosophy
              </h3>
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                  The Colosseum, a grand architectural feat of the Roman Empire, was emblematic of the &quot;bread and circuses&quot; strategy - an elaborate spectacle designed to pacify and distract the masses through displays of violence and death. It served as a political tool, offering brutal entertainment to maintain control over an oppressed population.
                </p>
                
                <p>
                  In contrast, &quot;Cogaineum&quot; represents a radically different philosophy: the use of entertainment not as a means of manipulation, but as a form of universal expression and benefit.
                </p>
                
                <p>
                  The Colosseum glorified the end of life for public amusement.
                </p>
                
                <p>
                  Cogainium celebrates the absurdity and vibrancy of life itself. It thrives on face-to-face interaction, transforming performance into a competitive, yet collaborative, sport of art - one that invites participation, fosters creativity, and reclaims entertainment as a shared human experience rather than a spectacle of suffering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernAbout;