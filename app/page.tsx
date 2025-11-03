import { getPost } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PortfolioGrid from '@/components/PortfolioGrid'
import TestimonialsSection from '@/components/TestimonialsSection'
import ParallaxHero from '@/components/ParallaxHero'
import GridSection from '@/components/GridSection'

export default async function Home() {
  const post = await getPost('pages', 'home')

  if (!post) notFound()

  const { content, data } = post
  const { title, subtitle } = data as { title: string; subtitle: string; slug: string }

  return (
    <div className="w-full bg-white relative text-gray-900">
      <style>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(2px); }
        }
        @keyframes fluidWave {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes flowIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .subtle-float {
          animation: subtleFloat 6s ease-in-out infinite;
        }
        .fluid-wave {
          animation: fluidWave 4s ease-in-out infinite;
        }
        .flow-in {
          animation: flowIn 0.8s ease-out forwards;
        }
        .blob {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }
        .blob-animated {
          animation: blobShift 8s ease-in-out infinite;
        }
        @keyframes blobShift {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          50% { border-radius: 70% 30% 70% 30% / 30% 70% 70% 30%; }
          75% { border-radius: 30% 70% 30% 70% / 70% 30% 30% 70%; }
        }
      `}</style>
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

      {/* Parallax Hero Section */}
      <ParallaxHero title={title} subtitle={subtitle} />

      {/* Grid Section - 6 Artwork Cards */}
      <GridSection />

      {/* Ready to Begin Your Journey Section with CTAs */}
      <section className="py-20 px-4 lg:px-8 bg-white relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-gray-900">
              Ready to Begin Your<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Journey</span>?
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto mb-12">
              Discover how Vedic principles and sacred art can transform your consciousness and creative expression.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/courses" className="group relative flex-1 sm:flex-none">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 opacity-25 group-hover:opacity-40 rounded-lg blur-lg transition-all duration-300 -z-10"></div>
              <div className="bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest hover:shadow-xl transition-all duration-300 text-center inline-block w-full sm:w-auto">
                Explore Courses
              </div>
            </Link>
            <Link href="/bookings" className="group relative flex-1 sm:flex-none">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 opacity-0 group-hover:opacity-15 rounded-lg blur-lg transition-all duration-300 -z-10"></div>
              <div className="bg-white border-2 border-yellow-400 text-gray-900 px-10 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-yellow-50 transition-all duration-300 text-center inline-block w-full sm:w-auto">
                Book a Session
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer - Card Grid */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-white via-yellow-50/30 to-white relative z-10 overflow-hidden">
        {/* Floating blob decorations */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-yellow-100/10 to-yellow-50/5 blob blob-animated pointer-events-none" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-yellow-100/10 to-yellow-50/5 blob blob-animated pointer-events-none" style={{animationDelay: '3s'}}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-12 uppercase tracking-tight text-gray-900">
            Why <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">Choose</span> Varaaz
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Vedic Science */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
              <div className="relative bg-white border border-yellow-200 group-hover:border-pink-400 rounded-xl p-8 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md">
                <div className="text-5xl mb-6">☮</div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">Vedic Science</h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  Master ancient Vedic principles, cosmic ratios, and universal laws that reshape your consciousness through science-backed methodology.
                </p>
              </div>
            </div>

            {/* Card 2 - Hands-On Creation */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
              <div className="relative bg-white border border-yellow-200 group-hover:border-pink-400 rounded-xl p-8 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md">
                <div className="text-5xl mb-6">🕉</div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">Hands-On Art</h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  Work with multiple media to develop your unique artistic voice and create exhibition-ready work.
                </p>
              </div>
            </div>

            {/* Card 3 - Community & Mentorship */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-xl"></div>
              <div className="relative bg-white border border-yellow-200 group-hover:border-pink-400 rounded-xl p-8 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md">
                <div className="text-5xl mb-6">✨</div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">Mentorship</h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  Access to 3-month mentorship and lifetime alumni community with direct guidance from Varaaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Varalakshmi B Profile Card with Micro Insights Section */}
      <section className="py-20 px-4 lg:px-8 bg-white relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Varalakshmi B Card */}
            <div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl blur-2xl"></div>
                <div className="relative bg-white border-2 border-pink-300/50 rounded-2xl p-10 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 via-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-black text-5xl shadow-lg mb-6">VB</div>
                    <h3 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">Varalakshmi B</h3>
                    <p className="text-amber-700 font-bold uppercase tracking-widest text-xs mb-6">Vedic Science Educator · Art Therapist · Life Coach</p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed text-center mb-6">
                    With over a decade of mastering ancient Vedic wisdom and modern artistic practice. Creator of 500+ hand-drawn mandalas. Transforming consciousness through sacred geometry.
                  </p>
                  <div className="pt-6 border-t border-pink-300/30">
                    <div className="text-center">
                      <h4 className="text-base font-black text-gray-900 uppercase tracking-wide mb-1">10+ Years Mastery</h4>
                      <p className="text-xs text-amber-700 font-bold uppercase tracking-widest mb-2">Vedic Science Expert</p>
                      <p className="text-xs text-gray-700 leading-relaxed">Deep expertise in Vedic science, mandala creation, and consciousness transformation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Micro Insights */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <span className="text-4xl flex-shrink-0">🏆</span>
                  <div className="flex-grow">
                    <h4 className="text-base font-black text-gray-900 uppercase tracking-wide leading-tight">Rotary Dronacharya Award</h4>
                    <p className="text-xs text-amber-700 font-bold uppercase tracking-widest mt-1 mb-2">2025</p>
                    <p className="text-xs text-gray-700 leading-relaxed">Excellence in art education and mentorship pushing boundaries</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 border border-pink-200 rounded-lg p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <span className="text-4xl flex-shrink-0">🎭</span>
                  <div className="flex-grow">
                    <h4 className="text-base font-black text-gray-900 uppercase tracking-wide leading-tight">AIWAA Award</h4>
                    <p className="text-xs text-amber-700 font-bold uppercase tracking-widest mt-1 mb-2">Art & Culture</p>
                    <p className="text-xs text-gray-700 leading-relaxed">Distinguished contribution to Vedic science education and mandala practice</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-lg p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <span className="text-4xl flex-shrink-0">📖</span>
                  <div className="flex-grow">
                    <h4 className="text-base font-black text-gray-900 uppercase tracking-wide leading-tight">International Wonder Book of Records</h4>
                    <p className="text-xs text-amber-700 font-bold uppercase tracking-widest mt-1 mb-2">Largest Mandala Creator</p>
                    <p className="text-xs text-gray-700 leading-relaxed">Creator of the largest Vedic science-inspired mandala ever made</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  )
}
