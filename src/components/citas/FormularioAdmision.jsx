import { useState } from 'react'
import { usePreguntasFormulario } from '../../hooks/usePreguntasFormulario'
import { especialidades } from '../../data/contenido'

function CampoDinamico({ pregunta, valor, onChange }) {
  const { tipo, etiqueta, obligatorio, opciones } = pregunta

  if (tipo === 'si_no') {
    return (
      <fieldset style={{ marginBottom: '1.25rem' }}>
        <legend style={{ marginBottom: '0.5rem' }}>
          {etiqueta} {obligatorio && <span style={{ color: 'var(--color-error)' }}>*</span>}
        </legend>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['Sí', 'No'].map((op) => (
            <label key={op} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <input
                type="radio"
                name={pregunta.clave}
                checked={valor === op}
                onChange={() => onChange(op)}
                required={obligatorio}
              />
              {op}
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  if (tipo === 'seleccion') {
    const lista = Array.isArray(opciones) ? opciones : []
    return (
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          {etiqueta} {obligatorio && <span style={{ color: 'var(--color-error)' }}>*</span>}
        </label>
        <select
          value={valor || ''}
          onChange={(e) => onChange(e.target.value)}
          required={obligatorio}
          style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
        >
          <option value="">Selecciona una opción</option>
          {lista.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      </div>
    )
  }

  if (tipo === 'texto_largo') {
    return (
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          {etiqueta} {obligatorio && <span style={{ color: 'var(--color-error)' }}>*</span>}
        </label>
        <textarea
          value={valor || ''}
          onChange={(e) => onChange(e.target.value)}
          required={obligatorio}
          rows={4}
          style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)', fontFamily: 'inherit' }}
        />
      </div>
    )
  }

  // texto_corto (default)
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        {etiqueta} {obligatorio && <span style={{ color: 'var(--color-error)' }}>*</span>}
      </label>
      <input
        type="text"
        value={valor || ''}
        onChange={(e) => onChange(e.target.value)}
        required={obligatorio}
        style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
      />
    </div>
  )
}

function FormularioAdmision({ onSubmit, enviando }) {
  const { preguntas, cargando } = usePreguntasFormulario()

  const [datos, setDatos] = useState({
    nombre_paciente: '',
    telefono: '',
    email: '',
    motivo: '',
    primera_vez: false,
  })
  const [respuestas, setRespuestas] = useState({})

  const actualizarCampo = (campo, valor) => setDatos((prev) => ({ ...prev, [campo]: valor }))
  const actualizarRespuesta = (clave, valor) => setRespuestas((prev) => ({ ...prev, [clave]: valor }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...datos, respuestas_formulario: respuestas })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Nombre completo <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <input
          type="text"
          required
          value={datos.nombre_paciente}
          onChange={(e) => actualizarCampo('nombre_paciente', e.target.value)}
          style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
        />
      </div>

      <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Teléfono / WhatsApp <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <input
            type="tel"
            required
            value={datos.telefono}
            onChange={(e) => actualizarCampo('telefono', e.target.value)}
            style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
          />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            value={datos.email}
            onChange={(e) => actualizarCampo('email', e.target.value)}
            style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>¿Qué te trae a terapia?</label>
        <select
          value={datos.motivo}
          onChange={(e) => actualizarCampo('motivo', e.target.value)}
          style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-sage-medio)' }}
        >
          <option value="">Selecciona una opción</option>
          {especialidades.map((e) => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
          <option value="otro">Otro</option>
        </select>
      </div>

      <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <input
          type="checkbox"
          checked={datos.primera_vez}
          onChange={(e) => actualizarCampo('primera_vez', e.target.checked)}
        />
        Es la primera vez que voy a terapia
      </label>

      {/* Preguntas dinámicas configuradas por Rebeca */}
      {!cargando && preguntas.length > 0 && (
        <div style={{ borderTop: '1px solid var(--color-sage-medio)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
          {preguntas.map((p) => (
            <CampoDinamico
              key={p.id}
              pregunta={p}
              valor={respuestas[p.clave]}
              onChange={(valor) => actualizarRespuesta(p.clave, valor)}
            />
          ))}
        </div>
      )}

      <button type="submit" className="btn btn-primario" disabled={enviando} style={{ width: '100%' }}>
        {enviando ? 'Enviando solicitud…' : 'Enviar solicitud de cita'}
      </button>
      <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.75rem', textAlign: 'center' }}>
        Rebeca revisará tu solicitud y te confirmaremos por email en las próximas horas.
      </p>
    </form>
  )
}

export default FormularioAdmision
