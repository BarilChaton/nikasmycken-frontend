import './main.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initGoogle } from './auth/initGoogle'
import { AuthProvider } from './auth/AuthContext'

const startApp = async () => {
  await initGoogle()

  const root = createRoot(
    document.getElementById('root')
  )

  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

startApp()
