import { Link } from 'react-router-dom'
import { contacto, perfil } from '../../data/contenido'

function Footer() {
  return (
    <footer style={{ background: 'var(--color-sage-suave)', marginTop: 'var(--space-xl)' }}>
      <div className="contenedor seccion" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div>
          <h3>{perfil.nombre}</h3>
          <p>{perfil.titulo}</p>
        </div>
        <div>
          <h3>Contacto</h3>
          <p>{contacto.direccion}</p>
          <p>{contacto.ciudad}</p>
          <p>Cel: {contacto.celular}</p>
        </div>
        <div>
          <h3>Enlaces</h3>
          <p><Link to="/reservar-cita">Reservar Cita</Link></p>
          <p><Link to="/aviso-etico">Aviso Ético</Link></p>
        </div>
      </div>
      <div className="contenedor" style={{ paddingBottom: '1.5rem', fontSize: 'var(--fs-small)' }}>
        © {new Date().getFullYear()} {perfil.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer
