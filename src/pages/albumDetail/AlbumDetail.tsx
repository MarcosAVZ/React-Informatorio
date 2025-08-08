// Estilos y assets
import styles from './albumDetail.module.css';

// Componentes
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

// Librerías y hooks
import { useNavigate, useParams } from 'react-router';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// Contextos
import { ReproductorContext } from '../../context/reproductorContext';

// Servicios
import { albumService, musicService } from '../../data/service';


export function AlbumDetail() {
    const navigate = useNavigate();

    const { id } = useParams();

//ELEMENTOS DEL REPRODUCTOR
    const reproductorContext = useContext(ReproductorContext);
    if (!reproductorContext) {
        throw new Error("ReproductorContext no está definido");
    }
    
    const {  showReproductor ,setShowReproductor, setAudioActual } = reproductorContext;
    
    const handleButtonReproducir = () => {
        if(showReproductor == false) {
            setShowReproductor(!showReproductor);
        }
    }
////////////////////////////

///Implementando los Servis para traer los datos
    
    const loadSongs = async () => {
        try {
            const data = await musicService.getAllSongs();
            return(data.filter(song => song.AlbumRelacion && song.AlbumRelacion.includes(Number(id))));
        } catch (error) {
            console.error(error);
        }
    }

        const loadAlbum = async () => {
        try {
            const data = await albumService.getAlbumById(Number(id));
            return data;
        } catch (error) {
            console.error(error);
        }
    }

        const { data, isLoading } = useQuery({
        queryKey: ['songs-and-album'],
        queryFn: async () => {
            const [songs, album] = await Promise.all([loadSongs(), loadAlbum()]);
            return { songs, album };
        },
        });

///////////////////////////////////////////

    if(isLoading){
        <div><h2>Cargandoooo</h2></div>
    }

    return (
        <div className={styles.albumDetail}>
            <NavBar />
            <SideBar />
            {data?.album ? (
                <div className={styles.body}>
                    <div className={styles.albumInfo}>
                    <img src={data.album.image} alt={data.album.title} className={styles.albumImage} />
                    <div className={styles.content}>
                        <div className={styles.info}>
                        <h1>{data.album.title}</h1>
                        <p>{data.album.artists}</p>
                        </div>
                    </div>
                    </div>
                    <ul className={styles.songList}>
                        {data?.songs?.map(song => (
                            <li key={song.id} className={styles.songItem}>
                            <div className={styles.songDetails}>
                                <img src={song.imagen} alt={song.nombre} className={styles.songImg} />
                                <div className={styles.songInfo}>
                                <span           
                                    className={styles.songName}
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                    onClick={() => navigate(`/music/${song.id}`)}
                                >{song.nombre}</span>
                                <span className={styles.songArtist}>{song.artista}</span>
                                </div>
                            </div>
                            <button
                                className={styles.playButton}
                                onClick={() => {
                                handleButtonReproducir()
                                setAudioActual(song);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25 19.5 12 5.25 18.75V5.25z" />
                                </svg>
                            </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={styles.musicList}>
                    <h2>No se encontro musica</h2>
                </div>
            )}
        </div>
    );
}