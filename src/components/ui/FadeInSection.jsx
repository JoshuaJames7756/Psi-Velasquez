import { useFadeIn } from '../../hooks/useFadeIn'

function FadeInSection({ children, className = '', as: Tag = 'div', ...rest }) {
  const [ref, visible] = useFadeIn()

  return (
    <Tag ref={ref} className={`fade-in ${visible ? 'visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export default FadeInSection
