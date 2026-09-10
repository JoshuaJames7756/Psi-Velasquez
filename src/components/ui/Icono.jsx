/**
 * Íconos SVG de línea, dibujados a mano — sin librerías externas ni
 * emojis. Los emojis se ven distinto en cada sistema operativo y rompen
 * la sensación premium del sitio; estos SVG siempre se ven igual y
 * heredan el color de texto vía currentColor.
 *
 * Uso: <Icono nombre="ansiedad" size={28} />
 */

const trazos = {
  // Ondas — ansiedad (pensamientos que van y vienen)
  ansiedad: (
    <path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
  ),
  // Nube con lluvia suave — depresión
  depresion: (
    <>
      <path d="M7 15a4 4 0 0 1 .5-7.9A5 5 0 0 1 17 9.5a3.5 3.5 0 0 1-.5 7H7Z" />
      <path d="M9 19v1M13 19v2M17 19v1" />
    </>
  ),
  // Espiral — estrés
  estres: (
    <path d="M12 3a9 9 0 1 0 9 9 7 7 0 1 0-7 7 5 5 0 1 0 5-5" />
  ),
  // Hoja — procesos de salud (crecimiento, cuidado)
  procesos_salud: (
    <path d="M12 21c6-2 9-7 9-13-6 0-11 3-13 9-1 3 0 4 4 4Zm0 0c-1-3-1-6 1-9" />
  ),
  // Brújula — adaptación a cambios
  adaptacion: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-1.8 4.7a1 1 0 0 1-.5.5L7.5 16.5l1.8-4.7a1 1 0 0 1 .5-.5Z" />
    </>
  ),
  // Dos manos — relación de pareja
  pareja: (
    <>
      <path d="M8 13c-2 0-3.5-1.5-3.5-3.5S6 6 8 6s3.5 1.5 3.5 3.5" />
      <path d="M16 13c2 0 3.5-1.5 3.5-3.5S18 6 16 6s-3.5 1.5-3.5 3.5" />
      <path d="M4.5 15c0 3 3 5 7.5 6 4.5-1 7.5-3 7.5-6" />
    </>
  ),
  // Menú hamburguesa
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  // Cerrar (X)
  cerrar: (
    <path d="M6 6l12 12M18 6 6 18" />
  ),
  // Check / confirmación
  check: (
    <path d="M5 12.5 10 17l9-10" />
  ),
  // Advertencia
  advertencia: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  // WhatsApp (burbuja de chat)
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.5 9.5c0 3.5 2.5 6 6 6 .8 0 1-1.5.3-2s-1.3-.8-1.8-.3l-.4.4c-1-.5-2-1.5-2.5-2.5l.4-.4c.5-.5.2-1.3-.3-1.8s-2-.5-2 .3Z" fill="currentColor" stroke="none" />
    </>
  ),
  // Instagram (cámara simple)
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  // LinkedIn (letra in estilizada)
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5v6M8 7.8v.1" />
      <path d="M12 16.5v-3.5c0-1.4 1-2.5 2.3-2.5S16.5 11.6 16.5 13v3.5" />
    </>
  ),
  // Sobre — email
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
}

function Icono({ nombre, size = 24, style = {}, ...rest }) {
  const trazo = trazos[nombre]
  if (!trazo) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
      {...rest}
    >
      {trazo}
    </svg>
  )
}

export default Icono
