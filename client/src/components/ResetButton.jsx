export default function ResetButton({ onReset }) {
  return (
    <button
      onClick={onReset}
      className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-party-pink to-party-purple text-white font-display font-bold rounded-full shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-900/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:ring-offset-2 focus:ring-offset-party-deep-blue"
    >
      <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span>
      Shuffle & Reset
    </button>
  )
}
