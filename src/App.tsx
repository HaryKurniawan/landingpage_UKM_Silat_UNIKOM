import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Hero, About, Achievements, Prestasi, Aktivitas, Features, Team, VisiMisi, FAQ, CTA, Footer } from './components'
import { EventDetailPage } from './pages/EventDetailPage'
import { PrestasiPage as PublicPrestasiPage } from './pages/PrestasiPage'
import { AktivitasDetailPage } from './pages/AktivitasDetailPage'
import { Login } from './pages/admin/Login'
import { AdminLayout } from './pages/admin/DashboardLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PengurusPage } from './pages/admin/halaman/PengurusPage'
import { AktivitasPage as AdminAktivitasPage } from './pages/admin/halaman/AktivitasPage'
import { EventsPage as AdminEventsPage } from './pages/admin/halaman/EventsPage'
import { PrestasiPage as AdminPrestasiPage } from './pages/admin/halaman/PrestasiPage'
import { SettingsPage } from './pages/admin/halaman/SettingsPage'
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
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:slug" element={<EventDetailPage />} />
        <Route path="/prestasi" element={<PublicPrestasiPage />} />
        <Route path="/aktivitas/:slug" element={<AktivitasDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<PengurusPage />} /> {/* Default to Pengurus or redirect */}
            <Route path="pengurus" element={<PengurusPage />} />
            <Route path="aktivitas" element={<AdminAktivitasPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="prestasi" element={<AdminPrestasiPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
