import type React from 'react';
// Shared interfaces for common types

// Contact form related types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormStatus {
  success: boolean;
  message: string;
}

// Animation related types
export interface AnimationState {
  isSpinning: boolean;
  animationComplete: boolean;
  currentWord: string;
}

// Scroll effect related types
export interface ScrollEffects {
  scrollOpacity: number;
  blurAmount: number;
  navbarOpacity: number;
}

// Section reference types
export interface SectionRefs {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  donateRef: React.RefObject<HTMLDivElement | null>;
}

// Navbar props interface
export interface NavbarProps {
  opacity: number;
  scrollToSection: (ref: React.RefObject<HTMLDivElement | null>) => void;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  donateRef: React.RefObject<HTMLDivElement | null>;
}

// Hero props interface
export interface HeroProps {
  sequence: string[];
  currentWord: string;
  isSpinning: boolean;
  animationComplete: boolean;
  scrollOpacity: number;
  blurAmount: number;
}
