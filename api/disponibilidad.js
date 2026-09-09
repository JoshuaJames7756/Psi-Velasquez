// ============================================
// /api/disponibilidad — Vercel Serverless Function
// GET -> dado un ?fecha=YYYY-MM-DD, calcula los horarios realmente
//        disponibles ese día: horarios_disponibles (plantilla semanal)
//        menos horas ya ocupadas en citas, menos si el día está bloqueado.
// ============================================
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

function generarSlots(horaInicio, horaFin, duracionMin) {
  const slots = []
  let [h, m] = horaInicio.split(':').map(Number)
  const [hFin, mFin] = horaFin.split(':').map(Number)

  while (h < hFin || (h === hFin && m < mFin)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    m += duracionMin
    if (m >= 60) {
      h += Math.floor(m / 60)
      m = m % 60
    }
  }
  return slots
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { fecha } = req.query
  if (!fecha) {
    return res.status(400).json({ error: 'Falta el parámetro fecha (YYYY-MM-DD)' })
  }

  try {
    const diaSemana = new Date(fecha + 'T00:00:00').getDay() // 0=domingo ... 6=sábado

    const bloqueo = await sql`SELECT id, motivo FROM bloqueos WHERE fecha = ${fecha}`
    if (bloqueo.length > 0) {
      return res.status(200).json({ disponible: false, motivo: 'dia_bloqueado', slots: [] })
    }

    const plantilla = await sql`
      SELECT hora_inicio, hora_fin, duracion_cita
      FROM horarios_disponibles
      WHERE dia_semana = ${diaSemana} AND activo = true
    `

    if (plantilla.length === 0) {
      return res.status(200).json({ disponible: false, motivo: 'sin_atencion_ese_dia', slots: [] })
    }

    const ocupadas = await sql`
      SELECT hora FROM citas
      WHERE fecha = ${fecha} AND estado != 'cancelada'
    `
    const horasOcupadas = new Set(ocupadas.map((c) => c.hora.slice(0, 5)))

    let todosLosSlots = []
    for (const bloque of plantilla) {
      todosLosSlots = todosLosSlots.concat(
        generarSlots(bloque.hora_inicio.slice(0, 5), bloque.hora_fin.slice(0, 5), bloque.duracion_cita)
      )
    }

    const slotsLibres = todosLosSlots.filter((s) => !horasOcupadas.has(s))

    return res.status(200).json({ disponible: slotsLibres.length > 0, motivo: null, slots: slotsLibres })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Error al calcular disponibilidad' })
  }
}
