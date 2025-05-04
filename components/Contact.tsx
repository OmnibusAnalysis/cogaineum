"use client"

import { forwardRef, useState, type FormEvent } from "react"

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
  // Contact form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!name || !email || !message) {
      setFormStatus("error")
      return
    }

    // Simulate form submission
    setFormStatus(null) // Reset status

    // Show success message after a brief delay to simulate processing
    setTimeout(() => {
      setFormStatus("success")
      // Reset form
      setName("")
      setEmail("")
      setMessage("")

      // Reset status after 3 seconds
      setTimeout(() => setFormStatus(null), 3000)
    }, 800)
  }

  return (
    <div ref={ref} className="min-h-screen bg-black px-6 py-24 animate-fade-in-delayed">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Contact
        </h2>

        <div className="mt-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Send Message
              </button>
            </div>

            {/* Form status messages */}
            {formStatus === "success" && (
              <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-green-500 rounded-lg">
                <p className="text-green-400">Your message has been sent successfully!</p>
              </div>
            )}

            {formStatus === "error" && (
              <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-red-500 rounded-lg">
                <p className="text-red-400">Please fill out all fields before submitting.</p>
              </div>
            )}
          </form>
        </div>

        {/* Contact information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border-2 border-gray-800 rounded-lg bg-black/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Location
            </h3>
            <p className="text-gray-300">New York City, NY</p>
            <p className="text-gray-300">United States</p>
          </div>

          <div className="p-6 border-2 border-gray-800 rounded-lg bg-black/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Email & Phone
            </h3>
            <p className="text-gray-300">hello@cogaineum.art</p>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  )
})

Contact.displayName = "Contact"

export default Contact
