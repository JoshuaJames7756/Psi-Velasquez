import { useParams, Link } from 'react-router-dom'
import { especialidades, servicios, faq, seo, seoEspecialidad } from '../data/contenido'
import FadeInSection from '../components/ui/FadeInSection'
import CardEspecialidad from '../components/ui/CardEspecialidad'
import Icono from '../components/ui/Icono'
import BlobDecorativo from '../components/ui/BlobDecorativo'
import DivisorCurva from '../components/ui/DivisorCurva'
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
    <div>
      {/* Hero de la especialidad — ícono grande, blob, fondo con color propio */}
      <section style={{ background: 'var(--color-terracota-suave)', position: 'relative', overflow: 'hidden' }}>
        <BlobDecorativo
          variante={1}
          color="rgba(255,255,255,0.4)"
          opacity={0.5}
          style={{ width: 400, height: 400, top: '-140px', right: '-140px', zIndex: 0 }}
        />
        <div className="contenedor" style={{ maxWidth: 720, position: 'relative', zIndex: 1, paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
          <Link to="/especialidades" style={{ fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            ← Todas las especialidades
          </Link>

          <FadeInSection as="div" style={{ marginTop: '1.5rem' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '18px',
                background: 'var(--color-blanco)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-media)',
                marginBottom: '1.25rem',
              }}
            >
              <Icono nombre={especialidad.id} size={30} style={{ color: 'var(--color-cta)' }} />
            </div>
            <h1>{especialidad.nombre}</h1>
          </FadeInSection>
        </div>
      </section>

      <DivisorCurva colorSuperior="var(--color-fondo-crema)" />

      <div className="contenedor seccion" style={{ maxWidth: 720, position: 'relative' }}>
        <BlobDecorativo
          variante={3}
          color="var(--color-sage-suave)"
          opacity={0.22}
          style={{ width: 320, height: 320, bottom: '-60px', left: '-160px', zIndex: -1 }}
        />

        <FadeInSection as="section">
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>¿Qué es?</h2>
          <p style={{ marginTop: '0.75rem' }}>{especialidad.queEs}</p>
        </FadeInSection>

        {especialidad.sintomas && (
          <FadeInSection as="section" style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: '1.25rem' }}>Algunas señales comunes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {especialidad.sintomas.map((s, i) => (
                <FadeInSection
                  key={i}
                  delay={i * 60}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: 'var(--color-blanco)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-card-border)',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'var(--color-sage-medio)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '0.1rem',
                    }}
                  >
                    <Icono nombre="check" size={14} style={{ color: 'var(--color-cta-hover)' }} />
                  </div>
                  <p style={{ color: 'var(--color-texto-secundario)', fontSize: '0.95rem' }}>{s}</p>
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>
        )}

        <FadeInSection
          as="section"
          style={{
            marginTop: '2.5rem',
            background: 'var(--color-sage-medio)',
            padding: '1.75rem',
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <BlobDecorativo
            variante={2}
            color="var(--color-terracota-suave)"
            opacity={0.3}
            style={{ width: 200, height: 200, bottom: '-80px', right: '-60px', zIndex: 0 }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'var(--fs-h3)' }}>¿Cómo puede ayudar la terapia?</h2>
            <p style={{ marginTop: '0.75rem' }}>{especialidad.comoAyuda}</p>
          </div>
        </FadeInSection>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link to="/reservar-cita" className="btn btn-primario">
            Reservar Cita
          </Link>
        </div>
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
