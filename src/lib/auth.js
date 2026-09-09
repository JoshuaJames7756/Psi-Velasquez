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

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

/**
 * Verifica el header Authorization: Bearer <token> contra Clerk.
 * Si es válido, retorna { userId }. Si no, responde 401 directamente
 * y retorna null (el handler debe cortar la ejecución en ese caso).
 */
export async function requireAdmin(req, res) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    res.status(401).json({ error: 'No autorizado. Falta sesión de administrador.' })
    return null
  }

  try {
    const { sub: userId } = await clerkClient.verifyToken(token)
    if (!userId) {
      res.status(401).json({ error: 'Sesión inválida.' })
      return null
    }
    // NOTA: cualquier usuario con sesión válida en Clerk se considera admin,
    // ya que este proyecto solo crea cuentas Clerk para Rebeca/Joshua
    // (no hay registro público de usuarios). Si en el futuro se abre
    // registro a más personas, aquí se debe verificar un rol específico.
    return { userId }
  } catch (err) {
    console.error('Error validando token de Clerk:', err)
    res.status(401).json({ error: 'Sesión inválida o expirada.' })
    return null
  }
}
