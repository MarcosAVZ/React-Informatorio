import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App'
//import Prueba from './prueba'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/song/:id" element={<App />} />
        <Route path="/category/:id" element={<App />} />
        <Route path="/favoritos/:id" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
