import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchQuestions } from '../services/api.js'
import Navbar from '../components/Navbar.jsx'
import CardGrid from '../components/CardGrid.jsx'
import ResetButton from '../components/ResetButton.jsx'

export default function GamePage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')

  const [questions, setQuestions] = useState([])
  const [flippedCards, setFlippedCards] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const loadQuestions = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchQuestions(category)
        if (!cancelled) {
          setQuestions(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadQuestions()

    return () => {
      cancelled = true
    }
  }, [category])

  const handleFlip = useCallback((id) => {
    setFlippedCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleReset = useCallback(() => {
    setFlippedCards(new Set())
  }, [])

  const CATEGORY_META = {
    couples: { emoji: '💑', label: 'Couples' },
    friends: { emoji: '👫', label: 'Friends' },
    family: { emoji: '👨\u200d👩\u200d👧', label: 'Family' },
  }

  const meta = CATEGORY_META[category] || { emoji: '🎴', label: category }

  return (
    <div className="min-h-screen bg-party relative">
      {/* Decorative background orbs */}
      <div className="floating-orb w-64 h-64 bg-pink-500 top-20 -left-16" />
      <div className="floating-orb w-80 h-80 bg-blue-500 bottom-10 -right-16" style={{ animationDelay: '3s' }} />

      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {category && (
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <span className="text-3xl sm:text-4xl">{meta.emoji}</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
              {meta.label}
            </h2>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-white/20 border-t-party-pink" />
              <span className="absolute inset-0 flex items-center justify-center text-xl">🎉</span>
            </div>
            <p className="text-white/60 font-medium animate-pulse">Shuffling cards…</p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-white rounded-2xl p-5 mb-6 max-w-lg mx-auto"
            role="alert"
          >
            <p className="font-display font-bold text-lg mb-1">⚠️ Oops!</p>
            <p className="text-white/80 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && questions.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">😔</span>
            <p className="text-white/60 text-lg font-medium">
              No questions found for this category.
            </p>
          </div>
        )}

        {!loading && !error && questions.length > 0 && (
          <>
            <CardGrid
              questions={questions}
              flippedCards={flippedCards}
              onFlip={handleFlip}
            />
            <div className="flex justify-center mt-8 sm:mt-10">
              <ResetButton onReset={handleReset} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
