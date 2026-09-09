import { useState } from 'react'
import { usePreguntasAdmin } from '../../hooks/usePreguntasAdmin'

const TIPOS = [
  { valor: 'texto_corto', label: 'Respuesta corta' },
  { valor: 'texto_largo', label: 'Respuesta larga' },
  { valor: 'si_no', label: 'Sí / No' },
  { valor: 'seleccion', label: 'Lista de opciones' },
]

function SeccionFormulario() {
  const { preguntas, cargando, crearPregunta, desactivarPregunta } = usePreguntasAdmin()
  const [nueva, setNueva] = useState({ etiqueta: '', tipo: 'texto_corto', obligatorio: false, opciones: '' })
  const [guardando, setGuardando] = useState(false)

  const handleCrear = async (e) => {
    e.preventDefault()
    if (!nueva.etiqueta.trim()) return

    setGuardando(true)
    const clave = nueva.etiqueta
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .slice(0, 50)

    const opciones = nueva.tipo === 'seleccion'
      ? nueva.opciones.split(',').map((o) => o.trim()).filter(Boolean)
      : null

    const ok = await crearPregunta({
      clave: `${clave}_${Date.now()}`,
      etiqueta: nueva.etiqueta,
      tipo: nueva.tipo,
      opciones,
      obligatorio: nueva.obligatorio,
      orden: preguntas.length + 1,
    })
    if (ok) setNueva({ etiqueta: '', tipo: 'texto_corto', obligatorio: false, opciones: '' })
    setGuardando(false)
  }

  return (
    <div>
      <h1>Formulario de admisión</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Estas son las preguntas adicionales que verán tus pacientes al reservar una cita
        (además de nombre, teléfono, email y motivo). Agrega las que necesites.
      </p>

      <form
        onSubmit={handleCrear}
        style={{ background: 'var(--color-fondo-crema)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', marginBottom: '0.4rem' }}>Pregunta</label>
          <input
            type="text"
            required
            placeholder="Ej. ¿Has tenido terapia antes?"
            value={nueva.etiqueta}
            onChange={(e) => setNueva({ ...nueva, etiqueta: e.target.value })}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', marginBottom: '0.4rem' }}>Tipo de respuesta</label>
            <select
              value={nueva.tipo}
              onChange={(e) => setNueva({ ...nueva, tipo: e.target.value })}
              style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
            >
              {TIPOS.map((t) => (
                <option key={t.valor} value={t.valor}>{t.label}</option>
              ))}
            </select>
          </div>

          <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1.6rem' }}>
            <input
              type="checkbox"
              checked={nueva.obligatorio}
              onChange={(e) => setNueva({ ...nueva, obligatorio: e.target.checked })}
            />
            Obligatoria
          </label>
        </div>

        {nueva.tipo === 'seleccion' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', marginBottom: '0.4rem' }}>
              Opciones (separadas por coma)
            </label>
            <input
              type="text"
              placeholder="Ej. Ansiedad, Depresión, Estrés"
              value={nueva.opciones}
              onChange={(e) => setNueva({ ...nueva, opciones: e.target.value })}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
            />
          </div>
        )}

        <button type="submit" disabled={guardando} className="btn btn-primario">
          Agregar pregunta
        </button>
      </form>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Preguntas activas</h2>
      {cargando && <p>Cargando…</p>}
      {!cargando && preguntas.length === 0 && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>Aún no has agregado preguntas.</p>
      )}

      {preguntas.map((p) => (
        <div
          key={p.id}
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
          <div>
            <p>{p.etiqueta}{p.obligatorio && ' *'}</p>
            <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-texto-secundario)' }}>
              {TIPOS.find((t) => t.valor === p.tipo)?.label}
            </p>
          </div>
          <button
            onClick={() => desactivarPregunta(p.id)}
            style={{ fontSize: 'var(--fs-small)', color: 'var(--color-error)', textDecoration: 'underline' }}
          >
            Quitar
          </button>
        </div>
      ))}
    </div>
  )
}

export default SeccionFormulario
