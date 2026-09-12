import { avisoEtico, seo } from '../data/contenido'
import { useSEO } from '../hooks/useSEO'
import FadeInSection from '../components/ui/FadeInSection'

function AvisoEtico() {
  useSEO(seo.paginas.avisoEtico)

  return (
    <div className="seccion contenedor" style={{ maxWidth: 680 }}>
      <FadeInSection as="div">
        <h1>Aviso Ético</h1>
      </FadeInSection>
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1.75rem',
          background: 'var(--color-blanco)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-card-border)',
        }}
      >
        {avisoEtico.split('\n\n').map((parrafo, i) => (
          <FadeInSection as="p" key={i} delay={i * 50} style={{ marginBottom: '1rem' }}>
            {parrafo}
          </FadeInSection>
        ))}
      </div>
    </div>
  )
}

export default AvisoEtico
