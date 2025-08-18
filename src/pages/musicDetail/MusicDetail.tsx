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

  const { showReproductor, setShowReproductor, setAudioActual } = reproductorContext;

  const handleButtonReproducir = () => {
    if (showReproductor === false) {
      setShowReproductor(!showReproductor);
    }
  };

///Implementando los Servis para traer los datos
  const loadSong = async () => {
          try {
              const data = await musicService.getSongById(Number(id));
              return data;
          } catch (error) {
              console.error(error);
          }
      }

    const { data: song, isLoading } = useQuery({
      queryKey: ['song', id],
      queryFn: loadSong,
      enabled: !!id, // Esto evita que se ejecute la consulta si el ID es vacío
    });
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
          
          <button
            className={styles.playButton}
            onClick={() => {
              handleButtonReproducir();
              setAudioActual(song);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="24"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.25 19.5 12 5.25 18.75V5.25z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default MusicDetail;