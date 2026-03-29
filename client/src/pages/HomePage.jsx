import { useState } from 'react'
import CategorySelector from '../components/CategorySelector.jsx'

export default function HomePage() {
  const [selected, setSelected] = useState(null)

  return (
    <main className="min-h-screen bg-party-home relative overflow-hidden flex flex-col items-center justify-center px-4 py-12">
      {/* Decorative floating orbs */}
      <div className="floating-orb w-72 h-72 bg-pink-500 top-10 -left-20" />
      <div className="floating-orb w-96 h-96 bg-blue-500 -bottom-20 -right-20" style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-48 h-48 bg-purple-400 top-1/3 right-10" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl sm:text-6xl" role="img" aria-label="Party">🎉</span>
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          Questions<span className="text-shimmer">Game</span>
        </h1>
        <p className="text-white/70 text-lg sm:text-xl font-medium max-w-md mx-auto">
          Pick a vibe and start the conversation
        </p>
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <CategorySelector selected={selected} onSelect={setSelected} />
      </div>

      {/* Bottom decorative element */}
      <div className="relative z-10 mt-16 text-white/30 text-sm font-medium tracking-widest uppercase">
        Tap a category to play ✨
      </div>
    </main>
  )
}
