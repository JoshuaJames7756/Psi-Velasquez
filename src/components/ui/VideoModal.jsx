import { useEffect, useRef } from 'react'

/**
 * Carga el script embed.js de Instagram o TikTok una sola vez por sesión,
 * y le pide que procese los embeds nuevos que aparezcan en el DOM.
 */
function cargarScriptEmbed(plataforma) {
  const idScript = plataforma === 'tiktok' ? 'tiktok-embed-script' : 'instagram-embed-script'
  const src = plataforma === 'tiktok'
    ? 'https://www.tiktok.com/embed.js'
    : 'https://www.instagram.com/embed.js'

  const existente = document.getElementById(idScript)
  if (existente) {
    // El script ya está cargado — se le pide reprocesar el DOM.
    if (plataforma === 'instagram' && window.instgrm) {
      window.instgrm.Embeds.process()
    }
    // TikTok reprocesa automáticamente vía MutationObserver interno, no
    // requiere una llamada manual como Instagram.
    return
  }

  const script = document.createElement('script')
  script.id = idScript
  script.src = src
  script.async = true
  document.body.appendChild(script)
}

function VideoModal({ video, onClose }) {
  const contenedorRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (video) cargarScriptEmbed(video.plataforma)
  }, [video])

  if (!video) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(50,50,50,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-blanco)',
          borderRadius: 'var(--radius-md)',
          maxWidth: 420,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0.5rem 0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} aria-label="Cerrar" style={{ fontSize: '1.5rem' }}>
            ×
          </button>
        </div>

        <div ref={contenedorRef} style={{ padding: '0 0.5rem 1rem', minHeight: 200 }}>
          {video.plataforma === 'instagram' && (
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={video.url}
              data-instgrm-version="14"
              style={{ margin: 0, width: '100%' }}
            />
          )}

          {video.plataforma === 'tiktok' && (
            <blockquote
              className="tiktok-embed"
              cite={video.url}
              style={{ margin: '0 auto' }}
            >
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.titulo || 'Ver en TikTok'}
              </a>
            </blockquote>
          )}

          {video.plataforma !== 'instagram' && video.plataforma !== 'tiktok' && (
            <div style={{ padding: '0 1rem' }}>
              <p style={{ marginBottom: '1rem' }}>{video.titulo || 'Mira este video:'}</p>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primario">
                Ver video
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoModal
