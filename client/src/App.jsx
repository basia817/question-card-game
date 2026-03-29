import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import GamePage from './pages/GamePage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  )
}

export default App
