import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">JC</div>
          <div className="logo-text">
            <span className="logo-title">Jones County</span>
            <span className="logo-subtitle">Cross Country</span>
          </div>
        </Link>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/schedule" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Schedule
          </NavLink>
          <NavLink to="/results" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Results
          </NavLink>
          <NavLink to="/roster" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Roster
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
