function VideoCard({ video, onPlay }) {
  return (
    <button
      onClick={() => onPlay(video)}
      className="video-card"
      style={{
        position: 'relative',
        aspectRatio: '9/16',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: video.miniatura_url
          ? `url(${video.miniatura_url}) center/cover`
          : 'linear-gradient(135deg, var(--color-sage-suave), var(--color-arena-hero))',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
        boxShadow: 'var(--shadow-suave)',
      }}
      aria-label={`Reproducir video: ${video.titulo || 'video de Rebeca'}`}
    >
      {/* Degradado inferior — da legibilidad al título sobre cualquier
          imagen, igual que hace Instagram en sus propias miniaturas. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(30,28,24,0.65) 0%, rgba(30,28,24,0) 45%)',
        }}
      />

      {/* Botón play centrado — se agranda ligeramente en hover, invita al clic */}
      <span
        className="video-card-play"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          transition: 'transform 0.3s ease',
        }}
      >
        ▶
      </span>

      {video.titulo && (
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '0.9rem 0.75rem',
            color: 'var(--color-blanco)',
            fontSize: 'var(--fs-small)',
            fontWeight: 500,
            textAlign: 'left',
            lineHeight: 1.3,
          }}
        >
          {video.titulo}
        </span>
      )}
    </button>
  )
}

export default VideoCard
