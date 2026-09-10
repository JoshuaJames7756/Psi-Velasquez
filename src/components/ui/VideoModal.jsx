import { useEffect } from 'react'

/**
 * Carga el script embed.js de Instagram una sola vez por sesión, y le pide
 * reprocesar el DOM cuando aparece un nuevo embed (por ejemplo, al abrir
 * el modal con un video distinto).
 */
function cargarScriptEmbedInstagram() {
  const idScript = 'instagram-embed-script'

  if (document.getElementById(idScript)) {
    if (window.instgrm) window.instgrm.Embeds.process()
    return
  }

  const script = document.createElement('script')
  script.id = idScript
  script.src = 'https://www.instagram.com/embed.js'
  script.async = true
  document.body.appendChild(script)
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (video) cargarScriptEmbedInstagram()
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

        <div style={{ padding: '0 0.5rem 1rem', minHeight: 200 }}>
          {video.titulo && (
            <p style={{ padding: '0 0.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
              {video.titulo}
            </p>
          )}

          <blockquote
            className="instagram-media"
            data-instgrm-permalink={video.url}
            data-instgrm-version="14"
            style={{ margin: 0, width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default VideoModal
