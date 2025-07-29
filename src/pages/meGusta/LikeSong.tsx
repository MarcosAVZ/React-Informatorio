import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./likeSong.module.css";
import { musicList } from "../../models/music";
import { useNavigate } from "react-router-dom";


//Uso de Context
import { useContext } from "react";
import { ReproductorContext } from "../../context/reproductorContext";

function LikeSong() {
  const navigate = useNavigate();
  const favoritas = musicList.filter((song) => song.meGusta);

  //ELEMENTOS DEL REPRODUCTOR
  const reproductorContext = useContext(ReproductorContext);
  if (!reproductorContext) {
    throw new Error("ReproductorContext no está definido");
  }
  const {showReproductor ,setShowReproductor, setAudioActual } = reproductorContext;
      const handleButtonReproducir = () => {
          if(showReproductor == false) {
              setShowReproductor(!showReproductor);
          }
      }
  ////////////////////////////

  return (
    <div className={styles.likeSong}>
      <NavBar />
      <h2 className={styles.title}>Tus canciones favoritas</h2>
      {favoritas.length === 0 ? (
        <div className={styles.empty}>No tienes canciones marcadas como favoritas.</div>
      ) : (
        <ul className={styles.songList}>
          {favoritas.map(song => (
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
      <SideBar />
    </div>
  );
}

export default LikeSong;