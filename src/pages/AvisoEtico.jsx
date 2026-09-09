import { avisoEtico, seo } from '../data/contenido'
import { useSEO } from '../hooks/useSEO'

function AvisoEtico() {
  useSEO(seo.paginas.avisoEtico)

  return (
    <div className="seccion contenedor">
      <h1>Aviso Ético</h1>
      {avisoEtico.split('\n\n').map((parrafo, i) => (
        <p key={i} style={{ marginBottom: '1rem' }}>{parrafo}</p>
      ))}
    </div>
  )
}

export default AvisoEtico
