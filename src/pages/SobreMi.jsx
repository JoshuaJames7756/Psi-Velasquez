import { Link } from 'react-router-dom'
import { perfil, formacion, seo, imagenesTemporales } from '../data/contenido'
import ImagenPlaceholder from '../components/ui/ImagenPlaceholder'
import FadeInSection from '../components/ui/FadeInSection'
import { useSEO } from '../hooks/useSEO'

function SobreMi() {
  useSEO(seo.paginas.sobreMi)

  return (
    <div>
      {/* Hero personal */}
      <section
        className="contenedor seccion grid-2-col"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 'var(--space-lg)', alignItems: 'center' }}
        id="sobre-mi-hero"
      >
        <ImagenPlaceholder
          ratio="1/1"
          src={imagenesTemporales.sobreMiRetrato}
          alt="Retrato profesional — foto temporal, será reemplazada"
          label="Foto personal de Rebeca — pendiente"
        />
        <div>
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
      <section style={{ background: 'var(--color-sage-suave)' }}>
        <div className="contenedor seccion">
          <FadeInSection as="div" style={{ marginBottom: '2rem' }}>
            <h2>Formación y trayectoria profesional</h2>
          </FadeInSection>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {formacion.map((item, i) => (
              <FadeInSection
                key={i}
                as="div"
                style={{
                  background: 'var(--color-blanco)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-suave)',
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
