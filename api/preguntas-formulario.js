// ============================================
// /api/preguntas-formulario — Vercel Serverless Function
// GET   -> lista preguntas activas (usado por el formulario público)
// PATCH -> admin edita/activa/desactiva una pregunta (usado por el panel)
// ============================================
import { neon } from '@neondatabase/serverless'
import { requireAdmin } from '../src/lib/auth.js'

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const preguntas = await sql`
        SELECT id, clave, etiqueta, tipo, opciones, obligatorio, orden
        FROM preguntas_formulario
        WHERE activo = true
        ORDER BY orden ASC
      `
      return res.status(200).json({ preguntas })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al cargar el formulario' })
    }
  }

  // PATCH y POST modifican el formulario — requieren sesión admin.
  const auth = await requireAdmin(req, res)
  if (!auth) return

  if (req.method === 'PATCH') {
    const { id, etiqueta, tipo, opciones, obligatorio, orden, activo } = req.body

    if (!id) {
      return res.status(400).json({ error: 'Falta el id de la pregunta' })
    }

    try {
      const [actualizada] = await sql`
        UPDATE preguntas_formulario
        SET
          etiqueta = COALESCE(${etiqueta}, etiqueta),
          tipo = COALESCE(${tipo}, tipo),
          opciones = COALESCE(${opciones ? JSON.stringify(opciones) : null}, opciones),
          obligatorio = COALESCE(${obligatorio}, obligatorio),
          orden = COALESCE(${orden}, orden),
          activo = COALESCE(${activo}, activo)
        WHERE id = ${id}
        RETURNING *
      `
      return res.status(200).json({ pregunta: actualizada })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al actualizar la pregunta' })
    }
  }

  if (req.method === 'POST') {
    const { clave, etiqueta, tipo, opciones, obligatorio, orden } = req.body

    if (!clave || !etiqueta || !tipo) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (clave, etiqueta, tipo)' })
    }

    try {
      const [nueva] = await sql`
        INSERT INTO preguntas_formulario (clave, etiqueta, tipo, opciones, obligatorio, orden)
        VALUES (${clave}, ${etiqueta}, ${tipo}, ${JSON.stringify(opciones || null)}, ${obligatorio || false}, ${orden || 0})
        RETURNING *
      `
      return res.status(201).json({ pregunta: nueva })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al crear la pregunta (¿clave duplicada?)' })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
