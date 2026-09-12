import { contacto, seo } from '../data/contenido'
import { useSEO } from '../hooks/useSEO'
import Icono from '../components/ui/Icono'
import FadeInSection from '../components/ui/FadeInSection'
import BlobDecorativo from '../components/ui/BlobDecorativo'

const direccionCompleta = `${contacto.direccion}, ${contacto.ciudad}`
const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(direccionCompleta)}&output=embed`

const canalesContacto = [
  { id: 'whatsapp', label: 'WhatsApp', href: contacto.whatsappUrl, icono: 'whatsapp' },
  { id: 'instagram', label: 'Instagram', href: contacto.instagramUrl, icono: 'instagram' },
  { id: 'linkedin', label: 'LinkedIn', href: contacto.linkedinUrl, icono: 'linkedin' },
  { id: 'email', label: 'Email', href: contacto.email ? `mailto:${contacto.email}` : null, icono: 'email' },
]

function Contacto() {
  useSEO(seo.paginas.contacto)

  return (
    <div className="seccion contenedor" style={{ maxWidth: 720, position: 'relative' }}>
      <BlobDecorativo
        variante={3}
        color="var(--color-sage-suave)"
        opacity={0.3}
        style={{ width: 360, height: 360, top: '-60px', right: '-180px', zIndex: -1 }}
      />

      <FadeInSection as="div">
        <h1 style={{ textAlign: 'center' }}>Contacto</h1>
        <p style={{ textAlign: 'center', maxWidth: 480, margin: '1rem auto 0' }}>
          Para agendar una consulta o realizar una consulta profesional, haz clic en el medio
          de tu preferencia:
        </p>
      </FadeInSection>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', margin: '2rem 0', flexWrap: 'wrap' }}>
        {canalesContacto.map((canal, i) =>
          canal.href ? (
            <FadeInSection key={canal.id} delay={i * 70}>
              <a
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="canal-contacto"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--color-sage-suave)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-suave)',
                }}
                aria-label={canal.label}
                title={canal.label}
              >
                <Icono nombre={canal.icono} size={26} style={{ color: 'var(--color-texto-principal)' }} />
              </a>
            </FadeInSection>
          ) : null
        )}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p>{contacto.modalidad}</p>
        <p style={{ marginTop: '0.5rem' }}>Celular: {contacto.celular}</p>
      </div>

      <FadeInSection
        as="div"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-media)',
          border: '1px solid var(--color-card-border)',
        }}
      >
        <iframe
          title="Ubicación del consultorio"
          src={mapaSrc}
          width="100%"
          height="360"
          style={{ border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </FadeInSection>

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
