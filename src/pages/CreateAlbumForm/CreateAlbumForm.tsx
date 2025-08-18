// Estilos y assets
import styles from './CreateAlbumForm.module.css';

// Librerías y hooks
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Servicios
import { albumService } from '../../data/service';

// Modelos
import type { Album } from '../../models/album';

// Componentes
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import ErrorComponents from '../../components/Error/ErrorComponent';

/**
 * Componente para crear un álbum
 */
function CreateAlbumForm() {
    // Estado para almacenar los datos del formulario
    const [titlePlaylist, setTitlePlaylist] = useState('');
    const [imagenAlbum, setImagen] = useState('');
    const [descripcionAlbum, setDescripcion] = useState('');
    const [categoria, setCategorias] = useState('');
    const [creadoPor, setCreadoPor] = useState('');
    const [errorInput, setErroresInput] = useState({
        title: '',
        image: '',
        descripcion: '',
        categorias: '',
        creadoPor: '',
    });

    // Hook para navegar a otras rutas
    const navigate = useNavigate();

    // Mutación para crear un álbum
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: albumService.createAlbum,
        onSuccess: () => {
            navigate('/');
        },
        onError: (error) => {
            console.error(error);
        },
    });

    // Función para validar el formulario
    const validateForm = (): boolean => {
        const newErrorInput = {
            title: '',
            image: '',
            descripcion: '',
            categorias: '',
            creadoPor: '',
        };

        let isValid: boolean = true;

        if (!titlePlaylist) {
            newErrorInput.title = 'El título es requerido';
            isValid = false;
        }

        if (!descripcionAlbum) {
            newErrorInput.descripcion = 'La descripción es requerida';
            isValid = false;
        }

        if (!categoria) {
            newErrorInput.categorias = 'La categoría es requerida';
            isValid = false;
        }

        if (!creadoPor) {
            newErrorInput.creadoPor = 'El creador es requerido';
            isValid = false;
        }

        setErroresInput(newErrorInput);

        return isValid;
    };

    // Si hay un error, mostrar el componente de error
    if (isError) {
        return <ErrorComponents mensaje={error.message} />;
    }

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const newAlbum: Album = {
                id: 0,
                title: titlePlaylist,
                image: imagenAlbum || "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
                creadoPor: creadoPor,
                seccion: categoria,
                decription: descripcionAlbum,
            };
            mutate(newAlbum);
            setTitlePlaylist('');
            setImagen('');
            setDescripcion('');
        }
    };

    return (
        <>
            <SideBar />
            <NavBar />
            <div className={styles.formContainer}>
                <form className={styles.formulario} onSubmit={handleSubmit}>
                    <h1 className={styles.fotmularioTitle}>Crea Tu Album</h1>
                    
                    <div className={styles.preview}>
                        <img
                            className={styles.playlistImagen}
                            src={imagenAlbum || "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"}
                            alt={titlePlaylist || "Imagen por defecto"}
                            onError={(e) => {
                                e.currentTarget.src = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";
                            }}
                        />
                        <div className={styles.playlistInfo}>
                            {!titlePlaylist && <h1 className={styles.playlistTitle} >Album</h1>}
                            {titlePlaylist && <h1 className={styles.playlistTitle} >{titlePlaylist}</h1>}
                            {descripcionAlbum && <p className={styles.playlistDescripcion}>{descripcionAlbum}</p>}
                        </div>
                    </div>

                    <div className={styles.formCamposContainer}>
                        <div className={styles.formCampo}>
                            <div className={styles.labelError}>
                                <label htmlFor="playlistTitle">Título</label>
                                {errorInput.title && <div className={styles.error}>{errorInput.title}</div>}
                            </div>
                            <input
                                className={styles.inputTitle}
                                type="text"
                                id="playlistTitle"
                                value={titlePlaylist}
                                maxLength={28}
                                onChange={(e) => setTitlePlaylist(e.target.value)}
                                placeholder='Album'
                            />
                        </div>

                        <div className={styles.formCampo}>
                            <div className={styles.labelError}>
                                <label htmlFor="playlistCreadoPor">Creado Por</label>
                                {errorInput.creadoPor && <div className={styles.error}>{errorInput.creadoPor}</div>}
                            </div>
                            <input
                                className={styles.inputTitle}
                                type="text"
                                id="playlistCreadoPor"
                                value={creadoPor}
                                maxLength={20}
                                onChange={(e) => setCreadoPor(e.target.value)}
                                placeholder='Usuario'
                            />
                        </div>

                        <div className={styles.formCampo}>
                            <label htmlFor="playlistImage">URL De La Imagen</label>
                            <input
                                className={styles.inputImagen}
                                type="text"
                                id="playlistImage"
                                value={imagenAlbum}
                                onChange={(e) => setImagen(e.target.value)}
                                placeholder="URL de la imagen"
                            />
                        </div>

                        <div className={styles.formCampo}>
                            <div className={styles.labelError}>
                                <label htmlFor="playlistDescription">Descripción</label>
                                {errorInput.descripcion && <div className={styles.error}>{errorInput.descripcion}</div>}
                            </div>
                            <textarea
                                className={styles.textArea}
                                rows={4}
                                id="playlistDescription"
                                value={descripcionAlbum}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Descripción"
                                maxLength={250}
                            />
                        </div>

                        <div className={styles.formCampo}>
                            <div className={styles.labelError}>
                                Categorias:
                                {errorInput.categorias && <div className={styles.error}>{errorInput.categorias}</div>}
                            </div>
                            <select
                                className={styles.select}
                                value={categoria}
                                onChange={(e) => setCategorias(e.target.value)}
                            >
                                <option value="">Seleccione un álbum</option>
                                <option value="Rock">Rock</option>
                                <option value="Pop">Pop</option>
                                <option value="Reggaeton">Reggaeton</option>
                                <option value="Folklore">Folklore</option>
                                <option value="Latino">Latino</option>
                                <option value="World">Música del mundo</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <button className={styles.BtnAddPlaylist} type="submit" disabled={isPending}>
                            {isPending ? 'Creando...' : 'Crear playlist'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateAlbumForm;