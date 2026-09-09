import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

export function usePreguntasAdmin() {
  const { getToken } = useAuth()
  const [preguntas, setPreguntas] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      // Reutiliza el endpoint público (solo trae activas); para el panel
      // esto es suficiente ya que las inactivas no se muestran nunca.
      const res = await fetch('/api/preguntas-formulario')
      const data = await res.json()
      setPreguntas(data.preguntas || [])
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  const crearPregunta = async (pregunta) => {
    const token = await getToken()
    const res = await fetch('/api/preguntas-formulario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(pregunta),
    })
    if (res.ok) await cargar()
    return res.ok
  }

  const desactivarPregunta = async (id) => {
    const token = await getToken()
    const res = await fetch('/api/preguntas-formulario', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, activo: false }),
    })
    if (res.ok) await cargar()
    return res.ok
  }

  return { preguntas, cargando, crearPregunta, desactivarPregunta }
}
