import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider, SupabaseAuthAdapter } from './lib/auth'
import { initTheme } from './lib/themeStore'
import { Toaster } from 'react-hot-toast'

// Apply saved theme before first render to avoid flash
initTheme();

const authAdapter = new SupabaseAuthAdapter();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider adapter={authAdapter}>
        <App />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

