import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/home/Home'
import MusicDetail from './pages/musicDetail/MusicDetail'
import Category from './pages/category/Category'
import LikeSong from './pages/meGusta/LikeSong'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music/:id" element={<MusicDetail/>} />
        <Route path="/category/:id" element={<Category/>} />
        <Route path="/likeSong" element={<LikeSong />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
