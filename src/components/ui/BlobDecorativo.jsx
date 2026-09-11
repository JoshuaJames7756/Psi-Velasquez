/**
 * Formas orgánicas decorativas (blobs) en SVG puro, coherentes con la
 * paleta de marca. Se usan como fondo detrás de secciones para romper
 * la planicie del color sólido, sin depender de imágenes ni librerías.
 *
 * Son puramente decorativas (aria-hidden) y se posicionan absolutas
 * dentro de un contenedor con position: relative.
 */

function BlobDecorativo({ variante = 1, color = 'var(--color-sage-suave)', style = {}, opacity = 0.5 }) {
  const formas = {
    1: 'M42.8,-62.2C54.4,-54.2,61.6,-39.8,66.4,-24.7C71.2,-9.7,73.6,6,70.1,20.2C66.6,34.5,57.2,47.3,44.6,55.8C32.1,64.3,16.1,68.5,-0.4,69.1C-16.8,69.7,-33.6,66.7,-46.5,57.8C-59.5,48.9,-68.6,34,-72.1,17.6C-75.6,1.2,-73.5,-16.7,-65.6,-31.2C-57.7,-45.7,-44,-56.8,-29.5,-64.1C-15,-71.5,0.2,-75,15.6,-72.7C31,-70.4,41.2,-70.1,42.8,-62.2Z',
    2: 'M38.7,-52.9C50.6,-45.6,60.9,-34.6,65.6,-21.2C70.3,-7.8,69.4,8,63.8,21.3C58.2,34.6,47.9,45.4,35.5,53.2C23.1,61,11.6,65.9,-1.4,68.2C-14.3,70.5,-28.7,70.2,-40.6,63.6C-52.6,57.1,-62.2,44.2,-67.8,29.9C-73.4,15.5,-75,-0.4,-71.1,-14.6C-67.2,-28.8,-57.8,-41.3,-45.6,-48.7C-33.4,-56,-16.7,-58.3,-1.5,-56.3C13.7,-54.4,26.8,-60.2,38.7,-52.9Z',
    3: 'M45.3,-58.4C57.9,-50.5,66.5,-35.9,70.3,-19.9C74.1,-3.9,73.1,13.6,66.2,28.4C59.3,43.2,46.5,55.4,31.5,62.3C16.6,69.2,-0.6,70.9,-17.1,67.3C-33.6,63.7,-49.5,54.9,-59.8,41.6C-70.1,28.3,-74.8,10.5,-72.6,-6.1C-70.4,-22.7,-61.3,-38.1,-48.4,-46.2C-35.6,-54.3,-17.8,-55.1,-0.3,-54.7C17.2,-54.3,32.6,-66.3,45.3,-58.4Z',
  }

  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
    >
      <path d={formas[variante] || formas[1]} fill={color} opacity={opacity} />
    </svg>
  )
}

export default BlobDecorativo
