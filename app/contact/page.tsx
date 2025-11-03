'use client'

import { FormEvent, useState } from 'react'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('Message sent successfully!')
        e.currentTarget.reset()
      } else {
        setMessage('Failed to send message. Try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative text-gray-900">
      {/* Minimal Golden Line Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="goldenLines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="100" y2="100" stroke="#D4AF37" strokeWidth="0.5"/>
              <line x1="100" y1="0" x2="0" y2="100" stroke="#D4AF37" strokeWidth="0.5"/>
              <line x1="0" y1="50" x2="100" y2="50" stroke="#D4AF37" strokeWidth="0.3"/>
              <line x1="50" y1="0" x2="50" y2="100" stroke="#D4AF37" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#goldenLines)"/>
        </svg>
      </div>

      <div className="py-20 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-center mb-4 uppercase tracking-tight text-gray-900">Get In Touch</h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="bg-white border border-pink-300 rounded-lg p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-50 border border-pink-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 bg-gray-50 border border-pink-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-700">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-50 border border-pink-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 bg-gray-50 border border-pink-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
              />
            </div>

            {message && (
              <p className={`mb-6 text-center font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/40 disabled:opacity-50 transition-all duration-300"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
