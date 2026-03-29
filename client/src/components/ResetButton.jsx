export default function ResetButton({ onReset }) {
  return (
    <button
      onClick={onReset}
      className="px-6 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Reset Cards
    </button>
  )
}
