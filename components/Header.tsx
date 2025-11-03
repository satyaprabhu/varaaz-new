import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="text-xl font-black text-gray-900">V</span>
          </div>
          <span className="ml-2 text-lg font-bold text-gray-900">Varaaz</span>
        </Link>

        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/about" className="text-gray-700 hover:text-varaaz-primary transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/courses" className="text-gray-700 hover:text-varaaz-primary transition">
              Courses
            </Link>
          </li>
          <li>
            <Link href="/collection" className="text-gray-700 hover:text-varaaz-primary transition">
              Collection
            </Link>
          </li>
          <li>
            <Link href="/bookings" className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300">
              Book Session
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 hover:text-varaaz-primary transition">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
