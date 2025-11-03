import { getPost } from '@/lib/posts'
import { notFound } from 'next/navigation'
import PortfolioGrid from '@/components/PortfolioGrid'

export default async function AboutPage() {
  const post = await getPost('pages', 'about')

  if (!post) notFound()

  const { content, data } = post

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

      {/* Hero Section - Bold & Edgy */}
      <div className="py-16 px-4 bg-white relative overflow-hidden z-10">
        {/* Decorative sacred geometry elements */}
        <div className="absolute top-5 right-5 opacity-5 pointer-events-none">
          <div className="text-6xl">🌀</div>
        </div>
        <div className="absolute bottom-5 left-5 opacity-5 pointer-events-none">
          <div className="text-6xl">✦</div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-pink-600/20 border border-yellow-400/50 rounded-full text-xs font-semibold tracking-widest text-yellow-700 uppercase">
            Vedic Science Educator
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight text-gray-900 uppercase">
            VARAAZ
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
            Where ancient Vedic wisdom collides with contemporary art therapy.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-4 bg-white relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Profile Card - Edgy Modern Design */}
          <div className="grid md:grid-cols-2 gap-8 mb-20 items-center">
            {/* Image Placeholder - Bold & Modern */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-pink-600 rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-yellow-50 to-white border border-pink-300/50 rounded-2xl h-96 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="text-8xl mb-6">🎨</div>
                <p className="text-3xl font-black uppercase tracking-wider text-gray-900">Varaaz</p>
                <p className="text-sm text-gray-600 mt-4 font-light uppercase tracking-widest">10+ Years Creating Reality</p>
              </div>
            </div>

            {/* Profile Info - Bold Typography */}
            <div>
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight text-gray-900">
                Artist<br /><span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">/ Therapist</span><br />/ Visionary
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg font-light">
                500+ hand-drawn mandalas. A decade mastering ancient Vedic science and universal principles. Blending Vedic wisdom with cutting-edge art therapy—because consciousness is rooted in cosmic law and visual practice.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-start border-l-2 border-amber-700 pl-4">
                  <div>
                    <p className="text-amber-700 font-bold uppercase tracking-wide">Fine Arts Degree</p>
                    <p className="text-gray-600 text-xs">Specialized in Vedic Science & Mandala Art</p>
                  </div>
                </div>
                <div className="flex items-start border-l-2 border-amber-700 pl-4">
                  <div>
                    <p className="text-amber-700 font-bold uppercase tracking-wide">Master's in Art Therapy</p>
                    <p className="text-gray-600 text-xs">California State University, Long Beach</p>
                  </div>
                </div>
                <div className="flex items-start border-l-2 border-amber-700 pl-4">
                  <div>
                    <p className="text-amber-700 font-bold uppercase tracking-wide">Certified Mandala Artist</p>
                    <p className="text-gray-600 text-xs">500+ Completed Works</p>
                  </div>
                </div>
                <div className="flex items-start border-l-2 border-amber-700 pl-4">
                  <div>
                    <p className="text-amber-700 font-bold uppercase tracking-wide">Life Coach</p>
                    <p className="text-gray-600 text-xs">Mandala Art Therapy Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards Section - Edgy Modern */}
          <div className="mb-20">
            <h2 className="text-5xl font-black mb-16 uppercase tracking-tight text-gray-900">
              Recognized &<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Awarded</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Award Card 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
                <div className="relative bg-white backdrop-blur-sm border-2 border-pink-300/50 rounded-xl p-8 hover:border-pink-400 transition-all duration-300 h-full flex flex-col">
                  <div className="text-5xl mb-6">🏆</div>
                  <h3 className="text-xl font-black uppercase tracking-wide mb-2 text-gray-900">Rotary Dronacharya</h3>
                  <p className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-4">2025</p>
                  <p className="text-gray-700 text-sm leading-relaxed">Excellence in art education and mentorship pushing boundaries</p>
                </div>
              </div>

              {/* Award Card 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
                <div className="relative bg-white backdrop-blur-sm border-2 border-pink-300/50 rounded-xl p-8 hover:border-pink-400 transition-all duration-300 h-full flex flex-col">
                  <div className="text-5xl mb-6">🎭</div>
                  <h3 className="text-xl font-black uppercase tracking-wide mb-2 text-gray-900">AIWAA Award</h3>
                  <p className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-4">Art & Culture</p>
                  <p className="text-gray-700 text-sm leading-relaxed">Distinguished contribution to Vedic science education & mandala practice</p>
                </div>
              </div>

              {/* Award Card 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
                <div className="relative bg-white backdrop-blur-sm border-2 border-pink-300/50 rounded-xl p-8 hover:border-pink-400 transition-all duration-300 h-full flex flex-col">
                  <div className="text-5xl mb-6">📖</div>
                  <h3 className="text-xl font-black uppercase tracking-wide mb-2 text-gray-900">International Wonder</h3>
                  <p className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-4">Book of Records</p>
                  <p className="text-gray-700 text-sm leading-relaxed">Creator of the largest Vedic Science-inspired Mandala ever made</p>
                </div>
              </div>
            </div>
          </div>

          {/* Teaching Philosophy - Edgy Modern */}
          <div className="mb-20">
            <h2 className="text-5xl font-black mb-12 uppercase tracking-tight text-gray-900">
              The<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Philosophy</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white backdrop-blur-sm border border-pink-300/50 rounded-lg p-8 hover:border-pink-400 transition-all duration-300">
                <div className="text-4xl mb-4">🧘</div>
                <h3 className="font-black text-lg uppercase tracking-wide mb-3 text-amber-700">Guru Model</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Discipline, tradition, and innovation. No shortcuts. Just mastery.</p>
              </div>
              <div className="bg-white backdrop-blur-sm border border-pink-300/50 rounded-lg p-8 hover:border-pink-400 transition-all duration-300">
                <div className="text-4xl mb-4">🧬</div>
                <h3 className="font-black text-lg uppercase tracking-wide mb-3 text-amber-700">Science Backed</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Patterns reshape brainwaves. Geometry rewires neurons. This is real.</p>
              </div>
              <div className="bg-white backdrop-blur-sm border border-pink-300/50 rounded-lg p-8 hover:border-pink-400 transition-all duration-300">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-black text-lg uppercase tracking-wide mb-3 text-amber-700">Vedic Power</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Master Vedic principles and activate cosmic consciousness. Transform instantly.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400/10 via-pink-500/10 to-pink-600/10 border border-pink-300/30 rounded-lg p-8 backdrop-blur-sm">
              <p className="text-gray-800 italic text-lg leading-relaxed font-light">
                "Vedic principles aren't just philosophy—they reshape how your consciousness functions. Mind, body, spirit: unified. When you study and embody these universal laws, you're literally tuning to the cosmic frequency of existence."
              </p>
            </div>
          </div>

          {/* Science Section - Modern & Edgy */}
          <div className="mb-20">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tight text-gray-900">
              The<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Science</span>
            </h2>
            <p className="text-center text-gray-700 italic mb-16 text-xl font-light">
              "Vedic science reveals the mathematical and energetic foundation of the universe" — Ancient Vedic Wisdom
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Neuroscience Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
                <div className="relative bg-white backdrop-blur-sm border-2 border-pink-300/50 group-hover:border-pink-400 rounded-xl p-8 transition-all duration-300">
                  <div className="text-5xl mb-4">🧬</div>
                  <h3 className="text-2xl font-black uppercase tracking-wide mb-4 text-amber-700">Brainwave Shift</h3>
                  <p className="text-sm text-gray-700 mb-6 font-bold uppercase tracking-wide">
                    NIH 2023 Study — 11 Clinical Trials
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">→</span>
                      <span className="text-gray-700"><strong className="text-gray-900">-25-30%</strong> anxiety & stress</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">→</span>
                      <span className="text-gray-700"><strong className="text-gray-900">Alpha waves</strong> activated instantly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">→</span>
                      <span className="text-gray-700"><strong className="text-gray-900">+40%</strong> focus & concentration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">→</span>
                      <span className="text-gray-700"><strong className="text-gray-900">Neural rewiring</strong> through creation</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Nature's Code Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
                <div className="relative bg-white backdrop-blur-sm border-2 border-pink-300/50 group-hover:border-pink-400 rounded-xl p-8 transition-all duration-300">
                  <div className="text-5xl mb-4">∞</div>
                  <h3 className="text-2xl font-black uppercase tracking-wide mb-4 text-amber-700">Nature's Blueprint</h3>
                  <p className="text-sm text-gray-700 mb-6 font-bold uppercase tracking-wide">
                    Universal Patterns Everywhere
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">◇</span>
                      <span className="text-gray-700"><strong className="text-gray-900">Flower of Life:</strong> 5 Platonic solids</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">◇</span>
                      <span className="text-gray-700"><strong className="text-gray-900">Fibonacci Spiral:</strong> DNA to galaxies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">◇</span>
                      <span className="text-gray-700"><strong className="text-gray-900">Torus Field:</strong> Hearts, atoms, planets</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-3 font-bold">◇</span>
                      <span className="text-gray-700"><strong className="text-gray-900">1.618 Ratio:</strong> Perfection encoded</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <PortfolioGrid />
    </div>
  )
}
