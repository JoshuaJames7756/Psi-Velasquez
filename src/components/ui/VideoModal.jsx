import { useEffect, useRef } from 'react'

/**
 * Carga el script embed.js de Instagram o TikTok. Si ya estaba cargado,
 * lo elimina y lo vuelve a inyectar — TikTok en particular solo procesa
 * los blockquote.tiktok-embed presentes en el DOM en el momento exacto
 * en que su script se ejecuta la primera vez; si el modal se reabre con
 * un video distinto reutilizando el mismo script ya cargado, a veces
 * termina embebiendo la URL de la página actual en vez del video.
 * Recargar el script garantiza que siempre procese el blockquote actual.
 */
function cargarScriptEmbed(plataforma) {
  if (plataforma === 'tiktok') {
    const anterior = document.getElementById('tiktok-embed-script')
    if (anterior) anterior.remove()

    const script = document.createElement('script')
    script.id = 'tiktok-embed-script'
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    return
  }

  // Instagram sí reprocesa correctamente con Embeds.process(), no hace
  // falta recargar el script cada vez.
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
  const blockquoteRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (!video) return
    // Se espera un tick para asegurar que el blockquote con el cite/
    // data-instgrm-permalink correcto ya esté en el DOM antes de que el
    // script intente procesarlo.
    const id = setTimeout(() => cargarScriptEmbed(video.plataforma), 0)
    return () => clearTimeout(id)
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

          {video.plataforma === 'tiktok' ? (
            <blockquote
              key={video.url}
              ref={blockquoteRef}
              className="tiktok-embed"
              cite={video.url}
              data-video-id={video.url.match(/\/video\/(\d+)/)?.[1] || ''}
              style={{ margin: '0 auto', maxWidth: '100%' }}
            >
              <section>
                <a target="_blank" rel="noopener noreferrer" title={video.titulo || 'Ver en TikTok'} href={video.url}>
                  {video.titulo || 'Ver en TikTok'}
                </a>
              </section>
            </blockquote>
          ) : (
            <blockquote
              key={video.url}
              className="instagram-media"
              data-instgrm-permalink={video.url}
              data-instgrm-version="14"
              style={{ margin: 0, width: '100%' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoModal
