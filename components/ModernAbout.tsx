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
    <div className="py-24 px-6 gradient-bg-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light gradient-text-animated mb-6">
            About
          </h2>
          <div className="w-24 h-px gradient-bg mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Crafting digital experiences that blend creativity with cutting-edge technology.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light gradient-text-animated mb-4">
                  Creative Vision
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Pushing the boundaries of digital art and design, creating experiences that resonate and inspire.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-light gradient-text-animated mb-4">
                  Technical Excellence
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Leveraging cutting-edge technologies to bring creative visions to life with precision and performance.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-light gradient-text-animated mb-4">
                  Innovation
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Exploring new possibilities at the intersection of art, technology, and human experience.
                </p>
              </div>
            </div>

            {/* Skills/Tags */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light gradient-text mb-6">
                  Areas of Focus
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 gradient-card text-slate-200 text-sm rounded">
                    Digital Art
                  </span>
                  <span className="px-4 py-2 gradient-card text-slate-200 text-sm rounded">
                    Social Commentary
                  </span>
                  <span className="px-4 py-2 gradient-card text-slate-200 text-sm rounded">
                    Creative Direction
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-light gradient-text mb-6">
                  Current Projects
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Currently developing a series exploring the intersection of technology 
                  and human expression, with upcoming releases planned for 2024.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - New Paragraph */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-light gradient-text-animated mb-6">
                Philosophy
              </h3>
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                  The Colosseum, a grand architectural feat of the Roman Empire, was emblematic of the "bread and circuses" strategy - an elaborate spectacle designed to pacify and distract the masses through displays of violence and death. It served as a political tool, offering brutal entertainment to maintain control over an oppressed population.
                </p>
                
                <p>
                  In contrast, "Cogainium" represents a radically different philosophy: the use of entertainment not as a means of manipulation, but as a form of universal expression and benefit.
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