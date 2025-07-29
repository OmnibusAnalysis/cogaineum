'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
  featured?: boolean;
}

const ModernPortfolio: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'an-r-key',
      title: 'An-R-Key',
      description: 'Anarchy is uncut, raw, a blank slate which unlocks your inner workings. When one door closes, use an R-Key to open the next.',
      image: '/an-r-key.webp',
      category: 'digital-art',
      featured: true,
    },
    {
      id: 'monopowerly',
      title: 'Monopowerly',
      description: 'A Christmas 2023 response to Hasbro\'s advertising campaign, showcasing the power of individual creativity over corporate monopolies.',
      image: '/monopowerly.webp',
      category: 'social-commentary',
      link: '/monopowerly_image_set',
      featured: true,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'digital-art', label: 'Digital Art' },
    { id: 'social-commentary', label: 'Social Commentary' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="py-24 px-6 section-gradient">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light gradient-text-animated mb-6">
            Portfolio
          </h2>
          <div className="w-24 h-px gradient-bg mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A collection of digital art and creative projects that showcase innovation and artistic vision.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors rounded ${
                  selectedCategory === category.id
                    ? 'gradient-bg text-white'
                    : 'text-slate-400 hover:text-white gradient-card'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group gradient-card p-6 rounded-lg"
            >
              {/* Image */}
              <div className="relative mb-6 overflow-hidden rounded">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 gradient-bg text-white text-xs font-medium rounded">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-light gradient-text-animated mb-4">
                  Digital Art Series
                </h3>
                
                <p className="text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Action Button */}
                {item.link ? (
                  <Link href={item.link}>
                    <button className="gradient-button px-6 py-3 font-medium rounded transition-all duration-200">
                      View Project
                    </button>
                  </Link>
                ) : (
                  <button className="gradient-button px-6 py-3 font-medium rounded transition-all duration-200">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernPortfolio;