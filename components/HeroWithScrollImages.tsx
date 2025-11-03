'use client'

import { useState, useEffect, useRef } from 'react'

interface GridImage {
  id: string
  title: string
  category: string
  emoji: string
  color: 'yellow' | 'pink'
}

const gridImages: GridImage[] = [
  { id: '1', title: 'Flower of Life', category: 'Sacred Geometry', emoji: '🌀', color: 'yellow' },
  { id: '2', title: 'Mandala Art', category: 'Meditation', emoji: '✨', color: 'pink' },
  { id: '3', title: 'Golden Ratio', category: 'Nature Art', emoji: '🔯', color: 'yellow' },
  { id: '4', title: 'Vedic Science', category: 'Ancient Wisdom', emoji: '☮', color: 'pink' },
  { id: '5', title: 'Cosmic Energy', category: 'Universe', emoji: '🌌', color: 'yellow' },
  { id: '6', title: 'Sacred Patterns', category: 'Geometry', emoji: '✡', color: 'pink' },
  { id: '7', title: 'Art Therapy', category: 'Healing', emoji: '🎨', color: 'yellow' },
  { id: '8', title: 'Transformation', category: 'Growth', emoji: '🦋', color: 'pink' },
]

export default function HeroWithScrollImages({ title, subtitle }: { title: string; subtitle: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const scrollThresholdRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only trigger every 500ms to avoid rapid changes
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const diff = currentScrollY - lastScrollY

        // Scroll down - next image
        if (diff > 30) {
          setCurrentImageIndex(prev => (prev + 1) % gridImages.length)
          setLastScrollY(currentScrollY)
        }
        // Scroll up - previous image
        else if (diff < -30) {
          setCurrentImageIndex(prev => (prev - 1 + gridImages.length) % gridImages.length)
          setLastScrollY(currentScrollY)
        }
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [lastScrollY])

  const currentImage = gridImages[currentImageIndex]
  const isYellow = currentImage.color === 'yellow'

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Hero Text */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight uppercase tracking-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-xl">
            {subtitle}
          </p>

          {/* Image Counter */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 rounded-full"></div>
            <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {currentImageIndex + 1} / {gridImages.length}
            </p>
          </div>
        </div>

        {/* Right Side - Single Card with Scroll Loading */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="group relative w-full max-w-sm">
            {/* Glow background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
              isYellow
                ? 'from-yellow-200/30 via-yellow-100/20 to-transparent'
                : 'from-pink-200/30 via-pink-100/20 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl blur-xl`}></div>

            {/* Card */}
            <div className={`relative bg-white border-3 ${
              isYellow
                ? 'border-yellow-300 group-hover:border-yellow-500'
                : 'border-pink-300 group-hover:border-pink-500'
            } rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-96 flex flex-col`}>

              {/* Image Area */}
              <div className={`relative h-full bg-gradient-to-br ${
                isYellow
                  ? 'from-yellow-100 to-yellow-50'
                  : 'from-pink-100 to-pink-50'
              } flex items-center justify-center overflow-hidden`}>

                {/* Animated Emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-9xl opacity-30 group-hover:opacity-50 transition-all duration-300 animate-pulse`}>
                    {currentImage.emoji}
                  </div>
                </div>

                {/* Overlay - Category & Title (Always Visible) */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/20 to-transparent flex flex-col justify-end p-8">
                  <div className={`inline-block w-fit px-4 py-2 ${
                    isYellow
                      ? 'bg-yellow-100 border border-yellow-300 text-yellow-900'
                      : 'bg-pink-100 border border-pink-300 text-pink-900'
                  } rounded-full mb-3`}>
                    <p className="text-xs font-bold uppercase tracking-widest">{currentImage.category}</p>
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-wide text-white leading-tight mb-4">
                    {currentImage.title}
                  </h2>
                  <p className="text-sm text-gray-200">Scroll to explore more artworks</p>
                </div>

                {/* Border Glow on Hover */}
                <div className={`absolute inset-0 border-3 ${
                  isYellow ? 'border-yellow-400' : 'border-pink-400'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none`}></div>
              </div>
            </div>

            {/* Navigation Indicators */}
            <div className="flex gap-2 mt-6 justify-center">
              {gridImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? `w-8 bg-gradient-to-r ${
                          isYellow ? 'from-yellow-400 to-yellow-600' : 'from-pink-400 to-pink-600'
                        }`
                      : 'w-2 bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
