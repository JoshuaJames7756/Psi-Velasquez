import { useDisponibilidad } from '../../hooks/useDisponibilidad'

const MENSAJES_MOTIVO = {
  dia_bloqueado: 'Este día no está disponible para citas.',
  sin_atencion_ese_dia: 'No hay atención programada este día.',
  error: 'No pudimos cargar los horarios. Intenta de nuevo.',
}

function SelectorHora({ fecha, horaSeleccionada, onSeleccionarHora }) {
  const { slots, disponible, motivo, cargando } = useDisponibilidad(fecha)

  if (!fecha) return null

  if (cargando) {
    return <p style={{ marginTop: '1.5rem' }}>Consultando horarios disponibles…</p>
  }

  if (!disponible) {
    return (
      <p style={{ marginTop: '1.5rem', color: 'var(--color-error)' }}>
        {MENSAJES_MOTIVO[motivo] || 'No hay horarios disponibles ese día.'} Prueba con otra fecha.
      </p>
    )
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Horarios disponibles</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))', gap: '0.6rem' }}>
        {slots.map((hora) => {
          const seleccionado = hora === horaSeleccionada
          return (
            <button
              key={hora}
              onClick={() => onSeleccionarHora(hora)}
              style={{
                padding: '0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: `1.5px solid ${seleccionado ? 'var(--color-cta)' : 'var(--color-sage-medio)'}`,
                background: seleccionado ? 'var(--color-cta)' : 'transparent',
                color: seleccionado ? 'var(--color-cta-texto)' : 'var(--color-texto-principal)',
                transition: 'var(--transition-rapida)',
              }}
            >
              {hora}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SelectorHora
