import { perfil, imagenesTemporales } from '../../data/contenido'
import ImagenPlaceholder from '../ui/ImagenPlaceholder'
import FadeInSection from '../ui/FadeInSection'

function PorQueTerapia() {
  return (
    <section style={{ background: 'var(--color-sage-medio)' }}>
      <FadeInSection as="div" className="contenedor seccion grid-2-col">
        <ImagenPlaceholder
          ratio="1/1"
          src={imagenesTemporales.consultorio}
          alt="Sesión de terapia"
          label="Espacio del consultorio"
        />
        <div>
          <h2>¿Por qué terapia conmigo?</h2>
          <p style={{ marginTop: '1rem' }}>{perfil.enfoque}</p>
          <p style={{ marginTop: '1rem' }}>
            Trabajo con un enfoque cognitivo-conductual: exploramos cómo tus pensamientos, 
            emociones y comportamientos se conectan, brindándote herramientas prácticas para tu día a día.
          </p>
        </div>
      </FadeInSection>
    </section>
  )
}

export default PorQueTerapia