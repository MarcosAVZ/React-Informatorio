// Estilos y assets
import styles from './albumDetail.module.css';

// Componentes
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Loading from '../../components/Loading/Loading';
import ErrorComponents from '../../components/Error/ErrorComponent';

// Librerías y hooks
import { useNavigate, useParams } from 'react-router';
import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Contextos
import { ReproductorContext } from '../../context/reproductorContext';

// Servicios
import { albumService, musicService } from '../../data/service';

// Tipos
import type { Music } from '../../models/music';

/**
 * Componente de detalle de álbum
 */
export function AlbumDetail() {
    // Hook para navegar a otras rutas
    const navigate = useNavigate();
    const { id } = useParams();

    // Contexto del reproductor
    const reproductorContext = useContext(ReproductorContext);
    if (!reproductorContext) {
        throw new Error("ReproductorContext no está definido");
    }
    const { showReproductor, setShowReproductor, setAudioActual } = reproductorContext;

    // Función para manejar el botón de reproducir
    const handleButtonReproducir = () => {
        if (showReproductor === false) {
            setShowReproductor(!showReproductor);
        }
    };

    // Función para cargar las canciones y el álbum
    const loadSongs = async () => {
        try {
            const data = await musicService.getAllSongs();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const loadAlbum = async () => {
        try {
            const data = await albumService.getAlbumById(Number(id));
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    // Hook para obtener las canciones y el álbum por medio de React Query
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['songs-and-album', id],
        queryFn: async () => {
            const [songs, album] = await Promise.all([loadSongs(), loadAlbum()]);
            return { songs, album };
        },
    });

    // Si hay un error, mostrar el componente de error
    if (isError) {
        return <ErrorComponents mensaje={error.message || 'Error desconocido'} />;
    }

    // Filtrar las canciones del álbum
    const songsOfAlbum = data?.songs?.filter(song => song.Album && song.Album.some(album => album === data.album?.title)) ?? [];

    // Función para manejar el botón de me gusta
    const handleButtonlikeSong = async (song: Music) => {
        try {
            const updatedSong = { ...song, meGusta: !song.meGusta };
            await musicService.updateSong(song.id.toString(), updatedSong);
            queryClient.invalidateQueries({ queryKey: ['songs-and-album'] });
        } catch (error) {
            console.error(error);
        }
    };

    // Si se está cargando, mostrar el componente de carga
    if (isLoading) {
        return <Loading />;
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
                                <p>{data.album.creadoPor}</p>
                            </div>
                        </div>
                    </div>
                    <ul className={styles.songList}>
                        {songsOfAlbum && songsOfAlbum?.map((song: Music) => (
                            <li key={song.id} className={styles.songItem}>
                                <div className={styles.songDetails}>
                                    {song.imagen && (
                                        <img src={song.imagen} alt={song.nombre} className={styles.songImg} />
                                    )}
                                    <div className={styles.songInfo}>
                                        <span
                                            className={styles.songName}
                                            style={{ cursor: "pointer", textDecoration: "underline" }}
                                            onClick={() => navigate(`/music/${song.id}`)}
                                        >
                                            {song.nombre}
                                        </span>
                                        <span className={styles.songArtist}>{song.artista}</span>
                                    </div>
                                </div>
                                <div className={styles.likeButton}>
                                    {song.meGusta &&
                                        <button
                                            className={styles.like}
                                            title='Quitar de tus me gusta'
                                            onClick={() => {
                                                handleButtonlikeSong(song);
                                            }}
                                        >
                                            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="-23.5 -23.5 382.76 382.76" >
                                                <g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"  > <g> <g> <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795 "></polygon> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795 "></polygon> </g> </g> </g></svg>
                                        </button>
                                    }
                                    {!song.meGusta &&
                                        <button
                                            className={styles.noLike}
                                            title="Agregar a tus me gusta"
                                            onClick={() => {
                                                handleButtonlikeSong(song);
                                            }}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_iconCarrier"> 
                                                <path d="M6 12H18M12 6V18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                                </g>
                                            </svg>                                 
                                        </button>
                                    }
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