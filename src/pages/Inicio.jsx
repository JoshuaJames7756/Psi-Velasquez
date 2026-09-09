import Hero from '../components/home/Hero'
import EspecialidadesPreview from '../components/home/EspecialidadesPreview'
import PorQueTerapia from '../components/home/PorQueTerapia'
import Testimonios from '../components/home/Testimonios'
import VideosPreview from '../components/home/VideosPreview'
import CtaFinal from '../components/home/CtaFinal'
import { useSEO } from '../hooks/useSEO'
import { seo } from '../data/contenido'

function Inicio() {
  useSEO(seo.paginas.inicio)

  return (
    <div>
      <div className="contenedor">
        <Hero />
      </div>
      <EspecialidadesPreview />
      <PorQueTerapia />
      <Testimonios />
      <VideosPreview />
      <CtaFinal />
    </div>
  )
}

export default Inicio
