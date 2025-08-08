// Librerías y hooks
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// Componentes
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

// Estilos y assets
import styles from "./musicDetail.module.css";

// Contextos
import { ReproductorContext } from "../../context/reproductorContext";

// Servicios
import { musicService } from '../../data/service';

function MusicDetail() {
  const { id } = useParams();

  

  const reproductorContext = useContext(ReproductorContext);
  if (!reproductorContext) {
    throw new Error("ReproductorContext no está definido");
  }

///Implementando los Servis para traer los datos
  const loadSong = async () => {
          try {
              const data = await musicService.getSongById(Number(id));
              return data;
          } catch (error) {
              console.error(error);
          }
      }

      const {data: song, isLoading} = useQuery({queryKey: ['songs'], queryFn: loadSong})

///////////////////////////////////////

  if (isLoading) {
    return <div className={styles.loading}>Cargando canciones...</div>;
  }
  return (
    <div className={styles.musicDetail}>
      <NavBar />
      <SideBar />
      {song && (
      <div className={styles.detailContainer}>
          <img src={song.imagen} alt={song.nombre} className={styles.detailImg} />
          <h2 className={styles.detailName}>{song.nombre}</h2>
          <h3 className={styles.detailArtist}>{song.artista}</h3>
          <div className={styles.detailCategorias}>
              {song.categorias?.map(cat => (
              <span key={cat} className={styles.categoria}>{cat}</span>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

export default MusicDetail;