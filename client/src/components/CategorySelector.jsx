import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { value: 'couples', label: 'Couples' },
  { value: 'friends', label: 'Friends' },
  { value: 'family', label: 'Family' },
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
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleSelect(value)}
          className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            selected === value
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-400 hover:shadow-md'
          }`}
          aria-pressed={selected === value}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
