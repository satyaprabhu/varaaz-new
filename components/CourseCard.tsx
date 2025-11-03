import Link from 'next/link'

interface CourseData {
  slug: string
  title: string
  description: string
  price: number
  duration: string
  level: string
}

export default function CourseCard({ course }: { course: CourseData }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition border border-pink-300/50">
      <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 h-40"></div>

      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full font-semibold">
            {course.level}
          </span>
          <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
            {course.duration}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-amber-700">
              ₹{course.price}
            </p>
            <p className="text-xs text-gray-500">One-time payment</p>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-pink-600/50 transition text-sm font-semibold"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
