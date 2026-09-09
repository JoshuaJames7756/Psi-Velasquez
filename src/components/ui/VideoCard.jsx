function VideoCard({ video, onPlay }) {
  return (
    <button
      onClick={() => onPlay(video)}
      style={{
        position: 'relative',
        aspectRatio: '9/16',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: video.miniatura_url
          ? `url(${video.miniatura_url}) center/cover`
          : 'linear-gradient(135deg, var(--color-sage-suave), var(--color-arena-hero))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'var(--transition-suave)',
      }}
      aria-label={`Reproducir video: ${video.titulo || 'video de Rebeca'}`}
    >
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
        }}
      >
        ▶
      </span>
      {video.plataforma && (
        <span
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 'var(--fs-small)',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            textTransform: 'capitalize',
          }}
        >
          {video.plataforma}
        </span>
      )}
    </button>
  )
}

export default VideoCard
