import { Link } from 'react-router-dom'
import { perfil, formacion, seo, imagenesTemporales } from '../data/contenido'
import ImagenPlaceholder from '../components/ui/ImagenPlaceholder'
import FadeInSection from '../components/ui/FadeInSection'
import BlobDecorativo from '../components/ui/BlobDecorativo'
import DivisorCurva from '../components/ui/DivisorCurva'
import { useSEO } from '../hooks/useSEO'

function SobreMi() {
  useSEO(seo.paginas.sobreMi)

  return (
    <div>
      {/* Hero personal */}
      <section
        className="contenedor seccion grid-2-col"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 'var(--space-lg)',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        id="sobre-mi-hero"
      >
        <BlobDecorativo
          variante={2}
          color="var(--color-sage-suave)"
          opacity={0.3}
          style={{ width: 380, height: 380, top: '-120px', left: '-160px', zIndex: 0 }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ImagenPlaceholder
            ratio="1/1"
            src={imagenesTemporales.sobreMiRetrato}
            alt="Retrato profesional — foto temporal, será reemplazada"
            label="Foto personal de Rebeca — pendiente"
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>Conozca a su psicóloga</h1>
          <p style={{ marginTop: '1rem' }}>{perfil.bioCorta}</p>
          <p style={{ marginTop: '1rem' }}>{perfil.enfoque}</p>
          {perfil.colegiatura ? (
            <p style={{ marginTop: '1rem', fontSize: 'var(--fs-small)', color: 'var(--color-texto-secundario)' }}>
              N.º de colegiatura: {perfil.colegiatura}
            </p>
          ) : null}
        </div>
      </section>

      {/* Formación y trayectoria */}
      <DivisorCurva colorSuperior="var(--color-sage-suave)" />
      <section style={{ background: 'var(--color-sage-suave)', position: 'relative', overflow: 'hidden' }}>
        <BlobDecorativo
          variante={1}
          color="var(--color-terracota-suave)"
          opacity={0.25}
          style={{ width: 340, height: 340, bottom: '-100px', right: '-140px', zIndex: 0 }}
        />
        <div className="contenedor seccion" style={{ position: 'relative', zIndex: 1 }}>
          <FadeInSection as="div" style={{ marginBottom: '2rem' }}>
            <h2>Formación y trayectoria profesional</h2>
          </FadeInSection>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {formacion.map((item, i) => (
              <FadeInSection
                key={i}
                as="div"
                delay={i * 80}
                className="card-formacion"
                style={{
                  background: 'var(--color-blanco)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-suave)',
                  borderLeft: '3px solid var(--color-cta)',
                }}
              >
                <h3>{item.titulo}</h3>
                <p style={{ marginTop: '0.4rem' }}>{item.institucion}</p>
                {item.nota && (
                  <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.5rem' }}>{item.nota}</p>
                )}
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA de cierre */}
      <section className="contenedor seccion" style={{ textAlign: 'center' }}>
        <h2>¿Lista para conocerla en persona?</h2>
        <p style={{ maxWidth: 480, margin: '1rem auto 2rem' }}>
          Reserva tu cita y demos juntos el primer paso hacia un espacio de acompañamiento
          seguro y profesional.
        </p>
        <Link to="/reservar-cita" className="btn btn-primario">
          Reservar Cita
        </Link>
      </section>
    </div>
  )
}

export default SobreMi
