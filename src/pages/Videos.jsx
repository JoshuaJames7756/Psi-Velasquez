import { useState } from 'react'
import { useVideos } from '../hooks/useVideos'
import VideoCard from '../components/ui/VideoCard'
import VideoModal from '../components/ui/VideoModal'
import FadeInSection from '../components/ui/FadeInSection'
import BlobDecorativo from '../components/ui/BlobDecorativo'
import { useSEO } from '../hooks/useSEO'
import { seo } from '../data/contenido'

function Videos() {
  useSEO(seo.paginas.videos)

  const { videos, cargando } = useVideos()
  const [videoActivo, setVideoActivo] = useState(null)

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
          Reflexiones y tips sobre salud mental, directo desde Instagram.
        </p>
      </FadeInSection>

      {cargando && <p>Cargando videos…</p>}

      {!cargando && videos.length === 0 && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>
          Muy pronto vas a encontrar aquí contenido en video.
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 220px))', justifyContent: 'center', gap: '1.5rem' }}>
        {videos.map((v, i) => (
          <FadeInSection key={v.id} delay={i * 60}>
            <VideoCard video={v} onPlay={setVideoActivo} />
          </FadeInSection>
        ))}
      </div>

      <VideoModal video={videoActivo} onClose={() => setVideoActivo(null)} />
    </div>
  )
}

export default Videos
