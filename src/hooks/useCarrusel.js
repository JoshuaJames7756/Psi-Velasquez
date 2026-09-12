import { useEffect, useRef, useState } from 'react'

/**
 * Carrusel simple: avanza al siguiente índice cada `intervaloMs`, se
 * pausa mientras el mouse está encima (o el usuario interactúa), y
 * respeta prefers-reduced-motion (no avanza solo si el usuario lo pidió).
 */
export function useCarrusel(totalItems, intervaloMs = 5000) {
  const [indice, setIndice] = useState(0)
  const [pausado, setPausado] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const prefiereMovimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pausado || prefiereMovimientoReducido || totalItems <= 1) return

    timerRef.current = setInterval(() => {
      setIndice((prev) => (prev + 1) % totalItems)
    }, intervaloMs)

    return () => clearInterval(timerRef.current)
  }, [pausado, totalItems, intervaloMs])

  const irA = (i) => setIndice(i)
  const pausar = () => setPausado(true)
  const reanudar = () => setPausado(false)

  return { indice, irA, pausar, reanudar }
}
