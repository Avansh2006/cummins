import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './coponents/navbar'
import TravelPage from './coponents/comp1'
import { Router, Routes, Route } from 'react-router-dom'
import Home from './coponents/home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<TravelPage />} />
        <Route path="/about" element={<TravelPage />} />
        <Route path="/contact" element={<TravelPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
