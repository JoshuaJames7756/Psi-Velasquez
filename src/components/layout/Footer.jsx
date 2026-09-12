import { Link } from 'react-router-dom'
import { contacto, perfil } from '../../data/contenido'
import Icono from '../ui/Icono'
import BlobDecorativo from '../ui/BlobDecorativo'
import DivisorCurva from '../ui/DivisorCurva'

/**
 * `colorAnterior` es el fondo de lo que queda justo arriba del Footer en
 * cada página — casi siempre crema, salvo Inicio, que termina en el color
 * CTA (sage). Se pasa explícitamente para que la curva de entrada del
 * Footer siempre coincida con el color real que tiene encima.
 */
function Footer({ colorAnterior = 'var(--color-fondo-crema)' }) {
  return (
    <div>
      <DivisorCurva colorSuperior={colorAnterior} />
      <footer style={{ background: 'var(--color-texto-principal)', color: 'var(--color-fondo-crema)', position: 'relative', overflow: 'hidden' }}>
      <BlobDecorativo
        variante={1}
        color="var(--color-sage-suave)"
        opacity={0.06}
        style={{ width: 460, height: 460, bottom: '-220px', right: '-140px', zIndex: 0 }}
      />
      <div className="contenedor seccion grid-footer" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-serif-titulos)', fontSize: '1.5rem', color: 'var(--color-fondo-crema)' }}>
            {perfil.nombre}
          </p>
          <p style={{ color: '#C9C6C1', marginTop: '0.3rem' }}>{perfil.titulo}</p>
          <p style={{ color: '#9C9995', marginTop: '1.25rem', maxWidth: 280, lineHeight: 1.6, fontSize: '0.95rem' }}>
            {perfil.fraseHero}
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-fondo-crema)', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.2rem', opacity: 0.9 }}>
            Contacto
          </h3>
          <p style={{ color: '#C9C6C1', display: 'flex', gap: '0.6rem', marginBottom: '0.8rem', fontSize: '0.95rem' }}>
            <Icono nombre="email" size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{contacto.direccion}, {contacto.ciudad}</span>
          </p>
          <p style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem', fontSize: '0.95rem' }}>
            <Icono nombre="whatsapp" size={18} style={{ flexShrink: 0, marginTop: 2, color: '#C9C6C1' }} />
            <a href={`tel:+591${contacto.celular}`} style={{ color: '#C9C6C1' }}>
              {contacto.celular}
            </a>
          </p>
          <p style={{ color: '#9C9995', fontSize: 'var(--fs-small)', marginTop: '1rem' }}>
            {contacto.horario || 'Horario de atención: por confirmar'}
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-fondo-crema)', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.2rem', opacity: 0.9 }}>
            Enlaces
          </h3>
          <p style={{ marginBottom: '0.6rem' }}>
            <Link to="/sobre-mi" style={{ color: '#C9C6C1', transition: 'var(--transition-rapida)' }}>Sobre mí</Link>
          </p>
          <p style={{ marginBottom: '0.6rem' }}>
            <Link to="/especialidades" style={{ color: '#C9C6C1', transition: 'var(--transition-rapida)' }}>Especialidades</Link>
          </p>
          <p style={{ marginBottom: '0.6rem' }}>
            <Link to="/aviso-etico" style={{ color: '#C9C6C1', transition: 'var(--transition-rapida)' }}>Aviso Ético</Link>
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-fondo-crema)', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.2rem', opacity: 0.9 }}>
            ¿Lista para empezar?
          </h3>
          <Link to="/reservar-cita" className="btn btn-primario">
            Reservar Cita
          </Link>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          className="contenedor"
          style={{
            padding: '1.5rem var(--space-md)',
            fontSize: 'var(--fs-small)',
            color: '#8A8783',
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
    </div>
  )
}

export default Footer