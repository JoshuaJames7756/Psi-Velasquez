import { Link } from 'react-router-dom'
import FadeInSection from '../ui/FadeInSection'
import BlobDecorativo from '../ui/BlobDecorativo'
import DivisorCurva from '../ui/DivisorCurva'

function CtaFinal() {
  return (
    <>
      <DivisorCurva colorSuperior="var(--color-cta)" />
      <FadeInSection
        as="section"
        className="seccion"
        style={{
          background: 'var(--color-cta)',
          color: 'var(--color-cta-texto)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BlobDecorativo
          variante={2}
          color="rgba(255,255,255,0.5)"
          opacity={0.12}
          style={{ width: 500, height: 500, top: '-180px', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}
        />
        <div className="contenedor" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: 'var(--color-cta-texto)' }}>Da el primer paso hoy</h2>
          <p style={{ color: 'var(--color-cta-texto)', maxWidth: 480, margin: '1rem auto 2rem', opacity: 0.95 }}>
            Un espacio seguro te está esperando. Reserva tu cita y cuéntame en qué puedo
            acompañarte.
          </p>
          <Link
            to="/reservar-cita"
            className="btn btn-cta-invertido"
            style={{ background: 'var(--color-blanco)', color: 'var(--color-cta)' }}
          >
            Reservar Cita
          </Link>
        </div>
      </FadeInSection>
    </>
  )
}

export default CtaFinal
