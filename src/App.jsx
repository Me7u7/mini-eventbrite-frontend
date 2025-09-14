import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Scan from './pages/Scan'
import CreateEvent from './pages/CreateEvent'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import useAuth from './hooks/useAuth'
import useLastVisited from './hooks/useLastVisited'

function App() {
  const [count, setCount] = useState(0)
  const { isAuthenticated, user } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { setLastPath, getLastPath } = useLastVisited()

  useEffect(() => {
    setLastPath(pathname)
  }, [pathname, setLastPath])

  useEffect(() => {
    if (window.location.pathname === '/') {
      const last = getLastPath()
      if (last && isAuthenticated() && last !== '/') {
        navigate(last, { replace: true })
      }
    }
  }, [isAuthenticated, getLastPath, navigate])

  const hasRole = (...roles) => roles.includes(user?.role)

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>

      <main className="container-app py-8">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:id' element={<EventDetail />} />
          <Route 
            path='/events/new' 
            element={
              <ProtectedRoute>
                {hasRole('organizer','admin') ? <CreateEvent /> : <NotFound />}
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/scan' 
            element={
              <ProtectedRoute>
                {hasRole('organizer','admin','staff') ? <Scan /> : <NotFound />}
              </ProtectedRoute>
            } 
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
