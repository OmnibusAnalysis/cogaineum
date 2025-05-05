"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Intro from "@/components/Intro"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Donate from "@/components/Donate"
import Footer from "@/components/Footer"

export default function Portfolio() {
  // Define the sequence of words to cycle through, ending with "Gain"
  const sequence = ["loss", "gain", "loss", "gain", "gain"]
  const [currentWord, setCurrentWord] = useState("loss")
  const [isSpinning, setIsSpinning] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  
  // Scroll states for Hero
  const [heroScrollOpacity, setHeroScrollOpacity] = useState(1)
  const [heroBlurAmount, setHeroBlurAmount] = useState(0)
  
  // Scroll states for Intro
  const [introScrollOpacity, setIntroScrollOpacity] = useState(0)
  const [introBlurAmount, setIntroBlurAmount] = useState(15)
  
  // Scroll states for About
  const [aboutScrollOpacity, setAboutScrollOpacity] = useState(0)
  const [navbarOpacity, setNavbarOpacity] = useState(0)

  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const donateSectionRef = useRef<HTMLDivElement>(null)

  // Animation duration in milliseconds
  const animationDuration = 6000

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to trigger the slot machine spin
  const spinSlot = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setAnimationComplete(false)

    // After animation completes, set to "gain"
    setTimeout(() => {
      setCurrentWord("gain")
      setIsSpinning(false)

      // Trigger the color change animation after the slot machine stops
      setTimeout(() => {
        setAnimationComplete(true)
      }, 100)
    }, animationDuration)
  }

  useEffect(() => {
    // Initial spin after component mounts
    const initialTimeout = setTimeout(() => {
      spinSlot()
    }, 2000)

    return () => clearTimeout(initialTimeout)
  }, [])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // Hero fade out (0% to 100% of viewport)
      const heroFadeStart = 0
      const heroFadeEnd = viewportHeight
      const heroOpacity = Math.max(0, Math.min(1, 1 - (scrollY - heroFadeStart) / (heroFadeEnd - heroFadeStart)))
      setHeroScrollOpacity(heroOpacity)
      setHeroBlurAmount((1 - heroOpacity) * 15)

      // Intro fade in (100% to 130% of viewport)
      const introFadeInStart = viewportHeight
      const introFadeInEnd = viewportHeight * 1.3
      const introFadeInOpacity = Math.max(0, Math.min(1, (scrollY - introFadeInStart) / (introFadeInEnd - introFadeInStart)))
      
      // Intro fade out (230% to 250% of viewport) - moved much later
      const introFadeOutStart = viewportHeight * 2.3
      const introFadeOutEnd = viewportHeight * 3.0
      const introFadeOutOpacity = Math.max(0, Math.min(1, 1 - (scrollY - introFadeOutStart) / (introFadeOutEnd - introFadeOutStart)))
      
      const introOpacity = Math.min(introFadeInOpacity, introFadeOutOpacity)
      setIntroScrollOpacity(introOpacity)
      setIntroBlurAmount((1 - introOpacity) * 15)

      // About fade in (230% to 260% of viewport) - adjusted to match new Intro timing
      const aboutFadeStart = viewportHeight * 2.3
      const aboutFadeEnd = viewportHeight * 2.6
      const aboutOpacity = Math.max(0, Math.min(1, (scrollY - aboutFadeStart) / (aboutFadeEnd - aboutFadeStart)))
      setAboutScrollOpacity(aboutOpacity)

      // Navbar opacity (tied to About section)
      setNavbarOpacity(aboutOpacity)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-black">
      {/* Main container with consistent black background */}
      <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar
          opacity={navbarOpacity}
          scrollToSection={scrollToSection}
          aboutRef={aboutSectionRef}
          contactRef={contactSectionRef}
          donateRef={donateSectionRef}
        />

        <Hero
          sequence={sequence}
          currentWord={currentWord}
          isSpinning={isSpinning}
          animationComplete={animationComplete}
          scrollOpacity={heroScrollOpacity}
          blurAmount={heroBlurAmount}
        />

        <Intro
          scrollOpacity={introScrollOpacity}
          blurAmount={introBlurAmount}
        />

        {/* Content container that scrolls over the fixed background */}
        <div className="relative z-20">
          {/* Increased spacer to ensure intro stays visible much longer */}
          <div className="h-[400vh]"></div>

          <About 
            ref={aboutSectionRef} 
            style={{ opacity: mounted ? aboutScrollOpacity : 1 }}
          />
          <Contact ref={contactSectionRef} />
          <Donate ref={donateSectionRef} />
          <Footer />
        </div>
      </main>
    </div>
  )
}
