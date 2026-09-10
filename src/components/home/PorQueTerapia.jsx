import { perfil, imagenesTemporales } from '../../data/contenido'
import ImagenPlaceholder from '../ui/ImagenPlaceholder'
import FadeInSection from '../ui/FadeInSection'

function PorQueTerapia() {
  return (
    <section style={{ background: 'var(--color-sage-medio)' }}>
      <FadeInSection
        as="div"
        className="contenedor seccion grid-2-col"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-lg)',
          alignItems: 'center',
        }}
      >
        <ImagenPlaceholder
          ratio="1/1"
          src={imagenesTemporales.consultorio}
          alt="Sesión de terapia — foto temporal, será reemplazada"
          label="Espacio del consultorio — pendiente"
        />
        <div>
          <h2>¿Por qué terapia conmigo?</h2>
          <p style={{ marginTop: '1rem' }}>{perfil.enfoque}</p>
          <p style={{ marginTop: '1rem' }}>
            Trabajo con un enfoque cognitivo-conductual: en lugar de solo hablar de lo que
            sientes, exploramos juntos cómo tus pensamientos, emociones y comportamientos
            se conectan — y encontramos herramientas prácticas para tu día a día, no solo
            teoría.
          </p>
        </div>
      </FadeInSection>
    </section>
  )
}

export default PorQueTerapia
