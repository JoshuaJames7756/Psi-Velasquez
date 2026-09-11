import { useParams, Link } from 'react-router-dom'
import { especialidades, servicios, faq, seo, seoEspecialidad } from '../data/contenido'
import FadeInSection from '../components/ui/FadeInSection'
import CardEspecialidad from '../components/ui/CardEspecialidad'
import { useSEO } from '../hooks/useSEO'

function SeccionFAQ() {
  return (
    <div style={{ background: 'var(--color-fondo-crema)', borderTop: '1px solid var(--color-sage-medio)' }}>
      <div className="contenedor seccion">
        <FadeInSection as="div" style={{ marginBottom: '2rem' }}>
          <h2>Preguntas frecuentes</h2>
        </FadeInSection>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {faq.map((item, i) => (
            <FadeInSection key={i} as="div">
              <h3 style={{ fontSize: 'var(--fs-h3)' }}>{item.pregunta}</h3>
              <p style={{ marginTop: '0.5rem' }}>{item.respuesta}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  )
}

function VistaListado() {
  return (
    <div className="seccion contenedor">
      <h1>{servicios.titulo}</h1>
      <p style={{ maxWidth: 600 }}>{servicios.descripcion}</p>

      <div className="grid-especialidades">
        {especialidades.map((esp, i) => (
          <FadeInSection key={esp.id} as={Link} to={`/especialidades/${esp.id}`} className="card-especialidad-wrapper" delay={i * 70}>
            <CardEspecialidad especialidad={esp} />
          </FadeInSection>
        ))}
      </div>

      <p style={{ marginTop: '3rem', maxWidth: 600 }}>{servicios.colaboracion}</p>
    </div>
  )
}
function VistaDetalle({ especialidad }) {
  useSEO(seoEspecialidad(especialidad))

  return (
    <div className="seccion contenedor" style={{ maxWidth: 720 }}>
      <Link to="/especialidades" style={{ fontSize: 'var(--fs-small)', textDecoration: 'underline' }}>
        ← Todas las especialidades
      </Link>

      <h1 style={{ marginTop: '1rem' }}>{especialidad.nombre}</h1>

      <FadeInSection as="section" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: 'var(--fs-h3)' }}>¿Qué es?</h2>
        <p style={{ marginTop: '0.75rem' }}>{especialidad.queEs}</p>
      </FadeInSection>

      {especialidad.sintomas && (
        <FadeInSection as="section" style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>Algunas señales comunes</h2>
          <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
            {especialidad.sintomas.map((s, i) => (
              <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--color-texto-secundario)' }}>
                {s}
              </li>
            ))}
          </ul>
        </FadeInSection>
      )}

      <FadeInSection
        as="section"
        style={{ marginTop: '2rem', background: 'var(--color-sage-medio)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}
      >
        <h2 style={{ fontSize: 'var(--fs-h3)' }}>¿Cómo puede ayudar la terapia?</h2>
        <p style={{ marginTop: '0.75rem' }}>{especialidad.comoAyuda}</p>
      </FadeInSection>

      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Link to="/reservar-cita" className="btn btn-primario">
          Reservar Cita
        </Link>
      </div>
    </div>
  )
}

function Especialidades() {
  const { id } = useParams()
  const especialidad = id ? especialidades.find((e) => e.id === id) : null

  // El SEO del listado se aplica aquí (no dentro de VistaListado) para que
  // no choque con el useSEO condicional de VistaDetalle en el mismo render.
  useSEO(especialidad ? {} : seo.paginas.especialidades)

  if (id && !especialidad) {
    return (
      <div className="seccion contenedor" style={{ textAlign: 'center' }}>
        <h1>Especialidad no encontrada</h1>
        <Link to="/especialidades" className="btn btn-primario" style={{ marginTop: '1rem' }}>
          Ver todas las especialidades
        </Link>
      </div>
    )
  }

  if (especialidad) return <VistaDetalle especialidad={especialidad} />

  return (
    <div>
      <VistaListado />
      <SeccionFAQ />
    </div>
  )
}

export default Especialidades
