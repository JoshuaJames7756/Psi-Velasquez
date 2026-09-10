import { Link } from 'react-router-dom'
import { especialidades } from '../../data/contenido'
import FadeInSection from '../ui/FadeInSection'
import Icono from '../ui/Icono'

function EspecialidadesPreview() {
  return (
    <section className="seccion contenedor">
      <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <h2>¿En qué puedo acompañarte?</h2>
      </FadeInSection>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {especialidades.map((esp, i) => (
          <FadeInSection key={esp.id} as={Link} to={`/especialidades/${esp.id}`}>
            <div
              style={{
                background: 'var(--color-terracota-suave)',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                height: '100%',
                transition: 'var(--transition-suave)',
              }}
              className="card-especialidad"
            >
              <Icono
                nombre={esp.id}
                size={30}
                style={{ color: 'var(--color-texto-principal)', marginBottom: '0.9rem' }}
              />
              <h3>{esp.nombre}</h3>
              <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.5rem' }}>{esp.resumen}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}

export default EspecialidadesPreview
