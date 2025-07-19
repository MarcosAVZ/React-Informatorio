import { useParams } from "react-router-dom";
import { musicList } from "../../models/music";
import styles from "./musicDetail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

function MusicDetail() {
  const { id } = useParams();
  const song = musicList.find(s => s.id === Number(id));

  if (!song) return <div className={styles.notFound}>Canción no encontrada</div>;

  return (
    <div className={styles.musicDetail}>
      <NavBar />
      <SideBar />
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
    </div>
  );
}

export default MusicDetail;