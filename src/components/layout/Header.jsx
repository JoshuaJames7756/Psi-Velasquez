import { useState } from 'react'
import { Link } from 'react-router-dom'
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

  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-sage-medio)',
        position: 'sticky',
        top: 0,
        background: 'var(--color-fondo-crema)',
        zIndex: 50,
      }}
    >
      <div
        className="contenedor"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 'var(--header-height)',
        }}
      >
        <Link to="/" style={{ fontFamily: 'var(--font-serif-titulos)', fontSize: '1.4rem' }}>
          {perfil.nombre}
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: 'flex', gap: '1.5rem' }} className="nav-desktop">
          {enlaces.map((e) => (
            <Link key={e.to} to={e.to}>
              {e.label}
            </Link>
          ))}
        </nav>

        <Link to="/reservar-cita" className="btn btn-primario nav-desktop">
          Reservar Cita
        </Link>

        {/* Botón hamburguesa mobile */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} size={24} />
        </button>
      </div>

      {/* Menú mobile */}
      {menuAbierto && (
        <nav
          className="contenedor"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1.5rem' }}
        >
          {enlaces.map((e) => (
            <Link key={e.to} to={e.to} onClick={() => setMenuAbierto(false)}>
              {e.label}
            </Link>
          ))}
          <Link to="/reservar-cita" className="btn btn-primario" onClick={() => setMenuAbierto(false)}>
            Reservar Cita
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
