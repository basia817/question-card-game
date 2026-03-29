import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-party-deep-purple via-party-purple to-party-hot-pink text-white shadow-lg shadow-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl" role="img" aria-label="Party">🎉</span>
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
            Party<span className="text-party-yellow">Qs</span>
          </h1>
        </Link>
        <Link
          to="/"
          className="text-sm font-semibold px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          ← Categories
        </Link>
      </div>
    </nav>
  )
}
