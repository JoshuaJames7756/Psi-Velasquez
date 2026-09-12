import { perfil, imagenesTemporales } from '../../data/contenido'
import ImagenPlaceholder from '../ui/ImagenPlaceholder'
import FadeInSection from '../ui/FadeInSection'
import BlobDecorativo from '../ui/BlobDecorativo'
import DivisorCurva from '../ui/DivisorCurva'

function PorQueTerapia() {
  return (
    <>
      <DivisorCurva colorSuperior="var(--color-sage-medio)" />
      <section style={{ background: 'var(--color-sage-medio)', position: 'relative', overflow: 'hidden' }}>
        <BlobDecorativo
          variante={3}
          color="var(--color-terracota-suave)"
          opacity={0.25}
          style={{ width: 380, height: 380, top: '-100px', right: '-150px', zIndex: 0 }}
        />
        <FadeInSection
          as="div"
          className="contenedor seccion grid-2-col"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-lg)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
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
      <DivisorCurva colorSuperior="var(--color-fondo-crema)" invertido />
    </>
  )
}

export default PorQueTerapia
