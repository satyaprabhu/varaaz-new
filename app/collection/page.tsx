'use client'

import { useState } from 'react'

interface PortfolioItem {
  id: string
  title: string
  description: string
  collection: string
  image: string
}

export default function CollectionPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<string>('All')

  // Three main collections aligned with courses
  const portfolioItems: PortfolioItem[] = [
    // Flower of Life Mastery Collection
    {
      id: '1',
      title: 'Flower of Life I',
      description: 'Sacred geometry mandala featuring the Flower of Life pattern',
      collection: 'Flower of Life Mastery',
      image: '/images/portfolio-1.svg'
    },
    {
      id: '2',
      title: 'Flower of Life II',
      description: 'Hand-drawn sacred geometry with intricate detailing',
      collection: 'Flower of Life Mastery',
      image: '/images/portfolio-2.svg'
    },
    {
      id: '3',
      title: 'Flower of Life III',
      description: 'Expressive mandala creation using traditional methods',
      collection: 'Flower of Life Mastery',
      image: '/images/portfolio-3.svg'
    },
    {
      id: '4',
      title: 'Flower of Life IV',
      description: 'Sacred geometry integrated with modern artistic expression',
      collection: 'Flower of Life Mastery',
      image: '/images/portfolio-4.svg'
    },

    // Sacred Torus Foundations Collection
    {
      id: '5',
      title: 'Torus Exploration I',
      description: 'Complex multi-layered torus composition in mixed media',
      collection: 'Sacred Torus Foundations',
      image: '/images/portfolio-5.svg'
    },
    {
      id: '6',
      title: 'Torus Exploration II',
      description: 'Fibonacci sequence visualized through torus form',
      collection: 'Sacred Torus Foundations',
      image: '/images/portfolio-6.svg'
    },
    {
      id: '7',
      title: 'Torus Exploration III',
      description: 'Golden ratio studies through 3D torus visualization',
      collection: 'Sacred Torus Foundations',
      image: '/images/portfolio-7.svg'
    },
    {
      id: '8',
      title: 'Torus Exploration IV',
      description: 'Mathematical beauty in torus geometry',
      collection: 'Sacred Torus Foundations',
      image: '/images/portfolio-8.svg'
    },

    // 8 Mandala Journey Collection
    {
      id: '9',
      title: 'Mandala I - Earth',
      description: 'Grounding mandala representing earth element',
      collection: '8 Mandala Journey',
      image: '/images/portfolio-9.svg'
    },
    {
      id: '10',
      title: 'Mandala II - Water',
      description: 'Flow and fluidity through mandala meditation',
      collection: '8 Mandala Journey',
      image: '/images/portfolio-10.svg'
    },
    {
      id: '11',
      title: 'Mandala III - Fire',
      description: 'Transformation and energy mandala creation',
      collection: '8 Mandala Journey',
      image: '/images/portfolio-11.svg'
    },
    {
      id: '12',
      title: 'Mandala IV - Spirit',
      description: 'Cosmic connection mandala representing consciousness',
      collection: '8 Mandala Journey',
      image: '/images/portfolio-12.svg'
    }
  ]

  const collections = ['All', ...Array.from(new Set(portfolioItems.map(item => item.collection)))]

  const filteredItems = selectedCollection === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.collection === selectedCollection)

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

      <div className="py-32 px-4 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="max-w-6xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-center mb-4 uppercase tracking-tight text-gray-900">
            Our<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Collections</span>
          </h1>
          <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto">
            Explore curated collections from Flower of Life Mastery, Sacred Torus Foundations, and 8 Mandala Journey. Each collection showcases the depth and transformative practice of sacred geometry and mandala creation.
          </p>
        </div>

        {/* Collection Filter */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="flex flex-wrap gap-3 justify-center">
            {collections.map(collection => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-6 py-2 rounded-full font-semibold uppercase tracking-widest text-sm transition-all duration-300 ${
                  selectedCollection === collection
                    ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 text-white shadow-lg shadow-pink-600/30'
                    : 'bg-white border-2 border-pink-300 text-pink-600 hover:border-pink-500'
                }`}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Card Container */}
                <div className="relative w-full h-80 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden rounded-2xl border border-pink-300/50">
                  {/* Placeholder Mandala Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-15 group-hover:opacity-30 transition-opacity duration-300">
                      🌀
                    </div>
                  </div>

                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/5 via-transparent to-gray-100/10"></div>

                  {/* Text Overlay - Appears on Hover */}
                  <div
                    className={`absolute inset-0 flex flex-col items-start justify-end p-6 bg-gradient-to-t from-gray-900/90 via-gray-800/70 to-transparent transition-all duration-300 ${
                      hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 rounded-full border border-pink-400/70">
                      <p className="text-xs font-bold text-white uppercase tracking-widest">
                        {item.collection}
                      </p>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-wide mb-2 text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Floating Badge - Always Visible */}
                  <div className="absolute top-4 right-4 px-3 py-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-gray-900 font-bold text-xs uppercase tracking-widest">
                      View
                    </span>
                  </div>

                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 border-2 border-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No works found in this category.</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto mt-20 mb-16 h-1 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"></div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-gray-900">
            Ready to Explore Your<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Journey</span>?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Discover the transformative power of Vedic science, sacred geometry, and mandala creation. Our three comprehensive courses guide you through deepening your practice and artistic expression. Begin your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="inline-block px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
            >
              Explore Courses
            </a>
            <a
              href="/bookings"
              className="inline-block px-10 py-4 border-2 border-yellow-400 text-amber-700 rounded-full font-black uppercase tracking-widest hover:bg-amber-50 transition-all duration-300"
            >
              Book a Session
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
