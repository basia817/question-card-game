import { useCallback } from 'react'

export default function Card({ id, text, isFlipped, onFlip }) {
  const handleFlip = useCallback(() => {
    onFlip(id)
  }, [id, onFlip])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onFlip(id)
      }
    },
    [id, onFlip],
  )

  return (
    <div
      className="perspective w-full h-48 sm:h-56 cursor-pointer"
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={
        isFlipped
          ? `Question card: ${text}`
          : 'Question card, press to reveal'
      }
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front face (face-down) */}
        <div className="flip-card-front flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg">
          <span className="text-4xl select-none">?</span>
        </div>

        {/* Back face (question text) */}
        <div className="flip-card-back flex items-center justify-center bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 p-4">
          <p className="text-center text-sm sm:text-base font-medium leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
