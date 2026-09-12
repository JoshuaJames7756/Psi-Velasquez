import FadeInSection from '../ui/FadeInSection'
import BlobDecorativo from '../ui/BlobDecorativo'

// ⚠️ MOCK — TESTIMONIOS DE PRUEBA, NO SON REALES.
// Solo están aquí para ver cómo se vería la sección visualmente.
// Antes de publicar el sitio, reemplazar por testimonios reales que
// Rebeca provea, o vaciar el array (testimonios = []) para que la
// sección vuelva a ocultarse — nunca lanzar con estos textos de ejemplo.
const testimonios = [
  {
    texto: 'Llegué sintiéndome perdida y encontré un espacio donde realmente pude hablar sin sentirme juzgada. Hoy tengo herramientas que uso todos los días.',
    autor: 'Paciente — Ansiedad',
  },
  {
    texto: 'Rebeca tiene una forma muy humana de acompañar. Nunca sentí que estaba "en terapia", sentí que estaba conversando con alguien que realmente entendía.',
    autor: 'Paciente — Procesos de salud',
  },
  {
    texto: 'Después de meses dudando si buscar ayuda, dar el paso fue lo mejor que hice. El proceso fue claro desde la primera sesión.',
    autor: 'Paciente — Primera vez en terapia',
  },
]

function Testimonios() {
  if (testimonios.length === 0) {
    // Mientras no haya testimonios reales, la sección simplemente no se
    // renderiza — evita espacio vacío o contenido de relleno poco ético
    // para un sitio de salud mental.
    return null
  }

  return (
    <section className="seccion contenedor" style={{ position: 'relative', overflow: 'hidden' }}>
      <BlobDecorativo
        variante={3}
        color="var(--color-sage-suave)"
        opacity={0.25}
        style={{ width: 340, height: 340, top: '-80px', right: '-140px', zIndex: -1 }}
      />
      <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <h2>Lo que dicen quienes ya dieron el paso</h2>
      </FadeInSection>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {testimonios.map((t, i) => (
          <FadeInSection
            key={i}
            as="blockquote"
            delay={i * 80}
            style={{
              background: 'var(--color-blanco)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-suave)',
              border: '1px solid var(--color-card-border)',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif-titulos)',
                fontSize: '3rem',
                color: 'var(--color-sage-suave)',
                lineHeight: 0.5,
                display: 'block',
                marginBottom: '0.75rem',
              }}
              aria-hidden="true"
            >
              "
            </span>
            <p style={{ fontStyle: 'italic', color: 'var(--color-texto-principal)' }}>{t.texto}</p>
            <footer style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--color-sage-medio)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-texto-principal)',
                  flexShrink: 0,
                }}
              >
                {t.autor.charAt(0)}
              </span>
              <span style={{ fontSize: 'var(--fs-small)', color: 'var(--color-texto-secundario)' }}>{t.autor}</span>
            </footer>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}

export default Testimonios
