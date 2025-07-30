'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  featured?: boolean;
}

interface Category {
  id: string;
  label: string;
  works: WorkItem[];
}

const ModernPortfolio: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'written',
      label: 'Written Work',
      works: [
        {
          id: 'poem-1',
          title: 'Untitled Poem',
          description: 'A reflection on modern society and individual identity.',
          featured: true,
        },
        {
          id: 'essay-1',
          title: 'Digital Age Reflections',
          description: 'An exploration of technology\'s impact on human connection.',
        },
      ]
    },
    {
      id: 'spoken',
      label: 'Spoken Word',
      works: [
        {
          id: 'performance-1',
          title: 'Voice of the Streets',
          description: 'A powerful spoken word piece about urban life and resilience.',
          featured: true,
        },
        {
          id: 'performance-2',
          title: 'Digital Echoes',
          description: 'Exploring the intersection of technology and human emotion.',
        },
      ]
    },
    {
      id: 'visual',
      label: 'Visual Art',
      works: [
        {
          id: 'an-r-key',
          title: 'An-R-Key',
          description: 'Anarchy is uncut, raw, a blank slate which unlocks your inner workings. When one door closes, use an R-Key to open the next.',
          image: '/an-r-key.webp',
          featured: true,
        },
        {
          id: 'monopowerly',
          title: 'Monopowerly',
          description: 'A Christmas 2023 response to Hasbro\'s advertising campaign, showcasing the power of individual creativity over corporate monopolies.',
          image: '/monopowerly.webp',
          link: '/monopowerly_image_set',
          featured: true,
        },
      ]
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="py-24 px-6 section-gradient">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light gradient-text-animated mb-6">
            Portfolio
          </h2>
          <div className="w-24 h-px gradient-bg mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Rotating exhibition.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {categories.map((category) => (
            <div key={category.id} className="flex-1">
              {/* Category Button */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full gradient-card p-6 rounded-lg text-center transition-all duration-300 hover:shadow-2xl shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-xl md:text-2xl font-light gradient-text-animated mb-2">
                    {category.label}
                  </h3>
                  <div className={`transform transition-transform duration-300 ${
                    expandedCategory === category.id ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Dropdown Content Container - Always present to prevent layout shift */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expandedCategory ? 'h-auto' : 'h-0'
        }`}>
          <div className={`gradient-card p-6 rounded-lg transition-all duration-300 ${
            expandedCategory ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
          }`}>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.find(cat => cat.id === expandedCategory)?.works.map((work) => (
                <div key={work.id} className="group">
                  {/* Work Image (if available) */}
                  {work.image && (
                    <div className="relative mb-4 overflow-hidden rounded">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Featured Badge */}
                      {work.featured && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 gradient-bg text-white text-xs font-medium rounded">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Work Content */}
                  <div>
                    <h4 className="text-xl font-light gradient-text-animated mb-2">
                      {work.title}
                    </h4>
                    
                    <p className="text-slate-400 leading-relaxed mb-4">
                      {work.description}
                    </p>

                    {/* Action Button */}
                    {work.link ? (
                      <a 
                        href={work.link}
                        className="inline-block gradient-button px-4 py-2 font-medium rounded transition-all duration-200"
                      >
                        View Project
                      </a>
                    ) : (
                      <button className="gradient-button px-4 py-2 font-medium rounded transition-all duration-200">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernPortfolio;