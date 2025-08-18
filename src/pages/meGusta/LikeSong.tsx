// Componentes
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Loading from "../../components/Loading/Loading";
import ErrorComponents from "../../components/Error/ErrorComponent";

// Estilos y assets
import styles from "./likeSong.module.css";

// Librerías y hooks
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// Servicios
import { musicService } from "../../data/service";

// Contextos
import { ReproductorContext } from "../../context/reproductorContext";

// Tipo
import type { Music } from "../../models/music";

/**
 * Componente de canciones favoritas
 */
function LikeSong() {
  // Hook para navegar a otras rutas
  const navigate = useNavigate();

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

  // Función para cargar las canciones
  const loadSongs = async () => {
    try {
      const data = await musicService.getAllSongs();
      return data.filter((song) => song.meGusta);
    } catch (error) {
      console.error("Error loading songs:", error);
    }
  };

  // Hook para obtener las canciones por medio de React Query
  const { data: songs, isLoading, isError, error } = useQuery({
    queryKey: ["songs"],
    queryFn: loadSongs,
  });

  // Si se está cargando, mostrar el componente de carga
  if (isLoading) {
    return <Loading />;
  }

  // Si hay un error, mostrar el componente de error
  if (isError) {
    return <ErrorComponents mensaje={error.message} />;
  }

  // Filtrar las canciones favoritas
  const likeSongs = songs?.filter((song: Music) => song.meGusta);

  return (
    <div>
      <NavBar />
      <SideBar />
      {songs && (
        <div className={styles.likeSong}>
          <h2 className={styles.title}>Tus canciones favoritas</h2>
          <ul className={styles.songList}>
            {likeSongs &&
              likeSongs.map((song: Music) => (
                <li key={song.id} className={styles.songItem}>
                  <div className={styles.songDetails}>
                    <img src={song.imagen} alt={song.nombre} className={styles.songImg} />
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
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LikeSong;