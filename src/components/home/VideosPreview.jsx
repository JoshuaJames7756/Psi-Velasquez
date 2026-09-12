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

  // El ancho del contenedor del grid se ajusta a la cantidad real de
  // videos (hasta un máximo de 4 tarjetas de 280px + espaciado), así una
  // sola tarjeta no se estira a ocupar todo el ancho disponible ni queda
  // perdida en una pantalla ancha — el espacio se siente intencional.
  const anchoGrid = Math.min(videos.length, 4) * 280 + (Math.min(videos.length, 4) - 1) * 32

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
            className="grid-videos"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(videos.length, 4)}, 280px)`,
              justifyContent: 'center',
              gap: '2rem',
              maxWidth: anchoGrid,
              margin: '0 auto',
            }}
          >
            {videos.map((v, i) => (
              <FadeInSection key={v.id} delay={i * 60}>
                <VideoCard video={v} onPlay={setVideoActivo} />
              </FadeInSection>
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
