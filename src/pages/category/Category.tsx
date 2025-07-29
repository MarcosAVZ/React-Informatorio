import { useParams } from "react-router-dom";
import { musicList } from "../../models/music";

import { categorias } from '../../models/categoria'
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

import styles from "./category.module.css";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { ReproductorContext } from "../../context/reproductorContext";

function Category() {
  const { id } = useParams();
  const categoriaSeleccionada = categorias[Number(id) - 1];

  const navigate = useNavigate();

  const cancionesFiltradas = musicList.filter(song =>
    song.categorias?.includes(categoriaSeleccionada.nombre)
  );


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

  return (
    <div className={styles.categoryPage}>
      <NavBar />
      <SideBar />
      <div className={styles.content}>
        <h1 className={styles.title}>{categoriaSeleccionada.nombre}</h1>
        {cancionesFiltradas.length === 0 ? (
          <p className={styles.empty}>No hay canciones en esta categoría.</p>
        ) : (
          <ul className={styles.songList}>
            {cancionesFiltradas.map(song => (
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
  );
}

export default Category;