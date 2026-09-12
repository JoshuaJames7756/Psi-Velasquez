import { useResumenCitas } from '../../hooks/useResumenCitas'
import Icono from '../ui/Icono'

function saludoPorHora() {
  const hora = new Date().getHours()
  if (hora < 12) return 'Buenos días'
  if (hora < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function TarjetaResumen({ icono, etiqueta, valor, acento }) {
  return (
    <div
      style={{
        background: 'var(--admin-card-bg)',
        border: '1px solid var(--admin-border)',
        borderRadius: '14px',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '10px',
          background: acento,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icono nombre={icono} size={22} style={{ color: 'var(--admin-bg)' }} />
      </div>
      <div>
        <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--admin-texto)', lineHeight: 1 }}>{valor}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--admin-texto-secundario)', marginTop: '0.3rem' }}>{etiqueta}</p>
      </div>
    </div>
  )
}

function DashboardResumen({ nombre }) {
  const { resumen, cargando } = useResumenCitas()

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-sans-cuerpo)', fontWeight: 600, color: 'var(--admin-texto)' }}>
        {saludoPorHora()}, {nombre.split(' ')[0]}
      </h1>
      <p style={{ color: 'var(--admin-texto-secundario)', marginTop: '0.25rem' }}>
        {cargando
          ? 'Cargando tu resumen del día…'
          : resumen.proxima
          ? `Tu próxima cita confirmada es el ${resumen.proxima.fecha} a las ${String(resumen.proxima.hora).slice(0, 5)}.`
          : 'No tienes próximas citas confirmadas por ahora.'}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
        }}
      >
        <TarjetaResumen
          icono="advertencia"
          etiqueta="Solicitudes pendientes"
          valor={cargando ? '—' : resumen.totalPendientes}
          acento="#D9B36C"
        />
        <TarjetaResumen
          icono="check"
          etiqueta="Citas confirmadas"
          valor={cargando ? '—' : resumen.totalConfirmadas}
          acento="var(--color-cta)"
        />
        <TarjetaResumen
          icono="calendario"
          etiqueta="Citas de hoy"
          valor={cargando ? '—' : resumen.citasHoy}
          acento="#7B9BD1"
        />
      </div>
    </div>
  )
}

export default DashboardResumen
