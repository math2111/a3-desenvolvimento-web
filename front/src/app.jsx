import { useState } from 'react'
import './app.css'
import { Outlet, Link, useLocation } from 'react-router-dom'

export function App() {
  const { pathname } = useLocation()

  const [selectedTab, setSelectedTab] = useState(pathname)

  return (
    <div>
      <header>
        <h1>HELP-RS</h1>
        <nav>
          <Link onClick={() => setSelectedTab('/')} className={selectedTab === '/' ? 'active-tab' : ''} to="/">Alertas</Link>
          <Link onClick={() => setSelectedTab('/map')} className={selectedTab === '/map' ? 'active-tab' : ''} to="/map">Abrigos</Link>
          <Link onClick={() => setSelectedTab('/how-to-help')} className={selectedTab === '/how-to-help' ? 'active-tab' : ''} to="/how-to-help">Como ajudar</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
