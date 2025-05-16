import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './context/AuthProvider'
import './main.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider />
  </React.StrictMode>
)
