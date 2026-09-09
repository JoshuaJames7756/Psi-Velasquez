import { NavLink } from 'react-router-dom'

const secciones = [
  { to: '/admin', label: 'Solicitudes de cita', end: true },
  { to: '/admin/agenda', label: 'Agenda y bloqueos' },
  { to: '/admin/formulario', label: 'Formulario de admisión' },
  { to: '/admin/videos', label: 'Videos' },
]

function AdminLayout({ children }) {
  return (
    <div className="contenedor seccion" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem' }}>
      <nav>
        <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-texto-secundario)', marginBottom: '0.75rem' }}>
          PANEL DE REBECA
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {secciones.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              style={({ isActive }) => ({
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'var(--color-cta)' : 'transparent',
                color: isActive ? 'var(--color-cta-texto)' : 'var(--color-texto-principal)',
              })}
            >
              {s.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default AdminLayout
