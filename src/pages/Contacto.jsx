import { contacto, seo } from '../data/contenido'
import { useSEO } from '../hooks/useSEO'

const direccionCompleta = `${contacto.direccion}, ${contacto.ciudad}`
const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(direccionCompleta)}&output=embed`

const canalesContacto = [
  { id: 'whatsapp', label: 'WhatsApp', href: contacto.whatsappUrl, icono: '💬' },
  { id: 'instagram', label: 'Instagram', href: contacto.instagramUrl, icono: '📷' },
  { id: 'linkedin', label: 'LinkedIn', href: contacto.linkedinUrl, icono: '💼' },
  { id: 'email', label: 'Email', href: contacto.email ? `mailto:${contacto.email}` : null, icono: '✉️' },
]

function Contacto() {
  useSEO(seo.paginas.contacto)

  return (
    <div className="seccion contenedor" style={{ maxWidth: 720 }}>
      <h1 style={{ textAlign: 'center' }}>Contacto</h1>
      <p style={{ textAlign: 'center', maxWidth: 480, margin: '1rem auto 0' }}>
        Para agendar una consulta o realizar una consulta profesional, haz clic en el medio
        de tu preferencia:
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', margin: '2rem 0', flexWrap: 'wrap' }}>
        {canalesContacto.map((canal) =>
          canal.href ? (
            <a
              key={canal.id}
              href={canal.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--color-sage-suave)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                transition: 'var(--transition-suave)',
              }}
              aria-label={canal.label}
              title={canal.label}
            >
              {canal.icono}
            </a>
          ) : null
        )}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p>{contacto.modalidad}</p>
        <p style={{ marginTop: '0.5rem' }}>Celular: {contacto.celular}</p>
      </div>

      <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-suave)' }}>
        <iframe
          title="Ubicación del consultorio"
          src={mapaSrc}
          width="100%"
          height="360"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <p style={{ fontWeight: 600 }}>{contacto.direccion}</p>
        <p>{contacto.ciudad}</p>
        {contacto.horario ? (
          <p style={{ marginTop: '0.5rem' }}>{contacto.horario}</p>
        ) : (
          <p style={{ marginTop: '0.5rem', fontSize: 'var(--fs-small)', color: 'var(--color-texto-secundario)' }}>
            Horario de atención: por confirmar
          </p>
        )}
      </div>
    </div>
  )
}

export default Contacto
