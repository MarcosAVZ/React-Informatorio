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
import ErrorComponents from '../../components/Error/ErrorComponent'

// Librerías y hooks
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Modelos y servicios
import { categorias } from '../../models/categoria';
import { albumService } from '../../data/service';
import type { Album } from '../../models/album';





function Home() {

    //Traer datos de la BD Albumes

            const loadAlbums = async () => {
                try {
                    const data = await albumService.getAllAlbums();
                    return data;
                } catch (error) {   
                    console.error("Error loading songs:", error);
                }
            }

            useEffect(() => {
              loadAlbums();
            }, []);

            const {data: albums, isLoading, isError, error}  = useQuery({ queryKey: ['albums'], queryFn: loadAlbums})
   //////////////////////////// 




  const navigate = useNavigate();

if (isLoading) {
  return <Loading />
}

if(isError){
    return (
    <>
      <ErrorComponents mensaje={error.message || 'Error desconocido'}/>
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
        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Categorías</h2>
          <div className={styles.categoryList}>
            {categorias.map(cat => (
              <span
                key={cat.id}
                className={styles.categoryItem}
                onClick={() => navigate(`/category/${cat.id}`)}
              >
                {cat.nombre}
              </span>
            ))}
          </div>
        </div>
        

        <LastListenedAlbums>
          {albums && albums.map((album: Album) => (
            album.seccion === "Ultimo Escuchado" ? (
              <RectangleAlbumCard   
                id={album.id}
                image={album.image}
                title={album.title}
                artists={album.artists}
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

      <ListenAlbumToMusic  title="Usuario" topTitle="Creado para">
          {albums && albums.map((album: Album) => (
            album.seccion === "Creado para" ? (
              <CardAlbumMusic
                id={album.id}  
                image={album.image}
                artists={album.artists}
                onClick={() => navigate(`/album/${album.id}`)}
              />
            ) : null
          ))}
      </ListenAlbumToMusic>

      <ListenAlbumToMusic title="Volver a escuchar">
          {albums && albums.map((album: Album) => (
            album.seccion === "Volver a escuchar" ? (
              <CardAlbumMusic
                id={album.id}  
                image={album.image}
                artists={album.artists}
                onClick={() => navigate(`/album/${album.id}`)}
              />
            ) : null
          ))}
        </ListenAlbumToMusic>

        <ListenAlbumToMusic title="Álbumes con canciones que te gustan">
          {albums && albums.map((album: Album) => (
            album.seccion === "Álbumes con canciones que te gustan" ? (
              <CardAlbumMusic
                id={album.id}  
                image={album.image}
                artists={album.artists}
                onClick={() => navigate(`/album/${album.id}`)}
              />
            ) : null
          ))}
          
        </ListenAlbumToMusic>
      </div>
    </div>
  )
}

export default Home
