import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

export function useBloqueos() {
  const { getToken } = useAuth()
  const [bloqueos, setBloqueos] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const token = await getToken()
      const res = await fetch('/api/admin/bloqueos', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setBloqueos(data.bloqueos || [])
    } finally {
      setCargando(false)
    }
  }, [getToken])

  useEffect(() => {
    cargar()
  }, [cargar])

  const agregarBloqueo = async (fecha, motivo) => {
    const token = await getToken()
    const res = await fetch('/api/admin/bloqueos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ fecha, motivo }),
    })
    if (res.ok) await cargar()
    return res.ok
  }

  const quitarBloqueo = async (id) => {
    const token = await getToken()
    const res = await fetch('/api/admin/bloqueos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    })
    if (res.ok) await cargar()
    return res.ok
  }

  return { bloqueos, cargando, agregarBloqueo, quitarBloqueo }
}
