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
            My name is Robert Maxwell Remlinger, the creator and human thought process behind Cogaineum.
            I am a native of Springfield, Ohio and currently reside in Cincinnati, Ohio.
          </p>

          <p>
            My work illustrates the absurdity and vibrancy of life itself. It thrives on face-to-face interaction, 
            something that is increasingly rare in our society. 
          </p>

          <p>
           I am anti-corporate and do not wish to work with them unless necesary. I am a firm believer in the power of the individual and the importance of personal expression.
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
