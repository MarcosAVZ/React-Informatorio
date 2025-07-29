import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import MusicDetail from './pages/musicDetail/MusicDetail'
import Category from './pages/category/Category'
import LikeSong from './pages/meGusta/LikeSong'

import { ReproductorProvider, ReproductorContext } from './context/reproductorContext'
import Reproductor from './components/Reproductor/Reproductor'
import { useContext } from 'react';

function Router() {
  const reproductorContext = useContext(ReproductorContext);
  if (!reproductorContext) {
    throw new Error("ReproductorContext no está definido");
  }
  const { showReproductor, audioActual } = reproductorContext;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music/:id" element={<MusicDetail />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/likeSong" element={<LikeSong />} />
      </Routes>
      {showReproductor && audioActual && <Reproductor audio={audioActual} />}
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReproductorProvider>
      <Router />
    </ReproductorProvider>
  </StrictMode>,
);