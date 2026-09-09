// ============================================
// /api/videos — Vercel Serverless Function
// GET    -> lista videos activos (público, para Inicio y página Videos)
// POST   -> agrega un video nuevo (admin, solo pega la URL)
// PATCH  -> edita/reordena/desactiva un video (admin)
// DELETE -> elimina un video (admin)
// ============================================
import { neon } from '@neondatabase/serverless'
import { requireAdmin } from '../src/lib/auth.js'

const sql = neon(process.env.DATABASE_URL)

function detectarPlataforma(url) {
  if (url.includes('tiktok.com')) return 'tiktok'
  if (url.includes('instagram.com')) return 'instagram'
  return 'otro'
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { limite } = req.query
    try {
      const videos = limite
        ? await sql`
            SELECT id, url, plataforma, titulo, miniatura_url, orden
            FROM videos WHERE activo = true
            ORDER BY orden ASC, creado_en DESC
            LIMIT ${parseInt(limite, 10)}
          `
        : await sql`
            SELECT id, url, plataforma, titulo, miniatura_url, orden
            FROM videos WHERE activo = true
            ORDER BY orden ASC, creado_en DESC
          `
      return res.status(200).json({ videos })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al cargar videos' })
    }
  }

  // POST, PATCH y DELETE modifican datos — requieren sesión admin.
  const auth = await requireAdmin(req, res)
  if (!auth) return

  if (req.method === 'POST') {
    const { url, titulo, orden } = req.body
    if (!url) return res.status(400).json({ error: 'Falta la URL del video' })

    try {
      const [nuevo] = await sql`
        INSERT INTO videos (url, plataforma, titulo, orden)
        VALUES (${url}, ${detectarPlataforma(url)}, ${titulo || null}, ${orden || 0})
        RETURNING *
      `
      return res.status(201).json({ video: nuevo })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al agregar el video' })
    }
  }

  if (req.method === 'PATCH') {
    const { id, titulo, orden, activo } = req.body
    if (!id) return res.status(400).json({ error: 'Falta el id del video' })

    try {
      const [actualizado] = await sql`
        UPDATE videos
        SET
          titulo = COALESCE(${titulo}, titulo),
          orden = COALESCE(${orden}, orden),
          activo = COALESCE(${activo}, activo)
        WHERE id = ${id}
        RETURNING *
      `
      return res.status(200).json({ video: actualizado })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al actualizar el video' })
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Falta el id del video' })

    try {
      await sql`DELETE FROM videos WHERE id = ${id}`
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al eliminar el video' })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
