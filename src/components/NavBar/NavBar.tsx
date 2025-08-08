// Estilos y assets
import styles from './NavBar.module.css';

// Librerías y hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Uso de Context
import { useContext } from "react";
import { ReproductorContext } from "../../context/reproductorContext";

// Servicios
import { musicService } from '../../data/service.ts';


const loadSongs = async () => {
    try {
        const data = await musicService.getAllSongs();
        return data;
    } catch (error) {
        console.error(error);
    }
};




function NavBar() {
    const reproductorContext = useContext(ReproductorContext);
    if (!reproductorContext) {
        throw new Error("ReproductorContext no está definido");
    }

    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');
    
    const { data: audios } = useQuery({
        queryKey: ['songs'],
        queryFn: loadSongs,
    });
    
    const audiosFiltrados = (audios && audios.filter(audio =>
        (audio.nombre + ' ' + audio.artista).toLowerCase().includes(busqueda.toLowerCase())
    ));

  //ELEMENTOS DEL REPRODUCTOR

    if (!reproductorContext) {
        throw new Error("ReproductorContext no está definido");
    }
    const {  showReproductor ,setShowReproductor, setAudioActual } = reproductorContext;
    const handleButtonReproducir = () => {
        if(showReproductor == false) {
            setShowReproductor(!showReproductor);
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <button className={`${styles.icon} ${styles.menuIcon}`}>...</button>
                <button  className={`${styles.icon} ${styles.backIcon}`} onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className={`${styles.icon} ${styles.forwardIcon}`} onClick={() => navigate(+1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <div className={styles.centerSection} style={{ position: 'relative', width: '100%' }}>
                <button className={styles.homeIcon} onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </button>
                <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="¿Qué quieres reproducir?"
                        className={styles.searchInput}
                    />
                </div>
                {busqueda && audiosFiltrados && (
                    <div className={styles.audioList}>
                        {audiosFiltrados.length === 0 && (
                            <div className={styles.audioItem}>No se encontraron audios.</div>
                        )}
                        {audiosFiltrados.map(audio => (
                            <div key={audio.id} className={styles.audioItem}>
                                <img
                                    src={audio.imagen}
                                    alt={audio.nombre}
                                    className={styles.audioImg}
                                />
                                <div className={styles.audioInfo}>
                                    <div className={styles.audioName}>{audio.nombre}</div>
                                    <div className={styles.audioArtist}>{audio.artista}</div>
                                </div>
                                <button
                                    className={styles.playButton}
                                    onClick={() => {
                                        handleButtonReproducir()
                                        setAudioActual(audio);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25 19.5 12 5.25 18.75V5.25z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.rightSection}>
                <button className={`${styles.icon} ${styles.bellIcon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </button>
                <button className={`${styles.icon} ${styles.profileIcon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;