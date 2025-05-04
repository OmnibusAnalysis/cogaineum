"use client" 

import { forwardRef } from "react"

interface AboutProps {
  style?: React.CSSProperties
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ style }, ref) => {
  return (
    <div ref={ref} className="min-h-screen bg-black px-6 py-24 animate-fade-in" style={style}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          About the Artist
        </h2>

        <div className="space-y-6 text-lg">
          <p>
            Welcome to my portfolio. I am a digital artist exploring the boundaries between loss and gain, between what
            we surrender and what we receive in return.
          </p>

          <p>
            My work examines the duality of existence through digital media, interactive installations, and immersive
            experiences that challenge conventional perspectives.
          </p>

          <p>
            Through my art, I invite viewers to question their understanding of value, transformation, and the cyclical
            nature of creation and destruction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="aspect-square bg-gradient-to-br from-purple-900 to-pink-800 rounded-lg flex items-center justify-center">
              <span className="text-2xl">Artwork 1</span>
            </div>
            <div className="aspect-square bg-gradient-to-bl from-pink-800 to-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">Artwork 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

About.displayName = "About"

export default About
