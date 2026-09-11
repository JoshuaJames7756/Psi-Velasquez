import { useRef } from 'react'

/**
 * Aplica una inclinación 3D sutil que sigue el cursor dentro del elemento.
 * Se desactiva sola en touch (mobile) porque no hay "hover" real ahí.
 * Uso: const tiltProps = useTilt(); <div {...tiltProps}>
 */
export function useTilt(intensidad = 6) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    el.style.transform = `perspective(800px) rotateY(${x * intensidad}deg) rotateX(${-y * intensidad}deg) translateY(-6px)`
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}
