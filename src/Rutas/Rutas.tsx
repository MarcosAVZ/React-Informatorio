// Componentes
import Reproductor from '../components/Reproductor/Reproductor';

// Páginas
import { AlbumDetail } from '../pages/albumDetail/AlbumDetail';
import Home from '../pages/home/Home';
import MusicDetail from '../pages/musicDetail/MusicDetail';
//import Category from '../pages/category/Category';
import LikeSong from '../pages/meGusta/LikeSong';
import AddMusicForm from '../pages/AgregarMusica/AgregarMusica';

// Librerías y hooks
import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contextos
import { ReproductorContext } from '../context/reproductorContext';
import CreateAlbumForm from '../pages/CreateAlbumForm/CreateAlbumForm';
import PageError from '../pages/PageError/PageError';

export function Router() {
    

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
                <Route path="/album/:id" element={<AlbumDetail />} />
                <Route path="/likeSong" element={<LikeSong />} />
                <Route path='/AgregarMusic' element={<AddMusicForm/>}/>
                <Route path='/AgregarAlbum' element={<CreateAlbumForm/>}/>
                <Route path="*" element={<PageError/>} />
            </Routes>
            {showReproductor && audioActual && <Reproductor audio={audioActual} />}
        </BrowserRouter>
    );
}