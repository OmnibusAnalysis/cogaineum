"use client" 

import { forwardRef, useEffect, useState } from "react"
import Image from "next/image"

interface AboutProps {
  style?: React.CSSProperties
}

// Custom hook to handle dark reader compatibility
const useDarkReaderCompatibility = () => {
  const [isDarkReaderActive, setIsDarkReaderActive] = useState(false)

  useEffect(() => {
    // Check if dark reader is active
    const hasDarkReader = document.documentElement.hasAttribute('data-darkreader-inline-bgcolor') ||
                         document.documentElement.hasAttribute('data-darkreader-inline-color')
    setIsDarkReaderActive(hasDarkReader)
  }, [])

  return isDarkReaderActive
}

// Wrapper component to handle dark reader compatibility
const DarkReaderCompatibleImage = ({ src, alt, width, height, className, priority }: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}) => {
  const isDarkReaderActive = useDarkReaderCompatibility()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the image after mounting to avoid hydration mismatch
  if (!mounted) {
    return <div className={className} style={{ width, height }} />
  }

  return (
    <div className={className}>
      <Image 
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={{
          color: 'transparent',
          ...(isDarkReaderActive && {
            '--darkreader-inline-color': 'transparent'
          })
        }}
      />
    </div>
  )
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ style }, ref) => {
  return (
    <div
      ref={ref}
      data-testid="about-container"
      className="min-h-screen bg-black px-6 py-24 animate-fade-in"
      style={style}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          About the Artist
        </h2>

        <div className="space-y-6 text-lg">
          <p>
            My name is Robert Maxwell Remlinger, the creator and human thought process behind Cogaineum.
            I am a native of Springfield, Ohio and currently reside in Cincinnati, Ohio.
          </p>

          <p>
            My work illustrates the absurdity and vibrancy of life itself. It thrives on face-to-face interaction, 
            something that is increasingly rare in our society. 
          </p>

          <p>
           I am anti-corporate and do not wish to work with them unless necesary. 
           I am a firm believer in the power of the individual and the importance of personal expression.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="aspect-square bg-gradient-to-br from-purple-900 to-pink-800 rounded-lg flex flex-col items-center justify-center pt-16 pb-12">
              <DarkReaderCompatibleImage 
                src="/an-r-key.webp" 
                alt="an-r-key" 
                width={300} 
                height={300} 
                className="mb-4 rounded shadow-lg"
                priority
              />
              <span className="text-2xl">An-R-Key</span>
              <p className="text-sm text-center px-12 mt-4 text-gray-300">
                Anarchy is uncut, raw, a blank slate which unlocks your inner workings. When one door closes, use an R-Key to open the next.
              </p>
            </div>
            <div className="aspect-square bg-gradient-to-bl from-pink-800 to-purple-900 rounded-lg flex flex-col items-center justify-center pt-12 pb-12">
              <DarkReaderCompatibleImage 
                src="/monopowerly.webp" 
                alt="monopowerly" 
                width={300} 
                height={300} 
                className="mb-4 rounded shadow-lg"
                priority
              />
              <span className="text-2xl">Monopowerly</span>
              <p className="text-sm text-center px-4 mt-2 text-gray-300 max-w-md">
                Monopowerly emerged as my Christmas 2023 gift in relation to Hasbro's <a href="https://www.socialsamosa.com/campaign-spot/monopoly-new-ad-says-all-is-fair-in-fun-games-1386620" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 transition-colors duration-200 underline">Christmas advertising campaign</a> 
                for their (stolen) intellectual property game branded as "Monopoly". In this campaign,
                Hasbro is showcasing bad behavior as acceptable using the tagline, "All is fair...". Following their lead,
                and made my own version using the facilities at the Cincinnati Public Library. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

About.displayName = "About"

export default About
