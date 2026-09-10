import { Link } from 'react-router-dom'
import { contacto, perfil } from '../../data/contenido'
import Icono from '../ui/Icono'

function Footer() {
  return (
    <footer style={{ background: 'var(--color-texto-principal)', color: 'var(--color-fondo-crema)', marginTop: 'var(--space-xl)' }}>
      <div className="contenedor seccion grid-footer">
        <div>
          <p style={{ fontFamily: 'var(--font-serif-titulos)', fontSize: '1.4rem', color: 'var(--color-fondo-crema)' }}>
            {perfil.nombre}
          </p>
          <p style={{ color: '#C9C6C1', marginTop: '0.3rem' }}>{perfil.titulo}</p>
          <p style={{ color: '#C9C6C1', marginTop: '1.25rem', maxWidth: 280, lineHeight: 1.7 }}>
            {perfil.fraseHero}
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-fondo-crema)', fontSize: '1rem', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Contacto
          </h3>
          <p style={{ color: '#C9C6C1', display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <Icono nombre="email" size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{contacto.direccion}, {contacto.ciudad}</span>
          </p>
          <p style={{ color: '#C9C6C1', display: 'flex', gap: '0.6rem' }}>
            <Icono nombre="whatsapp" size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{contacto.celular}</span>
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-fondo-crema)', fontSize: '1rem', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Enlaces
          </h3>
          <p style={{ marginBottom: '0.6rem' }}>
            <Link to="/sobre-mi" style={{ color: '#C9C6C1' }}>Sobre mí</Link>
          </p>
          <p style={{ marginBottom: '0.6rem' }}>
            <Link to="/especialidades" style={{ color: '#C9C6C1' }}>Especialidades</Link>
          </p>
          <p style={{ marginBottom: '0.6rem' }}>
            <Link to="/aviso-etico" style={{ color: '#C9C6C1' }}>Aviso Ético</Link>
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-fondo-crema)', fontSize: '1rem', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ¿Lista para empezar?
          </h3>
          <Link to="/reservar-cita" className="btn btn-primario" style={{ display: 'inline-block' }}>
            Reservar Cita
          </Link>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div
          className="contenedor"
          style={{
            padding: '1.25rem var(--space-md)',
            fontSize: 'var(--fs-small)',
            color: '#9C9995',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <span>© {new Date().getFullYear()} {perfil.nombre}. Todos los derechos reservados.</span>
          <span>Cochabamba, Bolivia</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
