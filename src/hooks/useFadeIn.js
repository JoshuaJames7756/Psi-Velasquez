import { useEffect, useRef, useState } from 'react'

/**
 * Aplica la clase .visible cuando el elemento entra en viewport.
 * Uso: const [ref, visible] = useFadeIn(); <div ref={ref} className={`fade-in ${visible ? 'visible' : ''}`}>
 */
export function useFadeIn(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
