'use client'

import { useEffect, useRef } from 'react'

export default function ParallaxHero({ title, subtitle }: { title: string; subtitle: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollY = window.scrollY
      const heroHeight = containerRef.current.offsetHeight
      const heroTop = containerRef.current.offsetTop

      // Parallax effect on background blobs
      const blobs = containerRef.current.querySelectorAll('[data-parallax]')
      blobs.forEach((blob) => {
        const speed = parseFloat((blob as HTMLElement).getAttribute('data-parallax') || '1')
        const translateY = -scrollY * speed * 0.3
        ;(blob as HTMLElement).style.transform = `translateY(${translateY}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-yellow-50/30 to-white"
    >
      {/* Animated Background Blobs */}
      <div
        className="absolute top-0 right-10 w-96 h-96 bg-gradient-to-br from-yellow-100/30 to-pink-100/20 rounded-full blur-3xl"
        data-parallax="0.5"
      ></div>
      <div
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-pink-100/30 to-yellow-100/20 rounded-full blur-3xl"
        data-parallax="0.7"
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-screen">
        <div className="w-full px-4 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text (5 columns) */}
              <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-6">
                {/* Brand/Course Name */}
                <p className="text-xs md:text-sm font-bold text-yellow-600 uppercase tracking-widest mb-2">
                  Varalakshmi Vedic Science Courses
                </p>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter mb-3">
                  <span className="block bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                    Master Ancient Vedic Wisdom
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light mb-4">
                  Through Vedic Principles & Mandala Creation
                </p>

                {/* Divider Line */}
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-pink-600 rounded-full mb-3"></div>

                {/* Additional Info */}
                <p className="text-xs md:text-sm text-gray-600">
                  By <span className="font-semibold text-gray-900">Varalakshmi B</span>
                </p>
              </div>

              {/* Right Column - Masterpiece Card (7 columns) */}
              <div className="lg:col-span-7 flex items-center justify-center lg:justify-start">
                <div className="group relative w-full">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl blur-2xl"></div>

                  {/* Card Container */}
                  <div className="relative bg-white border-3 border-yellow-300 group-hover:border-pink-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 p-5 md:p-6">
                    {/* Section Title */}
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase">
                      Create Your Own <span className="bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 bg-clip-text text-transparent">Masterpiece</span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                      Every artwork in this collection was created by seekers like you—people who discovered the transformative power of Vedic science and mandala creation. Your journey could start today.
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent mb-6"></div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-2">
                      {/* Explore Courses Button */}
                      <button className="flex-1 bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:shadow-lg transition-all duration-300">
                        Explore Courses
                      </button>

                      {/* Learn More Button */}
                      <button className="flex-1 bg-white border-2 border-yellow-400 text-gray-900 py-2 px-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-yellow-50 transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Decorative Cards */}
      <div className="absolute bottom-20 left-8 md:left-20 opacity-10 group">
        <div className="w-32 h-32 border-3 border-yellow-400 rounded-3xl"></div>
      </div>

      <div className="absolute top-40 right-8 md:right-20 opacity-10">
        <div className="w-40 h-40 border-3 border-pink-400 rounded-3xl transform -rotate-12"></div>
      </div>
    </div>
  )
}
