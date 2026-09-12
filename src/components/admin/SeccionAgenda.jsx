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
      <h2 style={{ fontFamily: 'var(--font-sans-cuerpo)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--admin-texto)' }}>
        Agenda y bloqueos
      </h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--admin-texto-secundario)', fontSize: '0.9rem' }}>
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
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          padding: '1.25rem',
          borderRadius: '14px',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--admin-texto-secundario)', marginBottom: '0.4rem' }}>Fecha</label>
          <input
            type="date"
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', border: '1.5px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-texto)' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--admin-texto-secundario)', marginBottom: '0.4rem' }}>Motivo (opcional)</label>
          <input
            type="text"
            placeholder="Ej. Vacaciones"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1.5px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-texto)' }}
          />
        </div>
        <button type="submit" disabled={guardando} className="btn btn-primario" style={{ padding: '0.55rem 1.2rem' }}>
          Bloquear día
        </button>
      </form>

      {cargando && <p style={{ color: 'var(--admin-texto-secundario)' }}>Cargando…</p>}
      {!cargando && bloqueos.length === 0 && (
        <p style={{ color: 'var(--admin-texto-secundario)' }}>No tienes días bloqueados próximamente.</p>
      )}

      {bloqueos.map((b) => (
        <div
          key={b.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.85rem 1.1rem',
            background: 'var(--admin-card-bg)',
            border: '1px solid var(--admin-border)',
            borderRadius: '10px',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--admin-texto)', fontSize: '0.9rem' }}>
            <strong>{b.fecha}</strong>
            {b.motivo && ` — ${b.motivo}`}
          </span>
          <button
            onClick={() => quitarBloqueo(b.id)}
            style={{ fontSize: '0.85rem', color: 'var(--color-error)', fontWeight: 500 }}
          >
            Quitar bloqueo
          </button>
        </div>
      ))}
    </div>
  )
}

export default SeccionAgenda
