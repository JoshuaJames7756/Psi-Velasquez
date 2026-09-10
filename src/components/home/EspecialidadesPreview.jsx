import { Link } from 'react-router-dom'
import { especialidades } from '../../data/contenido'
import FadeInSection from '../ui/FadeInSection'
import Icono from '../ui/Icono'

function EspecialidadesPreview() {
  return (
    <section className="seccion contenedor">
      <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2>¿En qué puedo acompañarte?</h2>
      </FadeInSection>

      {/* Se eliminan los estilos en línea para usar las clases CSS de la retícula */}
      <div className="grid-especialidades">
        {especialidades.map((esp) => (
          <FadeInSection key={esp.id} as={Link} to={`/especialidades/${esp.id}`} className="card-especialidad-wrapper">
            <div className="card-especialidad">
              <div>
                <Icono
                  nombre={esp.id}
                  size={32}
                  style={{ color: 'var(--color-cta)', marginBottom: '1.25rem' }}
                />
                <h3>{esp.nombre}</h3>
                <p style={{ fontSize: '0.95rem', marginTop: '0.6rem', color: 'var(--color-texto-secundario)', lineHeight: 1.5 }}>
                  {esp.resumen}
                </p>
              </div>

              <span className="link-flecha">
                Conocer más <Icono nombre="flecha-derecha" size={16} />
              </span>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}

export default EspecialidadesPreview