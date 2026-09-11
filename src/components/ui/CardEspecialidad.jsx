import Icono from './Icono'
import { useTilt } from '../../hooks/useTilt'

function CardEspecialidad({ especialidad }) {
  const tilt = useTilt(5)

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="card-especialidad"
      style={{ transition: 'transform 0.2s ease-out, box-shadow 0.35s ease, border-color 0.35s ease' }}
    >
      <div>
        <Icono nombre={especialidad.id} size={32} style={{ color: 'var(--color-cta)', marginBottom: '1.25rem' }} />
        <h3>{especialidad.nombre}</h3>
        <p style={{ fontSize: '0.95rem', marginTop: '0.6rem', color: 'var(--color-texto-secundario)', lineHeight: 1.5 }}>
          {especialidad.resumen}
        </p>
      </div>
      <span className="link-flecha">
        Conocer más <Icono nombre="flecha-derecha" size={16} />
      </span>
    </div>
  )
}

export default CardEspecialidad
