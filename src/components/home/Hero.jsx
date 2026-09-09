import { Link } from 'react-router-dom'
import { perfil } from '../../data/contenido'
import ImagenPlaceholder from '../ui/ImagenPlaceholder'

function Hero() {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-lg)',
        alignItems: 'center',
        paddingTop: 'var(--space-lg)',
      }}
      className="hero-grid"
    >
      <div>
        <h1 style={{ fontSize: 'var(--fs-hero)' }}>{perfil.nombre}</h1>
        <h2 style={{ color: 'var(--color-texto-secundario)', fontWeight: 400, marginTop: '0.25rem' }}>
          {perfil.titulo}
        </h2>
        <p style={{ maxWidth: 480, margin: '1.5rem 0 2rem' }}>{perfil.fraseHero}</p>
        <Link to="/reservar-cita" className="btn btn-primario">
          Reservar Cita
        </Link>
      </div>
      <ImagenPlaceholder ratio="4/5" label="Foto profesional de Rebeca — pendiente" />
    </section>
  )
}

export default Hero
