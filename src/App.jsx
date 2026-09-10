import { Routes, Route } from 'react-router-dom'
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
  return (
    <>
      <ScrollToTop />
      <Header />
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
      <Footer />
    </>
  )
}

export default App