import { useState } from 'react'
import './App.css'
import Navbar from './coponents/navbar'
import {Routes, Route } from 'react-router-dom'
import Home from './coponents/home'
import BlogWritingPage from './coponents/blog'
import SubscriptionPage from './coponents/subscription'
import PaymentForm from './coponents/Payment'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Navbar />
      <div className='h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BlogWritingPage" element={<BlogWritingPage />} />
        <Route path="/SubscriptionPage" element={<SubscriptionPage />} />
        <Route path="/PaymentForm" element={<PaymentForm />} />
      </Routes>
      </div>
    
    </>
  )
}

export default App
