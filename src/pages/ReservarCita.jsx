import { useState } from 'react'
import { Link } from 'react-router-dom'
import Calendario from '../components/citas/Calendario'
import SelectorHora from '../components/citas/SelectorHora'
import FormularioAdmision from '../components/citas/FormularioAdmision'
import Icono from '../components/ui/Icono'
import { useSEO } from '../hooks/useSEO'
import { seo } from '../data/contenido'

const PASOS = {
  HORARIO: 'horario',
  FORMULARIO: 'formulario',
  CONFIRMACION: 'confirmacion',
}

function ReservarCita() {
  useSEO(seo.paginas.reservarCita)

  const [paso, setPaso] = useState(PASOS.HORARIO)
  const [fecha, setFecha] = useState(null)
  const [hora, setHora] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('')

  const avanzarAFormulario = () => {
    if (fecha && hora) setPaso(PASOS.FORMULARIO)
  }

  const enviarSolicitud = async (datosFormulario) => {
    setEnviando(true)
    setError(null)

    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datosFormulario, fecha, hora }),
      })
      const data = await res.json()

      if (!res.ok) {
        // Ej: alguien más tomó ese horario mientras llenaba el formulario
        setError(data.error || 'No pudimos procesar tu solicitud.')
        if (res.status === 409) {
          setPaso(PASOS.HORARIO)
          setHora(null)
        }
        return
      }

      setMensajeConfirmacion(data.mensaje)
      setPaso(PASOS.CONFIRMACION)
    } catch (err) {
      setError('Hubo un problema de conexión. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="seccion contenedor" style={{ maxWidth: 640 }}>
      <h1>Reservar Cita</h1>

      {paso !== PASOS.CONFIRMACION && (
        <p style={{ marginBottom: '2rem' }}>
          Elige el día y hora que mejor te acomode, y cuéntanos un poco sobre lo que buscas.
          Rebeca revisará tu solicitud personalmente.
        </p>
      )}

      {error && (
        <p style={{ color: 'var(--color-error)', marginBottom: '1rem', padding: '0.75rem', background: '#fdf1ee', borderRadius: 'var(--radius-sm)' }}>
          {error}
        </p>
      )}

      {paso === PASOS.HORARIO && (
        <>
          <Calendario fechaSeleccionada={fecha} onSeleccionarFecha={(f) => { setFecha(f); setHora(null) }} />
          <SelectorHora fecha={fecha} horaSeleccionada={hora} onSeleccionarHora={setHora} />
          <button
            className="btn btn-primario"
            disabled={!fecha || !hora}
            onClick={avanzarAFormulario}
            style={{ marginTop: '2rem', width: '100%', opacity: fecha && hora ? 1 : 0.5 }}
          >
            Continuar con mis datos
          </button>
        </>
      )}

      {paso === PASOS.FORMULARIO && (
        <>
          <div
            style={{
              background: 'var(--color-sage-medio)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              fontSize: 'var(--fs-small)',
            }}
          >
            Horario seleccionado: <strong>{fecha}</strong> a las <strong>{hora}</strong>{' '}
            <button
              onClick={() => setPaso(PASOS.HORARIO)}
              style={{ color: 'var(--color-cta)', textDecoration: 'underline', marginLeft: '0.5rem' }}
            >
              cambiar
            </button>
          </div>
          <FormularioAdmision onSubmit={enviarSolicitud} enviando={enviando} />
        </>
      )}

      {paso === PASOS.CONFIRMACION && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--color-cta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <Icono nombre="check" size={28} style={{ color: 'var(--color-cta-texto)' }} />
          </div>
          <h2>Solicitud recibida</h2>
          <p style={{ marginTop: '1rem' }}>{mensajeConfirmacion}</p>
          <Link to="/" className="btn btn-outline" style={{ marginTop: '2rem' }}>
            Volver al inicio
          </Link>
        </div>
      )}
    </div>
  )
}

export default ReservarCita
