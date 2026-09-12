import { useState } from 'react'
import { useVideos } from '../../hooks/useVideos'
import VideoCard from '../ui/VideoCard'
import VideoModal from '../ui/VideoModal'
import VideoSpotlight from '../ui/VideoSpotlight'
import FadeInSection from '../ui/FadeInSection'
import DivisorCurva from '../ui/DivisorCurva'

function VideosPreview() {
  const { videos, cargando } = useVideos(4)
  const [videoActivo, setVideoActivo] = useState(null)

  // Si aún no hay videos cargados (panel vacío al inicio), no se muestra
  // sección vacía — evita mal aspecto antes de que Rebeca suba contenido.
  if (!cargando && videos.length === 0) return null

  // Con pocos videos (1-2), un grid centrado se ve perdido en una pantalla
  // ancha sin importar el tamaño de card. En ese caso se usa un layout
  // "spotlight": video(s) grande(s) + texto al lado, con presencia real.
  // Con 3 o más, el grid normal ya se ve lleno y con buena proporción.
  const usarSpotlight = videos.length <= 2

  return (
    <>
      {/* Fondo propio (sage muy claro) para que la sección tenga
          separación visual real frente a Testimonios, que también es
          crema — sin esto, dos secciones consecutivas del mismo color
          se sienten "pegadas" aunque técnicamente no lo estén. */}
      <DivisorCurva colorSuperior="var(--color-sage-medio)" />
      <section
        className="seccion contenedor"
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-sage-medio)' }}
      >
        {!usarSpotlight && (
          <FadeInSection as="div" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
            <h2>Contenido para acompañarte</h2>
            <p>Tips y reflexiones sobre salud mental en video</p>
          </FadeInSection>
        )}

        {cargando ? (
          <p style={{ textAlign: 'center' }}>Cargando videos…</p>
        ) : usarSpotlight ? (
          <FadeInSection as="div">
            <VideoSpotlight videos={videos} onPlay={setVideoActivo} />
          </FadeInSection>
        ) : (
          <>
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
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="/videos" className="btn btn-outline">
                Ver más en Instagram
              </a>
            </div>
          </>
        )}

        <VideoModal video={videoActivo} onClose={() => setVideoActivo(null)} />
      </section>
      <DivisorCurva colorSuperior="var(--color-fondo-crema)" invertido />
    </>
  )
}

export default VideosPreview
