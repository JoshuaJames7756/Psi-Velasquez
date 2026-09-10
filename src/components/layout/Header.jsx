import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { perfil } from '../../data/contenido'

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const toggleMenu = () => setMenuAbierto(!menuAbierto)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className="site-header">
      <div className="contenedor header-wrapper">
        <Link to="/" className="brand-logo" onClick={cerrarMenu}>
          {perfil.nombre}
        </Link>

        {/* Navegación Desktop */}
        <nav className="nav-desktop">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
          <NavLink to="/sobre-mi" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Sobre mí</NavLink>
          <NavLink to="/especialidades" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Especialidades</NavLink>
          <NavLink to="/videos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Videos</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contacto</NavLink>
        </nav>

        {/* Botón Hamburguesa / X con texto simple y claro para evitar fallos de iconos */}
        <button 
          className="nav-mobile-toggle" 
          onClick={toggleMenu}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú Móvil Desplegable */}
      {menuAbierto && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-menu-content contenedor">
            <NavLink to="/" className="mobile-link" onClick={cerrarMenu}>Inicio</NavLink>
            <NavLink to="/sobre-mi" className="mobile-link" onClick={cerrarMenu}>Sobre mí</NavLink>
            <NavLink to="/especialidades" className="mobile-link" onClick={cerrarMenu}>Especialidades</NavLink>
            <NavLink to="/videos" className="mobile-link" onClick={cerrarMenu}>Videos</NavLink>
            <NavLink to="/contacto" className="mobile-link" onClick={cerrarMenu}>Contacto</NavLink>
            <Link to="/reservar-cita" className="btn btn-primario" style={{ marginTop: '0.5rem' }} onClick={cerrarMenu}>
              Reservar Cita
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}