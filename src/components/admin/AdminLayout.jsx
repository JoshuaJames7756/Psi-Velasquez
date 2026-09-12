import { NavLink } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import Icono from '../ui/Icono'
import { perfil } from '../../data/contenido'

const secciones = [
  { to: '/admin', label: 'Solicitudes', icono: 'check', end: true },
  { to: '/admin/agenda', label: 'Agenda y bloqueos', icono: 'calendario' },
  { to: '/admin/formulario', label: 'Formulario', icono: 'menu' },
  { to: '/admin/videos', label: 'Videos', icono: 'instagram' },
]

function AdminLayout({ children }) {
  return (
    <div
      className="admin-layout"
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        minHeight: '100vh',
        background: 'var(--admin-bg)',
      }}
    >
      <aside
        className="admin-sidebar"
        style={{
          background: 'var(--admin-sidebar-bg)',
          padding: '1.75rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p
          className="admin-sidebar-label"
          style={{
            fontFamily: 'var(--font-sans-cuerpo)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            color: '#7A7F78',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          Panel de Rebeca
        </p>

        <nav className="admin-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
          {secciones.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              className="admin-nav-link"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.65rem 0.8rem',
                borderRadius: '10px',
                background: isActive ? 'var(--color-cta)' : 'transparent',
                color: isActive ? 'var(--color-cta-texto)' : 'var(--admin-sidebar-texto)',
                fontFamily: 'var(--font-sans-cuerpo)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                transition: 'var(--transition-rapida)',
              })}
            >
              <Icono nombre={s.icono} size={18} />
              <span className="admin-nav-label">{s.label}</span>
            </NavLink>
          ))}
        </nav>

        <div
          className="admin-user-block"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <UserButton afterSignOutUrl="/" />
          <div className="admin-user-nombre" style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-sans-cuerpo)', fontSize: '0.85rem', color: 'var(--admin-sidebar-texto)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {perfil.nombre}
            </p>
          </div>
        </div>
      </aside>

      <main className="admin-main" style={{ padding: '2.5rem', minWidth: 0 }}>{children}</main>
    </div>
  )
}

export default AdminLayout
