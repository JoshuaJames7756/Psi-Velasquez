import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { perfil } from '../../data/contenido'
import Icono from '../ui/Icono'

const enlaces = [
  { to: '/', label: 'Inicio' },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/especialidades', label: 'Especialidades' },
  { to: '/videos', label: 'Videos' },
  { to: '/contacto', label: 'Contacto' },
]

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="contenedor header-wrapper">
        {/* Brand / Logo */}
        <Link to="/" className="brand-logo">
          {perfil.nombre}
        </Link>

        {/* Nav desktop pill */}
        <nav className="nav-desktop">
          {enlaces.map((e) => {
            const isActive = location.pathname === e.to
            return (
              <Link 
                key={e.to} 
                to={e.to} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {e.label}
              </Link>
            )
          })}
        </nav>

        {/* Botón CTA desktop */}
        <div className="nav-desktop">
          <Link to="/reservar-cita" className="btn btn-primario btn-nav">
            Reservar Cita
          </Link>
        </div>

        {/* Botón hamburguesa mobile (SIN style inline de display) */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} size={24} />
        </button>
      </div>

      {/* Menú desplegable mobile */}
      {menuAbierto && (
        <div className="mobile-menu-overlay">
          <nav className="contenedor mobile-menu-content">
            {enlaces.map((e) => (
              <Link 
                key={e.to} 
                to={e.to} 
                className="mobile-link"
                onClick={() => setMenuAbierto(false)}
              >
                {e.label}
              </Link>
            ))}
            <Link 
              to="/reservar-cita" 
              className="btn btn-primario" 
              onClick={() => setMenuAbierto(false)}
              style={{ marginTop: '0.5rem', textAlign: 'center' }}
            >
              Reservar Cita
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header