import { useState } from 'react'
import { useBloqueos } from '../../hooks/useBloqueos'

function SeccionAgenda() {
  const { bloqueos, cargando, agregarBloqueo, quitarBloqueo } = useBloqueos()
  const [fecha, setFecha] = useState('')
  const [motivo, setMotivo] = useState('')
  const [guardando, setGuardando] = useState(false)

  const handleAgregar = async (e) => {
    e.preventDefault()
    if (!fecha) return
    setGuardando(true)
    const ok = await agregarBloqueo(fecha, motivo)
    if (ok) {
      setFecha('')
      setMotivo('')
    }
    setGuardando(false)
  }

  return (
    <div>
      <h1>Agenda y bloqueos</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Bloquea días completos en los que no atenderás (vacaciones, imprevistos). Esos días
        no aparecerán como disponibles en el sitio.
      </p>

      <form
        onSubmit={handleAgregar}
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          background: 'var(--color-fondo-crema)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', marginBottom: '0.4rem' }}>Fecha</label>
          <input
            type="date"
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', marginBottom: '0.4rem' }}>Motivo (opcional)</label>
          <input
            type="text"
            placeholder="Ej. Vacaciones"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
          />
        </div>
        <button type="submit" disabled={guardando} className="btn btn-primario" style={{ padding: '0.55rem 1.2rem' }}>
          Bloquear día
        </button>
      </form>

      {cargando && <p>Cargando…</p>}
      {!cargando && bloqueos.length === 0 && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>No tienes días bloqueados próximamente.</p>
      )}

      {bloqueos.map((b) => (
        <div
          key={b.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            border: '1px solid var(--color-sage-medio)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '0.5rem',
          }}
        >
          <span>
            <strong>{b.fecha}</strong>
            {b.motivo && ` — ${b.motivo}`}
          </span>
          <button
            onClick={() => quitarBloqueo(b.id)}
            style={{ fontSize: 'var(--fs-small)', color: 'var(--color-error)', textDecoration: 'underline' }}
          >
            Quitar bloqueo
          </button>
        </div>
      ))}
    </div>
  )
}

export default SeccionAgenda
