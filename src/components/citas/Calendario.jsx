import { useState } from 'react'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const DIAS_SEMANA = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function Calendario({ fechaSeleccionada, onSeleccionarFecha }) {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const [mesVisible, setMesVisible] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1))

  const primerDiaMes = new Date(mesVisible.getFullYear(), mesVisible.getMonth(), 1)
  const diasEnMes = new Date(mesVisible.getFullYear(), mesVisible.getMonth() + 1, 0).getDate()
  const offsetInicio = primerDiaMes.getDay()

  const celdas = []
  for (let i = 0; i < offsetInicio; i++) celdas.push(null)
  for (let d = 1; d <= diasEnMes; d++) celdas.push(d)

  const esMesActual =
    mesVisible.getFullYear() === hoy.getFullYear() && mesVisible.getMonth() === hoy.getMonth()

  const irMesAnterior = () => {
    if (esMesActual) return // no retroceder antes del mes actual
    setMesVisible(new Date(mesVisible.getFullYear(), mesVisible.getMonth() - 1, 1))
  }

  const irMesSiguiente = () => {
    setMesVisible(new Date(mesVisible.getFullYear(), mesVisible.getMonth() + 1, 1))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={irMesAnterior}
          disabled={esMesActual}
          className="btn btn-outline"
          style={{ padding: '0.4rem 0.8rem', opacity: esMesActual ? 0.3 : 1 }}
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <strong>
          {MESES[mesVisible.getMonth()]} {mesVisible.getFullYear()}
        </strong>
        <button onClick={irMesSiguiente} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }} aria-label="Mes siguiente">
          ›
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem', textAlign: 'center' }}>
        {DIAS_SEMANA.map((d, i) => (
          <div key={i} style={{ fontSize: 'var(--fs-small)', color: 'var(--color-texto-secundario)', fontWeight: 600 }}>
            {d}
          </div>
        ))}

        {celdas.map((dia, i) => {
          if (dia === null) return <div key={`vacio-${i}`} />

          const fechaCelda = new Date(mesVisible.getFullYear(), mesVisible.getMonth(), dia)
          const iso = toISODate(fechaCelda)
          const esPasado = fechaCelda < hoy
          const esSeleccionado = fechaSeleccionada === iso

          return (
            <button
              key={iso}
              disabled={esPasado}
              onClick={() => onSeleccionarFecha(iso)}
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--radius-sm)',
                background: esSeleccionado ? 'var(--color-cta)' : 'transparent',
                color: esSeleccionado ? 'var(--color-cta-texto)' : esPasado ? '#ccc' : 'var(--color-texto-principal)',
                cursor: esPasado ? 'not-allowed' : 'pointer',
                transition: 'var(--transition-rapida)',
                fontSize: 'var(--fs-small)',
              }}
            >
              {dia}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendario
