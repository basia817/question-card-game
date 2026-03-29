import { useState } from 'react'
import CategorySelector from '../components/CategorySelector.jsx'

export default function HomePage() {
  const [selected, setSelected] = useState(null)

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Question Card Game
        </h1>
        <p className="text-gray-500 text-lg">
          Choose a category to get started
        </p>
      </div>
      <CategorySelector selected={selected} onSelect={setSelected} />
    </main>
  )
}
