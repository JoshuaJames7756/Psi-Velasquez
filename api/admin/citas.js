// ============================================
// /api/admin/citas — Vercel Serverless Function
// GET -> lista TODAS las citas con sus respuestas del formulario,
//        para el panel de Rebeca. Requiere sesión Clerk válida (admin).
// ============================================
import { neon } from '@neondatabase/serverless'
import { requireAdmin } from '../../src/lib/auth.js'

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {
  const auth = await requireAdmin(req, res)
  if (!auth) return // requireAdmin ya respondió 401

  if (req.method === 'GET') {
    const { estado } = req.query // opcional: filtrar por 'pendiente' | 'confirmada' | 'cancelada'

    try {
      const citas = estado
        ? await sql`
            SELECT id, nombre_paciente, telefono, email, motivo, primera_vez,
                   fecha, hora, estado, respuestas_formulario, nota_admin, creado_en
            FROM citas
            WHERE estado = ${estado}
            ORDER BY fecha ASC, hora ASC
          `
        : await sql`
            SELECT id, nombre_paciente, telefono, email, motivo, primera_vez,
                   fecha, hora, estado, respuestas_formulario, nota_admin, creado_en
            FROM citas
            ORDER BY fecha ASC, hora ASC
          `

      return res.status(200).json({ citas })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al listar solicitudes' })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
