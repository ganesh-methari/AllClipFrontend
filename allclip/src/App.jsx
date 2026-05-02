import React from 'react'
import Navbar from './Navbar'
import Hero from './Home/Hero'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
    </BrowserRouter>
  )
}

export default App;