// ============================================
// db.js — Cliente Neon (@neondatabase/serverless)
// SOLO se importa desde /api. Nunca exponer DATABASE_URL al frontend.
// ============================================
import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL)
