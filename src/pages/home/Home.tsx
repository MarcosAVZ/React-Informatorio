// Estilos y assets
import styles from './home.module.css';

// Componentes
import ListenAlbumToMusic from '../../components/ListenToMusic/ListenAlbumToMusic';
import CardAlbumMusic from '../../components/AlbumCards/SquareAlbumCard/AlbumCard';
import RectangleAlbumCard from '../../components/AlbumCards/RectangleAlbumCard/RectangleAlbumCard';
import LastListenedAlbums from '../../components/LastListenedAlbums/LastListenedAlbums';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import Loading from '../../components/Loading/Loading';
import ErrorComponents from '../../components/Error/ErrorComponent';

// Librerías y hooks
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Modelos y servicios
import { albumService } from '../../data/service';
import type { Album } from '../../models/album';

/**
 * Componente de inicio
 */
function Home() {
  // Hook para navegar a otras rutas
  const navigate = useNavigate();

  // Función para cargar los álbumes
  const loadAlbums = async () => {
    try {
      const data = await albumService.getAllAlbums();
      return data;
    } catch (error) {
      console.error("Error loading songs:", error);
    }
  };

  // Hook para obtener los álbumes por medio de React Query
  const { data: albums, isLoading, isError, error } = useQuery({
    queryKey: ['albumsDB'],
    queryFn: loadAlbums,
  });

  // Si se está cargando, mostrar el componente de carga
  if (isLoading) {
    return <Loading />;
  }

  // Si hay un error, mostrar el componente de error
  if (isError) {
    return (
      <>
        <ErrorComponents mensaje={error.message || 'Error desconocido'} />
        <SideBar />
        <NavBar />
      </>
    );
  }

  return (
    <div className={styles.home}>
      <NavBar />
      <SideBar />
      <div className={styles.banner}>
        {/* Últimos álbumes escuchados */}
        <LastListenedAlbums>
          {albums && albums.map((album: Album) => (
            album.seccion === "Ultimo Escuchado" ? (
              <RectangleAlbumCard
                id={album.id}
                image={album.image}
                title={album.title}
                creadoPor={album.creadoPor}
                onClick={() => {
                  if (album.title === "Tus Me Gusta") {
                    navigate(`/likeSong`);
                  } else {
                    navigate(`/album/${album.id}`);
                  }
                }}
              />
            ) : null
          ))}
        </LastListenedAlbums>

        {/* Listado de álbumes por género */}
        {[
          { title: "Rock", topTitle: "Lo mejor del" },
          { title: "Pop", topTitle: "Lo mejor del" },
          { title: "Reggaeton", topTitle: "Lo mejor del" },
          { title: "Folklore", topTitle: "Lo mejor del" },
          { title: "Latino", topTitle: "Lo mejor de la música" },
          { title: "World", topTitle: "Descubre la diversidad" },
          { title: "Otro", topTitle: "Otras opciones" },
        ].map((genre) => (
          <ListenAlbumToMusic key={genre.title} title={genre.title} topTitle={genre.topTitle}>
            {albums && albums.filter((album: Album) => album.seccion === genre.title).length > 0 ? (
              albums.map((album: Album) => (
                album.seccion === genre.title ? (
                  <CardAlbumMusic
                    id={album.id}
                    title={album.title}
                    image={album.image}
                    creadoPor={album.creadoPor}
                    onClick={() => navigate(`/album/${album.id}`)}
                  />
                ) : null
              ))
            ) : (
              <div>
                <p className={styles.noAlbums}>No hay álbumes disponibles en esta sección.</p>
              </div>
            )}
          </ListenAlbumToMusic>
        ))}
      </div>
    </div>
  );
}

export default Home;