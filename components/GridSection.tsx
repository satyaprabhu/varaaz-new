'use client'

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
]

export default function GridSection() {
  return (
    <section className="py-8 px-4 lg:px-8 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tight text-gray-900">
            Explore Our <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">Artworks</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the sacred geometry and mandala art that inspires transformation
          </p>
        </div>

        {/* Grid Layout - 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {gridImages.map((image) => {
            const isYellow = image.color === 'yellow'

            return (
              <div key={image.id} className="group relative">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    isYellow
                      ? 'from-yellow-200/40 via-yellow-100/20 to-transparent'
                      : 'from-pink-200/40 via-pink-100/20 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl blur-2xl`}
                ></div>

                {/* Card Container */}
                <div
                  className={`relative bg-white border-3 ${
                    isYellow
                      ? 'border-yellow-300 group-hover:border-yellow-500'
                      : 'border-pink-300 group-hover:border-pink-500'
                  } rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}
                >
                  {/* Card Interior */}
                  <div
                    className={`relative h-64 bg-gradient-to-br ${
                      isYellow ? 'from-yellow-100 to-yellow-50' : 'from-pink-100 to-pink-50'
                    } flex items-center justify-center overflow-hidden`}
                  >
                    {/* Animated Emoji */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl opacity-30 group-hover:opacity-50 transition-all duration-300">
                        {image.emoji}
                      </div>
                    </div>

                    {/* Glow border on hover */}
                    <div
                      className={`absolute inset-0 border-3 ${
                        isYellow ? 'border-yellow-400' : 'border-pink-400'
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`}
                    ></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Category Badge */}
                    <div
                      className={`inline-block w-fit px-3 py-1 mb-3 ${
                        isYellow
                          ? 'bg-yellow-100 border border-yellow-300 text-yellow-900'
                          : 'bg-pink-100 border border-pink-300 text-pink-900'
                      } rounded-full`}
                    >
                      <p className="text-xs font-bold uppercase tracking-widest">{image.category}</p>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black uppercase tracking-wide text-gray-900 leading-tight mb-2">
                      {image.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 flex-grow">
                      Discover the beauty and meaning behind this sacred artwork
                    </p>

                    {/* Learn More */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                        isYellow
                          ? 'text-yellow-600 hover:text-yellow-700'
                          : 'text-pink-600 hover:text-pink-700'
                      }`}>
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
