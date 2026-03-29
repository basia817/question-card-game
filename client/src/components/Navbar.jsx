import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Question Card Game</h1>
        <Link
          to="/"
          className="text-sm font-medium px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          ← Home
        </Link>
      </div>
    </nav>
  )
}
