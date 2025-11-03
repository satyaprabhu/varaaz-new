import { getPost } from '@/lib/posts'
import CoursesClient from '@/components/CoursesClient'

interface Course {
  title: string
  duration: string
  level: string
  price_early: number
  price_regular: number
  description?: string
  sessions?: string
  format?: string
}

export default async function CoursesPage() {
  const coursesPage = await getPost('pages', 'courses')
  const coursesContent = coursesPage?.content || ''

  const courses: Course[] = [
    {
      title: 'Flower of Life Mastery',
      duration: '8 weeks',
      level: 'All levels',
      price_early: 18000,
      price_regular: 22000,
      sessions: '16 sessions',
      format: '2 per week, 2.5 hrs each',
      description: 'Master sacred geometry, Vedic math foundations, and expressive mandala creation'
    },
    {
      title: 'Sacred Torus Foundations',
      duration: '6 weeks',
      level: 'Intermediate',
      price_early: 14000,
      price_regular: 17000,
      sessions: '12 sessions',
      format: '2 per week, 2.5 hrs each',
      description: 'Master the torus geometry through 100+ drawing templates and 3D visualization techniques'
    },
    {
      title: '8 Mandala Journey',
      duration: '12 days',
      level: 'All levels',
      price_early: 12000,
      price_regular: 15000,
      sessions: '12 sessions',
      format: '1 per day, 3 hrs each',
      description: 'Intensive 12-day sprint to create 8 unique mandalas with expressive techniques and journaling'
    }
  ]

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

      <div className="py-16 px-4 bg-white relative overflow-hidden z-10">
        {/* Decorative sacred geometry elements */}
        <div className="absolute top-12 right-12 opacity-5 pointer-events-none">
          <div className="text-6xl">✦</div>
        </div>
        <div className="absolute bottom-12 left-12 opacity-5 pointer-events-none">
          <div className="text-6xl">🌀</div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-5 py-1 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-pink-600/20 border border-yellow-400/50 rounded-full text-xs font-semibold tracking-widest text-yellow-700 uppercase">
            Transformative Learning Experiences
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight text-gray-900 uppercase tracking-tight">
            Our<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Master sacred geometry, mandala creation, and transformative artistic practice through immersive, hands-on learning.
          </p>
        </div>
      </div>

      <div className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <CoursesClient courses={courses} coursesContent={coursesContent} />
        </div>
      </div>
    </div>
  )
}
