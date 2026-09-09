import { useEffect } from 'react'

function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

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
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-blanco)',
          borderRadius: 'var(--radius-md)',
          maxWidth: 400,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} aria-label="Cerrar" style={{ fontSize: '1.5rem' }}>
            ×
          </button>
        </div>
        {/* Embed nativo — Instagram/TikTok requieren su script embed.js cargado
            globalmente (agregar en index.html) para renderizar correctamente.
            Como fallback simple mientras se integra el script oficial: */}
        <div style={{ padding: '0 1rem 1.5rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            {video.titulo || 'Mira este video en su plataforma original:'}
          </p>
          <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primario">
            Ver en {video.plataforma === 'tiktok' ? 'TikTok' : 'Instagram'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
