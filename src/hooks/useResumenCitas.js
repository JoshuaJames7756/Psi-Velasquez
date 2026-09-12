import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '@clerk/clerk-react'

export function useResumenCitas() {
  const { getToken } = useAuth()
  const [citas, setCitas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true
    async function cargar() {
      setCargando(true)
      try {
        const token = await getToken()
        const res = await fetch('/api/admin/citas', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (activo) setCitas(data.citas || [])
      } finally {
        if (activo) setCargando(false)
      }
    }
    cargar()
    return () => { activo = false }
  }, [getToken])

  const resumen = useMemo(() => {
    const hoy = new Date().toISOString().slice(0, 10)

    const pendientes = citas.filter((c) => c.estado === 'pendiente')
    const confirmadas = citas.filter((c) => c.estado === 'confirmada')

    // Próxima cita confirmada, ordenada por fecha/hora ascendente, solo futuras
    const proxima = confirmadas
      .filter((c) => c.fecha >= hoy)
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))[0] || null

    const citasHoy = confirmadas.filter((c) => c.fecha === hoy)

    return {
      totalPendientes: pendientes.length,
      totalConfirmadas: confirmadas.length,
      citasHoy: citasHoy.length,
      proxima,
    }
  }, [citas])

  return { resumen, cargando }
}
