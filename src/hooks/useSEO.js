import { useEffect } from 'react'

const DOMINIO = 'https://REEMPLAZAR-CON-DOMINIO-FINAL.com' // TODO: actualizar al comprar el dominio

function setMeta(nombre, contenido, esProperty = false) {
  if (!contenido) return
  const selector = esProperty ? `meta[property="${nombre}"]` : `meta[name="${nombre}"]`
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    if (esProperty) tag.setAttribute('property', nombre)
    else tag.setAttribute('name', nombre)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', contenido)
}

/**
 * Actualiza título, descripción, canonical y Open Graph de la página actual.
 * Uso: useSEO({ titulo: '...', descripcion: '...', ruta: '/sobre-mi' })
 */
export function useSEO({ titulo, descripcion, ruta = '' }) {
  useEffect(() => {
    if (titulo) document.title = titulo
    setMeta('description', descripcion)
    setMeta('og:title', titulo, true)
    setMeta('og:description', descripcion, true)
    setMeta('og:url', `${DOMINIO}${ruta}`, true)
    setMeta('twitter:title', titulo)
    setMeta('twitter:description', descripcion)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${DOMINIO}${ruta}`)
  }, [titulo, descripcion, ruta])
}
