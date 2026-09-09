import FadeInSection from '../ui/FadeInSection'

// IMPORTANTE: nunca inventar testimonios de pacientes reales.
// Este array se completa con testimonios auténticos que Rebeca provea
// (idealmente gestionables desde el panel admin en una futura iteración).
const testimonios = []

function Testimonios() {
  if (testimonios.length === 0) {
    // Mientras no haya testimonios reales, la sección simplemente no se
    // renderiza — evita espacio vacío o contenido de relleno poco ético
    // para un sitio de salud mental.
    return null
  }

  return (
    <section className="seccion contenedor">
      <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <h2>Lo que dicen quienes ya dieron el paso</h2>
      </FadeInSection>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {testimonios.map((t, i) => (
          <FadeInSection key={i} as="blockquote" style={{ background: 'var(--color-blanco)', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-suave)' }}>
            <p style={{ fontStyle: 'italic' }}>&ldquo;{t.texto}&rdquo;</p>
            <footer style={{ marginTop: '1rem', fontSize: 'var(--fs-small)' }}>— {t.autor}</footer>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}

export default Testimonios
