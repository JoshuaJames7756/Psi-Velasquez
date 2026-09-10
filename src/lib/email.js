// ============================================
// email.js — Envío de notificaciones vía Resend
// Se usa desde funciones serverless (/api). Requiere solo RESEND_API_KEY.
//
// Nota sobre el remitente: mientras no se verifique un dominio propio en
// Resend, se debe usar el dominio de prueba onboarding@resend.dev (ya
// configurado abajo). Verificar un dominio propio es opcional y se puede
// hacer más adelante sin cambiar el resto del código — solo la constante
// REMITENTE.
// ============================================
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const REMITENTE = 'Rebeca Velásquez <onboarding@resend.dev>'

// --- Estilos compartidos, coherentes con la paleta de marca ---
const wrapperEmail = (contenido) => `
  <div style="font-family: -apple-system, sans-serif; background: #FFFBF5; padding: 2rem; color: #323232;">
    <div style="max-width: 480px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; padding: 2rem; border: 1px solid #DDE4DD;">
      ${contenido}
      <p style="margin-top: 2rem; font-size: 13px; color: #4E4B48;">Rebeca Velásquez · Psicóloga Clínica · Cochabamba, Bolivia</p>
    </div>
  </div>
`

async function enviarEmail({ to, subject, html }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend no está configurado (falta RESEND_API_KEY). Se omite el envío.')
    return { skipped: true }
  }

  try {
    const { error } = await resend.emails.send({ from: REMITENTE, to, subject, html })
    if (error) {
      console.error('Resend respondió con error:', error)
      return { ok: false }
    }
    return { ok: true }
  } catch (err) {
    // El envío de email nunca debe tumbar el flujo principal (crear/confirmar
    // una cita). Se registra el error y se continúa.
    console.error('Error al enviar email vía Resend:', err)
    return { ok: false, error: err }
  }
}

/**
 * Notifica al PACIENTE que su solicitud fue recibida (justo tras el POST inicial).
 */
export function notificarSolicitudRecibida({ email, nombre_paciente, fecha, hora }) {
  if (!email) return Promise.resolve({ skipped: true }) // el email es opcional en el form

  return enviarEmail({
    to: email,
    subject: 'Recibimos tu solicitud de cita',
    html: wrapperEmail(`
      <h2 style="font-family: Georgia, serif; color: #323232;">Solicitud recibida</h2>
      <p>Hola ${nombre_paciente},</p>
      <p>Recibimos tu solicitud de cita para el <strong>${fecha}</strong> a las <strong>${hora}</strong>.</p>
      <p>Rebeca la revisará personalmente y te confirmaremos por este medio en las próximas horas.</p>
    `),
  })
}

/**
 * Notifica a REBECA que hay una nueva solicitud pendiente de revisión.
 */
export function notificarNuevaSolicitudAdmin({ nombre_paciente, fecha, hora, motivo }) {
  const emailAdmin = process.env.ADMIN_NOTIFICATION_EMAIL
  if (!emailAdmin) return Promise.resolve({ skipped: true })

  return enviarEmail({
    to: emailAdmin,
    subject: 'Nueva solicitud de cita',
    html: wrapperEmail(`
      <h2 style="font-family: Georgia, serif; color: #323232;">Nueva solicitud pendiente</h2>
      <p><strong>${nombre_paciente}</strong> solicitó una cita para el <strong>${fecha}</strong> a las <strong>${hora}</strong>.</p>
      <p>Motivo: ${motivo || 'No especificado'}</p>
      <p>Revísala desde tu panel de administración para confirmar o reagendar.</p>
    `),
  })
}

/**
 * Notifica al PACIENTE que su cita fue confirmada o cancelada por Rebeca.
 */
export function notificarCambioEstado({ email, nombre_paciente, fecha, hora, estado, nota_admin }) {
  if (!email) return Promise.resolve({ skipped: true })

  const esConfirmada = estado === 'confirmada'

  return enviarEmail({
    to: email,
    subject: esConfirmada ? 'Tu cita fue confirmada' : 'Actualización sobre tu cita',
    html: wrapperEmail(`
      <h2 style="font-family: Georgia, serif; color: #323232;">
        ${esConfirmada ? 'Cita confirmada' : 'Cambio en tu cita'}
      </h2>
      <p>Hola ${nombre_paciente},</p>
      <p>Tu cita del <strong>${fecha}</strong> a las <strong>${hora}</strong> fue
        <strong>${esConfirmada ? 'confirmada' : 'cancelada'}</strong>.
      </p>
      ${nota_admin ? `<p style="background:#DDE4DD; padding:0.75rem 1rem; border-radius:8px;">${nota_admin}</p>` : ''}
    `),
  })
}
