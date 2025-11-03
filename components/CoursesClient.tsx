'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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

interface CoursesClientProps {
  courses: Course[]
  coursesContent: string
}

export default function CoursesClient({ courses, coursesContent }: CoursesClientProps) {
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  // Handle scroll to show/hide go to top button
  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      setShowGoToTop(window.scrollY > 400)
    }
  }

  // Scroll to top
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Add scroll event listener using useEffect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCourse(null)
    }
    if (selectedCourse) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCourse])

  // Get course description
  const getCourseDescription = (courseTitle: string) => {
    switch (courseTitle) {
      case 'Flower of Life Mastery':
        return 'Master the ancient art of sacred geometry through 16 guided sessions. Learn Vedic principles, create exhibition-ready artwork, and build your artistic portfolio.'
      case 'Sacred Torus Foundations':
        return 'Explore the sacred torus geometry found in nature and consciousness. Work with 100+ templates and develop your unique artistic expression over 12 sessions.'
      case '8 Mandala Journey':
        return 'An intensive 12-day creative sprint to create 8 unique mandalas. Awaken your creative consciousness and develop a complete portfolio series ready for exhibition.'
      default:
        return ''
    }
  }

  // Get course key points
  const getCourseKeyPoints = (courseTitle: string) => {
    switch (courseTitle) {
      case 'Flower of Life Mastery':
        return ['Vedic geometry mastery', 'Multiple artistic media', 'Portfolio building', '3-month mentorship']
      case 'Sacred Torus Foundations':
        return ['Torus drawing techniques', '100+ templates included', '3D visualization', 'Expert portfolio review']
      case '8 Mandala Journey':
        return ['8 finished mandalas', 'Daily intensive sessions', 'Guided journaling', 'Exhibition opportunity']
      default:
        return []
    }
  }

  // Get what you'll get
  const getWhatYouGet = (courseTitle: string) => {
    switch (courseTitle) {
      case 'Flower of Life Mastery':
        return [
          '16 guided sessions (2×/week, 2.5 hrs each)',
          'Materials kit option and certificate on completion',
          '3-month mentorship access and lifetime alumni community',
          'Portfolio review and exhibition opportunity'
        ]
      case 'Sacred Torus Foundations':
        return [
          '12 guided sessions (2×/week, 2.5 hrs each)',
          '100+ torus drawing templates (digital and printable)',
          'Comprehensive 3D visualization workbook',
          '3-month mentorship access and lifetime alumni community',
          'Certificate and portfolio exhibition opportunity'
        ]
      case '8 Mandala Journey':
        return [
          '12 intensive daily sessions (3 hrs each)',
          'Complete mandala creation toolkit and sacred geometry guides',
          '8 finished mandalas for your portfolio',
          'Guided journaling practice integrated throughout',
          '2-month mentorship and lifetime alumni community'
        ]
      default:
        return []
    }
  }

  // Get syllabus
  const getSyllabus = (courseTitle: string) => {
    switch (courseTitle) {
      case 'Flower of Life Mastery':
        return [
          { icon: '🌀', text: 'Introduction to Vedic geometry & the Flower of Life' },
          { icon: '📐', text: 'Basic compass & proportion exercises' },
          { icon: '🔷', text: '2D pattern building and symmetry studies' },
          { icon: '🎯', text: '3D torus drawing fundamentals' },
          { icon: '🎨', text: 'Color, media, and mixed-technique experiments' },
          { icon: '🖼️', text: 'Composition & framing for exhibition' },
          { icon: '✨', text: 'Personal mandala project (work-in-progress critiques)' },
          { icon: '🏅', text: 'Finalization, documentation, and certificate' }
        ]
      case 'Sacred Torus Foundations':
        return [
          { icon: '∞', text: 'Introduction to torus geometry and historical significance' },
          { icon: '📐', text: 'Mathematical principles, proportions, and construction methods' },
          { icon: '📋', text: '50+ foundational drawing templates (single and nested tori)' },
          { icon: '🌐', text: '3D visualization and dimensional transitions' },
          { icon: '🎨', text: '50+ advanced templates and mixed-media experiments' },
          { icon: '📝', text: 'Complex compositions, layering, and journaling practice' },
          { icon: '✨', text: 'Personal torus series development (work-in-progress critiques)' },
          { icon: '🏆', text: 'Portfolio finalization, documentation, and exhibition' }
        ]
      case '8 Mandala Journey':
        return [
          { icon: '💡', text: 'Rapid ideation & conceptual frameworks for mandala design' },
          { icon: '⭐', text: 'Mandala structure: center, layers, symmetry, and balance principles' },
          { icon: '📐', text: 'Foundation drawing: compass work and geometric construction' },
          { icon: '🎨', text: 'Media exploration: ink, watercolor, colored pencils, mixed techniques' },
          { icon: '🌈', text: 'Layering, color theory, and expressive mark-making' },
          { icon: '📖', text: 'Journaling & intention-setting integrated with creation' },
          { icon: '✨', text: 'Curation and sequencing: preparing your 8-mandala series' },
          { icon: '🎭', text: 'Documentation, exhibition layout, and final presentations' }
        ]
      default:
        return []
    }
  }

  const currentCourse = courses.find(c => c.title === selectedCourse)

  return (
    <>
      {/* Courses Grid Section */}
      <div className="mb-20">
        <h3 className="text-2xl md:text-3xl font-black mb-12 text-gray-900 uppercase tracking-wide">Choose Your Course</h3>

        {/* Grid Layout - 3 columns desktop, 1 mobile, 2 tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.title}
              className="group relative bg-white backdrop-blur-sm rounded-2xl border-2 border-pink-300/50 hover:border-pink-400 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col h-full"
            >
              {/* Header with Icon Background */}
              <div className="h-32 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-pink-600/20 flex items-center justify-center">
                <div className="text-6xl opacity-80">🎨</div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Course Title */}
                <h4 className="text-xl font-black text-amber-700 uppercase tracking-wide mb-2 line-clamp-2">
                  {course.title}
                </h4>

                {/* Course Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                  {getCourseDescription(course.title)}
                </p>

                {/* Key Points */}
                <div className="mb-4 space-y-1">
                  {getCourseKeyPoints(course.title).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold text-lg flex-shrink-0">✓</span>
                      <span className="text-xs text-gray-600 font-semibold">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Course Meta - Duration, Level, Sessions */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-amber-50/40 rounded-lg border border-pink-300/30">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-sm font-black text-gray-900">{course.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Sessions</p>
                    <p className="text-sm font-black text-gray-900">{course.sessions}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Level</p>
                    <p className="text-sm font-black text-gray-900">{course.level}</p>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-4 p-3 bg-gradient-to-br from-yellow-50/60 to-orange-50/40 rounded-lg border border-pink-300/30">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">Early Bird Price</p>
                  <p className="text-3xl font-black text-amber-700 mb-2">₹{course.price_early.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 font-semibold">Regular: ₹{course.price_regular.toLocaleString()}</p>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link
                    href="/bookings"
                    className="bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-pink-600/50 transition-all duration-300 text-center"
                  >
                    Book Now
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course.title)}
                    className="bg-white border-2 border-amber-700 text-amber-700 px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-amber-50 transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Details Modal - Portal Style */}
      {selectedCourse && currentCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCourse(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header - Sticky */}
            <div className="sticky top-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 p-6 md:p-8 text-white flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wide mb-2">{selectedCourse}</h3>
                <p className="text-sm md:text-base font-semibold opacity-90">{getCourseDescription(selectedCourse)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="flex-shrink-0 text-white hover:opacity-75 transition hover:scale-110"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Course Info Grid */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Duration</p>
                  <p className="text-2xl font-black text-gray-900">{currentCourse.duration}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Sessions</p>
                  <p className="text-2xl font-black text-gray-900">{currentCourse.sessions}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Level</p>
                  <p className="text-2xl font-black text-gray-900">{currentCourse.level}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-widest mb-2">Early Bird</p>
                  <p className="text-2xl font-black text-red-700">₹{currentCourse.price_early.toLocaleString()}</p>
                </div>
              </div>

              {/* What You'll Get */}
              <div>
                <h4 className="text-2xl font-black text-amber-700 uppercase tracking-wide mb-4">What You'll Get</h4>
                <ul className="space-y-3">
                  {getWhatYouGet(selectedCourse).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-amber-700 font-bold text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Syllabus */}
              <div>
                <h4 className="text-2xl font-black text-amber-700 uppercase tracking-wide mb-4">Learning Syllabus</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {getSyllabus(selectedCourse).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50/50 transition">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-orange-50 border-2 border-pink-300/30 rounded-lg p-6">
                <h4 className="text-2xl font-black text-amber-700 uppercase tracking-wide mb-4">Why Choose This Course?</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-lg text-amber-700">⭐</span>
                    Learn from an expert with 10+ years of mastery
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg text-amber-700">⭐</span>
                    Create exhibition-ready artwork and build your portfolio
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg text-amber-700">⭐</span>
                    Access 3-month mentorship and lifetime alumni community
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg text-amber-700">⭐</span>
                    Master sacred geometry principles backed by science
                  </li>
                </ul>
              </div>

              {/* Close and Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-50 transition-all duration-300"
                >
                  Back to Courses
                </button>
                <Link
                  href="/bookings"
                  className="flex-1 bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-pink-600/50 transition-all duration-300 text-center"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bundle Offer Section */}
      <div className="mb-16">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-pink-300/50">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/80 via-orange-50/80 to-amber-50/80 backdrop-blur-sm"></div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-2xl"></div>

          {/* Content */}
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Section - Text */}
              <div className="flex-1 text-center md:text-left">
                {/* Badge */}
                <div className="inline-block mb-3 px-4 py-1 bg-yellow-400/30 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-widest text-amber-800 border border-amber-700/50">
                  🎁 Exclusive Bundle Deal
                </div>

                {/* Heading */}
                <h3 className="text-3xl md:text-4xl font-black mb-2 text-gray-900 uppercase tracking-tight">
                  Bundle All Three Courses
                </h3>

                {/* Subtext */}
                <p className="text-sm text-gray-700 font-semibold mb-4 opacity-90">Limited time offer - Save 30% when you bundle all three courses</p>

                {/* Benefits */}
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2 font-semibold">
                    <span className="text-lg text-yellow-600">✓</span>
                    Extended 6-month mentorship
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <span className="text-lg text-yellow-600">✓</span>
                    Premium materials kit included
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <span className="text-lg text-yellow-600">✓</span>
                    Access to all 3 exclusive alumni communities
                  </li>
                </ul>
              </div>

              {/* Right Section - Pricing & CTA */}
              <div className="flex-1 w-full md:w-auto">
                <div className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4 border border-pink-300/50">
                  {/* Pricing Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Bundle Price */}
                    <div className="text-center">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Bundle</p>
                      <p className="text-3xl font-black text-amber-700">₹38k</p>
                    </div>

                    {/* Regular Price */}
                    <div className="text-center">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Regular</p>
                      <p className="text-2xl font-black text-gray-500 line-through">₹54k</p>
                    </div>

                    {/* Savings */}
                    <div className="text-center bg-red-100/50 rounded-lg p-3 border border-red-300/70">
                      <p className="text-xs font-bold text-red-700 uppercase tracking-widest mb-1">Save</p>
                      <p className="text-2xl font-black text-red-700">₹16k</p>
                      <p className="text-xs text-red-700 font-bold mt-1">30%</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/bookings" className="block">
                    <button className="w-full bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-black uppercase tracking-widest text-base hover:shadow-lg hover:shadow-pink-600/50 transition-all duration-300 shadow-lg">
                      Enroll Bundle Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Add-On Section */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-yellow-400/15 to-yellow-300/5 border-2 border-pink-300/30 rounded-xl p-6">
          <h3 className="text-2xl md:text-3xl font-black mb-6 text-amber-700 uppercase tracking-wide text-center">
            Premium Add-On Available for All Courses
          </h3>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-2">🎨 Premium Art Kit Add-on</p>
              <p className="text-sm text-gray-700 mb-4">Professional-grade supplies & tools including premium brushes, quality papers, and specialty inks. Perfect complement to any course for enhanced artistic expression.</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-amber-700">₹3,000</span>
                <span className="text-sm text-gray-600 font-semibold">One-time fee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Go to Top Button - Fixed on right side */}
      {showGoToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed right-6 bottom-8 bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-pink-600/50 transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Go to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  )
}
