import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

export function useCitasAdmin(filtroEstado) {
  const { getToken } = useAuth()
  const [citas, setCitas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const token = await getToken()
      const query = filtroEstado ? `?estado=${filtroEstado}` : ''
      const res = await fetch(`/api/admin/citas${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setCitas(data.citas || [])
    } catch (err) {
      setError(err)
    } finally {
      setCargando(false)
    }
  }, [filtroEstado, getToken])

  useEffect(() => {
    cargar()
  }, [cargar])

  const actualizarEstado = async (id, estado, notaAdmin) => {
    const token = await getToken()
    const res = await fetch('/api/citas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, estado, nota_admin: notaAdmin }),
    })
    if (res.ok) await cargar()
    return res.ok
  }

  return { citas, cargando, error, recargar: cargar, actualizarEstado }
}
