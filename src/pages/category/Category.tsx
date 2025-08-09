// Librerías y hooks
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// Componentes
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

// Estilos y assets
import styles from "./category.module.css";

// Modelos
import { categorias } from '../../models/categoria';

// Contextos
import { ReproductorContext } from "../../context/reproductorContext";

// Servicios
import { musicService } from "../../data/service.ts";

function Category() {
  const { id } = useParams();
  const categoriaSeleccionada = categorias[Number(id) - 1];

  const navigate = useNavigate();

////Traer datos de la BD
  const loadSongs = async () => {
          try {
              const data = await musicService.getAllSongs();
              return data;
          } catch (error) {
              console.error(error);
          }
      }

    const {data: allSongs, isLoading} = useQuery({queryKey: ['songs'], queryFn: loadSongs})

////////////////////////////////////////////
const songs = allSongs?.filter(song => song.categorias && song.categorias.includes(categoriaSeleccionada.nombre))



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
  if (isLoading) {
    return <div className={styles.loading}>Cargando canciones...</div>;
  }


  return (
    <div className={styles.categoryPage}>
      <NavBar />
      <SideBar />
      {songs && (
      <div className={styles.content}>
        <h1 className={styles.title}>{categoriaSeleccionada.nombre}</h1>
        <div className={styles.songListContainer}>
        {songs.length === 0 ? (
          <p className={styles.empty}>No hay canciones en esta categoría.</p>
        ) : (
          <ul className={styles.songList}>
            {songs.map(song => (
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
        )}
      </div>
      </div>
      )}
      
    </div>
  );
}

export default Category;