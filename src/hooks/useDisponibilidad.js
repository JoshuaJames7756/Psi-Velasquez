import { useEffect, useState } from 'react'

export function useDisponibilidad(fecha) {
  const [slots, setSlots] = useState([])
  const [disponible, setDisponible] = useState(null)
  const [motivo, setMotivo] = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (!fecha) {
      setSlots([])
      setDisponible(null)
      return
    }

    setCargando(true)
    fetch(`/api/disponibilidad?fecha=${fecha}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || [])
        setDisponible(data.disponible)
        setMotivo(data.motivo)
      })
      .catch(() => {
        setSlots([])
        setDisponible(false)
        setMotivo('error')
      })
      .finally(() => setCargando(false))
  }, [fecha])

  return { slots, disponible, motivo, cargando }
}
