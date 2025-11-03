import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-16 relative z-10 border-t border-pink-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Varaaz Brand Section */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent font-black mb-6 text-lg uppercase tracking-tight">Varaaz</h3>
            <p className="text-xs text-gray-700 leading-relaxed pr-4 font-medium">
              Master sacred geometry and mandala creation through the principles of Vedic science. Practice through immersive, hands-on learning.
            </p>
          </div>

          {/* Explore Section */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent font-black mb-6 uppercase tracking-wider text-xs">Explore</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/courses" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  Book Session
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent font-black mb-6 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent font-black mb-6 uppercase tracking-wider text-xs">Connect</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="#" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-amber-700 transition-colors duration-300 inline-block font-semibold">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pink-300/30 my-8"></div>

        {/* Footer Bottom */}
        <div className="text-center text-xs text-gray-700 font-medium">
          <p>&copy; 2024 Varaaz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
