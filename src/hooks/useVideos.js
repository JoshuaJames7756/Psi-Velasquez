import { useEffect, useState } from 'react'

export function useVideos(limite = null) {
  const [videos, setVideos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const query = limite ? `?limite=${limite}` : ''
    fetch(`/api/videos${query}`)
      .then((r) => r.json())
      .then((data) => setVideos(data.videos || []))
      .catch((err) => setError(err))
      .finally(() => setCargando(false))
  }, [limite])

  return { videos, cargando, error }
}
