import { useState } from 'react'
import { useVideos } from '../../hooks/useVideos'
import VideoCard from '../ui/VideoCard'
import VideoModal from '../ui/VideoModal'
import FadeInSection from '../ui/FadeInSection'

function VideosPreview() {
  const { videos, cargando } = useVideos(4)
  const [videoActivo, setVideoActivo] = useState(null)

  // Si aún no hay videos cargados (panel vacío al inicio), no se muestra
  // sección vacía — evita mal aspecto antes de que Rebeca suba contenido.
  if (!cargando && videos.length === 0) return null

  return (
    <section className="seccion contenedor">
      <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <h2>Contenido para acompañarte</h2>
        <p>Tips y reflexiones sobre salud mental en video</p>
      </FadeInSection>

      {cargando ? (
        <p style={{ textAlign: 'center' }}>Cargando videos…</p>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
            }}
          >
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} onPlay={setVideoActivo} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a
              href="/videos"
              className="btn btn-outline"
            >
              Ver más en Instagram
            </a>
          </div>
        </>
      )}

      <VideoModal video={videoActivo} onClose={() => setVideoActivo(null)} />
    </section>
  )
}

export default VideosPreview
