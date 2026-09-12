import { useState } from 'react'
import { especialidades } from '../../data/contenido'

const ESTADO_ESTILO = {
  pendiente: { bg: '#FBF3E3', color: '#8A6D1E', label: 'Pendiente de revisión' },
  confirmada: { bg: '#E8F1E6', color: '#4A7A44', label: 'Confirmada' },
  cancelada: { bg: '#FBEAE5', color: '#B4503A', label: 'Cancelada' },
}

function nombreMotivo(id) {
  return especialidades.find((e) => e.id === id)?.nombre || id || 'No especificado'
}

function FichaSolicitud({ cita, onActualizar }) {
  const [expandido, setExpandido] = useState(false)
  const [notaAdmin, setNotaAdmin] = useState(cita.nota_admin || '')
  const [procesando, setProcesando] = useState(false)

  const estilo = ESTADO_ESTILO[cita.estado] || ESTADO_ESTILO.pendiente
  const respuestas = cita.respuestas_formulario || {}
  const tieneRespuestas = Object.keys(respuestas).length > 0

  const ejecutar = async (nuevoEstado) => {
    setProcesando(true)
    await onActualizar(cita.id, nuevoEstado, notaAdmin)
    setProcesando(false)
  }

  return (
    <div
      style={{
        background: 'var(--admin-card-bg)',
        border: '1px solid var(--admin-border)',
        borderRadius: '14px',
        padding: '1.25rem',
        marginBottom: '1rem',
        transition: 'var(--transition-rapida)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans-cuerpo)', fontSize: '1rem', fontWeight: 600, color: 'var(--admin-texto)' }}>
            {cita.nombre_paciente}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--admin-texto-secundario)', marginTop: '0.2rem' }}>
            {cita.fecha} · {String(cita.hora).slice(0, 5)} · {nombreMotivo(cita.motivo)}
            {cita.primera_vez && ' · Primera vez'}
          </p>
        </div>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '0.3rem 0.7rem',
            borderRadius: '20px',
            background: estilo.bg,
            color: estilo.color,
            whiteSpace: 'nowrap',
          }}
        >
          {estilo.label}
        </span>
      </div>

      <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--admin-texto-secundario)', display: 'flex', gap: '1.5rem' }}>
        <span>Tel: {cita.telefono}</span>
        {cita.email && <span>Email: {cita.email}</span>}
      </div>

      {tieneRespuestas && (
        <button
          onClick={() => setExpandido(!expandido)}
          style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-cta-hover)', fontWeight: 500 }}
        >
          {expandido ? 'Ocultar respuestas del formulario' : 'Ver respuestas del formulario'}
        </button>
      )}

      {expandido && tieneRespuestas && (
        <div style={{ marginTop: '0.75rem', background: 'var(--admin-bg)', padding: '1rem', borderRadius: '10px' }}>
          {Object.entries(respuestas).map(([clave, valor]) => (
            <div key={clave} style={{ marginBottom: '0.6rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--admin-texto)', textTransform: 'capitalize' }}>
                {clave.replace(/_/g, ' ')}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--admin-texto-secundario)' }}>{valor || '—'}</p>
            </div>
          ))}
        </div>
      )}

      {cita.estado === 'pendiente' && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--admin-border)', paddingTop: '1rem' }}>
          <textarea
            placeholder="Nota opcional para el paciente (ej. proponer otro horario)…"
            value={notaAdmin}
            onChange={(e) => setNotaAdmin(e.target.value)}
            rows={2}
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: '8px',
              border: '1.5px solid var(--admin-border)',
              fontFamily: 'var(--font-sans-cuerpo)',
              fontSize: '0.85rem',
              marginBottom: '0.75rem',
              background: 'var(--admin-bg)',
              color: 'var(--admin-texto)',
            }}
          />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => ejecutar('confirmada')}
              disabled={procesando}
              className="btn btn-primario"
              style={{ padding: '0.5rem 1.2rem' }}
            >
              Confirmar cita
            </button>
            <button
              onClick={() => ejecutar('cancelada')}
              disabled={procesando}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--admin-border)',
                color: 'var(--admin-texto-secundario)',
                fontSize: '0.9rem',
              }}
            >
              No puedo atender / cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FichaSolicitud
