import { useEffect, useState } from 'react'

export function usePreguntasFormulario() {
  const [preguntas, setPreguntas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('/api/preguntas-formulario')
      .then((r) => r.json())
      .then((data) => setPreguntas(data.preguntas || []))
      .catch(() => setPreguntas([]))
      .finally(() => setCargando(false))
  }, [])

  return { preguntas, cargando }
}
