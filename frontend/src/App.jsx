import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Results from './pages/Results'
import Roster from './pages/Roster'
import Contact from './pages/Contact'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/results" element={<Results />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
