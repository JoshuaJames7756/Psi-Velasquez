import { Link } from 'react-router-dom'
import FadeInSection from '../ui/FadeInSection'

function CtaFinal() {
  return (
    <FadeInSection
      as="section"
      className="seccion"
      style={{
        background: 'var(--color-cta)',
        color: 'var(--color-cta-texto)',
        textAlign: 'center',
      }}
    >
      <div className="contenedor">
        <h2 style={{ color: 'var(--color-cta-texto)' }}>Da el primer paso hoy</h2>
        <p style={{ color: 'var(--color-cta-texto)', maxWidth: 480, margin: '1rem auto 2rem', opacity: 0.95 }}>
          Un espacio seguro te está esperando. Reserva tu cita y cuéntame en qué puedo
          acompañarte.
        </p>
        <Link
          to="/reservar-cita"
          className="btn"
          style={{ background: 'var(--color-blanco)', color: 'var(--color-cta)' }}
        >
          Reservar Cita
        </Link>
      </div>
    </FadeInSection>
  )
}

export default CtaFinal
