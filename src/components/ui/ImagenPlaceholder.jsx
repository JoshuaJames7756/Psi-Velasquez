/**
 * Placeholder visual profesional mientras se cargan fotos reales.
 * Cuando se pasa `src` (URL de Cloudinary), renderiza la imagen real con
 * lazy loading nativo — no hay que reemplazar el componente después,
 * solo empezar a pasarle `src`.
 */
function ImagenPlaceholder({ ratio = '4/5', label = 'Foto próximamente', src = null, alt = '', style = {} }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          aspectRatio: ratio,
          width: '100%',
          objectFit: 'cover',
          borderRadius: 'var(--radius-lg)',
          ...style,
        }}
      />
    )
  }

  return (
    <div
      style={{
        aspectRatio: ratio,
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        background:
          'linear-gradient(135deg, var(--color-sage-medio) 0%, var(--color-terracota-suave) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-texto-secundario)',
        fontSize: 'var(--fs-small)',
        fontFamily: 'var(--font-sans-cuerpo)',
        textAlign: 'center',
        padding: '1rem',
        ...style,
      }}
    >
      <span>{label}</span>
    </div>
  )
}

export default ImagenPlaceholder
