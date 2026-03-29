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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        {category && (
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
            {category}
          </h2>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent" />
          </div>
        )}

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4"
            role="alert"
          >
            <p className="font-medium">Error loading questions</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && questions.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No questions found for this category.
          </p>
        )}

        {!loading && !error && questions.length > 0 && (
          <>
            <CardGrid
              questions={questions}
              flippedCards={flippedCards}
              onFlip={handleFlip}
            />
            <div className="flex justify-center mt-6">
              <ResetButton onReset={handleReset} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
