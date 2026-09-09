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
      <h1>Solicitudes de cita</h1>

      <div style={{ display: 'flex', gap: '0.5rem', margin: '1.5rem 0' }}>
        {TABS.map((t) => (
          <button
            key={t.valor}
            onClick={() => setTab(t.valor)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: tab === t.valor ? 'var(--color-texto-principal)' : 'var(--color-sage-medio)',
              color: tab === t.valor ? 'var(--color-fondo-crema)' : 'var(--color-texto-principal)',
              fontSize: 'var(--fs-small)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {cargando && <p>Cargando solicitudes…</p>}

      {!cargando && citas.length === 0 && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>No hay solicitudes en esta categoría.</p>
      )}

      {citas.map((cita) => (
        <FichaSolicitud key={cita.id} cita={cita} onActualizar={actualizarEstado} />
      ))}
    </div>
  )
}

export default SeccionSolicitudes
