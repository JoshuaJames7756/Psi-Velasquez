import { Link } from 'react-router-dom'
import { especialidades } from '../../data/contenido'
import FadeInSection from '../ui/FadeInSection'
import CardEspecialidad from '../ui/CardEspecialidad'

function EspecialidadesPreview() {
  return (
    <section className="seccion contenedor">
      <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2>¿En qué puedo acompañarte?</h2>
      </FadeInSection>

      <div className="grid-especialidades">
        {especialidades.map((esp, i) => (
          <FadeInSection
            key={esp.id}
            as={Link}
            to={`/especialidades/${esp.id}`}
            className="card-especialidad-wrapper"
            delay={i * 70}
          >
            <CardEspecialidad especialidad={esp} />
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}

export default EspecialidadesPreview