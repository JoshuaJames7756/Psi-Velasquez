import { Link } from 'react-router-dom'
import { especialidades } from '../../data/contenido'
import FadeInSection from '../ui/FadeInSection'
import CardEspecialidad from '../ui/CardEspecialidad'
import { useCarrusel } from '../../hooks/useCarrusel'

// Cuántas cards se muestran juntas por "página" del carrusel. En mobile
// se fuerza a 1 vía CSS (ver .carrusel-especialidades-track en media query).
const POR_PAGINA = 2

function agruparDeADos(lista, tamano) {
  const grupos = []
  for (let i = 0; i < lista.length; i += tamano) {
    grupos.push(lista.slice(i, i + tamano))
  }
  return grupos
}

function EspecialidadesPreview() {
  const paginas = agruparDeADos(especialidades, POR_PAGINA)
  const { indice, irA, pausar, reanudar } = useCarrusel(paginas.length, 6000)

  return (
    <section className="seccion contenedor">
      <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2>¿En qué puedo acompañarte?</h2>
      </FadeInSection>

      <div onMouseEnter={pausar} onMouseLeave={reanudar} style={{ position: 'relative' }}>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="carrusel-especialidades-track"
            style={{
              display: 'flex',
              transform: `translateX(-${indice * 100}%)`,
              transition: 'transform 0.6s var(--ease-expo)',
            }}
          >
            {paginas.map((grupo, pagIndex) => (
              <div
                key={pagIndex}
                className="grid-especialidades"
                style={{ minWidth: '100%', flexShrink: 0 }}
              >
                {grupo.map((esp, i) => (
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
            ))}
          </div>
        </div>

        {/* Indicadores (dots) — una página del carrusel = un dot */}
        {paginas.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            {paginas.map((_, i) => (
              <button
                key={i}
                onClick={() => irA(i)}
                aria-label={`Ver especialidades, página ${i + 1}`}
                style={{
                  width: i === indice ? 22 : 8,
                  height: 8,
                  borderRadius: '4px',
                  background: i === indice ? 'var(--color-cta)' : 'var(--color-sage-medio)',
                  transition: 'var(--transition-rapida)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default EspecialidadesPreview