import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProveedor } from './context/UserProvider.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProveedor>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProveedor>
  </React.StrictMode>,
);
