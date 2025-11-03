'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface GridImage {
  id: string
  title: string
  category: string
  emoji: string
  color: 'yellow' | 'pink' | 'purple'
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

export default function HeroGrid() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set(['1', '2', '3']))
  const [nextImageIndex, setNextImageIndex] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  const loadNextImage = useCallback(() => {
    setLoadedImages(prev => {
      const newSet = new Set(prev)
      if (nextImageIndex < gridImages.length) {
        newSet.add(gridImages[nextImageIndex].id)
        setNextImageIndex(nextImageIndex + 1)
      }
      return newSet
    })
  }, [nextImageIndex])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const isInView = containerRect.top < window.innerHeight && containerRect.bottom > 0

      if (isInView && nextImageIndex < gridImages.length) {
        loadNextImage()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [nextImageIndex, loadNextImage])

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'pink':
        return {
          bg: 'from-pink-100 to-pink-50',
          border: 'border-pink-300 group-hover:border-pink-500',
          icon: 'text-pink-600',
          badge: 'bg-pink-100 border-pink-300 text-pink-900',
        }
      case 'yellow':
      default:
        return {
          bg: 'from-yellow-100 to-yellow-50',
          border: 'border-yellow-300 group-hover:border-yellow-500',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 border-yellow-300 text-yellow-900',
        }
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-max">
        {gridImages.map((image) => {
          const isLoaded = loadedImages.has(image.id)
          const colors = getColorClasses(image.color)

          return (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } ${image.id === '1' || image.id === '5' ? 'col-span-1 row-span-2 md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'}`}
              style={{
                transitionProperty: isLoaded ? 'opacity, transform' : 'none',
              }}
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl blur-xl"></div>

              {/* Card */}
              <div
                className={`relative bg-white border-2 ${colors.border} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-gradient-to-br ${colors.bg}`}
              >
                {/* Image Area */}
                <div className="relative h-full flex items-center justify-center overflow-hidden min-h-64 md:min-h-full">
                  <div className={`text-8xl md:text-9xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${colors.icon}`}>
                    {image.emoji}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10"></div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <div className={`inline-block w-fit px-3 py-1 ${colors.badge} rounded-full border mb-3`}>
                      <p className="text-xs font-bold uppercase tracking-widest">{image.category}</p>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white leading-tight">
                      {image.title}
                    </h3>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 border-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
