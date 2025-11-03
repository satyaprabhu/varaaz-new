'use client'

import { useState } from 'react'

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  image: string
  size?: 'small' | 'medium' | 'large' // For staggered layout
}

interface PortfolioGridProps {
  items?: PortfolioItem[]
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Default portfolio items with varied sizes for staggered layout
  const defaultItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Flower of Life Series',
      description: 'Hand-drawn sacred geometry mandala featuring the Flower of Life pattern',
      category: 'Sacred Geometry',
      image: '/images/portfolio-1.svg',
      size: 'large'
    },
    {
      id: '2',
      title: 'Torus Exploration',
      description: 'Complex multi-layered torus composition in mixed media',
      category: 'Torus Geometry',
      image: '/images/portfolio-2.svg',
      size: 'medium'
    },
    {
      id: '3',
      title: 'Mandala Meditation',
      description: 'Intricate mandala design created through guided journaling practice',
      category: 'Mandala Art',
      image: '/images/portfolio-3.svg',
      size: 'medium'
    },
    {
      id: '4',
      title: 'Vedic Patterns',
      description: 'Ancient Vedic geometry integrated with modern artistic expression',
      category: 'Sacred Geometry',
      image: '/images/portfolio-4.svg',
      size: 'small'
    },
    {
      id: '5',
      title: 'Golden Ratio Studies',
      description: 'Exploration of the 1.618 ratio in nature and mandala creation',
      category: 'Nature & Art',
      image: '/images/portfolio-5.svg',
      size: 'large'
    },
    {
      id: '6',
      title: 'Consciousness Canvas',
      description: 'Large-scale mandala artwork created through art therapy sessions',
      category: 'Art Therapy',
      image: '/images/portfolio-6.svg',
      size: 'medium'
    }
  ]

  const portfolioItems = items || defaultItems

  // Helper function to get grid span classes based on size
  const getGridClasses = (size: string | undefined) => {
    switch (size) {
      case 'large':
        return 'col-span-1 row-span-2 md:col-span-2 md:row-span-2'
      case 'small':
        return 'col-span-1 row-span-1'
      case 'medium':
      default:
        return 'col-span-1 md:col-span-1 row-span-1 md:row-span-2'
    }
  }

  // Helper function to get height classes
  const getHeightClasses = (size: string | undefined) => {
    switch (size) {
      case 'large':
        return 'h-96 md:h-full'
      case 'small':
        return 'h-60 md:h-80'
      case 'medium':
      default:
        return 'h-80 md:h-96'
    }
  }

  return (
    <section className="py-20 px-4 lg:px-8 bg-white relative z-10 overflow-hidden">
      {/* Floating blob decorations */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-amber-200/10 to-amber-100/5 blob pointer-events-none" style={{borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'}}></div>
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-tr from-amber-100/5 to-amber-50/10 blob pointer-events-none" style={{borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', animationDelay: '2s'}}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight text-gray-900">
            Featured<span className="text-amber-600"> Works</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore a curated collection of mandalas and Vedic science artworks that showcase the transformative power of creation.
          </p>
        </div>

        {/* Staggered Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-max mb-12">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 ${getGridClasses(
                item.size
              )}`}
              style={{ borderRadius: '2.5rem' }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Area with Overlay */}
              <div
                className={`relative w-full ${getHeightClasses(item.size)} bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden border border-amber-200/50`}
                style={{ borderRadius: '2.5rem' }}
              >
                {/* Placeholder Mandala Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl opacity-15 group-hover:opacity-30 transition-opacity duration-300">
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
                  <div className="inline-block mb-3 px-3 py-1 bg-amber-400/60 rounded-full border border-amber-300/70">
                    <p className="text-xs font-bold text-amber-900 uppercase tracking-widest">
                      {item.category}
                    </p>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-2 text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Floating Badge - Always Visible */}
                <div className="absolute top-4 right-4 px-3 py-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-gray-900 font-bold text-xs uppercase tracking-widest">
                    View
                  </span>
                </div>

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius: '2.5rem' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>

        {/* Call to Action Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tight mb-6 text-gray-900">
              Create Your<span className="text-amber-600"> Own</span> Masterpiece
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Every artwork in this collection was created by seekers like you—people who discovered the transformative power of Vedic science and mandala creation. Your journey could start today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/courses"
                className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-bold uppercase tracking-widest hover:shadow-2xl transition-all duration-300 text-center"
              >
                Explore Courses
              </a>
              <a
                href="/about"
                className="inline-block px-8 py-4 border-2 border-amber-600 text-amber-700 rounded-full font-bold uppercase tracking-widest hover:bg-amber-50 transition-all duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-4xl font-black text-amber-600 mb-2">500+</div>
              <p className="text-gray-700 text-sm uppercase tracking-widest">
                Hand-Drawn Mandalas
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-4xl font-black text-amber-600 mb-2">10+</div>
              <p className="text-gray-700 text-sm uppercase tracking-widest">
                Years Teaching
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <p className="text-gray-700 text-sm uppercase tracking-widest">
                Student Success
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-4xl font-black text-amber-600 mb-2">∞</div>
              <p className="text-gray-700 text-sm uppercase tracking-widest">
                Lifetime Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
