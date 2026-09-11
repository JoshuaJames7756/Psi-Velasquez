/**
 * Divisor de sección: una curva suave en vez de un corte recto entre dos
 * bloques de color. `colorSuperior` debe coincidir con el fondo de la
 * sección que queda arriba (el SVG "tapa" el borde con ese color).
 */
function DivisorCurva({ colorSuperior = 'var(--color-fondo-crema)', invertido = false }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: invertido ? 'scaleY(-1)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '60px', display: 'block' }}
      >
        <path
          d="M0,40 C300,90 900,-10 1200,40 L1200,0 L0,0 Z"
          fill={colorSuperior}
        />
      </svg>
    </div>
  )
}

export default DivisorCurva
