import Card from './Card.jsx'

export default function CardGrid({ questions, flippedCards, onFlip }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {questions.map((q) => (
        <Card
          key={q.id}
          id={q.id}
          text={q.text}
          isFlipped={flippedCards.has(q.id)}
          onFlip={onFlip}
        />
      ))}
    </div>
  )
}
