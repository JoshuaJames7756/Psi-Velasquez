import { useState } from 'react'
import { useVideos } from '../hooks/useVideos'
import VideoCard from '../components/ui/VideoCard'
import VideoModal from '../components/ui/VideoModal'
import VideoSpotlight from '../components/ui/VideoSpotlight'
import FadeInSection from '../components/ui/FadeInSection'
import BlobDecorativo from '../components/ui/BlobDecorativo'
import { useSEO } from '../hooks/useSEO'
import { seo } from '../data/contenido'

function Videos() {
  useSEO(seo.paginas.videos)

  const { videos, cargando } = useVideos()
  const [videoActivo, setVideoActivo] = useState(null)

  // Con pocos videos (1-2), el spotlight (video grande + texto al lado)
  // se ve mucho mejor que un grid de tarjetas chicas perdidas. Con 3+,
  // el grid normal ya se ve lleno y con buena proporción.
  const usarSpotlight = videos.length > 0 && videos.length <= 2

  return (
    <div className="seccion contenedor" style={{ position: 'relative' }}>
      <BlobDecorativo
        variante={2}
        color="var(--color-terracota-suave)"
        opacity={0.28}
        style={{ width: 340, height: 340, top: '-60px', left: '-160px', zIndex: -1 }}
      />

      <FadeInSection as="div">
        <h1>Contenido en video</h1>
        <p style={{ maxWidth: 500, marginBottom: '2rem' }}>
          Reflexiones y tips sobre salud mental, directo desde Instagram y TikTok.
        </p>
      </FadeInSection>

      {cargando && <p>Cargando videos…</p>}

      {!cargando && videos.length === 0 && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>
          Muy pronto vas a encontrar aquí contenido en video.
        </p>
      )}

      {!cargando && usarSpotlight && (
        <FadeInSection as="div" style={{ marginTop: '2rem' }}>
          <VideoSpotlight videos={videos} onPlay={setVideoActivo} mostrarTexto={false} mostrarCTA={false} />
        </FadeInSection>
      )}

      {!cargando && !usarSpotlight && videos.length > 0 && (
        <div
          className="grid-videos"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(videos.length, 4)}, 280px)`,
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {videos.map((v, i) => (
            <FadeInSection key={v.id} delay={i * 60}>
              <VideoCard video={v} onPlay={setVideoActivo} />
            </FadeInSection>
          ))}
        </div>
      )}

      <VideoModal video={videoActivo} onClose={() => setVideoActivo(null)} />
    </div>
  )
}

export default Videos
