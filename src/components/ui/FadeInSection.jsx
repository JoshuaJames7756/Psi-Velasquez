import { useFadeIn } from '../../hooks/useFadeIn'

/**
 * `delay` (ms) permite escalonar animaciones de una lista — cada card
 * aparece un poco después de la anterior en vez de todas a la vez.
 * Uso: {items.map((item, i) => <FadeInSection delay={i * 80}>...)}
 */
function FadeInSection({ children, className = '', as: Tag = 'div', delay = 0, style = {}, ...rest }) {
  const [ref, visible] = useFadeIn()

  return (
    <Tag
      ref={ref}
      className={`fade-in ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default FadeInSection
