import { useState } from 'react'
import { useVideos } from '../hooks/useVideos'
import VideoCard from '../components/ui/VideoCard'
import VideoModal from '../components/ui/VideoModal'
import { useSEO } from '../hooks/useSEO'
import { seo } from '../data/contenido'

function Videos() {
  useSEO(seo.paginas.videos)

  const { videos, cargando } = useVideos()
  const [videoActivo, setVideoActivo] = useState(null)

  return (
    <div className="seccion contenedor">
      <h1>Contenido en video</h1>
      <p style={{ maxWidth: 500, marginBottom: '2rem' }}>
        Reflexiones y tips sobre salud mental, directo desde Instagram y TikTok.
      </p>

      {cargando && <p>Cargando videos…</p>}

      {!cargando && videos.length === 0 && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>
          Muy pronto vas a encontrar aquí contenido en video.
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} onPlay={setVideoActivo} />
        ))}
      </div>

      <VideoModal video={videoActivo} onClose={() => setVideoActivo(null)} />
    </div>
  )
}

export default Videos
