import { Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react'
import AdminLayout from '../components/admin/AdminLayout'
import SeccionSolicitudes from '../components/admin/SeccionSolicitudes'
import SeccionAgenda from '../components/admin/SeccionAgenda'
import SeccionFormulario from '../components/admin/SeccionFormulario'
import SeccionVideos from '../components/admin/SeccionVideos'

function AdminPanel() {
  return (
    <>
      <SignedOut>
        <div className="contenedor seccion" style={{ display: 'flex', justifyContent: 'center' }}>
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <div style={{ borderBottom: '1px solid var(--color-sage-medio)' }}>
          <div className="contenedor" style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.75rem 0' }}>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <AdminLayout>
          <Routes>
            <Route index element={<SeccionSolicitudes />} />
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
