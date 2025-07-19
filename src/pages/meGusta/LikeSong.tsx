import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

import styles from "./likeSong.module.css";
import { musicList } from "../../models/music";
import { useNavigate } from "react-router-dom";


function LikeSong() {
  const navigate = useNavigate();
  const favoritas = musicList.filter((song) => song.meGusta);

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
            </li>
          ))}
        </ul>
      )}
      <SideBar />
    </div>
  );
}

export default LikeSong;