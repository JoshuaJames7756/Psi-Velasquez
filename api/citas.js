// ============================================
// /api/citas — Vercel Serverless Function
// GET  -> lista citas ocupadas de una fecha (para pintar el calendario)
// POST -> crea una nueva cita, validando que el horario siga libre
// ============================================
import { neon } from '@neondatabase/serverless'
import { requireAdmin } from '../src/lib/auth.js'
import { notificarSolicitudRecibida, notificarNuevaSolicitudAdmin, notificarCambioEstado } from '../src/lib/email.js'

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { fecha } = req.query

    if (!fecha) {
      return res.status(400).json({ error: 'Falta el parámetro fecha (YYYY-MM-DD)' })
    }

    try {
      const ocupadas = await sql`
        SELECT hora FROM citas
        WHERE fecha = ${fecha} AND estado != 'cancelada'
      `
      const bloqueada = await sql`
        SELECT id FROM bloqueos WHERE fecha = ${fecha}
      `
      return res.status(200).json({
        horasOcupadas: ocupadas.map((c) => c.hora),
        diaBloqueado: bloqueada.length > 0,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al consultar disponibilidad' })
    }
  }

  if (req.method === 'POST') {
    const {
      nombre_paciente,
      telefono,
      email,
      motivo,
      primera_vez,
      fecha,
      hora,
      respuestas_formulario, // objeto { clave: valor } armado dinámicamente desde preguntas_formulario
    } = req.body

    if (!nombre_paciente || !telefono || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    try {
      // Anti doble-reserva: la hora tentativa se bloquea apenas se crea la
      // solicitud (estado 'pendiente'), no solo cuando Rebeca la confirma.
      const existente = await sql`
        SELECT id FROM citas
        WHERE fecha = ${fecha} AND hora = ${hora} AND estado != 'cancelada'
      `
      if (existente.length > 0) {
        return res.status(409).json({ error: 'Ese horario ya fue solicitado por alguien más. Por favor elige otro.' })
      }

      const bloqueada = await sql`SELECT id FROM bloqueos WHERE fecha = ${fecha}`
      if (bloqueada.length > 0) {
        return res.status(409).json({ error: 'Ese día no está disponible para citas.' })
      }

      const [nuevaCita] = await sql`
        INSERT INTO citas (
          nombre_paciente, telefono, email, motivo, primera_vez, fecha, hora, respuestas_formulario
        )
        VALUES (
          ${nombre_paciente}, ${telefono}, ${email || null}, ${motivo || 'otro'},
          ${primera_vez || false}, ${fecha}, ${hora}, ${JSON.stringify(respuestas_formulario || {})}
        )
        RETURNING id, fecha, hora, estado
      `

      // Notificaciones por email — no bloquean la respuesta al paciente si fallan.
      const resultadoPaciente = await notificarSolicitudRecibida({ email, nombre_paciente, fecha, hora })
      await notificarNuevaSolicitudAdmin({ nombre_paciente, fecha, hora, motivo })

      if (resultadoPaciente?.ok) {
        await sql`UPDATE citas SET email_enviado = true WHERE id = ${nuevaCita.id}`
      }

      return res.status(201).json({
        cita: nuevaCita,
        mensaje: 'Tu solicitud fue recibida. Rebeca la revisará y te confirmaremos por email en breve.',
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al crear la solicitud de cita' })
    }
  }

  if (req.method === 'PATCH') {
    // Usado desde el panel admin: confirmar, reagendar o cancelar una solicitud.
    // Único método de este endpoint que requiere sesión admin.
    const auth = await requireAdmin(req, res)
    if (!auth) return

    const { id, estado, nota_admin } = req.body

    if (!id || !estado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (id, estado)' })
    }
    if (!['pendiente', 'confirmada', 'cancelada'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' })
    }

    try {
      const [citaActualizada] = await sql`
        UPDATE citas
        SET estado = ${estado}, nota_admin = ${nota_admin || null}
        WHERE id = ${id}
        RETURNING id, estado, fecha, hora, email, nombre_paciente
      `

      if (!citaActualizada) {
        return res.status(404).json({ error: 'Cita no encontrada' })
      }

      // Solo se notifica al paciente en confirmación/cancelación, no al
      // volver a 'pendiente' (caso poco común, sin necesidad de aviso).
      if (estado === 'confirmada' || estado === 'cancelada') {
        await notificarCambioEstado({
          email: citaActualizada.email,
          nombre_paciente: citaActualizada.nombre_paciente,
          fecha: citaActualizada.fecha,
          hora: citaActualizada.hora,
          estado,
          nota_admin,
        })
      }

      return res.status(200).json({ cita: citaActualizada })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error al actualizar la cita' })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
