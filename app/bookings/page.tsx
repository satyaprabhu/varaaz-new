'use client'

import { useState } from 'react'
import BookingWidget from '@/components/BookingWidget'

export default function BookingsPage() {
  const [showFallback, setShowFallback] = useState(false)

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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-center mb-4 uppercase tracking-tight text-gray-900">
            Book a <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">Session</span>
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg font-light">
            Schedule a personalized 1-on-1 guidance session with our instructors.
          </p>

          <div className="bg-white border border-pink-300 rounded-lg p-8">
            {!showFallback ? (
              <div>
                <BookingWidget />
                <div className="text-center mt-8 pt-8 border-t border-gray-300">
                  <p className="text-sm text-gray-600 mb-4">Having trouble with the calendar?</p>
                  <button
                    onClick={() => setShowFallback(true)}
                    className="text-pink-600 hover:text-pink-700 underline text-sm font-semibold transition-colors"
                  >
                    Use booking form instead
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <BookingWidget fallback={true} />
                <div className="text-center mt-8 pt-8 border-t border-gray-300">
                  <button
                    onClick={() => setShowFallback(false)}
                    className="text-pink-600 hover:text-pink-700 underline text-sm font-semibold transition-colors"
                  >
                    Back to calendar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
