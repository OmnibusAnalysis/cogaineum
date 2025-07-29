'use client';

import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

// New Modern Components
import ModernNavbar from '@/components/ModernNavbar';
import ModernHero from '@/components/ModernHero';
import ModernAbout from '@/components/ModernAbout';
import ModernPortfolio from '@/components/ModernPortfolio';
import ModernContact from '@/components/ModernContact';
import ModernFooter from '@/components/ModernFooter';

export default function ModernPortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Section refs for navigation
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Intersection observer for active section tracking
  const { ref: heroInViewRef, inView: heroInView } = useInView({ threshold: 0.5 });
  const { ref: aboutInViewRef, inView: aboutInView } = useInView({ threshold: 0.5 });
  const { ref: portfolioInViewRef, inView: portfolioInView } = useInView({ threshold: 0.5 });
  const { ref: contactInViewRef, inView: contactInView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    if (heroInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (portfolioInView) setActiveSection('portfolio');
    else if (contactInView) setActiveSection('contact');
  }, [heroInView, aboutInView, portfolioInView, contactInView]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[hsl(var(--color-background))] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-[hsl(var(--color-accent))] rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
      {/* Modern Navigation */}
      <ModernNavbar 
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section 
          id="home"
          ref={(el) => {
            heroRef.current = el;
            heroInViewRef(el);
          }}
          className="hero-modern hero-gradient-overlay"
        >
          <ModernHero />
        </section>

        {/* About Section */}
        <section 
          id="about"
          ref={(el) => {
            aboutRef.current = el;
            aboutInViewRef(el);
          }}
          className="section-modern"
        >
          <ModernAbout />
        </section>

        {/* Portfolio Section */}
        <section 
          id="portfolio"
          ref={(el) => {
            portfolioRef.current = el;
            portfolioInViewRef(el);
          }}
          className="section-modern"
        >
          <ModernPortfolio />
        </section>

        {/* Contact Section */}
        <section 
          id="contact"
          ref={(el) => {
            contactRef.current = el;
            contactInViewRef(el);
          }}
          className="section-modern"
        >
          <ModernContact />
        </section>
      </main>

      {/* Modern Footer */}
      <ModernFooter />
    </div>
  );
}
