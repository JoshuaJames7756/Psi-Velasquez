import { Link } from 'react-router-dom'
import { contacto, perfil } from '../../data/contenido'
import Icono from '../ui/Icono'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="contenedor seccion grid-footer">
        <div className="footer-col">
          <p className="footer-brand">{perfil.nombre}</p>
          <p className="footer-subtitle">{perfil.titulo}</p>
          <p className="footer-bio">{perfil.fraseHero}</p>
        </div>

        <div className="footer-col">
          <h3>Contacto</h3>
          <p className="footer-info">
            <Icono nombre="email" size={18} />
            <span>{contacto.direccion}, {contacto.ciudad}</span>
          </p>
          <p className="footer-info">
            <Icono nombre="whatsapp" size={18} />
            <a href={`tel:+591${contacto.celular}`}>{contacto.celular}</a>
          </p>
          <p className="footer-horario">
            {contacto.horario || 'Horario de atención: por confirmar'}
          </p>
        </div>

        <div className="footer-col">
          <h3>Enlaces</h3>
          <ul className="footer-links">
            <li><Link to="/sobre-mi">Sobre mí</Link></li>
            <li><Link to="/especialidades">Especialidades</Link></li>
            <li><Link to="/aviso-etico">Aviso Ético</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>¿Lista para empezar?</h3>
          <Link to="/reservar-cita" className="btn btn-primario">
            Reservar Cita
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="contenedor footer-bottom-wrapper">
          <span>© {new Date().getFullYear()} {perfil.nombre}. Todos los derechos reservados.</span>
          <span>Cochabamba, Bolivia</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer