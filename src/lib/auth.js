// ============================================
// auth.js — Validación de sesión admin (Clerk) para Vercel Functions
// Uso en cada endpoint protegido:
//
//   import { requireAdmin } from '../src/lib/auth.js'
//   export default async function handler(req, res) {
//     const auth = await requireAdmin(req, res)
//     if (!auth) return // requireAdmin ya envió la respuesta 401
//     ...continuar con la lógica normal...
//   }
// ============================================
import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
})

/**
 * Verifica la sesión de Clerk usando authenticateRequest, que valida el
 * session token estándar del frontend (el que entrega getToken() por
 * defecto) sin necesitar un JWT template configurado manualmente en Clerk.
 * Si es válida, retorna { userId }. Si no, responde 401 y retorna null.
 */
export async function requireAdmin(req, res) {
  try {
    // Vercel Functions reciben req como IncomingMessage, no como Request
    // estándar — se arma un Request compatible con lo que Clerk espera.
    const protocolo = req.headers['x-forwarded-proto'] || 'https'
    const url = `${protocolo}://${req.headers.host}${req.url}`

    const headers = new Headers()
    for (const [clave, valor] of Object.entries(req.headers)) {
      if (valor) headers.set(clave, Array.isArray(valor) ? valor.join(', ') : valor)
    }

    const request = new Request(url, { method: req.method, headers })

    const resultado = await clerkClient.authenticateRequest(request, {
      authorizedParties: undefined, // sin restricción de dominio por ahora (subdominio de Vercel cambia)
    })

    if (!resultado.isSignedIn) {
      res.status(401).json({ error: 'No autorizado. Falta sesión de administrador válida.' })
      return null
    }

    const { userId } = resultado.toAuth()
    // NOTA: cualquier usuario con sesión válida en Clerk se considera admin,
    // ya que este proyecto solo crea cuentas Clerk para Rebeca/Joshua
    // (no hay registro público de usuarios). Si en el futuro se abre
    // registro a más personas, aquí se debe verificar un rol específico.
    return { userId }
  } catch (err) {
    console.error('Error validando sesión de Clerk:', err)
    res.status(401).json({ error: 'Sesión inválida o expirada.' })
    return null
  }
}
