import BlobDecorativo from './BlobDecorativo'
import Icono from './Icono'

/**
 * Muestra 1-2 videos en formato "spotlight": grandes, con presencia real
 * en la sección, acompañados de texto y CTA al lado — en vez de un grid
 * de tarjetas chicas que se ve perdido cuando hay poco contenido.
 */
function VideoSpotlight({ videos, onPlay, mostrarTexto = true, mostrarCTA = true }) {
  const esUno = videos.length === 1
  const hayColumnaTexto = mostrarTexto || mostrarCTA
  const anchoVideo = esUno ? (hayColumnaTexto ? 300 : 340) : (hayColumnaTexto ? 220 : 260)

  return (
    <div
      className={hayColumnaTexto ? 'grid-2-col video-spotlight-grid' : ''}
      style={{
        display: 'grid',
        gridTemplateColumns: hayColumnaTexto ? '1fr 1fr' : '1fr',
        gap: '3rem',
        alignItems: 'center',
        justifyItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <BlobDecorativo
        variante={2}
        color="var(--color-terracota-suave)"
        opacity={0.3}
        style={{ width: 320, height: 320, top: '-60px', left: '-80px', zIndex: 0 }}
      />

      {/* Video(s) grande(s) */}
      <div
        className="video-spotlight-videos"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 1,
          maxWidth: '100%',
        }}
      >
        {videos.map((v) => (
          <button
            key={v.id}
            onClick={() => onPlay(v)}
            className="video-spotlight-card"
            style={{
              position: 'relative',
              width: anchoVideo,
              aspectRatio: '9/16',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: v.miniatura_url
                ? `url(${v.miniatura_url}) center/cover`
                : 'linear-gradient(135deg, var(--color-sage-suave), var(--color-arena-hero))',
              boxShadow: 'var(--shadow-card-hover)',
              transition: 'transform 0.4s var(--ease-expo)',
            }}
            aria-label={`Reproducir: ${v.titulo || 'video de Rebeca'}`}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(30,28,24,0.6) 0%, rgba(30,28,24,0) 45%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: esUno ? 68 : 52,
                height: esUno ? 68 : 52,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: esUno ? '1.6rem' : '1.3rem',
              }}
            >
              ▶
            </div>
            {v.titulo && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem 0.85rem',
                  color: 'var(--color-blanco)',
                  fontSize: 'var(--fs-small)',
                  fontWeight: 500,
                  textAlign: 'left',
                }}
              >
                {v.titulo}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Texto acompañante — solo se renderiza si hay algo que mostrar */}
      {hayColumnaTexto && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Icono nombre="instagram" size={28} style={{ color: 'var(--color-cta)', marginBottom: '1rem' }} />
          {mostrarTexto && (
            <>
              <h3 style={{ fontSize: 'var(--fs-h2)' }}>
                {esUno ? 'Un vistazo a lo que comparto' : 'Últimos videos compartidos'}
              </h3>
              <p style={{ marginTop: '0.75rem', maxWidth: 340 }}>
                Reflexiones cortas sobre salud mental, directo desde Instagram. Voy a ir
                sumando más contenido con el tiempo.
              </p>
            </>
          )}
          {mostrarCTA && (
            <a href="/videos" className="btn btn-outline" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              Ver más en Instagram
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoSpotlight
