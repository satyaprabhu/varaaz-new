'use client'

import { useState, FormEvent } from 'react'

interface BookingWidgetProps {
  fallback?: boolean
}

export default function BookingWidget({ fallback = false }: BookingWidgetProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')

  const calendlyPath = process.env.NEXT_PUBLIC_CALENDLY_PATH

  const handleFallbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage("Booking request submitted! We'll confirm shortly.")
        e.currentTarget.reset()
      } else {
        setMessage('Failed to submit booking. Try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Calendly Embed
  if (!fallback && calendlyPath) {
    return (
      <div>
        <iframe
          src={`https://calendly.com/${calendlyPath}?hide_event_type_details=1&hide_gdpr_policy=1`}
          width="100%"
          height="650"
          frameBorder="0"
          className="rounded-lg"
        ></iframe>
      </div>
    )
  }

  // Fallback Form
  return (
    <form onSubmit={handleFallbackSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 bg-gray-100 border border-pink-300/50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-pink-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-2 bg-gray-100 border border-pink-300/50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-pink-400"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-semibold mb-2 text-gray-700">
            Preferred Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full px-4 py-2 bg-gray-100 border border-pink-300/50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-pink-400"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-semibold mb-2 text-gray-700">
            Preferred Time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            required
            className="w-full px-4 py-2 bg-gray-100 border border-pink-300/50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-pink-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-semibold mb-2 text-gray-700">
          Session Topic
        </label>
        <select
          id="topic"
          name="topic"
          required
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 border border-pink-300/50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-pink-400"
        >
          <option value="">Select a topic</option>
          <option value="vedic-fundamentals">Vedic Science Fundamentals</option>
          <option value="mandala-creation">Mandala Creation</option>
          <option value="sacred-geometry">Sacred Geometry</option>
          <option value="other">Other</option>
        </select>
      </div>

      {selectedTopic && (
        <div className="bg-yellow-50/80 border-2 border-yellow-200 rounded-lg p-4">
          <label className="block text-sm font-semibold mb-3 text-gray-900">
            🎨 Premium Art Kit Add-On - ₹3,000
          </label>
          <p className="text-xs text-gray-600 mb-4">Professional-grade supplies & tools including premium brushes, quality papers, and specialty inks.</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="addon"
                value="yes"
                className="w-4 h-4 accent-yellow-400"
              />
              <span className="text-sm text-gray-700">Yes, add to my session</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="addon"
                value="no"
                defaultChecked
                className="w-4 h-4 accent-yellow-400"
              />
              <span className="text-sm text-gray-700">No, skip this</span>
            </label>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="notes" className="block text-sm font-semibold mb-2 text-gray-700">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Tell us about your interests and what you'd like to focus on..."
          className="w-full px-4 py-2 bg-gray-100 border border-pink-300/50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-pink-400"
        />
      </div>

      {message && (
        <p className={`text-center font-semibold ${message.includes('success') || message.includes('submitted') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 transition-all duration-300"
      >
        {loading ? 'Submitting...' : 'Request Session'}
      </button>

      <p className="text-xs text-gray-600 text-center">
        We'll contact you to confirm your preferred time slot and payment details.
      </p>
    </form>
  )
}
