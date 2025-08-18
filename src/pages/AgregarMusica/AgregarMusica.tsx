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

/**
 * Componente para agregar música
 */
const AddMusicForm = () => {
  // Estado para almacenar los datos del formulario
  const [nombre, setNombre] = useState<string>('');
  const [artista, setArtista] = useState<string>('');
  const [imagen, setImagen] = useState<string>('');
  const [albumRelacion, setAlbumRelacion] = useState<string[]>([]);
  const [errorInput, setErroresInput] = useState({
    nombre: '',
    artista: '',
    src: '',
    categorias: '',
    albumRelacion: '',
  });

  // Hook para navegar a otras rutas
  const navigate = useNavigate();

  // Hook para obtener el cliente de consulta
  const queryClient = useQueryClient();

  // Mutación para crear una nueva canción
  const { mutate, error, isPending } = useMutation<Music, Error, Music>({
    mutationFn: musicService.createSong,
    onSuccess: () => {
      // Invalidar la caché de canciones y navegar a la página principal
      queryClient.invalidateQueries({ queryKey: ['song'] });
      navigate('/');
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  // Función para cargar los álbumes
  const loadAlbums = async () => {
    try {
      const data = await albumService.getAllAlbums();
      return data;
    } catch (error) {
      console.error("Error loading albums:", error);
    }
  };

  // Hook para obtener los álbumes
  const { data: albums, isLoading, isError, error: albumError } = useQuery({
    queryKey: ['albums'],
    queryFn: loadAlbums,
  });

  // Si se está cargando, mostrar el componente de carga
  if (isLoading) {
    return <Loading />;
  }

  // Si hay un error, mostrar el componente de error
  if (isError) {
    return <ErrorComponents mensaje={albumError.message || "Error desconocido"} />;
  }

  /**
   * Función para validar el formulario
   */
  const validateForm = (): boolean => {
    const newErrorInput = {
      nombre: '',
      artista: '',
      src: '',
      categorias: '',
      albumRelacion: '',
    };

    let isValid: boolean = true;

    if (!nombre) {
      newErrorInput.nombre = 'El nombre es requerido';
      isValid = false;
    }

    if (!artista) {
      newErrorInput.artista = 'El artista es requerido';
      isValid = false;
    }

    if (!src) {
      newErrorInput.src = 'El src es requerido';
      isValid = false;
    }

    if (!albumRelacion || albumRelacion.length === 0) {
      newErrorInput.albumRelacion = 'El álbum relacionado es requerido';
      isValid = false;
    }

    setErroresInput(newErrorInput);

    return isValid;
  };

  /**
   * Función para manejar el envío del formulario
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const img = new Image();
      img.src = imagen;
      img.onload = () => {
        const newSong: Music = {
          id: 0,
          nombre,
          artista,
          src,
          Album: albumRelacion,
          imagen,
        };
        mutate(newSong);
      };
      img.onerror = () => {
        const newSong: Music = {
          id: 0,
          nombre,
          artista,
          src,
          Album: albumRelacion,
          imagen: "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
        };
        mutate(newSong);
      };
    }
  };

  const src = '/Africa.mp3';

  return (
    <>
      <SideBar />
      <NavBar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <label>
              <div className={styles.labelTitle}>
                Nombre:
                {errorInput.nombre && <div className={styles.error}>{errorInput.nombre}</div>}
              </div>
              <input
                maxLength={26}
                type="text"
                value={nombre}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNombre(event.target.value)}
              />
            </label>


            <label>
              <div className={styles.labelError}>
                Artista:
                {errorInput.artista && <div className={styles.error}>{errorInput.artista}</div>}
              </div>
              <input
                maxLength={40}
                type="text"
                value={artista}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setArtista(event.target.value)}
              />
            </label>


            <label>
              <div className={styles.labelError}>
                Src:
                {errorInput.src && <div className={styles.error}>{errorInput.src}</div>}
              </div>
              <input type="text" value={src} readOnly />
            </label>

            <label>
              <div className={styles.labelError}>
                Imagen:
              </div>
              <input
                type="text"
                value={imagen}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setImagen(event.target.value)}
              />
            </label>

            <label>
              <div className={styles.labelError}>
                Álbum:
                {errorInput.albumRelacion && <div className={styles.error}>{errorInput.albumRelacion}</div>}
              </div>
              <select
                className={styles.select}
                value={albumRelacion}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
                  setAlbumRelacion(selectedOptions);
                }}
              >
                <option value="">Seleccione un álbum</option>
                {albums && albums.map((album: Album) => (
                  <option key={album.id} value={album.title}>{album.title}</option>
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
              src={imagen || "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"}
              alt={nombre || "Imagen por defecto"}
              onError={(e) => {
                e.currentTarget.src = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";
              }}
            />
            <div className={styles.musicInfo}>
              <h1 className={styles.musicTitle}>{nombre || "Música"}</h1>
              <p className={styles.musicArtista}>{artista}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMusicForm;