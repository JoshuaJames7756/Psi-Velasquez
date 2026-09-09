// ============================================
// /api/admin/bloqueos — Vercel Serverless Function
// GET    -> lista bloqueos futuros (admin)
// POST   -> agrega un bloqueo de día
// DELETE -> quita un bloqueo (reabre el día)
// ============================================
import { neon } from '@neondatabase/serverless'
import { requireAdmin } from '../../src/lib/auth.js'

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {
  const auth = await requireAdmin(req, res)
  if (!auth) return

  if (req.method === 'GET') {
    try {
      const bloqueos = await sql`
        SELECT id, fecha, motivo FROM bloqueos
        WHERE fecha >= CURRENT_DATE
        ORDER BY fecha ASC
      `
      return res.status(200).json({ bloqueos })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al listar bloqueos' })
    }
  }

  if (req.method === 'POST') {
    const { fecha, motivo } = req.body
    if (!fecha) return res.status(400).json({ error: 'Falta la fecha' })

    try {
      const [nuevo] = await sql`
        INSERT INTO bloqueos (fecha, motivo)
        VALUES (${fecha}, ${motivo || null})
        RETURNING *
      `
      return res.status(201).json({ bloqueo: nuevo })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al bloquear el día' })
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Falta el id del bloqueo' })

    try {
      await sql`DELETE FROM bloqueos WHERE id = ${id}`
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al quitar el bloqueo' })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
