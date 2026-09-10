import { Link } from 'react-router-dom'
import { contacto, perfil } from '../../data/contenido'
import Icono from '../ui/Icono'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="contenedor seccion-footer">
        <div className="grid-footer">
          <div className="footer-col brand-col">
            <p className="footer-brand">{perfil.nombre}</p>
            <p className="footer-subtitle">{perfil.titulo}</p>
            <p className="footer-bio">{perfil.fraseHero}</p>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Contacto</h3>
            <ul className="footer-info-list">
              <li className="footer-info-item">
                <Icono nombre="email" size={18} />
                <span>{contacto.direccion}, {contacto.ciudad}</span>
              </li>
              <li className="footer-info-item">
                <Icono nombre="whatsapp" size={18} />
                <a href={`tel:+591${contacto.celular}`}>{contacto.celular}</a>
              </li>
            </ul>
            <p className="footer-horario">
              {contacto.horario || 'Horario de atención: por confirmar'}
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Navegación</h3>
            <ul className="footer-links">
              <li><Link to="/sobre-mi">Sobre mí</Link></li>
              <li><Link to="/especialidades">Especialidades</Link></li>
              <li><Link to="/aviso-etico">Aviso Ético</Link></li>
            </ul>
          </div>

          <div className="footer-col cta-col">
            <h3 className="footer-title">¿Lista para empezar?</h3>
            <p className="footer-cta-text">Agenda tu primera sesión psicoterapéutica.</p>
            <Link to="/reservar-cita" className="btn btn-primario footer-btn">
              Reservar Cita
            </Link>
          </div>
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