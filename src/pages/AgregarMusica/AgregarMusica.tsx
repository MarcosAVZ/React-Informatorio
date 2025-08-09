// Librerías y hooks
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Servicios
import { musicService } from '../../data/service';
import { albumService } from '../../data/service';

// Modelos
import type { Music } from '../../models/music';
import type { Album } from '../../models/album';

// Componentes
import Loading from '../../components/Loading/Loading';
import ErrorComponents from '../../components/Error/ErrorComponent';
import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar/NavBar';

// Estilos y assets
import styles from "./agregarMusica.module.css";

const AddMusicForm = () => {
    const queryClient = useQueryClient();
    const [nombre, setNombre] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const src ='/Africa.mp3'
    const [imagen, setImagen] = useState<string>('');
    const [categorias, setCategorias] = useState<string[]>([]);
    const [albumRelacion, setAlbumRelacion] = useState<string[]>([]);

    const navigate = useNavigate();

    const { mutate, error, isPending } = useMutation<Music, Error, Music>({
        mutationFn: musicService.createSong,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['song'] });
            navigate('/'); // Navega al home después de agregar la música
        },
            onError: (error: Error) => {
                console.error(error); // Maneja el error después de agregar la música
            },
        
    });

    const loadAlbums = async () => {
        try {
            const data = await albumService.getAllAlbums();
            return data;
        } catch (error) {   
            console.error("Error loading albums:", error);
        }
    }

    const {data: albums, isLoading, isError, error: albumError}  = useQuery({ queryKey: ['albums'], queryFn: loadAlbums})

    if(isLoading){
        return <Loading/>
    }

    if(isError){
        return <ErrorComponents mensaje={albumError.message}/>
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newSong: Music = {
            id: 0,
            nombre,
            artista,
            src,
            imagen,
            categorias: categorias,
            AlbumRelacion: albumRelacion.map(id => parseInt(id)),
        };
        mutate(newSong);
    };

    return (
        <>
        <SideBar />
        <NavBar />
        <div className={styles.container}>
            
            <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label>
                            Nombre:
                            <input maxLength={26} type="text" value={nombre} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNombre(event.target.value)} />
                        </label>
                        <label>
                            Artista:
                            <input maxLength={40} type="text" value={artista} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setArtista(event.target.value)} />
                        </label>
                        <label>
                            Src:
                            <input type="text" value={src} readOnly />
                        </label>
                        <label>
                            Imagen:
                            <input type="text" value={imagen} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setImagen(event.target.value)} />
                        </label>
                        <label>
                            Categorías:
                            <select
                                className={styles.select}
                                value={categorias[0] || ''}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                setCategorias([event.target.value]);
                                }}
                            >
                                <option value="">Seleccione una categoría</option>
                                <option value="Rock">Rock</option>
                                <option value="Pop">Pop</option>
                                <option value="Hip-Hop">Hip-Hop</option>
                                <option value="Electrónica">Electrónica</option>
                                {/* Agrega más opciones según sea necesario */}
                            </select>
                        </label>
                        <label>
                            Álbum relacionado:
                            <select
                                className={styles.select}
                                value={albumRelacion}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                                setAlbumRelacion(selectedOptions);
                                }}
                            >
                                <option value="">Seleccione un álbum</option>
                                {albums && albums.map((album: Album )=> (
                                <option key={album.id} value={album.id}>{album.title}</option>
                                ))}
                            </select>
                        </label>
                        <button type="submit" disabled={isPending} className={styles.button}>
                            {isPending ? 'Cargando...' : 'Agregar música'}
                        </button>
                        {error && <div className={styles.error}>{error.message}</div>}
                    </form>   
            </div>
                <div className={styles.previewContainer}>
                    <div className={styles.preview}>
                    <img
                        className={styles.musicImagen}
                        src={imagen || "https://example.com/imagen-por-defecto.jpg"}
                        alt={nombre || "Imagen por defecto"}
                        onError={(e) => {
                        e.currentTarget.src = "https://example.com/imagen-por-defecto.jpg";
                        }}
                    />
                    <div className={styles.musicInfo}>
                        <h1  className={styles.musicTitle}>{nombre || "Música"}</h1>
                        <p className={styles.musicArtista}>{artista}</p>
                    </div>
                    </div>
            </div>
        </div>
        </>
    );
};

export default AddMusicForm;