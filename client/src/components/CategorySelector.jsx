import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  {
    value: 'couples',
    label: 'Couples',
    emoji: '💑',
    gradient: 'from-pink-500 to-rose-600',
    shadow: 'shadow-pink-500/40',
    ring: 'ring-pink-400',
  },
  {
    value: 'friends',
    label: 'Friends',
    emoji: '👫',
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/40',
    ring: 'ring-blue-400',
  },
  {
    value: 'family',
    label: 'Family',
    emoji: '👨\u200d👩\u200d👧',
    gradient: 'from-amber-400 to-orange-500',
    shadow: 'shadow-orange-500/40',
    ring: 'ring-orange-400',
  },
]

export default function CategorySelector({ selected, onSelect }) {
  const navigate = useNavigate()

  const handleSelect = useCallback(
    (category) => {
      onSelect(category)
      navigate(`/game?category=${category}`)
    },
    [onSelect, navigate],
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full max-w-2xl">
      {CATEGORIES.map(({ value, label, emoji, gradient, shadow, ring }) => (
        <button
          key={value}
          onClick={() => handleSelect(value)}
          className={`category-btn group relative flex flex-col items-center gap-3 px-6 py-8 sm:py-10 rounded-2xl font-display text-white font-bold text-lg shadow-xl ${shadow} bg-gradient-to-br ${gradient} focus:outline-none focus:ring-4 ${ring} focus:ring-offset-2 focus:ring-offset-party-deep-purple ${
            selected === value
              ? 'ring-4 ' + ring + ' scale-105'
              : ''
          }`}
          aria-pressed={selected === value}
        >
          <span className="text-5xl sm:text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {emoji}
          </span>
          <span className="text-xl tracking-wide">{label}</span>
          {selected === value && (
            <span className="absolute -top-2 -right-2 bg-white text-party-purple rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg">
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
