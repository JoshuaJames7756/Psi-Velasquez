import { useState } from 'react'
import { useCitasAdmin } from '../../hooks/useCitasAdmin'
import FichaSolicitud from './FichaSolicitud'

const TABS = [
  { valor: 'pendiente', label: 'Pendientes' },
  { valor: 'confirmada', label: 'Confirmadas' },
  { valor: 'cancelada', label: 'Canceladas' },
]

function SeccionSolicitudes() {
  const [tab, setTab] = useState('pendiente')
  const { citas, cargando, actualizarEstado } = useCitasAdmin(tab)

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-sans-cuerpo)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--admin-texto)' }}>
        Solicitudes de cita
      </h2>

      <div
        style={{
          display: 'inline-flex',
          gap: '0.25rem',
          margin: '1.25rem 0',
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          borderRadius: '10px',
          padding: '0.25rem',
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.valor}
            onClick={() => setTab(t.valor)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '7px',
              background: tab === t.valor ? 'var(--admin-sidebar-bg)' : 'transparent',
              color: tab === t.valor ? '#FFFFFF' : 'var(--admin-texto-secundario)',
              fontFamily: 'var(--font-sans-cuerpo)',
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'var(--transition-rapida)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {cargando && <p style={{ color: 'var(--admin-texto-secundario)' }}>Cargando solicitudes…</p>}

      {!cargando && citas.length === 0 && (
        <p style={{ color: 'var(--admin-texto-secundario)' }}>No hay solicitudes en esta categoría.</p>
      )}

      {citas.map((cita) => (
        <FichaSolicitud key={cita.id} cita={cita} onActualizar={actualizarEstado} />
      ))}
    </div>
  )
}

export default SeccionSolicitudes
