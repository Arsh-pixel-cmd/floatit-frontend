import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider, SupabaseAuthAdapter } from './lib/auth'

const authAdapter = new SupabaseAuthAdapter();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider adapter={authAdapter}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
