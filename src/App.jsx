import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ui/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Inicio from './pages/Inicio'
import SobreMi from './pages/SobreMi'
import Especialidades from './pages/Especialidades'
import ReservarCita from './pages/ReservarCita'
import Videos from './pages/Videos'
import Contacto from './pages/Contacto'
import AvisoEtico from './pages/AvisoEtico'
import AdminPanel from './pages/AdminPanel'
import NotFound from './pages/NotFound'

function App() {
  const { pathname } = useLocation()
  // El panel admin tiene su propio layout (sidebar oscura tipo dashboard,
  // sin Header/Footer del sitio público) — se sale intencionalmente de la
  // identidad visual de las páginas para pacientes.
  const esAdmin = pathname.startsWith('/admin')

  // Solo Inicio termina en el color CTA justo antes del Footer (CtaFinal);
  // el resto de páginas terminan en el fondo crema estándar. El Footer
  // necesita saber esto para que su curva de entrada coincida.
  const colorAntesDelFooter = pathname === '/' ? 'var(--color-cta)' : 'var(--color-fondo-crema)'

  return (
    <>
      <ScrollToTop />
      {!esAdmin && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/especialidades/:id" element={<Especialidades />} />
          <Route path="/reservar-cita" element={<ReservarCita />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/aviso-etico" element={<AvisoEtico />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!esAdmin && <Footer colorAnterior={colorAntesDelFooter} />}
    </>
  )
}

export default App