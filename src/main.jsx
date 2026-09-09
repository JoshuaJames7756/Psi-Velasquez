import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './assets/css/global.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {PUBLISHABLE_KEY ? (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      ) : (
        // Fallback en desarrollo temprano sin key de Clerk configurada aún
        <App />
      )}
    </BrowserRouter>
  </StrictMode>,
)
