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
      className="perspective w-full h-56 sm:h-64 cursor-pointer card-hover"
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
        {/* Back face (face-down / decorative) */}
        <div className="flip-card-front card-back-pattern flex items-center justify-center shadow-xl shadow-purple-900/30">
          <div className="relative z-10 flex flex-col items-center gap-1">
            <span className="text-4xl sm:text-5xl select-none drop-shadow-lg">🎉</span>
            <span className="font-display text-white/80 text-xs font-bold tracking-widest uppercase mt-1">PartyQs</span>
          </div>
        </div>

        {/* Front face (question text) */}
        <div className="flip-card-back card-front-face flex items-center justify-center shadow-xl shadow-purple-900/20 p-5">
          <p className="relative z-10 text-center text-sm sm:text-base font-semibold leading-relaxed text-party-deep-purple">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
