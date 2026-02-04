import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Hero, About, Achievements, Prestasi, Aktivitas, Features, Team, VisiMisi, FAQ, CTA, Footer } from './components'
import { EventDetailPage } from './pages/EventDetailPage'
import { PrestasiPage } from './pages/PrestasiPage'
import { AktivitasDetailPage } from './pages/AktivitasDetailPage'
import './index.css'

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] overflow-x-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Achievements />
      <Prestasi />
      <Aktivitas />
      <Features />
      <Team />
      <VisiMisi />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:slug" element={<EventDetailPage />} />
        <Route path="/prestasi" element={<PrestasiPage />} />
        <Route path="/aktivitas/:slug" element={<AktivitasDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
