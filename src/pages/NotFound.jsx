import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="seccion contenedor" style={{ textAlign: 'center' }}>
      <h1>Página no encontrada</h1>
      <Link to="/" className="btn btn-primario" style={{ marginTop: '1rem' }}>
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
