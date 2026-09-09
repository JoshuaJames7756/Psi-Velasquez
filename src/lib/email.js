// ============================================
// email.js — Envío de notificaciones vía EmailJS (REST API)
// Se usa desde funciones serverless (/api), NUNCA desde el frontend
// directamente, para no exponer las credenciales de plantilla.
//
// EmailJS normalmente se usa client-side, pero aquí lo llamamos server-side
// vía su REST API (https://api.emailjs.com/api/v1.0/email/send) para poder
// disparar el correo de forma confiable justo después de escribir en Neon,
// sin depender de que el navegador del paciente siga abierto.
// ============================================

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

async function enviarEmail(templateId, templateParams) {
  const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = process.env

  if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS no está configurado (faltan variables de entorno). Se omite el envío.')
    return { skipped: true }
  }

  try {
    const res = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: VITE_EMAILJS_SERVICE_ID,
        template_id: templateId,
        user_id: VITE_EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY, // recomendado por EmailJS para uso server-side
        template_params: templateParams,
      }),
    })

    if (!res.ok) {
      const texto = await res.text()
      console.error('EmailJS respondió con error:', res.status, texto)
      return { ok: false }
    }
    return { ok: true }
  } catch (err) {
    // El envío de email nunca debe tumbar el flujo principal (crear/confirmar
    // una cita). Se registra el error y se continúa.
    console.error('Error al enviar email vía EmailJS:', err)
    return { ok: false, error: err }
  }
}

/**
 * Notifica al PACIENTE que su solicitud fue recibida (justo tras el POST inicial).
 */
export function notificarSolicitudRecibida({ email, nombre_paciente, fecha, hora }) {
  if (!email) return Promise.resolve({ skipped: true }) // el email es opcional en el form
  return enviarEmail(process.env.VITE_EMAILJS_TEMPLATE_SOLICITUD, {
    to_email: email,
    nombre_paciente,
    fecha,
    hora,
  })
}

/**
 * Notifica a REBECA que hay una nueva solicitud pendiente de revisión.
 */
export function notificarNuevaSolicitudAdmin({ nombre_paciente, fecha, hora, motivo }) {
  const emailAdmin = process.env.ADMIN_NOTIFICATION_EMAIL
  if (!emailAdmin) return Promise.resolve({ skipped: true })
  return enviarEmail(process.env.VITE_EMAILJS_TEMPLATE_ADMIN, {
    to_email: emailAdmin,
    nombre_paciente,
    fecha,
    hora,
    motivo,
  })
}

/**
 * Notifica al PACIENTE que su cita fue confirmada o cancelada por Rebeca.
 */
export function notificarCambioEstado({ email, nombre_paciente, fecha, hora, estado, nota_admin }) {
  if (!email) return Promise.resolve({ skipped: true })
  return enviarEmail(process.env.VITE_EMAILJS_TEMPLATE_ESTADO, {
    to_email: email,
    nombre_paciente,
    fecha,
    hora,
    estado, // 'confirmada' | 'cancelada'
    nota_admin: nota_admin || '',
  })
}
