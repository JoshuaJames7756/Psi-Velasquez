import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useVideos } from '../../hooks/useVideos'

function SeccionVideos() {
  const { getToken } = useAuth()
  const { videos, cargando } = useVideos()
  const [url, setUrl] = useState('')
  const [titulo, setTitulo] = useState('')
  const [miniaturaUrl, setMiniaturaUrl] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)
  const [listaLocal, setListaLocal] = useState(null)

  const lista = listaLocal ?? videos

  const handleAgregar = async (e) => {
    e.preventDefault()
    if (!url.trim()) return
    setGuardando(true)
    setError(null)
    try {
      const token = await getToken()
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url, titulo, miniatura_url: miniaturaUrl }),
      })
      const data = await res.json()
      if (res.ok) {
        setListaLocal([data.video, ...lista])
        setUrl('')
        setTitulo('')
        setMiniaturaUrl('')
      } else {
        setError(data.error || 'No se pudo agregar el video.')
      }
    } catch {
      setError('Hubo un problema de conexión.')
    } finally {
      setGuardando(false)
    }
  }

  const handleEliminar = async (id) => {
    const token = await getToken()
    const res = await fetch('/api/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    })
    if (res.ok) setListaLocal(lista.filter((v) => v.id !== id))
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-sans-cuerpo)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--admin-texto)' }}>
        Videos
      </h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--admin-texto-secundario)', fontSize: '0.9rem' }}>
        Pega el link de un Reel o publicación de Instagram para que aparezca en tu sitio.
        No necesitas tocar nada más.
      </p>

      {error && (
        <p style={{ color: 'var(--color-error)', marginBottom: '1rem', padding: '0.75rem', background: '#fdf1ee', borderRadius: '8px' }}>
          {error}
        </p>
      )}

      <form
        onSubmit={handleAgregar}
        style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', padding: '1.25rem', borderRadius: '14px', marginBottom: '2rem' }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>URL del video</label>
          <input
            type="url"
            required
            placeholder="https://www.instagram.com/reel/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid var(--admin-border)' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Título (opcional)</label>
          <input
            type="text"
            placeholder="Ej. 3 señales de ansiedad"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid var(--admin-border)' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            Imagen de miniatura (opcional)
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={miniaturaUrl}
            onChange={(e) => setMiniaturaUrl(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid var(--admin-border)' }}
          />
          <p style={{ fontSize: '0.85rem', color: 'var(--admin-texto-secundario)', marginTop: '0.4rem' }}>
            Instagram ya no permite tomar la miniatura automáticamente. Si quieres una
            imagen de portada, toma una captura de pantalla del video, súbela a{' '}
            <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              imgur.com
            </a>{' '}
            y pega aquí el link de la imagen. Si lo dejas vacío, se mostrará un color de
            fondo en su lugar.
          </p>
        </div>
        <button type="submit" disabled={guardando} className="btn btn-primario">
          Agregar video
        </button>
      </form>

      {cargando && <p>Cargando…</p>}
      {!cargando && lista.length === 0 && (
        <p style={{ color: 'var(--admin-texto-secundario)' }}>Aún no has agregado videos.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {lista.map((v) => (
          <div key={v.id} style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', borderRadius: '10px', padding: '0.75rem' }}>
            {v.miniatura_url && (
              <img
                src={v.miniatura_url}
                alt=""
                style={{ width: '100%', aspectRatio: '9/16', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
              />
            )}
            <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>{v.plataforma}</p>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', wordBreak: 'break-all' }}>{v.titulo || v.url}</p>
            <button
              onClick={() => handleEliminar(v.id)}
              style={{ fontSize: '0.85rem', color: 'var(--color-error)', textDecoration: 'underline' }}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeccionVideos
