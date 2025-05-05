"use client"

import { forwardRef, useState } from "react"

const Donate = forwardRef<HTMLDivElement>((props, ref) => {
  const [copySuccess, setCopySuccess] = useState(false)

  // Copy Venmo ID to clipboard
  const copyVenmoId = () => {
    navigator.clipboard
      .writeText("@CoGaineum-Art")
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <div ref={ref} className="min-h-screen bg-black px-6 py-24 animate-fade-in-delayed">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Help me make art. 
        </h2>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-6">
              <p className="text-lg">
                I have more ideas than I have the money for. I buy all supplies from local establishments.
              </p>

              <div className="p-6 border-2 border-gray-800 rounded-lg bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Donate via Venmo
                </h3>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-lg font-medium text-gray-300">@CoGaineum-Art</div>
                  <button
                    onClick={copyVenmoId}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {copySuccess ? "Copied!" : "Copy"}
                  </button>
                </div>

                <p className="text-gray-400 text-sm">
                  Are you a corporation? Want me to leave you alone? Contact me about writing me a check. 
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                <a
                  href="https://venmo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-center font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Open Venmo App
                </a>

                <button
                  onClick={copyVenmoId}
                  className="px-6 py-3 border-2 border-purple-600 hover:border-purple-500 rounded-lg text-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {copySuccess ? "Venmo ID Copied!" : "Copy Venmo ID"}
                </button>
              </div>
            </div>

            {/* Right column - QR code */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-lg">
                {/* Placeholder for Venmo QR code */}
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                  <div className="text-white text-center px-4">
                    <p className="font-bold">Venmo QR Code</p>
                    <p className="text-sm mt-2">Scan with your phone camera</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-400 text-center">Scan to donate directly</p>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Support?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-gray-800 rounded-lg bg-black/50">
                <h4 className="text-lg font-medium mb-2 text-purple-300">Fund New Projects</h4>
                <p className="text-gray-400">
                  Your donations directly support the creation of new artistic works and installations.
                </p>
              </div>

              <div className="p-5 border border-gray-800 rounded-lg bg-black/50">
                <h4 className="text-lg font-medium mb-2 text-pink-300">Enable Exhibitions</h4>
                <p className="text-gray-400">
                  Help bring my work to public spaces for wider audiences to experience.
                </p>
              </div>

              <div className="p-5 border border-gray-800 rounded-lg bg-black/50">
                <h4 className="text-lg font-medium mb-2 text-purple-300">Support Innovation</h4>
                <p className="text-gray-400">
                  Enable experimentation with new techniques and technologies in digital art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Donate.displayName = "Donate"

export default Donate
