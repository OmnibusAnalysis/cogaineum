'use client';

import type React from 'react';

import { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Donate from '@/components/Donate';
import Footer from '@/components/Footer';

export default function Portfolio() {
  const [currentWord, setCurrentWord] = useState('loss');
  const [isSpinning, setIsSpinning] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Scroll states for Hero
  const [heroScrollOpacity, setHeroScrollOpacity] = useState(1);
  const [heroBlurAmount, setHeroBlurAmount] = useState(0);

  // Scroll states for Intro
  const [introScrollOpacity, setIntroScrollOpacity] = useState(0);
  const [introBlurAmount, setIntroBlurAmount] = useState(15);

  // Scroll states for About
  const [aboutScrollOpacity, setAboutScrollOpacity] = useState(0);
  const [navbarOpacity, setNavbarOpacity] = useState(0);

  const aboutSectionRef = useRef<HTMLDivElement>(null!);
  const contactSectionRef = useRef<HTMLDivElement>(null!);
  const donateSectionRef = useRef<HTMLDivElement>(null!);

  // Animation duration in milliseconds
  const animationDuration = 2500;

  const [mounted, setMounted] = useState(false);
  const hasSpun = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to trigger the slot machine spin
  const spinSlot = useCallback(() => {
    if (isSpinning || hasSpun.current) return;

    hasSpun.current = true;
    setIsSpinning(true);
    setAnimationComplete(false);

    // Set to "gain" and start gradient animation when the word aligns
    setTimeout(() => {
      setCurrentWord('gain');
      setIsSpinning(false);
      setAnimationComplete(true);
    }, animationDuration * 0.5); // Start at halfway point when gain aligns
  }, [isSpinning, animationDuration]);

  useEffect(() => {
    // Initial spin after component mounts
    const initialTimeout = setTimeout(() => {
      spinSlot();
    }, 2000);

    return () => clearTimeout(initialTimeout);
  }, [spinSlot]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Hero fade out (0% to 100% of viewport)
      const heroFadeStart = 0;
      const heroFadeEnd = viewportHeight;
      const heroOpacity = Math.max(
        0,
        Math.min(1, 1 - (scrollY - heroFadeStart) / (heroFadeEnd - heroFadeStart))
      );
      setHeroScrollOpacity(heroOpacity);
      setHeroBlurAmount((1 - heroOpacity) * 15);

      // Intro fade in (100% to 120% of viewport) - shorter fade in
      const introFadeInStart = viewportHeight;
      const introFadeInEnd = viewportHeight * 1.2;
      const introFadeInOpacity = Math.max(
        0,
        Math.min(1, (scrollY - introFadeInStart) / (introFadeInEnd - introFadeInStart))
      );

      // Intro fade out (250% to 350% of viewport) - starts later, longer fade out
      const introFadeOutStart = viewportHeight * 2.5;
      const introFadeOutEnd = viewportHeight * 3.5;
      const introFadeOutOpacity = Math.max(
        0,
        Math.min(1, 1 - (scrollY - introFadeOutStart) / (introFadeOutEnd - introFadeOutStart))
      );

      const introOpacity = Math.min(introFadeInOpacity, introFadeOutOpacity);
      setIntroScrollOpacity(introOpacity);
      setIntroBlurAmount((1 - introOpacity) * 15);

      // About fade in (400% to 430% of viewport) - starts after Intro is gone
      const aboutFadeStart = viewportHeight * 4.0;
      const aboutFadeEnd = viewportHeight * 4.3;
      const aboutOpacity = Math.max(
        0,
        Math.min(1, (scrollY - aboutFadeStart) / (aboutFadeEnd - aboutFadeStart))
      );
      setAboutScrollOpacity(aboutOpacity);

      // Navbar opacity (tied to About section)
      setNavbarOpacity(aboutOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add keyboard navigation support
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Add focus styles when using keyboard navigation
      document.body.classList.add('keyboard-navigation');
    }
  }, []);

  // Add keyboard navigation support
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Add skip to main content link
  const skipToMainContent = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:z-50"
        onClick={skipToMainContent}
      >
        Skip to main content
      </a>

      {/* Main container with consistent black background */}
      <main
        id="main-content"
        className="relative min-h-screen bg-black text-white overflow-x-hidden"
        role="main"
        aria-label="Main content"
      >
        <Navbar
          opacity={navbarOpacity}
          scrollToSection={scrollToSection}
          aboutRef={aboutSectionRef}
          contactRef={contactSectionRef}
          donateRef={donateSectionRef}
        />

        {/* Fixed sections with proper z-index layering */}
        <div className="fixed inset-0 z-10 bg-black">
          <Hero
            currentWord={currentWord}
            isSpinning={isSpinning}
            animationComplete={animationComplete}
            scrollOpacity={heroScrollOpacity}
            blurAmount={heroBlurAmount}
          />

          <Intro scrollOpacity={introScrollOpacity} blurAmount={introBlurAmount} />
        </div>

        {/* Scrollable content with higher z-index */}
        <div className="relative z-20" role="region" aria-label="Content sections">
          {/* Increased spacer height to create more space between sections */}
          <div className="h-[450vh]" aria-hidden="true"></div>

          <div className="relative bg-black">
            <About ref={aboutSectionRef} style={{ opacity: mounted ? aboutScrollOpacity : 1 }} />
            <Contact ref={contactSectionRef} />
            <Donate ref={donateSectionRef} />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
