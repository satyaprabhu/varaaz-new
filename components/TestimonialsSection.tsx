'use client'

interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'The Flower of Life course transformed my understanding of sacred geometry. I now see the universe in a completely different way. Truly life-changing!',
    author: 'Priya Sharma',
    title: 'Art Therapist & Student',
    rating: 5
  },
  {
    id: '2',
    quote: 'Varalakshmi\'s teaching methodology is unparalleled. Her blend of Vedic science with practical mandala creation is the most comprehensive approach I\'ve encountered.',
    author: 'Rajesh Kumar',
    title: 'Mindfulness Practitioner',
    rating: 5
  },
  {
    id: '3',
    quote: 'The 8 Mandala Journey was intense, rewarding, and deeply transformative. I\'ve gained not just artistic skills but spiritual insight. Highly recommended!',
    author: 'Ananya Patel',
    title: 'Graphic Designer & Seeker',
    rating: 5
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-white via-yellow-50/30 to-white relative z-10 overflow-hidden">
      {/* Floating blob decorations */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-yellow-100/10 to-yellow-50/5 blob pointer-events-none" style={{borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', animationDelay: '1s'}}></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-yellow-100/10 to-yellow-50/5 blob pointer-events-none" style={{borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', animationDelay: '3s'}}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold tracking-widest text-amber-700 uppercase">
            Student Stories
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight text-gray-900">
            Transform Your<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent"> Consciousness</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students and seekers who have embarked on their transformative journey with Varaaz.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl blur-xl"></div>

              {/* Card */}
              <div className="relative bg-white border border-yellow-200 group-hover:border-pink-400 rounded-2xl p-8 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md">
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-600 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="pt-6 border-t border-yellow-200">
                  <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-700 mb-6 text-lg">Ready to start your transformation?</p>
          <a href="/bookings" className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:shadow-2xl transition-all duration-300">
            Book Your Session Today
          </a>
        </div>
      </div>
    </section>
  )
}
