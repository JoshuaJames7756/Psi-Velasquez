import { Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import AdminLayout from '../components/admin/AdminLayout'
import DashboardResumen from '../components/admin/DashboardResumen'
import SeccionSolicitudes from '../components/admin/SeccionSolicitudes'
import SeccionAgenda from '../components/admin/SeccionAgenda'
import SeccionFormulario from '../components/admin/SeccionFormulario'
import SeccionVideos from '../components/admin/SeccionVideos'
import { perfil } from '../data/contenido'

function InicioAdmin() {
  return (
    <>
      <DashboardResumen nombre={perfil.nombre} />
      <SeccionSolicitudes />
    </>
  )
}

function AdminPanel() {
  return (
    <>
      <SignedOut>
        <div className="contenedor seccion" style={{ display: 'flex', justifyContent: 'center' }}>
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <AdminLayout>
          <Routes>
            <Route index element={<InicioAdmin />} />
            <Route path="agenda" element={<SeccionAgenda />} />
            <Route path="formulario" element={<SeccionFormulario />} />
            <Route path="videos" element={<SeccionVideos />} />
          </Routes>
        </AdminLayout>
      </SignedIn>
    </>
  )
}

export default AdminPanel
